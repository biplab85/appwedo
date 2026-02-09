import { useEffect, useRef, useState, useCallback } from 'react';
import { Container } from '../components';
import { siteContent } from '../content';

const AUTO_PLAY_DURATION = 5000; // 5 seconds per tab

export default function Problem() {
  const { headline, subheadline, painPoints } = siteContent.problem;
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [progressKey, setProgressKey] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const resumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Intersection Observer for visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (!isVisible || isPaused) {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
        autoPlayRef.current = null;
      }
      return;
    }

    autoPlayRef.current = setInterval(() => {
      setActiveTab(prev => (prev + 1) % painPoints.length);
      setProgressKey(prev => prev + 1);
    }, AUTO_PLAY_DURATION);

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isVisible, isPaused, painPoints.length]);

  // Cleanup resume timeout on unmount
  useEffect(() => {
    return () => {
      if (resumeTimeoutRef.current) {
        clearTimeout(resumeTimeoutRef.current);
      }
    };
  }, []);

  const handleTabClick = useCallback((index: number) => {
    if (index !== activeTab) {
      setActiveTab(index);
      setProgressKey(prev => prev + 1);

      // Pause auto-play on user interaction
      setIsPaused(true);

      // Clear any existing resume timeout
      if (resumeTimeoutRef.current) {
        clearTimeout(resumeTimeoutRef.current);
      }

      // Resume auto-play after 10 seconds of no interaction
      resumeTimeoutRef.current = setTimeout(() => {
        setIsPaused(false);
      }, 10000);
    }
  }, [activeTab]);

  // Handle mouse enter/leave for pausing
  const handleMouseEnter = useCallback(() => {
    setIsPaused(true);
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    // Resume auto-play after mouse leaves
    resumeTimeoutRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 2000);
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Base gradient - dark elegant */}
        <div className="absolute inset-0 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900" />

        {/* Animated gradient orbs */}
        <div
          className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full opacity-30 blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, transparent 70%)',
            animation: 'floatOrb1 15s ease-in-out infinite',
          }}
        />
        <div
          className="absolute -bottom-40 -right-40 w-[700px] h-[700px] rounded-full opacity-25 blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(79, 70, 229, 0.4) 0%, transparent 70%)',
            animation: 'floatOrb2 18s ease-in-out infinite',
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-20 blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(167, 139, 250, 0.3) 0%, transparent 70%)',
            animation: 'floatOrb3 12s ease-in-out infinite',
          }}
        />

        {/* Subtle top glow accent */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-primary-400/30 to-transparent" />

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(167, 139, 250, 0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(167, 139, 250, 0.5) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />

        {/* Radial fade overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 0%, rgba(17, 24, 39, 0.4) 100%)',
          }}
        />

        {/* Animated Abstract SVG */}
        <div className="absolute -right-20 top-1/2 -translate-y-1/2 w-[500px] h-[500px] lg:w-[700px] lg:h-[700px] opacity-[0.08]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 621"
            className="w-full h-full"
          >
            <defs>
              <linearGradient id="problemGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4F46E5" />
                <stop offset="100%" stopColor="#10B981" />
              </linearGradient>
              <linearGradient id="problemGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#10B981" />
                <stop offset="100%" stopColor="#4F46E5" />
              </linearGradient>
            </defs>
            <ellipse
              className="svg-shape-1"
              transform="matrix(0.7071 -0.7071 0.7071 0.7071 -127.7515 337.6984)"
              cx="343.8"
              cy="323.1"
              rx="293.9"
              ry="293.9"
              fill="none"
              stroke="url(#problemGrad1)"
              strokeWidth="1.5"
            />
            <path
              className="svg-shape-2"
              d="M553.7,247.9C522.7,88.6,447,3.6,287.7,34.6S24.3,219.8,55.3,379.1c31,159.3,185.3,263.4,344.6,232.4C559.2,580.6,584.7,407.2,553.7,247.9z"
              fill="none"
              stroke="url(#problemGrad2)"
              strokeWidth="1.5"
            />
            <path
              className="svg-shape-3"
              d="M475.1,228.9C444.1,69.5,447,3.6,287.7,34.6S24.3,219.8,55.3,379.1c31,159.3,185.3,263.4,344.6,232.4C559.2,580.6,506.1,388.2,475.1,228.9z"
              fill="none"
              stroke="url(#problemGrad1)"
              strokeWidth="1"
            />
            <path
              className="svg-shape-4"
              d="M396.5,209.7C365.5,50.4,447,3.5,287.7,34.5S24.3,219.7,55.2,379c31,159.3,185.3,263.4,344.6,232.4S427.5,369.1,396.5,209.7z"
              fill="none"
              stroke="url(#problemGrad2)"
              strokeWidth="0.8"
            />
            <path
              className="svg-shape-5"
              d="M317.9,190.7C287,31.3,447,3.6,287.7,34.6S24.3,219.8,55.3,379.1c31,159.3,185.3,263.4,344.6,232.4C559.2,580.6,348.9,350.1,317.9,190.7z"
              fill="none"
              stroke="url(#problemGrad1)"
              strokeWidth="0.6"
            />
          </svg>
        </div>

        {/* Second SVG on the left - mirrored */}
        <div className="absolute -left-20 top-1/2 -translate-y-1/2 w-[400px] h-[400px] lg:w-[500px] lg:h-[500px] opacity-[0.05] rotate-180">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 621"
            className="w-full h-full"
          >
            <ellipse
              className="svg-shape-1-reverse"
              transform="matrix(0.7071 -0.7071 0.7071 0.7071 -127.7515 337.6984)"
              cx="343.8"
              cy="323.1"
              rx="293.9"
              ry="293.9"
              fill="none"
              stroke="url(#problemGrad2)"
              strokeWidth="1.5"
            />
            <path
              className="svg-shape-2-reverse"
              d="M553.7,247.9C522.7,88.6,447,3.6,287.7,34.6S24.3,219.8,55.3,379.1c31,159.3,185.3,263.4,344.6,232.4C559.2,580.6,584.7,407.2,553.7,247.9z"
              fill="none"
              stroke="url(#problemGrad1)"
              strokeWidth="1"
            />
            <path
              className="svg-shape-3-reverse"
              d="M475.1,228.9C444.1,69.5,447,3.6,287.7,34.6S24.3,219.8,55.3,379.1c31,159.3,185.3,263.4,344.6,232.4C559.2,580.6,506.1,388.2,475.1,228.9z"
              fill="none"
              stroke="url(#problemGrad2)"
              strokeWidth="0.8"
            />
          </svg>
        </div>
      </div>

      <Container className="relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{
              background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.15) 0%, rgba(16, 185, 129, 0.08) 100%)',
              border: '1px solid rgba(79, 70, 229, 0.25)',
            }}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            <span className="text-sm font-medium text-primary-300">The Challenge</span>
          </div>

          <h2
            className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            {headline}
          </h2>

          <p
            className={`text-lg text-dark-300 leading-relaxed transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            {subheadline}
          </p>
        </div>

        {/* Tab-based Layout */}
        <div
          className={`transition-all duration-700 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Desktop/Tablet: Two Column Layout */}
          <div className="hidden md:grid md:grid-cols-12 gap-6 lg:gap-10">
            {/* Left Column - Tab Navigation */}
            <div className="md:col-span-5 lg:col-span-4 space-y-3">
              {painPoints.map((point, index) => {
                const Icon = point.icon;
                const isActive = activeTab === index;

                return (
                  <button
                    key={index}
                    onClick={() => handleTabClick(index)}
                    className={`group relative w-full text-left transition-all duration-500 ${
                      isActive ? 'scale-[1.02]' : 'hover:scale-[1.01]'
                    }`}
                  >

                    {/* Tab Item */}
                    <div
                      className={`relative p-5 lg:p-6 rounded-2xl transition-all duration-500 overflow-hidden ${
                        isActive ? 'active-tab-border' : 'border-white/10 hover:border-white/20'
                      }`}
                      style={{
                        background: isActive
                          ? 'transparent'
                          : 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)',
                        backdropFilter: isActive ? 'none' : 'blur(20px)',
                        border: isActive ? 'none' : '1px solid rgba(255, 255, 255, 0.1)',
                        boxShadow: isActive ? 'none' : '0 4px 16px rgba(0, 0, 0, 0.2)',
                      }}
                    >
                      {/* Progress Bar */}
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-dark-800/50 overflow-hidden">
                        <div
                          key={`progress-${index}-${progressKey}`}
                          className={`h-full transition-all ease-linear ${
                            isActive ? 'tab-progress-bar' : 'w-0'
                          }`}
                          style={{
                            background: 'linear-gradient(90deg, #4F46E5 0%, #10B981 100%)',
                          }}
                        />
                      </div>

                      <div className="flex items-center gap-4">
                        {/* Icon */}
                        <div
                          className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500 ${
                            isActive ? 'scale-110' : 'group-hover:scale-105'
                          }`}
                          style={{
                            background: isActive
                              ? 'linear-gradient(135deg, rgba(79, 70, 229, 0.3) 0%, rgba(16, 185, 129, 0.2) 100%)'
                              : 'linear-gradient(135deg, rgba(79, 70, 229, 0.15) 0%, rgba(16, 185, 129, 0.08) 100%)',
                            border: '1px solid',
                            borderColor: isActive ? 'rgba(79, 70, 229, 0.4)' : 'rgba(79, 70, 229, 0.2)',
                            boxShadow: isActive ? '0 4px 20px rgba(79, 70, 229, 0.3)' : 'none',
                          }}
                        >
                          <Icon
                            className={`w-5 h-5 transition-all duration-500 ${
                              isActive ? 'text-secondary-400' : 'text-primary-300 group-hover:text-primary-200'
                            }`}
                          />
                        </div>

                        {/* Title */}
                        <div className="flex-1 min-w-0">
                          <h3
                            className={`font-semibold leading-snug transition-colors duration-300 ${
                              isActive ? 'text-white' : 'text-dark-300 group-hover:text-white'
                            }`}
                            style={{ fontSize: '16px' }}
                          >
                            {point.title}
                          </h3>
                        </div>

                        {/* Arrow indicator */}
                        <div
                          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 ${
                            isActive
                              ? 'bg-primary/20 rotate-0'
                              : 'bg-white/5 -rotate-90 group-hover:bg-white/10'
                          }`}
                        >
                          <svg
                            className={`w-4 h-4 transition-colors duration-300 ${
                              isActive ? 'text-primary-300' : 'text-dark-400'
                            }`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right Column - Tab Content */}
            <div className="md:col-span-7 lg:col-span-8">
              <div
                className="relative h-full rounded-3xl overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                }}
              >
                {/* Content glow */}
                <div
                  className="absolute -top-20 -right-20 w-[300px] h-[300px] rounded-full opacity-30 blur-3xl pointer-events-none"
                  style={{
                    background: 'radial-gradient(circle, rgba(79, 70, 229, 0.4) 0%, transparent 70%)',
                  }}
                />

                {/* Tab Content */}
                {painPoints.map((point, index) => {
                  const Icon = point.icon;
                  const isActive = activeTab === index;

                  return (
                    <div
                      key={index}
                      className={`absolute inset-0 p-8 lg:p-12 flex flex-col justify-center transition-all duration-500 ${
                        isActive
                          ? 'opacity-100 translate-x-0 pointer-events-auto'
                          : 'opacity-0 translate-x-8 pointer-events-none'
                      }`}
                    >
                      {/* Large Icon */}
                      <div className="mb-8">
                        <div
                          className="w-20 h-20 lg:w-24 lg:h-24 rounded-2xl flex items-center justify-center"
                          style={{
                            background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.2) 0%, rgba(16, 185, 129, 0.1) 100%)',
                            border: '1px solid rgba(79, 70, 229, 0.3)',
                            boxShadow: '0 8px 32px rgba(79, 70, 229, 0.2)',
                          }}
                        >
                          <Icon className="w-10 h-10 lg:w-12 lg:h-12 text-primary-300" />
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="font-bold text-white mb-6 leading-tight" style={{ fontSize: '16px' }}>
                        {point.title}
                      </h3>

                      {/* Description */}
                      <p className="text-dark-300 leading-relaxed max-w-2xl" style={{ fontSize: '14px' }}>
                        {point.description}
                      </p>

                      {/* Decorative elements */}
                      <div className="mt-10 flex items-center gap-4">
                        <div className="h-px flex-1 bg-gradient-to-r from-primary/40 to-transparent" />
                        <span className="text-sm text-dark-500 font-medium">
                          {String(index + 1).padStart(2, '0')} / {String(painPoints.length).padStart(2, '0')}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Mobile: Accordion Style */}
          <div className="md:hidden space-y-4">
            {painPoints.map((point, index) => {
              const Icon = point.icon;
              const isActive = activeTab === index;

              return (
                <div
                  key={index}
                  className="relative"
                >

                  <div
                    className={`relative rounded-2xl overflow-hidden transition-all duration-500 ${
                      isActive ? 'active-tab-border' : ''
                    }`}
                    style={{
                      background: isActive
                        ? 'transparent'
                        : 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)',
                      backdropFilter: isActive ? 'none' : 'blur(20px)',
                      border: isActive ? 'none' : '1px solid rgba(255, 255, 255, 0.1)',
                      boxShadow: isActive ? 'none' : '0 4px 16px rgba(0, 0, 0, 0.2)',
                    }}
                  >
                    {/* Progress Bar */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-dark-800/50 overflow-hidden">
                      <div
                        key={`mobile-progress-${index}-${progressKey}`}
                        className={`h-full transition-all ease-linear ${
                          isActive ? 'tab-progress-bar' : 'w-0'
                        }`}
                        style={{
                          background: 'linear-gradient(90deg, #4F46E5 0%, #10B981 100%)',
                        }}
                      />
                    </div>

                    {/* Tab Header */}
                    <button
                      onClick={() => handleTabClick(index)}
                      className="w-full p-5 flex items-center gap-4 text-left"
                    >
                      {/* Icon */}
                      <div
                        className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500 ${
                          isActive ? 'scale-110' : ''
                        }`}
                        style={{
                          background: isActive
                            ? 'linear-gradient(135deg, rgba(79, 70, 229, 0.3) 0%, rgba(16, 185, 129, 0.2) 100%)'
                            : 'linear-gradient(135deg, rgba(79, 70, 229, 0.15) 0%, rgba(16, 185, 129, 0.08) 100%)',
                          border: '1px solid',
                          borderColor: isActive ? 'rgba(79, 70, 229, 0.4)' : 'rgba(79, 70, 229, 0.2)',
                        }}
                      >
                        <Icon
                          className={`w-5 h-5 transition-colors duration-300 ${
                            isActive ? 'text-secondary-400' : 'text-primary-300'
                          }`}
                        />
                      </div>

                      {/* Title */}
                      <h3
                        className={`flex-1 font-semibold leading-snug transition-colors duration-300 ${
                          isActive ? 'text-white' : 'text-dark-300'
                        }`}
                        style={{ fontSize: '16px' }}
                      >
                        {point.title}
                      </h3>

                      {/* Arrow */}
                      <div
                        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 ${
                          isActive ? 'bg-primary/20 rotate-90' : 'bg-white/5'
                        }`}
                      >
                        <svg
                          className={`w-4 h-4 transition-colors duration-300 ${
                            isActive ? 'text-primary-300' : 'text-dark-400'
                          }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </button>

                    {/* Tab Content - Collapsible */}
                    <div
                      className={`overflow-hidden transition-all duration-500 ${
                        isActive ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <div className="px-5 pb-6 pt-0">
                        <div className="h-px bg-gradient-to-r from-primary/30 via-secondary/20 to-transparent mb-5" />
                        <p className="text-dark-300 leading-relaxed" style={{ fontSize: '14px' }}>
                          {point.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>

      {/* CSS Animations */}
      <style>{`
        @keyframes floatOrb1 {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -30px) scale(1.05);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.95);
          }
        }

        @keyframes floatOrb2 {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(-40px, 30px) scale(1.1);
          }
          66% {
            transform: translate(30px, -40px) scale(0.9);
          }
        }

        @keyframes floatOrb3 {
          0%, 100% {
            transform: translate(-50%, -50%) scale(1) rotate(0deg);
          }
          50% {
            transform: translate(-50%, -50%) scale(1.15) rotate(180deg);
          }
        }

        /* Tab Progress Bar Animation */
        @keyframes progressFill {
          0% {
            width: 0%;
          }
          100% {
            width: 100%;
          }
        }

        .tab-progress-bar {
          animation: progressFill 5s ease-out forwards;
        }

        /* Active Tab Gradient Border */
        .active-tab-border {
          position: relative;
          border: none !important;
        }

        .active-tab-border::before {
          content: '';
          position: absolute;
          inset: 0;
          padding: 2px;
          border-radius: 1rem;
          background: linear-gradient(135deg, #4F46E5 0%, #10B981 50%, #8B5CF6 100%);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
        }

        /* SVG Shape Animations */
        @keyframes rotateSlow {
          0% {
            transform: rotate(0deg);
            transform-origin: center center;
          }
          100% {
            transform: rotate(360deg);
            transform-origin: center center;
          }
        }

        @keyframes rotateReverse {
          0% {
            transform: rotate(360deg);
            transform-origin: center center;
          }
          100% {
            transform: rotate(0deg);
            transform-origin: center center;
          }
        }

        @keyframes pulsePath {
          0%, 100% {
            opacity: 0.6;
            stroke-width: 1.5;
          }
          50% {
            opacity: 1;
            stroke-width: 2;
          }
        }

        @keyframes drawPath {
          0% {
            stroke-dashoffset: 2000;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }

        .svg-shape-1 {
          animation: rotateSlow 60s linear infinite, pulsePath 8s ease-in-out infinite;
          stroke-dasharray: 2000;
          animation: drawPath 4s ease-out forwards, rotateSlow 60s linear infinite;
        }

        .svg-shape-2 {
          animation: rotateReverse 80s linear infinite;
          opacity: 0.8;
        }

        .svg-shape-3 {
          animation: rotateSlow 70s linear infinite;
          opacity: 0.6;
        }

        .svg-shape-4 {
          animation: rotateReverse 90s linear infinite;
          opacity: 0.5;
        }

        .svg-shape-5 {
          animation: rotateSlow 100s linear infinite;
          opacity: 0.4;
        }

        .svg-shape-1-reverse {
          animation: rotateReverse 65s linear infinite;
        }

        .svg-shape-2-reverse {
          animation: rotateSlow 85s linear infinite;
          opacity: 0.7;
        }

        .svg-shape-3-reverse {
          animation: rotateReverse 75s linear infinite;
          opacity: 0.5;
        }
      `}</style>
    </section>
  );
}
