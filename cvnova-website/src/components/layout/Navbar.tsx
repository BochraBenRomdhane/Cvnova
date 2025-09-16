"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

interface NavbarProps {
  onNavigate?: (href: string) => void;
}

const Navbar = ({ onNavigate }: NavbarProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [scrollSpeed, setScrollSpeed] = useState(0);

  // Ensure hydration is complete
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const navigationItems = [
    { name: "Home", href: "/", isHash: false },
    { name: "Services", href: "#services", isHash: true },
    { name: "About", href: "#about", isHash: true },
    { name: "Q&A", href: "#QA", isHash: true },
    { name: "ContactUs", href: "#contact", isHash: true },
  ];

  // Handle scroll effect with speed detection
  useEffect(() => {
    let lastScrollTop = 0;
    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const speed = Math.abs(scrollTop - lastScrollTop);
      
      setIsScrolled(scrollTop > 20);
      setScrollSpeed(speed);
      
      // Reset speed after scroll stops
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => setScrollSpeed(0), 150);
      
      lastScrollTop = scrollTop;
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  // Handle click outside to close mobile menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMenuOpen) {
        const target = event.target as Element;
        if (!target.closest('nav')) {
          setIsMenuOpen(false);
        }
      }
    };

    if (isMenuOpen) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Navigation handler
  const handleNavigation = (item: { name: string; href: string; isHash: boolean }) => {
    if (onNavigate) {
      onNavigate(item.href);
      return;
    }

    // Handle Home navigation - always go to home page
    if (item.name === "Home") {
      if (pathname !== '/') {
        // Navigate to home page
        router.push('/');
      } else {
        // Already on home page, scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    // Handle other hash navigation items
    if (item.isHash && pathname !== '/') {
      // Navigate to home first, then scroll to target section with retry
      router.push('/', { scroll: false });
      setTimeout(() => scrollToSection(item.href), 300);
    } else if (item.isHash) {
      scrollToSection(item.href);
    } else {
      router.push(item.href);
    }
  };

  // Scroll to section
  const scrollToSection = (href: string) => {
    const selector = href.startsWith('#') ? href : `#${href}`;
    const tryScroll = () => {
      const el = document.querySelector(selector);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return true;
      }
      return false;
    };

    if (tryScroll()) return;

    let attempts = 0;
    const maxAttempts = 20; // ~2s
    const interval = setInterval(() => {
      attempts += 1;
      if (tryScroll() || attempts >= maxAttempts) {
        clearInterval(interval);
      }
    }, 100);
  };

  return (
    <>
      {/* Fixed Logo - Always visible in left corner */}
      <div className="fixed top-4 left-4 z-50">
        <Link href="/" className="text-2xl font-bold text-primary">
          CVnova
        </Link>
      </div>

      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        isScrolled 
          ? 'px-4 py-2' 
          : 'px-0 py-0'
      }`}>
        <div 
          className={`mx-auto transition-all duration-500 relative ${
            isScrolled 
              ? 'bg-primary/20 backdrop-blur-md rounded-2xl shadow-lg px-12 w-fit max-w-lg' 
              : 'bg-primary/20 px-8 sm:px-12 lg:px-20 w-full'
          }`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Animated Border - Only visible when scrolled */}
          {isScrolled && (
            <div className="absolute inset-0 rounded-2xl overflow-hidden">
              {/* Static border */}
              <div className="absolute inset-0 rounded-2xl border-2 border-primary/20"></div>
              {/* SVG for border-following animation */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="transparent" />
                    <stop offset="50%" stopColor="var(--primary)" />
                    <stop offset="100%" stopColor="transparent" />
                  </linearGradient>
                </defs>
                <rect
                  x="2"
                  y="2"
                  width="96"
                  height="96"
                  rx="12"
                  ry="12"
                  fill="none"
                  stroke="url(#lineGradient)"
                  strokeWidth="1.5"
                  strokeDasharray="6, 94"
                  className={`animate-border-path ${isHovered ? 'paused' : ''} ${scrollSpeed > 5 ? 'fast' : scrollSpeed > 0 ? 'normal' : 'slow'}`}
                />
              </svg>
              <div className="absolute inset-2 rounded-xl bg-primary/8 backdrop-blur-md"></div>
            </div>
          )}
          <div className={`flex items-center transition-all duration-500 relative z-10 ${
            isScrolled 
              ? 'justify-center h-12' 
              : 'justify-center h-16'
          }`}>

          {/* Desktop Navigation - Always centered */}
          <div className="hidden md:flex items-center space-x-8">
            {isHydrated && navigationItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavigation(item)}
                className={`relative transition-all duration-300 text-lg font-medium text-foreground/90 hover:text-foreground ${
                  isScrolled 
                    ? 'text-foreground/95' 
                    : 'text-foreground/90'
                }
                         after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 
                         after:bg-primary after:transition-all after:duration-300 
                         hover:after:w-full`}
              >
                {item.name}
              </button>
            ))}
          </div>


          {/* Mobile menu button - Always visible on mobile */}
          <button
            onClick={toggleMenu}
            className={`md:hidden p-2 rounded-lg transition-colors duration-200 ${
              isScrolled 
                ? 'text-foreground/70 hover:text-foreground hover:bg-muted/50' 
                : 'text-foreground/80 hover:text-foreground hover:bg-muted'
            }`}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && isHydrated && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-primary/10 backdrop-blur-md border-t border-primary/20 shadow-lg">
            <div className="px-4 py-6 space-y-4">
              {navigationItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    handleNavigation(item);
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left text-foreground/90 hover:text-foreground hover:bg-muted/50 px-3 py-2 rounded-lg transition-colors duration-200"
                >
                  {item.name}
                </button>
              ))}
              <div className="pt-4 border-t border-border/20">
                <button className="w-full bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors duration-200">
                  Get Started
                </button>
              </div>
            </div>
          </div>
        )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
