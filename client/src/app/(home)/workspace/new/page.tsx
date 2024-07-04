import { Heading } from "@/components/ui/typography";
import NewWorkspace from "@/components/workspace/NewWorkspace";
import React from "react";

type Props = {};

const Page = (props: Props) => {
  return (
    <div>
      <Heading className="font-normal" variant="h4">
        Create new workspace
      </Heading>

      <div className="my-4">
        <NewWorkspace />
      </div>
    </div>
  );
};

export default Page;
