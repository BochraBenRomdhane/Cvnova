import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import Image from "next/image";

export default function PersonalBrandingPage() {
    const steps = [
      {
        number: "1",
        title: "Share Your Story",
        description: "We start by getting to know you — your experience, achievements, and career goals. This helps us understand where you've been and where you want to go.",
        position: "left" as const,
        image: "/homeImage.png"
      },
      {
        number: "2", 
        title: "Crafting Your CV/Resume",
        description: "With your story in hand, we carefully create a CV or resume that highlights your strengths and presents your career journey with clarity and impact.",
        position: "right" as const,
        image: "/about.png"
      },
      {
        number: "3",
        title: "Refine Together",
        description: "You'll have the chance to review the draft, share your thoughts, and request adjustments. We make sure every detail feels authentic and represents you at your best.",
        position: "left" as const,
        image: "/mobile and web.png"
      },
      {
        number: "4",
        title: "Interview Preparation",
        description: "Once your CV is ready, we prepare you for interviews — from practical tips to mock sessions — so you can step into every opportunity with confidence.",
        position: "right" as const,
        image: "/cvservice.png"
      },
      {
        number: "5",
        title: "Step Forward with Confidence",
        description: "You leave not only with a powerful CV but also with the skills and self-assurance to pursue your next career move.",
        position: "left" as const,
        image: "/homeImage.png"
      }
    ];
  
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="bg-white py-20" id="personal-branding">
        <div className="container mx-auto px-8">
          <div className="w-full">
            {/* Header */}
            <div className="text-center mb-20">
              <h1 className="text-4xl font-bold text-gray-900 mb-6">
                Your CV is Your First Impression – Make it Count
              </h1>
              <div className="bg-primary/10 border border-primary/20 rounded-lg p-6 max-w-3xl mx-auto">
                <p className="text-primary font-medium text-center">
                  💼 Transform your career prospects with a professionally crafted CV and interview preparation that sets you apart from the competition.
                </p>
              </div>
            </div>

            {/* How it works section */}
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                How it works
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                We follow a proven 5-step approach to ensure your CV and interview skills are perfectly aligned with your career goals.
              </p>
            </div>
  
            {/* Timeline */}
            <div className="relative">
              {/* Vertical dashed line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full border-l-4 border-dashed border-primary"></div>

              {/* Steps */}
              <div className="space-y-32">
                {steps.map((step, index) => (
                  <div key={index} className="relative">
                    {/* Step circle */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-16 h-16 bg-primary rounded-full flex items-center justify-center z-10 shadow-lg">
                      <span className="text-white font-bold text-lg">{step.number}</span>
                    </div>

                    {/* Step content */}
                    <div className="flex items-center">
                      {/* Text content */}
                      <div className={`w-2/5 ${step.position === 'left' ? 'order-1 mr-auto pl-12' : 'order-2 ml-auto pr-12'}`}>
                        <div className="bg-white">
                          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                            {step.title}
                          </h3>
                          <p className="text-base text-gray-600 leading-relaxed">
                            {step.description}
                          </p>
                        </div>
                      </div>
                      
                      {/* Image on opposite side of the line */}
                      <div className={`w-2/5 ${step.position === 'left' ? 'order-2 ml-auto pr-12' : 'order-1 mr-auto pl-12'}`}>
                        <div className="flex justify-center">
                          <Image
                            src={step.image}
                            alt={step.title}
                            width={180}
                            height={150}
                            className="object-cover rounded-lg"
                            loading="lazy"
                            sizes="(max-width: 768px) 100vw, 180px"
                          />
                        </div>
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center mt-20">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Your Future Can&apos;t Wait!
              </h3>
              <p className="text-gray-600 mb-6">
                Your dream career starts with a single step. Schedule your session today!
              </p>
              <Link 
                href="/#contact"
                className="inline-block bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 hover:scale-105 transform transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl animate-pulse"
              >
                Schedule Your Session
              </Link>
            </div>
          </div>
        </div>
        </div>
        <Footer />
      </div>
    );
  }