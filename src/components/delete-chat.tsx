import React, {useState} from 'react';
import {Trash2} from "lucide-react";
import {Button} from "@/src/components/ui/button";
import {Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter} from "@/src/components/ui/dialog";
import {useChatStore} from "@/src/store/chat.store";

function DeleteChat() {
  const [open, setOpen] = useState(false)
  const deleteChat = useChatStore((state) => state.deleteChat)

  return (
    <Dialog open={open} onOpenChange={(value) => setOpen(value)}>
      <DialogTrigger asChild>
        <Button type={"button"} variant={"ghost"} className={"flex items-center gap-2 w-full justify-start"}>
          <Trash2/>
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Do you really want to remove this chat ?</DialogTitle>
          <DialogDescription>This action cannot be reversed.</DialogDescription>
        </DialogHeader>
        <DialogFooter >
          <Button variant={"destructive"} onClick={async (e) => {
            e.preventDefault()
            await deleteChat()
            setOpen(false)
          }}>Delete</Button>
          <Button variant={"secondary"} onClick={() => setOpen(false)}>Cancel</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteChat;