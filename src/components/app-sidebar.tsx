"use client"

import * as React from "react"
import {useEffect} from "react"

import {SearchForm} from "@/src/components/search-form"
import {VersionSwitcher} from "@/src/components/version-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/src/components/ui/sidebar"
import {usePathname} from "next/navigation";
import Link from "next/link";
import {useChatStore} from "@/src/store/chat.store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/src/components/ui/dropdown-menu";
import {Edit, MoreHorizontalIcon, Trash2} from "lucide-react";
import {useIsMobile} from "@/src/hooks/use-mobile";

const versions = ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"]

const navMain =
  {
    title: "Getting Started",
    url: "/guides",
    items: [
      {
        title: "Installation",
        url: "#",
      },
    ],
  }

export function AppSidebar({...props}: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const activePathname = pathname.split("/").pop();
  const chatHistory = useChatStore((state) => state.chatHistory);
  const getChatHistory = useChatStore((state) => state.getChatHistory)
  const isMobile = useIsMobile()

  useEffect(() => {
    getChatHistory("")
  }, []);

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <VersionSwitcher
          versions={versions}
          defaultVersion={versions[0]}
        />
        <SearchForm/>
      </SidebarHeader>
      <SidebarContent>
        {/* Guides about how to use AIZOKU app */}
        <SidebarGroup>
          <SidebarGroupLabel>{navMain.title}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {
                navMain.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={item.url === activePathname}>
                      <Link href={navMain.url + item.url}>{item.title}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))
              }
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* We create a SidebarGroup for each history. */}
        <SidebarGroup>
          <SidebarGroupLabel>History</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {chatHistory && chatHistory.length > 0 && chatHistory.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton asChild isActive={item.id === activePathname}>
                    <Link href={`/app/(chat)/chat/${item.id}`}
                          className={"overflow-ellipsis"}>{item.title}</Link>
                  </SidebarMenuButton>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <SidebarMenuAction
                        showOnHover
                        className="rounded-sm data-[state=open]:bg-accent"
                      >
                        <MoreHorizontalIcon/>
                        <span className="sr-only">More</span>
                      </SidebarMenuAction>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className="w-24 rounded-lg"
                      side={isMobile ? "bottom" : "right"}
                      align={isMobile ? "end" : "start"}
                    >
                      <DropdownMenuItem>
                        <Edit/>
                        <span>Change title</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Trash2/>
                        <span>Delete</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail/>
    </Sidebar>
  )
}
