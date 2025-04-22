"use client"

import * as React from "react"
import {useEffect, useState} from "react"

import {SearchForm} from "@/components/search-form"
import {VersionSwitcher} from "@/components/version-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import {usePathname} from "next/navigation";
import Link from "next/link";
import {getChatHistory} from "@/actions/chat.action";
import type {Chat} from "@/src/generated/prisma/client"

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
  const [chatHistory, setChatHistory] = useState<Chat[] | null>(null)

  useEffect(() => {
    getChatHistory().then((value) => {
      if (value) {
        setChatHistory(value)
      }
    })
  }, [])

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
                <SidebarMenuItem key={item.title || item.id}>
                  <SidebarMenuButton asChild isActive={item.id === activePathname}>
                    <Link href={`/chat/${item.id}`}>{item.title}</Link>
                  </SidebarMenuButton>
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
