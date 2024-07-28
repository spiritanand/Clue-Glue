"use client";

import Link from "next/link";
import { Map, Megaphone, MessageCircleCode } from "lucide-react";
import { cn } from "~/lib/utils";
import { useParams, usePathname } from "next/navigation";

function NavMenu({ className }: { className?: string }) {
  const pathname = usePathname();
  const params = useParams<{ companyName: string }>();

  return (
    <nav
      className={cn(
        "flex items-start gap-2 px-2 font-medium md:text-sm lg:px-4",
        className,
      )}
    >
      <Link
        href={`/${params.companyName}/roadmap`}
        className={`${
          pathname.includes("roadmap")
            ? "text-primary bg-gray-950"
            : "text-muted-foreground hover:bg-gray-700"
        } hover:text-primary flex items-center gap-3 rounded-lg px-2 py-2 transition-all md:px-3`}
      >
        <Map className="h-6 w-6 md:h-4 md:w-4" />
        <p>Roadmap</p>
      </Link>

      <Link
        href={`/${params.companyName}/feedback`}
        className={`${
          pathname.includes("feedback")
            ? "text-primary bg-gray-950"
            : "text-muted-foreground hover:bg-gray-700"
        } hover:text-primary flex items-center gap-3 rounded-lg px-2 py-2 transition-all md:px-3`}
      >
        <MessageCircleCode className="h-6 w-6 md:h-4 md:w-4" />
        <p>Feedback</p>
      </Link>

      <Link
        href={`/${params.companyName}/posts`}
        className={`${
          pathname.includes("posts")
            ? "text-primary bg-gray-950"
            : "text-muted-foreground hover:bg-gray-700"
        } hover:text-primary flex items-center gap-3 rounded-lg px-2 py-2 transition-all md:px-3`}
      >
        <Megaphone className="h-6 w-6 md:h-4 md:w-4" />
        <p>Posts</p>
      </Link>
    </nav>
  );
}

export default NavMenu;
