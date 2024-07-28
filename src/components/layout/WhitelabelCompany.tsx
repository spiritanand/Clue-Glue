"use client";

import { Package2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ROUTES } from "~/lib/constants";

function WhitelabelCompany({ companyName }: { companyName: string }) {
  const pathname = usePathname();
  const isAdminPage = pathname.includes("admin");

  return (
    <Link
      href={isAdminPage ? ROUTES.ADMIN_FEEDBACK : `/${companyName}/feedback`}
      className="flex items-center gap-2 font-semibold"
    >
      <Package2 className="h-6 w-6" />
      <span>{companyName}</span>
    </Link>
  );
}

export default WhitelabelCompany;
