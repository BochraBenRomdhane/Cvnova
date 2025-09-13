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
    { name: "Home", href: "#home", isHash: true },
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
    return () => window.removeEventListener('scroll', handleScroll);
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

    // Special handling for Home - scroll to top
    if (item.name === "Home") {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (item.isHash && pathname !== '/') {
      router.push('/');
      setTimeout(() => scrollToSection(item.href), 300);
    } else if (item.isHash) {
      scrollToSection(item.href);
    } else {
      router.push(item.href);
    }
  };

  // Scroll to section
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      setTimeout(() => {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 200);
    }
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
        <div className={`mx-auto transition-all duration-500 ${
          isScrolled 
            ? 'bg-transparent backdrop-blur-md rounded-2xl shadow-lg px-12 w-fit max-w-lg' 
            : 'bg-transparent px-8 sm:px-12 lg:px-20 max-w-7xl'
        }`}>
          <div className={`flex items-center transition-all duration-500 ${
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
                className={`relative transition-all duration-300 text-lg font-medium text-foreground/80 hover:text-foreground ${
                  isScrolled 
                    ? '' 
                    : ''
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
          <div className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-md border-t border-border/20 shadow-lg">
            <div className="px-4 py-6 space-y-4">
              {navigationItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    handleNavigation(item);
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left text-foreground/80 hover:text-foreground hover:bg-muted/50 px-3 py-2 rounded-lg transition-colors duration-200"
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
