'use client';

import { MapPin } from "lucide-react";
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

export default function Contact() {
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
              <h2 className="font-serif text-3xl font-bold tracking-tight">Contact Us</h2>
              <div className="mt-2 h-1 w-24 bg-amber-600"></div>
              <p className="mt-6 text-gray-300">
                We’re here to answer any questions you may have about our hotel, services, or reservations.
              </p>
              <div className="mt-8 space-y-6">
                <div className="flex items-start">
                  <MapPin className="mr-4 h-6 w-6 text-amber-500" />
                  <div>
                    <h3 className="font-medium">Address</h3>
                    <p className="mt-1 text-gray-300">123 Hotel Street, City Center, Country</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <svg className="mr-4 h-6 w-6 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <div>
                    <h3 className="font-medium">Phone</h3>
                    <p className="mt-1 text-gray-300">+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <svg className="mr-4 h-6 w-6 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <div>
                    <h3 className="font-medium">Email</h3>
                    <p className="mt-1 text-gray-300">info@iftinhotel.com</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Form Block */}
            <motion.div variants={fadeUp}>
              <form className="space-y-4 rounded-lg bg-card p-6 text-foreground">
                <h3 className="text-xl font-bold">Send us a message</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="text-sm font-medium">First Name</label>
                    <Input className="mt-1" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Last Name</label>
                    <Input className="mt-1" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <Input type="email" className="mt-1" />
                </div>
                <div>
                  <label className="text-sm font-medium">Phone</label>
                  <Input type="tel" className="mt-1" />
                </div>
                <div>
                  <label className="text-sm font-medium">Message</label>
                  <textarea
                    className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    rows={4}
                  ></textarea>
                </div>
                <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white">
                  Send Message
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
