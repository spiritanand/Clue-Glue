import RoadMapStates from "./roadmapStates";
// import { useState } from "react";

export default function Roadmap() {
	
	// const [roadMapState, setRoadmapState] = useState({});

	const postList = [
		{ id: "4", title: "xyz", board: "board", upvotes: 5, hasUpvoted: false },
		{ id: "4", title: "xyz", board: "board", upvotes: 5, hasUpvoted: true },
		{ id: "4", title: "xyz", board: "board", upvotes: 5, hasUpvoted: false },
		{ id: "4", title: "xyz", board: "board", upvotes: 5, hasUpvoted: false },
		{ id: "4", title: "xyz", board: "board", upvotes: 5, hasUpvoted: false },
		{ id: "4", title: "xyz", board: "board", upvotes: 5, hasUpvoted: false },
		{ id: "4", title: "xyz", board: "board", upvotes: 5, hasUpvoted: false },
		{ id: "4", title: "xyz", board: "board", upvotes: 5, hasUpvoted: false },
		{ id: "4", title: "xyz", board: "board", upvotes: 5, hasUpvoted: false },
		{ id: "4", title: "xyz", board: "board", upvotes: 5, hasUpvoted: false },
		{ id: "4", title: "xyz", board: "board", upvotes: 5, hasUpvoted: false },
	];

	// expecting return to be: {Roadmapstate: [postList]}

	return (
		<div className="w-full">
			Roadmap Filters
			<div
				className="flex flex-col pt-4 justify-evenly md:flex-row sm:
                items-center roadmap-board"
			>
				<RoadMapStates title="RoadmapState" postList={postList} />
				<RoadMapStates title="RoadmapState" postList={postList} />
				<RoadMapStates title="RoadmapState" postList={postList} />
				{/* Expected RoadmapStates */}
				{/* {Object.entries(roadMapState).map(([title, postList]: [string, { id: string; title: string; board: string; upvotes: number; hasUpvoted: boolean; }[]]) => {
				return <RoadMapStates key={title} title={title} postList={postList} />
			})} */}
			</div>
		</div>
	);
}
