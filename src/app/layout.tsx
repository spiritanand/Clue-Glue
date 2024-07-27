import "~/styles/globals.css";
import { Kanit } from "next/font/google";
import { type Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";
import { Toaster } from "~/components/ui/sonner";
import ClientProviders from "~/app/ClientProviders";
import { getServerAuthSession } from "~/server/auth";

const kanit = Kanit({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Clue Glue | Self-Host Customer feedback boards",
  description: "Listen to feedback and deliver a better user experience",
  icons: [
    {
      rel: "icon",
      url: "/favicon.ico",
    },
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await getServerAuthSession();

  return (
    <html lang="en" className={`${kanit.className}`}>
      <body className="w-screen overflow-x-hidden">
        <Toaster richColors theme="light" />
        <ClientProviders session={session}>
          <TRPCReactProvider>{children}</TRPCReactProvider>
        </ClientProviders>
      </body>
    </html>
  );
}
