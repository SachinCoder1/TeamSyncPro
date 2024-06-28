import { type ClassValue, clsx } from "clsx";
import { cache } from "react";
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




// Hash function to generate a number from a string
const stringToHash = (string: string): number => {
  let hash = 0;
  for (let i = 0; i < string.length; i++) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }
  return hash;
};

// Convert the hash to a hex color
const hashToColor = (hash: number): string => {
  let color = '#';
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xFF;
    color += ('00' + value.toString(16)).substr(-2);
  }
  return color;
};

// Generate a consistent color for a given name
export const getColorForName = cache((name: string): string => {
  const hash = stringToHash(name);
  console.log("hashtoColor:", hashToColor(hash))
  return hashToColor(hash);
});
