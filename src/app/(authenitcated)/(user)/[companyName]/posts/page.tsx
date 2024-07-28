import { api, HydrateClient } from "~/trpc/server";
import PostsList from "~/app/(authenitcated)/(admin)/admin/posts/PostsList";

export default async function Page({
  params,
}: {
  params: { companyName: string };
}) {
  const company = await api.company.getCompanyByName({
    companyName: params.companyName,
  });
  void api.post.getAllByCompanyId.prefetch({
    companyId: company?.id ?? "",
  });

  return (
    <>
      <h2 className="mt-4 scroll-m-20 text-center text-3xl font-semibold tracking-tight">
        Our Posts
      </h2>
      <p className="mb-10 text-center text-gray-400">
        Know what we have been shipping lately
      </p>

      <div className="flex flex-col gap-10 md:flex-row">
        <HydrateClient>
          <PostsList companyId={company?.id ?? ""} />
        </HydrateClient>
      </div>
    </>
  );
}
