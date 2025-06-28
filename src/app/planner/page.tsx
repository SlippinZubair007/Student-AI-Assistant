"use client"
import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Settings, Volume2, Coffee, Target, Clock } from 'lucide-react';

const PomodoroTimer = () => {
  // Timer states
  const [workTime, setWorkTime] = useState(25);
  const [shortBreak, setShortBreak] = useState(5);
  const [longBreak, setLongBreak] = useState(15);
  const [currentTime, setCurrentTime] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState('work'); // 'work', 'shortBreak', 'longBreak'
  const [cycle, setCycle] = useState(1);
  const [showSettings, setShowSettings] = useState(false);
  
  // Audio refs for music integration
  const workMusicRef = useRef<HTMLAudioElement>(null);
  const breakMusicRef = useRef<HTMLAudioElement>(null);
  
  // Timer effect
  useEffect(() => {
  let interval: NodeJS.Timeout | undefined;

  if (isActive && currentTime > 0) {
    interval = setInterval(() => {
      setCurrentTime(time => time - 1);
    }, 1000);
  } else if (currentTime === 0) {
    // Timer completed
    handleTimerComplete();
  }

  return () => {
    if (interval !== undefined) clearInterval(interval);
  };
}, [isActive, currentTime]);

  // Music control effect - plays music when timer starts
  useEffect(() => {
    if (isActive) {
      playCurrentModeMusic();
    } else {
      stopAllMusic();
    }
  }, [isActive, mode]);
  
  const playCurrentModeMusic = () => {
    try {
      // Stop all music first
      stopAllMusic();
      
      // Play appropriate music based on mode
      const audioRef = mode === 'work' ? workMusicRef.current : breakMusicRef.current;
      
      if (audioRef) {
        audioRef.play().catch(error => {
          console.log('Could not play music:', error);
        });
      }
    } catch (error) {
      console.log('Music playback error:', error);
    }
  };
  
  const stopAllMusic = () => {
    if (workMusicRef.current) {
      workMusicRef.current.pause();
      workMusicRef.current.currentTime = 0;
    }
    if (breakMusicRef.current) {
      breakMusicRef.current.pause();
      breakMusicRef.current.currentTime = 0;
    }
  };
  
  const handleTimerComplete = () => {
    setIsActive(false);
    
    if (mode === 'work') {
      if (cycle % 4 === 0) {
        // Long break after 4 cycles
        setMode('longBreak');
        setCurrentTime(longBreak * 60);
      } else {
        // Short break
        setMode('shortBreak');
        setCurrentTime(shortBreak * 60);
      }
    } else {
      // Break completed, back to work
      setMode('work');
      setCurrentTime(workTime * 60);
      if (mode === 'shortBreak' || mode === 'longBreak') {
        setCycle(prev => prev + 1);
      }
    }
    
    // Notification (you can add browser notification here)
    document.title = mode === 'work' ? 'Break Time!' : 'Work Time!';
  };
  
  const startTimer = () => {
    setIsActive(true);
    document.title = `${formatTime(currentTime)} - ${mode === 'work' ? 'Focus Time' : 'Break Time'}`;
  };
  
  const pauseTimer = () => {
    setIsActive(false);
    document.title = 'Pomodoro Timer - Paused';
  };
  
  const resetTimer = () => {
    setIsActive(false);
    setCurrentTime(workTime * 60);
    setMode('work');
    setCycle(1);
    document.title = 'Pomodoro Timer';
  };
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  const getProgress = () => {
    const totalTime = mode === 'work' ? workTime * 60 : 
                     mode === 'shortBreak' ? shortBreak * 60 : longBreak * 60;
    return ((totalTime - currentTime) / totalTime) * 100;
  };
  
  const getModeIcon = () => {
    switch(mode) {
      case 'work': return <Target className="w-8 h-8" />;
      case 'shortBreak': return <Coffee className="w-8 h-8" />;
      case 'longBreak': return <Coffee className="w-8 h-8" />;
      default: return <Clock className="w-8 h-8" />;
    }
  };
  
  const getModeColor = () => {
    switch(mode) {
      case 'work': return 'text-primary';
      case 'shortBreak': return 'text-accent';
      case 'longBreak': return 'text-secondary';
      default: return 'text-primary';
    }
  };
  
  return (
    <div className="min-h-screen p-4 flex items-center justify-center">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
            Pomodoro Focus
          </h1>
          <p className="text-muted-foreground">Stay focused, stay productive</p>
        </div>
        
        {/* Main Timer Card */}
        <div className="relative">
          {/* Background Glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/10 rounded-3xl blur-xl"></div>
          
          <div className="relative bg-card/80 backdrop-blur-lg border border-border/50 rounded-3xl p-8 shadow-2xl">
            {/* Mode Indicator */}
            <div className="flex items-center justify-center mb-6">
              <div className={`flex items-center gap-3 px-4 py-2 rounded-full bg-background/50 ${getModeColor()}`}>
                {getModeIcon()}
                <span className="font-semibold capitalize">
                  {mode === 'shortBreak' ? 'Short Break' : 
                   mode === 'longBreak' ? 'Long Break' : 'Focus Time'}
                </span>
              </div>
            </div>
            
            {/* Circular Progress */}
            <div className="relative flex items-center justify-center mb-8">
              <svg className="w-80 h-80 transform -rotate-90" viewBox="0 0 100 100">
                {/* Background circle */}
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  className="text-muted/30"
                />
                {/* Progress circle */}
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 45}`}
                  strokeDashoffset={`${2 * Math.PI * 45 * (1 - getProgress() / 100)}`}
                  className={`transition-all duration-1000 ease-out ${
                    mode === 'work' ? 'text-primary' : 
                    mode === 'shortBreak' ? 'text-accent' : 'text-secondary'
                  }`}
                  strokeLinecap="round"
                />
              </svg>
              
              {/* Timer Display */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-6xl font-mono font-bold text-foreground mb-2">
                  {formatTime(currentTime)}
                </div>
                <div className="text-sm text-muted-foreground">
                  Cycle {cycle} • {Math.ceil(getProgress())}% complete
                </div>
              </div>
            </div>
            
            {/* Control Buttons */}
            <div className="flex items-center justify-center gap-4 mb-6">
              <button
                onClick={isActive ? pauseTimer : startTimer}
                className="flex items-center justify-center w-16 h-16 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-primary/25"
              >
                {isActive ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
              </button>
              
              <button
                onClick={resetTimer}
                className="flex items-center justify-center w-12 h-12 bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-full transition-all duration-200 hover:scale-105"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
              
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="flex items-center justify-center w-12 h-12 bg-accent hover:bg-accent/90 text-accent-foreground rounded-full transition-all duration-200 hover:scale-105"
              >
                <Settings className="w-5 h-5" />
              </button>
            </div>
            
            {/* Quick Mode Switcher */}
            <div className="flex justify-center gap-2 mb-6">
              <button
                onClick={() => {
                  setMode('work');
                  setCurrentTime(workTime * 60);
                  setIsActive(false);
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  mode === 'work' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-background/50 text-muted-foreground hover:bg-background/80'
                }`}
              >
                Work
              </button>
              <button
                onClick={() => {
                  setMode('shortBreak');
                  setCurrentTime(shortBreak * 60);
                  setIsActive(false);
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  mode === 'shortBreak' 
                    ? 'bg-accent text-accent-foreground' 
                    : 'bg-background/50 text-muted-foreground hover:bg-background/80'
                }`}
              >
                Short Break
              </button>
              <button
                onClick={() => {
                  setMode('longBreak');
                  setCurrentTime(longBreak * 60);
                  setIsActive(false);
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  mode === 'longBreak' 
                    ? 'bg-secondary text-secondary-foreground' 
                    : 'bg-background/50 text-muted-foreground hover:bg-background/80'
                }`}
              >
                Long Break
              </button>
            </div>
            
            {/* Music Control */}
            <div className="flex items-center justify-center gap-4 pt-4 border-t border-border/30">
              <Volume2 className="w-5 h-5 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Background Music</span>
              <div className="text-xs text-muted-foreground/70">
                {isActive ? (mode === 'work' ? 'Playing work music' : 'Playing break music') : 'Ready to play'}
              </div>
            </div>
          </div>
        </div>
        
        {/* Settings Panel */}
        {showSettings && (
          <div className="mt-4 bg-card/80 backdrop-blur-lg border border-border/50 rounded-2xl p-6">
            <h3 className="text-lg font-semibold mb-4 text-center">Timer Settings</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Work Time */}
              <div>
                <label className="block text-sm font-medium mb-2">Work Time (minutes)</label>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setWorkTime(Math.max(1, workTime - 1))}
                    className="w-8 h-8 bg-background rounded-full flex items-center justify-center hover:bg-background/80 transition-colors"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={workTime}
                    onChange={(e) => setWorkTime(Math.max(1, parseInt(e.target.value) || 1))}
                    className="flex-1 bg-background/50 border border-border rounded-lg px-3 py-2 text-center"
                    min="1"
                    max="60"
                  />
                  <button
                    onClick={() => setWorkTime(Math.min(60, workTime + 1))}
                    className="w-8 h-8 bg-background rounded-full flex items-center justify-center hover:bg-background/80 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
              
              {/* Short Break */}
              <div>
                <label className="block text-sm font-medium mb-2">Short Break (minutes)</label>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShortBreak(Math.max(1, shortBreak - 1))}
                    className="w-8 h-8 bg-background rounded-full flex items-center justify-center hover:bg-background/80 transition-colors"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={shortBreak}
                    onChange={(e) => setShortBreak(Math.max(1, parseInt(e.target.value) || 1))}
                    className="flex-1 bg-background/50 border border-border rounded-lg px-3 py-2 text-center"
                    min="1"
                    max="30"
                  />
                  <button
                    onClick={() => setShortBreak(Math.min(30, shortBreak + 1))}
                    className="w-8 h-8 bg-background rounded-full flex items-center justify-center hover:bg-background/80 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
              
              {/* Long Break */}
              <div>
                <label className="block text-sm font-medium mb-2">Long Break (minutes)</label>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setLongBreak(Math.max(1, longBreak - 1))}
                    className="w-8 h-8 bg-background rounded-full flex items-center justify-center hover:bg-background/80 transition-colors"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={longBreak}
                    onChange={(e) => setLongBreak(Math.max(1, parseInt(e.target.value) || 1))}
                    className="flex-1 bg-background/50 border border-border rounded-lg px-3 py-2 text-center"
                    min="1"
                    max="60"
                  />
                  <button
                    onClick={() => setLongBreak(Math.min(60, longBreak + 1))}
                    className="w-8 h-8 bg-background rounded-full flex items-center justify-center hover:bg-background/80 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
            
            <div className="mt-4 text-center">
              <button
                onClick={() => {
                  if (mode === 'work') setCurrentTime(workTime * 60);
                  else if (mode === 'shortBreak') setCurrentTime(shortBreak * 60);
                  else setCurrentTime(longBreak * 60);
                  setShowSettings(false);
                }}
                className="px-6 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full transition-colors"
              >
                Apply Settings
              </button>
            </div>
          </div>
        )}
        
        {/* Stats */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-card/60 backdrop-blur-sm rounded-xl p-4 text-center border border-border/30">
            <div className="text-2xl font-bold text-primary">{cycle}</div>
            <div className="text-xs text-muted-foreground">Cycles</div>
          </div>
          <div className="bg-card/60 backdrop-blur-sm rounded-xl p-4 text-center border border-border/30">
            <div className="text-2xl font-bold text-accent">{workTime}m</div>
            <div className="text-xs text-muted-foreground">Work Time</div>
          </div>
          <div className="bg-card/60 backdrop-blur-sm rounded-xl p-4 text-center border border-border/30">
            <div className="text-2xl font-bold text-amber-600">{shortBreak}m</div>
            <div className="text-xs text-muted-foreground">Short Break</div>
          </div>
          <div className="bg-card/60 backdrop-blur-sm rounded-xl p-4 text-center border border-border/30">
            <div className="text-2xl font-bold text-muted-foreground">{longBreak}m</div>
            <div className="text-xs text-muted-foreground">Long Break</div>
          </div>
        </div>
        
        {/* Audio elements for music */}
        <audio ref={workMusicRef} loop className="hidden">
          <source src="/work.mp3" type="audio/mpeg" />
        </audio>
        <audio ref={breakMusicRef} loop className="hidden">
          <source src="/break.mp3" type="audio/mpeg" />
        </audio>
      </div>
    </div>
  );
};

export default PomodoroTimer;