"use client";
import Link from "next/link";
import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";

export default function Changelog() {
  const [searchPost, setSearchPost] = useState("");
  const [changelogPosts, setChangelogPosts] = useState([
    {
      id: "1",
      title: "First posts post",
      description: "This is the first posts post",
    },
    {
      id: "2",
      title: "Second posts post",
      description: "This is the second posts post",
    },
    {
      id: "3",
      title: "Third posts post",
      description: "This is the third posts post",
    },
  ]);
  return (
    <div id="change-log" className="flex h-full w-full flex-col md:flex-row">
      {/* sidebar for posts - user interaction hence client component */}
      <Card className="h-fit flex-grow-0 rounded-none md:h-[90vh]">
        <Link className="flex cursor-pointer justify-between p-4" href="#">
          Create a new Entry
          <Plus />
        </Link>
        <hr />
        <CardContent className="py-4">
          {/* search bar */}
          <Input
            value={searchPost}
            onChange={(event) => setSearchPost(event.target.value)}
            placeholder="Search for a changelog"
            type="search"
          />
          {/* To-do: add other filters like type and status */}
        </CardContent>
      </Card>

      {/* End of sidebar */}

      {/* List of posts - editable for admin view */}
      <Card className="h-[90vh] flex-grow overflow-y-scroll rounded-none">
        <CardHeader>
          <CardTitle>Changelog</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {/* List of posts posts */}
          {changelogPosts.length ? (
            changelogPosts.map(
              (changepost: {
                id: string;
                title: string;
                description: string;
              }) => (
                <div className="border-2 p-4" key={changepost.id}>
                  {/* Todo: scope of time, edit, delete and tag showcasing its status */}
                  <div className="flex justify-end">
                    <Trash2
                      className="cursor-pointer"
                      onClick={() => console.log("delete from database")}
                      stroke="red"
                    />
                  </div>
                  <Link href={`changelog/${changepost.id}`}>
                    <h1 className="pb-4 text-2xl hover:text-sky-700">
                      {changepost.title}
                    </h1>
                  </Link>
                  <p>{changepost.description}</p>
                  {/* Todo: like metrics, share link */}
                </div>
              ),
            )
          ) : (
            <p>No changelog posts found</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
