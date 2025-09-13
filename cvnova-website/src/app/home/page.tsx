import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div id="home" className="bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Image */}
          <div className="flex justify-center lg:justify-start">
            <Image
              src="/craiyon_183430_image.png"
              alt="Professional presenting with global impact"
              width={800}
              height={800}
              className="w-full h-auto"
              priority
            />
          </div>

          {/* Right Side - Text Content */}
          <div className="space-y-8">
            {/* Headline */}
            <h1 className="text-5xl sm:text-6xl font-bold text-primary leading-tight">
              Start Smart
            </h1>
            
            {/* Intro Text */}
            <p className="text-xl text-muted-foreground leading-relaxed max-w-4xl">
              At CVNova, we help professionals and businesses present themselves with clarity and confidence. From creating polished personal and professional profiles to designing sleek digital platforms, we ensure your presence leaves a lasting impression — in every corner that matters.
            </p>
            
            {/* Call-to-Action */}
            <div className="pt-4 text-right text-2xl font-normal text-primary hover:text-primary/80 transition-colors duration-200">
                Let's Build Something Unforgettable
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
