import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type State = {
  isEditing: boolean;
};

type Actions = {
  setIsEditing: (data: boolean) => void;
};

const initialState: State = {
  isEditing: false,
};

export const useSubTaskOpenerStore = create<State & Actions>()(
  immer((set) => ({
    isEditing: initialState.isEditing as any,
    setIsEditing: (data: boolean) =>
      set((state) => {
        state.isEditing = data;
      }),
  }))
);
