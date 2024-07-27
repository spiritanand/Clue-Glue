import { type SelectBoard } from "~/server/db/schema";
import CreateFeedbackForm from "~/app/(authenitcated)/(admin)/admin/feedback/CreateFeedbackForm";
import FeedbackList from "~/app/(authenitcated)/(admin)/admin/feedback/FeedbackList";
import { api, HydrateClient } from "~/trpc/server";

async function SelectedBoard({ board }: { board: SelectBoard }) {
  void api.feedback.getAllByBoardId.prefetch({ boardId: board.id });

  return (
    <>
      <h2 className="mt-4 scroll-m-20 text-center text-3xl font-semibold tracking-tight">
        {board.name}
      </h2>
      <p className="mb-10 text-center text-gray-400">{board.description}</p>

      <div className="flex flex-col gap-10 md:flex-row">
        <CreateFeedbackForm boardId={board.id} />

        <HydrateClient>
          <FeedbackList boardId={board.id} />
        </HydrateClient>
      </div>
    </>
  );
}

export default SelectedBoard;
