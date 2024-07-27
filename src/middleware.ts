export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/admin/(feedback|posts)/:path*", "/onboard"],
};
