import { redirect } from "next/navigation"
import { isAdminAuthenticated, isAdminConfigured } from "@/lib/admin-auth"

export default async function AdminProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  if (!isAdminConfigured()) {
    redirect("/admin/login?error=config")
  }

  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login")
  }

  return children
}
