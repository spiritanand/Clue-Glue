import { Button } from "~/components/ui/button";
import Navbar from "../_components/navbar";
import Image from "next/image";
import { CircleCheck } from "lucide-react";
import Link from "next/link";

export default function Home() {
	return (
		<>
			<Navbar />
			<main className="flex-1 bg-primary/5">
				<section className="w-full py-12 md:py-4">
					<div className="container px-4 md:px-6">
						<div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_550px]">
							<div className="flex flex-col justify-center space-y-8 order-2 md:order-1">
								<div className="space-y-4">
									<h1 className="text-[54px] font-bold tracking-tighter sm:text-6xl xl:text-[108px] text-[#0510EB]/50">
										Get Feedback.
									</h1>
									<h1 className="text-[54px] font-bold tracking-tighter sm:text-6xl xl:text-[108px] text-[#0510EB]/50">
										Build Better.
									</h1>
									<p className="max-w-[600px] text-muted-foreground md:text-xl">
										Our customer-facing application helps you gather valuable
										feedback from your users, so you can build products they
										truly love.
									</p>
								</div>
								<ul className="list-none flex gap-8 py-2">
									<li className="flex gap-2">
										<CircleCheck />
										Free
									</li>
									<li className="flex gap-2">
										<CircleCheck />
										Open Source
									</li>
									<li className="flex gap-2">
										<CircleCheck />
										Self host
									</li>
								</ul>
								<div>
									<Link
										href="/onboard"
										className="inline-flex h-10 items-center justify-center rounded-md bg-primary/90 px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/70 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
										prefetch={false}
									>
										Get Started
									</Link>
								</div>
							</div>
							<Image
								src="/hero-primary.svg"
								width={700}
								height={550}
								objectFit="contain"
								alt="Hero"
								className="mx-auto aspect-[750/481] overflow-hidden rounded-xl object-bottom sm:w-full lg:order-last lg:aspect-square"
							/>
						</div>
					</div>
				</section>
			</main>
		</>
	);
}
