import type { Metadata } from "next";
import AdminPanel from "@/components/AdminPanel";

// Keep this page out of search engines entirely.
export const metadata: Metadata = {
  title: "VAULT — Admin",
  robots: { index: false, follow: false, nocache: true },
};

export default function AdminPage() {
  return <AdminPanel />;
}
