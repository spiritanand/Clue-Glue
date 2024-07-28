import { getServerAuthSession } from "~/server/auth";
import Image from "next/image";
import Link from "next/link";
import { AUTH_ACTION_LINKS } from "~/lib/constants";
import { Button } from "~/components/ui/button";

export default async function Navbar() {
  const session = await getServerAuthSession();
  return (
    <nav className="flex items-center justify-between p-4">
      <Link className="flex items-center" href="/">
        <Image
          src="/logo.svg"
          alt="Clue Glue"
          className="rounded-md object-cover"
          width={50}
          height={50}
        />
        <p className="text-sm font-black">Clue Glue</p>
      </Link>

      <Link
        href={
          session?.user?.id
            ? AUTH_ACTION_LINKS.SIGN_OUT
            : AUTH_ACTION_LINKS.SIGN_IN
        }
      >
        <Button className="text-lg shadow-2xl">
          {session?.user?.id ? "Logout" : "Login"}
        </Button>
      </Link>
    </nav>
  );
}
