import { api } from "~/trpc/server";
import Roadmap from "~/app/(authenitcated)/(user)/[companyName]/roadmap/Roadmap";

async function Page({ params }: { params: { companyName: string } }) {
  const companyName = decodeURIComponent(params.companyName);

  const company = await api.company.getCompanyByName({ companyName });

  if (!company) return null;

  return (
    <>
      <h2 className="mt-4 scroll-m-20 text-center text-3xl font-semibold tracking-tight">
        Roadmap
      </h2>
      <p className="mb-10 text-center text-gray-400">I</p>

      <Roadmap />
    </>
  );
}

export default Page;
