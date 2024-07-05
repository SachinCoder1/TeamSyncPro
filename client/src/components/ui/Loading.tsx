import { cn } from "@/lib/utils";
import { Beaker, Building, CupSoda, Kanban, SquareKanban } from "lucide-react";
import React from "react";

const LoadingComponent = () => {
  return (
    <div className="flex items-center justify-center md:mt-40 mt-20">
      <div className="text-center flex items-center flex-col">
        <div className="relative flex justify-center items-center">
          <div className="absolute animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-primary"></div>
          {/* <img
            src="https://www.svgrepo.com/show/509001/avatar-thinking-9.svg"
            className="rounded-full h-28 w-28"
          /> */}
          <Beaker className="rounded-full h-20 w-20 text-primary" />
        </div>

        <p className="text-lg font-medium mt-8 text-muted-foreground">
          Loading...
        </p>
      </div>
    </div>
  );
};

export default LoadingComponent;
