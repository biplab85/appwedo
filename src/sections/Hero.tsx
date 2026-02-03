import { useEffect, useState } from 'react';
import { ArrowRight, Play, Monitor, Smartphone, Link2 } from 'lucide-react';
import { Container } from '../components';
import { siteContent } from '../content';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { EffectCube, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-cube';

export default function Hero() {
  const { headline, subheadline, primaryCTA, secondaryCTA, socialProof, slides } =
    siteContent.hero;

  const [isLoaded, setIsLoaded] = useState(false);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

  useEffect(() => {
    // Trigger entrance animations
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Handle slide navigation button click
  const handleSlideNavClick = (index: number) => {
    if (swiperInstance) {
      swiperInstance.slideToLoop(index);
    }
  };

  // Get icon for slide type
  const getSlideIcon = (type: string) => {
    switch (type) {
      case 'web':
        return Monitor;
      case 'mobile':
        return Smartphone;
      case 'api':
        return Link2;
      default:
        return Monitor;
    }
  };

  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-dark-50 via-white to-primary/5" />

        {/* Animated gradient orbs */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl animate-float-slow" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-secondary/15 to-transparent rounded-full blur-3xl animate-float-slower" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-accent/10 to-transparent rounded-full blur-3xl animate-pulse-slow" />

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(79, 70, 229, 0.3) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(79, 70, 229, 0.3) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />

        {/* Animated SVG waves */}
        <svg
          className="absolute bottom-0 left-0 right-0 w-full h-48 opacity-30"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            className="animate-wave"
            fill="url(#gradient1)"
            d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,128C672,107,768,117,864,149.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
          <path
            className="animate-wave-slow"
            fill="url(#gradient2)"
            d="M0,256L48,240C96,224,192,192,288,181.3C384,171,480,181,576,197.3C672,213,768,235,864,229.3C960,224,1056,192,1152,181.3C1248,171,1344,181,1392,186.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#4F46E5" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#10B981" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10B981" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#4F46E5" stopOpacity="0.08" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <Container className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left Column - Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div
              className={`inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6 transition-all duration-700 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              <span className="text-sm font-medium text-primary">Full-Stack Development Agency</span>
            </div>

            {/* Headline with word-by-word animation */}
            <h1
              className={`text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] mb-6 transition-all duration-700 delay-100 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              {headline.split(' ').map((word, i) => {
                const isHighlight = word === 'Apps' || word === 'Build';
                return (
                  <span
                    key={i}
                    className={`inline-block mr-[0.25em] ${
                      isHighlight
                        ? 'bg-gradient-to-r from-primary via-primary-600 to-secondary bg-clip-text text-transparent animate-gradient-text'
                        : 'text-dark-800'
                    }`}
                    style={{
                      animationDelay: `${i * 0.05}s`,
                    }}
                  >
                    {word}
                  </span>
                );
              })}
            </h1>

            {/* Subheadline */}
            <p
              className={`text-lg sm:text-xl text-dark-500 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed transition-all duration-700 delay-200 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              {subheadline}
            </p>

            {/* CTAs */}
            <div
              className={`flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12 transition-all duration-700 delay-300 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              {/* Primary CTA */}
              <a
                href="#contact"
                className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 overflow-hidden rounded-2xl font-semibold text-white transition-all duration-300 hover:scale-105"
              >
                {/* Gradient background */}
                <span className="absolute inset-0 bg-gradient-to-r from-primary via-primary-600 to-primary bg-[length:200%_100%] group-hover:bg-[length:100%_100%] transition-all duration-500" />

                {/* Glow */}
                <span className="absolute -inset-2 bg-gradient-to-r from-primary/40 to-secondary/40 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Shine */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

                <span className="relative z-10">{primaryCTA}</span>
                <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </a>

              {/* Secondary CTA */}
              <a
                href="#products"
                className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-semibold transition-all duration-300 hover:scale-105"
              >
                {/* Border gradient */}
                <span className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/20 to-secondary/20 p-[2px]">
                  <span className="absolute inset-[2px] bg-white rounded-[14px]" />
                </span>

                {/* Hover fill */}
                <span className="absolute inset-[2px] rounded-[14px] bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <Play className="relative z-10 w-5 h-5 text-primary group-hover:scale-110 transition-transform duration-300" />
                <span className="relative z-10 text-dark-700 group-hover:text-dark-900">{secondaryCTA}</span>
              </a>
            </div>

            {/* Social Proof */}
            <div
              className={`flex flex-wrap gap-8 justify-center lg:justify-start transition-all duration-700 delay-400 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              {socialProof.map((stat, index) => (
                <div
                  key={index}
                  className="group text-center lg:text-left"
                >
                  <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary to-primary-600 bg-clip-text text-transparent group-hover:from-secondary group-hover:to-secondary-600 transition-all duration-300">
                    {stat.value}
                  </div>
                  <div className="text-sm text-dark-500 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Visual */}
          <div
            className={`relative transition-all duration-1000 delay-500 ${
              isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
          >
            {/* Floating decorative elements */}
            <div className="absolute -top-8 -left-8 w-24 h-24 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-2xl animate-float" />
            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-gradient-to-br from-secondary/20 to-transparent rounded-full blur-2xl animate-float-slow" />

            {/* Main visual container */}
            <div className="relative">
              {/* Connection lines SVG */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none z-20"
                viewBox="0 0 400 400"
              >
                {/* Animated data flow lines */}
                <path
                  d="M50,200 Q200,100 350,200"
                  fill="none"
                  stroke="url(#lineGradient)"
                  strokeWidth="2"
                  strokeDasharray="8,4"
                  className="animate-dash"
                  opacity="0.3"
                />
                <path
                  d="M50,250 Q200,350 350,250"
                  fill="none"
                  stroke="url(#lineGradient2)"
                  strokeWidth="2"
                  strokeDasharray="8,4"
                  className="animate-dash-reverse"
                  opacity="0.3"
                />

                {/* Data points */}
                <circle cx="50" cy="200" r="4" fill="#4F46E5" className="animate-pulse" />
                <circle cx="350" cy="200" r="4" fill="#10B981" className="animate-pulse" />
                <circle cx="200" cy="200" r="6" fill="#F59E0B" className="animate-ping-slow" />

                <defs>
                  <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#4F46E5" />
                    <stop offset="100%" stopColor="#10B981" />
                  </linearGradient>
                  <linearGradient id="lineGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#10B981" />
                    <stop offset="100%" stopColor="#F59E0B" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Swiper Carousel - No pagination, no navigation arrows */}
              <div className="relative">
                <Swiper
                  modules={[EffectCube, Autoplay]}
                  effect="cube"
                  grabCursor={true}
                  cubeEffect={{
                    shadow: true,
                    slideShadows: true,
                    shadowOffset: 20,
                    shadowScale: 0.94,
                  }}
                  autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                  }}
                  loop={true}
                  onSwiper={setSwiperInstance}
                  onSlideChange={(swiper) => setActiveSlideIndex(swiper.realIndex)}
                >
                  {slides.map((slide) => {
                    const SlideIcon = getSlideIcon(slide.type);
                    return (
                      <SwiperSlide key={slide.id}>
                        <div className="group relative bg-white rounded-3xl shadow-2xl shadow-dark-900/10 overflow-hidden border border-dark-100 hover:border-primary/20 transition-all duration-500 hover:shadow-primary/10">
                          {/* Mockup Header */}
                          <div className="flex items-center justify-between p-4 border-b border-dark-100 bg-dark-50/50">
                            <div className="flex items-center gap-3">
                              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                                slide.type === 'web' ? 'bg-primary/10' :
                                slide.type === 'mobile' ? 'bg-secondary/10' : 'bg-accent/10'
                              }`}>
                                <SlideIcon className={`w-5 h-5 ${
                                  slide.type === 'web' ? 'text-primary' :
                                  slide.type === 'mobile' ? 'text-secondary' : 'text-accent'
                                }`} />
                              </div>
                              <div>
                                <div className="font-semibold text-dark-800 text-sm">{slide.title}</div>
                                <div className="text-xs text-dark-400">{slide.description}</div>
                              </div>
                            </div>
                            <div className="flex gap-1.5">
                              <div className="w-3 h-3 rounded-full bg-red-400" />
                              <div className="w-3 h-3 rounded-full bg-yellow-400" />
                              <div className="w-3 h-3 rounded-full bg-green-400" />
                            </div>
                          </div>

                          {/* Mockup Content */}
                          <div className="p-6 bg-gradient-to-br from-dark-800 to-dark-900 h-[400px]">
                            {slide.type === 'web' && (
                              <div className="space-y-4">
                                <div className="flex gap-4">
                                  <div className="w-1/3 space-y-3">
                                    <div className="h-3 bg-dark-600 rounded animate-pulse" />
                                    <div className="h-3 bg-dark-700 rounded w-4/5" />
                                    <div className="h-3 bg-dark-700 rounded w-3/5" />
                                    <div className="h-20 bg-primary/20 rounded-lg mt-4" />
                                    <div className="h-20 bg-secondary/20 rounded-lg" />
                                  </div>
                                  <div className="flex-1 space-y-3">
                                    <div className="h-32 bg-gradient-to-br from-primary/30 to-primary/10 rounded-xl" />
                                    <div className="grid grid-cols-3 gap-2">
                                      <div className="h-16 bg-dark-700 rounded-lg" />
                                      <div className="h-16 bg-secondary/20 rounded-lg" />
                                      <div className="h-16 bg-accent/20 rounded-lg" />
                                    </div>
                                    <div className="h-4 bg-dark-600 rounded w-3/4" />
                                    <div className="h-4 bg-dark-700 rounded w-1/2" />
                                  </div>
                                </div>
                              </div>
                            )}

                            {slide.type === 'mobile' && (
                              <div className="flex justify-center">
                                <div className="w-48 bg-dark-700 rounded-3xl p-3 border-4 border-dark-600">
                                  <div className="w-20 h-1 bg-dark-500 rounded mx-auto mb-3" />
                                  <div className="space-y-3">
                                    <div className="h-24 bg-gradient-to-br from-secondary/40 to-secondary/20 rounded-xl flex items-center justify-center">
                                      <img src="/images/appwedo-logo.png" alt="AppWeDo" className="h-10 w-auto object-contain" />
                                    </div>
                                    <div className="h-3 bg-dark-500 rounded w-3/4" />
                                    <div className="h-3 bg-dark-600 rounded w-1/2" />
                                    <div className="grid grid-cols-2 gap-2 mt-4">
                                      <div className="h-16 bg-primary/20 rounded-lg" />
                                      <div className="h-16 bg-accent/20 rounded-lg" />
                                    </div>
                                    <div className="h-10 bg-secondary rounded-lg mt-4" />
                                  </div>
                                </div>
                              </div>
                            )}

                            {slide.type === 'api' && (
                              <div className="space-y-4">
                                <div className="flex items-center gap-2 bg-dark-700 rounded-lg p-3">
                                  <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs font-mono rounded">GET</span>
                                  <span className="text-dark-300 text-sm font-mono">/api/v1/users</span>
                                </div>
                                <div className="bg-dark-700/50 rounded-lg p-4 font-mono text-sm">
                                  <div className="text-primary">{'{'}</div>
                                  <div className="ml-4 text-secondary">"status"<span className="text-dark-400">:</span> <span className="text-green-400">"success"</span><span className="text-dark-400">,</span></div>
                                  <div className="ml-4 text-secondary">"data"<span className="text-dark-400">:</span> <span className="text-accent">{'['}</span></div>
                                  <div className="ml-8 text-dark-500">...</div>
                                  <div className="ml-4 text-accent">{']'}</div>
                                  <div className="text-primary">{'}'}</div>
                                </div>
                                <div className="flex items-center justify-between bg-dark-700/30 rounded-lg p-3">
                                  <span className="text-dark-400 text-sm">Response Time</span>
                                  <span className="text-green-400 text-sm font-semibold">45ms</span>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </SwiperSlide>
                    );
                  })}
                </Swiper>

                {/* Slide Navigation Buttons */}
                <div className="flex justify-center gap-2 sm:gap-3 mt-6">
                  {slides.map((slide, index) => {
                    const SlideIcon = getSlideIcon(slide.type);
                    const isActive = activeSlideIndex === index;
                    return (
                      <button
                        key={slide.id}
                        onClick={() => handleSlideNavClick(index)}
                        className={`group relative flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all duration-300 ${
                          isActive
                            ? 'bg-gradient-to-r from-primary to-primary-600 text-white shadow-lg shadow-primary/25'
                            : 'bg-white text-dark-600 border border-dark-200 hover:border-primary/30 hover:bg-primary/5'
                        }`}
                      >
                        <SlideIcon className={`w-4 h-4 transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
                        <span className="hidden sm:inline">{slide.title}</span>
                        {isActive && (
                          <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Floating status card - Fixed position to avoid overlap */}
            <div className="absolute top-2 right-2 sm:-top-2 sm:-right-2 lg:top-4 lg:-right-8 bg-white rounded-2xl shadow-xl p-3 sm:p-4 border border-dark-100 animate-float z-30">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <div className="w-3 h-3 sm:w-4 sm:h-4 bg-green-500 rounded-full animate-pulse" />
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-semibold text-dark-800">Live & Connected</div>
                  <div className="text-[10px] sm:text-xs text-dark-400">All systems operational</div>
                </div>
              </div>
            </div>

            {/* Floating metric card - Fixed position to avoid overlap */}
            <div className="absolute bottom-[-50px] left-2 sm:-bottom-2 sm:-left-2 lg:bottom-10 lg:-left-8 bg-white rounded-2xl shadow-xl p-3 sm:p-4 border border-dark-100 animate-float-slow z-30">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <span className="text-primary font-bold text-sm sm:text-base">99%</span>
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-semibold text-dark-800">Uptime</div>
                  <div className="text-[10px] sm:text-xs text-dark-400">Enterprise reliability</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* CSS Animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        @keyframes float-slower {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
        @keyframes wave {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes wave-slow {
          0% { transform: translateX(0); }
          100% { transform: translateX(50%); }
        }
        @keyframes dash {
          0% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -24; }
        }
        @keyframes dash-reverse {
          0% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: 24; }
        }
        @keyframes ping-slow {
          0% { transform: scale(1); opacity: 1; }
          75%, 100% { transform: scale(1.5); opacity: 0; }
        }
        @keyframes gradient-text {
          0%, 100% { background-size: 200% 200%; background-position: left center; }
          50% { background-size: 200% 200%; background-position: right center; }
        }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-float-slow { animation: float-slow 4s ease-in-out infinite; }
        .animate-float-slower { animation: float-slower 5s ease-in-out infinite; }
        .animate-pulse-slow { animation: pulse-slow 4s ease-in-out infinite; }
        .animate-wave { animation: wave 8s linear infinite; }
        .animate-wave-slow { animation: wave-slow 10s linear infinite; }
        .animate-dash { animation: dash 2s linear infinite; }
        .animate-dash-reverse { animation: dash-reverse 2s linear infinite; }
        .animate-ping-slow { animation: ping-slow 2s ease-in-out infinite; }
        .animate-gradient-text { animation: gradient-text 3s ease infinite; background-size: 200% 200%; }
      `}</style>
    </section>
  );
}
