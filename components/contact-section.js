'use client';

import { MapPin, Phone, Mail } from "lucide-react";
import { motion } from "framer-motion";
import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export default function Contact({ content }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeUp}
    >
      <section id="contact" className="bg-gray-900 dark:bg-gray-950 py-16 text-white">
        <div className="container mx-auto px-2">
          <div className="grid gap-12 md:grid-cols-2">
            {/* Left Info Block */}
            <motion.div variants={fadeUp}>
              <h2 className="font-serif text-3xl font-bold tracking-tight">
                {content?.title || "Contact Us"}
              </h2>
              <div className="mt-2 h-1 w-24 bg-blue-500"></div>
              <p className="mt-6 text-gray-300">
                {content?.description ||
                  "We're here to answer any questions you may have about our hotel, services, or reservations."}
              </p>
              <div className="mt-8 space-y-6">
                <div className="flex items-start">
                  <MapPin className="mr-4 h-6 w-6 text-blue-500" />
                  <div>
                    <h3 className="font-medium">Address</h3>
                    <p className="mt-1 text-gray-300">
                      {content?.address || "Iftin Hotel Hobyo, Galmudug somalia"}
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="mr-4 h-6 w-6 text-blue-500" />
                  <div>
                    <h3 className="font-medium">Phone</h3>
                    <p className="mt-1 text-gray-300">
                      {content?.phone || "+252xxxxxxx"}
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Mail className="mr-4 h-6 w-6 text-blue-500" />
                  <div>
                    <h3 className="font-medium">Email</h3>
                    <p className="mt-1 text-gray-300">
                      {content?.email || "info@iftinhotel.com"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Media Icons */}
              <div className="mt-8 flex space-x-4">
                <a href="#" className="rounded-full bg-blue-500 p-2 text-white hover:bg-blue-600 transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </a>
                <a href="#" className="rounded-full bg-blue-500 p-2 text-white hover:bg-blue-600 transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
                <a href="#" className="rounded-full bg-blue-500 p-2 text-white hover:bg-blue-600 transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z" />
                  </svg>
                </a>
                <a href="#" className="rounded-full bg-blue-600 p-2 text-white hover:bg-blue-700 transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
              </div>
            </motion.div>

            {/* Right Form Block */}
            <motion.div variants={fadeUp}>
              <form className="space-y-4 rounded-lg bg-gray-800 p-6 text-white">
                <h3 className="text-xl font-bold">Send us a message</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="text-sm font-medium">First Name</label>
                    <Input
                      className="mt-1 bg-gray-700 border-gray-600 focus:border-blue-500 focus-visible:ring-blue-500"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Last Name</label>
                    <Input
                      className="mt-1 bg-gray-700 border-gray-600 focus:border-blue-500 focus-visible:ring-blue-500"
                      placeholder="Doe"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <Input
                    type="email"
                    className="mt-1 bg-gray-700 border-gray-600 focus:border-blue-500 focus-visible:ring-blue-500"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Phone</label>
                  <Input
                    type="tel"
                    className="mt-1 bg-gray-700 border-gray-600 focus:border-blue-500 focus-visible:ring-blue-500"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Message</label>
                  <textarea
                    className="mt-1 w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-sm 
                    placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 
                    focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
                    rows={4}
                    placeholder="How can we help you?"
                  ></textarea>
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  Send Message
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Google Maps Integration */}
      <div className="w-full h-96 bg-gray-300">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3340.375504170929!2d48.52014811361887!3d5.3560341446313116!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3d6e63b063a281fd%3A0x99a369227a48c578!2sIftin%20Hotel%20Hobyo!5e0!3m2!1sen!2sso!4v1747489068800!5m2!1sen!2sso"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Hotel Location Map"
        ></iframe>
      </div>
    </motion.div>
  )
}