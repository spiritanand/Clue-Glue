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
  SIGN_IN: "/api/auth/signin?callbackUrl=/admin/dashboard",
  SIGN_OUT: "/api/auth/signout?callbackUrl=/",
};

export const ROUTES = {
  HOME: "/",
  DASHBOARD: "/admin/dashboard",
  ONBOARD: "/onboard",
};
