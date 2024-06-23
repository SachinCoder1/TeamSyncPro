"use client";

import revalidateTagServer from "@/app/actions/actions";
import { addComment } from "@/app/actions/task";
import { RichTextEditor } from "@/components/ui/RichTextEditor";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { CommentType } from "@/types/project";
import { formatFullDate, formatRelativeDate } from "@/utils/formatDate";
import { useSession } from "next-auth/react";
import React, { useRef, useState } from "react";
import { useOptimistic } from "react";

type Props = {
  taskId: string;
  comments: CommentType[];
};

const AddCommentHandler = ({ taskId, comments }: Props) => {
  const { data: user } = useSession();
  const formRef = useRef(null);
  const [optimisticMessages, addOptimisticMessage] = useOptimistic<
    CommentType[],
    string
  >(comments, (state, newComment) => [
    ...state,
    {
      comment: newComment,
      _id: undefined as any,
      user: { _id: user?.user.id as string, name: user?.user.name as string },
      createdAt: new Date() as any,
    },
  ]);
  console.log("optimistic messages:", optimisticMessages);
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState("");

  const handleCommentHandler = async () => {
    const comment = value;
    addOptimisticMessage(comment);
    handleReset();
    const data = await addComment(taskId, comment);
    revalidateTagServer("comments");
    console.log("data received after done", data);
  };

  const handleReset = () => {
    setValue("");
    setIsEditing(false);
  };

  return (
    <div>
      <div
        className={cn("flex items-start gap-x-4", !isEditing && "items-center")}
      >
        <Avatar className="w-8 h-8">
          <AvatarImage
            //   src={session || "https://github.com/shadcn.png"}
            alt="@shadcn"
          />
          <AvatarFallback>{user?.user.name[0]?.toUpperCase()}</AvatarFallback>
        </Avatar>
        {isEditing ? (
          <div className="space-y-4 w-full">
            <RichTextEditor
              isEditing={isEditing}
              setIsEditing={setIsEditing}
              className={cn(
                "border-2 !w-full",
                isEditing && "border-primary rounded-xl !min-h-32"
              )} // flex flex-col-reverse to make the options bottom
              placeholder={"Add a comment..."}
              value={value}
              setValue={setValue}
            />
            <div className="flex gap-x-4">
              <Button onClick={handleCommentHandler}>Send</Button>
              <Button variant={"ghost"} onClick={handleReset}>
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          !isEditing && (
            <div
              onClick={() => setIsEditing(true)}
              className="border-2 w-full px-2 py-2"
            >
              Add a comment...
            </div>
          )
        )}
      </div>
      <div className="my-4">
        {optimisticMessages.map((m, k) => (
          <div className={cn("flex items-start gap-x-4")}>
            <Avatar className="w-8 h-8">
              <AvatarImage
                //   src={session || "https://github.com/shadcn.png"}
                alt="@shadcn"
              />
              <AvatarFallback>{m?.user.name[0]?.toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <div className="flex gap-x-3">
                <p className="font-semibold text-[#44546F]">{m.user.name}</p>
                <p
                  className="text-sm text-[#626F86]"
                  title={formatFullDate(m.createdAt)}
                >
                  {formatRelativeDate(m.createdAt || "")}
                </p>
                {m.createdAt !== m.updatedAt && m.updatedAt && (
                  <p
                    className="text-sm text-[#626F86]"
                    title={formatFullDate(m.createdAt)}
                  >
                    Edited
                  </p>
                )}
              </div>
              <div
                className="text-[#172B4D] mt-2"
                key={k}
                dangerouslySetInnerHTML={{ __html: m.comment }}
              />
              <div className="flex gap-x-4">
                <Button className="!px-0 text-[#44546F]" variant={"link"}>
                  Edit
                </Button>
                <Button className="!px-0 text-[#44546F]" variant={"link"}>
                  Delete
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddCommentHandler;
