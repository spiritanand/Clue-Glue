import { getServerAuthSession } from "~/server/auth";
// ToDo: make logo dynamic
// import ClueGlueLogo from "../../../public/logo.svg";
import Image from "next/image";
import Link from "next/link";
import { AUTH_ACTION_LINKS } from "~/lib/constants";

export default async function Navbar() {
	const session = await getServerAuthSession();
	return (
		<nav className="bg-white shadow flex justify-between px-4 py-4 items-center md:px-8">
			<div className="flex gap-2 items-center md:gap-4">
				<Image
					src="/logo.svg"
					alt="Clue Glue Logo"
					className="rounded-md object-cover"
					width={40}
					height={40}
				/>
				Clue Glue
			</div>
			<Link
				href={session ? AUTH_ACTION_LINKS.SIGN_OUT : AUTH_ACTION_LINKS.SIGN_IN}
				className="rounded-full bg-secondary px-3 py-2 font-semibold no-underline transition hover:bg-white/20"
			>
				{session ? "Logout" : "Login"}
			</Link>
		</nav>
	);
}
