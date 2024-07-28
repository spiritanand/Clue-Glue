import { Header } from "~/components/layout/user/Header";

export default async function Layout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { companyName: string };
}>) {
  const companyName = decodeURIComponent(params.companyName);

  return (
    <>
      <Header companyName={companyName} />
      <div className="w-screen border-t"></div>

      <main className="container">{children}</main>
    </>
  );
}
