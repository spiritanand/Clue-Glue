"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "~/components/ui/button";

function LoginToSamePage() {
  const pathname = usePathname();

  return (
    <Link href={`/api/auth/signin?callbackUrl=${pathname}`}>
      <Button>Log In</Button>
    </Link>
  );
}

export default LoginToSamePage;
