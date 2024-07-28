import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import {
  FeedbackStatus,
  FeedbackStatusColors,
  feedbackStatusLabels,
} from "~/lib/constants";
import { api } from "~/trpc/react";
import { toast } from "sonner";
import type { ExtendedSelectFeedback } from "~/lib/types";
import { cn } from "~/lib/utils";

export function FeedbackItemFooter({
  feedbackId,
  boardId,
  value,
}: {
  feedbackId: string;
  boardId: string;
  value: FeedbackStatus;
}) {
  const utils = api.useUtils();

  const updateStatus = api.feedback.updateStatus.useMutation({
    onMutate: async ({ feedbackId, status }) => {
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
                status,
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
      await utils.feedback.invalidate();
    },
    onError: (error) => {
      toast.error(error.message ?? "Something went wrong, please try again!");
    },
  });

  return (
    <Select
      value={value}
      onValueChange={(status) => {
        updateStatus.mutate({
          feedbackId,
          status: status as FeedbackStatus,
        });
      }}
    >
      <SelectTrigger className={cn("w-[180px]", FeedbackStatusColors[value])}>
        <SelectValue placeholder="Update status" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {Object.values(FeedbackStatus).map((key) => (
            <SelectItem
              key={key}
              value={key}
              className={FeedbackStatusColors[key]}
            >
              {feedbackStatusLabels[key]}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
