import { getServerAuth } from "@/lib/auth";
import React from "react";

export default async function Page() {
  const session = await getServerAuth();
  return (
    <div>
      <h1>Home</h1>
      <p>Welcome {session.user.name}</p>
      your workspace is {session.user.workspace}
    </div>
  );
}
