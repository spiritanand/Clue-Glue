"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "~/components/ui/card";
import { api } from "~/trpc/react";

function FeedbackList({ boardId }: { boardId: string }) {
  const [feedbackList] = api.feedback.getAllByBoardId.useSuspenseQuery({
    boardId,
  });

  return (
    <>
      {feedbackList?.length ? (
        <ul className="flex flex-1 flex-col justify-between gap-10">
          {feedbackList.map((f) => (
            <li key={f.id}>
              <Card className="mx-auto w-full max-w-2xl md:w-3/4">
                <CardHeader>
                  {f.title}
                  <span>{f.upvotes.length} Upvotes</span>
                </CardHeader>
                <CardContent>{f.description}</CardContent>
                <CardFooter>FOOTER</CardFooter>
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
