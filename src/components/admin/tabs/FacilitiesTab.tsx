"use client";

import { useEffect, useState } from "react";

import ContentCardRows from "@/components/admin/ContentCardRows";
import Button from "@/components/admin/ui/Button";
import { Card, CardBody, CardHeader } from "@/components/admin/ui/Card";
import { Field, Textarea } from "@/components/admin/ui/Field";
import PageHeader from "@/components/admin/ui/PageHeader";
import { useAdmin } from "@/context/AdminContext";
import { useSiteContent } from "@/context/SiteContentContext";
import type { FacilitiesContent } from "@/types/site";

/**
 * Editor for the facilities page.
 *
 * Each card's anchor comes from its title, and the FACILITIES navigation menu
 * links to those anchors — renaming a card means updating the matching menu
 * entry in `src/data/navigation.ts`.
 */
export default function FacilitiesTab() {
  const { facilities } = useSiteContent();
  const { saveFacilities } = useAdmin();

  const [draft, setDraft] = useState<FacilitiesContent>(facilities);
  const [saving, setSaving] = useState(false);

  // Follow the saved document, including a reload from the API.
  useEffect(() => setDraft(facilities), [facilities]);

  const dirty = JSON.stringify(draft) !== JSON.stringify(facilities);

  const handleSave = async () => {
    setSaving(true);
    await saveFacilities(draft);
    setSaving(false);
  };

  return (
    <div className="space-y-6 pb-24">
      <PageHeader
        title="Facilities"
        description="The campus facility cards — infrastructure, classrooms, laboratories, transport, hostel and security."
        actions={
          <a href="/facilities" target="_blank" rel="noopener noreferrer">
            <Button variant="secondary" size="sm">
              View page ↗
            </Button>
          </a>
        }
      />

      <Card>
        <CardHeader title="Introduction" description="Shown under the section heading." />
        <CardBody>
          <Field label="Introduction">
            <Textarea
              rows={3}
              value={draft.intro}
              onChange={(e) => setDraft((prev) => ({ ...prev, intro: e.target.value }))}
            />
          </Field>
        </CardBody>
      </Card>

      <Card>
        <CardHeader title="Facility cards" description="Shown in this order on the facilities page and the home page." />
        <CardBody>
          <ContentCardRows
            cards={draft.items}
            onChange={(items) => setDraft((prev) => ({ ...prev, items }))}
            idPrefix="facility"
            addLabel="Add facility"
            titleHint="The navigation menu links to this title — tell the developer if you rename one."
          />
        </CardBody>
      </Card>

      {/* Save bar — stays in reach however far down the page you are. */}
      <div className="sticky bottom-0 -mx-4 border-t border-slate-200 bg-white/95 px-4 py-3 backdrop-blur sm:mx-0 sm:rounded-xl sm:border sm:px-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-[12.5px] text-slate-500">
            {dirty ? "You have unsaved changes." : "Everything is saved."}
          </p>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" disabled={!dirty || saving} onClick={() => setDraft(facilities)}>
              Discard
            </Button>
            <Button variant="primary" size="sm" disabled={!dirty || saving} onClick={() => void handleSave()}>
              {saving ? "Saving…" : "Save facilities"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
