import { useCallback, useEffect, useRef, useState } from 'react';
import { Container } from '../components';
import { siteContent } from '../content';
import {
  Sparkles, ChevronLeft, ChevronRight,
  Facebook, Linkedin, Twitter, Github, Instagram,
} from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Autoplay } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import type { TeamSocial } from '../types';
import 'swiper/css';
import 'swiper/css/effect-coverflow';

const socialIcons: Record<string, typeof Facebook> = {
  facebook: Facebook,
  linkedin: Linkedin,
  twitter: Twitter,
  github: Github,
  instagram: Instagram,
};

const roleColors: Record<string, { bg: string; text: string; rgb: string }> = {
  CEO:                    { bg: 'rgba(99,102,241,0.9)',  text: '#fff', rgb: '99,102,241' },
  CTO:                    { bg: 'rgba(20,184,166,0.9)',  text: '#fff', rgb: '20,184,166' },
  CMO:                    { bg: 'rgba(168,85,247,0.9)',  text: '#fff', rgb: '168,85,247' },
  'Full Stack Developer': { bg: 'rgba(245,158,11,0.9)',  text: '#fff', rgb: '245,158,11' },
  Consultant:             { bg: 'rgba(236,72,153,0.9)',  text: '#fff', rgb: '236,72,153' },
};

function getRoleColor(role: string) {
  return roleColors[role] || roleColors.CEO;
}

function SocialIcon({ social, color }: { social: TeamSocial; color: string }) {
  const Icon = socialIcons[social.platform];
  if (!Icon) return null;
  return (
    <a
      href={social.url}
      target="_blank"
      rel="noopener noreferrer"
      className="team-social-icon"
      style={{ '--accent': color } as React.CSSProperties}
    >
      <Icon className="w-[17px] h-[17px]" />
    </a>
  );
}

export default function Team() {
  const { label, headline, subheadline, members } = siteContent.team;
  const sectionRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const posRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [swiper, setSwiper] = useState<SwiperType | null>(null);

  // Duplicate members to get enough slides for coverflow loop (same approach as reference)
  const slides = [...members, ...members];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setIsVisible(true); },
      { threshold: 0.08 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const onMouseMove = useCallback((e: MouseEvent) => {
    const s = sectionRef.current;
    if (!s) return;
    const r = s.getBoundingClientRect();
    mouseRef.current = { x: e.clientX - r.left, y: e.clientY - r.top };
  }, []);

  useEffect(() => {
    const s = sectionRef.current;
    if (!s) return;
    s.addEventListener('mousemove', onMouseMove);
    const tick = () => {
      posRef.current.x += (mouseRef.current.x - posRef.current.x) * 0.06;
      posRef.current.y += (mouseRef.current.y - posRef.current.y) * 0.06;
      if (glowRef.current)
        glowRef.current.style.transform =
          `translate(${posRef.current.x - 300}px,${posRef.current.y - 300}px)`;
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { s.removeEventListener('mousemove', onMouseMove); cancelAnimationFrame(rafRef.current); };
  }, [onMouseMove]);

  return (
    <section id="team" ref={sectionRef} className="relative py-24 lg:py-36 overflow-hidden">

      {/* ═══ Background ═══ */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(160deg,#0a0d14 0%,#0d1018 30%,#10141e 60%,#0a0e16 100%)' }} />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(99,102,241,.3) 1px,transparent 1px),linear-gradient(90deg,rgba(99,102,241,.3) 1px,transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="absolute -top-32 right-1/4 w-[550px] h-[550px] rounded-full opacity-[.06] blur-[120px] team-orb-a" style={{ background: 'radial-gradient(circle,rgba(99,102,241,.6) 0%,transparent 70%)' }} />
        <div className="absolute -bottom-32 left-1/3 w-[500px] h-[500px] rounded-full opacity-[.05] blur-[110px] team-orb-b" style={{ background: 'radial-gradient(circle,rgba(168,85,247,.5) 0%,transparent 70%)' }} />
        <div ref={glowRef} className="absolute w-[600px] h-[600px] rounded-full opacity-[.04]" style={{ background: 'radial-gradient(circle,rgba(99,102,241,.5) 0%,rgba(168,85,247,.15) 50%,transparent 70%)', filter: 'blur(40px)', willChange: 'transform' }} />
      </div>

      {/* ═══ Header ═══ */}
      <Container className="relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <div className={`inline-flex items-center gap-2 px-5 py-2 rounded-full mb-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            style={{ background: 'linear-gradient(135deg,rgba(99,102,241,.15),rgba(168,85,247,.1))', border: '1px solid rgba(99,102,241,.25)' }}>
            <Sparkles className="w-4 h-4" style={{ color: '#818CF8' }} />
            <span className="text-sm font-semibold" style={{ color: '#A5B4FC' }}>{label}</span>
          </div>
          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-5 leading-snug sm:leading-relaxed lg:leading-[1.3] transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            {headline}
          </h2>
          <p className={`text-base lg:text-lg transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ color: 'rgba(255,255,255,.5)' }}>
            {subheadline}
          </p>
        </div>
      </Container>

      {/* ═══ Coverflow Slider (full-width, matches reference exactly) ═══ */}
      <div
        className={`relative z-10 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        style={{ isolation: 'isolate' }}
      >
        {/* Nav arrows */}
        <button onClick={() => swiper?.slidePrev()} className="team-nav-btn absolute left-3 sm:left-6 lg:left-10 top-1/2 -translate-y-1/2 z-20" aria-label="Previous">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button onClick={() => swiper?.slideNext()} className="team-nav-btn absolute right-3 sm:right-6 lg:right-10 top-1/2 -translate-y-1/2 z-20" aria-label="Next">
          <ChevronRight className="w-5 h-5" />
        </button>

        <Swiper
          effect="coverflow"
          grabCursor
          centeredSlides
          loop
          slidesPerView="auto"
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2.5,
            slideShadows: false,
          }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          modules={[EffectCoverflow, Autoplay]}
          onSwiper={setSwiper}
          speed={650}
          className="team-coverflow-slider"
        >
          {slides.map((member, idx) => {
            const clr = getRoleColor(member.role);
            const hovered = hoveredCard === idx;

            return (
              <SwiperSlide
                key={`${member.name}-${idx}`}
                className="!w-[280px] sm:!w-[320px] md:!w-[360px] lg:!w-[400px]"
              >
                <div
                  className="relative group rounded-2xl overflow-hidden transition-all duration-500"
                  onMouseEnter={() => setHoveredCard(idx)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  {/* Image */}
                  <div className="relative overflow-hidden" style={{ aspectRatio: '3/4' }}>
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />

                    {/* Overlay */}
                    <div
                      className="absolute inset-0 transition-opacity duration-300"
                      style={{
                        background: `linear-gradient(to top, rgba(10,13,20,0.95) 0%, rgba(10,13,20,0.4) 40%, rgba(${clr.rgb},0.05) 70%, transparent 100%)`,
                        opacity: hovered ? 0.95 : 0.7,
                      }}
                    />

                    {/* Top glow line */}
                    <div
                      className="absolute top-0 inset-x-0 h-[2px] transition-opacity duration-500"
                      style={{
                        background: `linear-gradient(90deg,transparent 5%,rgba(${clr.rgb},.8) 50%,transparent 95%)`,
                        opacity: hovered ? 1 : 0,
                      }}
                    />

                    {/* Role badge — top left (glass style like reference) */}
                    <div className="absolute top-3 left-3 z-10">
                      <span
                        className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider text-white"
                        style={{
                          background: clr.bg,
                          backdropFilter: 'blur(20px)',
                          WebkitBackdropFilter: 'blur(20px)',
                          border: '1px solid rgba(255,255,255,0.05)',
                          boxShadow: `0 4px 16px -3px rgba(${clr.rgb},0.5)`,
                        }}
                      >
                        {member.role}
                      </span>
                    </div>

                    {/* Social icons — appear on hover (centered) */}
                    <div
                      className="absolute inset-0 flex items-center justify-center z-10 gap-3"
                      style={{
                        opacity: hovered ? 1 : 0,
                        transition: 'opacity 0.4s cubic-bezier(0.4,0,0.2,1)',
                        pointerEvents: hovered ? 'auto' : 'none',
                      }}
                    >
                      {member.socials.map((s, i) => (
                        <div
                          key={s.platform}
                          style={{
                            transform: hovered ? 'translateY(0) scale(1)' : 'translateY(16px) scale(0.7)',
                            opacity: hovered ? 1 : 0,
                            transition: `all 0.4s cubic-bezier(0.34,1.56,0.64,1) ${i * 80 + 100}ms`,
                          }}
                        >
                          <SocialIcon social={s} color={`rgba(${clr.rgb},0.9)`} />
                        </div>
                      ))}
                    </div>

                    {/* Border overlay */}
                    <div
                      className="absolute inset-0 rounded-t-2xl pointer-events-none"
                      style={{
                        border: `1px solid ${hovered ? `rgba(${clr.rgb},0.35)` : 'rgba(255,255,255,0.05)'}`,
                        borderBottom: 'none',
                        transition: 'border-color 0.4s',
                      }}
                    />
                  </div>

                  {/* Content section below image (like reference's card bottom) */}
                  <div
                    className="p-5 rounded-b-2xl"
                    style={{
                      background: 'rgba(18,18,26,1)',
                      borderLeft: `1px solid ${hovered ? `rgba(${clr.rgb},0.35)` : 'rgba(255,255,255,0.05)'}`,
                      borderRight: `1px solid ${hovered ? `rgba(${clr.rgb},0.35)` : 'rgba(255,255,255,0.05)'}`,
                      borderBottom: `1px solid ${hovered ? `rgba(${clr.rgb},0.35)` : 'rgba(255,255,255,0.05)'}`,
                      transition: 'border-color 0.4s',
                    }}
                  >
                    <h3
                      className="font-bold text-lg mb-1 truncate transition-colors duration-300"
                      style={{ color: hovered ? `rgba(${clr.rgb},1)` : 'rgba(255,255,255,.9)' }}
                    >
                      {member.name}
                    </h3>
                    <p className="text-sm" style={{ color: 'rgba(255,255,255,.45)' }}>
                      {member.role}
                    </p>

                    {/* Animated underline */}
                    <div
                      className="mt-3 h-[2px] rounded-full"
                      style={{
                        background: `linear-gradient(90deg,rgba(${clr.rgb},.9),rgba(${clr.rgb},.15))`,
                        width: hovered ? '50%' : '0%',
                        transition: 'width .5s cubic-bezier(.4,0,.2,1) .1s',
                      }}
                    />
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>

      {/* ═══ Styles ═══ */}
      <style>{`
        .team-orb-a{animation:tOrbA 24s ease-in-out infinite}
        .team-orb-b{animation:tOrbB 30s ease-in-out infinite}
        @keyframes tOrbA{0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(35px,-25px) scale(1.07)}66%{transform:translate(-25px,30px) scale(.93)}}
        @keyframes tOrbB{0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(-30px,20px) scale(1.05)}66%{transform:translate(25px,-25px) scale(.95)}}

        /* ── Coverflow slider (matches reference globals.css exactly) ── */
        .team-coverflow-slider {
          width: 100% !important;
          max-width: 100% !important;
          padding: 40px 0 !important;
          overflow: hidden !important;
        }
        .team-coverflow-slider .swiper-wrapper {
          display: flex;
          align-items: center;
        }
        .team-coverflow-slider .swiper-slide {
          transition: transform 0.4s ease, opacity 0.4s ease;
          opacity: 0.4;
          transform: scale(0.85);
        }
        .team-coverflow-slider .swiper-slide-active {
          opacity: 1;
          transform: scale(1);
          z-index: 2;
        }
        .team-coverflow-slider .swiper-slide-prev,
        .team-coverflow-slider .swiper-slide-next {
          opacity: 0.7;
          transform: scale(0.9);
        }

        /* Social icon */
        .team-social-icon{
          width:40px;height:40px;border-radius:50%;
          display:flex;align-items:center;justify-content:center;
          background:rgba(255,255,255,.1);
          border:1px solid rgba(255,255,255,.15);
          backdrop-filter:blur(8px);
          color:#fff;
          transition:all .3s cubic-bezier(.4,0,.2,1);
        }
        .team-social-icon:hover{
          background:var(--accent);border-color:var(--accent);
          transform:scale(1.15);
          box-shadow:0 4px 20px -4px var(--accent);
        }

        /* Nav arrows */
        .team-nav-btn{
          width:50px;height:50px;border-radius:50%;
          display:flex;align-items:center;justify-content:center;
          background:rgba(26,26,36,1);
          border:1px solid rgba(255,255,255,.1);
          color:rgba(255,255,255,.7);
          cursor:pointer;transition:all .3s;
        }
        .team-nav-btn:hover{
          background:rgba(99,102,241,.8);
          border-color:rgba(99,102,241,.8);
          color:#fff;
        }
        .team-nav-btn:active{transform:translateY(-50%) scale(.92)}
        @media(max-width:639px){.team-nav-btn{width:40px!important;height:40px!important}}
      `}</style>
    </section>
  );
}
