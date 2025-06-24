import { Button } from '@/components/ui/button'
import { SignedIn, SignOutButton, SignedOut } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'
import FlareAI from '@/components/ui/FlareAI'

const Homepage = () => {
  return (
    <div className="flex flex-col min-h-screen text-foreground overflow-hidden">
      <section className="relative z-10 py-24 flex-grow">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative">
            {/* CORNER DECORATION */}
            <div className="absolute -top-10 left-0 w-40 h-40 border-l-2 border-t-2" />

            {/* LEFT SIDE CONTENT */}
            <div className="top-0 left-5 lg:col-span-7 space-y-8 relative">
              <h1 className="text-5xl md:text-6xl lg:text-7xl tracking-tight">
                <div>
                  <span className="text-white">Specialized</span>
                </div>
                <div className="pt-5">
                  <span className="text-white">Artificial </span>
                  <span className="text-red-900">Intelligence</span>
                </div>
                <div className="pt-5">
                  <span className="text-amber-700">Student Assistance</span>
                </div>
              </h1>

              {/* SEPARATOR LINE */}
              <div className="h-px w-full bg-gradient-to-r from-primary via-secondary to-primary opacity-50"></div>

              <p className="text-xl text-muted-foreground w-2/3">
                Talk to Flareprep's virtual assistant and flare up your academic journey with
                our personalized study plans and resources designed just for you.
              </p>

              {/* STATS */}
              <div className="flex items-center gap-10 py-6 font-mono">
                <div className="flex flex-col">
                  <div className="text-2xl text-white">500+</div>
                  <div className="text-xs uppercase tracking-wider">ACTIVE USERS</div>
                </div>
                <div className="h-12 w-px bg-gradient-to-b from-transparent via-border to-transparent"></div>
                <div className="flex flex-col">
                  <div className="text-2xl text-white">3min</div>
                  <div className="text-xs uppercase tracking-wider">GENERATION</div>
                </div>
                <div className="h-12 w-px bg-gradient-to-b from-transparent via-border to-transparent"></div>
                <div className="flex flex-col">
                  <div className="text-2xl text-white">100%</div>
                  <div className="text-xs uppercase tracking-wider">PERSONALIZED</div>
                </div>
              </div>

              {/* BUTTONS */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Button
                  size="lg"
                  asChild
                  className="overflow-hidden bg-red-900 text-primary-foreground px-8 py-6 text-lg font-medium"
                >
                  <Link href="/assistance" className="flex items-center font-mono">
                    Get Started
                  </Link>
                </Button>
                <Button
                  size="lg"
                  asChild
                  className="overflow-hidden bg-amber-500 text-white px-8 py-6 text-lg font-medium"
                >
                  <Link href="https://forms.gle/bSuPAL1psKQ6tKdK8" target="_blank" className="flex items-center font-mono">
                    Register
                  </Link>
                </Button>
              </div>
            </div>

            {/* RIGHT SIDE CONTENT */}
            <div className="lg:col-span-5 relative"> 
              {/* IMAGE CONTAINER */}
              <div className="relative aspect-square max-w-lg mx-auto">
                <div className="relative overflow-hidden rounded-lg bg-cyber-black">
                  <img
                    src="/FlareAI.png"
                    alt="Flare AI Assistant"
                    className=" rounded-full size-full object-cover object-center"
                    style={{ width: '80%', height: 'auto' }}
                  />
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Homepage
