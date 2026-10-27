"use client";

import HomeIntro from "@/components/shared/HomeIntro";
import UpcomingEventBanner from "@/components/sections/UpcomingEventBanner";
import Hero from "@/components/sections/Hero";
import Stats from "@/components/sections/Stats";
import About from "@/components/sections/About";
import Motive from "@/components/sections/Motive";
import Teams from "@/components/sections/Teams";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/FAQ";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <HomeIntro />
      <UpcomingEventBanner />
      <Hero />
      <Stats />
      <About />
      <Motive />
      <Teams />
      <Testimonials />
      <FAQ />
      <Contact />
      <Footer />
    </>
  );
}
