import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Container, Button } from '../components';
import { siteContent } from '../content';

export default function Navigation() {
  const { logo, navLinks, ctaButton } = siteContent.navigation;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg shadow-dark-900/5'
          : 'bg-transparent'
      }`}
    >
      <Container>
        <nav className="flex items-center justify-between h-20">
          {/* Logo */}
          <a
            href="#"
            className="text-2xl font-bold text-primary flex items-center gap-2"
          >
            <img
              src="/images/appwedo-logo.png"
              alt="AppWeDo"
              className="h-10 w-auto"
            />
            <span className="hidden sm:inline">{logo}</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-dark-600 hover:text-primary font-medium transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:block">
            <Button href="#contact" size="md">
              {ctaButton}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-dark-600 hover:text-primary transition-colors"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </nav>
      </Container>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed inset-0 top-20 bg-white z-40 transition-transform duration-300 ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <Container className="py-8">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="text-xl font-medium text-dark-700 hover:text-primary py-3 border-b border-dark-100 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <Button
              href="#contact"
              size="lg"
              className="mt-4"
              onClick={() => setIsMenuOpen(false)}
            >
              {ctaButton}
            </Button>
          </div>
        </Container>
      </div>
    </header>
  );
}
