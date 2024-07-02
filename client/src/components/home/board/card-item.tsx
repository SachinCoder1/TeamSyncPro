import { Draggable } from '@hello-pangea/dnd'
// import { Card } from '@prisma/client'
import { useEffect } from 'react'

// import { useCardModal } from '@/hooks/use-card-modal'

type CardItemProps = {
  data: any
  index: number
  refetchLists: any
}

export function CardItem({ data, index, refetchLists }: CardItemProps) {
  // const { onOpen, setRefetchLists } = useCardModal()

  // useEffect(() => {
  //   setRefetchLists(refetchLists)
  // }, [refetchLists, setRefetchLists])

  return (
    <Draggable draggableId={data._id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className="truncate rounded-md border-2 border-transparent bg-white px-3 py-2 text-sm shadow-sm hover:border-black"
          role="button"
          // onClick={() => onOpen(data.id)}
        >
          {data.title}
        </div>
      )}
    </Draggable>
  )
}
