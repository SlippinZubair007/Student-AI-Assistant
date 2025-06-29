import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image' // ✅ Import Next.js Image

const Homepage = () => {
  return (
    <div className="flex flex-col min-h-screen text-foreground overflow-hidden">
      <section className="relative z-10 py-24 flex-grow">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative">
            <div className="absolute border-white -top-10 left-0 w-40 h-40 border-l-2 border-t-2" />

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
                  <span className="text-amber-500">Student Assistance</span>
                </div>
              </h1>

              <div className="h-px w-full bg-gradient-to-r from-primary via-secondary to-primary opacity-50"></div>

              {/* ✅ FIXED `'` */}
              <p className="text-xl text-gray-400 w-2/3">
                Talk to Flareprep&apos;s virtual assistant and flare up your academic journey with
                our personalized study plans and resources designed just for you.
              </p>

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

              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Button
                  size="lg"
                  asChild
                  className="text-white overflow-hidden bg-red-900  px-8 py-6 text-lg font-medium"
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

            {/* RIGHT SIDE IMAGE - ✅ REPLACED <img> with <Image> */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-square max-w-lg mx-auto">
                <div className="relative overflow-hidden rounded-lg bg-cyber-black">
                  <Image
                    src="/robo.png"
                    alt="Flare AI Assistant"
                    width={400}
                    height={400}
                    className="rounded-full object-cover object-center"
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
