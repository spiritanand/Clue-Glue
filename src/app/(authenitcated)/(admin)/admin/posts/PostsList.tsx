"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "~/components/ui/card";
import { api } from "~/trpc/react";
import {
  PostTypeBgColors,
  PostTypeColors,
  postTypeLabels,
} from "~/lib/constants";
import { Badge } from "~/components/ui/badge";
import { cn } from "~/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";

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
                <CardHeader className="flex flex-row items-center gap-8">
                  <span className="flex flex-col items-center gap-1">
                    <Avatar>
                      <AvatarImage
                        src={p.user.image ?? "/fallbackAvatar.avif"}
                      />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <span className="text-xs font-medium">{p.user.name}</span>
                  </span>

                  <p className="text-xl font-semibold">{p.title}</p>
                </CardHeader>

                <CardContent>{p.content}</CardContent>
                <CardFooter>
                  <Badge
                    className={cn(
                      PostTypeBgColors[p.tags],
                      PostTypeColors[p.tags],
                    )}
                  >
                    {postTypeLabels[p.tags]}
                  </Badge>
                </CardFooter>
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
