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
  REVIEW = "REVIEW",
  PLAN = "PLAN",
  PROGRESS = "PROGRESS",
  CLOSED = "CLOSED",
  COMPLETED = "COMPLETED",
}

export const feedbackStatusLabels: Record<feedbackStatus, string> = {
  [feedbackStatus.REVIEW]: "Under Review",
  [feedbackStatus.PLAN]: "In Planning",
  [feedbackStatus.PROGRESS]: "In Progress",
  [feedbackStatus.CLOSED]: "Closed",
  [feedbackStatus.COMPLETED]: "Completed",
};

export enum feedbackStatusColors {
  REVIEW = "text-stone-600",
  PLAN = "text-sky-600",
  PROGRESS = "text-fuchsia-600",
  CLOSED = "text-red-600",
  COMPLETED = "text-green-600",
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
  ONBOARD: "/onboard",
};
