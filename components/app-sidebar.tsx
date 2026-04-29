'use client';

import { Briefcase, ChevronRight, IdCard, BookOpen } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { companies } from '@/content/companies';

import type { Route } from 'next';

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="flex h-11 flex-row items-center justify-between gap-2 border-b px-2">
        <div className="text-lg font-semibold whitespace-nowrap group-data-[collapsible=icon]:hidden">Portfolio</div>
        <SidebarTrigger className="cursor-pointer" />
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={pathname === '/'}
                  render={
                    <Link href="/my-info/about">
                      <IdCard />
                      <span>About</span>
                    </Link>
                  }
                />
              </SidebarMenuItem>
            </SidebarMenu>

            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  render={
                    <Link href="/my-info/introduce">
                      <BookOpen />
                      <span>Introduce</span>
                    </Link>
                  }
                />
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Work</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {companies.map((company) => {
                const isInCompany = pathname.startsWith(`/work/${company.slug}`);

                return (
                  <Collapsible key={`${company.slug}-${isInCompany}`} defaultOpen={isInCompany} className="group/collapsible">
                    <SidebarMenuItem>
                      <CollapsibleTrigger
                        render={
                          <SidebarMenuButton>
                            <Briefcase />
                            <span>{company.name}</span>
                            <ChevronRight className="ml-auto transition-transform group-data-open/collapsible:rotate-90" />
                          </SidebarMenuButton>
                        }
                      />
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {company.projects.map((project) => {
                            const href = `/work/${company.slug}/${project.slug}` as Route;
                            return (
                              <SidebarMenuSubItem key={project.slug}>
                                <SidebarMenuSubButton isActive={pathname === href} render={<Link href={href}>{project.name}</Link>} />
                              </SidebarMenuSubItem>
                            );
                          })}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <div className="px-2 py-1.5 text-xs text-muted-foreground">© 2026 JunyoungLee</div>
      </SidebarFooter>
    </Sidebar>
  );
}
