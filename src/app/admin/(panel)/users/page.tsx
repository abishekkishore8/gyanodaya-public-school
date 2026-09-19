import { redirect } from "next/navigation";

import UsersTab from "@/components/admin/tabs/UsersTab";
import { getCurrentAdmin } from "@/server/session";

export const dynamic = "force-dynamic";

/** The layout guard already ran; this re-reads the session to know who "you" are. */
export default async function Page() {
  const admin = await getCurrentAdmin();
  if (!admin) redirect("/admin/login");

  return <UsersTab currentUserId={admin.id} />;
}
