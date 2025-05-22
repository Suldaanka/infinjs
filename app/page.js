"use client";

import { AboutSection } from "@/components/about-section";
import { Amenities, AmenitiesSection } from "@/components/Amenities";

import Contact from "@/components/contact-section";
import FooterSection from "@/components/footer-section";
import Gallery from "@/components/Gallery";

import HeroSection from "@/components/hero-section";
import Rooms from "@/components/room-section";
import Testimonial from "@/components/testimonial";
import landingPageContent from "@/constants/landinpageContent";
import { useEffect} from "react";
import { useRouter } from "next/navigation";


import { useSelector } from "react-redux";








export default function Home() {
  const language = useSelector(state => state.language.current);
  const content = landingPageContent[language][0];
 
  const user = useSelector(state => state.user.user);
  const router = useRouter();
  console.log("user Data",user);

  useEffect(() => {
    if (!user) return;
    if (user.role !== 'WAITER' || user.role !== 'ADMIN') {
      router.push('/');
    }
  }, [user, router]);

  
  return (
    <>
      {/* Language toggle button */}
      
      
      {/* Pass the appropriate content to each component */}
      <HeroSection content={content.HeroSection}/>
      <AboutSection content={content.AboutSection}/>
      <Rooms content={content.roomsSection} />
      <Amenities content={content.HotelAmenities}/>
      <Gallery content={content.HotelGallery} />
      {/* <Testimonial content={content.Testimonials} /> */}
      <Contact content={content.Contact} />
      <FooterSection content={content.FooterSection} />
    </>
  );
}