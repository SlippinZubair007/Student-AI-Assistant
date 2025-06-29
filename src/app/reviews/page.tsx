"use client";
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import Image from "next/image";

const StudentReviewsCarousel = () => {
  const reviews = [
    {
    id: 11,
    name: "Danish",
    course: "O Levels",
    rating: 5,
    review: "Flare Prep Coaching Academy has been a game-changer for my child! Supportive teacher and personalized attention have helped them excel.",
    imageSrc: "/AhmadF.jpg",
    year: "2025",
  },
  {
    id: 12,
    name: "Ahmad Danish",
    course: "O Levels",
    rating: 5,
    review: `
     it has been an amazing experience with sir zubair and they provide excellent coaching and the stuff they provide is very knowledgeable and supportive.
     sir zubair is well experienced teacher.
     this coaching helped me to build my confidence and overcome my weaknesses.`,
    imageSrc: "/Ahmad.jpg",
    year: "2025",
  },
  
  {
    id: 13,
    name: "Ayan Umer",
    course: "O Levels",
    rating: 5,
    review: `I've been taking sessions from flareprep for a while now
     and I'm genuinely impressed.
     online learning was something I was totally new to and not sure what to expect at first but sir zubair had made everything so engaging and worthwhile and what really stands out for me is how effortless he makes learning feel`,
    imageSrc: "/Ayan.jpg",
    year: "2025",
  },
  {
    id: 14,
    name: "Ali Tariq",
    course: "O Levels & A Levels",
    rating: 5,
    review: "Sir Zubair had worked incredibly hard and spent his day and night trying to help those students.Just before CAIES he held query session that surely helped us gain those core concepts which we were not too sure about.He is the one who would be an assist to all your hardwork on the path to get an A*.",
    imageSrc: "/Ali.jpg",
    year: "2025",
  },
  {
    id: 5,
    name: "Muzzamil Shahjahan",
    course: "O Levels",
    rating: 5,
    review: "I am the mother of Muzzamil and I am very satisfied with the teaching style and personal attention given to students. It has helped build both confidence and interest in the subjects. Highly recommend for focused academic support",
    imageSrc: "/Muzzamil.jpg",
    year: "2025",
  },
  {
    id: 7,
    name: "Fahad Nasim",
    course: "A Levels",
    rating: 5,
    review: "I am Fahad from A levels. I shifted from business to sciences and was very worried that i might fail as i did not know the very basics. But then a miracle happened and cousin told me about sir Zubair. He is very friendly and teaches everything so well so you dont have any problem at all.",
    imageSrc: "/Fahad.jpg",
    year: "2025",
  },
  {
    id: 1,
    name: "Haseeb",
    course: "O Levels",
    rating: 5,
    review: "Sir Zubair has been an incredible mentor throughout my O levels & A Levels journey. His personalized guidance and support helped me excel in my studies and get A* in Computer Science just three months!",
    avatar: "HS",
    year: "2024",
  },
  {
    id: 2,
    name: "Safwaan Naveed",
    course: "O Levels",
    rating: 5,
    review: "My studies are going really well with sir Zubair as he explains each and every topic with great detail. I am now very confident to attempt my CAIE exams",
    imageSrc: "/safwaan.jpg",
    year: "2025",
  },
  {
    id: 3,
    name: "Zara Ahmad",
    course: "O Levels & AS Levels",
    rating: 5,
    review: "Amazing learning experience! Miss Amna goes above and beyond to ensure her students understand the concepts thoroughly. Her teaching style is engaging and effective, making even the most challenging topics easy to grasp.",
    avatar: "ZA",
    year: "2024",
  },
  {
    id: 4,
    name: "Hadi Sheikh",
    course: "O Levels",
    rating: 5,
    review: "FlarePrep has been a game changer in my academic life. Sir Zubair truly goes out of his way to help students, whether it's academic support, career counselling, or skill development, he's always there to guide us. flareprep isn't just an academy it’s a supportive learning community.",
    avatar: "HS",
    year: "2025",
  },
  {
    id: 6,
    name: "Eman Qaiser",
    course: "O Levels & AS Levels",
    rating: 5,
    review: "Sir Zubair is truly amazing and an inspiration to all of us. Not only is he an excellent educator,but he is also a great mentor who genuinly understands our challenges. He always guides us with the best solutions and supports us every step of the way. I feel incredibly grateful to have him as my teacher.",
    avatar: "EQ",
    year: "2024",
  },
  {
    id: 8,
    name: "Subaina",
    course: "A Levels",
    rating: 5,
    review: "I was very skeptical about online sessions at first but Miss Amna has made it so easy and fun to learn. She is very patient and explains everything in detail. I have seen a significant improvement in my grades since I started attending her classes. Highly recommend!",
    avatar: "S",
    year: "2025",
  },
  {
    id: 9,
    name: "Tayyaba Abbas",
    course: "O Levels & A Levels",
    rating: 5,
    review: "Sir Zubair is highly professional in educating students, showing them the simplest pathway to acheive their grades. His lessons are are well structured,explaining the tips and tricks for challenges we face in our exams.His ability to connect with students is what makes every class enjoyable and meaningful.",
    avatar: "TA",
    year: "2025",
  },
  {
    id: 10,
    name: "Manal",
    course: "O Levels",
    rating: 5,
    review: "My daughter joined the classes late, but the teacher's effective planning and clear explanations helped her catch up quickly. The syllabus was covered thoroughly in a short span. I'm very satisfied with the overall experience.",
    avatar: "M",
    year: "2025",
  },
];


  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);

  useEffect(() => {
    if (!isAutoplay) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isAutoplay, reviews.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const getSlidePosition = (index: number) => {
    const diff = index - currentIndex;
    if (diff === 0) return "translate-x-0 scale-100 z-20 opacity-100";
    if (diff === 1 || diff === -(reviews.length - 1))
      return "translate-x-[85%] scale-75 z-10 opacity-60";
    if (diff === -1 || diff === reviews.length - 1)
      return "translate-x-[-85%] scale-75 z-10 opacity-60";
    return "translate-x-[200%] scale-50 z-0 opacity-0";
  };

  return (
    <div className="min-h-screen text-white py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-red-700 via-red-700 to-red-700 bg-clip-text text-transparent mb-6 tracking-tight">
            Student Success Stories
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Discover how flareprep have transformed careers and lives
          </p>
        </div>

        {/* Carousel */}
        <div className="relative h-[500px] mb-12">
          <div className="relative w-full h-full flex items-center justify-center">
            {reviews.map((review, index) => (
              <div
                key={review.id}
                className={`absolute w-[400px] h-[450px] transition-all duration-700 ease-in-out transform ${getSlidePosition(index)}`}
                style={{
                  filter: index === currentIndex ? "none" : "blur(1px)",
                }}
              >
                <div className="bg-gradient-to-br from-red-900/30 to-black/40 backdrop-blur-xl border border-red-800 rounded-2xl p-8 h-full shadow-2xl hover:shadow-red-500/30 transition-all duration-300">
                  <div className="flex justify-center mb-6">
                    <Quote className="w-8 h-8 text-red-400" />
                  </div>
                  <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-red-600 to-red-800 flex items-center justify-center text-white font-bold text-lg shadow-md shadow-red-500/30">
                      {review.imageSrc ? (
                        <Image
                          src={review.imageSrc}
                          alt={review.name}
                          width={64}
                          height={64}
                          className="rounded-full object-cover"
                        />
                      ) : (
                        review.avatar
                      )}
                    </div>
                  </div>
                  <div className="flex justify-center mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                  <p className="text-gray-300 text-center mb-6 leading-relaxed text-sm italic">
                    {review.review}
                  </p>
                  <div className="text-center">
                    <h3 className="text-xl font-semibold text-white mb-1">
                      {review.name}
                    </h3>
                    <p className="text-red-400 text-sm mb-1">
                      {review.course}
                    </p>
                    <p className="text-gray-500 text-xs">
                      Graduate {review.year}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Arrows */}
          <button
            onClick={prevSlide}
            onMouseEnter={() => setIsAutoplay(false)}
            onMouseLeave={() => setIsAutoplay(true)}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-30 bg-black/40 hover:bg-red-800/40 border border-red-600 rounded-full p-3 transition-all duration-300 hover:scale-110 shadow-md hover:shadow-red-600/40"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>

          <button
            onClick={nextSlide}
            onMouseEnter={() => setIsAutoplay(false)}
            onMouseLeave={() => setIsAutoplay(true)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-30 bg-black/40 hover:bg-red-800/40 border border-red-600 rounded-full p-3 transition-all duration-300 hover:scale-110 shadow-md hover:shadow-red-600/40"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center space-x-3">
          {reviews.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-red-500 scale-125 shadow shadow-red-600"
                  : "bg-gray-600 hover:bg-gray-500"
              }`}
            />
          ))}
        </div>

        {/* Autoplay Toggle */}
        <div className="flex justify-center mt-8">
          <button
            onClick={() => setIsAutoplay(!isAutoplay)}
            className="text-gray-400 hover:text-white transition-colors duration-300 text-sm"
          >
            {isAutoplay ? "Pause" : "Play"} Autoplay
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentReviewsCarousel;
