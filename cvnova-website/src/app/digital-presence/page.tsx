import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import Image from "next/image";

export default function DigitalPresencePage() {
  const steps = [
    {
      number: "1",
      title: "Understanding You",
      description: "We start by learning about your business, goals, and what your users need.",
      position: "left" as const,
      image: "/homeImage.png"
    },
    {
      number: "2", 
      title: "Planning Together",
      description: "We map out the features, timeline, and strategy so everything is clear from the start.",
      position: "right" as const,
      image: "/about.png"
    },
    {
      number: "3",
      title: "Designing the Experience",
      description: "We craft a beautiful, user-friendly design that feels just right for your brand.",
      position: "left" as const,
      image: "/mobile and web.png"
    },
    {
      number: "4",
      title: "Bringing It to Life",
      description: "Our team develops your app or website with care, making sure it works flawlessly.",
      position: "right" as const,
      image: "/cvservice.png"
    },
    {
      number: "5",
      title: "Testing & Fine-Tuning",
      description: "We thoroughly check everything to ensure a smooth, reliable experience.",
      position: "left" as const,
      image: "/homeImage.png"
    },
    {
      number: "6",
      title: "Launching with Confidence",
      description: "Your app or website goes live, ready for your audience.",
      position: "right" as const,
      image: "/about.png"
    },
    {
      number: "7",
      title: "Ongoing Support",
      description: "We stay with you, providing updates, fixes, and enhancements whenever needed.",
      position: "left" as const,
      image: "/mobile and web.png"
    }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="bg-white py-20" id="digital-presence">
        <div className="container mx-auto px-8">
          <div className="w-full">
          {/* Header */}
          <div className="text-center mb-20">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              Digital Presence Creation
            </h1>
            <div className="bg-primary/10 border border-primary/20 rounded-lg p-6 max-w-3xl mx-auto">
              <p className="text-primary font-medium text-center">
                🚀 Transform your business with a professional digital presence that engages your audience and drives results.
              </p>
            </div>
          </div>

          {/* How it works section */}
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Process
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              We follow a proven 7-step approach to create your perfect digital presence from concept to launch and beyond.
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
              Ready to Build Your Digital Presence?
            </h3>
            <p className="text-gray-600 mb-6">
              Let&apos;s create something amazing together. Your digital transformation starts here!
            </p>
            <Link 
              href="/#contact"
              className="inline-block bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 hover:scale-105 transform transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl animate-pulse"
            >
              Start Your Project
            </Link>
          </div>
        </div>
      </div>
      </div>
      <Footer />
    </div>
  );
}