
import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "./ModeToggle";
import { useUser, getC, UserButton } from "@clerk/nextjs";
import landinpageContent from "@/constants/landinpageContent";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "./ui/button";
import { setLanguage, toggleLanguage } from '@/redux/features/initialLanguage/langSlice';
import Image from "next/image";
import soflag from "/public/so.svg";
import enflag from "/public/en.svg";

export default function NavBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  
  const dispatch = useDispatch();
  const language = useSelector((state) => state.language.current);
    
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && savedLanguage !== language) {
      dispatch(setLanguage(savedLanguage));
    } else if (!savedLanguage) {
      // If no language is saved yet, save the default
      localStorage.setItem('language', language);
    }
  }, []);

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };


  const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#rooms", label: "Rooms" },
    { href: "#amenities", label: "Amenities" },
    { href: "#gallery", label: "Gallery" },
    { href: "#testimonials", label: "Testimonials" },
    { href: "#contact", label: "Contact" },
  ];

  const { isSignedIn } = useUser();

  return (
    <div className="mx-auto">
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b">
        <div className="max-w-6xl mx-auto flex h-16 items-center justify-between px-4 md:px-5">
          <div className="flex items-center gap-2">
            <span className="font-serif text-xl sm:text-2xl font-bold">
              Iftin Hotel
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex md:gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href.substring(1))}
                className="text-sm font-medium transition-colors hover:text-amber-600"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-4">
            <button 
              onClick={() => dispatch(toggleLanguage())}
            > 
              <Image alt={language} width={30} height={30} src={language === "en" ? enflag : soflag} />
            </button>
            <ModeToggle />
            {isSignedIn ? (<UserButton />) : (
              <button className="hidden md:flex px-4 py-2 border border-gray-300 rounded-md text-sm font-medium">
                <Link href="/sign-in">Sign In</Link>
              </button>
            )}

            {/* Book Now Button */}
            <button className="bg-amber-600 hover:bg-amber-700 text-white rounded-md text-sm px-3 py-2 font-medium">
              Book Now
            </button>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 text-gray-600 dark:text-gray-300"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
         {mobileMenuOpen && (
                  <div className="fixed inset-0 top-16 z-40 bg-white dark:bg-gray-900 md:hidden">
                    <nav className="flex flex-col p-4 bg-yellow-200 dark:bg-black">
                      {navLinks.map((link) => (
                        <a
                          key={link.href}
                          href={link.href}
                          onClick={(e) => scrollToSection(e, link.href.substring(1))}
                          className="border-b border-gray-200 dark:border-gray-700 py-4 text-base font-medium transition-colors hover:text-amber-600"
                        >
                          {link.label}
                        </a>
                      ))}
                      <div className="mt-6 flex flex-col gap-4">
                        <button className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md text-sm font-medium">
                          Sign In
                        </button>
                      </div>
                    </nav>
                  </div>
                )}
      </header>
    </div>
  );
}
