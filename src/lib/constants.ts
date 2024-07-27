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
  COMPLETED = "Completed",
}

export const feedbackStatusOptions = [
  feedbackStatus.REVIEW,
  feedbackStatus.PLAN,
  feedbackStatus.PROGRESS,
  feedbackStatus.CLOSED,
  feedbackStatus.COMPLETED,
] as const;

export const AUTH_ACTION_LINKS = {
  SIGN_IN: "/api/auth/signin?callbackUrl=/admin/feedback",
  SIGN_OUT: "/api/auth/signout?callbackUrl=/",
};

export const ROUTES = {
  HOME: "/",
  ADMIN_FEEDBACK: "/admin/feedback",
  ADMIN_POSTS: "/admin/posts",
  ADMIN_ANALYTICS: "/admin/analytics",
  ADMIN_CHANGELOG: "/admin/changelog",
  ONBOARD: "/onboard",
};
