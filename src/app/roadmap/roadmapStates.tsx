import {
	Card,
	CardContent,
	CardTitle
} from "~/components/ui/card";
import ShortPostTab from "./postShort";

export default function RoadMapStates({ title, postList }: { title: string, postList: { id: string, title: string; board: string; upvotes: number; hasUpvoted: boolean;}[]}) {
	// expecting a list of posts

	return (
		<div className="w-full max-w-xs md:flex md:gap-6">
			<Card className="h-full w-full">
                <CardTitle className="p-3">
                    {/* can add colored element to differentiate */}
                    {title}
                </CardTitle>
				<hr/>
				<CardContent className="p-6 flex flex-col overflow-y-scroll card-height" >
                    {/* List of posts */}
					{postList.map((post: { id: string; title: string; board: string; upvotes: number; hasUpvoted: boolean; }) => {    
						return <ShortPostTab key={post.id} postTitle={post.title} boardTitle={post.board} upvoteCount={post.upvotes} hasUpvoted={post.hasUpvoted}/>;
					})}
				</CardContent>
			</Card>
		</div>
	);
}
