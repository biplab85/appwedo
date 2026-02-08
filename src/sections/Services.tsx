import { useEffect, useRef, useState } from 'react';
import { Container } from '../components';
import { siteContent } from '../content';
import { ArrowRight } from 'lucide-react';

const cardAccents = [
  { gradient: 'from-primary via-primary-600 to-indigo-500', glow: 'rgba(79,70,229,0.35)', accentRgb: '79,70,229', number: '01' },
  { gradient: 'from-secondary via-emerald-500 to-teal-500', glow: 'rgba(16,185,129,0.35)', accentRgb: '16,185,129', number: '02' },
  { gradient: 'from-amber-500 via-orange-500 to-rose-500', glow: 'rgba(245,158,11,0.35)', accentRgb: '245,158,11', number: '03' },
  { gradient: 'from-violet-500 via-purple-500 to-fuchsia-500', glow: 'rgba(139,92,246,0.35)', accentRgb: '139,92,246', number: '04' },
];

export default function Services() {
  const { label, headline, subheadline, services } = siteContent.services;
  const sectionRef = useRef<HTMLElement>(null);
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

  return (
    <section ref={sectionRef} id="services" className="relative py-24 lg:py-36 overflow-hidden">
      {/* ===== Animated Background ===== */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0c0f1a] via-[#111827] to-[#0c1220]" />

        {/* Gradient orbs */}
        <div className="absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full opacity-30 blur-[100px] services-orb-1"
          style={{ background: 'radial-gradient(circle, rgba(79,70,229,0.5) 0%, transparent 70%)' }}
        />
        <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full opacity-25 blur-[100px] services-orb-2"
          style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.45) 0%, transparent 70%)' }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-20 blur-[100px] services-orb-3"
          style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.4) 0%, transparent 70%)' }}
        />

        {/* SVG animated mesh network */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.12]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="svcLine1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4F46E5" />
              <stop offset="100%" stopColor="#10B981" />
            </linearGradient>
            <linearGradient id="svcLine2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#8B5CF6" />
            </linearGradient>
            <filter id="svcNodeGlow">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {/* Animated wave paths */}
          <path fill="none" stroke="url(#svcLine1)" strokeWidth="1" opacity="0.6" className="svc-wave-1"
            d="M0,200 C300,150 600,280 900,200 C1200,120 1500,260 1800,180"
          />
          <path fill="none" stroke="url(#svcLine2)" strokeWidth="0.8" opacity="0.5" className="svc-wave-2"
            d="M0,350 C250,300 550,420 850,340 C1150,260 1450,380 1800,320"
          />
          <path fill="none" stroke="url(#svcLine1)" strokeWidth="0.6" opacity="0.4" className="svc-wave-3"
            d="M0,500 C280,460 580,550 880,480 C1180,410 1480,530 1800,470"
          />

          {/* Network nodes */}
          <g filter="url(#svcNodeGlow)">
            {[
              { dur: '25s', cxV: '150;500;850;500;150', cyV: '180;280;200;120;180', r: 3, c: '#4F46E5' },
              { dur: '30s', cxV: '900;600;300;600;900', cyV: '300;400;350;250;300', r: 2.5, c: '#10B981' },
              { dur: '20s', cxV: '1300;1000;700;1000;1300', cyV: '220;340;280;180;220', r: 3.5, c: '#8B5CF6' },
              { dur: '28s', cxV: '400;700;1100;700;400', cyV: '450;360;420;500;450', r: 2, c: '#F59E0B' },
              { dur: '22s', cxV: '1500;1200;900;1200;1500', cyV: '400;300;380;480;400', r: 3, c: '#4F46E5' },
            ].map((n, i) => (
              <circle key={i} r={n.r} fill={n.c}>
                <animate attributeName="cx" values={n.cxV} dur={n.dur} repeatCount="indefinite" />
                <animate attributeName="cy" values={n.cyV} dur={n.dur} repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.3;0.7;0.4;0.7;0.3" dur={n.dur} repeatCount="indefinite" />
              </circle>
            ))}
          </g>

          {/* Connecting lines */}
          <g stroke="url(#svcLine1)" strokeWidth="0.4" opacity="0.3">
            <line>
              <animate attributeName="x1" values="150;500;850;500;150" dur="25s" repeatCount="indefinite" />
              <animate attributeName="y1" values="180;280;200;120;180" dur="25s" repeatCount="indefinite" />
              <animate attributeName="x2" values="900;600;300;600;900" dur="30s" repeatCount="indefinite" />
              <animate attributeName="y2" values="300;400;350;250;300" dur="30s" repeatCount="indefinite" />
            </line>
            <line>
              <animate attributeName="x1" values="900;600;300;600;900" dur="30s" repeatCount="indefinite" />
              <animate attributeName="y1" values="300;400;350;250;300" dur="30s" repeatCount="indefinite" />
              <animate attributeName="x2" values="1300;1000;700;1000;1300" dur="20s" repeatCount="indefinite" />
              <animate attributeName="y2" values="220;340;280;180;220" dur="20s" repeatCount="indefinite" />
            </line>
            <line>
              <animate attributeName="x1" values="1300;1000;700;1000;1300" dur="20s" repeatCount="indefinite" />
              <animate attributeName="y1" values="220;340;280;180;220" dur="20s" repeatCount="indefinite" />
              <animate attributeName="x2" values="1500;1200;900;1200;1500" dur="22s" repeatCount="indefinite" />
              <animate attributeName="y2" values="400;300;380;480;400" dur="22s" repeatCount="indefinite" />
            </line>
            <line>
              <animate attributeName="x1" values="400;700;1100;700;400" dur="28s" repeatCount="indefinite" />
              <animate attributeName="y1" values="450;360;420;500;450" dur="28s" repeatCount="indefinite" />
              <animate attributeName="x2" values="150;500;850;500;150" dur="25s" repeatCount="indefinite" />
              <animate attributeName="y2" values="180;280;200;120;180" dur="25s" repeatCount="indefinite" />
            </line>
          </g>

          {/* Floating particles */}
          {[
            { cy: 160, dur: '14s' }, { cy: 320, dur: '20s' }, { cy: 480, dur: '17s' },
          ].map((p, i) => (
            <circle key={`fp-${i}`} r="1.2" fill="#4F46E5" opacity="0">
              <animate attributeName="cx" values="0;1800" dur={p.dur} repeatCount="indefinite" />
              <animate attributeName="cy" values={`${p.cy};${p.cy + 40};${p.cy}`} dur={p.dur} repeatCount="indefinite" />
              <animate attributeName="opacity" values="0;0.5;0.5;0" dur={p.dur} repeatCount="indefinite" />
            </circle>
          ))}
          {[
            { cy: 240, dur: '18s' }, { cy: 400, dur: '15s' }, { cy: 540, dur: '22s' },
          ].map((p, i) => (
            <circle key={`rp-${i}`} r="1" fill="#10B981" opacity="0">
              <animate attributeName="cx" values="1800;0" dur={p.dur} repeatCount="indefinite" />
              <animate attributeName="cy" values={`${p.cy};${p.cy - 30};${p.cy}`} dur={p.dur} repeatCount="indefinite" />
              <animate attributeName="opacity" values="0;0.4;0.4;0" dur={p.dur} repeatCount="indefinite" />
            </circle>
          ))}
        </svg>

        {/* Edge glows */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary/20 to-transparent" />
      </div>

      {/* ===== Content ===== */}
      <Container className="relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 lg:mb-20">
          <div
            className={`inline-flex items-center gap-2 px-5 py-2 rounded-full mb-6 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{
              background: 'linear-gradient(135deg, rgba(79,70,229,0.15) 0%, rgba(16,185,129,0.08) 100%)',
              border: '1px solid rgba(79,70,229,0.25)',
            }}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            <span className="text-sm font-semibold text-primary-300">{label}</span>
          </div>

          <h2
            className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-5 leading-snug sm:leading-relaxed lg:leading-[1.3] transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            {headline}
          </h2>

          <p
            className={`text-base sm:text-lg text-dark-300 leading-relaxed max-w-2xl mx-auto transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            {subheadline}
          </p>
        </div>

        {/* Service Cards — 2-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 lg:gap-7 w-full mx-auto">
          {services.map((service, index) => {
            const accent = cardAccents[index];
            const Icon = service.icon;
            const isHovered = hoveredCard === index;

            return (
              <div
                key={index}
                className={`group relative transition-all duration-700 ease-out ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${300 + index * 120}ms` }}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Card outer glow on hover */}
                <div
                  className="hidden absolute -inset-[2px] rounded-[1.25rem] sm:rounded-[1.5rem] blur-xl transition-opacity duration-500"
                  style={{
                    background: accent.glow,
                    opacity: isHovered ? 0.4 : 0,
                  }}
                />

                {/* Card */}
                <div
                  className="relative h-full rounded-2xl sm:rounded-3xl p-6 sm:p-7 lg:p-8 overflow-hidden transition-all duration-500 group-hover:-translate-y-1.5"
                  style={{
                    background: isHovered
                      ? `linear-gradient(145deg, rgba(${accent.accentRgb}, 0.08) 0%, rgba(255,255,255,0.04) 50%, rgba(${accent.accentRgb}, 0.04) 100%)`
                      : 'linear-gradient(145deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
                    backdropFilter: 'blur(24px)',
                    WebkitBackdropFilter: 'blur(24px)',
                    border: isHovered
                      ? `1px solid rgba(${accent.accentRgb}, 0.25)`
                      : '1px solid rgba(255,255,255,0.08)',
                    boxShadow: isHovered
                      ? `0 16px 48px rgba(${accent.accentRgb}, 0.12), 0 4px 16px rgba(0,0,0,0.2)`
                      : '0 4px 24px rgba(0,0,0,0.2)',
                  }}
                >
                  {/* Hover gradient border overlay */}
                  <div
                    className="absolute inset-0 rounded-2xl sm:rounded-3xl transition-opacity duration-500 pointer-events-none"
                    style={{
                      padding: '1px',
                      background: `linear-gradient(135deg, ${accent.glow}, transparent 60%)`,
                      WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                      WebkitMaskComposite: 'xor',
                      mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                      maskComposite: 'exclude',
                      opacity: isHovered ? 1 : 0,
                    }}
                  />

                  {/* Step number watermark */}
                  <div className="absolute top-4 right-5 sm:top-5 sm:right-6">
                    <span
                      className="text-[44px] sm:text-[52px] lg:text-[60px] font-bold leading-none transition-opacity duration-500"
                      style={{
                        opacity: isHovered ? 0.12 : 0.05,
                        background: `linear-gradient(180deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.15) 100%)`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                      }}
                    >
                      {accent.number}
                    </span>
                  </div>

                  {/* Icon with glow */}
                  <div className="relative mb-6">
                    <div
                      className="absolute -inset-3 rounded-2xl blur-xl transition-opacity duration-500"
                      style={{
                        background: accent.glow,
                        opacity: isHovered ? 0.5 : 0,
                      }}
                    />
                    <div
                      className={`relative w-14 h-14 sm:w-[60px] sm:h-[60px] rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 bg-gradient-to-br ${accent.gradient}`}
                      style={{
                        boxShadow: isHovered
                          ? `0 8px 30px ${accent.glow}`
                          : '0 4px 12px rgba(0,0,0,0.3)',
                      }}
                    >
                      <Icon className="w-7 h-7 sm:w-[30px] sm:h-[30px] text-white" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2.5 leading-snug">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[13.5px] sm:text-sm lg:text-[15px] leading-relaxed mb-6 transition-colors duration-300"
                    style={{ color: isHovered ? 'rgba(255,255,255,0.65)' : 'rgba(255,255,255,0.45)' }}
                  >
                    {service.description}
                  </p>

                  {/* Learn more link */}
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 text-sm font-semibold transition-all duration-300"
                    style={{
                      color: isHovered ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.45)',
                    }}
                  >
                    Learn more
                    <ArrowRight
                      className={`w-4 h-4 transition-all duration-300 ${
                        isHovered ? 'opacity-100 translate-x-0.5' : 'opacity-0 -translate-x-2'
                      }`}
                    />
                  </a>

                  {/* Bottom accent line */}
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${accent.gradient} transition-all duration-600 ease-out`}
                      style={{ width: isHovered ? '100%' : '0%' }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>

      {/* CSS Animations */}
      <style>{`
        .services-orb-1 { animation: svcOrb1 20s ease-in-out infinite; }
        .services-orb-2 { animation: svcOrb2 25s ease-in-out infinite; }
        .services-orb-3 { animation: svcOrb3 18s ease-in-out infinite; }
        @keyframes svcOrb1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(60px, -40px) scale(1.1); }
          66% { transform: translate(-30px, 50px) scale(0.95); }
        }
        @keyframes svcOrb2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-50px, 40px) scale(1.08); }
          66% { transform: translate(40px, -30px) scale(0.92); }
        }
        @keyframes svcOrb3 {
          0%, 100% { transform: translate(-50%, -50%) scale(1) rotate(0deg); }
          50% { transform: translate(-50%, -50%) scale(1.15) rotate(180deg); }
        }
        .svc-wave-1 { animation: svcWave1 14s ease-in-out infinite; }
        .svc-wave-2 { animation: svcWave2 18s ease-in-out infinite; }
        .svc-wave-3 { animation: svcWave3 22s ease-in-out infinite; }
        @keyframes svcWave1 {
          0%, 100% { d: path("M0,200 C300,150 600,280 900,200 C1200,120 1500,260 1800,180"); }
          50% { d: path("M0,180 C300,250 600,150 900,230 C1200,310 1500,170 1800,240"); }
        }
        @keyframes svcWave2 {
          0%, 100% { d: path("M0,350 C250,300 550,420 850,340 C1150,260 1450,380 1800,320"); }
          50% { d: path("M0,330 C250,400 550,300 850,380 C1150,460 1450,320 1800,380"); }
        }
        @keyframes svcWave3 {
          0%, 100% { d: path("M0,500 C280,460 580,550 880,480 C1180,410 1480,530 1800,470"); }
          50% { d: path("M0,480 C280,540 580,450 880,520 C1180,590 1480,460 1800,510"); }
        }
      `}</style>
    </section>
  );
}
