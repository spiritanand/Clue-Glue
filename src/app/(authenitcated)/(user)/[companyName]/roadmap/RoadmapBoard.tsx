import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { type ReactNode } from "react";
import { type SelectFeedback } from "~/server/db/schema";
import { Button } from "~/components/ui/button";
import { ChevronUp } from "lucide-react";

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
          <ul className="flex flex-col">
            {feedbackList.map((f) => (
              <li key={f.id}>
                <Card className="shadow-none">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <Button
                      className="flex w-fit gap-2"
                      // variant={
                      //   f.upvotes.includes(session.data?.user?.id ?? "")
                      //     ? "default"
                      //     : "outline"
                      // }
                    >
                      <ChevronUp />
                      <p>{f.upvotes.length} </p>
                    </Button>

                    <p className="text-xl font-semibold">{f.title}</p>
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
