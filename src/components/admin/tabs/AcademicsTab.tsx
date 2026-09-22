"use client";

import { useEffect, useState } from "react";

import ContentCardRows from "@/components/admin/ContentCardRows";
import Button from "@/components/admin/ui/Button";
import { Card, CardBody, CardHeader } from "@/components/admin/ui/Card";
import { Field, Input, Select, Textarea } from "@/components/admin/ui/Field";
import PageHeader from "@/components/admin/ui/PageHeader";
import PhotoPicker from "@/components/admin/ui/PhotoPicker";
import { useAdmin } from "@/context/AdminContext";
import { useSiteContent } from "@/context/SiteContentContext";
import type {
  AcademicsContent,
  CouncilMemberItem,
  CurriculumIconType,
  CurriculumStageItem,
} from "@/types/site";

/** Id for a row added in the panel; unique enough for a single document. */
function newId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

/** Icons a curriculum card can draw, in the order the panel lists them. */
const CARD_ICONS: CurriculumIconType[] = [
  "curriculum",
  "faculty",
  "stem",
  "excellence",
  "play",
  "phonics",
  "math",
  "arts",
  "tech",
  "debate",
  "board",
  "exam",
];

/** Editor for one curriculum stage: its tab, its banner and its cards. */
function StageEditor({
  stage,
  onChange,
  onRemove,
}: {
  stage: CurriculumStageItem;
  onChange: (stage: CurriculumStageItem) => void;
  onRemove: () => void;
}) {
  const updateCard = (id: string, patch: Partial<CurriculumStageItem["cards"][number]>) =>
    onChange({ ...stage, cards: stage.cards.map((card) => (card.id === id ? { ...card, ...patch } : card)) });

  return (
    <div className="rounded-lg border border-slate-200 p-4 space-y-3">
      <div className="flex items-center justify-between gap-2">
        <h3 className="truncate text-[13.5px] font-semibold text-slate-800">{stage.label || "New stage"}</h3>
        <Button size="sm" variant="danger" onClick={onRemove}>
          Remove stage
        </Button>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Field label="Tab label" className="sm:flex-1" required>
          <Input value={stage.label} onChange={(e) => onChange({ ...stage, label: e.target.value })} />
        </Field>
        <Field label="Tab subtitle" className="sm:flex-1">
          <Input value={stage.subtitle} onChange={(e) => onChange({ ...stage, subtitle: e.target.value })} />
        </Field>
        <Field label="URL segment" className="sm:w-44" hint="Used by /academics/…">
          <Input value={stage.id} onChange={(e) => onChange({ ...stage, id: e.target.value })} />
        </Field>
      </div>

      <Field label="Tagline" hint="Shown beside the section heading when this tab is open.">
        <Textarea rows={2} value={stage.tagline} onChange={(e) => onChange({ ...stage, tagline: e.target.value })} />
      </Field>

      <div className="space-y-3 rounded-lg bg-slate-50/70 p-3">
        <p className="text-[12.5px] font-semibold text-slate-600">Stage panel</p>

        <PhotoPicker
          url={stage.bannerImageUrl}
          uploadKey={`stage-${stage.id}`}
          shape="landscape"
          onChange={(bannerImageUrl) => onChange({ ...stage, bannerImageUrl })}
        />

        <div className="flex flex-col gap-3 sm:flex-row">
          <Field label="Panel heading" className="sm:flex-1">
            <Input value={stage.bannerTitle} onChange={(e) => onChange({ ...stage, bannerTitle: e.target.value })} />
          </Field>
          <Field label="Panel subheading" className="sm:flex-1">
            <Input
              value={stage.bannerSubtitle}
              onChange={(e) => onChange({ ...stage, bannerSubtitle: e.target.value })}
            />
          </Field>
        </div>

        <Field label="Description">
          <Textarea
            rows={3}
            value={stage.description}
            onChange={(e) => onChange({ ...stage, description: e.target.value })}
          />
        </Field>

        <Field label="Panel points" hint="One per line.">
          <Textarea
            rows={3}
            value={stage.bannerFeatures.join("\n")}
            onChange={(e) =>
              onChange({
                ...stage,
                bannerFeatures: e.target.value.split("\n").map((line) => line.trim()).filter(Boolean),
              })
            }
          />
        </Field>
      </div>

      <div className="space-y-3 rounded-lg bg-slate-50/70 p-3">
        <p className="text-[12.5px] font-semibold text-slate-600">Cards</p>

        {stage.cards.map((card) => (
          <div key={card.id} className="rounded-lg border border-slate-200 bg-white p-3 space-y-2">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end">
              <Field label="Title" className="sm:flex-1" required>
                <Input value={card.title} onChange={(e) => updateCard(card.id, { title: e.target.value })} />
              </Field>
              <Field label="Badge" className="sm:w-40">
                <Input value={card.badge} onChange={(e) => updateCard(card.id, { badge: e.target.value })} />
              </Field>
              <Field label="Icon" className="sm:w-40">
                <Select
                  value={card.iconType}
                  onChange={(e) => updateCard(card.id, { iconType: e.target.value as CurriculumIconType })}
                >
                  {CARD_ICONS.map((icon) => (
                    <option key={icon} value={icon}>
                      {icon}
                    </option>
                  ))}
                </Select>
              </Field>
              <Button
                variant="danger"
                aria-label={`Remove ${card.title || "card"}`}
                onClick={() => onChange({ ...stage, cards: stage.cards.filter((item) => item.id !== card.id) })}
              >
                Remove
              </Button>
            </div>
            <Field label="Description">
              <Textarea rows={2} value={card.desc} onChange={(e) => updateCard(card.id, { desc: e.target.value })} />
            </Field>
          </div>
        ))}

        <Button
          variant="secondary"
          size="sm"
          onClick={() =>
            onChange({
              ...stage,
              cards: [
                ...stage.cards,
                { id: newId("card"), title: "", desc: "", badge: "", iconType: "curriculum" },
              ],
            })
          }
        >
          + Add card
        </Button>
      </div>
    </div>
  );
}

/** Editor for one student council post. */
function CouncilEditor({
  member,
  onChange,
  onRemove,
}: {
  member: CouncilMemberItem;
  onChange: (member: CouncilMemberItem) => void;
  onRemove: () => void;
}) {
  return (
    <div className="rounded-lg border border-slate-200 p-4 space-y-3">
      <div className="flex items-center justify-between gap-2">
        <h3 className="truncate text-[13.5px] font-semibold text-slate-800">{member.role || "New post"}</h3>
        <Button size="sm" variant="danger" onClick={onRemove}>
          Remove
        </Button>
      </div>

      <PhotoPicker
        url={member.imageUrl}
        uploadKey={`council-${member.id}`}
        clearable
        hint="Optional — without a photo the card shows the post's initial."
        onChange={(imageUrl) => onChange({ ...member, imageUrl })}
      />

      <div className="flex flex-col gap-3 sm:flex-row">
        <Field label="Post" className="sm:flex-1" required>
          <Input
            value={member.role}
            onChange={(e) => onChange({ ...member, role: e.target.value })}
            placeholder="Head Girl"
          />
        </Field>
        <Field label="Student" className="sm:flex-1">
          <Input value={member.name} onChange={(e) => onChange({ ...member, name: e.target.value })} />
        </Field>
        <Field label="Class" className="sm:w-40">
          <Input
            value={member.studentClass}
            onChange={(e) => onChange({ ...member, studentClass: e.target.value })}
            placeholder="Class XII-A"
          />
        </Field>
      </div>

      <Field label="Responsibility">
        <Textarea
          rows={2}
          value={member.responsibility}
          onChange={(e) => onChange({ ...member, responsibility: e.target.value })}
        />
      </Field>
    </div>
  );
}

/**
 * Editor for the academics page below the curriculum tabs: co-curricular
 * activities, sports and the student council.
 */
export default function AcademicsTab() {
  const { academics } = useSiteContent();
  const { saveAcademics } = useAdmin();

  const [draft, setDraft] = useState<AcademicsContent>(academics);
  const [saving, setSaving] = useState(false);

  // Follow the saved document, including a reload from the API.
  useEffect(() => setDraft(academics), [academics]);

  const dirty = JSON.stringify(draft) !== JSON.stringify(academics);

  const patch = (updates: Partial<AcademicsContent>) => setDraft((prev) => ({ ...prev, ...updates }));

  const handleSave = async () => {
    setSaving(true);
    await saveAcademics(draft);
    setSaving(false);
  };

  return (
    <div className="space-y-6 pb-24">
      <PageHeader
        title="Academics"
        description="The curriculum tabs, co-curricular activities, sports and the student council."
        actions={
          <a href="/academics" target="_blank" rel="noopener noreferrer">
            <Button variant="secondary" size="sm">
              View page ↗
            </Button>
          </a>
        }
      />

      <Card>
        <CardHeader title="Curriculum figures" description="The four numbers above the stage tabs." />
        <CardBody className="space-y-3">
          {draft.curriculum.highlights.map((stat) => (
            <div key={stat.id} className="flex flex-col gap-2 sm:flex-row sm:items-end">
              <Field label="Figure" className="sm:w-32">
                <Input
                  value={stat.value}
                  onChange={(e) =>
                    patch({
                      curriculum: {
                        ...draft.curriculum,
                        highlights: draft.curriculum.highlights.map((item) =>
                          item.id === stat.id ? { ...item, value: e.target.value } : item,
                        ),
                      },
                    })
                  }
                />
              </Field>
              <Field label="Label" className="sm:flex-1">
                <Input
                  value={stat.label}
                  onChange={(e) =>
                    patch({
                      curriculum: {
                        ...draft.curriculum,
                        highlights: draft.curriculum.highlights.map((item) =>
                          item.id === stat.id ? { ...item, label: e.target.value } : item,
                        ),
                      },
                    })
                  }
                />
              </Field>
              <Field label="Detail" className="sm:flex-1">
                <Input
                  value={stat.detail ?? ""}
                  onChange={(e) =>
                    patch({
                      curriculum: {
                        ...draft.curriculum,
                        highlights: draft.curriculum.highlights.map((item) =>
                          item.id === stat.id ? { ...item, detail: e.target.value } : item,
                        ),
                      },
                    })
                  }
                />
              </Field>
              <Button
                variant="danger"
                aria-label={`Remove ${stat.label || "figure"}`}
                onClick={() =>
                  patch({
                    curriculum: {
                      ...draft.curriculum,
                      highlights: draft.curriculum.highlights.filter((item) => item.id !== stat.id),
                    },
                  })
                }
              >
                Remove
              </Button>
            </div>
          ))}

          <Button
            variant="secondary"
            size="sm"
            onClick={() =>
              patch({
                curriculum: {
                  ...draft.curriculum,
                  highlights: [
                    ...draft.curriculum.highlights,
                    { id: newId("metric"), value: "", label: "", detail: "" },
                  ],
                },
              })
            }
          >
            + Add figure
          </Button>
        </CardBody>
      </Card>

      <Card>
        <CardHeader
          title="Curriculum stages"
          description="One tab per stage, each with its own page at /academics/[segment]."
        />
        <CardBody className="space-y-4">
          {draft.curriculum.stages.map((stage) => (
            <StageEditor
              key={stage.id}
              stage={stage}
              onChange={(next) =>
                patch({
                  curriculum: {
                    ...draft.curriculum,
                    stages: draft.curriculum.stages.map((item) => (item.id === stage.id ? next : item)),
                  },
                })
              }
              onRemove={() =>
                patch({
                  curriculum: {
                    ...draft.curriculum,
                    stages: draft.curriculum.stages.filter((item) => item.id !== stage.id),
                  },
                })
              }
            />
          ))}

          <Button
            variant="secondary"
            size="sm"
            onClick={() =>
              patch({
                curriculum: {
                  ...draft.curriculum,
                  stages: [
                    ...draft.curriculum.stages,
                    {
                      id: newId("stage"),
                      label: "",
                      subtitle: "",
                      tagline: "",
                      description: "",
                      bannerTitle: "",
                      bannerSubtitle: "",
                      bannerImageUrl: "",
                      bannerFeatures: [],
                      cards: [],
                    },
                  ],
                },
              })
            }
          >
            + Add stage
          </Button>
        </CardBody>
      </Card>

      <Card>
        <CardHeader title="Co-curricular activities" description="Clubs and activities that run alongside the curriculum." />
        <CardBody className="space-y-4">
          <Field label="Introduction">
            <Textarea
              rows={2}
              value={draft.coCurricularIntro}
              onChange={(e) => patch({ coCurricularIntro: e.target.value })}
            />
          </Field>
          <ContentCardRows
            cards={draft.coCurricular}
            onChange={(coCurricular) => patch({ coCurricular })}
            idPrefix="cc"
            addLabel="Add activity"
          />
        </CardBody>
      </Card>

      <Card>
        <CardHeader title="Sports & games" description="Games played and coached through the year." />
        <CardBody className="space-y-4">
          <Field label="Introduction">
            <Textarea rows={2} value={draft.sportsIntro} onChange={(e) => patch({ sportsIntro: e.target.value })} />
          </Field>
          <ContentCardRows
            cards={draft.sports}
            onChange={(sports) => patch({ sports })}
            idPrefix="sport"
            addLabel="Add sport"
          />
        </CardBody>
      </Card>

      <Card>
        <CardHeader title="Student council" description="One card per post, in this order." />
        <CardBody className="space-y-4">
          <Field label="Introduction">
            <Textarea rows={2} value={draft.councilIntro} onChange={(e) => patch({ councilIntro: e.target.value })} />
          </Field>

          {draft.council.map((member) => (
            <CouncilEditor
              key={member.id}
              member={member}
              onChange={(next) =>
                patch({ council: draft.council.map((item) => (item.id === next.id ? next : item)) })
              }
              onRemove={() => patch({ council: draft.council.filter((item) => item.id !== member.id) })}
            />
          ))}

          <Button
            variant="secondary"
            size="sm"
            onClick={() =>
              patch({
                council: [
                  ...draft.council,
                  { id: newId("council"), role: "", name: "", studentClass: "", responsibility: "", imageUrl: "" },
                ],
              })
            }
          >
            + Add post
          </Button>
        </CardBody>
      </Card>

      {/* Save bar — stays in reach however far down the page you are. */}
      <div className="sticky bottom-0 -mx-4 border-t border-slate-200 bg-white/95 px-4 py-3 backdrop-blur sm:mx-0 sm:rounded-xl sm:border sm:px-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-[12.5px] text-slate-500">
            {dirty ? "You have unsaved changes." : "Everything is saved."}
          </p>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" disabled={!dirty || saving} onClick={() => setDraft(academics)}>
              Discard
            </Button>
            <Button variant="primary" size="sm" disabled={!dirty || saving} onClick={() => void handleSave()}>
              {saving ? "Saving…" : "Save academics"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
