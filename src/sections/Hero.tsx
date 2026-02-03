import { ArrowRight, Play } from 'lucide-react';
import { Container, Button } from '../components';
import { siteContent } from '../content';

export default function Hero() {
  const { headline, subheadline, primaryCTA, secondaryCTA, socialProof } =
    siteContent.hero;

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-white to-secondary/5" />

      {/* Decorative elements */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />

      <Container className="relative z-10 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-dark-800 leading-tight mb-6">
              {headline.split(' ').map((word, i) => (
                <span
                  key={i}
                  className={
                    word === 'Apps' || word === 'Build'
                      ? 'text-primary'
                      : ''
                  }
                >
                  {word}{' '}
                </span>
              ))}
            </h1>

            <p className="text-lg sm:text-xl text-dark-500 mb-8 max-w-xl mx-auto lg:mx-0">
              {subheadline}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
              <Button href="#contact" size="lg">
                {primaryCTA}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button href="#products" variant="outline" size="lg">
                <Play className="mr-2 w-5 h-5" />
                {secondaryCTA}
              </Button>
            </div>

            {/* Social Proof */}
            <div className="flex flex-wrap gap-8 justify-center lg:justify-start">
              {socialProof.map((stat, index) => (
                <div key={index} className="text-center lg:text-left">
                  <div className="text-3xl font-bold text-primary">
                    {stat.value}
                  </div>
                  <div className="text-sm text-dark-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Visual */}
          <div className="relative hidden lg:block">
            <div className="relative">
              {/* Dashboard mockup */}
              <div className="bg-white rounded-2xl shadow-2xl shadow-dark-900/10 p-4 border border-dark-100">
                <div className="bg-dark-800 rounded-xl p-6 aspect-video">
                  <div className="flex gap-2 mb-4">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <div className="space-y-3">
                    <div className="h-4 bg-dark-600 rounded w-3/4" />
                    <div className="h-4 bg-dark-600 rounded w-1/2" />
                    <div className="h-20 bg-primary/20 rounded mt-4" />
                    <div className="grid grid-cols-3 gap-3 mt-4">
                      <div className="h-16 bg-secondary/20 rounded" />
                      <div className="h-16 bg-accent/20 rounded" />
                      <div className="h-16 bg-primary/20 rounded" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile mockup */}
              <div className="absolute -bottom-8 -left-12 w-40">
                <div className="bg-white rounded-3xl shadow-2xl shadow-dark-900/10 p-2 border border-dark-100">
                  <div className="bg-dark-800 rounded-2xl p-3 aspect-[9/19]">
                    <div className="w-12 h-1 bg-dark-600 rounded mx-auto mb-3" />
                    <div className="space-y-2">
                      <div className="h-2 bg-dark-600 rounded w-full" />
                      <div className="h-2 bg-dark-600 rounded w-3/4" />
                      <div className="h-12 bg-primary/30 rounded mt-3" />
                      <div className="h-12 bg-secondary/30 rounded" />
                    </div>
                  </div>
                </div>
              </div>

              {/* API connection indicator */}
              <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-lg p-4 border border-dark-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                    <div className="w-4 h-4 bg-secondary rounded-full animate-pulse" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-dark-700">API Connected</div>
                    <div className="text-xs text-dark-400">Real-time sync</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
