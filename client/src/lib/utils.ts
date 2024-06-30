import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getQueryParam(
  callbackUrl: string,
  param: string
): string | null {
  try {
    // const url = new URL(callbackUrl);
    // const params = new URLSearchParams(url.search);
    // const callbackUrlParam = params.get("callbackUrl");

    const callbackUrlObj = new URL(callbackUrl as any);
    const queryParams = new URLSearchParams(callbackUrlObj.search);
    return queryParams.get(param);
  } catch (error) {
    return null;
  }
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
  let color = "#";
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    color += ("00" + value.toString(16)).substr(-2);
  }
  return color;
};

// Generate a consistent color for a given name
export const getColorForName = (name: string): string => {
  const hash = stringToHash(name);
  return hashToColor(hash);
};



export const getGreeting = () => {
  const date = new Date();
  const hour = date.getHours();

  if (hour < 12) {
    return "Good morning";
  } else if (hour < 18) {
    return "Good afternoon";
  } else if (hour < 21) {
    return "Good evening";
  } else {
    return "Good night";
  }
};
