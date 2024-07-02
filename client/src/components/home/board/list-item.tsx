"use client";

import { ElementRef, useRef, useState } from "react";
import { Draggable, Droppable } from "@hello-pangea/dnd";

import { cn } from "@/lib/utils";
// import { ListWithCards } from '@/types'
import { CardForm } from "./card-form";
import { CardItem } from "./card-item";
import { ListHeader } from "./list-header";
// import { ListHeader } from './list-header'

type ListItemProps = {
  data: any;
  index: number;
  refetchLists: any;
  projectId: string;
  workspaceId: string;
};

export function ListItem({
  data,
  index,
  refetchLists,
  projectId,
  workspaceId,
}: ListItemProps) {
  const textAreaRef = useRef<ElementRef<"textarea">>(null);

  const [isEditing, setIsEditing] = useState(false);

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      textAreaRef.current?.focus();
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  return (
    <Draggable draggableId={data._id} index={index}>
      {(provided) => (
        <li
          {...provided.draggableProps}
          ref={provided.innerRef}
          className="h-full w-[272px] shrink-0 select-none"
        >
          <div
            {...provided.dragHandleProps}
            className="w-full rounded-md bg-secondary pb-2 shadow-md"
          >
            <ListHeader
              data={data}
              onAddCard={enableEditing}
              refetchLists={refetchLists}
            />
            <div className="!max-h-[calc(100vh-215px)] overflow-y-auto">
              <Droppable droppableId={data._id} type="card">
                {(provided) => (
                  <ol
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className={cn(
                      "mx-1 flex flex-col gap-y-2 px-1 py-0.5",
                      data.tasks.length > 0 ? "mt-2" : "mt-0"
                    )}
                  >
                    {data.tasks.map((card: any, index: any) => (
                      <CardItem
                        projectId={projectId}
                        workspaceId={workspaceId}
                        data={card}
                        index={index}
                        refetchLists={refetchLists}
                        key={card._id}
                      />
                    ))}
                    {provided.placeholder}
                  </ol>
                )}
              </Droppable>
              <CardForm
                listId={data._id}
                isEditing={isEditing}
                enableEditing={enableEditing}
                disableEditing={disableEditing}
                refetchLists={refetchLists}
              />
            </div>
          </div>
        </li>
      )}
    </Draggable>
  );
}
