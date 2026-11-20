import Hero from "@/components/Hero";
import Pricing from "@/components/Pricing/Pricing";
import FAQ from "@/components/FAQ";
import Benefits from "@/components/Benefits/Benefits";
import Container from "@/components/Container";
import Section from "@/components/Section";
import CTA from "@/components/CTA";
import WorksWith from "@/components/WorksWith";

const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <WorksWith />
      <Container>
        <Benefits />

        <Section
          id="pricing"
          title="Pricing"
          description="Simple, transparent pricing. No surprises."
        >
          <Pricing />
        </Section>

        <FAQ />

        <CTA />
      
      </Container>
    </>
  );
};

export default HomePage;
