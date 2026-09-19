import { redirect } from "next/navigation";

import LoginForm from "@/components/admin/LoginForm";
import { getCurrentAdmin } from "@/server/session";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Administrator Sign-in · Gyanodaya Public School",
  robots: { index: false, follow: false },
};

/** Sign-in page. Sits outside the `(panel)` group so it is not behind the guard. */
export default async function AdminLoginPage() {
  // Already signed in? Go straight to the panel.
  if (await getCurrentAdmin()) redirect("/admin");

  return <LoginForm />;
}
