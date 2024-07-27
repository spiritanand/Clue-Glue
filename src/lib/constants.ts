export enum postType {
  NEW = "New",
  FIX = "Fix",
  IMPROVEMENT = "Improvement",
}

export const postTypeOptions = [
  postType.NEW,
  postType.FIX,
  postType.IMPROVEMENT,
] as const;

export enum feedbackStatus {
  REVIEW = "Under Review",
  PLAN = "In Planning",
  PROGRESS = "In Progress",
  CLOSED = "Closed",
}

export const feedbackStatusOptions = [
  feedbackStatus.REVIEW,
  feedbackStatus.PLAN,
  feedbackStatus.PROGRESS,
  feedbackStatus.CLOSED,
] as const;
