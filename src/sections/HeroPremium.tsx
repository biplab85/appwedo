import { useCallback, useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  Monitor,
  Smartphone,
  Link2,
  Sparkles,
  ChevronRight,
  Code2,
  Cpu,
  Globe,
  Zap,
} from 'lucide-react';
import { Container } from '../components';
import { siteContent } from '../content';

/* ── Floating particles ── */
const particles = [
  { type: 'circle', size: 5, x: '7%', y: '15%', color: '139,92,246', opacity: 0.2, dur: '24s', dx: 30, dy: -35 },
  { type: 'circle', size: 3, x: '92%', y: '22%', color: '6,182,212', opacity: 0.25, dur: '20s', dx: -20, dy: 25 },
  { type: 'circle', size: 7, x: '80%', y: '78%', color: '236,72,153', opacity: 0.15, dur: '28s', dx: 25, dy: -30 },
  { type: 'circle', size: 4, x: '15%', y: '85%', color: '139,92,246', opacity: 0.2, dur: '22s', dx: -35, dy: 20 },
  { type: 'dot', size: 2, x: '25%', y: '10%', color: '6,182,212', opacity: 0.35, dur: '18s', dx: 15, dy: -20 },
  { type: 'dot', size: 2, x: '70%', y: '12%', color: '236,72,153', opacity: 0.3, dur: '16s', dx: -12, dy: 18 },
  { type: 'dot', size: 3, x: '95%', y: '50%', color: '139,92,246', opacity: 0.25, dur: '20s', dx: -18, dy: -15 },
  { type: 'dot', size: 2, x: '5%', y: '55%', color: '245,158,11', opacity: 0.3, dur: '19s', dx: 20, dy: 12 },
  { type: 'square', size: 5, x: '88%', y: '35%', color: '6,182,212', opacity: 0.12, dur: '30s', dx: -25, dy: 30, rotate: 45 },
  { type: 'square', size: 4, x: '12%', y: '40%', color: '236,72,153', opacity: 0.1, dur: '26s', dx: 20, dy: -25, rotate: 30 },
  { type: 'square', size: 6, x: '48%', y: '90%', color: '139,92,246', opacity: 0.08, dur: '32s', dx: -15, dy: 20, rotate: 60 },
  { type: 'triangle', size: 7, x: '38%', y: '8%', color: '245,158,11', opacity: 0.1, dur: '28s', dx: 20, dy: 25, rotate: 15 },
  { type: 'triangle', size: 5, x: '82%', y: '60%', color: '6,182,212', opacity: 0.08, dur: '34s', dx: -25, dy: -20, rotate: 40 },
  { type: 'ring', size: 14, x: '55%', y: '5%', color: '139,92,246', opacity: 0.06, dur: '36s', dx: 15, dy: 30, rotate: 0 },
  { type: 'ring', size: 10, x: '3%', y: '70%', color: '6,182,212', opacity: 0.07, dur: '30s', dx: 25, dy: -15, rotate: 0 },
  { type: 'cross', size: 6, x: '60%', y: '92%', color: '236,72,153', opacity: 0.1, dur: '25s', dx: -20, dy: -30, rotate: 25 },
  { type: 'cross', size: 5, x: '30%', y: '70%', color: '139,92,246', opacity: 0.08, dur: '28s', dx: 18, dy: 22, rotate: 15 },
];

/* ── Cursor trail shapes ── */
const cursorTrails = [
  { size: 5, color: '139,92,246', opacity: 0.35, speed: 0.045, ox: 25, oy: 20 },
  { size: 4, color: '6,182,212', opacity: 0.3, speed: 0.03, ox: -30, oy: -15 },
  { size: 3, color: '236,72,153', opacity: 0.25, speed: 0.02, ox: 15, oy: -30 },
  { size: 6, color: '245,158,11', opacity: 0.2, speed: 0.012, ox: -20, oy: 25 },
];

/* ── Token type for syntax highlighting ── */
type Token = { t: string; c: string };

/* ── Code snippets per card ── */
const codeSnippets: Token[][][] = [
  // Web Dashboard — PHP
  [
    [{ t: '<?', c: '#F472B6' }, { t: 'php', c: '#F472B6' }],
    [{ t: 'class ', c: '#C084FC' }, { t: 'Dashboard ', c: '#F472B6' }, { t: 'extends ', c: '#C084FC' }, { t: 'Controller', c: '#22D3EE' }],
    [{ t: '{', c: '#9CA3AF' }],
    [{ t: '  public function ', c: '#C084FC' }, { t: 'index', c: '#22D3EE' }, { t: '()', c: '#9CA3AF' }],
    [{ t: '  {', c: '#9CA3AF' }],
    [{ t: '    $analytics', c: '#FCD34D' }, { t: ' = ', c: '#9CA3AF' }, { t: 'Analytics', c: '#22D3EE' }, { t: '::', c: '#9CA3AF' }, { t: 'query', c: '#22D3EE' }, { t: '()', c: '#9CA3AF' }],
    [{ t: '      ->', c: '#9CA3AF' }, { t: 'where', c: '#22D3EE' }, { t: '(', c: '#9CA3AF' }, { t: "'date'", c: '#34D399' }, { t: ', ', c: '#9CA3AF' }, { t: 'today', c: '#22D3EE' }, { t: '())', c: '#9CA3AF' }],
    [{ t: '      ->', c: '#9CA3AF' }, { t: 'orderBy', c: '#22D3EE' }, { t: '(', c: '#9CA3AF' }, { t: "'views'", c: '#34D399' }, { t: ')', c: '#9CA3AF' }],
    [{ t: '      ->', c: '#9CA3AF' }, { t: 'get', c: '#22D3EE' }, { t: '();', c: '#9CA3AF' }],
    [{ t: '    return ', c: '#C084FC' }, { t: 'view', c: '#22D3EE' }, { t: '(', c: '#9CA3AF' }, { t: "'dashboard'", c: '#34D399' }, { t: ');', c: '#9CA3AF' }],
    [{ t: '  }', c: '#9CA3AF' }],
    [{ t: '}', c: '#9CA3AF' }],
  ],
  // Mobile Apps — Flutter/Dart
  [
    [{ t: 'class ', c: '#C084FC' }, { t: 'AppWedoHome ', c: '#F472B6' }, { t: 'extends ', c: '#C084FC' }, { t: 'StatelessWidget', c: '#22D3EE' }, { t: ' {', c: '#9CA3AF' }],
    [{ t: '  @override', c: '#6B7280' }],
    [{ t: '  Widget ', c: '#C084FC' }, { t: 'build', c: '#22D3EE' }, { t: '(BuildContext ctx) {', c: '#9CA3AF' }],
    [{ t: '    return ', c: '#C084FC' }, { t: 'Scaffold', c: '#22D3EE' }, { t: '(', c: '#9CA3AF' }],
    [{ t: '      body: ', c: '#FCD34D' }, { t: 'Column', c: '#22D3EE' }, { t: '(', c: '#9CA3AF' }],
    [{ t: '        children: [', c: '#9CA3AF' }],
    [{ t: '          Header', c: '#22D3EE' }, { t: '(title: ', c: '#FCD34D' }, { t: "'Welcome'", c: '#34D399' }, { t: '),', c: '#9CA3AF' }],
    [{ t: '          Expanded', c: '#22D3EE' }, { t: '(', c: '#9CA3AF' }],
    [{ t: '            child: ', c: '#FCD34D' }, { t: 'ListView', c: '#22D3EE' }, { t: '.builder(', c: '#9CA3AF' }],
    [{ t: '              itemBuilder: ', c: '#FCD34D' }, { t: '(c, i)', c: '#9CA3AF' }, { t: ' =>', c: '#C084FC' }],
    [{ t: '                ProjectCard', c: '#22D3EE' }, { t: '(data: ', c: '#FCD34D' }, { t: 'projects[i]', c: '#FCD34D' }, { t: '),', c: '#9CA3AF' }],
    [{ t: '    ));', c: '#9CA3AF' }],
  ],
  // API Integration — Python
  [
    [{ t: 'from ', c: '#C084FC' }, { t: 'fastapi ', c: '#22D3EE' }, { t: 'import ', c: '#C084FC' }, { t: 'FastAPI', c: '#F472B6' }],
    [{ t: 'from ', c: '#C084FC' }, { t: 'pydantic ', c: '#22D3EE' }, { t: 'import ', c: '#C084FC' }, { t: 'BaseModel', c: '#F472B6' }],
    [{ t: '', c: '#9CA3AF' }],
    [{ t: 'app ', c: '#FCD34D' }, { t: '= ', c: '#9CA3AF' }, { t: 'FastAPI', c: '#22D3EE' }, { t: '()', c: '#9CA3AF' }],
    [{ t: '', c: '#9CA3AF' }],
    [{ t: 'class ', c: '#C084FC' }, { t: 'SyncRequest', c: '#F472B6' }, { t: '(BaseModel):', c: '#9CA3AF' }],
    [{ t: '    source', c: '#FCD34D' }, { t: ': ', c: '#9CA3AF' }, { t: 'str', c: '#22D3EE' }],
    [{ t: '    target', c: '#FCD34D' }, { t: ': ', c: '#9CA3AF' }, { t: 'str', c: '#22D3EE' }],
    [{ t: '', c: '#9CA3AF' }],
    [{ t: '@app.post', c: '#FCD34D' }, { t: '(', c: '#9CA3AF' }, { t: '"/api/v1/sync"', c: '#34D399' }, { t: ')', c: '#9CA3AF' }],
    [{ t: 'async def ', c: '#C084FC' }, { t: 'sync_data', c: '#22D3EE' }, { t: '(req: SyncRequest):', c: '#9CA3AF' }],
    [{ t: '    return ', c: '#C084FC' }, { t: '{', c: '#9CA3AF' }, { t: '"status"', c: '#34D399' }, { t: ': ', c: '#9CA3AF' }, { t: '"success"', c: '#34D399' }, { t: '}', c: '#9CA3AF' }],
  ],
];

/* ── Showcase card types ── */
const showcaseCards = [
  {
    icon: Monitor,
    title: 'Web Dashboard',
    desc: 'Custom dashboards & portals',
    accent: { color: '#8B5CF6', rgb: '139,92,246' },
    lang: 'PHP',
  },
  {
    icon: Smartphone,
    title: 'Mobile Apps',
    desc: 'iOS & Android applications',
    accent: { color: '#06B6D4', rgb: '6,182,212' },
    lang: 'Dart',
  },
  {
    icon: Link2,
    title: 'API Integration',
    desc: 'Connect your systems',
    accent: { color: '#EC4899', rgb: '236,72,153' },
    lang: 'Python',
  },
];

export default function HeroPremium() {
  const { headline, subheadline, primaryCTA, secondaryCTA, socialProof } =
    siteContent.hero;

  const sectionRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const trailRefs = useRef<(HTMLDivElement | null)[]>([]);
  const trailPos = useRef(cursorTrails.map((t) => ({ x: 0, y: 0, speed: t.speed, ox: t.ox, oy: t.oy })));
  const mouseRef = useRef({ x: 0, y: 0 });
  const posRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  const [isLoaded, setIsLoaded] = useState(false);
  const [activeCard, setActiveCard] = useState(0);
  const [hoveredStat, setHoveredStat] = useState<number | null>(null);
  const [typedChars, setTypedChars] = useState(0);

  // Compute total chars for current snippet
  const currentSnippet = codeSnippets[activeCard];
  const totalChars = currentSnippet.reduce(
    (sum, line) => sum + line.reduce((ls, tok) => ls + tok.t.length, 0) + 1, // +1 for newline
    0
  );

  // Entrance
  useEffect(() => {
    const t = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  // Auto-rotate showcase
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % showcaseCards.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  // Typewriter effect — reset on card change
  useEffect(() => {
    setTypedChars(0);
    const speed = Math.max(12, Math.floor(5500 / totalChars));
    const timer = setInterval(() => {
      setTypedChars((prev) => {
        if (prev >= totalChars) {
          clearInterval(timer);
          return prev;
        }
        return prev + 1;
      });
    }, speed);
    return () => clearInterval(timer);
  }, [activeCard, totalChars]);

  // Mouse tracking
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
      posRef.current.x += (mouseRef.current.x - posRef.current.x) * 0.04;
      posRef.current.y += (mouseRef.current.y - posRef.current.y) * 0.04;
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${posRef.current.x - 400}px, ${posRef.current.y - 400}px)`;
      }
      trailPos.current.forEach((tp, i) => {
        const tx = mouseRef.current.x + tp.ox;
        const ty = mouseRef.current.y + tp.oy;
        tp.x += (tx - tp.x) * tp.speed;
        tp.y += (ty - tp.y) * tp.speed;
        const el = trailRefs.current[i];
        if (el) el.style.transform = `translate(${tp.x}px, ${tp.y}px)`;
      });
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => {
      section.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, [handleMouseMove]);

  const card = showcaseCards[activeCard];

  return (
    <section
      ref={sectionRef}
      className="relative lg:min-h-screen flex items-center pt-[7.5rem] pb-10 lg:pt-24 lg:pb-16 overflow-hidden"
    >
      {/* ===== Background ===== */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Deep dark base */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(145deg, #050510 0%, #0a0a20 20%, #0c0c28 40%, #08081e 65%, #040412 100%)',
          }}
        />

        {/* Aurora gradient mesh */}
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 20% 50%, rgba(139,92,246,0.4) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 80% 30%, rgba(6,182,212,0.35) 0%, transparent 55%), radial-gradient(ellipse 50% 40% at 50% 80%, rgba(236,72,153,0.3) 0%, transparent 50%)',
          }}
        />

        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(139,92,246,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.3) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />

        {/* Horizon glow line */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[1px]"
          style={{
            background:
              'linear-gradient(90deg, transparent 5%, rgba(139,92,246,0.15) 25%, rgba(6,182,212,0.2) 50%, rgba(236,72,153,0.15) 75%, transparent 95%)',
          }}
        />

        {/* Ambient orbs */}
        <div
          className="absolute -top-48 -left-24 w-[700px] h-[700px] rounded-full opacity-[0.06] blur-[140px] hero-p-orb-a"
          style={{
            background: 'radial-gradient(circle, rgba(139,92,246,0.6) 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute -bottom-40 -right-20 w-[600px] h-[600px] rounded-full opacity-[0.05] blur-[120px] hero-p-orb-b"
          style={{
            background: 'radial-gradient(circle, rgba(6,182,212,0.5) 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full opacity-[0.04] blur-[100px] hero-p-orb-c"
          style={{
            background: 'radial-gradient(circle, rgba(236,72,153,0.4) 0%, transparent 70%)',
          }}
        />

        {/* Mouse-follow glow */}
        <div
          ref={glowRef}
          className="absolute w-[800px] h-[800px] rounded-full opacity-[0.05]"
          style={{
            background:
              'radial-gradient(circle, rgba(139,92,246,0.5) 0%, rgba(6,182,212,0.2) 40%, transparent 70%)',
            filter: 'blur(60px)',
            willChange: 'transform',
          }}
        />

        {/* ── Floating particles ── */}
        {particles.map((p, i) => (
          <div
            key={`p-${i}`}
            className={`absolute hero-p-float-${i}`}
            style={{
              left: p.x,
              top: p.y,
              opacity: isLoaded ? p.opacity : 0,
              transition: `opacity 1s ease ${200 + i * 40}ms`,
            }}
          >
            {p.type === 'circle' && (
              <div style={{ width: p.size, height: p.size, borderRadius: '50%', background: `rgba(${p.color},0.8)`, boxShadow: `0 0 ${p.size * 2}px rgba(${p.color},0.3)` }} />
            )}
            {p.type === 'dot' && (
              <div style={{ width: p.size, height: p.size, borderRadius: '50%', background: `rgba(${p.color},1)`, boxShadow: `0 0 ${p.size * 4}px rgba(${p.color},0.5)` }} />
            )}
            {p.type === 'square' && (
              <div style={{ width: p.size, height: p.size, background: `rgba(${p.color},0.6)`, border: `1px solid rgba(${p.color},0.3)`, transform: `rotate(${p.rotate || 0}deg)` }} />
            )}
            {p.type === 'triangle' && (
              <div style={{ width: 0, height: 0, borderLeft: `${p.size / 2}px solid transparent`, borderRight: `${p.size / 2}px solid transparent`, borderBottom: `${p.size}px solid rgba(${p.color},0.5)`, filter: `drop-shadow(0 0 ${p.size}px rgba(${p.color},0.3))`, transform: `rotate(${p.rotate || 0}deg)` }} />
            )}
            {p.type === 'ring' && (
              <div style={{ width: p.size, height: p.size, borderRadius: '50%', border: `1px solid rgba(${p.color},0.4)`, boxShadow: `0 0 ${p.size}px rgba(${p.color},0.15)` }} />
            )}
            {p.type === 'cross' && (
              <div style={{ position: 'relative', width: p.size, height: p.size, transform: `rotate(${p.rotate || 0}deg)` }}>
                <div style={{ position: 'absolute', top: '50%', left: 0, width: '100%', height: 1, background: `rgba(${p.color},0.5)`, transform: 'translateY(-50%)' }} />
                <div style={{ position: 'absolute', left: '50%', top: 0, width: 1, height: '100%', background: `rgba(${p.color},0.5)`, transform: 'translateX(-50%)' }} />
              </div>
            )}
          </div>
        ))}

        {/* ── Cursor trail shapes ── */}
        {cursorTrails.map((t, i) => (
          <div
            key={`trail-${i}`}
            ref={(el) => { trailRefs.current[i] = el; }}
            className="absolute top-0 left-0"
            style={{ opacity: isLoaded ? t.opacity : 0, transition: 'opacity 0.8s ease', willChange: 'transform', zIndex: 1 }}
          >
            <div style={{ width: t.size, height: t.size, borderRadius: '50%', background: `rgba(${t.color},0.9)`, boxShadow: `0 0 ${t.size * 4}px rgba(${t.color},0.4)` }} />
          </div>
        ))}
      </div>

      {/* ===== Content ===== */}
      <Container className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* ── Left: Content ── */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div
              className={`inline-flex items-center gap-2 px-5 py-2 rounded-full mb-7 transition-all duration-700 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{
                background: 'linear-gradient(135deg, rgba(139,92,246,0.15) 0%, rgba(6,182,212,0.1) 100%)',
                border: '1px solid rgba(139,92,246,0.25)',
              }}
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: '#8B5CF6', animation: 'ping 1.5s cubic-bezier(0,0,0.2,1) infinite' }} />
                <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: '#8B5CF6' }} />
              </span>
              <span className="text-sm font-semibold" style={{ color: '#C4B5FD' }}>
                Full-Stack Development Agency
              </span>
            </div>

            {/* Headline */}
            <h1
              className={`text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.08] mb-6 transition-all duration-700 delay-100 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              {headline.split(' ').map((word, i) => {
                const isHighlight = word === 'Apps' || word === 'Build';
                return (
                  <span
                    key={i}
                    className="inline-block mr-[0.25em]"
                    style={{
                      color: isHighlight ? 'transparent' : 'rgba(255,255,255,0.95)',
                      background: isHighlight
                        ? 'linear-gradient(135deg, #8B5CF6 0%, #06B6D4 50%, #EC4899 100%)'
                        : 'none',
                      WebkitBackgroundClip: isHighlight ? 'text' : undefined,
                      backgroundClip: isHighlight ? 'text' : undefined,
                      backgroundSize: isHighlight ? '200% 200%' : undefined,
                      animation: isHighlight ? 'heroPGradText 4s ease infinite' : undefined,
                    }}
                  >
                    {word}
                  </span>
                );
              })}
            </h1>

            {/* Subheadline */}
            <p
              className={`text-base sm:text-lg lg:text-xl max-w-xl mx-auto lg:mx-0 leading-relaxed mb-9 transition-all duration-700 delay-200 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
              style={{ color: 'rgba(255,255,255,0.5)' }}
            >
              {subheadline}
            </p>

            {/* CTA Buttons */}
            <div
              className={`flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12 transition-all duration-700 delay-300 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              <a
                href="#contact"
                className="group inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl text-base font-semibold text-white"
                style={{
                  background: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 50%, #6D28D9 100%)',
                  boxShadow: '0 8px 32px -4px rgba(139,92,246,0.4), 0 0 0 1px rgba(139,92,246,0.3)',
                  transition: 'all 0.4s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 14px 40px -4px rgba(139,92,246,0.5), 0 0 0 1px rgba(139,92,246,0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 32px -4px rgba(139,92,246,0.4), 0 0 0 1px rgba(139,92,246,0.3)';
                }}
              >
                <Sparkles className="w-5 h-5" />
                {primaryCTA}
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>

              <a
                href="#products"
                className="group inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl text-base font-semibold"
                style={{
                  color: 'rgba(255,255,255,0.8)',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  transition: 'all 0.4s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                  e.currentTarget.style.borderColor = 'rgba(139,92,246,0.3)';
                  e.currentTarget.style.color = '#fff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                  e.currentTarget.style.color = 'rgba(255,255,255,0.8)';
                }}
              >
                <ChevronRight className="w-5 h-5" />
                {secondaryCTA}
              </a>
            </div>

            {/* Social Proof Stats */}
            <div
              className={`flex flex-wrap gap-6 sm:gap-10 justify-center lg:justify-start transition-all duration-700 delay-[400ms] ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              {socialProof.map((stat, index) => {
                const colors = ['139,92,246', '6,182,212', '236,72,153'];
                const c = colors[index % colors.length];
                const isHover = hoveredStat === index;
                return (
                  <div
                    key={index}
                    className="text-center lg:text-left cursor-default"
                    onMouseEnter={() => setHoveredStat(index)}
                    onMouseLeave={() => setHoveredStat(null)}
                  >
                    <div
                      className="text-3xl sm:text-4xl font-bold mb-0.5"
                      style={{
                        color: isHover ? `rgb(${c})` : 'rgba(255,255,255,0.9)',
                        transition: 'color 0.4s ease',
                      }}
                    >
                      {stat.value}
                    </div>
                    <div
                      className="text-sm font-medium"
                      style={{
                        color: isHover ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.35)',
                        transition: 'color 0.4s ease',
                      }}
                    >
                      {stat.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── Right: Showcase ── */}
          <div
            className={`relative transition-all duration-1000 delay-500 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            {/* Decorative rings behind the card */}
            <div
              className="absolute -top-12 -right-12 w-64 h-64 rounded-full hero-p-ring-spin"
              style={{
                border: '1px solid rgba(139,92,246,0.08)',
              }}
            />
            <div
              className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full hero-p-ring-spin-rev"
              style={{
                border: '1px solid rgba(6,182,212,0.08)',
              }}
            />

            {/* Main showcase card */}
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                boxShadow: '0 24px 64px -16px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)',
              }}
            >
              {/* Top edge shine */}
              <div
                className="absolute top-0 inset-x-0 h-[1px]"
                style={{
                  background: `linear-gradient(90deg, transparent 5%, rgba(${card.accent.rgb},0.4) 30%, rgba(139,92,246,0.3) 70%, transparent 95%)`,
                }}
              />

              {/* Window header */}
              <div
                className="flex items-center justify-between px-5 py-4"
                style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
              >
                <div className="flex items-center gap-3">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ background: '#EF4444' }} />
                    <div className="w-3 h-3 rounded-full" style={{ background: '#F59E0B' }} />
                    <div className="w-3 h-3 rounded-full" style={{ background: '#22C55E' }} />
                  </div>
                  <div
                    className="text-xs font-medium px-3 py-1 rounded-md"
                    style={{
                      background: 'rgba(255,255,255,0.05)',
                      color: 'rgba(255,255,255,0.4)',
                    }}
                  >
                    appwedo.com
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {showcaseCards.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveCard(idx)}
                      className="w-2 h-2 rounded-full transition-all duration-400"
                      style={{
                        background: activeCard === idx
                          ? showcaseCards[idx].accent.color
                          : 'rgba(255,255,255,0.15)',
                        boxShadow: activeCard === idx
                          ? `0 0 8px ${showcaseCards[idx].accent.color}50`
                          : 'none',
                        transform: activeCard === idx ? 'scale(1.3)' : 'scale(1)',
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Card content */}
              <div className="p-4 sm:p-6 lg:p-8">
                {/* Active card header */}
                <div className="flex items-center gap-4 mb-6">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500"
                    style={{
                      background: `rgba(${card.accent.rgb}, 0.1)`,
                      border: `1px solid rgba(${card.accent.rgb}, 0.2)`,
                      boxShadow: `0 4px 16px rgba(${card.accent.rgb}, 0.15)`,
                    }}
                  >
                    <card.icon className="w-6 h-6" style={{ color: card.accent.color }} />
                  </div>
                  <div>
                    <div className="text-base font-bold text-white">{card.title}</div>
                    <div className="text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>{card.desc}</div>
                  </div>
                </div>

                {/* Code area with typewriter effect */}
                <div
                  className="CodeSection rounded-xl p-3 sm:p-4 mb-4 sm:mb-5 overflow-hidden"
                  style={{
                    background: 'rgba(0,0,0,0.35)',
                    border: '1px solid rgba(255,255,255,0.04)',
                  }}
                >
                  {/* Language badge */}
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded"
                      style={{
                        background: `rgba(${card.accent.rgb}, 0.12)`,
                        color: card.accent.color,
                        border: `1px solid rgba(${card.accent.rgb}, 0.2)`,
                      }}
                    >
                      {card.lang}
                    </span>
                    <div className="flex gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.1)' }} />
                      <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.1)' }} />
                      <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.1)' }} />
                    </div>
                  </div>

                  {/* Typewriter code */}
                  <div className="font-mono text-[9px] sm:text-xs leading-[1.6] sm:leading-[1.7]">
                    {(() => {
                      let charCount = 0;
                      return currentSnippet.map((line, li) => {
                        const lineStart = charCount;
                        const lineChars = line.reduce((s, tok) => s + tok.t.length, 0);
                        charCount += lineChars + 1; // +1 for newline
                        const lineVisible = typedChars > lineStart;

                        return (
                          <div
                            key={`${activeCard}-${li}`}
                            className="flex"
                            style={{ opacity: lineVisible ? 1 : 0.15, transition: 'opacity 0.15s ease', minHeight: '1.2em' }}
                          >
                            {/* Line number */}
                            <span
                              className="w-4 sm:w-6 text-right mr-2 sm:mr-3 select-none flex-shrink-0"
                              style={{ color: lineVisible ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.06)' }}
                            >
                              {li + 1}
                            </span>
                            {/* Tokens */}
                            <span className="flex-1" style={{ whiteSpace: 'pre' }}>
                              {(() => {
                                let tokenStart = lineStart;
                                return line.map((tok, ti) => {
                                  const tokStart = tokenStart;
                                  tokenStart += tok.t.length;
                                  const charsToShow = Math.max(0, Math.min(tok.t.length, typedChars - tokStart));
                                  const visibleText = tok.t.substring(0, charsToShow);
                                  const isLastTyped = typedChars > tokStart && typedChars <= tokStart + tok.t.length;

                                  return (
                                    <span key={ti} style={{ color: tok.c }}>
                                      {visibleText}
                                      {isLastTyped && (
                                        <span
                                          className="hero-p-cursor-blink"
                                          style={{
                                            display: 'inline-block',
                                            width: 1.5,
                                            height: '1em',
                                            background: card.accent.color,
                                            marginLeft: 1,
                                            verticalAlign: 'text-bottom',
                                            boxShadow: `0 0 4px ${card.accent.color}`,
                                          }}
                                        />
                                      )}
                                    </span>
                                  );
                                });
                              })()}
                            </span>
                          </div>
                        );
                      });
                    })()}
                  </div>
                </div>

                {/* Status bar */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full" style={{ background: '#22C55E', boxShadow: '0 0 6px rgba(34,197,94,0.5)' }} />
                      <span className="text-xs font-medium" style={{ color: 'rgba(255,255,255,0.45)' }}>Live</span>
                    </div>
                    <div className="text-xs" style={{ color: 'rgba(255,255,255,0.2)' }}>|</div>
                    <span className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>45ms</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {[Code2, Cpu, Globe].map((Icon, idx) => (
                      <div
                        key={idx}
                        className="w-7 h-7 rounded-md flex items-center justify-center"
                        style={{
                          background: 'rgba(255,255,255,0.04)',
                          border: '1px solid rgba(255,255,255,0.06)',
                        }}
                      >
                        <Icon className="w-3.5 h-3.5" style={{ color: 'rgba(255,255,255,0.3)' }} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Floating mini cards */}
            <div
              className="absolute -top-4 -right-4 sm:top-2 sm:-right-6 lg:-top-6 lg:-right-10 rounded-xl p-3 sm:p-4 z-10 hero-p-float-card"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                boxShadow: '0 12px 32px -8px rgba(0,0,0,0.4)',
              }}
            >
              <div className="flex items-center gap-2.5">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center"
                  style={{
                    background: 'rgba(34,197,94,0.1)',
                    border: '1px solid rgba(34,197,94,0.2)',
                  }}
                >
                  <Zap className="w-4 h-4" style={{ color: '#22C55E' }} />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">All Systems Go</div>
                  <div className="text-[10px]" style={{ color: 'rgba(255,255,255,0.35)' }}>100% uptime</div>
                </div>
              </div>
            </div>

            <div
              className="absolute -bottom-4 -left-4 sm:bottom-6 sm:-left-6 lg:bottom-8 lg:-left-10 rounded-xl p-3 sm:p-4 z-10 hero-p-float-card-slow"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                boxShadow: '0 12px 32px -8px rgba(0,0,0,0.4)',
              }}
            >
              <div className="flex items-center gap-2.5">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center"
                  style={{
                    background: 'rgba(139,92,246,0.1)',
                    border: '1px solid rgba(139,92,246,0.2)',
                  }}
                >
                  <Globe className="w-4 h-4" style={{ color: '#8B5CF6' }} />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">3 Continents</div>
                  <div className="text-[10px]" style={{ color: 'rgba(255,255,255,0.35)' }}>Global delivery</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* CSS Animations */}
      <style>{`
        .hero-p-orb-a { animation: heroPOrbA 26s ease-in-out infinite; }
        .hero-p-orb-b { animation: heroPOrbB 32s ease-in-out infinite; }
        .hero-p-orb-c { animation: heroPOrbC 28s ease-in-out infinite; }
        @keyframes heroPOrbA {
          0%,100%{transform:translate(0,0) scale(1)}
          33%{transform:translate(40px,-30px) scale(1.06)}
          66%{transform:translate(-30px,25px) scale(0.94)}
        }
        @keyframes heroPOrbB {
          0%,100%{transform:translate(0,0) scale(1)}
          33%{transform:translate(-35px,20px) scale(1.05)}
          66%{transform:translate(25px,-25px) scale(0.95)}
        }
        @keyframes heroPOrbC {
          0%,100%{transform:translate(0,0) scale(1)}
          33%{transform:translate(20px,30px) scale(1.04)}
          66%{transform:translate(-25px,-20px) scale(0.96)}
        }

        .hero-p-ring-spin { animation: heroPRingSpin 60s linear infinite; }
        .hero-p-ring-spin-rev { animation: heroPRingSpin 45s linear infinite reverse; }
        @keyframes heroPRingSpin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }

        .hero-p-float-card { animation: heroPFloatCard 4s ease-in-out infinite; }
        .hero-p-float-card-slow { animation: heroPFloatCard 5s ease-in-out infinite 0.5s; }
        @keyframes heroPFloatCard {
          0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)}
        }

        .hero-p-cursor-blink { animation: heroPCursorBlink 0.6s step-end infinite; }
        @keyframes heroPCursorBlink {
          0%,100%{opacity:1} 50%{opacity:0}
        }

        @keyframes heroPGradText {
          0%,100%{background-position:0% 50%}
          50%{background-position:100% 50%}
        }

        .CodeSection { min-height: 140px; }
        @media (min-width: 640px) { .CodeSection { min-height: 220px; } }

        ${particles.map((p, i) => `
          .hero-p-float-${i}{animation:heroPF${i} ${p.dur} ease-in-out infinite}
          @keyframes heroPF${i}{
            0%,100%{transform:translate(0,0) rotate(0deg)}
            25%{transform:translate(${p.dx * 0.6}px,${p.dy * 0.4}px) rotate(${(p.rotate || 0) + 15}deg)}
            50%{transform:translate(${p.dx}px,${p.dy}px) rotate(${p.rotate || 0}deg)}
            75%{transform:translate(${p.dx * 0.3}px,${p.dy * 0.7}px) rotate(${(p.rotate || 0) + 8}deg)}
          }
        `).join('')}
      `}</style>
    </section>
  );
}
