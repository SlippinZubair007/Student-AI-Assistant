"use client";

import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";

const Plannerpage = () => {
  const [bookmarkedDates, setBookmarkedDates] = useState<Date[]>([]);
  const [date, setDate] = React.useState<Date | undefined>(new Date());


  const toggleBookmark = (date: Date | undefined) => {
  if (!date) return;

  const isBookmarked = bookmarkedDates.some(
    (d) => d.toDateString() === date.toDateString()
  );

  if (isBookmarked) {
    setBookmarkedDates((prev) =>
      prev.filter((d) => d.toDateString() !== date.toDateString())
    );
  } else {
    setBookmarkedDates((prev) => [...prev, date]);
  }
};

  return (
    <div className="flex flex-wrap h-full w-full flex-col bg-black">
      <div className="flex flex-row flex-wrap justify-center gap-50 pt-20 pb-100">
        {/* Left Calendar */}
        <div className="flex flex-col items-center gap-4">
          <span className="font-mono font-bold text-3xl">Present</span>
      
        <div className="rounded-xl shadow-lg bg-zinc-900 text-white p-4 transition-all duration-300 hover:shadow-2xl">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-lg [&_button:hover]:bg-amber-500 [&_button:hover]:text-white"
          />
        </div>
    </div>

        {/* Right Calendar */}
         <div className="flex flex-col items-center gap-4">
          <span className="font-mono font-bold text-red-700 text-3xl">Target</span>
        <div className="rounded-xl shadow-lg bg-zinc-900 text-white p-4 transition-all duration-300 hover:shadow-2xl">
          <Calendar
            mode="single"
            selected={date}
              onSelect={(d) => {
              setDate(d);
             toggleBookmark(d);
             }}
             modifiers={{
            bookmarked: bookmarkedDates,
            }}
           modifiersClassNames={{
           bookmarked: "bg-yellow-400 text-black font-bold",
  }}
            className="rounded-lg [&_button:hover]:bg-amber-500 [&_button:hover]:text-white"
          />
        </div>
        </div>
      </div>
    </div>
  );
};

export default Plannerpage;
