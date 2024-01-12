"use client"

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

import { useMobileSidebar } from '@/hooks/use-mobile-sidebar'
import { Button } from '@/components/ui/button'
import { Menu } from 'lucide-react'
import { Sheet, SheetContent } from '@/components/ui/sheet'
import { OrganizationSidebar } from './sidebar'

export default function MobileSidebar() {
    const pathname = usePathname()
    const [isMounted, setIsMounted] = useState(false)

    const onOpen = useMobileSidebar(state => state.onOpen)
    const onClose = useMobileSidebar(state => state.onClose)
    const isOpen = useMobileSidebar(state => state.isOpen)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    useEffect(() => {
        onClose()
    }, [pathname, onClose])

    if (!isMounted) {
        return null
    }

    return (
        <>
            <Button
                onClick={onOpen}
                className='block md:hidden mr-2'
                variant="ghost"
            >
                <Menu className='block w-4 h-4' />
            </Button>

            <Sheet open={isOpen} onOpenChange={onClose}>
                <SheetContent side={'left'} className='p-2 pt-10'> 
                    <OrganizationSidebar
                        storageKey='t-sidebar-mobile-state'
                    />
                </SheetContent>
            </Sheet>
        </>
    )
}
