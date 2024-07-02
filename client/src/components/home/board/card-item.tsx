import revalidateTagServer from "@/app/actions/actions";
import { markCompleteIncomplete } from "@/app/actions/task";
import { cn } from "@/lib/utils";
import { Draggable } from "@hello-pangea/dnd";
import { CircleCheckIcon, CircleUserIcon, UserRound } from "lucide-react";
import Link from "next/link";
// import { Card } from '@prisma/client'
import { useEffect, useState } from "react";
import { UserAvatarCard, UserCard } from "../workspace/Members";
import DueDate from "../task/right/DueDate";

// import { useCardModal } from '@/hooks/use-card-modal'

type CardItemProps = {
  data: any;
  index: number;
  refetchLists: any;
  projectId: string;
  workspaceId: string;
};

export function CardItem({
  data,
  index,
  refetchLists,
  projectId,
  workspaceId,
}: CardItemProps) {
  // const { onOpen, setRefetchLists } = useCardModal()

  // useEffect(() => {
  //   setRefetchLists(refetchLists)
  // }, [refetchLists, setRefetchLists])

  const [markComplete, setMarkComplete] = useState({ id: "", mark: false });
  const handleCompleteSubTask = async (
    status: "COMPLETE" | "INCOMPLETE",
    id: string
  ) => {
    if (status === "COMPLETE") {
      console.log("mark compelte");
      setMarkComplete({
        id,
        mark: true,
      });
      await markCompleteIncomplete(id, true);
    }

    if (status === "INCOMPLETE") {
      console.log("mark incomplete");
      setMarkComplete({
        id,
        mark: false,
      });
      await markCompleteIncomplete(id, false);
    }
    revalidateTagServer("project");
  };

  return (
    <Draggable draggableId={data._id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className="rounded-md border bg-background px-3 py-3 text-sm shadow-sm hover:border-muted-foreground"
          role="button"
          // onClick={() => onOpen(data.id)}
        >
          <div>
            <div className="flex gap-x-4 items-start">
              <div className="w-5 h-5">
                {data.done === true ||
                (data._id === markComplete.id && markComplete.mark) ? (
                  <CircleCheckIcon
                    onClick={() =>
                      handleCompleteSubTask("INCOMPLETE", data._id)
                    }
                    // fill="#58a182"
                    size={25}
                    className="-ml-0.5 text-background fill-[#58a182] rounded-full cursor-pointer"
                  />
                ) : (
                  <CircleCheckIcon
                    size={20}
                    onClick={() => handleCompleteSubTask("COMPLETE", data._id)}
                    className="hover:text-[#0d7f56] hover:!fill-background rounded-full cursor-pointer text-muted-foreground"
                  />
                )}
              </div>

              <Link
                className={cn("")}
                href={`/home/${workspaceId}/${projectId}/${data._id}`}
              >
                <div>{data.title}sadfsdfasf asdf</div>
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-between mt-3 gap-1">
            {data.assignee ? (
              <UserCard
                avatarClassName="h-6 w-6"
                className="space-x-2 -ml-2"
                id={data.assignee?._id}
                name={data.assignee?.name}
                nameFallback=""
                src={data?.assignee?.profileImage}
              />
            ) : <div className="flex items-center gap-x-2"><CircleUserIcon size={22} className="text-muted-foreground" /> None</div>}
            {
              data?.due && 
            <DueDate dueDate={data.due} taskId={data._id} isClearButton={false} />
            }
          </div>
        </div>
      )}
    </Draggable>
  );
}
