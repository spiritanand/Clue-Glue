"use client";

import { type z } from "zod";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
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
import { createFeedbackSchema } from "~/lib/zodSchemas";
import { api } from "~/trpc/react";
import { toast } from "sonner";

export default function CreateFeedbackForm({ boardId }: { boardId: string }) {
  const utils = api.useUtils();

  const form = useForm<z.infer<typeof createFeedbackSchema>>({
    resolver: zodResolver(createFeedbackSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const createFeedback = api.feedback.create.useMutation({
    onSuccess: async () => {
      await utils.feedback.invalidate();
      toast.success("Feedback submitted 🫡");

      form.reset();
    },
    onError: (error) => {
      toast.error(error.message ?? "Something went wrong, please try again!");
    },
  });

  function onSubmit(values: z.infer<typeof createFeedbackSchema>) {
    createFeedback.mutate({
      boardId,
      title: values.title,
      description: values.description,
    });
  }

  return (
    <Card className="bg-primary/15 shadow-xl md:min-w-96 md:self-start">
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col space-y-8 px-2 py-8 md:px-8"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl">
                    Title <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Love you, but..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl">
                    Description<span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="It is actually you, not me"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="flex items-center gap-2 self-center text-xl"
              disabled={createFeedback.isPending}
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
