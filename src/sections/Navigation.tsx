import { useState, useEffect, useCallback } from 'react';
import { X, ArrowRight, Mail, Phone, MapPin, MessageCircle } from 'lucide-react';
import { Container } from '../components';
import { siteContent } from '../content';

export default function Navigation() {
  const { navLinks, ctaButton } = siteContent.navigation;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isContactDrawerOpen, setIsContactDrawerOpen] = useState(false);
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

            {/* Desktop CTA Button & Contact Drawer Toggle */}
            <div className="hidden lg:flex items-center gap-2">
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

              {/* Contact Drawer Toggle Button */}
              <button
                onClick={() => setIsContactDrawerOpen(true)}
                className="group relative w-12 h-12 flex items-center justify-center rounded-xl bg-secondary/10 hover:bg-secondary/20 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2"
                aria-label="Open contact drawer"
              >
                <MessageCircle className="w-5 h-5 text-secondary group-hover:scale-110 transition-transform duration-300" />
              </button>
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

      {/* Contact Drawer Overlay */}
      <div
        className={`fixed inset-0 z-50 transition-all duration-300 ${
          isContactDrawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!isContactDrawerOpen}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-dark-900/60 backdrop-blur-sm"
          onClick={() => setIsContactDrawerOpen(false)}
          aria-hidden="true"
        />

        {/* Slide-in Contact Drawer */}
        <aside
          className={`drawerContainer absolute top-0 right-0 w-full max-w-md h-full bg-white shadow-2xl transition-transform duration-500 ease-out flex flex-col ${
            isContactDrawerOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          role="dialog"
          aria-modal="true"
          aria-label="Contact information"
        >
          {/* Drawer Header */}
          <div className="flex items-center justify-between p-6 border-b border-dark-100 bg-gradient-to-r from-primary/5 to-secondary/5">
            <div>
              <h2 className="text-xl font-bold text-dark-800">Get in Touch</h2>
              <p className="text-sm text-dark-500">We'd love to hear from you</p>
            </div>
            <button
              onClick={() => setIsContactDrawerOpen(false)}
              className="w-10 h-10 flex items-center justify-center rounded-lg bg-dark-100/50 hover:bg-dark-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-label="Close contact drawer"
            >
              <X className="w-5 h-5 text-dark-600" />
            </button>
          </div>

          {/* Drawer Content */}
          <div className="flex-1 p-6 space-y-6 overflow-y-auto">
            {/* Contact Information */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-dark-400 uppercase tracking-wider">Contact Info</h3>

              <a
                href="mailto:info@appwedo.com"
                className="group flex items-center gap-4 p-4 bg-dark-50 rounded-xl hover:bg-primary/5 transition-colors"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-sm text-dark-400">Email</div>
                  <div className="font-medium text-dark-800">info@appwedo.com</div>
                </div>
              </a>

              <a
                href="tel:+8801799783391"
                className="group flex items-center gap-4 p-4 bg-dark-50 rounded-xl hover:bg-secondary/5 transition-colors"
              >
                <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
                  <Phone className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <div className="text-sm text-dark-400">Phone</div>
                  <div className="font-medium text-dark-800">+88 01799783391</div>
                </div>
              </a>

              <div className="flex items-center gap-4 p-4 bg-dark-50 rounded-xl">
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <div className="text-sm text-dark-400">Address</div>
                  <div className="font-medium text-dark-800 text-sm">Unit #201 - 1017 Fort St, Victoria, BC, Canada</div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-dark-400 uppercase tracking-wider">Follow Us</h3>

              <div className="flex gap-3">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-12 h-12 bg-dark-50 rounded-xl flex items-center justify-center hover:bg-[#1877F2] transition-colors"
                  aria-label="Facebook"
                >
                  <svg className="w-5 h-5 text-dark-600 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>

                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-12 h-12 bg-dark-50 rounded-xl flex items-center justify-center hover:bg-[#1DA1F2] transition-colors"
                  aria-label="Twitter"
                >
                  <svg className="w-5 h-5 text-dark-600 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>

                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-12 h-12 bg-dark-50 rounded-xl flex items-center justify-center hover:bg-[#0A66C2] transition-colors"
                  aria-label="LinkedIn"
                >
                  <svg className="w-5 h-5 text-dark-600 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>

                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-12 h-12 bg-dark-50 rounded-xl flex items-center justify-center hover:bg-gradient-to-br hover:from-[#833AB4] hover:via-[#FD1D1D] hover:to-[#F77737] transition-all"
                  aria-label="Instagram"
                >
                  <svg className="w-5 h-5 text-dark-600 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                  </svg>
                </a>

                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-12 h-12 bg-dark-50 rounded-xl flex items-center justify-center hover:bg-[#333] transition-colors"
                  aria-label="GitHub"
                >
                  <svg className="w-5 h-5 text-dark-600 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Response Time Info */}
            <div className="p-4 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl border border-primary/10">
              <div className="text-sm font-medium text-dark-700 mb-1">Response Time</div>
              <div className="text-xs text-dark-500">Social media — within a day</div>
              <div className="text-xs text-dark-500">Email — up to 3 days</div>
            </div>
          </div>

          {/* Drawer Footer CTA */}
          <div className="p-6 border-t border-dark-100 bg-dark-50/50">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                setIsContactDrawerOpen(false);
                scrollToSection('#contact');
              }}
              className="group flex items-center justify-center gap-2 w-full py-4 bg-gradient-to-r from-primary to-primary-600 rounded-xl font-semibold text-white shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
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
