import {
  Navigation,
  Hero,
  Problem,
  Solution,
  Services,
  Benefits,
  ActionPlan,
  Products,
  About,
  Testimonials,
  FAQ,
  SpecialOffer,
  FinalCTA,
  Footer,
} from './sections';

function App() {
  return (
    <div className="min-h-screen">
      {/* Skip to content link for accessibility */}
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>

      <Navigation />

      <main id="main-content">
        <Hero />
        <Problem />
        <About />
        {/* <Solution /> */}
        <Services />
        <Benefits />
        <ActionPlan />
        <Products />        
        <Testimonials />
        <FAQ />
        <FinalCTA />
      </main>

      <Footer />
    </div>
  );
}

export default App;
