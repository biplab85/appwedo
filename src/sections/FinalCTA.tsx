import { useCallback, useEffect, useRef, useState } from 'react';
import { Container } from '../components';
import { siteContent } from '../content';
import { Mail, Phone, Clock, ArrowRight, Calendar, Sparkles, Send } from 'lucide-react';

export default function FinalCTA() {
  const { headline, subheadline, primaryCTA, secondaryCTA, contactInfo } =
    siteContent.finalCTA;
  const sectionRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const posRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredContact, setHoveredContact] = useState<number | null>(null);

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

  const contactItems = [
    { icon: Mail, label: contactInfo.email, href: `mailto:${contactInfo.email}`, color: '#6366F1', rgb: '99,102,241' },
    { icon: Phone, label: contactInfo.phone, href: `tel:${contactInfo.phone.replace(/\s/g, '')}`, color: '#14B8A6', rgb: '20,184,166' },
    { icon: Clock, label: contactInfo.responseTime, href: null, color: '#F59E0B', rgb: '245,158,11' },
  ];

  return (
    <section ref={sectionRef} id="contact" className="relative py-24 lg:py-36 overflow-hidden">
      {/* ===== Background ===== */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Deep indigo-navy base */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(155deg, #0a0c1a 0%, #0e1028 30%, #120e24 60%, #0a0c18 100%)' }} />

        {/* Converging lines pattern — unique to CTA */}
        <svg className="paperSign absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
          {Array.from({ length: 24 }).map((_, i) => {
            const x = (i / 23) * 1920;
            return (
              <line key={`v${i}`} x1={x} y1="0" x2="960" y2="800"
                stroke="rgba(99,102,241,0.3)" strokeWidth="0.5"
              />
            );
          })}
          {Array.from({ length: 12 }).map((_, i) => {
            const y = (i / 11) * 800;
            return (
              <line key={`h${i}`} x1="0" y1={y} x2="1920" y2={400}
                stroke="rgba(168,85,247,0.2)" strokeWidth="0.3"
              />
            );
          })}
        </svg>

        {/* Large double-stroke send icon watermark */}
        <svg className="paperSign absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px]" style={{ opacity: isVisible ? 0.06 : 0, transform: isVisible ? 'translateY(-50%) scale(1)' : 'translateY(-50%) scale(0.8)', transition: 'opacity 1.2s ease, transform 1.2s ease' }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M22 2L11 13" fill="none" stroke="#6366F1" strokeWidth="0.4" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M22 2L15 22L11 13L2 9L22 2Z" fill="none" stroke="#6366F1" strokeWidth="0.4" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M22 2L11 13" fill="none" stroke="#A855F7" strokeWidth="0.2" strokeDasharray="0.8 0.4" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M22 2L15 22L11 13L2 9L22 2Z" fill="none" stroke="#A855F7" strokeWidth="0.2" strokeDasharray="0.8 0.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

        {/* Ambient orbs */}
        <div className="absolute -top-40 right-1/3 w-[600px] h-[600px] rounded-full opacity-[0.08] blur-[130px] cta-orb-a"
          style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.6) 0%, transparent 70%)' }}
        />
        <div className="absolute -bottom-40 left-1/4 w-[500px] h-[500px] rounded-full opacity-[0.06] blur-[110px] cta-orb-b"
          style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.5) 0%, transparent 70%)' }}
        />
        <div className="absolute top-1/2 left-0 w-[400px] h-[400px] rounded-full opacity-[0.05] blur-[100px]"
          style={{ background: 'radial-gradient(circle, rgba(20,184,166,0.4) 0%, transparent 70%)' }}
        />

        {/* Mouse-follow glow */}
        <div
          ref={glowRef}
          className="absolute w-[700px] h-[700px] rounded-full opacity-[0.05]"
          style={{
            background: 'radial-gradient(circle, rgba(99,102,241,0.5) 0%, rgba(168,85,247,0.2) 40%, transparent 70%)',
            filter: 'blur(50px)',
            willChange: 'transform',
          }}
        />
      </div>

      {/* ===== Content ===== */}
      <Container className="relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div
            className={`inline-flex items-center gap-2 px-5 py-2 rounded-full mb-6 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{
              background: 'linear-gradient(135deg, rgba(99,102,241,0.15) 0%, rgba(20,184,166,0.1) 100%)',
              border: '1px solid rgba(99,102,241,0.25)',
            }}
          >
            <Sparkles className="w-4 h-4" style={{ color: '#818CF8' }} />
            <span className="text-sm font-semibold" style={{ color: '#A5B4FC' }}>Let&apos;s Build Together</span>
          </div>

          {/* Headline */}
          <h2
            className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-5 leading-snug sm:leading-relaxed lg:leading-[1.3] transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            {headline}
          </h2>

          {/* Subheadline */}
          <p
            className={`text-base lg:text-lg max-w-2xl mx-auto mb-10 transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ color: 'rgba(255,255,255,0.55)' }}
          >
            {subheadline}
          </p>

          {/* CTA Buttons */}
          <div
            className={`flex flex-col sm:flex-row gap-4 justify-center mb-14 transition-all duration-700 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <a
              href={`mailto:${contactInfo.email}`}
              className="group inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl text-base font-semibold text-white"
              style={{
                background: 'linear-gradient(135deg, #6366F1 0%, #818CF8 100%)',
                boxShadow: '0 8px 32px -4px rgba(99,102,241,0.4), 0 0 0 1px rgba(99,102,241,0.3)',
                transition: 'all 0.4s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 12px 40px -4px rgba(99,102,241,0.5), 0 0 0 1px rgba(99,102,241,0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 8px 32px -4px rgba(99,102,241,0.4), 0 0 0 1px rgba(99,102,241,0.3)';
              }}
            >
              <Send className="w-5 h-5" />
              {primaryCTA}
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>

            <a
              href={`tel:${contactInfo.phone.replace(/\s/g, '')}`}
              className="group inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl text-base font-semibold"
              style={{
                color: 'rgba(255,255,255,0.85)',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.12)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                transition: 'all 0.4s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                e.currentTarget.style.borderColor = 'rgba(99,102,241,0.3)';
                e.currentTarget.style.color = '#fff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)';
                e.currentTarget.style.color = 'rgba(255,255,255,0.85)';
              }}
            >
              <Calendar className="w-5 h-5" />
              {secondaryCTA}
            </a>
          </div>

          {/* Divider */}
          <div
            className={`flex items-center gap-4 max-w-2xl mx-auto mb-10 transition-all duration-700 delay-400 ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="flex-1 h-[1px]" style={{ background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.2) 50%, transparent)' }} />
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 rounded-full" style={{ background: 'rgba(99,102,241,0.4)' }} />
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'rgba(168,85,247,0.5)' }} />
              <div className="w-1 h-1 rounded-full" style={{ background: 'rgba(20,184,166,0.4)' }} />
            </div>
            <div className="flex-1 h-[1px]" style={{ background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.2) 50%, transparent)' }} />
          </div>

          {/* Contact Info Cards */}
          <div className="grid sm:grid-cols-3 gap-5 max-w-3xl mx-auto">
            {contactItems.map((item, index) => {
              const Icon = item.icon;
              const isHover = hoveredContact === index;

              return (
                <div
                  key={index}
                  className={`transition-all duration-700 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                  }`}
                  style={{ transitionDelay: `${500 + index * 100}ms` }}
                  onMouseEnter={() => setHoveredContact(index)}
                  onMouseLeave={() => setHoveredContact(null)}
                >
                  {item.href ? (
                    <a href={item.href} className="block h-full">
                      <div
                        className="relative h-full rounded-xl overflow-hidden flex flex-col items-center justify-center gap-3 px-5 py-5"
                        style={{
                          background: isHover
                            ? `linear-gradient(170deg, rgba(${item.rgb}, 0.08) 0%, rgba(255,255,255,0.03) 100%)`
                            : 'rgba(255,255,255,0.03)',
                          border: `1px solid ${isHover ? `rgba(${item.rgb}, 0.25)` : 'rgba(255,255,255,0.06)'}`,
                          backdropFilter: 'blur(16px)',
                          WebkitBackdropFilter: 'blur(16px)',
                          transform: isHover ? 'translateY(-3px)' : 'translateY(0)',
                          boxShadow: isHover
                            ? `0 12px 32px -8px rgba(0,0,0,0.4), 0 0 20px -8px rgba(${item.rgb}, 0.1)`
                            : '0 2px 8px -2px rgba(0,0,0,0.15)',
                          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                        }}
                      >
                        {/* Top edge shine */}
                        <div
                          className="absolute top-0 inset-x-0 h-[1px]"
                          style={{
                            background: `linear-gradient(90deg, transparent 10%, rgba(${item.rgb}, 0.4) 50%, transparent 90%)`,
                            opacity: isHover ? 1 : 0,
                            transition: 'opacity 0.5s ease',
                          }}
                        />
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center"
                          style={{
                            background: isHover
                              ? `linear-gradient(135deg, ${item.color}, ${item.color}cc)`
                              : `rgba(${item.rgb}, 0.08)`,
                            border: `1px solid rgba(${item.rgb}, ${isHover ? 0.5 : 0.12})`,
                            boxShadow: isHover ? `0 4px 16px rgba(${item.rgb}, 0.3)` : 'none',
                            transition: 'all 0.4s ease',
                          }}
                        >
                          <Icon className="w-5 h-5" style={{ color: isHover ? '#fff' : item.color, transition: 'color 0.4s ease' }} />
                        </div>
                        <span
                          className="text-sm font-medium text-center"
                          style={{
                            color: isHover ? '#fff' : 'rgba(255,255,255,0.6)',
                            transition: 'color 0.4s ease',
                          }}
                        >
                          {item.label}
                        </span>
                      </div>
                    </a>
                  ) : (
                    <div
                      className="relative h-full rounded-xl overflow-hidden flex flex-col items-center justify-center gap-3 px-5 py-5"
                      style={{
                        background: isHover
                          ? `linear-gradient(170deg, rgba(${item.rgb}, 0.08) 0%, rgba(255,255,255,0.03) 100%)`
                          : 'rgba(255,255,255,0.03)',
                        border: `1px solid ${isHover ? `rgba(${item.rgb}, 0.25)` : 'rgba(255,255,255,0.06)'}`,
                        backdropFilter: 'blur(16px)',
                        WebkitBackdropFilter: 'blur(16px)',
                        transform: isHover ? 'translateY(-3px)' : 'translateY(0)',
                        boxShadow: isHover
                          ? `0 12px 32px -8px rgba(0,0,0,0.4), 0 0 20px -8px rgba(${item.rgb}, 0.1)`
                          : '0 2px 8px -2px rgba(0,0,0,0.15)',
                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      }}
                    >
                      {/* Top edge shine */}
                      <div
                        className="absolute top-0 inset-x-0 h-[1px]"
                        style={{
                          background: `linear-gradient(90deg, transparent 10%, rgba(${item.rgb}, 0.4) 50%, transparent 90%)`,
                          opacity: isHover ? 1 : 0,
                          transition: 'opacity 0.5s ease',
                        }}
                      />
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{
                          background: isHover
                            ? `linear-gradient(135deg, ${item.color}, ${item.color}cc)`
                            : `rgba(${item.rgb}, 0.08)`,
                          border: `1px solid rgba(${item.rgb}, ${isHover ? 0.5 : 0.12})`,
                          boxShadow: isHover ? `0 4px 16px rgba(${item.rgb}, 0.3)` : 'none',
                          transition: 'all 0.4s ease',
                        }}
                      >
                        <Icon className="w-5 h-5" style={{ color: isHover ? '#fff' : item.color, transition: 'color 0.4s ease' }} />
                      </div>
                      <span
                        className="text-sm font-medium text-center"
                        style={{
                          color: isHover ? '#fff' : 'rgba(255,255,255,0.6)',
                          transition: 'color 0.4s ease',
                        }}
                      >
                        {item.label}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </Container>

      {/* CSS Animations */}
      <style>{`
        .cta-orb-a { animation: ctaOrbA 26s ease-in-out infinite; }
        .cta-orb-b { animation: ctaOrbB 32s ease-in-out infinite; }
        @keyframes ctaOrbA {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(35px, -25px) scale(1.07); }
          66% { transform: translate(-25px, 30px) scale(0.93); }
        }
        @keyframes ctaOrbB {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-30px, 20px) scale(1.05); }
          66% { transform: translate(25px, -25px) scale(0.95); }
        }
      `}</style>
    </section>
  );
}
