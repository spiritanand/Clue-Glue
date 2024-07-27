import Link from "next/link";
import { ChevronUp } from "lucide-react";
import { Button } from "~/components/ui/button";

// default prop value for postTitle, boardTitle, upvoteCount, hasUpvoted
export default function ShortPostTab({
	postTitle = "Custom email alerts",
	boardTitle = "xyz",
	upvoteCount = 3,
    hasUpvoted = true
}: { postTitle: string; boardTitle: string; upvoteCount: number; hasUpvoted: boolean }) {
	return (
		<div className="w-full max-w-xs flex items-center gap-4 mb-4">
			<Button className={`flex flex-col h-full ${hasUpvoted ? 'bg-primary':''}`} variant="outline" size="icon">
				<ChevronUp className="h-4 w-4" />
                {/* increase upvote count if user has not upvoted it - make api call - user interactivity can make it client component*/}
				{upvoteCount}
			</Button>
            {/* add href to post public link */}
            <Link href='./post' >
				<h1 className="hover:text-sky-700">{postTitle}</h1>
				<h3>{boardTitle}</h3>
			</Link>
		</div>
	);
}
