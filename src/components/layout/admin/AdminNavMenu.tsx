"use client";

import Link from "next/link";
import { LineChart, Map, Megaphone, MessageCircleCode } from "lucide-react";
import { cn } from "~/lib/utils";
import { ROUTES } from "~/lib/constants";
import { usePathname } from "next/navigation";

function AdminNavMenu({ className }: { className?: string }) {
  const pathname = usePathname();

  return (
    <nav
      className={cn(
        "flex items-start gap-2 px-2 font-medium md:text-sm lg:px-4",
        className,
      )}
    >
      <Link
        href={ROUTES.ADMIN_ROADMAP}
        className={`${
          pathname === ROUTES.ADMIN_ROADMAP
            ? "text-primary bg-gray-950"
            : "text-muted-foreground hover:bg-gray-700"
        } hover:text-primary flex items-center gap-3 rounded-lg px-2 py-2 transition-all md:px-3`}
      >
        <Map className="h-6 w-6 md:h-4 md:w-4" />
        <p>Roadmap</p>
      </Link>

      <Link
        href={ROUTES.ADMIN_FEEDBACKS}
        className={`${
          pathname === ROUTES.ADMIN_FEEDBACKS
            ? "text-primary bg-gray-950"
            : "text-muted-foreground hover:bg-gray-700"
        } hover:text-primary flex items-center gap-3 rounded-lg px-2 py-2 transition-all md:px-3`}
      >
        <MessageCircleCode className="h-6 w-6 md:h-4 md:w-4" />
        <p>Feedbacks</p>
      </Link>

      <Link
        href={ROUTES.ADMIN_POSTS}
        className={`${
          pathname === ROUTES.ADMIN_POSTS
            ? "text-primary bg-gray-950"
            : "text-muted-foreground hover:bg-gray-700"
        } hover:text-primary flex items-center gap-3 rounded-lg px-2 py-2 transition-all md:px-3`}
      >
        <Megaphone className="h-6 w-6 md:h-4 md:w-4" />
        <p>Posts</p>
      </Link>

      <Link
        href={ROUTES.ADMIN_ANALYTICS}
        className={`${
          pathname === ROUTES.ADMIN_ANALYTICS
            ? "text-primary bg-gray-950"
            : "text-muted-foreground hover:bg-gray-700"
        } hover:text-primary flex items-center gap-3 rounded-lg px-2 py-2 transition-all md:px-3`}
      >
        <LineChart className="h-6 w-6 md:h-4 md:w-4" />
        <p>Analytics</p>
      </Link>
    </nav>
  );
}

export default AdminNavMenu;
