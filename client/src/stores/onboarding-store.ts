import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type formDataType = {
  project: string;
  tasks: string[];
  sections: string[];
};

type State = {
  formData: {
    project: string;
    tasks: string[];
    sections: string[];
  };
};

type Actions = {
  setFormData: (data: formDataType) => void;
};

export const useOnboardingStore = create<State & Actions>()(
  immer((set) => ({
    formData: {
      project: "",
      tasks: [],
      sections: [],
    },
    setFormData: (data: formDataType) =>
      set((state) => {
        state.formData = { ...state.formData, ...data };
      }),
  }))
);
