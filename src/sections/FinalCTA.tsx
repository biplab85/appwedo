import { Container, SectionHeader, Button } from '../components';
import { siteContent } from '../content';
import { Mail, Phone, Clock, ArrowRight, Calendar } from 'lucide-react';

export default function FinalCTA() {
  const { headline, subheadline, primaryCTA, secondaryCTA, contactInfo } =
    siteContent.finalCTA;

  return (
    <section id="contact" className="py-20 lg:py-28">
      <Container>
        <div className="bg-gradient-to-br from-dark-800 to-dark-900 rounded-3xl p-8 lg:p-16 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />

          <div className="relative z-10">
            <SectionHeader
              headline={headline}
              subheadline={subheadline}
              light
              className="mb-10"
            />

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button href={`mailto:${contactInfo.email}`} size="lg">
                {primaryCTA}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                href={`tel:${contactInfo.phone.replace(/\s/g, '')}`}
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-dark-800"
              >
                <Calendar className="mr-2 w-5 h-5" />
                {secondaryCTA}
              </Button>
            </div>

            {/* Contact Info */}
            <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div className="flex items-center justify-center gap-3 text-white/80">
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="hover:text-white transition-colors"
                >
                  {contactInfo.email}
                </a>
              </div>
              <div className="flex items-center justify-center gap-3 text-white/80">
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                  <Phone className="w-5 h-5 text-secondary" />
                </div>
                <a
                  href={`tel:${contactInfo.phone.replace(/\s/g, '')}`}
                  className="hover:text-white transition-colors"
                >
                  {contactInfo.phone}
                </a>
              </div>
              <div className="flex items-center justify-center gap-3 text-white/80 sm:col-span-1">
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-accent" />
                </div>
                <span className="text-sm">{contactInfo.responseTime}</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
