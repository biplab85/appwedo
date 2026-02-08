import { useCallback, useEffect, useRef, useState } from 'react';
import { Container } from '../components';
import { siteContent } from '../content';
import { Sparkles, PhoneCall, FileText, Code2, Rocket } from 'lucide-react';

const stepIcons = [PhoneCall, FileText, Code2, Rocket];

const stepAccents = [
  { color: '#6366F1', rgb: '99,102,241', label: 'Discover' },
  { color: '#14B8A6', rgb: '20,184,166', label: 'Plan' },
  { color: '#A855F7', rgb: '168,85,247', label: 'Build' },
  { color: '#F59E0B', rgb: '245,158,11', label: 'Ship' },
];

export default function ActionPlan() {
  const { label, headline, subheadline, steps } = siteContent.actionPlan;
  const sectionRef = useRef<HTMLElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);
  const currentPos = useRef({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [drawProgress, setDrawProgress] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  /* Animate the connecting path */
  useEffect(() => {
    if (!isVisible) return;
    let start: number | null = null;
    const duration = 2200;
    const ease = (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    const tick = (ts: number) => {
      if (!start) start = ts;
      const t = Math.min((ts - start) / duration, 1);
      setDrawProgress(ease(t));
      if (t < 1) requestAnimationFrame(tick);
    };
    const timer = setTimeout(() => requestAnimationFrame(tick), 500);
    return () => clearTimeout(timer);
  }, [isVisible]);

  /* Spotlight mouse-follow with smooth lerp */
  const handleMouseMove = useCallback((e: MouseEvent) => {
    const section = sectionRef.current;
    if (!section) return;
    const rect = section.getBoundingClientRect();
    mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    section.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      const dx = mouseRef.current.x - currentPos.current.x;
      const dy = mouseRef.current.y - currentPos.current.y;
      currentPos.current.x += dx * 0.08;
      currentPos.current.y += dy * 0.08;

      if (spotlightRef.current) {
        spotlightRef.current.style.transform = `translate(${currentPos.current.x - 300}px, ${currentPos.current.y - 300}px)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => {
      section.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, [handleMouseMove]);

  return (
    <section ref={sectionRef} id="howItWork" className="relative py-24 lg:py-36 overflow-hidden">
      {/* ===== Background — distinct from Benefits ===== */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Deep teal-navy base gradient */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(145deg, #06101a 0%, #0a1628 30%, #0d1f2d 60%, #081318 100%)' }} />

        {/* Animated circuit-board SVG pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="apCircuit" width="120" height="120" patternUnits="userSpaceOnUse">
              <path d="M0 60h40v-20h20v40h20v-20h40" fill="none" stroke="rgba(99,102,241,0.8)" strokeWidth="0.5" />
              <path d="M60 0v30h-20v20h40v30h20v-20h20" fill="none" stroke="rgba(20,184,166,0.6)" strokeWidth="0.5" />
              <circle cx="40" cy="60" r="2" fill="rgba(99,102,241,0.5)" />
              <circle cx="60" cy="30" r="2" fill="rgba(20,184,166,0.4)" />
              <circle cx="80" cy="60" r="1.5" fill="rgba(168,85,247,0.5)" />
              <circle cx="60" cy="80" r="1.5" fill="rgba(245,158,11,0.4)" />
              <circle cx="100" cy="80" r="2" fill="rgba(99,102,241,0.3)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#apCircuit)" />
        </svg>

        {/* Diagonal accent slashes */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -left-1/4 w-[120%] h-[200%] opacity-[0.03] ap-diag-rotate"
            style={{
              background: 'repeating-linear-gradient(45deg, transparent, transparent 80px, rgba(99,102,241,0.3) 80px, rgba(99,102,241,0.3) 81px)',
            }}
          />
        </div>

        {/* Spotlight that follows cursor */}
        <div
          ref={spotlightRef}
          className="absolute w-[600px] h-[600px] rounded-full opacity-[0.07] transition-opacity duration-1000"
          style={{
            background: 'radial-gradient(circle, rgba(99,102,241,0.5) 0%, rgba(20,184,166,0.2) 40%, transparent 70%)',
            filter: 'blur(40px)',
            willChange: 'transform',
          }}
        />

        {/* Horizon glow at bottom */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[300px] opacity-[0.08]"
          style={{ background: 'linear-gradient(0deg, rgba(20,184,166,0.4) 0%, transparent 100%)' }}
        />

        {/* Top-right corner accent */}
        <div
          className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full opacity-[0.06] blur-[120px] ap-corner-pulse"
          style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.6) 0%, transparent 70%)' }}
        />
      </div>

      {/* ===== Content ===== */}
      <Container className="relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <div
            className={`inline-flex items-center gap-2 px-5 py-2 rounded-full mb-6 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{
              background: 'linear-gradient(135deg, rgba(20,184,166,0.15) 0%, rgba(99,102,241,0.1) 100%)',
              border: '1px solid rgba(20,184,166,0.25)',
            }}
          >
            <Sparkles className="w-4 h-4" style={{ color: '#5EEAD4' }} />
            <span className="text-sm font-semibold" style={{ color: '#99F6E4' }}>{label}</span>
          </div>

          <h2
            className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-5 leading-snug sm:leading-relaxed lg:leading-[1.3] transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            {headline}
          </h2>

          <p
            className={`text-lg leading-relaxed transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ color: 'rgba(255,255,255,0.55)' }}
          >
            {subheadline}
          </p>
        </div>

        {/* ===== Steps ===== */}
        <div className="relative">

          {/* Desktop horizontal animated connector (lg+) */}
          <div className="hidden lg:block absolute top-[11px] left-[calc(12.5%+12px)] right-[calc(12.5%+12px)] h-[3px] z-0">
            <div className="absolute inset-0 rounded-full" style={{ background: 'rgba(255,255,255,0.04)' }} />
            <div
              className="absolute inset-y-0 left-0 rounded-full"
              style={{
                width: `${drawProgress * 100}%`,
                background: 'linear-gradient(90deg, #6366F1, #14B8A6, #A855F7, #F59E0B)',
                boxShadow: '0 0 24px rgba(99,102,241,0.35), 0 0 48px rgba(20,184,166,0.15)',
              }}
            />
            {drawProgress > 0.01 && drawProgress < 0.99 && (
              <div
                className="absolute top-1/2 w-2.5 h-2.5 rounded-full"
                style={{
                  left: `${drawProgress * 100}%`,
                  transform: 'translate(-50%, -50%)',
                  background: '#fff',
                  boxShadow: '0 0 10px rgba(255,255,255,0.9), 0 0 28px rgba(99,102,241,0.5)',
                }}
              />
            )}
          </div>

          {/* Mobile vertical connector */}
          <div className="lg:hidden absolute left-[39px] sm:left-[47px] top-[80px] bottom-[80px] w-[3px] z-0">
            <div className="absolute inset-0 rounded-full" style={{ background: 'rgba(255,255,255,0.04)' }} />
            <div
              className="absolute inset-x-0 top-0 rounded-full"
              style={{
                height: `${drawProgress * 100}%`,
                background: 'linear-gradient(180deg, #6366F1, #14B8A6, #A855F7, #F59E0B)',
                boxShadow: '0 0 16px rgba(99,102,241,0.25)',
              }}
            />
          </div>

          {/* Steps grid */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-0 lg:gap-5">
            {steps.map((step, index) => {
              const accent = stepAccents[index];
              const StepIcon = stepIcons[index];
              const isActive = activeStep === index;
              const stepRevealed = isVisible && drawProgress > index * 0.22;

              return (
                <div
                  key={index}
                  className={`relative z-10 transition-all duration-700 flex flex-col ${
                    stepRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${400 + index * 180}ms` }}
                  onMouseEnter={() => setActiveStep(index)}
                  onMouseLeave={() => setActiveStep(null)}
                >
                  {/* ——— Mobile / Tablet layout ——— */}
                  <div className="lg:hidden py-4">
                    <div className="flex gap-4 sm:gap-5">
                      {/* Number node on the timeline */}
                      <div className="relative flex-shrink-0 z-10">
                        <div
                          className="w-[56px] h-[56px] sm:w-[64px] sm:h-[64px] rounded-2xl flex items-center justify-center transition-all duration-500"
                          style={{
                            background: isActive
                              ? `linear-gradient(135deg, ${accent.color}, ${accent.color}bb)`
                              : `rgba(${accent.rgb}, 0.08)`,
                            border: `2px solid ${isActive ? accent.color : `rgba(${accent.rgb}, 0.2)`}`,
                            boxShadow: isActive
                              ? `0 8px 28px rgba(${accent.rgb}, 0.35)`
                              : 'none',
                          }}
                        >
                          <span
                            className="text-xl sm:text-2xl font-bold transition-colors duration-500"
                            style={{ color: isActive ? '#fff' : accent.color }}
                          >
                            0{step.number}
                          </span>
                        </div>
                      </div>

                      {/* Card body */}
                      <div
                        className="flex-1 min-w-0 rounded-xl p-4 sm:p-5 transition-all duration-500"
                        style={{
                          background: isActive
                            ? `linear-gradient(160deg, rgba(${accent.rgb}, 0.08) 0%, rgba(255,255,255,0.03) 100%)`
                            : 'rgba(255,255,255,0.025)',
                          border: `1px solid ${isActive ? `rgba(${accent.rgb}, 0.25)` : 'rgba(255,255,255,0.04)'}`,
                          boxShadow: isActive
                            ? `0 12px 32px -8px rgba(0,0,0,0.4)`
                            : 'none',
                        }}
                      >
                        <div className="flex items-center gap-2 mb-2.5">
                          <StepIcon className="w-4 h-4 flex-shrink-0" style={{ color: accent.color }} />
                          <span className="text-[11px] font-bold uppercase tracking-[0.12em]" style={{ color: accent.color }}>
                            {accent.label}
                          </span>
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold text-white mb-2 leading-snug">{step.title}</h3>
                        <p
                          className="text-sm leading-relaxed transition-colors duration-500"
                          style={{ color: isActive ? 'rgba(255,255,255,0.72)' : 'rgba(255,255,255,0.42)' }}
                        >
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* ——— Desktop layout — single unified card ——— */}
                  <div className="hidden lg:flex lg:flex-col lg:flex-1">
                    {/* Timeline node dot */}
                    <div className="flex justify-center mb-0">
                      <div className="relative">
                        {/* Outer ring */}
                        <div
                          className="absolute inset-[-6px] rounded-full transition-all duration-700"
                          style={{
                            border: `1.5px solid rgba(${accent.rgb}, ${isActive ? 0.35 : 0})`,
                            transform: isActive ? 'scale(1)' : 'scale(0.7)',
                            opacity: isActive ? 1 : 0,
                          }}
                        />
                        <div
                          className="relative w-[24px] h-[24px] rounded-full flex items-center justify-center transition-all duration-500"
                          style={{
                            background: isActive
                              ? accent.color
                              : `rgba(${accent.rgb}, 0.2)`,
                            border: `2px solid ${isActive ? accent.color : `rgba(${accent.rgb}, 0.25)`}`,
                            boxShadow: isActive
                              ? `0 0 16px rgba(${accent.rgb}, 0.5)`
                              : 'none',
                          }}
                        >
                          <div
                            className="w-2 h-2 rounded-full transition-colors duration-500"
                            style={{ background: isActive ? '#fff' : `rgba(${accent.rgb}, 0.5)` }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Vertical connector from dot to card */}
                    <div className="flex justify-center">
                      <div
                        className="w-[1px] h-5 transition-colors duration-500"
                        style={{ background: isActive ? `rgba(${accent.rgb}, 0.4)` : 'rgba(255,255,255,0.06)' }}
                      />
                    </div>

                    {/* Card — equal height via flex-grow */}
                    <div
                      className="relative rounded-2xl overflow-hidden transition-all duration-500 cursor-default flex-1 flex flex-col"
                      style={{
                        background: isActive
                          ? `linear-gradient(170deg, rgba(${accent.rgb}, 0.09) 0%, rgba(255,255,255,0.035) 50%, rgba(${accent.rgb}, 0.04) 100%)`
                          : 'linear-gradient(170deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.015) 100%)',
                        border: `1px solid ${isActive ? `rgba(${accent.rgb}, 0.3)` : 'rgba(255,255,255,0.06)'}`,
                        backdropFilter: 'blur(16px)',
                        WebkitBackdropFilter: 'blur(16px)',
                        boxShadow: isActive
                          ? `0 20px 48px -12px rgba(0,0,0,0.5), 0 0 0 1px rgba(${accent.rgb}, 0.06), 0 0 40px -15px rgba(${accent.rgb}, 0.12)`
                          : '0 2px 12px -2px rgba(0,0,0,0.2)',
                        transform: isActive ? 'translateY(-6px)' : 'translateY(0)',
                      }}
                    >
                      {/* Top glow on hover */}
                      <div
                        className="absolute -top-16 left-1/2 -translate-x-1/2 w-[180px] h-[100px] rounded-full blur-[50px] transition-opacity duration-700 pointer-events-none"
                        style={{
                          background: `radial-gradient(ellipse, rgba(${accent.rgb}, 0.5) 0%, transparent 70%)`,
                          opacity: isActive ? 0.2 : 0,
                        }}
                      />

                      <div className="relative p-6 pt-7 pb-7 flex flex-col flex-1">
                        {/* Step number badge — prominent on load, fills on hover */}
                        <div className="mb-5">
                          <div
                            className="relative w-[72px] h-[72px] rounded-2xl flex items-center justify-center overflow-hidden transition-all duration-600"
                            style={{
                              background: isActive
                                ? `linear-gradient(135deg, ${accent.color}, ${accent.color}cc)`
                                : `rgba(${accent.rgb}, 0.06)`,
                              border: `2px solid ${isActive ? accent.color : `rgba(${accent.rgb}, 0.15)`}`,
                              boxShadow: isActive
                                ? `0 8px 28px rgba(${accent.rgb}, 0.35), 0 0 0 4px rgba(${accent.rgb}, 0.06)`
                                : 'none',
                              transform: isActive ? 'scale(1.05)' : 'scale(1)',
                            }}
                          >
                            {/* Background pulse ring inside badge on hover */}
                            <div
                              className="absolute inset-0 rounded-2xl transition-all duration-700 pointer-events-none"
                              style={{
                                background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.15) 0%, transparent 70%)`,
                                opacity: isActive ? 1 : 0,
                              }}
                            />
                            <span
                              className="relative text-[32px] font-bold leading-none transition-all duration-500"
                              style={{
                                color: isActive ? '#fff' : accent.color,
                              }}
                            >
                              {step.number}
                            </span>
                          </div>
                        </div>

                        {/* Icon + phase label */}
                        <div className="flex items-center gap-2.5 mb-3">
                          <StepIcon
                            className="w-4 h-4 transition-all duration-500"
                            style={{
                              color: isActive ? accent.color : `rgba(${accent.rgb}, 0.5)`,
                              transform: isActive ? 'scale(1.1)' : 'scale(1)',
                            }}
                          />
                          <span
                            className="text-[11px] font-bold uppercase tracking-[0.14em] transition-colors duration-500"
                            style={{ color: isActive ? accent.color : 'rgba(255,255,255,0.28)' }}
                          >
                            {accent.label}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="text-xl font-bold text-white mb-3 leading-snug">
                          {step.title}
                        </h3>

                        {/* Description */}
                        <p
                          className="text-[14px] leading-[1.7] flex-1 transition-colors duration-500"
                          style={{ color: isActive ? 'rgba(255,255,255,0.72)' : 'rgba(255,255,255,0.4)' }}
                        >
                          {step.description}
                        </p>

                        {/* Bottom accent bar */}
                        <div className="mt-5 h-[2px] rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.04)' }}>
                          <div
                            className="h-full rounded-full transition-all duration-700 ease-out"
                            style={{
                              width: isActive ? '100%' : '0%',
                              background: `linear-gradient(90deg, ${accent.color}, ${accent.color}33)`,
                            }}
                          />
                        </div>
                      </div>

                      {/* Top edge shine */}
                      <div
                        className="absolute top-0 inset-x-0 h-[1px] transition-opacity duration-700"
                        style={{
                          background: `linear-gradient(90deg, transparent 5%, rgba(${accent.rgb}, 0.4) 50%, transparent 95%)`,
                          opacity: isActive ? 1 : 0,
                        }}
                      />
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
        .ap-corner-pulse {
          animation: apCornerPulse 8s ease-in-out infinite;
        }
        @keyframes apCornerPulse {
          0%, 100% { opacity: 0.06; transform: scale(1); }
          50% { opacity: 0.10; transform: scale(1.15); }
        }
        .ap-diag-rotate {
          animation: apDiagDrift 40s linear infinite;
        }
        @keyframes apDiagDrift {
          0% { transform: translate(0, 0); }
          100% { transform: translate(120px, 120px); }
        }
      `}</style>
    </section>
  );
}
