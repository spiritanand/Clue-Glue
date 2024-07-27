"use client";
import Link from "next/link";
import ChangelogForm from "./create/page";
import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";

export default function Changelog() {
	const [searchPost, setSearchPost] = useState("");
	const [changelogPosts, setChangelogPosts] = useState([
		{
			id: "1",
			title: "First changelog post",
			description: "This is the first changelog post",
		},
		{
			id: "2",
			title: "Second changelog post",
			description: "This is the second changelog post",
		},
		{
			id: "3",
			title: "Third changelog post",
			description: "This is the third changelog post",
		},
	]);
	return (
		<div id="change-log" className="w-full h-full flex flex-col md:flex-row">
			{/* sidebar for changelog - user interaction hence client component */}
			<Card className="rounded-none flex-grow-0 h-fit md:h-[90vh]">
				<Link
					className="flex justify-between p-4 cursor-pointer"
					href="changelog/create"
				>
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

			{/* List of changelog - editable for admin view */}
			<Card className="rounded-none flex-grow h-[90vh] overflow-y-scroll">
				<CardHeader>
					<CardTitle>Changelog</CardTitle>
				</CardHeader>
				<CardContent className="flex flex-col gap-4">
					{/* List of changelog posts */}
					{changelogPosts.length ? (
						changelogPosts.map(
							(changepost: {
								id: string;
								title: string;
								description: string;
							}) => (
								<div className="p-4 border-2" key={changepost.id}>
									{/* Todo: scope of time, edit, delete and tag showcasing its status */}
									<div className="flex justify-end">
										<Trash2
											className="cursor-pointer"
											onClick={() => console.log("delete from database")}
                                            stroke="red"
										/>
									</div>
									<Link href={`changelog/${changepost.id}`}>
										<h1 className="hover:text-sky-700 text-2xl pb-4">
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
