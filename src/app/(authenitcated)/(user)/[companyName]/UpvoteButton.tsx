"use client";

import { ChevronUp } from "lucide-react";
import { Button } from "~/components/ui/button";
import { type SelectFeedback } from "~/server/db/schema";
import { useSession } from "next-auth/react";
import { api } from "~/trpc/react";
import type { ExtendedSelectFeedback } from "~/lib/types";
import { toast } from "sonner";
import { usePathname, useRouter } from "next/navigation";

function UpvoteButton({ feedback }: { feedback: SelectFeedback }) {
  const session = useSession();
  const router = useRouter();
  const pathname = usePathname();

  const utils = api.useUtils();

  const { boardId, id: feedbackId } = feedback;

  const toggleUpvote = api.feedback.toggleUpvote.useMutation({
    onMutate: async ({ feedbackId }) => {
      // Cancel any outgoing refetches (so they
      // don't overwrite our optimistic update)
      await utils.feedback.getAllByBoardId.cancel({ boardId });

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
      await utils.feedback.getAllByBoardId.invalidate({ boardId });
    },
    onError: (error) => {
      if (error.message === "UNAUTHORIZED")
        router.push(`/api/auth/signin?callbackUrl=${pathname}`);
      else
        toast.error(error.message ?? "Something went wrong, please try again!");
    },
  });

  return (
    <Button
      className="flex w-fit gap-2"
      variant={
        feedback.upvotes.includes(session.data?.user?.id ?? "")
          ? "default"
          : "outline"
      }
      onClick={() => {
        toggleUpvote.mutate({ feedbackId });
      }}
    >
      <ChevronUp />
      <p>{feedback.upvotes.length} </p>
    </Button>
  );
}

export default UpvoteButton;
