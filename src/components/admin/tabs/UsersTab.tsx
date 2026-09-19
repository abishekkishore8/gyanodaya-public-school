"use client";

import { useCallback, useEffect, useState, type FormEvent } from "react";

import Badge from "@/components/admin/ui/Badge";
import Button from "@/components/admin/ui/Button";
import { Card, CardBody, CardHeader } from "@/components/admin/ui/Card";
import { Field, Input } from "@/components/admin/ui/Field";
import PageHeader from "@/components/admin/ui/PageHeader";
import { useToast } from "@/context/ToastContext";
import type { AdminUser } from "@/types/admin";

/** Reads `{ message }` off a failed response. */
async function readMessage(response: Response, fallback: string): Promise<string> {
  const body = (await response.json().catch(() => ({}))) as { message?: string };
  return body.message || fallback;
}

function formatDate(iso?: string): string {
  if (!iso) return "Never signed in";
  return new Date(iso).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" });
}

/** Manages administrator accounts stored in the `admin_users` collection. */
export default function UsersTab({ currentUserId }: { currentUserId: string }) {
  const { showToast } = useToast();

  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [creating, setCreating] = useState(false);

  const [passwordTarget, setPasswordTarget] = useState<AdminUser | null>(null);
  const [replacementPassword, setReplacementPassword] = useState("");
  const [savingPassword, setSavingPassword] = useState(false);

  const loadUsers = useCallback(async () => {
    try {
      const response = await fetch("/api/admin/users");
      if (!response.ok) throw new Error(await readMessage(response, "Failed to load administrators."));
      const body = (await response.json()) as { users: AdminUser[] };
      setUsers(body.users);
      setError(null);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Failed to load administrators.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadUsers();
  }, [loadUsers]);

  const handleCreate = async (event: FormEvent) => {
    event.preventDefault();
    setCreating(true);

    try {
      const response = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, name, password }),
      });

      if (!response.ok) {
        showToast(`⚠️ ${await readMessage(response, "Could not create the administrator.")}`);
        return;
      }

      showToast(`Administrator “${username.trim().toLowerCase()}” created.`);
      setUsername("");
      setName("");
      setPassword("");
      await loadUsers();
    } finally {
      setCreating(false);
    }
  };

  const handleChangePassword = async (event: FormEvent) => {
    event.preventDefault();
    if (!passwordTarget) return;
    setSavingPassword(true);

    try {
      const response = await fetch(`/api/admin/users/${passwordTarget.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: replacementPassword }),
      });

      if (!response.ok) {
        showToast(`⚠️ ${await readMessage(response, "Could not update the password.")}`);
        return;
      }

      showToast(`Password updated for “${passwordTarget.username}”.`);
      setPasswordTarget(null);
      setReplacementPassword("");
    } finally {
      setSavingPassword(false);
    }
  };

  const handleDelete = async (user: AdminUser) => {
    const isSelf = user.id === currentUserId;
    const question = isSelf
      ? "Delete your own account? You will be signed out immediately."
      : `Delete the administrator “${user.username}”?`;
    if (!window.confirm(question)) return;

    const response = await fetch(`/api/admin/users/${user.id}`, { method: "DELETE" });

    if (!response.ok) {
      showToast(`⚠️ ${await readMessage(response, "Could not delete the administrator.")}`);
      return;
    }

    if (isSelf) {
      window.location.href = "/admin/login";
      return;
    }

    showToast(`Administrator “${user.username}” removed.`);
    await loadUsers();
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Administrators"
        description="Anyone listed here can edit every part of the website. Accounts are stored in the database."
      />

      <Card>
        <CardHeader title="Add an administrator" />
        <CardBody>
          <form onSubmit={handleCreate} className="grid gap-4 sm:grid-cols-3">
            <Field label="Username" required hint="Letters, numbers, dots, underscores and hyphens.">
              <Input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="principal"
                autoComplete="off"
                required
              />
            </Field>

            <Field label="Full name" hint="Shown in the account menu.">
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="A. K. Sharma"
                autoComplete="off"
              />
            </Field>

            <Field label="Password" required hint="At least 10 characters, with a letter and a number.">
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
                required
              />
            </Field>

            <div className="sm:col-span-3">
              <Button type="submit" variant="primary" disabled={creating}>
                {creating ? "Creating…" : "Create administrator"}
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>

      <Card>
        <CardHeader
          title="Accounts"
          badge={!loading ? <Badge tone="brand">{users.length}</Badge> : undefined}
          description="The last remaining account cannot be deleted."
        />

        {loading ? (
          <CardBody>
            <div className="space-y-2">
              <div className="h-12 animate-pulse rounded-lg bg-slate-100" />
              <div className="h-12 animate-pulse rounded-lg bg-slate-100" />
            </div>
          </CardBody>
        ) : error ? (
          <CardBody>
            <p className="text-[13px] text-red-700">{error}</p>
          </CardBody>
        ) : (
          <ul className="divide-y divide-slate-100">
            {users.map((user) => (
              <li key={user.id} className="flex flex-wrap items-center gap-3 px-5 py-3.5">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-slate-100 text-[12px] font-bold text-slate-600">
                  {(user.name || user.username).slice(0, 2).toUpperCase()}
                </span>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="truncate text-[13.5px] font-semibold text-slate-900">{user.name}</p>
                    {user.id === currentUserId && <Badge tone="brand">You</Badge>}
                  </div>
                  <p className="truncate text-[12px] text-slate-500">
                    @{user.username} · {formatDate(user.lastLoginAt)}
                  </p>
                </div>

                <div className="flex shrink-0 items-center gap-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => {
                      setPasswordTarget(user);
                      setReplacementPassword("");
                    }}
                  >
                    Change password
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    disabled={users.length <= 1}
                    title={users.length <= 1 ? "The last administrator cannot be deleted" : undefined}
                    onClick={() => void handleDelete(user)}
                  >
                    Delete
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Card>

      {passwordTarget && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-slate-900/50 p-4"
          role="dialog"
          aria-modal="true"
          onClick={() => setPasswordTarget(null)}
        >
          <form
            onSubmit={handleChangePassword}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm rounded-xl border border-slate-200 bg-white p-5 shadow-2xl"
          >
            <h2 className="text-[15px] font-semibold text-slate-900">Change password</h2>
            <p className="mt-1 text-[13px] text-slate-500">
              For <strong className="font-semibold text-slate-700">@{passwordTarget.username}</strong>
            </p>

            <Field label="New password" required className="mt-4" hint="At least 10 characters, a letter and a number.">
              <Input
                type="password"
                autoFocus
                required
                value={replacementPassword}
                onChange={(e) => setReplacementPassword(e.target.value)}
                autoComplete="new-password"
              />
            </Field>

            <div className="mt-5 flex justify-end gap-2">
              <Button type="button" variant="ghost" onClick={() => setPasswordTarget(null)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" disabled={savingPassword}>
                {savingPassword ? "Saving…" : "Update password"}
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
