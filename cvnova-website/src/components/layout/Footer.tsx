import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Logo and Description */}
          <div>
            <Link href="/" className="text-3xl font-bold mb-4 inline-block">
              CVnova
            </Link>
            <p className="text-primary-foreground/80 mb-6 max-w-2xl mx-auto">
            We create modern websites, mobile apps, and professional branding tools that help individuals and businesses stand out and succeed
            </p>
            
            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-primary-foreground/80">
                <li>cvnova@outlook.fr</li>
              </ul>
            </div>
          </div>

          {/* Quick Links */}
          {/* <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#home" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#about" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="#services" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div> */}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center">
          <p className="text-primary-foreground/60">
            © 2025 CVnova. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

