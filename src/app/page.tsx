"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import { Card, CardContent } from "@/components/ui/card";
import StudentReviewsCarousel from "./reviews/page";


const carouselItems = [
  {
    icon: "1.png",
  },
  {
    icon: "2.png",
  },
  {
    icon: "3.png",
  },
  {
    icon: "4.png",
  },
  {
    icon: "5.png",
  },
];


const page = () => {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <section className="relative z-10 py-5 flex-grow">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative">
            {/* Left Column */}
            <div className="top-0 left-5 lg:col-span-7 space-y-8 relative">
              <h1 className="font-sans text-3xl md:text-5xl lg:text-5xl tracking-tight text-amber-600">
                <span className="text-gray-300">Igniting</span>
                <span className="font-semibold"> Change</span>
              </h1>
              <h1 className="font-sans text-3xl md:text-5xl lg:text-5xl tracking-tight text-amber-600">
                <span className="text-gray-300">Empowering</span>
                <span className="font-semibold"> Minds</span>
              </h1>
              <h1 className="font-sans text-3xl md:text-5xl lg:text-5xl tracking-tight text-amber-600">
                <span className="text-gray-300">Making Education </span>
                <span className="font-semibold">Affordable</span>
              </h1>

              <p className="text-gray-300 text-lg md:text-xl lg:text-md mt-5">
                At FlarePrep, we believe education doesn’t end at the classroom
                door. We offer personalized support, extended learning, and real
                care — even on holidays — because every student deserves a chance
                to grow, no matter the day or their background. With us, no one is
                left behind. Just learning that lights the way.
              </p>

              <div className="flex flex-wrap gap-5">
                <Button className="bg-amber-500 p-6 hover:bg-red-900 text-black font-semibold rounded-lg">
                  <Link href="https://forms.gle/bSuPAL1psKQ6tKdK8">Register</Link>
                </Button>

                <Button className="bg-red-900 p-6 hover:bg-amber-500 text-white font-semibold rounded-lg">
                  <Link href="https://api.whatsapp.com/send?phone=03044767165">Book Demo</Link>
                </Button>
              </div>
            </div>

            {/* Right Column */}
            <div className="flex justify-end lg:col-span-5 p-10 relative">
              <Swiper
                loop={true}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
                modules={[Autoplay]}
                className="w-full max-w-sm"
              >
                {carouselItems.map((carouselItem, index) => (
                  <SwiperSlide key={index}>
                    <Card className="w-full h-full shadow-md">
                      <CardContent className="flex flex-col aspect-square items-center justify-center">
                         <img
          src={carouselItem.icon}
          className="w-full h-full"
        />
                      </CardContent>
                    </Card>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
        <div className="py-6">
        <StudentReviewsCarousel/>
        </div>
      </section>
    </div>
    
  );
};

export default page;
