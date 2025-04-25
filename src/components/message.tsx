import React from 'react';
import Image from 'next/image';
import {cn} from "@/src/lib/utils";
import 'highlight.js/styles/github.css';
import MarkdownGPT from "@/src/components/markdown-gpt";

const Message: React.FC<TMessage> = ({role, content}) => {
  return (
    <div
      className={cn("w-fit flex flex-col gap-2 items-start", {
        "ml-auto": role === "user",
        "mr-auto": role === "assistant",
      })}
    >
      {
        role === "assistant" && (
          <div className={"w-full h-8 flex gap-1 justify-start"}>
            <div className="w-8 h-8 rounded-full overflow-hidden shrink-0">
              <Image
                src="/robot.png"
                alt="Assistant"
                width={32}
                height={32}
              />
            </div>
            <p className="text-xl font-bold text-primary capitalize">
              {role}
            </p>
          </div>)
      }
      
      {
        role === "assistant"
          ? <MarkdownGPT content={content}/>
          : <p className={"text-right bg-accent p-4 rounded-lg border"}>{content}</p>
      }
    </div>
  );
};

export default Message;