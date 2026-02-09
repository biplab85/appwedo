import { useState, useEffect, useCallback, useRef } from 'react';
import { X, ArrowRight, Mail, Phone, MapPin, MessageCircle } from 'lucide-react';
import { Container } from '../components';
import { siteContent } from '../content';

export default function Navigation() {
  const { navLinks, ctaButton } = siteContent.navigation;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isContactDrawerOpen, setIsContactDrawerOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const indicatorRef = useRef<HTMLDivElement>(null);
  const navContainerRef = useRef<HTMLDivElement>(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Update active section based on scroll position
      const sections = navLinks.map((link) => link.href.replace('#', ''));
      let foundActive = false;
      for (const section of [...sections].reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(section);
            foundActive = true;
            break;
          }
        }
      }
      if (!foundActive) {
        setActiveSection('');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navLinks]);

  // Animate the sliding indicator under the active nav link
  useEffect(() => {
    if (!navContainerRef.current || !indicatorRef.current) return;
    const activeLink = navContainerRef.current.querySelector('[data-active="true"]') as HTMLElement;
    if (activeLink) {
      const containerRect = navContainerRef.current.getBoundingClientRect();
      const linkRect = activeLink.getBoundingClientRect();
      indicatorRef.current.style.width = `${linkRect.width}px`;
      indicatorRef.current.style.left = `${linkRect.left - containerRect.left}px`;
      indicatorRef.current.style.opacity = '1';
    } else {
      indicatorRef.current.style.opacity = '0';
    }
  }, [activeSection]);

  // Lock body scroll when menu or drawer is open
  useEffect(() => {
    if (isMenuOpen || isContactDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen, isContactDrawerOpen]);

  // Smooth scroll to section
  const scrollToSection = useCallback((href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent, action: () => void) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      action();
    }
  }, []);

  return (
    <>
      <style>{`
        @keyframes nav-glow-pulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        @keyframes nav-shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .nav-indicator-glow {
          animation: nav-glow-pulse 2s ease-in-out infinite;
        }
        .nav-cta-shimmer::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
          animation: nav-shimmer 3s ease-in-out infinite;
        }
      `}</style>

      <header
        role="banner"
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          padding: isScrolled ? '10px 0' : '16px 0',
          background: isScrolled
            ? 'linear-gradient(135deg, rgba(8,9,20,0.88) 0%, rgba(12,14,26,0.92) 50%, rgba(8,9,20,0.88) 100%)'
            : 'transparent',
          backdropFilter: isScrolled ? 'blur(20px) saturate(1.4)' : 'none',
          WebkitBackdropFilter: isScrolled ? 'blur(20px) saturate(1.4)' : 'none',
          borderBottom: isScrolled ? '1px solid rgba(139,92,246,0.08)' : '1px solid transparent',
          boxShadow: isScrolled
            ? '0 8px 32px rgba(0,0,0,0.4), 0 0 80px -20px rgba(139,92,246,0.08)'
            : 'none',
          transition: 'all 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      >
        {/* Top edge gradient line — only when scrolled */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: '10%',
            right: '10%',
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.3) 30%, rgba(6,182,212,0.2) 70%, transparent)',
            opacity: isScrolled ? 1 : 0,
            transition: 'opacity 0.6s ease',
          }}
        />

        <Container>
          <nav
            className="flex items-center justify-between"
            role="navigation"
            aria-label="Main navigation"
          >
            {/* Logo */}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onKeyDown={(e) => handleKeyDown(e, () => window.scrollTo({ top: 0, behavior: 'smooth' }))}
              className="relative focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded-lg"
              aria-label="AppWeDo - Go to homepage"
            >
              <div className="relative flex items-center gap-2 hover:scale-105 transition-transform duration-500 ease-out">
                <img
                  src="/images/fevicon.png"
                  alt=""
                  className="h-8 sm:h-9 w-auto object-contain"
                />
                <span className="text-xl sm:text-2xl font-bold text-white" style={{ fontFamily: "'Comfortaa', cursive" }}>
                  appwedo
                </span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <div
              ref={navContainerRef}
              className="hidden lg:flex items-center relative"
              role="menubar"
              // style={{
              //   background: isScrolled ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.04)',
              //   border: '1px solid rgba(255,255,255,0.06)',
              //   borderRadius: '14px',
              //   padding: '4px',
              // }}
            >
              {/* Sliding active indicator */}
              <div
                ref={indicatorRef}
                className="absolute top-[4px] h-[calc(100%-8px)] rounded-[10px] transition-all duration-400 ease-out pointer-events-none"
                style={{
                  background: 'linear-gradient(135deg, rgba(139,92,246,0.15) 0%, rgba(6,182,212,0.08) 100%)',
                  border: '1px solid rgba(139,92,246,0.2)',
                  boxShadow: '0 0 16px rgba(139,92,246,0.1), inset 0 1px 0 rgba(255,255,255,0.05)',
                  opacity: 0,
                  transitionProperty: 'left, width, opacity',
                  transitionDuration: '0.4s',
                  transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
                }}
              />

              {navLinks.map((link) => {
                const isActive = activeSection === link.href.replace('#', '');
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    data-active={isActive}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                    onKeyDown={(e) => handleKeyDown(e, () => scrollToSection(link.href))}
                    className="relative z-10 px-5 py-2.5 text-[13px] font-semibold tracking-wide rounded-[10px] transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
                    style={{
                      color: isActive ? '#c4b5fd' : 'rgba(255,255,255,0.5)',
                      textShadow: isActive ? '0 0 20px rgba(139,92,246,0.4)' : 'none',
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.color = 'rgba(255,255,255,0.85)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.color = 'rgba(255,255,255,0.5)';
                      }
                    }}
                    role="menuitem"
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {link.label}
                  </a>
                );
              })}

              {/* Bottom edge glow under active item */}
              <div
                className="absolute -bottom-[1px] left-0 right-0 h-[1px] pointer-events-none"
                style={{
                  background: 'linear-gradient(90deg, transparent 10%, rgba(139,92,246,0.15) 50%, transparent 90%)',
                }}
              />
            </div>

            {/* Desktop CTA + Contact Drawer Toggle */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('#contact');
                }}
                onKeyDown={(e) => handleKeyDown(e, () => scrollToSection('#contact'))}
                className="nav-cta-shimmer group relative inline-flex items-center gap-2 px-6 py-2.5 overflow-hidden rounded-xl font-semibold text-sm text-white transition-all duration-300 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
                style={{
                  background: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 50%, #6D28D9 100%)',
                  boxShadow: '0 4px 20px -4px rgba(139,92,246,0.5), 0 0 0 1px rgba(139,92,246,0.2)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 8px 32px -4px rgba(139,92,246,0.6), 0 0 0 1px rgba(139,92,246,0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 4px 20px -4px rgba(139,92,246,0.5), 0 0 0 1px rgba(139,92,246,0.2)';
                }}
              >
                <span className="relative z-10">{ctaButton}</span>
                <ArrowRight className="relative z-10 w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-300" />
              </a>

              {/* Contact Drawer Toggle Button */}
              <button
                onClick={() => setIsContactDrawerOpen(true)}
                className="group relative w-11 h-11 flex items-center justify-center rounded-xl transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
                style={{
                  background: 'rgba(6,182,212,0.08)',
                  border: '1px solid rgba(6,182,212,0.15)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(6,182,212,0.15)';
                  e.currentTarget.style.borderColor = 'rgba(6,182,212,0.3)';
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(6,182,212,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(6,182,212,0.08)';
                  e.currentTarget.style.borderColor = 'rgba(6,182,212,0.15)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
                aria-label="Open contact drawer"
              >
                <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" style={{ color: '#06B6D4' }} />
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              onKeyDown={(e) => handleKeyDown(e, () => setIsMenuOpen(!isMenuOpen))}
              className="lg:hidden relative w-12 h-12 flex items-center justify-center rounded-xl transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
              aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              <div className="relative w-6 h-6">
                <span
                  className="absolute left-0 top-[9px] w-6 h-0.5 rounded-full transition-all duration-300"
                  style={{
                    background: isMenuOpen ? '#8B5CF6' : 'rgba(255,255,255,0.7)',
                    transform: isMenuOpen ? 'rotate(45deg) translateY(6px)' : 'none',
                  }}
                />
                <span
                  className="absolute left-0 top-[11px] w-6 h-0.5 rounded-full transition-all duration-300"
                  style={{
                    background: 'rgba(255,255,255,0.7)',
                    opacity: isMenuOpen ? 0 : 1,
                    transform: isMenuOpen ? 'scaleX(0)' : 'scaleX(1)',
                  }}
                />
                <span
                  className="absolute left-0 bottom-1 w-6 h-0.5 rounded-full transition-all duration-300"
                  style={{
                    background: isMenuOpen ? '#06B6D4' : 'rgba(255,255,255,0.7)',
                    transform: isMenuOpen ? 'rotate(-45deg) translateY(-6px)' : 'none',
                  }}
                />
              </div>
            </button>
          </nav>
        </Container>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        id="mobile-menu"
        className={`lg:hidden fixed inset-0 z-40 transition-all duration-300 ${
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!isMenuOpen}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/70 backdrop-blur-md"
          onClick={() => setIsMenuOpen(false)}
          aria-hidden="true"
        />

        {/* Slide-in Menu Panel — Dark Premium */}
        <aside
          className={`absolute top-0 right-0 w-full max-w-sm h-full shadow-2xl transition-transform duration-500 ease-out flex flex-col ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          style={{
            background: 'linear-gradient(180deg, #0c0e1a 0%, #0a0b18 40%, #080914 100%)',
          }}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          {/* Left edge accent line */}
          <div
            className="absolute top-0 left-0 w-[1px] h-full pointer-events-none"
            style={{
              background: 'linear-gradient(180deg, transparent 0%, rgba(139,92,246,0.3) 30%, rgba(6,182,212,0.2) 60%, transparent 100%)',
            }}
          />

          {/* Menu Header */}
          <div
            className="relative flex items-center justify-between p-6"
            style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
          >
            <div
              className="absolute inset-0 opacity-40 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse 70% 100% at 30% 0%, rgba(139,92,246,0.08) 0%, transparent 70%)',
              }}
            />
            <div className="relative flex items-center gap-2">
              <img
                src="/images/fevicon.png"
                alt=""
                className="h-8 w-auto object-contain"
              />
              <span className="text-lg font-bold text-white" style={{ fontFamily: "'Comfortaa', cursive" }}>
                appwedo
              </span>
            </div>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="relative w-11 h-11 flex items-center justify-center rounded-xl transition-all duration-300 active:scale-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
              style={{
                background: 'linear-gradient(135deg, rgba(239,68,68,0.08) 0%, rgba(239,68,68,0.04) 100%)',
                border: '1px solid rgba(239,68,68,0.15)',
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
              }}
              aria-label="Close menu"
            >
              <X className="w-[22px] h-[22px]" style={{ color: 'rgba(239,68,68,0.75)' }} strokeWidth={2.5} />
            </button>
          </div>

          {/* Menu Links */}
          <nav className="flex-1 p-6 space-y-1.5 overflow-y-auto" role="navigation">
            {navLinks.map((link, index) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }}
                  className="group relative flex items-center justify-between p-4 rounded-xl overflow-hidden transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
                  style={{
                    background: isActive ? 'rgba(139,92,246,0.1)' : 'rgba(255,255,255,0.02)',
                    border: isActive ? '1px solid rgba(139,92,246,0.2)' : '1px solid transparent',
                    transitionDelay: isMenuOpen ? `${index * 60 + 100}ms` : '0ms',
                    transform: isMenuOpen ? 'translateX(0)' : 'translateX(30px)',
                    opacity: isMenuOpen ? 1 : 0,
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
                      e.currentTarget.style.borderColor = 'transparent';
                    }
                  }}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {/* Active left accent bar */}
                  {isActive && (
                    <div
                      className="absolute left-0 top-2 bottom-2 w-[3px] rounded-full nav-indicator-glow"
                      style={{
                        background: 'linear-gradient(180deg, #8B5CF6, #06B6D4)',
                      }}
                    />
                  )}

                  <span
                    className="text-base font-semibold tracking-wide"
                    style={{
                      color: isActive ? '#c4b5fd' : 'rgba(255,255,255,0.6)',
                      paddingLeft: isActive ? '8px' : '0',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    {link.label}
                  </span>
                  <ArrowRight
                    className="w-4 h-4 transition-all duration-300"
                    style={{
                      color: isActive ? '#8B5CF6' : 'rgba(255,255,255,0.2)',
                      opacity: isActive ? 1 : 0,
                      transform: isActive ? 'translateX(0)' : 'translateX(-8px)',
                    }}
                  />
                </a>
              );
            })}
          </nav>

          {/* Divider */}
          <div
            className="mx-6 h-[1px]"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.15) 50%, transparent)',
            }}
          />

          {/* Mobile CTA */}
          <div className="p-6">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#contact');
              }}
              className="group relative flex items-center justify-center gap-2 w-full py-4 rounded-xl font-semibold text-white overflow-hidden transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
              style={{
                background: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 50%, #6D28D9 100%)',
                boxShadow: '0 8px 24px -4px rgba(139,92,246,0.4), 0 0 0 1px rgba(139,92,246,0.2)',
                transitionDelay: isMenuOpen ? '350ms' : '0ms',
                opacity: isMenuOpen ? 1 : 0,
                transform: isMenuOpen ? 'translateY(0)' : 'translateY(10px)',
              }}
            >
              <span className="relative z-10">{ctaButton}</span>
              <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-0.5 transition-transform duration-300" />
            </a>

            {/* Contact drawer shortcut for mobile */}
            <button
              onClick={() => {
                setIsMenuOpen(false);
                setTimeout(() => setIsContactDrawerOpen(true), 300);
              }}
              className="mt-3 w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium transition-all duration-300"
              style={{
                color: 'rgba(255,255,255,0.4)',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.06)',
                transitionDelay: isMenuOpen ? '400ms' : '0ms',
                opacity: isMenuOpen ? 1 : 0,
              }}
            >
              <MessageCircle className="w-4 h-4" style={{ color: '#06B6D4' }} />
              Quick Contact
            </button>
          </div>
        </aside>
      </div>

      {/* Contact Drawer Overlay */}
      <div
        className={`fixed inset-0 z-50 transition-all duration-300 ${
          isContactDrawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!isContactDrawerOpen}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/70 backdrop-blur-md"
          onClick={() => setIsContactDrawerOpen(false)}
          aria-hidden="true"
        />

        {/* Slide-in Contact Drawer — Dark Premium */}
        <aside
          className={`drawerContainer absolute top-0 right-0 w-full max-w-md h-full shadow-2xl transition-transform duration-500 ease-out flex flex-col ${
            isContactDrawerOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          style={{
            background: 'linear-gradient(180deg, #0c0e1a 0%, #0a0b18 40%, #080914 100%)',
          }}
          role="dialog"
          aria-modal="true"
          aria-label="Contact information"
        >
          {/* Left edge accent line */}
          <div
            className="absolute top-0 left-0 w-[1px] h-full"
            style={{
              background: 'linear-gradient(180deg, transparent 0%, rgba(139,92,246,0.3) 30%, rgba(6,182,212,0.2) 60%, transparent 100%)',
            }}
          />

          {/* Drawer Header */}
          <div
            className="relative flex items-center justify-between p-6"
            style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
          >
            {/* Header glow */}
            <div
              className="absolute inset-0 opacity-40"
              style={{
                background: 'radial-gradient(ellipse 70% 100% at 30% 0%, rgba(139,92,246,0.1) 0%, transparent 70%)',
              }}
            />
            <div className="relative">
              <h2 className="text-xl font-bold text-white">Get in Touch</h2>
              <p className="text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>We&apos;d love to hear from you</p>
            </div>
            <button
              onClick={() => setIsContactDrawerOpen(false)}
              className="relative w-10 h-10 flex items-center justify-center rounded-lg transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                e.currentTarget.style.borderColor = 'rgba(239,68,68,0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
              }}
              aria-label="Close contact drawer"
            >
              <X className="w-5 h-5" style={{ color: 'rgba(255,255,255,0.6)' }} />
            </button>
          </div>

          {/* Drawer Content */}
          <div className="flex-1 p-6 space-y-6 overflow-y-auto">
            {/* Contact Information */}
            <div className="space-y-3">
              <h3
                className="text-[11px] font-semibold uppercase tracking-[0.15em] mb-4"
                style={{ color: 'rgba(255,255,255,0.3)' }}
              >
                Contact Info
              </h3>

              {/* Email */}
              <a
                href="mailto:info@appwedo.com"
                className="group relative flex items-center gap-4 p-4 rounded-xl overflow-hidden transition-all duration-400"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(139,92,246,0.08)';
                  e.currentTarget.style.borderColor = 'rgba(139,92,246,0.2)';
                  e.currentTarget.style.transform = 'translateX(-4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                  e.currentTarget.style.transform = 'translateX(0)';
                }}
              >
                <div
                  className="w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:shadow-lg"
                  style={{
                    background: 'rgba(139,92,246,0.1)',
                    border: '1px solid rgba(139,92,246,0.15)',
                  }}
                >
                  <Mail className="w-5 h-5" style={{ color: '#8B5CF6' }} />
                </div>
                <div>
                  <div className="text-[11px] font-medium" style={{ color: 'rgba(255,255,255,0.35)' }}>Email</div>
                  <div className="text-sm font-semibold text-white">info@appwedo.com</div>
                </div>
                <ArrowRight className="w-4 h-4 ml-auto opacity-0 -translate-x-2 group-hover:opacity-50 group-hover:translate-x-0 transition-all duration-300" style={{ color: '#8B5CF6' }} />
              </a>

              {/* Phone */}
              <a
                href="tel:+8801799783391"
                className="group relative flex items-center gap-4 p-4 rounded-xl overflow-hidden transition-all duration-400"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(6,182,212,0.08)';
                  e.currentTarget.style.borderColor = 'rgba(6,182,212,0.2)';
                  e.currentTarget.style.transform = 'translateX(-4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                  e.currentTarget.style.transform = 'translateX(0)';
                }}
              >
                <div
                  className="w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:shadow-lg"
                  style={{
                    background: 'rgba(6,182,212,0.1)',
                    border: '1px solid rgba(6,182,212,0.15)',
                  }}
                >
                  <Phone className="w-5 h-5" style={{ color: '#06B6D4' }} />
                </div>
                <div>
                  <div className="text-[11px] font-medium" style={{ color: 'rgba(255,255,255,0.35)' }}>Phone</div>
                  <div className="text-sm font-semibold text-white">+88 01799783391</div>
                </div>
                <ArrowRight className="w-4 h-4 ml-auto opacity-0 -translate-x-2 group-hover:opacity-50 group-hover:translate-x-0 transition-all duration-300" style={{ color: '#06B6D4' }} />
              </a>

              {/* Address */}
              <div
                className="flex items-center gap-4 p-4 rounded-xl"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                <div
                  className="w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{
                    background: 'rgba(245,158,11,0.1)',
                    border: '1px solid rgba(245,158,11,0.15)',
                  }}
                >
                  <MapPin className="w-5 h-5" style={{ color: '#F59E0B' }} />
                </div>
                <div>
                  <div className="text-[11px] font-medium" style={{ color: 'rgba(255,255,255,0.35)' }}>Address</div>
                  <div className="text-sm font-semibold text-white leading-snug">Unit #201 - 1017 Fort St, Victoria, BC, Canada</div>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div
              className="h-[1px]"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.15) 50%, transparent)',
              }}
            />

            {/* Social Links */}
            <div className="space-y-4">
              <h3
                className="text-[11px] font-semibold uppercase tracking-[0.15em]"
                style={{ color: 'rgba(255,255,255,0.3)' }}
              >
                Follow Us
              </h3>

              <div className="flex gap-3">
                {[
                  { href: 'https://facebook.com', label: 'Facebook', hoverBg: '#1877F2', hoverRgb: '24,119,242', path: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' },
                  { href: 'https://twitter.com', label: 'Twitter', hoverBg: '#1DA1F2', hoverRgb: '29,161,242', path: 'M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z' },
                  { href: 'https://linkedin.com', label: 'LinkedIn', hoverBg: '#0A66C2', hoverRgb: '10,102,194', path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' },
                  { href: 'https://instagram.com', label: 'Instagram', hoverBg: '#E1306C', hoverRgb: '225,48,108', path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z' },
                  { href: 'https://github.com', label: 'GitHub', hoverBg: '#8B5CF6', hoverRgb: '139,92,246', path: 'M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12' },
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group w-11 h-11 rounded-lg flex items-center justify-center transition-all duration-300"
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.08)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = social.hoverBg;
                      e.currentTarget.style.borderColor = social.hoverBg;
                      e.currentTarget.style.boxShadow = `0 4px 16px rgba(${social.hoverRgb},0.35)`;
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                      e.currentTarget.style.boxShadow = 'none';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                    aria-label={social.label}
                  >
                    <svg className="w-[18px] h-[18px] transition-colors duration-300" style={{ color: 'rgba(255,255,255,0.45)' }} fill="currentColor" viewBox="0 0 24 24"
                      onMouseEnter={(e) => { e.currentTarget.style.color = '#fff'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.45)'; }}
                    >
                      <path d={social.path} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div
              className="h-[1px]"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(6,182,212,0.15) 50%, transparent)',
              }}
            />

            {/* Response Time Info */}
            <div
              className="relative rounded-xl p-4 overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(139,92,246,0.06) 0%, rgba(6,182,212,0.04) 100%)',
                border: '1px solid rgba(139,92,246,0.12)',
              }}
            >
              <div
                className="absolute top-0 inset-x-0 h-[1px]"
                style={{
                  background: 'linear-gradient(90deg, transparent 10%, rgba(139,92,246,0.3) 50%, transparent 90%)',
                }}
              />
              <div className="text-sm font-semibold text-white mb-2">Response Time</div>
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#8B5CF6' }} />
                <span className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>Social media — within a day</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#06B6D4' }} />
                <span className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>Email — up to 3 days</span>
              </div>
            </div>
          </div>

          {/* Drawer Footer CTA */}
          <div
            className="p-6"
            style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
          >
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                setIsContactDrawerOpen(false);
                scrollToSection('#contact');
              }}
              className="group flex items-center justify-center gap-2 w-full py-4 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              style={{
                background: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 50%, #6D28D9 100%)',
                boxShadow: '0 8px 24px -4px rgba(139,92,246,0.4), 0 0 0 1px rgba(139,92,246,0.2)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 12px 32px -4px rgba(139,92,246,0.5), 0 0 0 1px rgba(139,92,246,0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 8px 24px -4px rgba(139,92,246,0.4), 0 0 0 1px rgba(139,92,246,0.2)';
              }}
            >
              Start Your Project
              <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform duration-300" />
            </a>
          </div>
        </aside>
      </div>
    </>
  );
}
