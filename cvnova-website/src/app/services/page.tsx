import ServiceSection from "@/components/common/ServiceSection";

export default function Services() {
  return (
    <div className="min-h-screen" id="services">
      {/* Header Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20">
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <div className="inline-block mb-4 sm:mb-6">
            <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-primary to-primary/60 rounded-full mx-auto"></div>
          </div>
          <h3 className="text-base sm:text-lg font-semibold text-primary mb-3 sm:mb-4 uppercase tracking-wider">
            Our Services
          </h3>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-3 sm:mb-4 leading-tight">
            Professional Solutions,<br />
            Creative Excellence.
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground mb-4 sm:mb-6">
            We help professionals and businesses present themselves with clarity and confidence
          </p>
          <p className="text-base sm:text-lg text-muted-foreground/80 max-w-4xl mx-auto leading-relaxed px-4">
            From personal branding to digital platforms, we ensure your presence leaves a lasting impression.
          </p>
        </div>
      </div>

      {/* Digital Presence & Product Development - Service 2 */}
      <ServiceSection
        id="digital-presence"
        imageSrc="/mobile and web.png"
        imageAlt="Digital presence and product development services"
        title="Digital Presence & Product Development"
        description="We create modern websites,  mobile apps, and portfolios designed to bring your ideas, services, or business to life. Our focus is on building digital tools and platforms that help professionals, freelancers, and businesses showcase their skills, connect with clients, and grow online."
        imagePosition="left"
        discoverMoreLink="/digital-presence"
      />

      {/* Personal & Career Branding - Service 1 */}
      <ServiceSection
        id="personal-branding"
        imageSrc="/cvservice.png"
        imageAlt="Personal and career branding services"
        title="Personal & Career Branding"
        description="We specialize in crafting tailored CVs and resumes that showcase your skills, experience, and achievements with precision and impact. Beyond documents, we optimize LinkedIn profiles to strengthen your online professional presence, helping you connect with opportunities and stand out in competitive markets. Our focus is on empowering individuals to present themselves confidently and professionally, turning career goals into tangible succes ."
        imagePosition="right"
        discoverMoreLink="/personal-branding"
      />
    </div>
  );
}
