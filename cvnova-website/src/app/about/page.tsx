import Image from "next/image";

export default function About() {
  const prefix = process.env.NODE_ENV === 'production' ? '/Cvnova/' : '/';
  return (
    <div className="min-h-screen" id="about">
      {/* Header Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20">
        <div className="text-center">
          <div className="inline-block mb-4 sm:mb-6">
            <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-primary to-primary/60 rounded-full mx-auto"></div>
          </div>
          <h3 className="text-base sm:text-lg font-semibold text-primary mb-3 sm:mb-4 uppercase tracking-wider">
            About Us
          </h3>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-3 sm:mb-4 leading-tight">
            Who We Are, What We Do.
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground mb-4 sm:mb-6">
            We help individuals and businesses shine online
          </p>
        </div>
      </div>

      {/* About Content */}
      <div className="pt-4 pb-16 bg-gradient-to-br from-background to-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-2">
            {/* Image Section */}
            <div className="flex justify-center">
              <Image
                src={`${prefix}about.png`}
                alt="About CVNOVA Group - Professional services"
                width={600}
                height={400}
                className="w-full max-w-2xl h-auto rounded-lg"
                priority
              />
            </div>

            {/* Text Content */}
            <div className="space-y-6">
              <div className="space-y-4">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  At CVNOVA Group, We design modern websites and intuitive mobile apps that bring ideas, services, and businesses to life. On top of that, we create professional CVs and resumes, and optimize LinkedIn profiles to strengthen your online presence and open doors to new opportunities.
                </p>
                
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Our mission is simple: provide the tools and expertise you need to grow, succeed, and stand out—whether you&apos;re advancing your career, building a business, or creating a digital presence that makes an impact.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
