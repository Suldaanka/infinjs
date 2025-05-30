"use client";
import { usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";
import { DotIcon, Menu, User, X } from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "./ModeToggle";
import { useUser, getC, UserButton } from "@clerk/nextjs";
import landinpageContent from "@/constants/landinpageContent";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "./ui/button";
import { setLanguage, toggleLanguage } from '@/redux/features/initialLanguage/langSlice';
import Image from "next/image";
import soflag from "@/public/so.svg";
import enflag from "@/public/en.svg";

export default function NavBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);


  const dispatch = useDispatch();
  const language = useSelector((state) => state.language.current);
  const [isLanguageInitialized, setIsLanguageInitialized] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true); // Set hasMounted to true once component mounts
    if (hasMounted) {
      const handleResize = () => {
        if (window.innerWidth >= 768) {
          setMobileMenuOpen(false);
        }
      };

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, [hasMounted]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (hasMounted) {
      if (mobileMenuOpen) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }

      return () => {
        document.body.style.overflow = "auto";
      };
    }
  }, [mobileMenuOpen, hasMounted]);

  useEffect(() => {
    if (hasMounted) {
      const savedLanguage = localStorage.getItem('language');
      if (savedLanguage && savedLanguage !== language) {
        dispatch(setLanguage(savedLanguage));
      } else if (!savedLanguage) {
        // If no language is saved yet, save the default
        localStorage.setItem('language', language);
      }
      setIsLanguageInitialized(true);
    }
  }, [dispatch, language, hasMounted]);

  const scrollToSection = (e, id) => {
    e.preventDefault();
    if (typeof document !== 'undefined') {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        setMobileMenuOpen(false);
      }
    }
  };


    const pathname = usePathname();
    const isHomepage = pathname === '/';

  const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#rooms", label: "Rooms" },
    { href: "/recent-booking", label: "Booking" },
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
              <Image
                src="/logo.png"
                alt="Logo"
                width={40}
                height={40}
                className="h-8 w-8 sm:h-10 sm:w-10 rounded-full"
              />
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex md:gap-6">
      {navLinks.map((link) => {
        if (link.href.startsWith('/')) {
          return <Link className="text-sm font-medium transition-colors hover:text-blue-600" href={link.href} key={link.label}>{link.label}</Link>;
        } else {
          return (
            <Link 
              href={isHomepage ? link.href : `/${link.href}`}
              onClick={(e) => {
                if (!isHomepage) {
                  e.preventDefault();
                  if (typeof window !== 'undefined') {
                    window.location.href = `/${link.href}`;
                  }
                }
              }}
              key={link.label}
              className="text-sm font-medium transition-colors hover:text-blue-600"
            >
              {link.label}
            </Link>
          );
        }
      })}
    </nav>

          <div className="flex items-center gap-2 sm:gap-4">
            {hasMounted && isLanguageInitialized && (
            <button
              onClick={() => dispatch(toggleLanguage())}
            >
              <Image alt={language} width={30} height={30} src={language === "en" ? enflag : soflag} />
            </button>
            )}
            <ModeToggle />
            {hasMounted ? (
              isSignedIn ? (
                <UserButton>
                  <UserButton.MenuItems>
                    <UserButton.Link
                      label="Profile"
                      labelIcon={<User/>}
                      href="/profile"
                    />
                  </UserButton.MenuItems>
                </UserButton>
              ) : (
                <button className="hidden md:flex px-4 py-2 border border-gray-300 rounded-md text-sm font-medium">
                  <Link href="/sign-in">Sign In</Link>
                </button>
              )
            ) : (
              // Placeholder for before hydration: Render the 'Sign In' button as a safe default.
              <button className="hidden md:flex px-4 py-2 border border-gray-300 rounded-md text-sm font-medium">
                <Link href="/sign-in">Sign In</Link>
              </button>
            )}

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
            <nav className="flex flex-col p-4 bg-background/80 backdrop-blur-md">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href.substring(1))}
                  className="border-b border-gray-200 dark:border-gray-700 py-4 text-base font-medium transition-colors hover:text-blue-600"
                >
                  {link.label}
                </a>
              ))}
              <div className="mt-6 flex flex-col gap-4">
                <Button className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md text-sm font-medium">
                  <link href="/sign-in">Sign In</link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </header>
    </div>
  );
}
