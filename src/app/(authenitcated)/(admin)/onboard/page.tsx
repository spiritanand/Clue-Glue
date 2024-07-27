import Image from "next/image";
import OnboardForm from "~/app/(authenitcated)/(admin)/onboard/OnboardForm";
import { getServerAuthSession } from "~/server/auth";
import { db } from "~/server/db";
import { eq } from "drizzle-orm";
import { companies } from "~/server/db/schema";
import { redirect } from "next/navigation";
import { ROUTES } from "~/lib/constants";

async function Page() {
  const session = await getServerAuthSession();
  const company = await db.query.companies.findFirst({
    where: eq(companies.adminId, session?.user?.id ?? ""),
  });

  if (company) redirect(ROUTES.ADMIN_FEEDBACK);

  return (
    <main className="bg-primary/10 flex min-h-screen flex-col items-center">
      <h2 className="mt-10 flex scroll-m-20 items-center gap-2 border-b pb-2 text-3xl font-semibold">
        Welcome to
        <span className="text-primary hidden text-4xl font-extrabold tracking-wide md:inline-block">
          CLUE GLUE
        </span>
        <Image
          src="/logo.svg"
          alt="Image"
          className="rounded-md object-cover"
          width={90}
          height={90}
        />
      </h2>

      <h4 className="scroll-m-20 text-center text-xl font-semibold tracking-tight">
        Fill out the form below to get started
      </h4>

      <OnboardForm />
    </main>
  );
}

export default Page;
