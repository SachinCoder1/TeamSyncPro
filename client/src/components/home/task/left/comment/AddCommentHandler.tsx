"use client";

import revalidateTagServer from "@/app/actions/actions";
import { addComment, deleteComment, updateComment } from "@/app/actions/task";
import DeleteModal from "@/components/ui/DeleteModal";
import { RichTextEditor } from "@/components/ui/RichTextEditor";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CommentType } from "@/types/project";
import { formatFullDate, formatRelativeDate } from "@/utils/formatDate";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
// import { useOptimistic } from "react";

type Props = {
  taskId: string;
  comments: CommentType[];
};

const AddCommentHandler = ({ taskId, comments }: Props) => {
  const { data: user } = useSession();
  const [editCommentValue, setEditCommentValue] = useState("");
  const [editingCommentId, setEditingCommentId] = useState("");
  const [isEditingComment, setIsEditingComment] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentComment, setCurrentComment] = useState<CommentType | null>(
    null
  );

  const [value, setValue] = useState("");

  const handleCommentHandler = async () => {
    const comment = value;
    // addOptimisticMessage(comment);
    handleReset();
    const data = await addComment(taskId, comment);
    revalidateTagServer("comments");
    console.log("data received after done", data);
  };

  const handleReset = () => {
    setValue("");
    setIsEditing(false);
  };

  const handleDeleteClick = (comment: any) => {
    // Set the current comment to be deleted
    setCurrentComment(comment);
    // Open the delete modal
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirmClick = async () => {
    if (!currentComment) return;
    console.log("deleting..");
    setDeleteModalOpen(false);
    console.log("deleting comment...", currentComment);
    // return;
    const isDeleted = await deleteComment(currentComment?._id as string);
    console.log("isDeleted:", isDeleted);
    if (isDeleted.success) {
      console.log("comment deleted successfully");
      revalidateTagServer("comments");
    }
  };

  const handleEditComment = async () => {
    const data = await updateComment(editingCommentId, editCommentValue);
    if (data.success) {
      revalidateTagServer("comments");
    }
    setIsEditingComment(false);
    setEditCommentValue("");
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
            <div className="flex gap-x-2">
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
        {comments?.map((m, k) => (
          <div key={m._id + k} className={cn("flex items-start gap-x-4")}>
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
                {m?.edited && m?.updatedAt && (
                  <p
                    className="text-sm text-[#626F86]"
                    title={formatFullDate(m.updatedAt)}
                  >
                    Edited
                  </p>
                )}
              </div>

              {isEditingComment && m._id === editingCommentId ? (
                <>
                  <div className="space-y-4 w-full">
                    <RichTextEditor
                      isEditing={isEditingComment}
                      setIsEditing={setIsEditingComment}
                      className={cn(
                        "border-2 !w-full",
                        isEditingComment &&
                          "border-primary rounded-xl !min-h-32"
                      )} // flex flex-col-reverse to make the options bottom
                      placeholder={"Edit the comment..."}
                      value={editCommentValue}
                      setValue={setEditCommentValue}
                    />
                    <div className="flex gap-x-2">
                      <Button onClick={handleEditComment}>Update</Button>
                      <Button
                        variant={"ghost"}
                        onClick={() => setIsEditingComment(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div
                    className="text-[#172B4D] mt-2"
                    key={k}
                    dangerouslySetInnerHTML={{ __html: m.comment }}
                  />
                  <div className="flex gap-x-4">
                    <Button
                      onClick={() => {
                        setIsEditingComment(true);
                        setEditingCommentId(m._id);
                        setEditCommentValue(m.comment);
                      }}
                      className="!px-0 text-[#44546F]"
                      variant={"link"}
                    >
                      Edit
                    </Button>

                    <Button
                      onClick={() => handleDeleteClick(m)}
                      className="!px-0 text-[#44546F]"
                      variant={"link"}
                    >
                      Delete
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
        <DeleteModal
          open={deleteModalOpen}
          setOpen={setDeleteModalOpen}
          description="Are you sure you want to delete this comment? This action cannot be undone."
          title="Delete Comment?"
          handleClick={handleDeleteConfirmClick}
        />
      </div>
    </div>
  );
};

export default AddCommentHandler;
