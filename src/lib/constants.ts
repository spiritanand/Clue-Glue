// Base Enum
export enum PostType {
  NEW = "NEW",
  FIX = "FIX",
  IMPROVEMENT = "IMPROVEMENT",
}

// Labels to show to user
export const postTypeLabels: Record<PostType, string> = {
  [PostType.NEW]: "New",
  [PostType.FIX]: "Fix",
  [PostType.IMPROVEMENT]: "Improvement",
};

export enum PostTypeColors {
  NEW = "text-violet-600",
  FIX = "text-orange-600",
  IMPROVEMENT = "text-teal-600",
}

// Used in schema
export const postTypeOptions = [
  PostType.NEW,
  PostType.FIX,
  PostType.IMPROVEMENT,
] as const;

export enum FeedbackStatus {
  REVIEW = "REVIEW",
  PLAN = "PLAN",
  PROGRESS = "PROGRESS",
  CLOSED = "CLOSED",
  COMPLETED = "COMPLETED",
}

export const feedbackStatusLabels: Record<FeedbackStatus, string> = {
  [FeedbackStatus.REVIEW]: "Under Review",
  [FeedbackStatus.PLAN]: "In Planning",
  [FeedbackStatus.PROGRESS]: "In Progress",
  [FeedbackStatus.CLOSED]: "Closed",
  [FeedbackStatus.COMPLETED]: "Completed",
};

export enum FeedbackStatusColors {
  REVIEW = "text-stone-600",
  PLAN = "text-fuchsia-600",
  PROGRESS = "text-sky-600",
  CLOSED = "text-red-600",
  COMPLETED = "text-green-600",
}

export const feedbackStatusOptions = [
  FeedbackStatus.REVIEW,
  FeedbackStatus.PLAN,
  FeedbackStatus.PROGRESS,
  FeedbackStatus.CLOSED,
  FeedbackStatus.COMPLETED,
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

export enum FeedbackStatusBgColors {
  REVIEW = "bg-stone-200",
  PLAN = "bg-fuchsia-200",
  PROGRESS = "bg-sky-200",
  CLOSED = "bg-red-200",
  COMPLETED = "bg-green-200",
}

export enum PostTypeBgColors {
  NEW = "bg-violet-200",
  FIX = "bg-orange-200",
  IMPROVEMENT = "bg-teal-200",
}
