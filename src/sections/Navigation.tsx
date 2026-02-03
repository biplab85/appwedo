import { useState, useEffect, useCallback } from 'react';
import { X, ArrowRight } from 'lucide-react';
import { Container } from '../components';
import { siteContent } from '../content';

export default function Navigation() {
  const { navLinks, ctaButton } = siteContent.navigation;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

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

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

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
      <header
        role="banner"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'py-3 bg-white/90 backdrop-blur-xl shadow-lg shadow-dark-900/5 border-b border-dark-100/50'
            : 'py-4 bg-transparent'
        }`}
      >
        <Container>
          <nav
            className="flex items-center justify-between"
            role="navigation"
            aria-label="Main navigation"
          >
            {/* Logo - Image Only */}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onKeyDown={(e) => handleKeyDown(e, () => window.scrollTo({ top: 0, behavior: 'smooth' }))}
              className="group relative focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-lg"
              aria-label="AppWeDo - Go to homepage"
            >
              {/* Logo hover glow */}
              <div className="absolute -inset-3 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Official Logo Image */}
              <img
                src="/images/appwedo-logo.png"
                alt="AppWeDo"
                className="relative h-10 sm:h-12 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
              />
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-2" role="menubar">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.replace('#', '');
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                    onKeyDown={(e) => handleKeyDown(e, () => scrollToSection(link.href))}
                    className={`group relative px-4 py-2.5 text-sm font-medium rounded-xl transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                      isActive ? 'text-primary' : 'text-dark-600 hover:text-dark-900'
                    }`}
                    role="menuitem"
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {/* Background highlight */}
                    <span
                      className={`absolute inset-0 rounded-xl transition-all duration-300 ${
                        isActive
                          ? 'bg-primary/10'
                          : 'bg-transparent group-hover:bg-dark-100/70'
                      }`}
                    />

                    {/* Link text */}
                    <span className="relative z-10">{link.label}</span>

                    {/* Active indicator */}
                    <span
                      className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary transition-all duration-300 ${
                        isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                      }`}
                    />
                  </a>
                );
              })}
            </div>

            {/* Desktop CTA Button */}
            <div className="hidden lg:block">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('#contact');
                }}
                onKeyDown={(e) => handleKeyDown(e, () => scrollToSection('#contact'))}
                className="group relative inline-flex items-center gap-2 px-6 py-3 overflow-hidden rounded-xl font-semibold text-sm text-white transition-all duration-300 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                {/* Gradient background */}
                <span className="absolute inset-0 bg-gradient-to-r from-primary to-primary-600 transition-all duration-300 group-hover:from-primary-600 group-hover:to-primary" />

                {/* Shine effect */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

                {/* Glow */}
                <span className="absolute -inset-1 bg-primary/30 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <span className="relative z-10">{ctaButton}</span>
                <ArrowRight className="relative z-10 w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-300" />
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              onKeyDown={(e) => handleKeyDown(e, () => setIsMenuOpen(!isMenuOpen))}
              className="lg:hidden relative w-12 h-12 flex items-center justify-center rounded-xl bg-dark-100/50 hover:bg-dark-100 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              <div className="relative w-6 h-6">
                <span
                  className={`absolute left-0 top-1 w-6 h-0.5 bg-dark-700 rounded-full transition-all duration-300 ${
                    isMenuOpen ? 'rotate-45 top-[11px]' : ''
                  }`}
                />
                <span
                  className={`absolute left-0 top-[11px] w-6 h-0.5 bg-dark-700 rounded-full transition-all duration-300 ${
                    isMenuOpen ? 'opacity-0 scale-0' : ''
                  }`}
                />
                <span
                  className={`absolute left-0 bottom-1 w-6 h-0.5 bg-dark-700 rounded-full transition-all duration-300 ${
                    isMenuOpen ? '-rotate-45 bottom-[11px]' : ''
                  }`}
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
          className="absolute inset-0 bg-dark-900/60 backdrop-blur-sm"
          onClick={() => setIsMenuOpen(false)}
          aria-hidden="true"
        />

        {/* Slide-in Menu Panel */}
        <aside
          className={`absolute top-0 right-0 w-full max-w-sm h-full bg-white shadow-2xl transition-transform duration-500 ease-out flex flex-col ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          {/* Menu Header */}
          <div className="flex items-center justify-between p-6 border-b border-dark-100">
            <img
              src="/images/appwedo-logo.png"
              alt="AppWeDo"
              className="h-10 w-auto"
            />
            <button
              onClick={() => setIsMenuOpen(false)}
              className="w-10 h-10 flex items-center justify-center rounded-lg bg-dark-100/50 hover:bg-dark-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-label="Close menu"
            >
              <X className="w-5 h-5 text-dark-600" />
            </button>
          </div>

          {/* Menu Links */}
          <nav className="flex-1 p-6 space-y-2 overflow-y-auto" role="navigation">
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
                  className={`group flex items-center justify-between p-4 rounded-xl transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                    isActive
                      ? 'bg-primary/10 text-primary'
                      : 'hover:bg-dark-50 text-dark-700 hover:text-dark-900'
                  }`}
                  style={{
                    transitionDelay: isMenuOpen ? `${index * 50 + 100}ms` : '0ms',
                    transform: isMenuOpen ? 'translateX(0)' : 'translateX(20px)',
                    opacity: isMenuOpen ? 1 : 0,
                  }}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <span className="text-lg font-medium">{link.label}</span>
                  <ArrowRight
                    className={`w-5 h-5 transition-all duration-300 ${
                      isActive
                        ? 'opacity-100 translate-x-0'
                        : 'opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          {/* Mobile CTA */}
          <div className="p-6 border-t border-dark-100 bg-dark-50/50">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#contact');
              }}
              className="group flex items-center justify-center gap-2 w-full py-4 bg-gradient-to-r from-primary to-primary-600 rounded-xl font-semibold text-white shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              style={{
                transitionDelay: isMenuOpen ? '300ms' : '0ms',
                opacity: isMenuOpen ? 1 : 0,
              }}
            >
              {ctaButton}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform duration-300" />
            </a>
          </div>
        </aside>
      </div>
    </>
  );
}
