"use client";

import { DragDropContext, DropResult, Droppable } from "@hello-pangea/dnd";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ListForm } from "./list-form";
import { ListItem } from "./list-item";
import { reorderTaskInBetween } from "@/app/actions/task";
import revalidateTagServer from "@/app/actions/actions";

// import { trpc } from '@/trpc/client'
// import { ListWithCards } from '@/types'
// import { ListForm } from './list-form'
// import { ListItem } from './list-item'

type ListContainerProps = {
  initialData: any[];
  projectId: string;
  workspaceId: string;
};

function reorder<T>(list: T[], startIndex: number, endIndex: number) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
}

export function ListContainer({
  initialData,
  projectId,
  workspaceId,
}: ListContainerProps) {
  const [loading, setLoading] = useState(false);
  //   const { data, refetch: refetchLists } = trpc.list.getLists.useQuery(
  //     { boardId },
  //     {
  //       initialData: initialData as any,
  //     }
  //   )

  const data = initialData;

  const [orderedData, setOrderedData] = useState(data);

  useEffect(() => {
    setOrderedData(data);
  }, [data]);

  //   const { mutate: mutateUpdateListOrder } = trpc.list.updateListOrder.useMutation({
  //     onSuccess: () => {
  //       toast.success('List reordered')
  //       refetchLists()
  //     },
  //     onError: (err) => {
  //       toast.error(err.data?.code)
  //     },
  //   })

  //   const { mutate: mutateUpdateCardOrder } = trpc.card.updateCardOrder.useMutation({
  //     onSuccess: () => {
  //       toast.success('Card reordered')
  //       refetchLists()
  //     },
  //     onError: (err) => {
  //       toast.error(err.data?.code)
  //     },
  //   })

  const onDragEnd = async (result: DropResult) => {
    console.log("result: ", result);
    const { destination, source, type } = result;
    console.log("destination: ", destination);
    console.log("source: ", source);
    console.log("type: ", type);

    if (!destination) {
      return;
    }

    // If dropped in the same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // User moves a list
    if (type === "list") {
      const items = reorder(orderedData, source.index, destination.index).map(
        (item, index) => ({
          ...item,
          order: index,
        })
      );
      setOrderedData(items);
      //   mutateUpdateListOrder({ items, boardId })
    }

    // User moves a card
    if (type === "card") {
      const newOrderedData = [...orderedData];

      // Source and destination list
      const sourceList = newOrderedData.find(
        (list) => list._id === source.droppableId
      );
      const destinationList = newOrderedData.find(
        (list) => list._id === destination.droppableId
      );

      if (!sourceList || !destinationList) {
        return;
      }

      // Check if cards exists in sourceList
      if (!sourceList.tasks) {
        sourceList.tasks = [];
      }

      // Check if cards exists in destinationList
      if (!destinationList.tasks) {
        destinationList.tasks = [];
      }

      // Moving the card in the same list
      if (source.droppableId === destination.droppableId) {
        const reorderedCards = reorder(
          sourceList.tasks,
          source.index,
          destination.index
        );

        reorderedCards.forEach((card: any, idx) => {
          card.order = idx;
        });

        sourceList.tasks = reorderedCards;

        setOrderedData(newOrderedData);
        console.log("updating data between tasks:", reorderedCards);
        const beforeTaskId =
          destination.index > 0
            ? sourceList.tasks[destination.index - 1]._id
            : null;
        const afterTaskId =
          destination.index < sourceList.tasks.length - 1
            ? sourceList.tasks[destination.index + 1]._id
            : null;
        const currentTaskId = sourceList.tasks[destination.index]._id;
        setLoading(true);
        const isReordered = await reorderTaskInBetween(
          currentTaskId,
          beforeTaskId,
          afterTaskId
        );
        if (isReordered.success) {
          revalidateTagServer("project");
        }
        console.log("isReordered:", isReordered);
        setLoading(false);

        console.log("beforeTaskId: ", beforeTaskId);
        console.log("afterTaskId: ", afterTaskId);
        console.log("currentTaskId: ", currentTaskId);
        // mutateUpdateCardOrder({ boardId, items: reorderedCards })
      } else {
        // Moving the card in different list

        // Remove card from the source list
        const [movedCard] = sourceList.tasks.splice(source.index, 1);

        // Assign the new sectionId to the moved card
        movedCard.section = destination.droppableId;
        movedCard.status = {
          title: destinationList?.title,
          sectionId: destination.droppableId,
        };

        // Add the card to destination list
        destinationList.tasks.splice(destination.index, 0, movedCard);

        // Update the order for each card in the sourceList
        sourceList.tasks.forEach((card: any, idx: any) => {
          card.order = idx;
        });

        // Update the order for each card in the destinationList
        destinationList.tasks.forEach((card: any, idx: any) => {
          card.order = idx;
        });

        // console.log("new order data:", newOrderedData)

        setOrderedData(newOrderedData);
        console.log("updation data between sections:", destinationList.tasks);
        const beforeTaskId =
          destination.index > 0
            ? destinationList.tasks[destination.index - 1]
            : null;
        console.log("beforeTaskId: ", beforeTaskId);
        const afterTaskId =
          destination.index < destinationList.tasks.length - 1
            ? destinationList.tasks[destination.index + 1]
            : null;
        console.log("afterTaskId: ", afterTaskId);
        const currentTaskId = destinationList.tasks[destination.index];
        console.log("currentTaskId: ", currentTaskId);

        // mutateUpdateCardOrder({ boardId, items: destinationList.tasks })
      }
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="lists" type="list" direction="horizontal">
        {(provided) => (
          <ol
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex h-full gap-x-3"
          >
            {orderedData.map((list, index) => (
              <ListItem
                projectId={projectId}
                workspaceId={workspaceId}
                data={list as any}
                index={index}
                refetchLists={() => {}}
                key={list._id}
              />
            ))}
            {provided.placeholder}
            <ListForm refetchLists={() => {}} />
            <div className="w-1 flex-shrink-0" aria-hidden="true" />
          </ol>
        )}
      </Droppable>
    </DragDropContext>
  );
}
