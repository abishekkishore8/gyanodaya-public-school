"use client";

import Button from "@/components/admin/ui/Button";
import { Field, Input, Textarea } from "@/components/admin/ui/Field";
import PhotoPicker from "@/components/admin/ui/PhotoPicker";
import type { ContentCardItem } from "@/types/site";

/** Id for a card added in the panel; unique enough for a single document. */
function newId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

interface ContentCardRowsProps {
  cards: ContentCardItem[];
  onChange: (cards: ContentCardItem[]) => void;
  /** Prefix for generated ids, e.g. "facility". */
  idPrefix: string;
  /** Label on the add button, e.g. "Add facility". */
  addLabel: string;
  /** Shown under the title field where the anchor matters. */
  titleHint?: string;
}

/**
 * Editor for the photo cards used by the facilities, co-curricular and sports
 * sections: photo, title, badge and description, in display order.
 */
export default function ContentCardRows({
  cards,
  onChange,
  idPrefix,
  addLabel,
  titleHint,
}: ContentCardRowsProps) {
  const update = (id: string, patch: Partial<ContentCardItem>) =>
    onChange(cards.map((card) => (card.id === id ? { ...card, ...patch } : card)));

  const move = (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= cards.length) return;
    const next = [...cards];
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  };

  return (
    <div className="space-y-4">
      {cards.map((card, index) => (
        <div key={card.id} className="rounded-lg border border-slate-200 p-4 space-y-3">
          <div className="flex items-center justify-between gap-2">
            <h3 className="truncate text-[13.5px] font-semibold text-slate-800">
              {card.title || "New card"}
            </h3>
            <div className="flex shrink-0 items-center gap-1">
              <Button size="sm" variant="ghost" aria-label="Move up" disabled={index === 0} onClick={() => move(index, -1)}>
                ↑
              </Button>
              <Button
                size="sm"
                variant="ghost"
                aria-label="Move down"
                disabled={index === cards.length - 1}
                onClick={() => move(index, 1)}
              >
                ↓
              </Button>
              <Button size="sm" variant="danger" onClick={() => onChange(cards.filter((item) => item.id !== card.id))}>
                Remove
              </Button>
            </div>
          </div>

          <PhotoPicker
            url={card.imageUrl}
            uploadKey={`${idPrefix}-${card.id}`}
            shape="landscape"
            clearable
            onChange={(imageUrl) => update(card.id, { imageUrl })}
          />

          <div className="flex flex-col gap-3 sm:flex-row">
            <Field label="Title" className="sm:flex-1" required hint={titleHint}>
              <Input value={card.title} onChange={(e) => update(card.id, { title: e.target.value })} />
            </Field>
            <Field label="Badge" className="sm:w-56" hint="Small label over the photo.">
              <Input value={card.tag} onChange={(e) => update(card.id, { tag: e.target.value })} />
            </Field>
          </div>

          <Field label="Description">
            <Textarea
              rows={2}
              value={card.description}
              onChange={(e) => update(card.id, { description: e.target.value })}
            />
          </Field>
        </div>
      ))}

      <Button
        variant="secondary"
        size="sm"
        onClick={() =>
          onChange([...cards, { id: newId(idPrefix), title: "", tag: "", description: "", imageUrl: "" }])
        }
      >
        + {addLabel}
      </Button>
    </div>
  );
}
