import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export type onboardFormDataType = {
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
  setFormData: (data: onboardFormDataType) => void;
};

export const useOnboardingStore = create<State & Actions>()(
  immer((set) => ({
    formData: {
      project: "",
      tasks: [],
      sections: [],
    },
    setFormData: (data: onboardFormDataType) =>
      set((state) => {
        state.formData = { ...state.formData, ...data };
      }),
  }))
);
