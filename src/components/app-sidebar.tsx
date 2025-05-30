"use client"

import * as React from "react"
import {useEffect} from "react"

import {SearchForm} from "@/src/components/search-form"
import {ModelSwitcher} from "@/src/components/model-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
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
import {ChevronUp, KeyRound, MoreHorizontalIcon, Settings, User2} from "lucide-react";
import {useIsMobile} from "@/src/hooks/use-mobile";
import {useAuthStore} from "@/src/store/auth.store";
import SignOut from "@/src/components/sign-out";
import EditChat from "@/src/components/edit-chat";
import DeleteChat from "@/src/components/delete-chat";

const navMain =
  {
    title: "Getting Started",
    url: "/guides",
    items: [
      {
        title: "Installation",
        url: "/installation",
      },
    ],
  }

export function AppSidebar({...props}: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const activePathname = pathname.split("/").pop();
  const chatHistory = useChatStore((state) => state.chatHistory);
  const getChatHistory = useChatStore((state) => state.getChatHistory)
  const isMobile = useIsMobile()
  const user = useAuthStore((state) => state.user)

  useEffect(() => {
    if (user) {
      getChatHistory()
    }
  }, [user, getChatHistory]);

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <ModelSwitcher/>
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
        {
          user && <SidebarGroup>
                <SidebarGroupLabel>History</SidebarGroupLabel>
                <SidebarGroupContent>
                  {
                    chatHistory
                      ? <SidebarMenu>
                        {chatHistory && chatHistory.length > 0 && chatHistory.map((item) => (
                          <SidebarMenuItem key={item.id}>
                            <SidebarMenuButton asChild isActive={item.id === activePathname}>
                              <Link href={`/chat/${item.id}`}>
                                <span className={"overflow-ellipsis w-48"}>{item.title}</span>
                              </Link>
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
                                <DropdownMenuItem asChild>
                                  <EditChat chatId={item.id} />
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                  <DeleteChat chatId={item.id}/>
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </SidebarMenuItem>
                        ))}
                      </SidebarMenu>
                      : <p>Loading...</p>
                  }
                </SidebarGroupContent>
            </SidebarGroup>
        }
      </SidebarContent>

      <SidebarFooter>
        {user
          ? (
            <SidebarMenu>
              <SidebarMenuItem>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuButton>
                      <User2/> {user.username}
                      <ChevronUp className="ml-auto"/>
                    </SidebarMenuButton>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    side="top"
                    align="end"
                    className="w-[--radix-popper-anchor-width]"
                  >
                    <DropdownMenuItem>
                      <Link href={"/user/setting"} className={"flex items-center gap-2"}>
                        <Settings/>
                        <span>Settings</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <SignOut/>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarMenuItem>
            </SidebarMenu>
          )
          : <SidebarMenu>
            <SidebarMenuItem>
              <Link href={"/auth"}
                    className={"flex items-center gap-2 p-4 hover:bg-accent rounded-md transition-colors duration-300"}>
                <KeyRound/>
                Login
              </Link>
            </SidebarMenuItem>
          </SidebarMenu>
        }
      </SidebarFooter>
      <SidebarRail/>
    </Sidebar>
  )
}
