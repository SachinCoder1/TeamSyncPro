import { Heading } from "@/components/ui/typography";
import { getServerAuth } from "@/lib/auth";
import { getGreeting } from "@/lib/utils";
import { format } from "date-fns";
import React from "react";

export default async function Page() {
  const session = await getServerAuth();
  return (
    <div className="mt-8 px-6">
      {/* <h1>Home</h1> */}
      {/* <p>Welcome {session.user.name}</p> */}
      {/* your workspace is {session.user.workspace} */}
      <div className="space-y-2 my-4">
        <Heading className="font-semibold">Home</Heading>
      </div>
      <div className="flex flex-col gap-y-1 items-center w-full">
        <Heading variant="h5" className="font-normal">
          {format(new Date(), "EEEE, MMMM d")}
        </Heading>
        <Heading variant="h2" className="font-normal">
          {getGreeting()}, {session.user.name}
        </Heading>
      </div>
    </div>
  );
}
