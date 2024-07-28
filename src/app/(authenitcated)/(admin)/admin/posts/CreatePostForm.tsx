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
import { createPostSchema } from "~/lib/zodSchemas";
import { api } from "~/trpc/react";
import { toast } from "sonner";
import { PostType, PostTypeColors, postTypeLabels } from "~/lib/constants";
import * as React from "react";
import { Textarea } from "~/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

export default function CreatePostForm({ companyId }: { companyId: string }) {
  const utils = api.useUtils();

  const form = useForm<z.infer<typeof createPostSchema>>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      title: "",
      content: "",
      tag: PostType.NEW,
    },
  });

  const createPost = api.post.create.useMutation({
    onSuccess: async () => {
      await utils.post.invalidate();
      form.reset();
      toast.success("Posted 🏋️‍♂️");
    },
    onError: (error) => {
      toast.error(error.message ?? "Something went wrong, please try again!");
    },
  });

  function onSubmit(values: z.infer<typeof createPostSchema>) {
    createPost.mutate({
      title: values.title,
      content: values.content,
      tag: values.tag,
      companyId,
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
                    <Input placeholder="What you did" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl">
                    Content <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="More about what's better"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tag"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tag</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className={PostTypeColors[field.value]}>
                        <SelectValue placeholder="Choose a tag" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.values(PostType).map((key) => (
                        <SelectItem
                          key={key}
                          value={key}
                          className={PostTypeColors[key]}
                        >
                          {postTypeLabels[key]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
