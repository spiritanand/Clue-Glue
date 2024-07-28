import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { type ReactNode } from "react";
import { type SelectFeedback } from "~/server/db/schema";
import UpvoteButton from "~/app/(authenitcated)/(user)/[companyName]/UpvoteButton";

export default function RoadmapBoard({
  title,
  feedbackList,
}: {
  title: ReactNode;
  feedbackList: SelectFeedback[];
}) {
  return (
    <Card className="flex-1">
      <CardTitle className="flex items-center p-3">{title}</CardTitle>
      <hr />
      <CardContent className="h-[60vh] overflow-y-scroll p-6">
        {feedbackList.length > 0 ? (
          <ul className="flex flex-col gap-4">
            {feedbackList
              .sort((f1, f2) => f2.upvotes.length - f1.upvotes.length)
              .map((f) => (
                <li key={f.id}>
                  <Card className="shadow-none">
                    <CardHeader className="flex flex-row items-center gap-4">
                      <UpvoteButton feedback={f} />

                      <p className="text-lg font-semibold">{f.title}</p>
                    </CardHeader>
                  </Card>
                </li>
              ))}
          </ul>
        ) : (
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
            Nothing here
          </h4>
        )}
      </CardContent>
    </Card>
  );
}
