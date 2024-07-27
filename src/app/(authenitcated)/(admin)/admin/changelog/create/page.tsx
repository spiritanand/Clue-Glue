"use client";

import { type z } from "zod";

import { Button } from "~/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent } from "~/components/ui/card";
import { CircleCheck } from "lucide-react";
import { createChangelogSchema } from "~/lib/zodSchemas";
import { api } from "~/trpc/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ROUTES } from "~/lib/constants";
import { Textarea } from "~/components/ui/textarea";

export default function ChangelogForm() {
	const router = useRouter();
	const utils = api.useUtils();

	const form = useForm<z.infer<typeof createChangelogSchema>>({
		resolver: zodResolver(createChangelogSchema),
		defaultValues: {
			title: "",
			description: "",
			tag: "new",
		},
	});

	const createChangelog = api.company.create.useMutation({
		onSuccess: async () => {
			// api to hit when changelog is submitted -> needed to be changed
			await utils.company.invalidate();
			toast.success("Company created 🚀");

			router.push(ROUTES.ADMIN_CHANGELOG);
		},
		onError: (error) => {
			toast.error(error.message ?? "Something went wrong, please try again!");
		},
	});

	function onSubmit(values: z.infer<typeof createChangelogSchema>) {
		createChangelog.mutate({
			title: values.title,
			description: values.description,
			tag: values.tag,
		});
	}

	return (
		<main className="bg-primary/10 flex min-h-screen flex-col items-center">
			<Card className="bg-primary/15 mt-10 max-w-screen-md shadow-xl md:w-3/4">
				<CardContent>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="flex flex-col space-y-8 px-2 py-8 md:px-8"
						>
							{/* title */}
							<FormField
								control={form.control}
								name="title"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-xl">
											Title <span className="text-red-500">*</span>
										</FormLabel>
										<FormControl>
											<Input placeholder="My first changelog" {...field} />
										</FormControl>
										<FormDescription>
											This title would be title of your changelog.
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
							{/* description */}
							<FormField
								control={form.control}
								name="description"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-xl">
											Description <span className="text-red-500">*</span>
										</FormLabel>
										<FormControl>
											<Textarea
												placeholder="All my changes are described here..."
												{...field}
											/>
										</FormControl>
										<FormDescription>
											This description would be description of your changelog.
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>

							{/* tag */}
							<FormField
								control={form.control}
								name="tag"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-xl">
											Tag <span className="text-red-500">*</span>
										</FormLabel>
										<FormControl>
											<select
												{...field}
												className="w-full p-2 border border-gray-300 rounded-md"
											>
												<option value="new">New</option>
												<option value="fix">Fix</option>
												<option value="improvement">Improvement</option>
											</select>
										</FormControl>
										<FormDescription>
											This tag would be type of your changelog.
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>

							<Button
								type="submit"
								className="flex items-center gap-2 self-center text-xl"
								// disabled={createChangelog.isPending}
							>
								Submit
								<CircleCheck />
							</Button>
						</form>
					</Form>
				</CardContent>
			</Card>
		</main>
	);
}
