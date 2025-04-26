"use client"
import React, {useEffect, useState} from 'react';
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/src/components/ui/dialog";
import {Button} from "@/src/components/ui/button";
import {Label} from "@/src/components/ui/label";
import {Input} from "@/src/components/ui/input";
import {Edit, Loader2} from "lucide-react";
import {useChatStore} from "@/src/store/chat.store";

function EditChat({chatId}:{chatId:string}) {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [open, setOpen] = useState(false)
  const getChat = useChatStore((state) => state.getChat)
  const renameChat = useChatStore((state) => state.renameChat)

  useEffect(() =>{
    getChat(chatId).then(chat => {
      if (chat) {
        setTitle(chat.title)
      }
    })
  }, [getChat, setTitle, chatId])

  return (
    <Dialog open={open} onOpenChange={(value) => setOpen(value)}>
      <DialogTrigger asChild>
        <Button type={"button"} variant={"ghost"} className={"flex items-center gap-2 w-full justify-start"}>
          <Edit/>
          Change title
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Change Chat Title</DialogTitle>
          <DialogDescription>
            Edit the title of your chat.
          </DialogDescription>
        </DialogHeader>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Title
            </Label>
            <Input id="name" value={title} onChange={(e) => setTitle(e.target.value)} className="col-span-3" />
          </div>
        <DialogFooter>
          <Button type="button" onClick={async (e) => {
            e.preventDefault()
            setLoading(true)
            const chat = await getChat(chatId);
            if (!chat) {
              setLoading(false)
              return
            }
            if (chat.title !== title) {
              await renameChat(chatId,title)
            }
            setLoading(false)
            setOpen(false)
          }} disabled={loading}>
            {
              loading
                ? (
                  <div className={"flex items-center gap-2"}>
                    <Loader2/>
                    Saving...
                  </div>
                )
                : "Save"
            }
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default EditChat;
