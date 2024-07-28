"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "~/components/ui/card";
import { api } from "~/trpc/react";
import { FeedbackItemFooter } from "~/app/(authenitcated)/(admin)/admin/feedback/FeedbackItemFooter";
import UpvoteButton from "~/app/(authenitcated)/(user)/[companyName]/UpvoteButton";
import { usePathname } from "next/navigation";
import { Badge } from "~/components/ui/badge";
import {
  FeedbackStatusBgColors,
  FeedbackStatusColors,
  feedbackStatusLabels,
} from "~/lib/constants";
import { cn } from "~/lib/utils";

function FeedbackList({ boardId }: { boardId: string }) {
  const pathname = usePathname();
  const isAdminPage = pathname.includes("admin");

  const [feedbackList] = api.feedback.getAllByBoardId.useSuspenseQuery({
    boardId,
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
                    {isAdminPage ? (
                      <FeedbackItemFooter
                        value={f.status}
                        feedbackId={f.id}
                        boardId={boardId}
                      />
                    ) : (
                      <Badge
                        className={cn(
                          FeedbackStatusColors[f.status],
                          FeedbackStatusBgColors[f.status],
                        )}
                      >
                        {feedbackStatusLabels[f.status]}
                      </Badge>
                    )}
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
