import { useCallback, useEffect, useRef, useState } from 'react';
import { Container } from '../components';
import { siteContent } from '../content';
import {
  Sparkles,
  Target,
  Eye,
  Rocket,
  Users,
  Zap,
  TrendingUp,
} from 'lucide-react';

/* ── Floating shapes config ── */
const floatingShapes = [
  // Circles
  { type: 'circle', size: 6, x: '8%', y: '12%', color: '236,72,153', opacity: 0.15, dur: '22s', dx: 35, dy: -40, rotate: 0 },
  { type: 'circle', size: 4, x: '85%', y: '18%', color: '99,102,241', opacity: 0.12, dur: '28s', dx: -25, dy: 30, rotate: 0 },
  { type: 'circle', size: 8, x: '72%', y: '75%', color: '168,85,247', opacity: 0.1, dur: '26s', dx: 40, dy: -35, rotate: 0 },
  { type: 'circle', size: 3, x: '22%', y: '82%', color: '236,72,153', opacity: 0.18, dur: '20s', dx: -30, dy: 25, rotate: 0 },
  { type: 'circle', size: 5, x: '50%', y: '8%', color: '20,184,166', opacity: 0.12, dur: '30s', dx: 20, dy: -20, rotate: 0 },
  // Dots (tiny circles)
  { type: 'dot', size: 2, x: '15%', y: '45%', color: '99,102,241', opacity: 0.25, dur: '18s', dx: 20, dy: -15, rotate: 0 },
  { type: 'dot', size: 3, x: '92%', y: '55%', color: '236,72,153', opacity: 0.2, dur: '16s', dx: -18, dy: 22, rotate: 0 },
  { type: 'dot', size: 2, x: '42%', y: '92%', color: '168,85,247', opacity: 0.22, dur: '24s', dx: 15, dy: -25, rotate: 0 },
  { type: 'dot', size: 2, x: '65%', y: '5%', color: '245,158,11', opacity: 0.18, dur: '19s', dx: -12, dy: 18, rotate: 0 },
  { type: 'dot', size: 3, x: '3%', y: '68%', color: '20,184,166', opacity: 0.2, dur: '22s', dx: 25, dy: -10, rotate: 0 },
  // Squares
  { type: 'square', size: 7, x: '18%', y: '25%', color: '99,102,241', opacity: 0.1, dur: '32s', dx: -20, dy: 35, rotate: 45 },
  { type: 'square', size: 5, x: '78%', y: '40%', color: '236,72,153', opacity: 0.08, dur: '28s', dx: 30, dy: -20, rotate: 30 },
  { type: 'square', size: 6, x: '55%', y: '88%', color: '168,85,247', opacity: 0.1, dur: '25s', dx: -25, dy: 30, rotate: 60 },
  { type: 'square', size: 4, x: '90%', y: '85%', color: '20,184,166', opacity: 0.12, dur: '30s', dx: 15, dy: -35, rotate: 15 },
  // Triangles
  { type: 'triangle', size: 8, x: '35%', y: '15%', color: '168,85,247', opacity: 0.09, dur: '34s', dx: 25, dy: 30, rotate: 20 },
  { type: 'triangle', size: 6, x: '88%', y: '65%', color: '99,102,241', opacity: 0.08, dur: '30s', dx: -30, dy: -25, rotate: 40 },
  { type: 'triangle', size: 7, x: '10%', y: '90%', color: '245,158,11', opacity: 0.1, dur: '26s', dx: 35, dy: -20, rotate: 55 },
  { type: 'triangle', size: 5, x: '62%', y: '35%', color: '236,72,153', opacity: 0.07, dur: '28s', dx: -20, dy: 40, rotate: 10 },
  // Ring (hollow circle)
  { type: 'ring', size: 12, x: '28%', y: '55%', color: '99,102,241', opacity: 0.07, dur: '36s', dx: 30, dy: -25, rotate: 0 },
  { type: 'ring', size: 10, x: '75%', y: '10%', color: '236,72,153', opacity: 0.06, dur: '32s', dx: -20, dy: 35, rotate: 0 },
];

/* ── Mouse-trailing shapes config ── */
const cursorShapes = [
  { type: 'circle', size: 6, color: '236,72,153', opacity: 0.3, speed: 0.04, offsetX: 30, offsetY: 25 },
  { type: 'square', size: 5, color: '99,102,241', opacity: 0.25, speed: 0.025, offsetX: -35, offsetY: -20 },
  { type: 'triangle', size: 7, color: '168,85,247', opacity: 0.2, speed: 0.015, offsetX: 20, offsetY: -35 },
  { type: 'dot', size: 3, color: '20,184,166', opacity: 0.35, speed: 0.05, offsetX: -25, offsetY: 30 },
  { type: 'ring', size: 10, color: '245,158,11', opacity: 0.15, speed: 0.01, offsetX: 40, offsetY: 10 },
];

const statAccents = [
  { color: '#6366F1', rgb: '99,102,241' },
  { color: '#14B8A6', rgb: '20,184,166' },
  { color: '#F59E0B', rgb: '245,158,11' },
  { color: '#EC4899', rgb: '236,72,153' },
];

const valueIcons = [Target, Zap, Users, TrendingUp];

export default function About() {
  const { label, headline, subheadline, story, mission, vision, values, stats } =
    siteContent.about;
  const sectionRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const cursorShapeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cursorPosRefs = useRef(cursorShapes.map(s => ({ x: 0, y: 0, offsetX: s.offsetX, offsetY: s.offsetY, speed: s.speed })));
  const mouseRef = useRef({ x: 0, y: 0 });
  const posRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredValue, setHoveredValue] = useState<number | null>(null);
  const [hoveredStat, setHoveredStat] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.08 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

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
      posRef.current.x += (mouseRef.current.x - posRef.current.x) * 0.05;
      posRef.current.y += (mouseRef.current.y - posRef.current.y) * 0.05;
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${posRef.current.x - 350}px, ${posRef.current.y - 350}px)`;
      }
      // Animate cursor-trailing shapes
      cursorPosRefs.current.forEach((cp, i) => {
        const targetX = mouseRef.current.x + cp.offsetX;
        const targetY = mouseRef.current.y + cp.offsetY;
        cp.x += (targetX - cp.x) * cp.speed;
        cp.y += (targetY - cp.y) * cp.speed;
        const el = cursorShapeRefs.current[i];
        if (el) {
          el.style.transform = `translate(${cp.x}px, ${cp.y}px)`;
        }
      });
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => {
      section.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, [handleMouseMove]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-24 lg:py-36 overflow-hidden"
    >
      {/* ===== Background ===== */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Deep charcoal-indigo base */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(162deg, #08091a 0%, #0c0e22 25%, #10112a 50%, #0d0b1f 75%, #08091a 100%)',
          }}
        />

        {/* Geometric constellation pattern — unique to About */}
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.02]"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <radialGradient id="aboutConstellation" cx="30%" cy="40%">
              <stop offset="0%" stopColor="#EC4899" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#EC4899" stopOpacity="0" />
            </radialGradient>
          </defs>
          {/* Hexagonal grid lines */}
          {Array.from({ length: 20 }).map((_, i) => {
            const cx = ((i % 5) / 4) * 1920;
            const cy = (Math.floor(i / 5) / 3) * 900;
            return (
              <g key={`hex-${i}`}>
                <circle
                  cx={cx}
                  cy={cy}
                  r="120"
                  fill="none"
                  stroke="rgba(236,72,153,0.08)"
                  strokeWidth="0.5"
                />
                <circle
                  cx={cx}
                  cy={cy}
                  r="60"
                  fill="none"
                  stroke="rgba(99,102,241,0.1)"
                  strokeWidth="0.3"
                />
              </g>
            );
          })}
          {/* Connecting lines between nodes */}
          {Array.from({ length: 16 }).map((_, i) => {
            const x1 = ((i % 4) / 3) * 1920;
            const y1 = (Math.floor(i / 4) / 3) * 900;
            const x2 = (((i + 1) % 4) / 3) * 1920;
            const y2 = (Math.floor((i + 1) / 4) / 3) * 900;
            return (
              <line
                key={`conn-${i}`}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="rgba(168,85,247,0.06)"
                strokeWidth="0.4"
              />
            );
          })}
          <circle cx="580" cy="350" r="250" fill="url(#aboutConstellation)" />
        </svg>

        {/* Large double-stroke diamond/compass watermark — right side */}
        <svg
          className="absolute top-1/2 right-0 w-[550px] h-[550px]"
          style={{
            opacity: isVisible ? 0.05 : 0,
            transform: isVisible
              ? 'translateY(-50%) rotate(0deg) scale(1)'
              : 'translateY(-50%) rotate(-10deg) scale(0.8)',
            transition: 'opacity 1.4s ease, transform 1.4s ease',
          }}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 200 200"
        >
          {/* Outer diamond */}
          <path
            d="M100 10 L190 100 L100 190 L10 100 Z"
            fill="none"
            stroke="#EC4899"
            strokeWidth="0.6"
            strokeLinecap="round"
          />
          <path
            d="M100 10 L190 100 L100 190 L10 100 Z"
            fill="none"
            stroke="#6366F1"
            strokeWidth="0.3"
            strokeDasharray="4 3"
          />
          {/* Inner diamond */}
          <path
            d="M100 50 L150 100 L100 150 L50 100 Z"
            fill="none"
            stroke="#EC4899"
            strokeWidth="0.4"
          />
          <path
            d="M100 50 L150 100 L100 150 L50 100 Z"
            fill="none"
            stroke="#A855F7"
            strokeWidth="0.2"
            strokeDasharray="3 2"
          />
          {/* Cross lines */}
          <line
            x1="100"
            y1="10"
            x2="100"
            y2="190"
            stroke="#6366F1"
            strokeWidth="0.2"
            strokeDasharray="2 4"
          />
          <line
            x1="10"
            y1="100"
            x2="190"
            y2="100"
            stroke="#6366F1"
            strokeWidth="0.2"
            strokeDasharray="2 4"
          />
        </svg>

        {/* Ambient orbs */}
        <div
          className="absolute -top-40 left-1/4 w-[550px] h-[550px] rounded-full opacity-[0.07] blur-[130px] about-orb-a"
          style={{
            background:
              'radial-gradient(circle, rgba(236,72,153,0.5) 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute -bottom-32 right-1/3 w-[500px] h-[500px] rounded-full opacity-[0.06] blur-[110px] about-orb-b"
          style={{
            background:
              'radial-gradient(circle, rgba(99,102,241,0.5) 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute top-1/3 right-0 w-[400px] h-[400px] rounded-full opacity-[0.04] blur-[100px]"
          style={{
            background:
              'radial-gradient(circle, rgba(168,85,247,0.4) 0%, transparent 70%)',
          }}
        />

        {/* Mouse-follow glow */}
        <div
          ref={glowRef}
          className="absolute w-[700px] h-[700px] rounded-full opacity-[0.04]"
          style={{
            background:
              'radial-gradient(circle, rgba(236,72,153,0.4) 0%, rgba(99,102,241,0.15) 45%, transparent 70%)',
            filter: 'blur(50px)',
            willChange: 'transform',
          }}
        />

        {/* ===== Floating autonomous shapes ===== */}
        {floatingShapes.map((shape, i) => (
          <div
            key={`float-${i}`}
            className={`absolute about-float-${i}`}
            style={{
              left: shape.x,
              top: shape.y,
              opacity: isVisible ? shape.opacity : 0,
              transition: `opacity 1.2s ease ${300 + i * 60}ms`,
            }}
          >
            {shape.type === 'circle' && (
              <div
                style={{
                  width: shape.size,
                  height: shape.size,
                  borderRadius: '50%',
                  background: `rgba(${shape.color}, 0.8)`,
                  boxShadow: `0 0 ${shape.size * 2}px rgba(${shape.color}, 0.3)`,
                }}
              />
            )}
            {shape.type === 'dot' && (
              <div
                style={{
                  width: shape.size,
                  height: shape.size,
                  borderRadius: '50%',
                  background: `rgba(${shape.color}, 1)`,
                  boxShadow: `0 0 ${shape.size * 3}px rgba(${shape.color}, 0.4)`,
                }}
              />
            )}
            {shape.type === 'square' && (
              <div
                style={{
                  width: shape.size,
                  height: shape.size,
                  background: `rgba(${shape.color}, 0.6)`,
                  border: `1px solid rgba(${shape.color}, 0.3)`,
                  transform: `rotate(${shape.rotate}deg)`,
                }}
              />
            )}
            {shape.type === 'triangle' && (
              <div
                style={{
                  width: 0,
                  height: 0,
                  borderLeft: `${shape.size / 2}px solid transparent`,
                  borderRight: `${shape.size / 2}px solid transparent`,
                  borderBottom: `${shape.size}px solid rgba(${shape.color}, 0.5)`,
                  filter: `drop-shadow(0 0 ${shape.size}px rgba(${shape.color}, 0.3))`,
                  transform: `rotate(${shape.rotate}deg)`,
                }}
              />
            )}
            {shape.type === 'ring' && (
              <div
                style={{
                  width: shape.size,
                  height: shape.size,
                  borderRadius: '50%',
                  border: `1px solid rgba(${shape.color}, 0.4)`,
                  boxShadow: `0 0 ${shape.size}px rgba(${shape.color}, 0.15), inset 0 0 ${shape.size / 2}px rgba(${shape.color}, 0.05)`,
                }}
              />
            )}
          </div>
        ))}

        {/* ===== Mouse-following shapes ===== */}
        {cursorShapes.map((shape, i) => (
          <div
            key={`cursor-${i}`}
            ref={(el) => { cursorShapeRefs.current[i] = el; }}
            className="absolute top-0 left-0"
            style={{
              opacity: isVisible ? shape.opacity : 0,
              transition: 'opacity 0.8s ease',
              willChange: 'transform',
              zIndex: 1,
            }}
          >
            {shape.type === 'circle' && (
              <div
                style={{
                  width: shape.size,
                  height: shape.size,
                  borderRadius: '50%',
                  background: `rgba(${shape.color}, 0.9)`,
                  boxShadow: `0 0 ${shape.size * 3}px rgba(${shape.color}, 0.4)`,
                }}
              />
            )}
            {shape.type === 'dot' && (
              <div
                style={{
                  width: shape.size,
                  height: shape.size,
                  borderRadius: '50%',
                  background: `rgba(${shape.color}, 1)`,
                  boxShadow: `0 0 ${shape.size * 4}px rgba(${shape.color}, 0.5)`,
                }}
              />
            )}
            {shape.type === 'square' && (
              <div
                className="about-cursor-spin"
                style={{
                  width: shape.size,
                  height: shape.size,
                  background: `rgba(${shape.color}, 0.7)`,
                  border: `1px solid rgba(${shape.color}, 0.4)`,
                }}
              />
            )}
            {shape.type === 'triangle' && (
              <div
                className="about-cursor-spin-slow"
                style={{
                  width: 0,
                  height: 0,
                  borderLeft: `${shape.size / 2}px solid transparent`,
                  borderRight: `${shape.size / 2}px solid transparent`,
                  borderBottom: `${shape.size}px solid rgba(${shape.color}, 0.6)`,
                  filter: `drop-shadow(0 0 ${shape.size}px rgba(${shape.color}, 0.4))`,
                }}
              />
            )}
            {shape.type === 'ring' && (
              <div
                className="about-cursor-spin-slow"
                style={{
                  width: shape.size,
                  height: shape.size,
                  borderRadius: '50%',
                  border: `1.5px solid rgba(${shape.color}, 0.5)`,
                  boxShadow: `0 0 ${shape.size * 1.5}px rgba(${shape.color}, 0.2)`,
                }}
              />
            )}
          </div>
        ))}
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
              background:
                'linear-gradient(135deg, rgba(236,72,153,0.15) 0%, rgba(99,102,241,0.1) 100%)',
              border: '1px solid rgba(236,72,153,0.25)',
            }}
          >
            <Sparkles className="w-4 h-4" style={{ color: '#F9A8D4' }} />
            <span className="text-sm font-semibold" style={{ color: '#FBCFE8' }}>
              {label}
            </span>
          </div>

          <h2
            className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-5 leading-snug sm:leading-relaxed lg:leading-[1.3] transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            {headline}
          </h2>

          <p
            className={`text-base lg:text-lg max-w-2xl mx-auto transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ color: 'rgba(255,255,255,0.55)' }}
          >
            {subheadline}
          </p>
        </div>

        {/* Story Section — asymmetric layout */}
        <div className="grid lg:grid-cols-5 gap-6 lg:gap-8 mb-16 lg:mb-20">
          {/* Story card — takes 3 columns */}
          <div
            className={`lg:col-span-3 transition-all duration-700 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div
              className="relative h-full rounded-2xl overflow-hidden p-7 lg:p-9"
              style={{
                background:
                  'linear-gradient(170deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
                border: '1px solid rgba(255,255,255,0.08)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
              }}
            >
              {/* Top edge shine */}
              <div
                className="absolute top-0 inset-x-0 h-[1px]"
                style={{
                  background:
                    'linear-gradient(90deg, transparent 5%, rgba(236,72,153,0.3) 30%, rgba(99,102,241,0.3) 70%, transparent 95%)',
                }}
              />

              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{
                    background: 'rgba(236,72,153,0.1)',
                    border: '1px solid rgba(236,72,153,0.2)',
                  }}
                >
                  <Rocket
                    className="w-5 h-5"
                    style={{ color: '#EC4899' }}
                  />
                </div>
                <h3
                  className="text-lg font-bold"
                  style={{ color: 'rgba(255,255,255,0.95)' }}
                >
                  Our Story
                </h3>
              </div>

              <p
                className="text-[15px] leading-[1.8] mb-4"
                style={{ color: 'rgba(255,255,255,0.55)' }}
              >
                {story[0]}
              </p>
              <p
                className="text-[15px] leading-[1.8]"
                style={{ color: 'rgba(255,255,255,0.5)' }}
              >
                {story[1]}
              </p>
            </div>
          </div>

          {/* Mission & Vision — stacked, takes 2 columns */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Mission */}
            <div
              className={`flex-1 transition-all duration-700 delay-[400ms] ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
            >
              <div
                className="relative h-full rounded-2xl overflow-hidden p-7"
                style={{
                  background:
                    'linear-gradient(170deg, rgba(99,102,241,0.06) 0%, rgba(255,255,255,0.02) 100%)',
                  border: '1px solid rgba(99,102,241,0.12)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                }}
              >
                <div
                  className="absolute top-0 inset-x-0 h-[1px]"
                  style={{
                    background:
                      'linear-gradient(90deg, transparent 10%, rgba(99,102,241,0.4) 50%, transparent 90%)',
                  }}
                />

                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{
                      background: 'rgba(99,102,241,0.1)',
                      border: '1px solid rgba(99,102,241,0.2)',
                    }}
                  >
                    <Target
                      className="w-5 h-5"
                      style={{ color: '#818CF8' }}
                    />
                  </div>
                  <h3
                    className="text-lg font-bold"
                    style={{ color: 'rgba(255,255,255,0.95)' }}
                  >
                    Our Mission
                  </h3>
                </div>
                <p
                  className="text-[14px] leading-[1.75]"
                  style={{ color: 'rgba(255,255,255,0.55)' }}
                >
                  {mission}
                </p>
              </div>
            </div>

            {/* Vision */}
            <div
              className={`flex-1 transition-all duration-700 delay-500 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
            >
              <div
                className="relative h-full rounded-2xl overflow-hidden p-7"
                style={{
                  background:
                    'linear-gradient(170deg, rgba(168,85,247,0.06) 0%, rgba(255,255,255,0.02) 100%)',
                  border: '1px solid rgba(168,85,247,0.12)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                }}
              >
                <div
                  className="absolute top-0 inset-x-0 h-[1px]"
                  style={{
                    background:
                      'linear-gradient(90deg, transparent 10%, rgba(168,85,247,0.4) 50%, transparent 90%)',
                  }}
                />

                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{
                      background: 'rgba(168,85,247,0.1)',
                      border: '1px solid rgba(168,85,247,0.2)',
                    }}
                  >
                    <Eye
                      className="w-5 h-5"
                      style={{ color: '#C084FC' }}
                    />
                  </div>
                  <h3
                    className="text-lg font-bold"
                    style={{ color: 'rgba(255,255,255,0.95)' }}
                  >
                    Our Vision
                  </h3>
                </div>
                <p
                  className="text-[14px] leading-[1.75]"
                  style={{ color: 'rgba(255,255,255,0.55)' }}
                >
                  {vision}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div
          className={`flex items-center gap-4 max-w-4xl mx-auto mb-16 lg:mb-20 transition-all duration-700 delay-500 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div
            className="flex-1 h-[1px]"
            style={{
              background:
                'linear-gradient(90deg, transparent, rgba(236,72,153,0.2) 50%, transparent)',
            }}
          />
          <div className="flex items-center gap-2">
            <div
              className="w-1 h-1 rounded-full"
              style={{ background: 'rgba(236,72,153,0.4)' }}
            />
            <div
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: 'rgba(99,102,241,0.5)' }}
            />
            <div
              className="w-1 h-1 rounded-full"
              style={{ background: 'rgba(168,85,247,0.4)' }}
            />
          </div>
          <div
            className="flex-1 h-[1px]"
            style={{
              background:
                'linear-gradient(90deg, transparent, rgba(99,102,241,0.2) 50%, transparent)',
            }}
          />
        </div>

        {/* Core Values */}
        <div className="mb-16 lg:mb-20">
          <h3
            className={`text-center text-xl sm:text-2xl font-bold text-white mb-10 transition-all duration-700 delay-500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            What Drives Us
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((value, index) => {
              const accent = statAccents[index % statAccents.length];
              const Icon = valueIcons[index % valueIcons.length];
              const isHover = hoveredValue === index;

              return (
                <div
                  key={index}
                  className={`transition-all duration-700 ${
                    isVisible
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${600 + index * 100}ms` }}
                  onMouseEnter={() => setHoveredValue(index)}
                  onMouseLeave={() => setHoveredValue(null)}
                >
                  <div
                    className="relative h-full rounded-2xl overflow-hidden p-6 lg:p-7 text-center cursor-default"
                    style={{
                      background: isHover
                        ? `linear-gradient(170deg, rgba(${accent.rgb}, 0.1) 0%, rgba(255,255,255,0.03) 100%)`
                        : 'rgba(255,255,255,0.03)',
                      border: `1px solid ${
                        isHover
                          ? `rgba(${accent.rgb}, 0.3)`
                          : 'rgba(255,255,255,0.06)'
                      }`,
                      backdropFilter: 'blur(16px)',
                      WebkitBackdropFilter: 'blur(16px)',
                      transform: isHover ? 'translateY(-4px)' : 'translateY(0)',
                      boxShadow: isHover
                        ? `0 16px 40px -10px rgba(0,0,0,0.5), 0 0 30px -10px rgba(${accent.rgb}, 0.12)`
                        : '0 2px 10px -2px rgba(0,0,0,0.2)',
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

                    {/* Icon */}
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-5"
                      style={{
                        background: isHover
                          ? `linear-gradient(135deg, ${accent.color}, ${accent.color}cc)`
                          : `rgba(${accent.rgb}, 0.08)`,
                        border: `1px solid rgba(${accent.rgb}, ${
                          isHover ? 0.5 : 0.15
                        })`,
                        boxShadow: isHover
                          ? `0 6px 20px rgba(${accent.rgb}, 0.3)`
                          : 'none',
                        transition: 'all 0.4s ease',
                      }}
                    >
                      <Icon
                        className="w-5 h-5"
                        style={{
                          color: isHover ? '#fff' : accent.color,
                          transition: 'color 0.4s ease',
                        }}
                      />
                    </div>

                    <h4
                      className="text-[15px] font-bold mb-2"
                      style={{
                        color: isHover ? '#fff' : 'rgba(255,255,255,0.9)',
                        transition: 'color 0.4s ease',
                      }}
                    >
                      {value.title}
                    </h4>
                    <p
                      className="text-[13px] leading-[1.7]"
                      style={{
                        color: isHover
                          ? 'rgba(255,255,255,0.7)'
                          : 'rgba(255,255,255,0.45)',
                        transition: 'color 0.4s ease',
                      }}
                    >
                      {value.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
          {stats.map((stat, index) => {
            const accent = statAccents[index % statAccents.length];
            const isHover = hoveredStat === index;

            return (
              <div
                key={index}
                className={`transition-all duration-700 ${
                  isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-6'
                }`}
                style={{ transitionDelay: `${800 + index * 80}ms` }}
                onMouseEnter={() => setHoveredStat(index)}
                onMouseLeave={() => setHoveredStat(null)}
              >
                <div
                  className="relative rounded-xl overflow-hidden p-5 lg:p-6 text-center cursor-default"
                  style={{
                    background: isHover
                      ? `linear-gradient(170deg, rgba(${accent.rgb}, 0.08) 0%, rgba(255,255,255,0.03) 100%)`
                      : 'rgba(255,255,255,0.03)',
                    border: `1px solid ${
                      isHover
                        ? `rgba(${accent.rgb}, 0.25)`
                        : 'rgba(255,255,255,0.06)'
                    }`,
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    transform: isHover ? 'translateY(-3px)' : 'translateY(0)',
                    boxShadow: isHover
                      ? `0 12px 32px -8px rgba(0,0,0,0.4), 0 0 20px -8px rgba(${accent.rgb}, 0.1)`
                      : '0 2px 8px -2px rgba(0,0,0,0.15)',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                >
                  {/* Top edge shine */}
                  <div
                    className="absolute top-0 inset-x-0 h-[1px]"
                    style={{
                      background: `linear-gradient(90deg, transparent 10%, rgba(${accent.rgb}, 0.4) 50%, transparent 90%)`,
                      opacity: isHover ? 1 : 0,
                      transition: 'opacity 0.5s ease',
                    }}
                  />

                  <div
                    className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-1"
                    style={{
                      color: isHover ? accent.color : 'rgba(255,255,255,0.9)',
                      transition: 'color 0.4s ease',
                    }}
                  >
                    {stat.value}
                  </div>
                  <div
                    className="text-[13px] font-medium"
                    style={{
                      color: isHover
                        ? 'rgba(255,255,255,0.7)'
                        : 'rgba(255,255,255,0.4)',
                      transition: 'color 0.4s ease',
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>

      {/* CSS Animations */}
      <style>{`
        .about-orb-a { animation: aboutOrbA 28s ease-in-out infinite; }
        .about-orb-b { animation: aboutOrbB 34s ease-in-out infinite; }
        @keyframes aboutOrbA {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(40px, -30px) scale(1.06); }
          66% { transform: translate(-30px, 25px) scale(0.94); }
        }
        @keyframes aboutOrbB {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-35px, 20px) scale(1.05); }
          66% { transform: translate(30px, -30px) scale(0.95); }
        }

        /* Cursor-following shape rotations */
        .about-cursor-spin { animation: aboutCursorSpin 8s linear infinite; }
        .about-cursor-spin-slow { animation: aboutCursorSpin 14s linear infinite; }
        @keyframes aboutCursorSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        /* Floating shapes — each has a unique drift animation */
        ${floatingShapes.map((s, i) => `
          .about-float-${i} {
            animation: aboutFloat${i} ${s.dur} ease-in-out infinite;
          }
          @keyframes aboutFloat${i} {
            0%, 100% { transform: translate(0, 0) rotate(0deg); }
            25% { transform: translate(${s.dx * 0.6}px, ${s.dy * 0.4}px) rotate(${s.rotate + 20}deg); }
            50% { transform: translate(${s.dx}px, ${s.dy}px) rotate(${s.rotate}deg); }
            75% { transform: translate(${s.dx * 0.3}px, ${s.dy * 0.7}px) rotate(${s.rotate + 10}deg); }
          }
        `).join('')}
      `}</style>
    </section>
  );
}
