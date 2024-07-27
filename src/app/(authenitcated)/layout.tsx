import { AdminHeader } from "~/components/layout/admin/AdminHeader";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <AdminHeader>
        <main className="container">{children}</main>
      </AdminHeader>
    </>
  );
}
