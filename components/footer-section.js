'use client';

import React from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { motion } from 'framer-motion';

const scrollToSection = (e, id) => {
  e.preventDefault();
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
};

export default function FooterSection() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className=''
    >
      <footer className="bg-gray-900 dark:bg-gray-950 py-12 text-gray-300 px-2">
        <div className="container mx-auto">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <h3 className="text-xl font-bold text-white">Iftin Hotel</h3>
              <p className="mt-4">
                Experience luxury and comfort in the heart of the city. Your perfect stay awaits at Iftin Hotel.
              </p>
              <div className="mt-6 flex space-x-4">
                {/* Social Links */}
                {/* ... Keep your SVG icons as-is here ... */}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white">Quick Links</h3>
              <ul className="mt-4 space-y-2">
                <li><a href="#home" onClick={(e) => scrollToSection(e, "home")} className="hover:text-amber-400">Home</a></li>
                <li><a href="#rooms" onClick={(e) => scrollToSection(e, "rooms")} className="hover:text-amber-400">Rooms & Suites</a></li>
                <li><a href="#amenities" onClick={(e) => scrollToSection(e, "amenities")} className="hover:text-amber-400">Amenities</a></li>
                <li><a href="#gallery" onClick={(e) => scrollToSection(e, "gallery")} className="hover:text-amber-400">Gallery</a></li>
                <li><a href="#contact" onClick={(e) => scrollToSection(e, "contact")} className="hover:text-amber-400">Contact</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white">Services</h3>
              <ul className="mt-4 space-y-2">
                <li><a href="#" className="hover:text-amber-400">Restaurant & Dining</a></li>
                <li><a href="#" className="hover:text-amber-400">Spa & Wellness</a></li>
                <li><a href="#" className="hover:text-amber-400">Conference Rooms</a></li>
                <li><a href="#" className="hover:text-amber-400">Airport Shuttle</a></li>
                <li><a href="#" className="hover:text-amber-400">Concierge Services</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white">Newsletter</h3>
              <p className="mt-4">Subscribe to our newsletter for special offers and updates.</p>
              <form className="mt-4 flex">
                <Input
                  type="email"
                  placeholder="Your email"
                  className="rounded-r-none bg-gray-800 dark:bg-gray-900 text-white"
                />
                <Button className="rounded-l-none bg-amber-600 hover:bg-amber-700 text-white">Subscribe</Button>
              </form>
            </div>
          </div>
          <div className="mt-12 border-t border-gray-800 pt-8 text-center">
            <p>© {new Date().getFullYear()} Iftin Hotel. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </motion.div>
  );
}
