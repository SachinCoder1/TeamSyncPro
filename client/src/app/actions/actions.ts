"use server";

import { revalidatePath, revalidateTag } from "next/cache";

export default async function revalidateTagServer(tag: string) {
  console.log("revalidating:", tag);
  revalidateTag(tag);
}
export async function revalidatePathServer(path: string, type: 'layout' | 'page' = "page" ) {
  console.log("revalidating:", path);
  revalidatePath(path, type);
}
