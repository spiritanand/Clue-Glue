import RoadmapBoard from "./RoadmapBoard";

export default function Roadmap() {
  const postList = [
    {
      id: "4",
      title: "xyz",
      board: "board",
      upvotes: 5,
      hasUpvoted: false,
    },
    {
      id: "4",
      title: "xyz",
      board: "board",
      upvotes: 5,
      hasUpvoted: true,
    },
    {
      id: "4",
      title: "xyz",
      board: "board",
      upvotes: 5,
      hasUpvoted: false,
    },
    {
      id: "4",
      title: "xyz",
      board: "board",
      upvotes: 5,
      hasUpvoted: false,
    },
    {
      id: "4",
      title: "xyz",
      board: "board",
      upvotes: 5,
      hasUpvoted: false,
    },
    {
      id: "4",
      title: "xyz",
      board: "board",
      upvotes: 5,
      hasUpvoted: false,
    },
    {
      id: "4",
      title: "xyz",
      board: "board",
      upvotes: 5,
      hasUpvoted: false,
    },
    {
      id: "4",
      title: "xyz",
      board: "board",
      upvotes: 5,
      hasUpvoted: false,
    },
    {
      id: "4",
      title: "xyz",
      board: "board",
      upvotes: 5,
      hasUpvoted: false,
    },
    {
      id: "4",
      title: "xyz",
      board: "board",
      upvotes: 5,
      hasUpvoted: false,
    },
    {
      id: "4",
      title: "xyz",
      board: "board",
      upvotes: 5,
      hasUpvoted: false,
    },
  ];

  return (
    <div className="flex flex-col items-center justify-evenly gap-8 pt-4 md:flex-row md:gap-0">
      <RoadmapBoard title="RoadmapState" postList={postList} />
      <RoadmapBoard title="RoadmapState" postList={postList} />
      <RoadmapBoard title="RoadmapState" postList={postList} />
    </div>
  );
}
