import Hero from "@/components/Hero";
import Pricing from "@/components/Pricing/Pricing";
import FAQ from "@/components/FAQ";
import Benefits from "@/components/Benefits/Benefits";
import Container from "@/components/Container";
import Section from "@/components/Section";

const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
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
      
      </Container>
    </>
  );
};

export default HomePage;
