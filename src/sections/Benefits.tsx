import { useCallback, useEffect, useRef, useState } from 'react';
import { Container } from '../components';
import { siteContent } from '../content';
import { Sparkles } from 'lucide-react';

const cardMeta = [
  { accent: '#4F46E5', accentRgb: '79,70,229' },
  { accent: '#10B981', accentRgb: '16,185,129' },
  { accent: '#F59E0B', accentRgb: '245,158,11' },
  { accent: '#8B5CF6', accentRgb: '139,92,246' },
  { accent: '#EC4899', accentRgb: '236,72,153' },
  { accent: '#06B6D4', accentRgb: '6,182,212' },
];

/* Constellation nodes — fixed positions scattered across the section */
const constellationNodes = [
  { baseX: 0.08, baseY: 0.12, r: 3, color: '#4F46E5', drift: 0.6 },
  { baseX: 0.25, baseY: 0.08, r: 2.5, color: '#10B981', drift: 0.8 },
  { baseX: 0.42, baseY: 0.18, r: 3.5, color: '#8B5CF6', drift: 0.5 },
  { baseX: 0.6, baseY: 0.06, r: 2, color: '#EC4899', drift: 0.9 },
  { baseX: 0.78, baseY: 0.14, r: 3, color: '#06B6D4', drift: 0.7 },
  { baseX: 0.92, baseY: 0.1, r: 2.5, color: '#4F46E5', drift: 0.6 },
  { baseX: 0.05, baseY: 0.45, r: 2, color: '#F59E0B', drift: 0.85 },
  { baseX: 0.18, baseY: 0.55, r: 3, color: '#EC4899', drift: 0.55 },
  { baseX: 0.35, baseY: 0.48, r: 2.5, color: '#06B6D4', drift: 0.75 },
  { baseX: 0.52, baseY: 0.42, r: 3.5, color: '#10B981', drift: 0.65 },
  { baseX: 0.68, baseY: 0.52, r: 2, color: '#4F46E5', drift: 0.9 },
  { baseX: 0.85, baseY: 0.46, r: 3, color: '#8B5CF6', drift: 0.5 },
  { baseX: 0.95, baseY: 0.55, r: 2.5, color: '#F59E0B', drift: 0.7 },
  { baseX: 0.1, baseY: 0.82, r: 3, color: '#06B6D4', drift: 0.6 },
  { baseX: 0.3, baseY: 0.88, r: 2, color: '#4F46E5', drift: 0.8 },
  { baseX: 0.48, baseY: 0.78, r: 3.5, color: '#EC4899', drift: 0.55 },
  { baseX: 0.65, baseY: 0.85, r: 2.5, color: '#10B981', drift: 0.75 },
  { baseX: 0.82, baseY: 0.9, r: 3, color: '#8B5CF6', drift: 0.65 },
  { baseX: 0.94, baseY: 0.8, r: 2, color: '#F59E0B', drift: 0.85 },
];

/* Which nodes connect to form constellation lines */
const constellationEdges = [
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 5],
  [6, 7], [7, 8], [8, 9], [9, 10], [10, 11], [11, 12],
  [13, 14], [14, 15], [15, 16], [16, 17], [17, 18],
  [1, 8], [3, 10], [8, 15], [10, 16],
  [2, 9], [9, 15], [4, 11], [11, 17],
];

export default function Benefits() {
  const { label, headline, subheadline, benefits } = siteContent.benefits;
  const sectionRef = useRef<HTMLElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const rafRef = useRef<number>(0);
  const nodesRef = useRef<SVGCircleElement[]>([]);
  const linesRef = useRef<SVGLineElement[]>([]);
  const glowRef = useRef<SVGCircleElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  /* Intersection observer for reveal */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.08 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  /* Mouse tracking within the section */
  const handleMouseMove = useCallback((e: MouseEvent) => {
    const section = sectionRef.current;
    if (!section) return;
    const rect = section.getBoundingClientRect();
    mouseRef.current = {
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    };
  }, []);

  /* Animation loop — moves nodes toward mouse with easing */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    section.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      const svg = svgRef.current;
      if (!svg) { rafRef.current = requestAnimationFrame(animate); return; }
      const w = svg.clientWidth;
      const h = svg.clientHeight;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      constellationNodes.forEach((node, i) => {
        const el = nodesRef.current[i];
        if (!el) return;
        /* Each node drifts toward the mouse proportional to its drift factor */
        const offsetX = (mx - 0.5) * node.drift * 60;
        const offsetY = (my - 0.5) * node.drift * 60;
        const cx = node.baseX * w + offsetX;
        const cy = node.baseY * h + offsetY;
        el.setAttribute('cx', String(cx));
        el.setAttribute('cy', String(cy));

        /* Brighten nodes closer to cursor */
        const dist = Math.hypot(mx - node.baseX, my - node.baseY);
        const opacity = Math.max(0.15, Math.min(0.7, 1 - dist * 1.5));
        el.setAttribute('opacity', String(opacity));
      });

      /* Update constellation lines */
      constellationEdges.forEach((edge, i) => {
        const line = linesRef.current[i];
        if (!line) return;
        const a = nodesRef.current[edge[0]];
        const b = nodesRef.current[edge[1]];
        if (!a || !b) return;
        line.setAttribute('x1', a.getAttribute('cx')!);
        line.setAttribute('y1', a.getAttribute('cy')!);
        line.setAttribute('x2', b.getAttribute('cx')!);
        line.setAttribute('y2', b.getAttribute('cy')!);

        /* Fade lines based on average distance to cursor */
        const ax = parseFloat(a.getAttribute('cx')!) / w;
        const ay = parseFloat(a.getAttribute('cy')!) / h;
        const bx = parseFloat(b.getAttribute('cx')!) / w;
        const by = parseFloat(b.getAttribute('cy')!) / h;
        const midDist = Math.hypot(mx - (ax + bx) / 2, my - (ay + by) / 2);
        const lineOpacity = Math.max(0.02, Math.min(0.15, 0.3 - midDist * 0.5));
        line.setAttribute('opacity', String(lineOpacity));
      });

      /* Large soft glow that follows cursor */
      if (glowRef.current) {
        glowRef.current.setAttribute('cx', String(mx * w));
        glowRef.current.setAttribute('cy', String(my * h));
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
    <section ref={sectionRef} id="benefits" className="relative py-24 lg:py-36 overflow-hidden">
      {/* ===== Background ===== */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(160deg, #0d1117 0%, #111827 40%, #0f172a 70%, #0d1117 100%)' }} />

        {/* Ambient orbs */}
        <div className="absolute top-0 left-1/4 w-[700px] h-[700px] rounded-full opacity-[0.12] blur-[140px] ben-orb-a"
          style={{ background: 'radial-gradient(circle, rgba(79,70,229,0.6) 0%, transparent 70%)' }}
        />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] rounded-full opacity-[0.10] blur-[120px] ben-orb-b"
          style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.5) 0%, transparent 70%)' }}
        />

        {/* Subtle mesh grid */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="benGrid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#benGrid)" />
        </svg>

        {/* ===== Mouse-follow SVG constellation ===== */}
        <svg
          ref={svgRef}
          className="absolute inset-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <defs>
            <radialGradient id="benMouseGlow">
              <stop offset="0%" stopColor="#818CF8" stopOpacity="0.12" />
              <stop offset="60%" stopColor="#4F46E5" stopOpacity="0.04" />
              <stop offset="100%" stopColor="#4F46E5" stopOpacity="0" />
            </radialGradient>
            <filter id="benNodeGlow">
              <feGaussianBlur stdDeviation="4" result="b" />
              <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {/* Large cursor-follow glow */}
          <circle ref={glowRef} r="220" fill="url(#benMouseGlow)" cx="50%" cy="50%" />

          {/* Constellation edges */}
          <g strokeWidth="1">
            {constellationEdges.map((_, i) => (
              <line
                key={`edge-${i}`}
                ref={el => { if (el) linesRef.current[i] = el; }}
                stroke="rgba(129,140,248,0.5)"
                opacity="0.04"
                strokeLinecap="round"
              />
            ))}
          </g>

          {/* Constellation nodes */}
          <g filter="url(#benNodeGlow)">
            {constellationNodes.map((node, i) => (
              <circle
                key={`node-${i}`}
                ref={el => { if (el) nodesRef.current[i] = el; }}
                r={node.r}
                fill={node.color}
                opacity="0.2"
                cx="0" cy="0"
              />
            ))}
          </g>
        </svg>
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
              background: 'linear-gradient(135deg, rgba(79,70,229,0.15) 0%, rgba(16,185,129,0.1) 100%)',
              border: '1px solid rgba(79,70,229,0.25)',
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

          <p
            className={`text-lg leading-relaxed transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ color: 'rgba(255,255,255,0.6)' }}
          >
            {subheadline}
          </p>
        </div>

        {/* ===== Cards Grid ===== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {benefits.map((benefit, index) => {
            const meta = cardMeta[index];
            const Icon = benefit.icon;
            const isHovered = hoveredCard === index;

            return (
              <div
                key={index}
                className={`transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${300 + index * 80}ms` }}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div
                  className="ben-card relative h-full rounded-2xl overflow-hidden transition-all duration-500 cursor-default"
                  style={{
                    background: isHovered
                      ? `linear-gradient(160deg, rgba(${meta.accentRgb}, 0.10) 0%, rgba(255,255,255,0.04) 40%, rgba(${meta.accentRgb}, 0.05) 100%)`
                      : 'linear-gradient(160deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
                    border: `1px solid ${isHovered ? `rgba(${meta.accentRgb}, 0.35)` : 'rgba(255,255,255,0.07)'}`,
                    backdropFilter: 'blur(24px)',
                    WebkitBackdropFilter: 'blur(24px)',
                    boxShadow: isHovered
                      ? `0 24px 48px -12px rgba(0,0,0,0.4), 0 0 0 1px rgba(${meta.accentRgb}, 0.08), 0 0 60px -20px rgba(${meta.accentRgb}, 0.2)`
                      : '0 2px 16px -4px rgba(0,0,0,0.3)',
                    transform: isHovered ? 'translateY(-6px)' : 'translateY(0)',
                  }}
                >
                  {/* Accent glow — top-right corner */}
                  <div
                    className="absolute -top-24 -right-24 w-[200px] h-[200px] rounded-full blur-[80px] transition-opacity duration-700 pointer-events-none"
                    style={{
                      background: `radial-gradient(circle, rgba(${meta.accentRgb}, 0.5) 0%, transparent 70%)`,
                      opacity: isHovered ? 0.25 : 0,
                    }}
                  />

                  {/* Card inner content */}
                  <div className="relative p-7 lg:p-8 flex flex-col h-full">
                    {/* Icon container */}
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-all duration-500"
                      style={{
                        background: isHovered
                          ? `linear-gradient(135deg, ${meta.accent}, ${meta.accent}cc)`
                          : `rgba(${meta.accentRgb}, 0.10)`,
                        boxShadow: isHovered
                          ? `0 8px 24px -4px rgba(${meta.accentRgb}, 0.4)`
                          : 'none',
                        transform: isHovered ? 'scale(1.1) rotate(3deg)' : 'scale(1) rotate(0deg)',
                      }}
                    >
                      <Icon
                        className="w-6 h-6 transition-colors duration-500"
                        style={{ color: isHovered ? '#fff' : meta.accent }}
                      />
                    </div>

                    {/* Title */}
                    <h3 className="text-lg lg:text-xl font-bold text-white mb-3 leading-snug">
                      {benefit.title}
                    </h3>

                    {/* Description */}
                    <p
                      className="text-sm lg:text-[15px] leading-relaxed flex-1 transition-colors duration-400"
                      style={{ color: isHovered ? 'rgba(255,255,255,0.75)' : 'rgba(255,255,255,0.48)' }}
                    >
                      {benefit.description}
                    </p>

                    {/* Bottom accent bar */}
                    <div className="mt-6 h-[2px] rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.04)' }}>
                      <div
                        className="h-full rounded-full transition-all duration-700 ease-out"
                        style={{
                          width: isHovered ? '100%' : '0%',
                          background: `linear-gradient(90deg, ${meta.accent}, ${meta.accent}55)`,
                        }}
                      />
                    </div>
                  </div>

                  {/* Top shine edge */}
                  <div
                    className="absolute top-0 inset-x-0 h-[1px] transition-opacity duration-700"
                    style={{
                      background: `linear-gradient(90deg, transparent 10%, rgba(${meta.accentRgb}, 0.4) 50%, transparent 90%)`,
                      opacity: isHovered ? 1 : 0,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </Container>

      {/* CSS Animations */}
      <style>{`
        .ben-orb-a { animation: benOrbA 24s ease-in-out infinite; }
        .ben-orb-b { animation: benOrbB 30s ease-in-out infinite; }
        @keyframes benOrbA {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(50px, -30px) scale(1.08); }
          66% { transform: translate(-30px, 40px) scale(0.92); }
        }
        @keyframes benOrbB {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-40px, 25px) scale(1.06); }
          66% { transform: translate(35px, -35px) scale(0.94); }
        }
      `}</style>
    </section>
  );
}
