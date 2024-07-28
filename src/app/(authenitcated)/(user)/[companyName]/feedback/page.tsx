import { api } from "~/trpc/server";
import { Card } from "~/components/ui/card";
import Link from "next/link";
import SelectedBoard from "~/app/(authenitcated)/(admin)/admin/feedback/SelectedBoard";

async function Page({
  params,
  searchParams,
}: {
  params: { companyName: string };
  searchParams: Record<string, string | undefined>;
}) {
  const company = await api.company.getCompanyByName({
    companyName: params.companyName,
  });
  const getAllBoards = await api.company.getAllBoards({
    companyId: company?.id ?? "",
  });

  const boardId = searchParams.board;
  const selectedBoard = getAllBoards.find((board) => board.id === boardId);

  return (
    <>
      {boardId && selectedBoard ? (
        <SelectedBoard board={selectedBoard} />
      ) : (
        <>
          <h2 className="my-4 scroll-m-20 text-center text-3xl font-semibold tracking-tight">
            Select a Board
          </h2>

          <ul className="flex flex-col items-center justify-center md:flex-row">
            {getAllBoards.map((board) => (
              <li key={board.id}>
                <Link
                  href={`/${params.companyName}/feedback?board=${board.id}`}
                >
                  <Card className="p-4">{board.name}</Card>
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}

export default Page;
