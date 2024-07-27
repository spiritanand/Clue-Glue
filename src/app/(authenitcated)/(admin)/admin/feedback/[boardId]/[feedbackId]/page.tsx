function Page({ params }: { params: { boardId: string; feedbackId: string } }) {
  const { feedbackId, boardId } = params;

  return (
    <>
      INDIVIDUAL FEEDBACK
      {boardId}
      {feedbackId}
    </>
  );
}

export default Page;
