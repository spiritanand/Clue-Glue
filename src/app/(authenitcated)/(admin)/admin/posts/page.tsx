import CreatePostForm from "~/app/(authenitcated)/(admin)/admin/posts/CreatePostForm";
import { api, HydrateClient } from "~/trpc/server";
import PostsList from "~/app/(authenitcated)/(admin)/admin/posts/PostsList";

export default async function Page() {
  const company = await api.company.getMyCompany();
  void api.post.getAllByCompanyId.prefetch({
    companyId: company?.id ?? "",
  });

  return (
    <>
      <h2 className="mt-4 scroll-m-20 text-center text-3xl font-semibold tracking-tight">
        Create a Post
      </h2>
      <p className="mb-10 text-center text-gray-400">
        Share announcements and updates with your users
      </p>

      <div className="flex flex-col gap-10 md:flex-row">
        <CreatePostForm companyId={company?.id ?? ""} />

        <HydrateClient>
          <PostsList companyId={company?.id ?? ""} />
        </HydrateClient>
      </div>
    </>
  );
}
