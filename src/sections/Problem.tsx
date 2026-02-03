import { Container, SectionHeader, Card } from '../components';
import { siteContent } from '../content';

export default function Problem() {
  const { headline, subheadline, painPoints } = siteContent.problem;

  return (
    <section className="py-20 lg:py-28 bg-dark-50">
      <Container>
        <SectionHeader
          headline={headline}
          subheadline={subheadline}
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {painPoints.map((point, index) => (
            <Card
              key={index}
              icon={point.icon}
              title={point.title}
              description={point.description}
              variant="elevated"
              iconClassName="bg-red-100"
              className="group"
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
