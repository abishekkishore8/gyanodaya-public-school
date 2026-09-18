import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import multer from "multer";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

import { getDb } from "./db.js";
import { createDefaultSiteContent } from "./defaults.js";

dotenv.config();

const app = express();
const apiPort = Number(process.env.API_PORT || 4000);
const adminUsername = (process.env.ADMIN_USERNAME || "admin").trim().toLowerCase();
const adminPassword = process.env.ADMIN_PASSWORD || "gps@admin2025";
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } });

const r2AccountId = process.env.R2_ACCOUNT_ID;
const r2BucketName = process.env.R2_BUCKET_NAME;
const r2PublicBaseUrl = process.env.R2_PUBLIC_BASE_URL;
const r2AccessKeyId = process.env.R2_ACCESS_KEY_ID;
const r2SecretAccessKey = process.env.R2_SECRET_ACCESS_KEY;

const r2Client =
  r2AccountId && r2AccessKeyId && r2SecretAccessKey
    ? new S3Client({
        region: "auto",
        endpoint: `https://${r2AccountId}.r2.cloudflarestorage.com`,
        credentials: {
          accessKeyId: r2AccessKeyId,
          secretAccessKey: r2SecretAccessKey,
        },
      })
    : null;

app.use(cors());
app.use(express.json({ limit: "1mb" }));

async function getSiteContentCollection() {
  const db = await getDb();
  return db.collection("site_content");
}

async function ensureSiteContent() {
  const collection = await getSiteContentCollection();
  let doc = await collection.findOne({ key: "main" });

  if (!doc) {
    const defaults = createDefaultSiteContent();
    await collection.insertOne({ key: "main", ...defaults, createdAt: new Date(), updatedAt: new Date() });
    doc = await collection.findOne({ key: "main" });
  }

  return doc;
}

function normalizeSiteContent(doc) {
  const defaults = createDefaultSiteContent();
  const source = doc || {};

  return {
    ...defaults,
    ...source,
    academicSession: source.academicSession ?? defaults.academicSession,
    parentsLoginUrl: source.parentsLoginUrl ?? defaults.parentsLoginUrl,
    announcements: source.announcements ?? defaults.announcements,
    noticeCategories: source.noticeCategories ?? defaults.noticeCategories,
    recruitmentPositions: source.recruitmentPositions ?? defaults.recruitmentPositions,
    formSubmissions: source.formSubmissions ?? defaults.formSubmissions,
    imageAssets: {
      ...defaults.imageAssets,
      ...(source.imageAssets || {}),
    },
  };
}

async function backfillSiteContent(doc) {
  const normalized = normalizeSiteContent(doc);
  const collection = await getSiteContentCollection();

  await collection.updateOne(
    { key: "main" },
    {
      $set: {
        academicSession: normalized.academicSession,
        parentsLoginUrl: normalized.parentsLoginUrl,
        announcements: normalized.announcements,
        noticeCategories: normalized.noticeCategories,
        recruitmentPositions: normalized.recruitmentPositions,
        formSubmissions: normalized.formSubmissions,
        imageAssets: normalized.imageAssets,
        updatedAt: new Date(),
      },
      $setOnInsert: { createdAt: new Date() },
    },
    { upsert: true },
  );

  return normalized;
}

function sanitizeDocument(doc) {
  const normalized = normalizeSiteContent(doc);
  const { _id, key, createdAt, updatedAt, ...rest } = normalized;
  return rest;
}

app.get("/api/health", async (_req, res) => {
  try {
    await getDb();
    res.json({ ok: true });
  } catch (error) {
    res.status(500).json({ ok: false, message: error instanceof Error ? error.message : "Database connection failed" });
  }
});

app.post("/api/admin/login", (req, res) => {
  const username = String(req.body?.username || "").trim().toLowerCase();
  const password = String(req.body?.password || "").trim();

  if (username === adminUsername && password === adminPassword) {
    return res.json({ success: true });
  }

  return res.status(401).json({ success: false, message: "Invalid username or password." });
});

app.get("/api/site-content", async (_req, res) => {
  try {
    const doc = await ensureSiteContent();
    const normalized = await backfillSiteContent(doc);
    res.json(sanitizeDocument(normalized));
  } catch (error) {
    res.status(500).json({ message: error instanceof Error ? error.message : "Failed to load site content." });
  }
});

app.put("/api/site-content", async (req, res) => {
  try {
    const payload = normalizeSiteContent(req.body || {});
    const collection = await getSiteContentCollection();
    await collection.updateOne(
      { key: "main" },
      {
        $set: {
          academicSession: payload.academicSession,
          parentsLoginUrl: payload.parentsLoginUrl,
          announcements: payload.announcements,
          noticeCategories: payload.noticeCategories,
          recruitmentPositions: payload.recruitmentPositions,
          formSubmissions: payload.formSubmissions,
          imageAssets: payload.imageAssets,
          updatedAt: new Date(),
        },
        $setOnInsert: { createdAt: new Date() },
      },
      { upsert: true },
    );

    const updated = await ensureSiteContent();
    res.json(sanitizeDocument(updated));
  } catch (error) {
    res.status(500).json({ message: error instanceof Error ? error.message : "Failed to save site content." });
  }
});

app.post("/api/uploads/image", upload.single("image"), async (req, res) => {
  try {
    if (!r2Client || !r2BucketName || !r2PublicBaseUrl) {
      return res.status(500).json({ message: "R2 is not fully configured on the server." });
    }

    if (!req.file) {
      return res.status(400).json({ message: "No image file uploaded." });
    }

    const safeName = (req.file.originalname || "image").replace(/[^a-zA-Z0-9._-]/g, "-");
    const key = `website-assets/${Date.now()}-${safeName}`;

    await r2Client.send(
      new PutObjectCommand({
        Bucket: r2BucketName,
        Key: key,
        Body: req.file.buffer,
        ContentType: req.file.mimetype || "application/octet-stream",
      }),
    );

    const baseUrl = r2PublicBaseUrl.replace(/\/$/, "");
    return res.json({ url: `${baseUrl}/${key}`, key });
  } catch (error) {
    return res.status(500).json({ message: error instanceof Error ? error.message : "Image upload failed." });
  }
});

if (process.env.VERCEL !== "1") {
  app.listen(apiPort, () => {
    console.log(`GPS API server running on http://localhost:${apiPort}`);
  });
}

export default app;