import { Hero } from "@/components/site/hero";
import { FeaturedWork } from "@/components/site/featured-work";
import { ProjectCarousel } from "@/components/site/project-carousel";
import { AboutTeaser } from "@/components/site/about-teaser";
import { featured, shipped } from "@/lib/content";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedWork projects={featured} />
      <ProjectCarousel title="Also shipped" projects={shipped} />
      <AboutTeaser />
    </>
  );
}
