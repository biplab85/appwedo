import { Container, SectionHeader } from '../components';
import { siteContent } from '../content';
import { CheckCircle } from 'lucide-react';

export default function Solution() {
  const { headline, subheadline, features } = siteContent.solution;

  return (
    <section id="about" className="py-20 lg:py-28">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Dashboard Mockup */}
          <div className="relative order-2 lg:order-1">
            <div className="bg-white rounded-2xl shadow-2xl shadow-dark-900/10 p-6 border border-dark-100">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">AW</span>
                  </div>
                  <div>
                    <div className="font-semibold text-dark-700">Project Dashboard</div>
                    <div className="text-sm text-dark-400">AppWeDo Platform</div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
              </div>

              {/* Progress bars */}
              <div className="space-y-4 mb-6">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-dark-600">Design Phase</span>
                    <span className="text-green-500 font-medium">Complete</span>
                  </div>
                  <div className="h-2 bg-dark-100 rounded-full overflow-hidden">
                    <div className="h-full w-full bg-green-500 rounded-full" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-dark-600">Development</span>
                    <span className="text-primary font-medium">75%</span>
                  </div>
                  <div className="h-2 bg-dark-100 rounded-full overflow-hidden">
                    <div className="h-full w-3/4 bg-primary rounded-full" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-dark-600">Testing</span>
                    <span className="text-dark-400 font-medium">Upcoming</span>
                  </div>
                  <div className="h-2 bg-dark-100 rounded-full overflow-hidden">
                    <div className="h-full w-0 bg-secondary rounded-full" />
                  </div>
                </div>
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-primary/5 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-primary">12</div>
                  <div className="text-xs text-dark-500">Features</div>
                </div>
                <div className="bg-secondary/5 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-secondary">4</div>
                  <div className="text-xs text-dark-500">Sprints</div>
                </div>
                <div className="bg-accent/5 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-accent">98%</div>
                  <div className="text-xs text-dark-500">Quality</div>
                </div>
              </div>
            </div>

            {/* Floating notification */}
            <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-lg p-3 border border-dark-100 animate-pulse">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-sm font-medium text-dark-700">On Track</span>
              </div>
            </div>
          </div>

          {/* Right - Content */}
          <div className="order-1 lg:order-2">
            <SectionHeader
              headline={headline}
              subheadline={subheadline}
              centered={false}
              className="mb-8"
            />

            <div className="space-y-6">
              {features.map((feature, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-dark-800 mb-1">{feature.title}</h3>
                    <p className="text-dark-500 text-sm">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
