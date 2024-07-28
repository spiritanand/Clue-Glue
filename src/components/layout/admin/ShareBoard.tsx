"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { Share2 } from "lucide-react";
import { toast } from "sonner";

function ShareBoard({ companyName }: { companyName: string }) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger
          onClick={() => {
            void navigator.clipboard.writeText(
              encodeURI(`${window.location.origin}/${companyName}/roadmap`),
            );

            toast.success("Link copied to clipboard!");
          }}
        >
          <Share2 />
        </TooltipTrigger>
        <TooltipContent>
          <p>Share Public Board</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default ShareBoard;
