import { Container, SectionHeader, Card } from '../components';
import { siteContent } from '../content';

export default function Benefits() {
  const { label, headline, subheadline, benefits } = siteContent.benefits;

  return (
    <section className="py-20 lg:py-28">
      <Container>
        <SectionHeader
          label={label}
          headline={headline}
          subheadline={subheadline}
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <Card
              key={index}
              icon={benefit.icon}
              title={benefit.title}
              description={benefit.description}
              variant="gradient"
              className="h-full"
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
