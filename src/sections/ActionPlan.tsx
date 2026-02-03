import { Container, SectionHeader } from '../components';
import { siteContent } from '../content';

export default function ActionPlan() {
  const { label, headline, subheadline, steps } = siteContent.actionPlan;

  return (
    <section className="py-20 lg:py-28 bg-dark-800 text-white">
      <Container>
        <SectionHeader
          label={label}
          headline={headline}
          subheadline={subheadline}
          light
        />

        <div className="relative">
          {/* Connection line */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className="relative text-center lg:text-left"
              >
                {/* Step number */}
                <div className="relative inline-flex items-center justify-center w-16 h-16 mb-6 bg-gradient-to-br from-primary to-secondary rounded-2xl text-white font-bold text-2xl shadow-lg shadow-primary/30 lg:mx-0">
                  {step.number}
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-white/70 leading-relaxed">
                  {step.description}
                </p>

                {/* Arrow for mobile/tablet */}
                {index < steps.length - 1 && (
                  <div className="lg:hidden flex justify-center my-4">
                    <svg
                      className="w-6 h-6 text-primary rotate-90 sm:rotate-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
