"use server";

import { revalidateTag } from "next/cache";

export default async function revalidateTagServer(tag: string) {
  console.log("revalidating:", tag);
  revalidateTag(tag);
}
