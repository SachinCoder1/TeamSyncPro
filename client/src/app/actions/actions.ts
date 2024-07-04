"use server";

import { revalidatePath, revalidateTag } from "next/cache";

export default async function revalidateTagServer(tag: string) {
  revalidateTag(tag);
}
export async function revalidatePathServer(path: string, type: 'layout' | 'page' = "page" ) {
  revalidatePath(path, type);
}
