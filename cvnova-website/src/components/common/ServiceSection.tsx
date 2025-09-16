import Image from "next/image";
import Link from "next/link";

interface ServiceSectionProps {
  id?: string;
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: string;
  imagePosition?: "left" | "right";
  className?: string;
  imageWidth?: number;
  imageHeight?: number;
  discoverMoreLink?: string;
}

const ServiceSection = ({
  id,
  imageSrc,
  imageAlt,
  title,
  description,
  imagePosition = "left",
  className = "",
  imageWidth = 600,
  imageHeight = 400,
  discoverMoreLink = "#contact",
}: ServiceSectionProps) => {
  const normalizedSrc = imageSrc.startsWith('http')
    ? imageSrc
    : imageSrc;

  const imageSection = (
    <div className="flex justify-center lg:justify-start">
      <Image
        src={normalizedSrc}
        alt={imageAlt}
        width={imageWidth}
        height={imageHeight}
        className="w-full h-auto rounded-lg"
        priority
      />
    </div>
  );

  const textSection = (
    <div className="space-y-6">
      {/* Title */}
      <h2 className="text-3xl sm:text-4xl font-semibold text-foreground leading-tight">
        {title}
      </h2>
      
      {/* Description */}
      <p className="text-lg text-muted-foreground leading-relaxed">
        {description}
      </p>
      
      {/* Discover More Button */}
      <div className="pt-4">
        <Link
          href={discoverMoreLink}
          prefetch={true}
          className="group inline-flex items-center px-6 py-3 bg-primary/10 text-primary font-medium rounded-full hover:bg-primary/20 transition-all duration-300 border border-primary/20 hover:border-primary/30 hover:scale-105 hover:shadow-lg hover:shadow-primary/25 transform animate-pulse hover:animate-none"
          style={{
            backgroundColor: 'rgba(140, 82, 255, 0.1)',
            color: '#8c52ff',
            borderColor: 'rgba(140, 82, 255, 0.2)',
            animation: 'float 3s ease-in-out infinite, pulse 2s ease-in-out infinite'
          }}
        >
          Discover More
          <svg className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );

  return (
    <div id={id} className={`py-16 bg-gradient-to-br from-background to-muted/30 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`grid lg:grid-cols-2 gap-24 items-center ${
          imagePosition === "right" ? "lg:grid-flow-col-dense" : ""
        }`}>
          {imagePosition === "left" ? (
            <>
              {imageSection}
              <div className="lg:pl-8">
                {textSection}
              </div>
            </>
          ) : (
            <>
              <div className="lg:pr-8">
                {textSection}
              </div>
              {imageSection}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceSection;
