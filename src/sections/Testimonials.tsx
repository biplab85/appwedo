import { useCallback, useEffect, useRef, useState } from 'react';
import { Container } from '../components';
import { siteContent } from '../content';
import { Sparkles, Star } from 'lucide-react';

const cardAccents = [
  { from: '#6366F1', to: '#818CF8', rgb: '99,102,241' },
  { from: '#14B8A6', to: '#5EEAD4', rgb: '20,184,166' },
  { from: '#A855F7', to: '#C084FC', rgb: '168,85,247' },
  { from: '#F59E0B', to: '#FCD34D', rgb: '245,158,11' },
];

export default function Testimonials() {
  const { label, headline, testimonials } = siteContent.testimonials;
  const sectionRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const posRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.08 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  /* Mouse-follow spotlight */
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
      posRef.current.x += (mouseRef.current.x - posRef.current.x) * 0.06;
      posRef.current.y += (mouseRef.current.y - posRef.current.y) * 0.06;
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${posRef.current.x - 300}px, ${posRef.current.y - 300}px)`;
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
    <section ref={sectionRef} className="relative py-24 lg:py-36 overflow-hidden">
      {/* ===== Background ===== */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Deep navy-slate base */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(160deg, #0a0d14 0%, #0f1218 30%, #111825 60%, #0a0e16 100%)' }} />

        {/* Starburst radial lines — unique to this section */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.025]" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
          <defs>
            <radialGradient id="testBurst" cx="50%" cy="40%">
              <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
            </radialGradient>
          </defs>
          {Array.from({ length: 36 }).map((_, i) => {
            const angle = (i * 10) * Math.PI / 180;
            const x2 = 960 + Math.cos(angle) * 1200;
            const y2 = 400 + Math.sin(angle) * 1200;
            return (
              <line key={i} x1="960" y1="400" x2={x2} y2={y2}
                stroke="rgba(245,158,11,0.15)" strokeWidth="0.5"
              />
            );
          })}
          <circle cx="960" cy="400" r="300" fill="url(#testBurst)" />
        </svg>

        {/* Ambient orbs — warm gold + cool blue contrast */}
        <div className="absolute -top-32 right-1/4 w-[550px] h-[550px] rounded-full opacity-[0.07] blur-[120px] test-orb-a"
          style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.6) 0%, transparent 70%)' }}
        />
        <div className="absolute -bottom-32 left-1/4 w-[500px] h-[500px] rounded-full opacity-[0.06] blur-[110px] test-orb-b"
          style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.5) 0%, transparent 70%)' }}
        />

        {/* Mouse-follow glow */}
        <div
          ref={glowRef}
          className="absolute w-[600px] h-[600px] rounded-full opacity-[0.04]"
          style={{
            background: 'radial-gradient(circle, rgba(245,158,11,0.5) 0%, rgba(99,102,241,0.15) 50%, transparent 70%)',
            filter: 'blur(40px)',
            willChange: 'transform',
          }}
        />
      </div>

      {/* ===== Content ===== */}
      <Container className="relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 lg:mb-18">
          <div
            className={`inline-flex items-center gap-2 px-5 py-2 rounded-full mb-6 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{
              background: 'linear-gradient(135deg, rgba(245,158,11,0.15) 0%, rgba(99,102,241,0.1) 100%)',
              border: '1px solid rgba(245,158,11,0.25)',
            }}
          >
            <Sparkles className="w-4 h-4" style={{ color: '#FCD34D' }} />
            <span className="text-sm font-semibold" style={{ color: '#FDE68A' }}>{label}</span>
          </div>

          <h2
            className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-5 leading-snug sm:leading-relaxed lg:leading-[1.3] transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            {headline}
          </h2>
        </div>

        {/* ===== Testimonial Grid ===== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {testimonials.map((testimonial, index) => {
            const accent = cardAccents[index % cardAccents.length];
            const isHover = hoveredCard === index;

            return (
              <div
                key={index}
                className={`transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${300 + index * 100}ms` }}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div
                  className="relative h-full rounded-2xl overflow-hidden cursor-default flex flex-col"
                  style={{
                    background: isHover
                      ? `linear-gradient(170deg, rgba(${accent.rgb}, 0.08) 0%, rgba(255,255,255,0.04) 50%, rgba(${accent.rgb}, 0.04) 100%)`
                      : 'rgba(255,255,255,0.04)',
                    border: `1px solid ${isHover ? `rgba(${accent.rgb}, 0.3)` : 'rgba(255,255,255,0.08)'}`,
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    boxShadow: isHover
                      ? `0 16px 40px -10px rgba(0,0,0,0.5), 0 0 30px -10px rgba(${accent.rgb}, 0.1)`
                      : '0 2px 10px -2px rgba(0,0,0,0.2)',
                    transform: isHover ? 'translateY(-4px)' : 'translateY(0)',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                >
                  {/* Top edge shine */}
                  <div
                    className="absolute top-0 inset-x-0 h-[1px]"
                    style={{
                      background: `linear-gradient(90deg, transparent 5%, rgba(${accent.rgb}, 0.4) 50%, transparent 95%)`,
                      opacity: isHover ? 1 : 0,
                      transition: 'opacity 0.5s ease',
                    }}
                  />

                  <div className="relative p-6 lg:p-7 flex flex-col flex-1">
                    {/* Stars */}
                    <div className="flex gap-1 mb-5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className="w-[18px] h-[18px]"
                          fill="#FCD34D"
                          stroke="none"
                        />
                      ))}
                    </div>

                    {/* Quote text */}
                    <p
                      className="text-[14px] leading-[1.75] flex-1 mb-6"
                      style={{
                        color: isHover ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.6)',
                        transition: 'color 0.4s ease',
                      }}
                    >
                      {testimonial.quote}
                    </p>

                    {/* Author */}
                    <div className="mt-auto">
                      <div
                        className="text-[15px] font-bold transition-colors duration-400"
                        style={{ color: isHover ? '#fff' : 'rgba(255,255,255,0.9)' }}
                      >
                        {testimonial.name}
                      </div>
                      <div
                        className="text-[13px] mt-1"
                        style={{
                          color: isHover ? `rgba(${accent.rgb}, 0.85)` : 'rgba(255,255,255,0.35)',
                          transition: 'color 0.4s ease',
                        }}
                      >
                        {testimonial.title}, {testimonial.company}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>

      {/* CSS Animations */}
      <style>{`
        .test-orb-a { animation: testOrbA 24s ease-in-out infinite; }
        .test-orb-b { animation: testOrbB 30s ease-in-out infinite; }
        @keyframes testOrbA {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(35px, -25px) scale(1.07); }
          66% { transform: translate(-25px, 30px) scale(0.93); }
        }
        @keyframes testOrbB {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-30px, 20px) scale(1.05); }
          66% { transform: translate(25px, -25px) scale(0.95); }
        }
      `}</style>
    </section>
  );
}
