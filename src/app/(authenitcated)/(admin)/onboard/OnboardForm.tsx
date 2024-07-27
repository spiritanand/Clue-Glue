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
import { createCompanySchema } from "~/lib/zodSchemas";
import { api } from "~/trpc/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ROUTES } from "~/lib/constants";

export default function OnboardForm() {
  const router = useRouter();
  const utils = api.useUtils();

  const form = useForm<z.infer<typeof createCompanySchema>>({
    resolver: zodResolver(createCompanySchema),
    defaultValues: {
      name: "",
      website: "",
    },
  });

  const createPost = api.company.create.useMutation({
    onSuccess: async () => {
      await utils.company.invalidate();
      toast.success("Company created 🚀");

      router.push(ROUTES.ADMIN_FEEDBACKS);
    },
    onError: (error) => {
      toast.error(error.message ?? "Something went wrong, please try again!");
    },
  });

  function onSubmit(values: z.infer<typeof createCompanySchema>) {
    createPost.mutate({
      name: values.name,
      website: values.website,
    });
  }

  return (
    <Card className="bg-primary/15 mt-10 max-w-screen-md shadow-xl md:w-3/4">
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col space-y-8 px-2 py-8 md:px-8"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl">
                    Company Name <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Guava" {...field} />
                  </FormControl>
                  <FormDescription>
                    Your company name will be used to create your public URL.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl">Website</FormLabel>
                  <FormControl>
                    <Input placeholder="https://guava.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="flex items-center gap-2 self-center text-xl"
              disabled={createPost.isPending}
            >
              Submit
              <CircleCheck />
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
