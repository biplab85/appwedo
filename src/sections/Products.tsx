import { useCallback, useEffect, useRef, useState } from 'react';
import { Container } from '../components';
import { siteContent } from '../content';
import { Sparkles } from 'lucide-react';

const accentColors = [
  { color: '#6366F1', rgb: '99,102,241' },
  { color: '#14B8A6', rgb: '20,184,166' },
  { color: '#F59E0B', rgb: '245,158,11' },
  { color: '#A855F7', rgb: '168,85,247' },
  { color: '#EC4899', rgb: '236,72,153' },
  { color: '#06B6D4', rgb: '6,182,212' },
  { color: '#10B981', rgb: '16,185,129' },
];

export default function Products() {
  const { label, headline, products } = siteContent.products;
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
      posRef.current.x += (mouseRef.current.x - posRef.current.x) * 0.07;
      posRef.current.y += (mouseRef.current.y - posRef.current.y) * 0.07;
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${posRef.current.x - 350}px, ${posRef.current.y - 350}px)`;
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
    <section ref={sectionRef} id="products" className="relative py-24 lg:py-36 overflow-hidden">
      {/* ===== Background ===== */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Warm deep base */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(155deg, #0f0c1a 0%, #13111f 30%, #0f1420 60%, #0c0e18 100%)' }} />

        {/* Radial ring pattern — unique to this section */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="prodRings" width="200" height="200" patternUnits="userSpaceOnUse">
              <circle cx="100" cy="100" r="30" fill="none" stroke="rgba(99,102,241,0.5)" strokeWidth="0.5" />
              <circle cx="100" cy="100" r="60" fill="none" stroke="rgba(168,85,247,0.4)" strokeWidth="0.3" />
              <circle cx="100" cy="100" r="90" fill="none" stroke="rgba(20,184,166,0.3)" strokeWidth="0.3" />
              <circle cx="100" cy="100" r="2" fill="rgba(99,102,241,0.4)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#prodRings)" />
        </svg>

        {/* Ambient orbs — deep purple / warm tones */}
        <div className="absolute -top-40 left-1/3 w-[600px] h-[600px] rounded-full opacity-[0.08] blur-[130px] prod-orb-a"
          style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.6) 0%, transparent 70%)' }}
        />
        <div className="absolute -bottom-40 right-1/3 w-[500px] h-[500px] rounded-full opacity-[0.07] blur-[110px] prod-orb-b"
          style={{ background: 'radial-gradient(circle, rgba(236,72,153,0.5) 0%, transparent 70%)' }}
        />
        <div className="absolute top-1/2 right-0 w-[400px] h-[400px] rounded-full opacity-[0.05] blur-[100px]"
          style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.5) 0%, transparent 70%)' }}
        />

        {/* Mouse-follow glow */}
        <div
          ref={glowRef}
          className="absolute w-[700px] h-[700px] rounded-full opacity-[0.05]"
          style={{
            background: 'radial-gradient(circle, rgba(168,85,247,0.5) 0%, rgba(99,102,241,0.2) 40%, transparent 70%)',
            filter: 'blur(50px)',
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
              background: 'linear-gradient(135deg, rgba(168,85,247,0.15) 0%, rgba(236,72,153,0.1) 100%)',
              border: '1px solid rgba(168,85,247,0.25)',
            }}
          >
            <Sparkles className="w-4 h-4" style={{ color: '#C084FC' }} />
            <span className="text-sm font-semibold" style={{ color: '#D8B4FE' }}>{label}</span>
          </div>

          <h2
            className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-5 leading-snug sm:leading-relaxed lg:leading-[1.3] transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            {headline}
          </h2>
        </div>

        {/* ===== Products Grid ===== */}
        {[0, 1].map((row) => {
          const rowProducts = products.slice(row * 7, row * 7 + 7);
          return (
            <div key={row}>
              {/* Decorative divider between rows */}
              {row === 1 && (
                <div
                  className={`flex items-center gap-4 my-8 lg:my-10 transition-all duration-1000 ${
                    isVisible ? 'opacity-100' : 'opacity-0'
                  }`}
                  style={{ transitionDelay: '700ms' }}
                >
                  <div className="flex-1 h-[1px]" style={{ background: 'linear-gradient(90deg, transparent, rgba(168,85,247,0.25) 50%, transparent)' }} />
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full" style={{ background: 'rgba(99,102,241,0.4)' }} />
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'rgba(168,85,247,0.5)' }} />
                    <div className="w-1 h-1 rounded-full" style={{ background: 'rgba(236,72,153,0.4)' }} />
                  </div>
                  <div className="flex-1 h-[1px]" style={{ background: 'linear-gradient(90deg, transparent, rgba(168,85,247,0.25) 50%, transparent)' }} />
                </div>
              )}

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-5 lg:gap-6">
                {rowProducts.map((product, i) => {
                  const index = row * 7 + i;
                  const accent = accentColors[index % accentColors.length];
                  const Icon = product.icon;
                  const isHovered = hoveredCard === index;

                  return (
                    <div
                      key={index}
                      className={`transition-all duration-700 ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                      }`}
                      style={{ transitionDelay: `${200 + index * 60}ms` }}
                      onMouseEnter={() => setHoveredCard(index)}
                      onMouseLeave={() => setHoveredCard(null)}
                    >
                      <div
                        className="relative h-full rounded-2xl cursor-default transition-all duration-500 overflow-hidden"
                        style={{
                          background: isHovered
                            ? `rgba(${accent.rgb}, 0.06)`
                            : 'transparent',
                          border: `1px solid ${isHovered ? `rgba(${accent.rgb}, 0.35)` : 'rgba(255,255,255,0.06)'}`,
                          transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
                        }}
                      >
                        <div className="relative flex flex-col items-center text-center py-6 px-3 lg:py-8 lg:px-4">
                          {/* Icon ring container */}
                          <div className="relative mb-5">
                            {/* Outer animated ring */}
                            <div
                              className="absolute inset-[-6px] rounded-full transition-all duration-700"
                              style={{
                                border: `1.5px solid rgba(${accent.rgb}, ${isHovered ? 0.5 : 0.08})`,
                                transform: isHovered ? 'scale(1) rotate(0deg)' : 'scale(0.85) rotate(-90deg)',
                                boxShadow: isHovered ? `0 0 20px rgba(${accent.rgb}, 0.2)` : 'none',
                              }}
                            />
                            {/* Accent arc — animated dash on hover */}
                            <svg
                              className="absolute inset-[-6px] w-[calc(100%+12px)] h-[calc(100%+12px)] transition-all duration-700"
                              style={{ transform: isHovered ? 'rotate(0deg)' : 'rotate(-180deg)' }}
                            >
                              <circle
                                cx="50%"
                                cy="50%"
                                r="48%"
                                fill="none"
                                stroke={accent.color}
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeDasharray={isHovered ? '30 12' : '0 200'}
                                className="transition-all duration-700"
                                style={{ opacity: isHovered ? 0.7 : 0 }}
                              />
                            </svg>

                            {/* Icon circle */}
                            <div
                              className="relative w-14 h-14 lg:w-16 lg:h-16 rounded-full flex items-center justify-center transition-all duration-500"
                              style={{
                                background: isHovered
                                  ? `linear-gradient(135deg, ${accent.color}, ${accent.color}cc)`
                                  : `rgba(${accent.rgb}, 0.07)`,
                                border: `1px solid rgba(${accent.rgb}, ${isHovered ? 0.6 : 0.12})`,
                                boxShadow: isHovered
                                  ? `0 8px 24px rgba(${accent.rgb}, 0.3), inset 0 0 16px rgba(255,255,255,0.05)`
                                  : 'none',
                                transform: isHovered ? 'scale(1.08)' : 'scale(1)',
                              }}
                            >
                              <Icon
                                className="w-6 h-6 lg:w-7 lg:h-7 transition-all duration-500"
                                style={{
                                  color: isHovered ? '#fff' : accent.color,
                                  filter: isHovered ? `drop-shadow(0 2px 6px rgba(${accent.rgb}, 0.5))` : 'none',
                                }}
                              />
                            </div>
                          </div>

                          {/* Name */}
                          <span
                            className="text-[13px] lg:text-sm font-semibold leading-snug transition-all duration-500"
                            style={{
                              color: isHovered ? '#fff' : 'rgba(255,255,255,0.55)',
                              transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
                            }}
                          >
                            {product.name}
                          </span>
                        </div>

                        {/* Accent dot indicator — top right */}
                        <div
                          className="absolute top-3 right-3 w-2 h-2 rounded-full transition-all duration-500"
                          style={{
                            background: accent.color,
                            opacity: isHovered ? 0.9 : 0.2,
                            transform: isHovered ? 'scale(1.3)' : 'scale(1)',
                            boxShadow: isHovered ? `0 0 10px rgba(${accent.rgb}, 0.6)` : 'none',
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </Container>

      {/* CSS Animations */}
      <style>{`
        .prod-orb-a { animation: prodOrbA 26s ease-in-out infinite; }
        .prod-orb-b { animation: prodOrbB 32s ease-in-out infinite; }
        @keyframes prodOrbA {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(40px, -30px) scale(1.08); }
          66% { transform: translate(-30px, 35px) scale(0.93); }
        }
        @keyframes prodOrbB {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-35px, 25px) scale(1.06); }
          66% { transform: translate(30px, -30px) scale(0.94); }
        }
      `}</style>
    </section>
  );
}
