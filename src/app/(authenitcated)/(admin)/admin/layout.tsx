import { AdminHeader } from "~/components/layout/admin/AdminHeader";
import { getServerAuthSession } from "~/server/auth";
import { db } from "~/server/db";
import { eq } from "drizzle-orm";
import { companies } from "~/server/db/schema";
import { redirect } from "next/navigation";
import { ROUTES } from "~/lib/constants";

export default async function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await getServerAuthSession();
  const company = await db.query.companies.findFirst({
    where: eq(companies.adminId, session?.user?.id ?? ""),
  });

  if (!company) redirect(ROUTES.ONBOARD);

  return (
    <>
      <AdminHeader>
        <main className="container">{children}</main>
      </AdminHeader>
    </>
  );
}
