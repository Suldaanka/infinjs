import AboutSection from "@/components/about-section";
import Amenities from "@/components/Amenities";
import Contact from "@/components/contact-section";
import FooterSection from "@/components/footer-section";
import Gallery from "@/components/Gallery";
import HeroSection from "@/components/hero-section";
import Rooms from "@/components/room-section";
import Testimonial from "@/components/testimonial";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <HeroSection/>
      <AboutSection/>
      <Rooms/>
      <Amenities/>
      <Gallery/>
      <Testimonial/>
      <Contact/>
      <FooterSection/>
    </>
  );
}
