"use client";

import RoadmapBoard from "./RoadmapBoard";
import {
  FeedbackStatus,
  FeedbackStatusColors,
  feedbackStatusLabels,
} from "~/lib/constants";
import { cn } from "~/lib/utils";
import { Dot } from "lucide-react";
import { type SelectFeedback } from "~/server/db/schema";
import { api } from "~/trpc/react";

interface AccumulatorType {
  progress: SelectFeedback[];
  review: SelectFeedback[];
  plan: SelectFeedback[];
}

export default function Roadmap({ boardId }: { boardId: string }) {
  const [feedbackList] = api.feedback.getAllByBoardId.useSuspenseQuery({
    boardId,
  });

  const { progress, review, plan } = feedbackList.reduce<AccumulatorType>(
    (acc, feedback) => {
      switch (feedback.status) {
        case FeedbackStatus.PROGRESS:
          acc.progress.push(feedback);
          break;
        case FeedbackStatus.REVIEW:
          acc.review.push(feedback);
          break;
        case FeedbackStatus.PLAN:
          acc.plan.push(feedback);
          break;
      }

      return acc;
    },
    {
      progress: [],
      review: [],
      plan: [],
    },
  );

  return (
    <div className="mb-10 flex flex-col justify-evenly gap-10 pt-4 md:flex-row md:items-center">
      <RoadmapBoard
        title={
          <>
            <Dot className={cn(FeedbackStatusColors.REVIEW)} />
            <p className={cn(FeedbackStatusColors.REVIEW)}>
              {feedbackStatusLabels.REVIEW}
            </p>
          </>
        }
        feedbackList={review}
      />

      <RoadmapBoard
        title={
          <>
            <Dot className={cn(FeedbackStatusColors.PLAN)} />
            <p className={cn(FeedbackStatusColors.PLAN)}>
              {feedbackStatusLabels.PLAN}
            </p>
          </>
        }
        feedbackList={plan}
      />

      <RoadmapBoard
        title={
          <>
            <Dot
              className={cn("animate-pulse", FeedbackStatusColors.PROGRESS)}
            />
            <p className={cn(FeedbackStatusColors.PROGRESS)}>
              {feedbackStatusLabels.PROGRESS}
            </p>
          </>
        }
        feedbackList={progress}
      />
    </div>
  );
}
