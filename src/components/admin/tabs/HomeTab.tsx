"use client";

import { useEffect, useState } from "react";

import Button from "@/components/admin/ui/Button";
import { Card, CardBody, CardHeader } from "@/components/admin/ui/Card";
import { Field, Input, Select, Textarea } from "@/components/admin/ui/Field";
import PageHeader from "@/components/admin/ui/PageHeader";
import PhotoPicker from "@/components/admin/ui/PhotoPicker";
import { HIGHLIGHT_ICON_KEYS } from "@/components/icons/HighlightIcon";
import { useAdmin } from "@/context/AdminContext";
import { useSiteContent } from "@/context/SiteContentContext";
import type { HighlightIconKey, HomeContent } from "@/types/site";

/** Id for a row added in the panel; unique enough for a single document. */
function newId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

/**
 * Editor for the home page: the hero carousel, the highlights strip, the
 * welcome block, the FAQs and the admissions banner.
 */
export default function HomeTab() {
  const { home } = useSiteContent();
  const { saveHome } = useAdmin();

  const [draft, setDraft] = useState<HomeContent>(home);
  const [saving, setSaving] = useState(false);

  // Follow the saved document, including a reload from the API.
  useEffect(() => setDraft(home), [home]);

  const dirty = JSON.stringify(draft) !== JSON.stringify(home);

  const patch = (updates: Partial<HomeContent>) => setDraft((prev) => ({ ...prev, ...updates }));

  const moveSlide = (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= draft.hero.length) return;
    const next = [...draft.hero];
    [next[index], next[target]] = [next[target], next[index]];
    patch({ hero: next });
  };

  const handleSave = async () => {
    setSaving(true);
    await saveHome(draft);
    setSaving(false);
  };

  return (
    <div className="space-y-6 pb-24">
      <PageHeader
        title="Home page"
        description="The hero carousel, the highlights strip, the welcome block, the FAQs and the admissions banner."
        actions={
          <a href="/" target="_blank" rel="noopener noreferrer">
            <Button variant="secondary" size="sm">
              View page ↗
            </Button>
          </a>
        }
      />

      <Card>
        <CardHeader
          title="Hero carousel"
          description="Slides rotate every few seconds in this order. The headline takes a gold accent after its first comma."
        />
        <CardBody className="space-y-4">
          {draft.hero.map((slide, index) => (
            <div key={slide.id} className="rounded-lg border border-slate-200 p-4 space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[12px] font-semibold text-slate-400">Slide {index + 1}</span>
                <div className="flex items-center gap-1">
                  <Button size="sm" variant="ghost" aria-label="Move up" disabled={index === 0} onClick={() => moveSlide(index, -1)}>
                    ↑
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    aria-label="Move down"
                    disabled={index === draft.hero.length - 1}
                    onClick={() => moveSlide(index, 1)}
                  >
                    ↓
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => patch({ hero: draft.hero.filter((item) => item.id !== slide.id) })}
                  >
                    Remove
                  </Button>
                </div>
              </div>

              <PhotoPicker
                url={slide.imageUrl}
                uploadKey={`hero-${slide.id}`}
                shape="landscape"
                hint="A wide landscape photograph works best."
                onChange={(imageUrl) =>
                  patch({ hero: draft.hero.map((item) => (item.id === slide.id ? { ...item, imageUrl } : item)) })
                }
              />

              <Field label="Badge" hint="Small pill above the headline.">
                <Input
                  value={slide.tag}
                  onChange={(e) =>
                    patch({
                      hero: draft.hero.map((item) => (item.id === slide.id ? { ...item, tag: e.target.value } : item)),
                    })
                  }
                />
              </Field>
              <Field label="Headline" required>
                <Input
                  value={slide.headline}
                  onChange={(e) =>
                    patch({
                      hero: draft.hero.map((item) =>
                        item.id === slide.id ? { ...item, headline: e.target.value } : item,
                      ),
                    })
                  }
                />
              </Field>
              <Field label="Sub-headline">
                <Textarea
                  rows={2}
                  value={slide.subtitle}
                  onChange={(e) =>
                    patch({
                      hero: draft.hero.map((item) =>
                        item.id === slide.id ? { ...item, subtitle: e.target.value } : item,
                      ),
                    })
                  }
                />
              </Field>
            </div>
          ))}

          <Button
            variant="secondary"
            size="sm"
            onClick={() =>
              patch({
                hero: [...draft.hero, { id: newId("hero"), tag: "", headline: "", subtitle: "", imageUrl: "" }],
              })
            }
          >
            + Add slide
          </Button>
        </CardBody>
      </Card>

      <Card>
        <CardHeader title="Highlights strip" description="The card strip that overlaps the bottom of the hero." />
        <CardBody className="space-y-3">
          {draft.highlights.map((card) => (
            <div key={card.id} className="flex flex-col gap-2 sm:flex-row sm:items-end">
              <Field label="Icon" className="sm:w-40">
                <Select
                  value={card.icon}
                  onChange={(e) =>
                    patch({
                      highlights: draft.highlights.map((item) =>
                        item.id === card.id ? { ...item, icon: e.target.value as HighlightIconKey } : item,
                      ),
                    })
                  }
                >
                  {HIGHLIGHT_ICON_KEYS.map((key) => (
                    <option key={key} value={key}>
                      {key}
                    </option>
                  ))}
                </Select>
              </Field>
              <Field label="Title" className="sm:w-56">
                <Input
                  value={card.title}
                  onChange={(e) =>
                    patch({
                      highlights: draft.highlights.map((item) =>
                        item.id === card.id ? { ...item, title: e.target.value } : item,
                      ),
                    })
                  }
                />
              </Field>
              <Field label="Description" className="sm:flex-1">
                <Input
                  value={card.desc}
                  onChange={(e) =>
                    patch({
                      highlights: draft.highlights.map((item) =>
                        item.id === card.id ? { ...item, desc: e.target.value } : item,
                      ),
                    })
                  }
                />
              </Field>
              <Button
                variant="danger"
                aria-label={`Remove ${card.title || "card"}`}
                onClick={() => patch({ highlights: draft.highlights.filter((item) => item.id !== card.id) })}
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
                highlights: [...draft.highlights, { id: newId("highlight"), icon: "classroom", title: "", desc: "" }],
              })
            }
          >
            + Add card
          </Button>
        </CardBody>
      </Card>

      <Card>
        <CardHeader title="Welcome block" description="The introduction with the campus photograph, shown on the About page." />
        <CardBody className="space-y-4">
          <PhotoPicker
            url={draft.welcome.imageUrl}
            uploadKey="welcome-photo"
            shape="landscape"
            onChange={(imageUrl) => patch({ welcome: { ...draft.welcome, imageUrl } })}
          />

          <div className="flex flex-col gap-3 sm:flex-row">
            <Field label="Eyebrow" className="sm:w-56">
              <Input
                value={draft.welcome.eyebrow}
                onChange={(e) => patch({ welcome: { ...draft.welcome, eyebrow: e.target.value } })}
              />
            </Field>
            <Field label="Heading" className="sm:flex-1" required>
              <Input
                value={draft.welcome.title}
                onChange={(e) => patch({ welcome: { ...draft.welcome, title: e.target.value } })}
              />
            </Field>
          </div>

          <Field label="Introduction">
            <Textarea
              rows={4}
              value={draft.welcome.body}
              onChange={(e) => patch({ welcome: { ...draft.welcome, body: e.target.value } })}
            />
          </Field>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Field label="Badge figure" className="sm:w-40" hint="Over the photograph.">
              <Input
                value={draft.welcome.badgeValue}
                onChange={(e) => patch({ welcome: { ...draft.welcome, badgeValue: e.target.value } })}
              />
            </Field>
            <Field label="Badge label" className="sm:flex-1">
              <Input
                value={draft.welcome.badgeLabel}
                onChange={(e) => patch({ welcome: { ...draft.welcome, badgeLabel: e.target.value } })}
              />
            </Field>
            <Field label="Button" className="sm:w-56">
              <Input
                value={draft.welcome.buttonLabel}
                onChange={(e) => patch({ welcome: { ...draft.welcome, buttonLabel: e.target.value } })}
              />
            </Field>
          </div>

          <div className="space-y-3 rounded-lg bg-slate-50/70 p-3">
            <p className="text-[12.5px] font-semibold text-slate-600">Figures</p>
            {draft.welcome.stats.map((stat) => (
              <div key={stat.id} className="flex flex-col gap-2 sm:flex-row sm:items-end">
                <Field label="Figure" className="sm:w-40">
                  <Input
                    value={stat.value}
                    onChange={(e) =>
                      patch({
                        welcome: {
                          ...draft.welcome,
                          stats: draft.welcome.stats.map((item) =>
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
                        welcome: {
                          ...draft.welcome,
                          stats: draft.welcome.stats.map((item) =>
                            item.id === stat.id ? { ...item, label: e.target.value } : item,
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
                      welcome: {
                        ...draft.welcome,
                        stats: draft.welcome.stats.filter((item) => item.id !== stat.id),
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
                  welcome: {
                    ...draft.welcome,
                    stats: [...draft.welcome.stats, { id: newId("stat"), value: "", label: "" }],
                  },
                })
              }
            >
              + Add figure
            </Button>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader title="Frequently asked questions" description="The accordion near the bottom of the home page." />
        <CardBody className="space-y-4">
          {draft.faqs.map((faq) => (
            <div key={faq.id} className="rounded-lg border border-slate-200 p-4 space-y-3">
              <div className="flex items-start justify-between gap-3">
                <Field label="Question" className="min-w-0 flex-1" required>
                  <Input
                    value={faq.question}
                    onChange={(e) =>
                      patch({
                        faqs: draft.faqs.map((item) =>
                          item.id === faq.id ? { ...item, question: e.target.value } : item,
                        ),
                      })
                    }
                  />
                </Field>
                <Button
                  variant="danger"
                  className="mt-6"
                  onClick={() => patch({ faqs: draft.faqs.filter((item) => item.id !== faq.id) })}
                >
                  Remove
                </Button>
              </div>
              <Field label="Answer">
                <Textarea
                  rows={3}
                  value={faq.answer}
                  onChange={(e) =>
                    patch({
                      faqs: draft.faqs.map((item) => (item.id === faq.id ? { ...item, answer: e.target.value } : item)),
                    })
                  }
                />
              </Field>
            </div>
          ))}

          <Button
            variant="secondary"
            size="sm"
            onClick={() => patch({ faqs: [...draft.faqs, { id: newId("faq"), question: "", answer: "" }] })}
          >
            + Add question
          </Button>
        </CardBody>
      </Card>

      <Card>
        <CardHeader
          title="Admissions banner"
          description="The green strip at the foot of most pages. The academic session from Site settings is added after the heading."
        />
        <CardBody className="space-y-4">
          <Field label="Heading" hint="The session is appended, e.g. “Admissions Open for Academic Year 2025–26”.">
            <Input value={draft.cta.title} onChange={(e) => patch({ cta: { ...draft.cta, title: e.target.value } })} />
          </Field>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Field label="Sub-heading" className="sm:flex-1">
              <Input
                value={draft.cta.subtitle}
                onChange={(e) => patch({ cta: { ...draft.cta, subtitle: e.target.value } })}
              />
            </Field>
            <Field label="Button" className="sm:w-56">
              <Input
                value={draft.cta.buttonLabel}
                onChange={(e) => patch({ cta: { ...draft.cta, buttonLabel: e.target.value } })}
              />
            </Field>
          </div>
        </CardBody>
      </Card>

      {/* Save bar — stays in reach however far down the page you are. */}
      <div className="sticky bottom-0 -mx-4 border-t border-slate-200 bg-white/95 px-4 py-3 backdrop-blur sm:mx-0 sm:rounded-xl sm:border sm:px-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-[12.5px] text-slate-500">
            {dirty ? "You have unsaved changes." : "Everything is saved."}
          </p>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" disabled={!dirty || saving} onClick={() => setDraft(home)}>
              Discard
            </Button>
            <Button variant="primary" size="sm" disabled={!dirty || saving} onClick={() => void handleSave()}>
              {saving ? "Saving…" : "Save home page"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
