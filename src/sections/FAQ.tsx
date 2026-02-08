import { useCallback, useEffect, useRef, useState } from 'react';
import { Container } from '../components';
import { siteContent } from '../content';
import { Sparkles, Plus, Minus } from 'lucide-react';

const accentColors = [
  { color: '#6366F1', rgb: '99,102,241' },
  { color: '#14B8A6', rgb: '20,184,166' },
  { color: '#A855F7', rgb: '168,85,247' },
  { color: '#F59E0B', rgb: '245,158,11' },
  { color: '#EC4899', rgb: '236,72,153' },
  { color: '#06B6D4', rgb: '6,182,212' },
];

export default function FAQ() {
  const { label, headline, faqs } = siteContent.faq;
  const sectionRef = useRef<HTMLElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);
  const [isVisible, setIsVisible] = useState(false);

  /* Trailing orbs config — each follows cursor at a different speed */
  const trailOrbs = useRef([
    { el: null as HTMLDivElement | null, x: 0, y: 0, speed: 0.08, size: 220, color: 'rgba(99,102,241,0.35)', blur: 60 },
    { el: null as HTMLDivElement | null, x: 0, y: 0, speed: 0.05, size: 160, color: 'rgba(168,85,247,0.3)', blur: 50 },
    { el: null as HTMLDivElement | null, x: 0, y: 0, speed: 0.03, size: 120, color: 'rgba(20,184,166,0.25)', blur: 40 },
    { el: null as HTMLDivElement | null, x: 0, y: 0, speed: 0.018, size: 90, color: 'rgba(245,158,11,0.25)', blur: 35 },
    { el: null as HTMLDivElement | null, x: 0, y: 0, speed: 0.01, size: 70, color: 'rgba(236,72,153,0.2)', blur: 30 },
  ]);
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.08 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  /* Mouse-follow trailing orbs */
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
      const orbs = trailOrbs.current;
      for (let i = 0; i < orbs.length; i++) {
        const orb = orbs[i];
        orb.x += (mouseRef.current.x - orb.x) * orb.speed;
        orb.y += (mouseRef.current.y - orb.y) * orb.speed;
        if (orb.el) {
          orb.el.style.transform = `translate(${orb.x - orb.size / 2}px, ${orb.y - orb.size / 2}px)`;
        }
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
    <section ref={sectionRef} id="faq" className="relative py-24 lg:py-36 overflow-hidden">
      {/* ===== Background ===== */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Deep charcoal-navy base */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(165deg, #0c0e18 0%, #10131d 30%, #0e1220 60%, #0a0c16 100%)' }} />

        {/* Honeycomb hexagonal pattern — unique to FAQ */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.025]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="faqHex" width="60" height="104" patternUnits="userSpaceOnUse" patternTransform="scale(1.5)">
              <polygon points="30,0 60,17 60,52 30,69 0,52 0,17" fill="none" stroke="rgba(99,102,241,0.4)" strokeWidth="0.5" />
              <polygon points="30,35 60,52 60,87 30,104 0,87 0,52" fill="none" stroke="rgba(168,85,247,0.3)" strokeWidth="0.4" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#faqHex)" />
        </svg>

        {/* Ambient orbs */}
        <div className="absolute -top-40 left-1/4 w-[550px] h-[550px] rounded-full opacity-[0.07] blur-[130px] faq-orb-a"
          style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.6) 0%, transparent 70%)' }}
        />
        <div className="absolute -bottom-40 right-1/4 w-[500px] h-[500px] rounded-full opacity-[0.06] blur-[110px] faq-orb-b"
          style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.5) 0%, transparent 70%)' }}
        />

        {/* Mouse-follow trailing orbs */}
        {trailOrbs.current.map((orb, i) => (
          <div
            key={i}
            ref={(el) => { trailOrbs.current[i].el = el; }}
            className="absolute rounded-full"
            style={{
              width: orb.size,
              height: orb.size,
              background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
              filter: `blur(${orb.blur}px)`,
              opacity: 0.12 - i * 0.015,
              willChange: 'transform',
            }}
          />
        ))}
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
              background: 'linear-gradient(135deg, rgba(99,102,241,0.15) 0%, rgba(168,85,247,0.1) 100%)',
              border: '1px solid rgba(99,102,241,0.25)',
            }}
          >
            <Sparkles className="w-4 h-4" style={{ color: '#818CF8' }} />
            <span className="text-sm font-semibold" style={{ color: '#A5B4FC' }}>{label}</span>
          </div>

          <h2
            className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-5 leading-snug sm:leading-relaxed lg:leading-[1.3] transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            {headline}
          </h2>
        </div>

        {/* ===== FAQ Accordion ===== */}
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => {
            const accent = accentColors[index % accentColors.length];
            const isOpen = openIndex === index;
            const isHover = hoveredIndex === index;
            const contentHeight = contentRefs.current[index]?.scrollHeight || 0;

            return (
              <div
                key={index}
                className={`transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
                style={{ transitionDelay: `${200 + index * 80}ms` }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div
                  className="relative rounded-xl overflow-hidden"
                  style={{
                    background: isOpen
                      ? `linear-gradient(170deg, rgba(${accent.rgb}, 0.07) 0%, rgba(255,255,255,0.03) 100%)`
                      : isHover
                        ? 'rgba(255,255,255,0.04)'
                        : 'rgba(255,255,255,0.025)',
                    border: `1px solid ${isOpen ? `rgba(${accent.rgb}, 0.25)` : isHover ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.06)'}`,
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    boxShadow: isOpen
                      ? `0 8px 32px -8px rgba(0,0,0,0.4), 0 0 20px -8px rgba(${accent.rgb}, 0.08)`
                      : '0 2px 8px -2px rgba(0,0,0,0.15)',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                >
                  {/* Top edge shine when open */}
                  <div
                    className="absolute top-0 inset-x-0 h-[1px]"
                    style={{
                      background: `linear-gradient(90deg, transparent 10%, rgba(${accent.rgb}, 0.4) 50%, transparent 90%)`,
                      opacity: isOpen ? 1 : 0,
                      transition: 'opacity 0.5s ease',
                    }}
                  />

                  {/* Question button */}
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full text-left flex items-center gap-4 px-6 py-5"
                    aria-expanded={isOpen}
                    style={{ cursor: 'pointer' }}
                  >
                    {/* Number badge */}
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{
                        background: isOpen
                          ? `linear-gradient(135deg, ${accent.color}, ${accent.color}cc)`
                          : `rgba(${accent.rgb}, 0.08)`,
                        border: `1px solid rgba(${accent.rgb}, ${isOpen ? 0.5 : 0.12})`,
                        boxShadow: isOpen ? `0 4px 12px rgba(${accent.rgb}, 0.25)` : 'none',
                        transition: 'all 0.4s ease',
                      }}
                    >
                      <span
                        className="text-xs font-bold"
                        style={{
                          color: isOpen ? '#fff' : accent.color,
                          transition: 'color 0.4s ease',
                        }}
                      >
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>

                    {/* Question text */}
                    <span
                      className="flex-1 text-[15px] font-semibold"
                      style={{
                        color: isOpen ? '#fff' : isHover ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.7)',
                        transition: 'color 0.3s ease',
                      }}
                    >
                      {faq.question}
                    </span>

                    {/* Toggle icon */}
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{
                        background: isOpen ? `rgba(${accent.rgb}, 0.15)` : 'rgba(255,255,255,0.05)',
                        border: `1px solid ${isOpen ? `rgba(${accent.rgb}, 0.3)` : 'rgba(255,255,255,0.08)'}`,
                        transition: 'all 0.4s ease',
                      }}
                    >
                      {isOpen ? (
                        <Minus className="w-3.5 h-3.5" style={{ color: accent.color }} />
                      ) : (
                        <Plus className="w-3.5 h-3.5" style={{ color: 'rgba(255,255,255,0.4)' }} />
                      )}
                    </div>
                  </button>

                  {/* Answer panel with measured height transition */}
                  <div
                    className="overflow-hidden"
                    style={{
                      maxHeight: isOpen ? `${contentHeight + 24}px` : '0px',
                      transition: 'max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                  >
                    <div
                      ref={(el) => { contentRefs.current[index] = el; }}
                      className="px-6 pb-6"
                      style={{ paddingLeft: '4.5rem' }}
                    >
                      {/* Subtle divider */}
                      <div
                        className="h-[1px] mb-4"
                        style={{
                          background: `linear-gradient(90deg, rgba(${accent.rgb}, 0.2) 0%, rgba(${accent.rgb}, 0.05) 100%)`,
                        }}
                      />
                      <p
                        className="text-[14px] leading-[1.8]"
                        style={{ color: 'rgba(255,255,255,0.55)' }}
                      >
                        {faq.answer}
                      </p>
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
        .faq-orb-a { animation: faqOrbA 26s ease-in-out infinite; }
        .faq-orb-b { animation: faqOrbB 32s ease-in-out infinite; }
        @keyframes faqOrbA {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -25px) scale(1.06); }
          66% { transform: translate(-25px, 30px) scale(0.94); }
        }
        @keyframes faqOrbB {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-30px, 20px) scale(1.05); }
          66% { transform: translate(25px, -25px) scale(0.95); }
        }
      `}</style>
    </section>
  );
}
