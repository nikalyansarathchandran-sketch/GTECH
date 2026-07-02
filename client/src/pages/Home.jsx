import Hero from "../components/home/Hero";
import AboutPreview from "../components/home/AboutPreview";
import ServicesPreview from "../components/home/ServicesPreview";
import WhyChooseUs from "../components/home/WhyChooseUs";
import ProjectsPreview from "../components/home/ProjectsPreview";
import CTA from "../components/home/CTA";

function Home() {
  return (
    <>
      <Hero />
      <AboutPreview />
      <ServicesPreview />
      <WhyChooseUs />
      <ProjectsPreview />
      <CTA />
    </>
  );
}

export default Home;