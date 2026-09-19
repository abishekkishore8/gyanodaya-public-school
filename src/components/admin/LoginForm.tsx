"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

import Button from "@/components/admin/ui/Button";
import { Field, Input } from "@/components/admin/ui/Field";
import SchoolLogo from "@/components/common/SchoolLogo";

/** Administrator sign-in. Credentials are checked against the `admin_users` collection. */
export default function LoginForm() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const body = (await response.json().catch(() => ({}))) as { message?: string };
        setError(body.message || "Invalid username or password.");
        return;
      }

      // `refresh()` re-runs the server layout so it picks up the new session.
      router.replace("/admin");
      router.refresh();
    } catch {
      setError("Could not reach the server. Check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="grid min-h-screen place-items-center bg-slate-100 px-4 py-10">
      <div className="w-full max-w-sm">
        <div className="mb-6 flex flex-col items-center text-center">
          <SchoolLogo className="h-14 w-14" />
          <h1 className="mt-3 text-lg font-semibold tracking-tight text-slate-900">
            Gyanodaya Public School
          </h1>
          <p className="text-[13px] text-slate-500">Management Portal</p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Field label="Username" required>
              <Input
                name="username"
                autoComplete="username"
                autoFocus
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Field>

            <Field label="Password" required>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pr-16"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-0 px-3 text-[12.5px] font-semibold text-slate-500 transition hover:text-slate-800 cursor-pointer"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </Field>

            {error && (
              <p
                role="alert"
                className="rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-[12.5px] leading-relaxed text-red-800"
              >
                {error}
              </p>
            )}

            <Button type="submit" variant="primary" disabled={submitting} className="w-full">
              {submitting ? "Signing in…" : "Sign in"}
            </Button>
          </form>
        </div>

        <p className="mt-5 text-center text-[13px]">
          <Link href="/" className="text-slate-500 underline-offset-2 hover:text-slate-800 hover:underline">
            ← Back to the school website
          </Link>
        </p>
      </div>
    </main>
  );
}
