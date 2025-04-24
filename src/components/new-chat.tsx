import React from 'react';
import {Button} from "@/src/components/ui/button";
import {MessageSquareMore} from "lucide-react";

function NewChat() {
  return (
    <Button>
      New Chat
      <MessageSquareMore className={"size-4"}/>
    </Button>
  );
}

export default NewChat;