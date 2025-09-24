
import AboutSection from "@/component/Home/About";
import BlogSection from "@/component/Home/BlogSection";
import ClientsSection from "@/component/Home/ClientSection";
import ContactSection from "@/component/Home/ContactSection";
import HeroSection from "@/component/Home/HeroSection";
import NewsletterSection from "@/component/Home/Newsletter";
import PortfolioSection from "@/component/Home/Portfolio";
import Services from "@/component/Home/Service";
import TeamSection from "@/component/Home/TeamSection";
import TestimonialSection from "@/component/Home/Testimonial";
import Image from "next/image";



export default function Home() {
  return (
   <>
    <HeroSection />
    <AboutSection />
    <Services />
    <PortfolioSection />
    <ClientsSection />
    <NewsletterSection />
    <TeamSection />
    <TestimonialSection />
    <BlogSection />
    <ContactSection />
   </>
  );
}
