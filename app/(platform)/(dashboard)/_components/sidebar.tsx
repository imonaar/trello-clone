"use client"

import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useOrganization, useOrganizationList } from "@clerk/nextjs";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useLocalStorage } from "usehooks-ts";
import SidebarNavItem, { Organization } from "./sidebar-nav-item";

interface SidebarProps {
  storageKey?: string;
}
//storage key is to keep track of which accordion is open

export function OrganizationSidebar(
  { storageKey = "t-sidebar-state" }: SidebarProps
) {
  const [expanded, setExpanded] = useLocalStorage<Record<string, any>>(storageKey, {})
  const { organization: activeOrganization, isLoaded: isLoadedOrg } = useOrganization()
  //get the current active organization
  const { userMemberships, isLoaded: isLoadedOrgList } = useOrganizationList({
    userMemberships: {
      infinite: true
    }
  }) // this gives u the logged in member's organizations etc

  const defaultAccordionValue: string[] = Object.keys(expanded)
    .reduce((acc: string[], key: string) => {
      if (expanded[key]) {
        acc.push(key)
      }
      return acc;
    }, [])

  const onExpand = (id: string) => {
    setExpanded(curr => ({
      ...curr,
      [id]: !expanded[id]
    }))
  }

  if (!isLoadedOrg || !isLoadedOrgList! || userMemberships.isLoading) {
    return <Skeleton />
  }

  return (
    <>
      <div className="font-medium text-sm flex items-center justify-between mb-1">
        <span className="pl-4">
          Workspaces
        </span>
        <Button
          asChild
          type="button"
          variant="ghost"
          size="icon"
        >
          <Link href="/select-org">
            <Plus className="h-4 w-4" />
          </Link>
        </Button>
      </div>

      <Accordion
        type="multiple"
        defaultValue={defaultAccordionValue}
        className="space-y-2 "
      >

        {
          userMemberships.data.map(({ organization }) => (
            <SidebarNavItem
              key={organization.id}
              isActive={activeOrganization?.id === organization.id}
              isExpanded={expanded[organization.id]}
              onExpand={onExpand}
              organization={organization as Organization}
            />
          ))
        }

      </Accordion>

    </>
  )
}
