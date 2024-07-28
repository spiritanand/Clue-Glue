"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "~/components/ui/card";
import { api } from "~/trpc/react";
import { postTypeLabels } from "~/lib/constants";

function PostsList({ companyId }: { companyId: string }) {
  const [postsList] = api.post.getAllByCompanyId.useSuspenseQuery({
    companyId,
  });

  return (
    <>
      {postsList?.length ? (
        <ul className="flex flex-1 flex-col justify-between gap-10">
          {postsList.map((p) => (
            <li key={p.id}>
              <Card className="mx-auto w-full max-w-2xl md:w-3/4">
                <CardHeader className="flex flex-row items-center justify-between">
                  <p className="text-xl font-semibold">{p.title}</p>
                </CardHeader>
                <CardContent>{p.content}</CardContent>
                <CardFooter>{postTypeLabels[p.tags]}</CardFooter>
              </Card>
            </li>
          ))}
        </ul>
      ) : (
        <h4 className="flex-1 scroll-m-20 text-center text-xl font-semibold tracking-tight text-gray-600">
          No posts yet!
        </h4>
      )}
    </>
  );
}

export default PostsList;
