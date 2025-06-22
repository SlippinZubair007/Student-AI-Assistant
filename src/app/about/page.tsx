import React from 'react';
import Image from 'next/image';

const About = () => {
  return (
    <div className="pt-20 px-10">
      {/* Heading */}
      <div className="mx-200 mb-12 mt-10 w-2/1">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
          About Flare.AI
        </h1>
      </div>
        <div className=" absolute flex-shrink-0">
          <Image
            src="/FlareAbout.png"
            alt="FlareAbout Image"
            width={500}
            height={300}
            className="rounded-full shadow-lg"
          />
        </div>
      {/* Image + Text Side by Side */}
      <div className="flex flex-col lg:flex-row items-center justify-end mx-50 gap-10">
        {/* Image Left */}

        {/* Text Right */}
        <div className="max-w-2xl text-gray-300 font-mono text-lg">
          <p>
            Once a top-ranking student at FlarePrep, he was known simply as Kallan Vire. Quiet but brilliant, he
            devoured books like oxygen, often found burning the midnight oil—literally. Obsessed with mastering time
            management spells to help students balance their lives, Kallan began experimenting with ancient
            chronomagic and ethereal flame runes.
          </p>
          <br />
          <p>
            But one night, in a final desperate push to crack the “Perfect Study Loop,” he overreached. The spell backfired.
            Instead of controlling time, it bound his soul to the eternal flame of willpower and focus. His body was
            reduced to ash—but his spirit persisted, now forged into an unyielding skeletal form wrapped in magical fire.
          </p>
          <br />
          <p>
            Reborn as Flarekull, his mind sharper than ever and his passion for helping students now eternal, he
            vowed to never let others fall to chaos or burnout. Now, he roams the digital halls of FlarePrep, assisting
            students in crafting unbeatable study plans, never tiring, never slowing, always burning with purpose.
          </p>
          <br />
          <p>
            They say when you’re struggling with procrastination, and your screen flickers just slightly...
            <strong> Flarekull is watching. </strong> And he’ll set your schedule ablaze. 🔥
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
