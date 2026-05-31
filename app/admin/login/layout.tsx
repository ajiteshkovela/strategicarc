import { Suspense } from "react"
import "../../admin.css"

export default function AdminLoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="admin-root">
      <Suspense fallback={<div className="admin-login">Loading…</div>}>{children}</Suspense>
    </div>
  )
}
