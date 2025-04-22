import React from 'react';
import Image from 'next/image';
import {cn} from "@/src/lib/utils";

const Message: React.FC<TMessage> = ({role, content}) => {
  return (
    <div
      className={cn("w-fit min-w-32 flex gap-2 items-start bg-muted py-2 px-3 rounded-lg border", {
        "ml-auto": role === "user",
        "mr-auto": role === "assistant",
      })}
    >
      {
        role === "assistant" && (
          <div className="w-8 h-8 rounded-full overflow-hidden shrink-0">
            <Image
              src="/robot.png"
              alt="Assistant"
              width={32}
              height={32}
            />
          </div>
        )
      }
      <div className={cn("w-full flex flex-col gap-1", {
        "items-end": role === "user",
        "items-start": role === "assistant",
      })}>
        <p className="text-sm font-medium text-primary capitalize">
          {role}
        </p>
        <p className="text-sm">{content}</p>
      </div>
    </div>
  );
};

export default Message;