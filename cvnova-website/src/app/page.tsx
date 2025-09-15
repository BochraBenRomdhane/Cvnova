import dynamic from "next/dynamic";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// Dynamic imports for better code splitting
const Homy = dynamic(() => import("./home/page"), { ssr: true });
const Services = dynamic(() => import("./services/page"), { ssr: true });
const About = dynamic(() => import("./about/page"), { ssr: true });
const QA = dynamic(() => import("./QA/page"), { ssr: true });
const Contact = dynamic(() => import("./contact/page"), { ssr: true });

// Prefetch destination pages for faster navigation
if (typeof window !== 'undefined') {
  import('./digital-presence/page');
  import('./personal-branding/page');
}
export default function Home() {
  return (
    <div className="min-h-screen ">
      <Navbar />
      <div className="pt-25">
        <Homy />
      </div>
      <div className="pt-5">
        <Services />
      </div>
      <div className="pt-5">
        <About />
      </div>
      <div className="pt-5">
        <QA />
      </div>
      <div className="pt-5">
        <Contact />
      </div>
      <Footer />
    </div>
  );
}
