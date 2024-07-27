import { Button } from "~/components/ui/button";
import Navbar from "../_components/navbar";
import Image from "next/image";
import { CircleCheck } from "lucide-react";

export default function Home() {
	return (
		<>
			<Navbar />
			<div className="flex bg-gradient-to-t from-amber-400 to-amber-100 pb-12">
				{/* Hero Text */}
				<div className="flex flex-col items-center grow">
					<h1 className="text-[108px] font-bold">
						Get <span className="text-[#0510eb]">Feedback</span>
					</h1>
					<h1 className="text-[108px] font-bold">
						Build <span className="text-[#0510eb]">Better</span>
					</h1>
					<p className="py-4">Collect Feedback, uncover insights and ship an awesome product.</p>
					<Button variant="outline" className="bg-[#0510eb] my-2 p-6 text-2xl text-white rounded-2xl hover:bg-white hover:text-[#0510eb]">
						I want this
					</Button>
					<ul className="list-none flex gap-8 py-6">
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
				</div>
				{/* Hero image */}
				<Image src="/logo.svg" alt="Hero Image" width={500} height={500} />
			</div>
		</>
	);
}
