"use client"

import React, { useState, useEffect } from 'react';

type TimetableClass = {
  subject: string;
  level: string;
  schedules: {
    time: string;
    days: string;
  }[];
};

const TimetablePage = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // Update every second

    return () => clearInterval(timer);
  }, []);

  const timetableData: Record<string, TimetableClass[]> = {
    'O-LEVELS': [
      {
        subject: 'Mathematics',
        level: 'O1',
        schedules: [
          { time: '3:00 PM - 4:00 PM', days: 'Monday,Tuesday,Wednesday' },
        ],
      },
      {
        subject: 'Mathematics',
        level: 'O2',
        schedules: [
          { time: '4:40 PM - 5:20 PM', days: 'Wednesday' },
          { time: '3:00 PM - 4:00 PM', days: 'Thursday,Friday' },
        ],
      },
      {
        subject: 'Urdu',
        level: 'O1',
        schedules: [
          { time: '4:00 PM - 4:40 PM', days: 'Monday,Tuesday,Wednesday' },
        ],
      },
      {
        subject: 'Physics',
        level: 'O3',
        schedules: [
          { time: '4:40 PM - 5:20 PM', days: 'Monday,Tuesday' },
        ],
      },
      {
        subject: 'English',
        level: 'O3',
        schedules: [
          { time: '9:00 PM - 9:40 PM', days: 'Thursday,Friday' },
        ],
      },
      {
        subject: 'Biology',
        level: 'O3',
        schedules: [
          { time: '5:20 PM - 6:00 PM', days: 'Monday,Tuesday' },
        ],
      },
      {
        subject: 'Maths',
        level: 'O3',
        schedules: [
          { time: '7:20 PM - 8:20 PM', days: 'Monday,Tuesday' },
          { time: '7:00 PM - 8:00 PM', days: 'Wednesday' },
        ],
      },
      {
        subject: 'Chemistry',
        level: 'O3',
        schedules: [
          { time: '4:00 PM - 4:40 PM', days: 'Thursday,Friday' },
        ],
      },
      {
        subject: 'Add Maths',
        level: 'O3',
        schedules: [
          { time: '3:00 PM - 3:40 PM', days: 'Monday,Tuesday,Friday' },
        ],
      },
       {
        subject: 'Computer Science',
        level: 'O3',
        schedules: [
          { time: '8:00 PM - 9:00 PM', days: 'Wednesday,Thursday,Friday' },
        ],
      },
    ],
    'AS LEVEL': [
      {
        subject: 'Biology',
        level: 'AS',
        schedules: [
          { time: '3:00 PM - 4:00 PM', days: 'Thursday,Friday,Saturday' },
        ],
      },
      {
        subject: 'Physics',
        level: 'AS',
        schedules: [
          { time: '5:20 PM - 6:20 PM', days: 'Monday,Tuesday' },
          { time: '5:40 PM - 6:40 PM', days: 'Friday' },
        ],
      },
      {
        subject: 'Chemistry',
        level: 'AS',
        schedules: [
          { time: '4:00 PM - 5:00 PM', days: 'Monday,Friday' },
        ],
      },
      {
        subject: 'Computer Science',
        level: 'AS',
        schedules: [
          { time: '6:20 PM - 7:00 PM', days: 'Wednesday' },
          { time: '5:40 PM - 6:40 PM', days: 'Thursday' },
        ],
      },
      {
        subject: 'Mathematics',
        level: 'AS',
        schedules: [
          { time: '5:20 PM - 6:20 PM', days: 'Wednesday' },
          { time: '4:00 PM - 5:40 PM', days: 'Thursday,Friday,Saturday' },
        ],
      },
    ],
    'A2 LEVEL': [
      {
        subject: 'Mathematics',
        level: 'A2',
        schedules: [
          { time: '6:20 PM - 7:20 PM', days: 'Monday,Tuesday' },
        ],
      },
      {
        subject: 'Biology',
        level: 'A2',
        schedules: [
          { time: '8:20 PM - 9:20 PM', days: 'Monday,Tuesday' },
        ],
      },
      {
        subject: 'Chemistry',
        level: 'A2',
        schedules: [
          { time: '8:20 PM - 9:20 PM', days: 'Wednesday,Thursday' },
        ],
      },
      {
        subject: 'Physics',
        level: 'A2',
        schedules: [
          { time: '6:40 PM - 8:00 PM', days: 'Thursday,Friday' },
        ],
      },
      {
        subject: 'Computer Science',
        level: 'A2',
        schedules: [
          { time: '9:00 PM - 10:00 PM', days: 'Tuesday,Wednesday' },
        ],
      },
    ],
  };

  const parseTime = (timeStr: string) => {
    const [time, period] = timeStr.split(' ');
    if (!time || typeof time !== 'string' || !time.includes(':')) {
  console.warn("Invalid time string:", time);
  return 0; // or throw custom error
}
    const [rawHours, rawMinutes] = time.split(':').map(Number);
let hours = rawHours;
const minutes = rawMinutes;

    
    if (period === 'PM' && hours !== 12) {
      hours += 12;
    } else if (period === 'AM' && hours === 12) {
      hours = 0;
    }
    
    return hours * 60 + minutes; // Return minutes since midnight
  };

  const parseTimeRange = (timeRange: string) => {
    const [startTime, endTime] = timeRange.split(' - ');
    return {
      start: parseTime(startTime),
      end: parseTime(endTime)
    };
  };

  const getCurrentDayName = () => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[currentTime.getDay()];
  };

  const getCurrentMinutes = () => {
    return currentTime.getHours() * 60 + currentTime.getMinutes();
  };

  const isClassActive = (classItem: TimetableClass) => {
    const currentDay = getCurrentDayName();
    const currentMinutes = getCurrentMinutes();

    return classItem.schedules.some(schedule => {
      const daysList = schedule.days.split(',').map(day => day.trim());
      const isDayMatch = daysList.some(day => {
        if (day === 'Monday to Wednesday') {
          return ['Monday', 'Tuesday', 'Wednesday'].includes(currentDay);
        }
        return day === currentDay;
      });

      if (isDayMatch) {
        const { start, end } = parseTimeRange(schedule.time);
        return currentMinutes >= start && currentMinutes <= end ;
      }

      return false;
    });
  };

  const getLevelColor = (level: string) => {
    const colors = {
      O1: 'from-green-500 to-emerald-500',
      O2: 'from-green-500 to-emerald-500',
      O3: 'from-blue-500 to-cyan-500',
      A2: 'from-orange-500 to-amber-500',
      AS: 'from-red-800 to-pink-500',
    };
    return colors[level as keyof typeof colors] || 'from-gray-500 to-gray-400';
  };

  type TimelineColumnProps = {
    level: string;
    classes: TimetableClass[];
  };

  const TimelineColumn: React.FC<TimelineColumnProps> = ({ level, classes }) => (
    <div className="relative h-full">
      {/* Column Header */}
      <div className="sticky top-0 z-20 mb-8">
        <div className="relative">
          <div className="bg-black/80 backdrop-blur-sm border border-red-500/30 rounded-2xl p-6 shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 to-transparent rounded-2xl"></div>
            <h2 className="relative text-2xl font-bold text-center text-white">{level}</h2>
            <div className="mt-2 h-px bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>
          </div>
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-px h-8 bg-gradient-to-b from-red-500/50 to-red-700/50"></div>
        </div>
      </div>
      <div className="relative">
        <div className="absolute left-1/2 transform -translate-x-1/2 w-px h-full">
          <div className="w-full h-full bg-gradient-to-b from-red-500/60 via-red-600/40 to-red-700/60"></div>
          <div className="absolute inset-0 w-1 bg-gradient-to-b from-red-400/30 to-red-600/30 blur-sm transform -translate-x-1/4"></div>
        </div>
        <div className="space-y-8">
          {classes.map((classItem, index) => {
            const isActive = isClassActive(classItem);
            return (
              <div key={index} className="relative group">
                <div className="absolute left-1/2 transform -translate-x-1/2 top-6 z-10">
                  <div className="relative">
                    <div className={`w-4 h-4 rounded-full shadow-lg transition-all duration-300 ${
                      isActive 
                        ? 'bg-gradient-to-br from-green-400 to-green-600 animate-pulse' 
                        : 'bg-gradient-to-br from-red-400 to-red-600'
                    }`}>
                      <div className={`absolute inset-0 rounded-full animate-ping opacity-20 ${
                        isActive ? 'bg-green-300' : 'bg-red-300'
                      }`}></div>
                    </div>
                    <div className={`absolute inset-0 w-6 h-6 transform -translate-x-1 -translate-y-1 rounded-full blur-sm ${
                      isActive ? 'bg-green-500/20' : 'bg-red-500/20'
                    }`}></div>
                  </div>
                </div>

                <div className={`relative ${index % 2 === 0 ? 'pr-8 mr-4' : 'pl-8 ml-4'}`}>
                  <div
                    className={`transform transition-all duration-500 hover:scale-105 ${
                      index % 2 === 0 ? 'hover:-translate-x-2' : 'hover:translate-x-2'
                    } ${isActive ? 'scale-105' : ''}`}
                  >
                    <div className={`relative backdrop-blur-md rounded-xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 ${
                      isActive 
                        ? 'bg-green-900/40 border border-green-500/50 shadow-green-500/20' 
                        : 'bg-black/60 border border-red-800/30 hover:border-red-600/50'
                    }`}>
                      <div className={`absolute inset-0 rounded-xl ${
                        isActive 
                          ? 'bg-gradient-to-br from-green-900/20 via-green-800/10 to-green-700/15' 
                          : 'bg-gradient-to-br from-red-900/10 via-transparent to-red-700/5'
                      }`}></div>

                      {isActive && (
                        <div className="absolute top-2 left-2 z-10">
                          <div className="px-2 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg animate-pulse">
                            LIVE NOW
                          </div>
                        </div>
                      )}

                      <div className="absolute top-2 right-2">
                        <div
                          className={`px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${getLevelColor(
                            classItem.level
                          )} text-white shadow-lg`}
                        >
                          {classItem.level}
                        </div>
                      </div>

                      <div className="relative space-y-3 mt-6">
                        <h3 className={`text-lg font-bold transition-colors duration-300 ${
                          isActive 
                            ? 'text-green-300' 
                            : 'text-white group-hover:text-red-300'
                        }`}>
                          {classItem.subject}
                        </h3>

                        <div className="space-y-2">
                          {classItem.schedules.map((schedule, idx) => (
                            <div key={idx} className="flex items-center space-x-3">
                              <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${
                                isActive 
                                  ? 'from-green-400 to-green-600' 
                                  : 'from-red-400 to-red-600'
                              }`}></div>
                              <span className={`font-medium tracking-wide ${
                                isActive 
                                  ? 'text-green-300' 
                                  : 'text-red-300'
                              }`}>
                                {schedule.time} - {schedule.days}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className={`absolute inset-0 rounded-xl transition-all duration-300 pointer-events-none ${
                        isActive 
                          ? 'bg-gradient-to-br from-green-500/10 to-green-700/15' 
                          : 'bg-gradient-to-br from-red-500/0 to-red-700/0 group-hover:from-red-500/5 group-hover:to-red-700/10'
                      }`}></div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen relative overflow-hidden text-white">
      <div className="relative z-10 py-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-6xl font-black tracking-tight">
            <span className="bg-gradient-to-r from-red-400 via-red-300 to-red-500 bg-clip-text text-transparent">
              ACADEMIC
            </span>
            <br />
            <span className="bg-gradient-to-r from-gray-200 via-white to-gray-300 bg-clip-text text-transparent">
              TIMETABLE
            </span>
          </h1>
          <div className="h-1 w-32 mt-4 mx-auto bg-gradient-to-r from-transparent via-red-500 to-transparent rounded-full"></div>
          <p className="text-gray-400 text-xl font-light tracking-wide mt-4">2024-2025 Academic Session</p>
          
          {/* Live Clock */}
          <div className="mt-6 p-4 bg-black/60 backdrop-blur-sm border border-red-500/30 rounded-xl inline-block">
            <div className="text-2xl font-mono font-bold text-green-400">
              {currentTime.toLocaleTimeString()} - {getCurrentDayName()}
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 h-full">
          {Object.entries(timetableData).map(([level, classes]) => (
            <TimelineColumn key={level} level={level} classes={classes} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TimetablePage;