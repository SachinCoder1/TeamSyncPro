'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Plus, X } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { ElementRef, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { useEventListener, useOnClickOutside } from 'usehooks-ts'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import ListWrapper from './list-wrapper'
import { createSection } from '@/app/actions/section'
import revalidateTagServer from '@/app/actions/actions'

type ListFormProps = {
  refetchLists: any
}

export function ListForm({ refetchLists }: ListFormProps) {
  const [loading, setLoading] = useState(false);
  const params = useParams()

  const formRef = useRef<ElementRef<'form'>>(null)
  const inputRef = useRef<ElementRef<'input'>>(null)

  const [isEditing, setIsEditing] = useState(false)

  const enableEditing = () => {
    setIsEditing(true)
    setTimeout(() => {
      formRef.current?.focus()
    })
  }

  const disableEditing = () => {
    setIsEditing(false)
  }

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      disableEditing()
    }
  }

  const formSchema = z.object({
    title: z.string().min(3, { message: 'Minimum 3 chars required.' }),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    console.log(values, params.project);
    const isCreated = await createSection(
      values.title,
      params.project as string,
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

  useEventListener('keydown', onKeyDown)
  useOnClickOutside(formRef, () => {
    if (!form.getValues("title")) {
      handleReset();
      return;
    }
    formRef.current?.requestSubmit();
  });

  if (isEditing) {
    return (
      <ListWrapper>
        <Form {...form}>
          <form
            ref={formRef}
            className="w-full space-y-4 rounded-md bg-white p-3 shadow-md"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Enter list title..."
                      {...field}
                      ref={inputRef}
                      disabled={loading}
                      className="h-7 border-transparent px-2 py-1 text-sm font-medium transition hover:border-input focus:border-input"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-1">
              <Button type="submit" variant="default" size="sm" disabled={loading}>
                Add section
              </Button>
              <Button disabled={loading} onClick={handleReset} size="sm" variant="ghost">
                cancel
              </Button>
            </div>
          </form>
        </Form>
      </ListWrapper>
    )
  }

  return (
    <ListWrapper>
      <button
        className="flex w-full items-center rounded-md bg-white/80 p-3 text-sm font-medium transition hover:bg-white/50"
        onClick={enableEditing}
      >
        <Plus className="mr-2 h-4 w-4" />
        Add section 
      </button>
    </ListWrapper>
  )
}
