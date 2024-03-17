import {  getSession } from "next-auth/react";
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

function updateOptions(options: any) {
  const update = { ...options };
  if (localStorage.jwt) {
    update.headers = {
      ...update.headers,
      Authorization: `Bearer ${localStorage.jwt}`,
    };
  }
  return update;
}

export default async function fetcher(url: string, options: any) {
    const session = await getSession();
    const serverSession = await getServerSession(authOptions);
    console.log("session........................: ", session);
    console.log("server session........................: ", serverSession);
  return fetch(url, updateOptions(options));
}
