"use client";

import { SessionProvider } from "next-auth/react";
import { type Session } from "next-auth";

function ClientProviders({
  session,
  children,
}: {
  session: Session | null;
  children: React.ReactNode;
}) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}

export default ClientProviders;
