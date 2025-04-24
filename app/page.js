"use client";

import { useState } from "react";
import AboutSection from "@/components/about-section";
import Amenities from "@/components/Amenities";
import FooterSection from "@/components/footer-section";
import Gallery from "@/components/Gallery";
import HeroSection from "@/components/hero-section";
import Rooms from "@/components/room-section";
import Testimonial from "@/components/testimonial";
import landinpageContent from "@/constants/landinpageContent";
import { useSelector } from "react-redux";
import Contact from "@/components/contact-section";


export default function Home() {
  const language = useSelector(state => state.language.current);
  const content = landinpageContent[language][0];
 
  return (
    <>
      {/* Language toggle button */}
      
      
      {/* Pass the appropriate content to each component */}
      <HeroSection content={content.HeroSection} />
      <AboutSection content={content.AboutSection} />
      <Rooms content={content.roomsSection} />
      <Amenities content={content.HotelAmenities} />
      <Gallery content={content.HotelGallery} />
      <Testimonial content={content.Testimonial} />
      <Contact content={content.Contact} />
      <FooterSection content={content.FooterSection} />
    </>
  );
}