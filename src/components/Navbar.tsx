'use client'
import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/navigation-menu'

const Navbar = () => {
  return (
    <nav className="absolute top-0 left-0 w-full z-50  bg-[#0f0f0f]/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center text-white">

        {/* Logo / Brand */}
        <Link href="/" >
        <div className="fixed flex top-4 left-8">
                <Image
                src="/flare.png"
                alt="Flare Prep"
                width={60}
                height={60}
                className="w-full h-auto object-contain"
                priority
                />
                 </div>
                 <div className="fixed flex left-30 top-8">
                <span className="text-xl font-bold text-amber-500">Flare.</span>
                <span className="text-xl font-bold text-white">AI</span>
          </div>
         
        </Link>


        {/* Navigation Menu */}
        <NavigationMenu>
          <NavigationMenuList className="flex space-x-6">
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/" className="hover:text-black transition hover:bg-amber-500">Home</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/about" className="hover:text-black transition hover:bg-amber-500">About</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/sign-up" className="hover:text-black transition hover:bg-amber-500">Assistance</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/pricing" className="hover:text-black transition hover:bg-amber-500">Planner</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/team" className="hover:text-black transition hover:bg-amber-500">Problem Log</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/contact" className="hover:text-black transition hover:bg-amber-500">Contact</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </nav>
  )
}

export default Navbar
