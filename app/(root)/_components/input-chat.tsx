import React from 'react';
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import {CornerDownLeft, Paperclip} from "lucide-react";

const InputChat = () => {
  return (
    <form className={"w-5/6 mx-auto"}>
      <Textarea placeholder={"Ask something"} className={"resize-none h-32"}/>
      <div className={"flex items-center justify-between py-4 px-2"}>
        <Button variant={"ghost"}><Paperclip/></Button>
        <Button>Send Message <CornerDownLeft/> </Button>
      </div>
    </form>
  );
};

export default InputChat;
