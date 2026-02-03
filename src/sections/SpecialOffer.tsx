import { Container, Button } from '../components';
import { siteContent } from '../content';
import { Gift, Sparkles } from 'lucide-react';

export default function SpecialOffer() {
  const { headline, offer, subheadline, cta } = siteContent.specialOffer;

  return (
    <section className="py-20 lg:py-28 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary-600 to-secondary" />

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />

      {/* Sparkle effects */}
      <Sparkles className="absolute top-10 right-20 w-8 h-8 text-white/30 animate-pulse" />
      <Sparkles className="absolute bottom-20 left-32 w-6 h-6 text-white/20 animate-pulse" />

      <Container className="relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 rounded-2xl mb-6 backdrop-blur-sm">
            <Gift className="w-10 h-10 text-white" />
          </div>

          <p className="text-white/80 text-lg mb-2">{headline}</p>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            {offer}
          </h2>

          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            {subheadline}
          </p>

          <Button
            href="#contact"
            variant="secondary"
            size="lg"
            className="bg-white text-primary hover:bg-white/90 shadow-xl shadow-black/20"
          >
            {cta}
            <Sparkles className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </Container>
    </section>
  );
}
