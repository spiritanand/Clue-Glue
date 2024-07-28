import Navbar from "./_components/navbar";
import Image from "next/image";
import { CircleCheck } from "lucide-react";
import Link from "next/link";
import { AUTH_ACTION_LINKS, ROUTES } from "~/lib/constants";
import { Button } from "~/components/ui/button";
import { getServerAuthSession } from "~/server/auth";

export default async function Page() {
  const session = await getServerAuthSession();

  return (
    <div className="bg-primary/10 min-h-screen">
      <div className="container">
        <Navbar />

        <main className="flex-1">
          <section className="w-full py-12 md:py-4">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_550px]">
              <div className="flex flex-col items-center justify-center space-y-4 md:space-y-8">
                <h1 className="text-center text-4xl font-bold sm:text-6xl xl:text-[108px]">
                  Get{" "}
                  <span className="font-black text-[#0510EB]">Feedback.</span>
                </h1>
                <h1 className="text-center text-4xl font-bold sm:text-6xl xl:text-[108px]">
                  Build{" "}
                  <span className="font-black text-[#0510EB]">Better.</span>
                </h1>
                <p className="text-muted-foreground max-w-[600px] text-center text-xs md:text-lg">
                  Collect feedback, uncover insights, and ship an awesome
                  product.
                </p>
                <Link
                  href={
                    session?.user?.id
                      ? ROUTES.ADMIN_FEEDBACK
                      : AUTH_ACTION_LINKS.SIGN_IN
                  }
                >
                  <Button className="text-lg shadow-2xl">Get Started</Button>
                </Link>
                <ul className="flex list-none gap-4 py-2 text-sm text-[#0510EB]/50 md:gap-8">
                  <li className="flex gap-2">
                    <CircleCheck />
                    Free
                  </li>
                  <li className="flex gap-2">
                    <CircleCheck />
                    Open Source
                  </li>
                  <li className="flex gap-2">
                    <CircleCheck />
                    Self host
                  </li>
                </ul>
              </div>
              <Image
                src="/hero-primary.svg"
                width={700}
                height={550}
                objectFit="cover"
                alt="Hero"
                className="order-last overflow-hidden rounded-xl object-bottom sm:w-full"
              />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
