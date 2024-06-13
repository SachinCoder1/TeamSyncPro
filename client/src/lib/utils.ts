import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isValidObjectId = (id: string) => {
  const ObjectIdRegex = /^[0-9a-fA-F]{24}$/;
  return ObjectIdRegex.test(id);
};

export function calculateProgressPercentage(
  currentStep: number,
  totalSteps: number
): number {
  if (totalSteps === 0) return 0; // Avoid division by zero
  const progress = (currentStep / totalSteps) * 100;
  return Math.min(Math.max(progress, 0), 100); // Ensure the percentage is between 0 and 100
}