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

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
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
        <Link href="/" className="text-2xl font-bold text-primary" style={{ color: '#8c52ff' }}>
          CVnova
        </Link>
      </div>

      {/* Mobile menu button - Always visible on mobile */}
      <button
        onClick={toggleMenu}
        className="md:hidden fixed top-4 right-4 z-50 p-2 rounded-lg transition-colors duration-200 text-primary hover:text-primary/80 hover:bg-primary/20 border border-primary/20 hover:border-primary/40"
        style={{ 
          color: '#8c52ff',
          backgroundColor: 'rgba(140, 82, 255, 0.2)',
          borderColor: 'rgba(140, 82, 255, 0.2)'
        }}
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

      {/* Mobile Navigation - Always visible when open */}
      {isMenuOpen && isHydrated && (
        <div className="md:hidden fixed top-16 left-4 right-4 z-40 bg-primary/10 backdrop-blur-md border border-primary/20 shadow-lg rounded-lg" style={{ backgroundColor: 'rgba(140, 82, 255, 0.1)', borderColor: 'rgba(140, 82, 255, 0.2)' }}>
          <div className="px-4 py-6 space-y-4">
            {navigationItems.map((item) => (
              <button
                key={item.name}
                onClick={() => {
                  handleNavigation(item);
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left text-foreground/90 hover:text-foreground hover:bg-muted/50 px-3 py-2 rounded-lg transition-colors duration-200"
                style={{ color: 'rgba(23, 23, 23, 0.9)' }}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      )}

      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        isScrolled 
          ? 'px-4 py-2 md:block' 
          : 'px-0 py-0'
      }`}>
        <div 
          className={`mx-auto transition-all duration-500 relative ${
            isScrolled 
              ? 'bg-primary/20 backdrop-blur-md rounded-2xl shadow-lg px-12 w-fit max-w-lg md:block hidden' 
              : 'bg-primary/20 px-8 sm:px-12 lg:px-20 w-full'
          }`}
          style={{
            backgroundColor: 'rgba(140, 82, 255, 0.2)',
            backdropFilter: isScrolled ? 'blur(12px)' : 'none'
          }}
        >
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
                style={{ 
                  color: isScrolled ? 'rgba(23, 23, 23, 0.95)' : 'rgba(23, 23, 23, 0.9)' 
                }}
              >
                {item.name}
              </button>
            ))}
          </div>

        </div>

        </div>
      </nav>
    </>
  );
};

export default Navbar;
