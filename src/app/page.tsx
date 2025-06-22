import { Button } from '@/components/ui/button'
import { SignedIn, SignOutButton, SignedOut } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'
import FlareAI from '@/components/ui/FlareAI'


const Homepage = () => {
  return (
    <>

          <div className=" absolute flex justify-end gap-4 right-6 top-4 z-50">
        <Button className="border-orange-600 border text-black bg-amber-500 p-2 rounded-md hover:bg-amber-600 hover:text-white transition-colors duration-300">
          <Link href="/sign-up">Sign Up</Link>
        </Button>

        <SignedOut>
          <Button className="border-orange-600 border text-black bg-amber-500 p-2 rounded-md hover:bg-amber-600 hover:text-white transition-colors duration-300">
            <Link href="/sign-in">Sign In</Link>
          </Button>
        </SignedOut>

        <SignedIn>
          <SignOutButton />
        </SignedIn>
      </div>

      
    
    <FlareAI />

    {/*Right Side Content*/}

     <div className="absolute top-25 left-5 w-40 h-50 border-l-2 border-t-2 border-gray-600" />

    
     <div className="relative mt-35 left-20 space-y-8">
        <h1 className="text-5xl md:text-6xl lg:text-7xl tracking-tight">
        <div>
          <span className="text-white">Specialized</span>
          <div className="pt-5">
          <span className="text-white">Artificial </span>
          <span className="text-red-900">Intelligence</span>
          </div>
          <div className="pt-5">
          <span className="text-amber-700">Student Assistance</span>
          </div>
      </div>
      </h1>
     </div>

     <div className=" mx-10 mt-10 h-1 w-200 bg-gradient-to-r from-primary via-secondary to-primary opacity-50"/>
              <p className="mx-19 pt-7 text-xl text-muted-foreground w-2/5">
                Talk to Flareprep's virtual assistant and flare up your academic journey with
                our personalized study plans and resources
                designed just for you.
              </p>

            {/* STATS */}
              <div className="flex items-center gap-10 py-10 px-25 font-mono">
                <div className="flex flex-col">
                  <div className="text-2xl text-white">500+</div>
                  <div className="text-xs uppercase tracking-wider">ACTIVE USERS</div>
                </div>
                <div className="h-12 w-px bg-gradient-to-b from-traxnsparent via-border to-transparent"></div>
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

               {/* Bottom Buttons */}
               <div className="flex gap-5 mx-35 pt-8">
               <Button className="bg-red-900 p-5">
                <Link href="/assistance">Get Started</Link>
               </Button>

               <Button className="bg-amber-500 p-5">
                <Link href="https://forms.gle/bSuPAL1psKQ6tKdK8">Register</Link>
               </Button>
               </div>

               

      </>
  )
}

export default Homepage
