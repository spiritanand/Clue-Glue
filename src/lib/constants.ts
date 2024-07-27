export enum postType {
  NEW = "new",
  FIX = "fix",
  IMPROVEMENT = "improvement",
}

export const postTypeOptions = [
  postType.NEW,
  postType.FIX,
  postType.IMPROVEMENT,
] as const;
