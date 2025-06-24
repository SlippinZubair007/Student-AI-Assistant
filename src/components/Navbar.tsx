'use client'

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/navigation-menu'
import { Button } from '@/components/ui/button'
import { UserButton, useUser } from '@clerk/nextjs'


const Navbar = () => {
  const {isSignedIn}=useUser()
  return (
    <header className="sticky top-0 left-0 w-full z-50 bg-[#0f0f0f]/80 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto flex flex-wrap items-center justify-between">

        {/* Brand / Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/flare.png"
            alt="Flare Prep"
            width={50}
            height={50}
            className="w-auto h-auto object-contain"
            priority
          />
          <span className="text-xl font-bold text-amber-500">Flare.</span>
          <span className="text-xl font-bold text-white">AI</span>
        </Link>

        {isSignedIn ? (
          <>
      <div className="flex items-center gap-6">
   {/* Menu */}
        <NavigationMenu>
          <NavigationMenuList className="flex flex-wrap gap-3 md:gap-6 mt-4 md:mt-0 text-sm md:text-base text-white">
            {[
              { href: '/', label: 'Home' },
              { href: '/about', label: 'About' },
              { href: '/sign-up', label: 'Assistance' },
              { href: '/pricing', label: 'Planner' },
              { href: '/team', label: 'Problem Log' },
              { href: '/contact', label: 'Contact' },
            ].map(({ href, label }) => (
              <NavigationMenuItem key={href}>
                <NavigationMenuLink asChild>
                  <Link
                    href={href}
                    className="px-3 py-1 rounded hover:text-black hover:bg-amber-500 transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
        <UserButton />
       </div>
          </>
        ):(

      <div className="flex flex-wrap justify-end gap-4 right-6 top-4 z-50">
        <Button className="border-orange-600 border text-black bg-amber-500 p-2 rounded-md hover:bg-amber-600 hover:text-white transition-colors duration-300">
          <Link href="/sign-up">Sign Up</Link>
        </Button>

          <Button className="border-orange-600 border text-black bg-amber-500 p-2 rounded-md hover:bg-amber-600 hover:text-white transition-colors duration-300">
            <Link href="/sign-in">Sign In</Link>
          </Button>
      </div>
        )}

      </div>
    </header>
  )
}

export default Navbar
