'use client'

import React from 'react'
import { useTheme } from 'next-themes'
import { BiMoon, BiSun } from 'react-icons/bi'
import { MdOutlineComputer } from 'react-icons/md'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

const ThemeMenu = () => {
  const { theme, setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className='absolute right-[5vw] top-5 md:right-5'>
        <Button variant='outline' aria-label='Switch theme'>
          <BiSun className='inline-block text-lg dark:hidden' />
          <BiMoon className='hidden text-lg dark:inline-block' />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent side='top' align='end'>
        <DropdownMenuItem
          onClick={() => setTheme('light')}
          className={cn(theme === 'light' && 'bg-accent')}
        >
          <BiSun className='mr-2 h-4 w-4' />
          <span>Light</span>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => setTheme('dark')}
          className={cn(theme === 'dark' && 'bg-accent')}
        >
          <BiMoon className='mr-2 h-4 w-4' />
          <span>Dark</span>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => setTheme('system')}
          className={cn(theme === 'system' && 'bg-accent')}
        >
          <MdOutlineComputer className='mr-2 h-4 w-4' />
          <span>System</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ThemeMenu
