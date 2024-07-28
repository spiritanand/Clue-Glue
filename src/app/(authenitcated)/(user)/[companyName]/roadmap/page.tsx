import { api } from "~/trpc/server";
import Roadmap from "~/app/(authenitcated)/(user)/[companyName]/roadmap/Roadmap";
import { db } from "~/server/db";
import { eq } from "drizzle-orm";
import { boards } from "~/server/db/schema";

async function Page({ params }: { params: { companyName: string } }) {
  const companyName = decodeURIComponent(params.companyName);

  const company = await api.company.getCompanyByName({ companyName });
  const board = await db.query.boards.findFirst({
    where: eq(boards.companyId, company?.id ?? ""),
  });

  if (!company || !board)
    return (
      <>
        <h2 className="mt-4 scroll-m-20 text-center text-3xl font-semibold tracking-tight">
          Invalid Company
        </h2>
        <p className="mb-10 text-center text-gray-400">Yours? Claim it</p>
      </>
    );

  return (
    <>
      <h2 className="mt-4 scroll-m-20 text-center text-3xl font-semibold tracking-tight">
        Our Roadmap
      </h2>
      <p className="mb-10 text-center text-gray-400">
        See what we have been working on
      </p>

      <Roadmap boardId={board.id} />
    </>
  );
}

export default Page;
