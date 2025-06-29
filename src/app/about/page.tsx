"use client";

import React, { useState } from 'react';
import { 
  Flame, 
  Zap, 
  Target, 
  Users, 
  BookOpen, 
  Award, 
  Rocket, 
  Brain,
  Heart,
  TrendingUp,
  Star,
  ArrowRight,
  CheckCircle,
  Globe,
  Shield,
  Lightbulb
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

type TabKey = 'mission' | 'vision' | 'story';

const AboutPage = () => {
  const [activeTab, setActiveTab] = useState<TabKey>('mission');

  const stats = [
    { icon: Users, label: "Students Empowered", value: "500+", color: "from-red-500 to-rose-600" },
    { icon: BookOpen, label: "Learning Resources", value: "50+", color: "from-blue-500 to-cyan-600" },
    { icon: Award, label: "Success Stories", value: "500+", color: "from-green-500 to-emerald-600" },
    { icon: Globe, label: "Countries Reached", value: "5+", color: "from-purple-500 to-violet-600" }
  ];

  const values = [
    {
      icon: Flame,
      title: "Ignite Potential",
      description: "We believe every student has untapped potential waiting to be unleashed through the right guidance and resources.",
      color: "from-red-500 to-orange-500"
    },
    {
      icon: Shield,
      title: "Excellence First",
      description: "Our commitment to quality education and comprehensive preparation sets the foundation for student success.",
      color: "from-blue-500 to-indigo-500"
    },
    {
      icon: Heart,
      title: "Student-Centric",
      description: "Every decision we make is guided by what's best for our students' learning journey and future aspirations.",
      color: "from-pink-500 to-rose-500"
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "We continuously evolve our methods and resources to provide cutting-edge educational experiences.",
      color: "from-yellow-500 to-amber-500"
    }
  ];

  const milestones = [
    { year: "2023", title: "Foundation", description: "FlarePrep was born with a vision to make high quality education available for everyone" },
    { year: "2024", title: "Growth", description: "Expanded our resource library and built a thriving community across various cities in Pakistan,Canada,Saudia Arabia and Dubai" },
    { year: "2025", title: "Innovation", description: "Launching advanced AI learning tools and personalized guidance" },
    { year: "Future", title: "Global Impact", description: "Empowering students worldwide to achieve their dreams" }
  ];

  const tabContent: Record<TabKey, { title: string; content: string }> = {
    mission: {
      title: "Our Mission",
      content: "At FlarePrep, we're a group of O/A Levels qualified students on a mission to democratize quality education and test preparation. We believe that every student, regardless of their background, deserves access to world-class resources and guidance to achieve their academic goals. Our platform combines cutting-edge technology with proven educational methodologies to create an unparalleled learning experience."
    },
    vision: {
      title: "Our Vision",
      content: "We envision a world where geographical boundaries and economic constraints don't limit a student's potential. FlarePrep aims to be the global leader in educational technology, creating pathways for millions of students to access premium education and achieve their dreams of studying at top universities worldwide."
    },
    story: {
      title: "Our Story",
      content: "FlarePrep began as a simple idea: what if we could make high-quality education accessible to everyone? Founded by Zubair Khan - who has done O/A Levels himself, we started with a small community and big dreams. Today, we're proud to have helped thousands of students achieve their goals and continue to innovate in the educational space."
    }
  };

  return (
    <div className="min-h-screen text-white overflow-hidden relative">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-red-600 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-white rounded-full filter blur-2xl animate-ping delay-500"></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-16 space-y-6">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-red-500/30 bg-red-500/10 backdrop-blur-sm">
            <Flame className="w-5 h-5 text-amber-400 animate-pulse" />
            <span className="text-red-400 font-mono text-sm">ABOUT FLAREPREP</span>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-white via-red-200 to-red-500 bg-clip-text text-transparent">
            IGNITING FUTURES
          </h1>
          
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Empowering students worldwide with cutting-edge resources, personalized guidance, and a community that believes in limitless potential.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="group">
              <div className="p-6 rounded-2xl bg-gray-900/50 border border-gray-800 hover:border-red-500/50 transition-all duration-300 hover:transform hover:scale-105 backdrop-blur-sm text-center">
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${stat.color} shadow-lg mb-4`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Mission/Vision/Story Tabs */}
        <div className="mb-16">
          <div className="flex justify-center mb-8">
            <div className="flex gap-2 p-2 rounded-xl bg-gray-900/50 border border-gray-800 backdrop-blur-sm">
              {Object.keys(tabContent).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as TabKey)}
                  className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                    activeTab === tab
                      ? 'bg-gradient-to-r from-red-600 to-red-500 text-white shadow-lg'
                      : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                  }`}
                >
                  {tabContent[tab as TabKey].title}
                </button>
              ))}
            </div>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="p-8 rounded-2xl bg-gray-900/50 border border-gray-800 backdrop-blur-sm">
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <Target className="w-8 h-8 text-red-500" />
                {tabContent[activeTab].title}
              </h2>
              <p className="text-lg text-gray-300 leading-relaxed">
                {tabContent[activeTab].content}
              </p>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4 flex items-center justify-center gap-3">
              <Star className="w-8 h-8 text-red-500" />
              Our Values
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              The principles that guide everything we do at FlarePrep
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div key={index} className="group">
                <div className="p-6 rounded-2xl bg-gray-900/50 border border-gray-800 hover:border-red-500/50 transition-all duration-300 hover:transform hover:scale-105 backdrop-blur-sm">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${value.color} shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
                      <value.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white group-hover:text-red-400 transition-colors mb-2">
                        {value.title}
                      </h3>
                      <p className="text-gray-400 leading-relaxed">{value.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4 flex items-center justify-center gap-3">
              <TrendingUp className="w-8 h-8 text-red-500" />
              Our Journey
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Key milestones in our mission to transform education
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-red-500 to-red-600"></div>
              
              {milestones.map((milestone, index) => (
                <div key={index} className="relative flex items-center gap-8 mb-12">
                  <div className="relative z-10 w-16 h-16 rounded-full bg-gradient-to-r from-red-600 to-red-500 flex items-center justify-center text-white font-bold border-4 border-gray-900">
                    {milestone.year}
                  </div>
                  <div className="flex-1 p-6 rounded-2xl bg-gray-900/50 border border-gray-800 backdrop-blur-sm">
                    <h3 className="text-xl font-semibold text-white mb-2">{milestone.title}</h3>
                    <p className="text-gray-400">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="p-8 rounded-2xl bg-gradient-to-r from-red-600/20 to-red-500/20 border border-red-500/30 backdrop-blur-sm max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Ignite Your Potential?</h2>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Join thousands of students who have transformed their futures with FlarePrep. Your journey to success starts here.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 rounded-xl bg-gradient-to-r from-red-600 to-red-500 text-white font-semibold hover:from-red-500 hover:to-red-400 transition-all duration-300 flex items-center justify-center gap-2 hover:transform hover:scale-105 shadow-lg hover:shadow-red-500/25">
                <Rocket className="w-5 h-5" />
                <Link href="https://forms.gle/bSuPAL1psKQ6tKdK8">
                Get Started Today
                </Link>
              </button>
              <button className="px-8 py-4 rounded-xl border border-red-500/50 text-red-400 font-semibold hover:bg-red-500/10 transition-all duration-300 flex items-center justify-center gap-2 hover:transform hover:scale-105">
                <Users className="w-5 h-5" />
                <Link href="https://chat.whatsapp.com/FdximA88cIRFysOnwxRfc5" >
                Join Our Community
                </Link>
              </button>
            </div>
          </div>
        </div>

<div className="mt-12">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-2 flex items-center justify-center gap-3">
                <Award className="w-6 h-6 text-red-500" />
                Success Stories from O Levels CS Batch 2025
              </h3>
            </div>
            <div className="flex justify-center">
              <div className="p-6 rounded-2xl bg-gray-900/50 border border-gray-800 backdrop-blur-sm hover:border-red-500/30 transition-all duration-300 hover:transform hover:scale-105 shadow-xl">
                <Image
                  src="/flaregroup.png"
                  alt="Group Photo"
                  width={800}
                  height={100}
                  className="rounded-xl"
                />
              </div>
            </div>
          </div>

        {/* Bottom Status Bar */}
        <div className="mt-16 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-sm font-mono text-gray-400">INSPIRING FUTURES DAILY</span>
            </div>
          </div>
        </div>


      </div>
    </div>
  );
};

export default AboutPage;