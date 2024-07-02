"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, X } from "lucide-react";
import { useParams } from "next/navigation";
import {
  ElementRef,
  KeyboardEventHandler,
  forwardRef,
  useRef,
  useState,
} from "react";
import { useForm } from "react-hook-form";
import { useEventListener, useOnClickOutside } from "usehooks-ts";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { createTask } from "@/app/actions/task";
import revalidateTagServer from "@/app/actions/actions";
// import { trpc } from '@/trpc/client'

type CardFormProps = {
  listId: string;
  isEditing: boolean;
  refetchLists: any;
  enableEditing: () => void;
  disableEditing: () => void;
};

export const CardForm = forwardRef<HTMLTextAreaElement, CardFormProps>(
  ({ listId, isEditing, refetchLists, enableEditing, disableEditing }, ref) => {
    const [loading, setLoading] = useState(false);
    const params = useParams();
    const formRef = useRef<ElementRef<"form">>(null);

    const formSchema = z.object({
      title: z.string().min(3, { message: "Title is too short." }),
    });

    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        title: "",
      },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
      setLoading(true);
      console.log(values, params.project, listId);
      const isCreated = await createTask(
        values.title,
        params.project as string,
        listId
      );
      console.log("is created:", isCreated);
      if (isCreated.success) {
        revalidateTagServer("project");
      }
      handleReset();
    };

    const handleReset = () => {
      setLoading(false);
      disableEditing();
      form.reset();
      form.clearErrors();
    };

    const onKeyDown = (e: any) => {
      if (e.key === "Escape") {
        disableEditing();
      }
    };

    const onTextareaKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (
      e
    ) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        formRef.current?.requestSubmit();
      }
    };

    useEventListener("keydown", onKeyDown);
    useOnClickOutside(formRef, () => {
      if (!form.getValues("title")) {
        handleReset();
        return;
      }
      formRef.current?.requestSubmit();
    });

    if (isEditing) {
      return (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="m-1 space-y-2 px-1 py-0.5"
            ref={formRef}
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="w-full space-y-2">
                  <div className="w-full space-y-1">
                    <FormControl>
                      <Textarea
                        autoFocus
                        placeholder="Enter a title for this card..."
                        // className="resize-none shadow-sm outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                        {...field}
                        // disabled={isLoading}
                        onKeyDown={onTextareaKeyDown}
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-1">
              <Button disabled={loading} type="submit" variant="default">
                Create
              </Button>
              <Button
                disabled={loading}
                type="reset"
                onClick={handleReset}
                size="sm"
                variant="ghost"
              >
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      );
    }

    return (
      <div className="px-2 pt-2">
        <Button
          onClick={enableEditing}
          disabled={loading}
          className="h-auto w-full justify-start px-2 py-1.5 text-sm text-muted-foreground"
          size="sm"
          variant="ghost"
        >
          <Plus className="mr-2 h-4 w-4" />
          Create task
        </Button>
      </div>
    );
  }
);

CardForm.displayName = "CardForm";
