import revalidateTagServer from "@/app/actions/actions";
import { markCompleteIncomplete } from "@/app/actions/task";
import { cn } from "@/lib/utils";
import { Draggable } from "@hello-pangea/dnd";
import { CircleCheckIcon } from "lucide-react";
import Link from "next/link";
// import { Card } from '@prisma/client'
import { useEffect, useState } from "react";

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
          className="rounded-md border bg-white px-3 py-3 text-sm shadow-sm hover:border-muted-foreground"
          role="button"
          // onClick={() => onOpen(data.id)}
        >
          <div className="flex gap-x-4 items-start">
            <div className="w-5 h-5">
              {data.done === true ||
              (data._id === markComplete.id && markComplete.mark) ? (
                <CircleCheckIcon
                  onClick={() => handleCompleteSubTask("INCOMPLETE", data._id)}
                  // fill="#58a182"
                  size={25}
                  className="-ml-0.5 text-white fill-[#58a182] rounded-full cursor-pointer"
                />
              ) : (
                <CircleCheckIcon
                  size={20}
                  onClick={() => handleCompleteSubTask("COMPLETE", data._id)}
                  className="hover:text-[#0d7f56] hover:!fill-white rounded-full cursor-pointer text-muted-foreground"
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
      )}
    </Draggable>
  );
}
