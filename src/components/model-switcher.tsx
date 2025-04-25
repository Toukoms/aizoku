"use client"

import * as React from "react"
import {Check, ChevronsUpDown, GalleryVerticalEnd} from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu"
import {SidebarMenu, SidebarMenuButton, SidebarMenuItem,} from "@/src/components/ui/sidebar"
import {useEffect, useState} from "react";
import {useChatStore} from "@/src/store/chat.store";

export function ModelSwitcher() {
  const [models, setModels] = useState<string[]>([])
  const getModels = useChatStore((state) => state.getModels)
  const model = useChatStore((state) => state.model)
  const setModel = useChatStore((state) => state.setModel)

  useEffect(() => {
    getModels().then(m => {
      if (m && m.length > 0) {
        setModels(m)
        setModel(m[0])
      }
    })
  }, [getModels, setModels]);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div
                className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <GalleryVerticalEnd className="size-4"/>
              </div>
              <div className="flex flex-col gap-0.5 leading-none">
                <span className="font-semibold">Models</span>
                <span className="">{model}</span>
              </div>
              <ChevronsUpDown className="ml-auto"/>
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width]"
            align="start"
          >
            {models && models.map((m) => (
              <DropdownMenuItem
                key={m}
                onSelect={() => setModel(m)}
              >
                {m}{" "}
                {m === model && <Check className="ml-auto"/>}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
