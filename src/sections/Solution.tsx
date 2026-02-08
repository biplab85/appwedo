import { useEffect, useRef, useState } from 'react';
import { Container, SectionHeader } from '../components';
import { siteContent } from '../content';
import { CheckCircle } from 'lucide-react';

export default function Solution() {
  const { headline, subheadline, features } = siteContent.solution;
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.08 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="relative py-24 lg:py-32 overflow-hidden">
      {/* ===== Premium Full-Section SVG Background Animation ===== */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-dark-50/80 via-white to-primary/[0.03]" />

        {/* Animated gradient orbs */}
        <div className="absolute -top-32 -right-32 w-[600px] h-[600px] bg-gradient-to-br from-primary/[0.07] to-transparent rounded-full blur-3xl solution-orb-1" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-gradient-to-tr from-secondary/[0.06] to-transparent rounded-full blur-3xl solution-orb-2" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-r from-accent/[0.04] to-transparent rounded-full blur-3xl solution-orb-3" />

        {/* SVG animated mesh */}
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <defs>
            <linearGradient id="solGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4F46E5" stopOpacity="0.08" />
              <stop offset="50%" stopColor="#10B981" stopOpacity="0.05" />
              <stop offset="100%" stopColor="#4F46E5" stopOpacity="0.08" />
            </linearGradient>
            <linearGradient id="solGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#10B981" stopOpacity="0.06" />
              <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.04" />
            </linearGradient>
            <linearGradient id="solGrad3" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#4F46E5" stopOpacity="0.05" />
              <stop offset="100%" stopColor="#10B981" stopOpacity="0.07" />
            </linearGradient>
            <filter id="solGlow">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Flowing wave paths */}
          <path
            d="M0,300 C200,250 400,350 600,280 C800,210 1000,320 1200,260 C1400,200 1600,310 1800,270"
            fill="none" stroke="url(#solGrad1)" strokeWidth="1.5"
            className="solution-wave-1"
          />
          <path
            d="M0,400 C180,350 380,450 580,380 C780,310 980,420 1180,360 C1380,300 1580,410 1800,370"
            fill="none" stroke="url(#solGrad2)" strokeWidth="1.2"
            className="solution-wave-2"
          />
          <path
            d="M0,500 C220,460 420,540 620,480 C820,420 1020,520 1220,460 C1420,400 1620,500 1800,460"
            fill="none" stroke="url(#solGrad3)" strokeWidth="1"
            className="solution-wave-3"
          />

          {/* Floating connection nodes */}
          <g filter="url(#solGlow)">
            <circle r="3" fill="#4F46E5" opacity="0.4">
              <animate attributeName="cx" values="100;400;700;400;100" dur="20s" repeatCount="indefinite" />
              <animate attributeName="cy" values="200;300;250;150;200" dur="20s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.2;0.5;0.3;0.5;0.2" dur="20s" repeatCount="indefinite" />
            </circle>
            <circle r="2.5" fill="#10B981" opacity="0.35">
              <animate attributeName="cx" values="800;500;200;500;800" dur="24s" repeatCount="indefinite" />
              <animate attributeName="cy" values="350;450;400;300;350" dur="24s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.15;0.45;0.25;0.4;0.15" dur="24s" repeatCount="indefinite" />
            </circle>
            <circle r="2" fill="#F59E0B" opacity="0.3">
              <animate attributeName="cx" values="1200;900;600;900;1200" dur="18s" repeatCount="indefinite" />
              <animate attributeName="cy" values="250;350;300;200;250" dur="18s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.1;0.35;0.2;0.35;0.1" dur="18s" repeatCount="indefinite" />
            </circle>
            <circle r="3.5" fill="#4F46E5" opacity="0.3">
              <animate attributeName="cx" values="1400;1100;800;1100;1400" dur="22s" repeatCount="indefinite" />
              <animate attributeName="cy" values="450;350;400;500;450" dur="22s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.15;0.4;0.2;0.4;0.15" dur="22s" repeatCount="indefinite" />
            </circle>
          </g>

          {/* Animated connecting lines between nodes */}
          <g stroke="#4F46E5" strokeWidth="0.5" opacity="0.15">
            <line x1="0" y1="0" x2="0" y2="0">
              <animate attributeName="x1" values="100;400;700;400;100" dur="20s" repeatCount="indefinite" />
              <animate attributeName="y1" values="200;300;250;150;200" dur="20s" repeatCount="indefinite" />
              <animate attributeName="x2" values="800;500;200;500;800" dur="24s" repeatCount="indefinite" />
              <animate attributeName="y2" values="350;450;400;300;350" dur="24s" repeatCount="indefinite" />
            </line>
            <line x1="0" y1="0" x2="0" y2="0">
              <animate attributeName="x1" values="800;500;200;500;800" dur="24s" repeatCount="indefinite" />
              <animate attributeName="y1" values="350;450;400;300;350" dur="24s" repeatCount="indefinite" />
              <animate attributeName="x2" values="1200;900;600;900;1200" dur="18s" repeatCount="indefinite" />
              <animate attributeName="y2" values="250;350;300;200;250" dur="18s" repeatCount="indefinite" />
            </line>
            <line x1="0" y1="0" x2="0" y2="0">
              <animate attributeName="x1" values="1200;900;600;900;1200" dur="18s" repeatCount="indefinite" />
              <animate attributeName="y1" values="250;350;300;200;250" dur="18s" repeatCount="indefinite" />
              <animate attributeName="x2" values="1400;1100;800;1100;1400" dur="22s" repeatCount="indefinite" />
              <animate attributeName="y2" values="450;350;400;500;450" dur="22s" repeatCount="indefinite" />
            </line>
          </g>

          {/* Subtle grid pattern */}
          <g stroke="#4F46E5" strokeWidth="0.3" opacity="0.04">
            {Array.from({ length: 20 }).map((_, i) => (
              <line key={`h-${i}`} x1="0" y1={i * 50} x2="100%" y2={i * 50} />
            ))}
            {Array.from({ length: 40 }).map((_, i) => (
              <line key={`v-${i}`} x1={i * 50} y1="0" x2={i * 50} y2="100%" />
            ))}
          </g>

          {/* Floating particles */}
          {[
            { cx: 0, cy: 180, r: 1.5, dur: '15s', color: '#4F46E5' },
            { cx: 0, cy: 380, r: 1, dur: '22s', color: '#10B981' },
            { cx: 0, cy: 550, r: 1.2, dur: '18s', color: '#4F46E5' },
          ].map((p, i) => (
            <circle key={`pl-${i}`} cx={p.cx} cy={p.cy} r={p.r} fill={p.color} opacity="0">
              <animate attributeName="cx" values="0;1800" dur={p.dur} repeatCount="indefinite" />
              <animate attributeName="opacity" values="0;0.4;0.4;0" dur={p.dur} repeatCount="indefinite" />
            </circle>
          ))}
          {[
            { cx: 1800, cy: 220, r: 1.2, dur: '19s', color: '#10B981' },
            { cx: 1800, cy: 420, r: 1.5, dur: '25s', color: '#4F46E5' },
            { cx: 1800, cy: 600, r: 1, dur: '16s', color: '#10B981' },
          ].map((p, i) => (
            <circle key={`pr-${i}`} cx={p.cx} cy={p.cy} r={p.r} fill={p.color} opacity="0">
              <animate attributeName="cx" values="1800;0" dur={p.dur} repeatCount="indefinite" />
              <animate attributeName="opacity" values="0;0.35;0.35;0" dur={p.dur} repeatCount="indefinite" />
            </circle>
          ))}
        </svg>
      </div>

      {/* ===== Main Content ===== */}
      <Container className="relative z-10">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-16 items-center">

          {/* ===== LEFT: MacBook Mockup (7 cols) ===== */}
          <div
            className={`relative lg:col-span-7 order-2 lg:order-1 transition-all duration-1000 ease-out ${
              isVisible
                ? 'opacity-100 translate-x-0 scale-100'
                : 'opacity-0 -translate-x-10 scale-[0.93]'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            <div className="relative mx-auto">
              {/* Screen Lid */}
              <div className="relative rounded-t-[14px] sm:rounded-t-[18px] lg:rounded-t-[22px] bg-[#1a1a1a] p-[7px] sm:p-[10px] lg:p-[12px] pb-[12px] sm:pb-[16px] lg:pb-[18px] shadow-2xl shadow-dark-900/30">
                {/* Camera Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20">
                  <div className="relative bg-[#1a1a1a] rounded-b-[8px] sm:rounded-b-[12px] px-[18px] sm:px-[24px] pt-0 pb-[4px] sm:pb-[6px]">
                    <div className="w-[6px] h-[6px] sm:w-[8px] sm:h-[8px] lg:w-[10px] lg:h-[10px] rounded-full bg-[#2a2a2a] mx-auto relative">
                      <div className="absolute inset-[2px] rounded-full bg-[#0d2847]" />
                      <div className="absolute top-[1px] left-[1px] w-[1px] h-[1px] sm:w-[2px] sm:h-[2px] rounded-full bg-[#1a4a7a]/60" />
                    </div>
                  </div>
                </div>

                {/* Screen Bezel */}
                <div className="relative rounded-[7px] sm:rounded-[10px] lg:rounded-[12px] overflow-hidden bg-[#0a0a0a]">
                  {/* Screen reflection */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] via-transparent to-transparent pointer-events-none z-10" />

                  {/* Screen Content */}
                  <div className="relative bg-gradient-to-br from-[#f8fafc] to-[#f1f5f9]">
                    {/* macOS Menu Bar */}
                    <div className="flex items-center justify-between px-3 sm:px-5 lg:px-6 py-1.5 sm:py-2 lg:py-2.5 bg-white/80 backdrop-blur-md border-b border-dark-100/50">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="flex gap-1.5 sm:gap-2">
                          <div className="w-[8px] h-[8px] sm:w-[11px] sm:h-[11px] lg:w-[13px] lg:h-[13px] rounded-full bg-[#ff5f57] border border-[#e0443e]/30" />
                          <div className="w-[8px] h-[8px] sm:w-[11px] sm:h-[11px] lg:w-[13px] lg:h-[13px] rounded-full bg-[#febc2e] border border-[#dea123]/30" />
                          <div className="w-[8px] h-[8px] sm:w-[11px] sm:h-[11px] lg:w-[13px] lg:h-[13px] rounded-full bg-[#28c840] border border-[#1aab29]/30" />
                        </div>
                        <div className="hidden sm:flex items-center gap-3 ml-3 text-[10px] sm:text-xs text-dark-400 font-medium">
                          <span>File</span>
                          <span>Edit</span>
                          <span>View</span>
                          <span className="hidden lg:inline">Window</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 px-2.5 sm:px-4 py-0.5 sm:py-1 bg-dark-100/50 rounded-md sm:rounded-lg">
                        <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-dark-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <span className="text-[9px] sm:text-[11px] lg:text-xs text-dark-400">appwedo.com/dashboard</span>
                      </div>
                      <div className="hidden sm:flex items-center gap-2 text-dark-400">
                        <svg className="w-3.5 h-3.5 lg:w-4 lg:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.14 0M1.394 9.393c5.857-5.858 15.355-5.858 21.213 0" />
                        </svg>
                        <svg className="w-3.5 h-3.5 lg:w-4 lg:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21 10.5h.375c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125H21M4.5 10.5H18V15H4.5v-4.5zM3.75 18h15A2.25 2.25 0 0021 15.75v-6a2.25 2.25 0 00-2.25-2.25h-15A2.25 2.25 0 001.5 9.75v6A2.25 2.25 0 003.75 18z" />
                        </svg>
                        <span className="hidden lg:inline text-[11px] font-medium">Sat 10:32 AM</span>
                      </div>
                    </div>

                    {/* Dashboard Content */}
                    <div className="p-4 sm:p-6 lg:p-8">
                      {/* App Header */}
                      <div className="flex items-center justify-between mb-4 sm:mb-6 lg:mb-8">
                        <div className="flex items-center gap-2.5 sm:gap-4">
                          <div className="w-8 h-8 sm:w-11 sm:h-11 lg:w-12 lg:h-12 bg-primary rounded-lg sm:rounded-xl flex items-center justify-center">
                            <span className="text-white font-bold text-[9px] sm:text-sm lg:text-base">AW</span>
                          </div>
                          <div>
                            <div className="font-semibold text-dark-700 text-[11px] sm:text-base lg:text-lg">Project Dashboard</div>
                            <div className="text-[9px] sm:text-sm text-dark-400">AppWeDo Platform</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 sm:gap-3">
                          <div className="hidden sm:flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 bg-green-50 rounded-lg border border-green-100">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-[10px] sm:text-xs text-green-600 font-medium">Live</span>
                          </div>
                          <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-dark-50 flex items-center justify-center">
                            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-dark-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                            </svg>
                          </div>
                          <div className="hidden lg:flex w-9 h-9 rounded-xl bg-dark-50 items-center justify-center">
                            <svg className="w-4 h-4 text-dark-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                          </div>
                        </div>
                      </div>

                      {/* Two-column dashboard */}
                      <div className="grid lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
                        {/* Left: Progress */}
                        <div className="lg:col-span-2 space-y-4 sm:space-y-5">
                          {/* Progress Bars */}
                          <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 border border-dark-100/60 shadow-sm">
                            <div className="flex items-center justify-between mb-4 sm:mb-5">
                              <h4 className="font-semibold text-dark-700 text-[11px] sm:text-sm lg:text-base">Project Progress</h4>
                              <span className="text-[9px] sm:text-xs text-dark-400">Updated 2 min ago</span>
                            </div>
                            <div className="space-y-3 sm:space-y-4 lg:space-y-5">
                              <div>
                                <div className="flex justify-between text-[10px] sm:text-xs lg:text-sm mb-1.5">
                                  <span className="text-dark-600 font-medium">Design Phase</span>
                                  <span className="text-green-500 font-semibold">Complete</span>
                                </div>
                                <div className="h-2 sm:h-2.5 lg:h-3 bg-dark-100 rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-gradient-to-r from-green-400 to-green-500 rounded-full transition-all ease-out"
                                    style={{ width: isVisible ? '100%' : '0%', transitionDuration: '1.5s', transitionDelay: '600ms' }}
                                  />
                                </div>
                              </div>
                              <div>
                                <div className="flex justify-between text-[10px] sm:text-xs lg:text-sm mb-1.5">
                                  <span className="text-dark-600 font-medium">Development</span>
                                  <span className="text-primary font-semibold">75%</span>
                                </div>
                                <div className="h-2 sm:h-2.5 lg:h-3 bg-dark-100 rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-gradient-to-r from-primary-400 to-primary rounded-full transition-all ease-out"
                                    style={{ width: isVisible ? '75%' : '0%', transitionDuration: '1.5s', transitionDelay: '800ms' }}
                                  />
                                </div>
                              </div>
                              <div>
                                <div className="flex justify-between text-[10px] sm:text-xs lg:text-sm mb-1.5">
                                  <span className="text-dark-600 font-medium">Testing</span>
                                  <span className="text-dark-400 font-medium">Upcoming</span>
                                </div>
                                <div className="h-2 sm:h-2.5 lg:h-3 bg-dark-100 rounded-full overflow-hidden">
                                  <div className="h-full w-0 bg-secondary rounded-full" />
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Activity + Team */}
                          <div className="hidden sm:grid grid-cols-2 gap-4 sm:gap-5">
                            <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-dark-100/60 shadow-sm">
                              <div className="text-[10px] sm:text-xs text-dark-400 font-medium mb-2">Recent Activity</div>
                              <div className="space-y-2.5">
                                <div className="flex items-center gap-2.5">
                                  <div className="w-2 h-2 rounded-full bg-green-400 flex-shrink-0" />
                                  <span className="text-[10px] sm:text-xs text-dark-600 truncate">Auth module deployed</span>
                                </div>
                                <div className="flex items-center gap-2.5">
                                  <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                                  <span className="text-[10px] sm:text-xs text-dark-600 truncate">API endpoints reviewed</span>
                                </div>
                                <div className="flex items-center gap-2.5">
                                  <div className="w-2 h-2 rounded-full bg-accent flex-shrink-0" />
                                  <span className="text-[10px] sm:text-xs text-dark-600 truncate">UI wireframes approved</span>
                                </div>
                              </div>
                            </div>
                            <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-dark-100/60 shadow-sm">
                              <div className="text-[10px] sm:text-xs text-dark-400 font-medium mb-2">Team Members</div>
                              <div className="flex -space-x-2 mb-2.5">
                                {['bg-primary', 'bg-secondary', 'bg-accent', 'bg-pink-500'].map((bg, i) => (
                                  <div key={i} className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full ${bg} border-2 border-white flex items-center justify-center`}>
                                    <span className="text-white text-[8px] sm:text-[9px] font-bold">
                                      {['AK', 'JR', 'SM', 'LP'][i]}
                                    </span>
                                  </div>
                                ))}
                                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-dark-100 border-2 border-white flex items-center justify-center">
                                  <span className="text-dark-500 text-[8px] sm:text-[9px] font-bold">+3</span>
                                </div>
                              </div>
                              <span className="text-[10px] sm:text-xs text-dark-400">7 active members</span>
                            </div>
                          </div>
                        </div>

                        {/* Right: Stats */}
                        <div className="space-y-4 sm:space-y-5">
                          <div className="grid grid-cols-3 lg:grid-cols-1 gap-3 sm:gap-4">
                            <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-5 text-center lg:text-left border border-primary/10 shadow-sm">
                              <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-primary">12</div>
                              <div className="text-[9px] sm:text-xs lg:text-sm text-dark-500 font-medium">Features Built</div>
                            </div>
                            <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-5 text-center lg:text-left border border-secondary/10 shadow-sm">
                              <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-secondary">4</div>
                              <div className="text-[9px] sm:text-xs lg:text-sm text-dark-500 font-medium">Sprint Cycles</div>
                            </div>
                            <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-5 text-center lg:text-left border border-accent/10 shadow-sm">
                              <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-accent">98%</div>
                              <div className="text-[9px] sm:text-xs lg:text-sm text-dark-500 font-medium">Code Quality</div>
                            </div>
                          </div>

                          {/* Uptime card */}
                          <div className="hidden lg:block bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl p-5 border border-primary/10 shadow-sm">
                            <div className="flex items-center gap-3 mb-3">
                              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                                <span className="text-primary font-bold text-sm">99%</span>
                              </div>
                              <div>
                                <div className="text-sm font-semibold text-dark-800">Uptime SLA</div>
                                <div className="text-xs text-dark-400">Enterprise reliability</div>
                              </div>
                            </div>
                            <div className="flex gap-1">
                              {Array.from({ length: 14 }).map((_, i) => (
                                <div
                                  key={i}
                                  className={`flex-1 h-5 rounded-sm ${
                                    i === 9 ? 'bg-accent/40' : 'bg-green-400/60'
                                  }`}
                                />
                              ))}
                            </div>
                            <div className="flex justify-between mt-1.5">
                              <span className="text-[9px] text-dark-400">14 days ago</span>
                              <span className="text-[9px] text-dark-400">Today</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hinge */}
              <div className="relative">
                <div className="h-[2px] sm:h-[3px] lg:h-[4px] bg-gradient-to-r from-transparent via-[#c4c4c4] to-transparent" />
                <div
                  className="relative h-[10px] sm:h-[14px] lg:h-[18px] bg-gradient-to-b from-[#c8c8c8] to-[#a8a8a8] rounded-b-[8px] sm:rounded-b-[12px] lg:rounded-b-[14px] mx-auto"
                  style={{ width: '90%' }}
                >
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[50px] sm:w-[70px] lg:w-[90px] h-[3px] sm:h-[5px] lg:h-[6px] bg-gradient-to-b from-[#b0b0b0] to-[#a0a0a0] rounded-b-[4px] sm:rounded-b-[6px]" />
                  <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                </div>
                <div
                  className="h-[4px] sm:h-[6px] lg:h-[7px] bg-gradient-to-b from-[#a0a0a0] to-[#909090] rounded-b-[10px] sm:rounded-b-[14px] lg:rounded-b-[16px] mx-auto"
                  style={{ width: '102%', marginLeft: '-1%' }}
                >
                  <div className="absolute bottom-0 left-[5%] right-[5%] h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                </div>
              </div>

              {/* Shadow */}
              <div className="absolute -bottom-4 sm:-bottom-5 lg:-bottom-6 left-[10%] right-[10%] h-[8px] sm:h-[10px] lg:h-[14px] bg-dark-900/12 blur-lg rounded-full" />

              {/* Floating "On Track" badge */}
              <div
                className={`absolute -top-4 -right-2 sm:-top-5 sm:-right-4 lg:-top-6 lg:-right-8 bg-white rounded-xl sm:rounded-2xl shadow-xl shadow-dark-900/10 p-2.5 sm:p-3 lg:p-4 border border-dark-100 z-30 transition-all duration-700 ease-out ${
                  isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-4 scale-90'
                }`}
                style={{ transitionDelay: '1000ms' }}
              >
                <div className="flex items-center gap-2 sm:gap-2.5">
                  <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-500" />
                  <div>
                    <span className="text-sm sm:text-base font-semibold text-dark-700 block">On Track</span>
                    <span className="hidden sm:block text-[10px] sm:text-xs text-dark-400">All milestones met</span>
                  </div>
                </div>
              </div>

              {/* Floating metric badge */}
              <div
                className={`absolute -bottom-8 -left-2 sm:-bottom-8 sm:-left-4 lg:-bottom-8 lg:-left-8 bg-white rounded-xl sm:rounded-2xl shadow-xl shadow-dark-900/10 p-2.5 sm:p-3 lg:p-4 border border-dark-100 z-30 transition-all duration-700 ease-out ${
                  isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-90'
                }`}
                style={{ transitionDelay: '1200ms' }}
              >
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-9 h-9 sm:w-11 sm:h-11 bg-primary/10 rounded-lg sm:rounded-xl flex items-center justify-center">
                    <span className="text-primary font-bold text-xs sm:text-sm">99%</span>
                  </div>
                  <div>
                    <div className="text-sm sm:text-base font-semibold text-dark-800">Uptime</div>
                    <div className="text-[10px] sm:text-xs text-dark-400">Enterprise grade</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ===== RIGHT: Content (5 cols) ===== */}
          <div
            className={`lg:col-span-5 order-1 lg:order-2 transition-all duration-700 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <SectionHeader
              headline={headline}
              subheadline={subheadline}
              centered={false}
              className="mb-10 lg:mb-12"
            />

            <div className="space-y-7">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`group flex gap-5 transition-all duration-600 ease-out ${
                    isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
                  }`}
                  style={{ transitionDelay: `${400 + index * 150}ms` }}
                >
                  <div className="flex-shrink-0 w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                    <feature.icon className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-dark-800 mb-1.5 text-lg">{feature.title}</h3>
                    <p className="text-dark-500 text-sm leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>

      {/* CSS Animations for SVG background */}
      <style>{`
        .solution-orb-1 {
          animation: solOrb1 18s ease-in-out infinite;
        }
        .solution-orb-2 {
          animation: solOrb2 22s ease-in-out infinite;
        }
        .solution-orb-3 {
          animation: solOrb3 15s ease-in-out infinite;
        }
        @keyframes solOrb1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-40px, 30px) scale(1.08); }
          66% { transform: translate(30px, -20px) scale(0.95); }
        }
        @keyframes solOrb2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(50px, -40px) scale(1.1); }
          66% { transform: translate(-30px, 30px) scale(0.92); }
        }
        @keyframes solOrb3 {
          0%, 100% { transform: translate(-50%, -50%) scale(1) rotate(0deg); }
          50% { transform: translate(-50%, -50%) scale(1.12) rotate(180deg); }
        }

        .solution-wave-1 {
          animation: solWave1 12s ease-in-out infinite;
        }
        .solution-wave-2 {
          animation: solWave2 16s ease-in-out infinite;
        }
        .solution-wave-3 {
          animation: solWave3 20s ease-in-out infinite;
        }
        @keyframes solWave1 {
          0%, 100% { d: path("M0,300 C200,250 400,350 600,280 C800,210 1000,320 1200,260 C1400,200 1600,310 1800,270"); }
          50% { d: path("M0,280 C200,330 400,230 600,300 C800,370 1000,260 1200,320 C1400,380 1600,270 1800,310"); }
        }
        @keyframes solWave2 {
          0%, 100% { d: path("M0,400 C180,350 380,450 580,380 C780,310 980,420 1180,360 C1380,300 1580,410 1800,370"); }
          50% { d: path("M0,380 C180,430 380,330 580,400 C780,470 980,360 1180,420 C1380,480 1580,370 1800,410"); }
        }
        @keyframes solWave3 {
          0%, 100% { d: path("M0,500 C220,460 420,540 620,480 C820,420 1020,520 1220,460 C1420,400 1620,500 1800,460"); }
          50% { d: path("M0,480 C220,520 420,440 620,500 C820,560 1020,460 1220,520 C1420,580 1620,460 1800,500"); }
        }
      `}</style>
    </section>
  );
}
