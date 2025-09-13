import Navbar from "@/components/layout/Navbar";
import Homy from "./home/page";
import Services from "./services/page"
import About from "./about/page"
import QA from "./QA/page"
import Footer from "@/components/layout/Footer"
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
      <Footer />
    </div>
  );
}
