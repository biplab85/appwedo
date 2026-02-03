import { Container, SectionHeader, Card } from '../components';
import { siteContent } from '../content';

export default function Services() {
  const { label, headline, subheadline, services } = siteContent.services;

  return (
    <section id="services" className="py-20 lg:py-28 bg-dark-50">
      <Container>
        <SectionHeader
          label={label}
          headline={headline}
          subheadline={subheadline}
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <Card
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              variant="elevated"
              className="h-full"
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
