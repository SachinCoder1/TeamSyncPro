"use client";

import revalidateTagServer from "@/app/actions/actions";
import { addComment } from "@/app/actions/task";
import { RichTextEditor } from "@/components/ui/RichTextEditor";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import React, { useRef, useState } from "react";
import { useOptimistic } from "react";
type Message = {
  comment: string;
};

type Props = {
  taskId: string;
  comments: Message[];
};

const AddCommentHandler = ({ taskId, comments }: Props) => {
  const session = useSession();
  const formRef = useRef(null);
  const [optimisticMessages, addOptimisticMessage] = useOptimistic<
    Message[],
    string
  >(comments, (state, newComment) => [...state, { comment: newComment }]);
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
      <div className="flex items-start gap-x-2">
        <Avatar className="w-8 h-8">
          <AvatarImage
            //   src={session || "https://github.com/shadcn.png"}
            alt="@shadcn"
          />
          <AvatarFallback>
            {session.data?.user.name[0]?.toUpperCase()}
          </AvatarFallback>
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
              <Button variant={"secondary"} onClick={handleReset}>
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
      {/* <form
        ref={formRef}
        action={async (formData: FormData) => {
          const message = formData.get("comment") as string;
          addOptimisticMessage(message);
          (formRef.current as any)?.reset();
          const data = await addComment(taskId, message);
          revalidateTagServer("comments");
          console.log("data received after done", data);
        }}
      >
        <div className="flex items-center gap-x-2">
          <Avatar className="w-8 h-8">
            <AvatarImage
              //   src={session || "https://github.com/shadcn.png"}
              alt="@shadcn"
            />
            <AvatarFallback>
              {session.data?.user.name[0]?.toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <Input placeholder="Enter your Comment" type="text" name="comment" />
        </div>
      </form> */}
      {optimisticMessages.map((m, k) => (
        <div key={k} dangerouslySetInnerHTML={{ __html: m.comment }} />
      ))}
    </div>
  );
};

export default AddCommentHandler;
