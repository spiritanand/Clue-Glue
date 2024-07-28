"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "~/components/ui/card";
import { api } from "~/trpc/react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { FeedbackItemFooter } from "~/app/(authenitcated)/(admin)/admin/feedback/FeedbackItemFooter";
import { type ExtendedSelectFeedback } from "~/lib/types";
import UpvoteButton from "~/app/(authenitcated)/(user)/[companyName]/UpvoteButton";

function FeedbackList({ boardId }: { boardId: string }) {
  const session = useSession();
  const utils = api.useUtils();
  const [feedbackList] = api.feedback.getAllByBoardId.useSuspenseQuery({
    boardId,
  });

  const toggleUpvote = api.feedback.toggleUpvote.useMutation({
    onMutate: async ({ feedbackId }) => {
      // Cancel any outgoing refetches (so they
      // don't overwrite our optimistic update)
      await utils.feedback.getAllByBoardId.cancel();

      // Snapshot the previous value
      const previousFeedbackList = utils.feedback.getAllByBoardId.getData({
        boardId,
      });

      const feedback = previousFeedbackList?.find((f) => f.id === feedbackId);

      if (!feedback) return { previousFeedbackList };

      // Optimistically update to the new value
      utils.feedback.getAllByBoardId.setData(
        { boardId },
        (oldQueryData) =>
          oldQueryData?.map((f) => {
            if (f.id === feedbackId) {
              return {
                ...f,
                upvotes: f.upvotes.includes(session.data?.user?.id ?? "")
                  ? f.upvotes.filter((id) => id !== session.data?.user?.id)
                  : [...f.upvotes, session.data?.user?.id],
              };
            }

            return f;
          }) as ExtendedSelectFeedback[],
      );

      // Return a context object with the
      // snapshotted value
      return { previousFeedbackList };
    },
    onSuccess: async () => {
      await utils.feedback.getAllByBoardId.invalidate();
    },
    onError: (error) => {
      toast.error(error.message ?? "Something went wrong, please try again!");
    },
  });

  return (
    <>
      {feedbackList?.length ? (
        <ul className="flex flex-1 flex-col justify-between gap-10">
          {feedbackList
            .sort((f1, f2) => f2.upvotes.length - f1.upvotes.length)
            .map((f) => (
              <li key={f.id}>
                <Card className="mx-auto w-full max-w-2xl md:w-3/4">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <p className="text-xl font-semibold">{f.title}</p>
                    <UpvoteButton feedback={f} />
                  </CardHeader>
                  <CardContent>{f.description}</CardContent>
                  <CardFooter>
                    <FeedbackItemFooter
                      value={f.status}
                      feedbackId={f.id}
                      boardId={boardId}
                    />
                  </CardFooter>
                </Card>
              </li>
            ))}
        </ul>
      ) : (
        <h4 className="flex-1 scroll-m-20 text-center text-xl font-semibold tracking-tight text-gray-600">
          You probably got no users! (No feedback to show)
        </h4>
      )}
    </>
  );
}

export default FeedbackList;
