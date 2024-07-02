'use client'


import create from 'zustand';

interface Task {
  id: string;
  content: string;
}

interface Column {
  id: string;
  title: string;
  taskIds: string[];
}

interface BoardState {
  tasks: { [key: string]: Task };
  columns: { [key: string]: Column };
  columnOrder: string[];
  addTask: (columnId: string, content: string) => void;
  addColumn: (title: string) => void;
  moveTask: (source: { droppableId: string; index: number }, destination: { droppableId: string; index: number }) => void;
  moveColumn: (sourceIndex: number, destinationIndex: number) => void;
}

const useBoardStore = create<BoardState>((set) => ({
  tasks: {
    'task-1': { id: 'task-1', content: 'Take out the garbage' },
    'task-2': { id: 'task-2', content: 'Watch my favorite show' },
    'task-3': { id: 'task-3', content: 'Charge my phone' },
    'task-4': { id: 'task-4', content: 'Cook dinner' },
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'To do',
      taskIds: ['task-1', 'task-2'],
    },
    'column-2': {
      id: 'column-2',
      title: 'In progress',
      taskIds: ['task-3'],
    },
    'column-3': {
      id: 'column-3',
      title: 'Done',
      taskIds: ['task-4'],
    },
  },
  columnOrder: ['column-1', 'column-2', 'column-3'],
  addTask: (columnId, content) =>
    set((state) => {
      const newTaskId = `task-${Date.now()}`;
      const newTask = { id: newTaskId, content };

      const column = state.columns[columnId];
      const newTaskIds = [...column.taskIds, newTaskId];
      const newColumn = { ...column, taskIds: newTaskIds };

      return {
        ...state,
        tasks: { ...state.tasks, [newTaskId]: newTask },
        columns: { ...state.columns, [columnId]: newColumn },
      };
    }),
  addColumn: (title) =>
    set((state) => {
      const newColumnId = `column-${Date.now()}`;
      const newColumn = { id: newColumnId, title, taskIds: [] };

      return {
        ...state,
        columns: { ...state.columns, [newColumnId]: newColumn },
        columnOrder: [...state.columnOrder, newColumnId],
      };
    }),
  moveTask: (source, destination) =>
    set((state) => {
      const start = state.columns[source.droppableId];
      const finish = state.columns[destination.droppableId];

      if (start === finish) {
        const newTaskIds = Array.from(start.taskIds);
        newTaskIds.splice(source.index, 1);
        newTaskIds.splice(destination.index, 0, state.tasks[source.index].id);

        const newColumn = { ...start, taskIds: newTaskIds };

        return {
          ...state,
          columns: {
            ...state.columns,
            [newColumn.id]: newColumn,
          },
        };
      }

      const startTaskIds = Array.from(start.taskIds);
      startTaskIds.splice(source.index, 1);
      const newStart = { ...start, taskIds: startTaskIds };

      const finishTaskIds = Array.from(finish.taskIds);
      finishTaskIds.splice(destination.index, 0, state.tasks[source.index].id);
      const newFinish = { ...finish, taskIds: finishTaskIds };

      return {
        ...state,
        columns: {
          ...state.columns,
          [newStart.id]: newStart,
          [newFinish.id]: newFinish,
        },
      };
    }),
  moveColumn: (sourceIndex, destinationIndex) =>
    set((state) => {
      const newColumnOrder = Array.from(state.columnOrder);
      newColumnOrder.splice(sourceIndex, 1);
      newColumnOrder.splice(destinationIndex, 0, state.columnOrder[sourceIndex]);

      return {
        ...state,
        columnOrder: newColumnOrder,
      };
    }),
}));

export default useBoardStore;
