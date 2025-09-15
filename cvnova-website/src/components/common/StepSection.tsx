"use client";

import Image from "next/image";

interface Step {
  number: string;
  title: string;
  description: string;
  image: string;
  position: "left" | "right";
}

interface StepSectionProps {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  steps: Step[];
}

export default function StepSection({
  id,
  title,
  subtitle,
  description,
  steps
}: StepSectionProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background" id={id}>
      <div className="container mx-auto px-8 py-20">
        <div className="w-full">
          {/* Header Section */}
          <div className="text-center mb-20">
            <div className="inline-block mb-4 sm:mb-6">
              <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-primary to-primary/60 rounded-full mx-auto"></div>
            </div>
            {subtitle && (
              <h3 className="text-base sm:text-lg font-semibold text-primary mb-3 sm:mb-4 uppercase tracking-wider">
                {subtitle}
              </h3>
            )}
            <h1 className="text-5xl font-bold text-foreground mb-6">
              {title}
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {description}
            </p>
          </div>

          {/* Steps with Connecting Arrows */}
          <div className="relative">
            {/* Steps */}
            <div className="space-y-32">
              {steps.map((step, index) => (
                <div key={index} className="relative">

                  {/* Step Content */}
                  <div className={`flex items-center gap-32 ${step.position === 'left' ? 'flex-row' : 'flex-row-reverse'}`}>
                    {/* Step Number */}
                    <div className="flex-shrink-0 text-center relative z-10">
                      <div className="text-sm font-semibold text-muted-foreground mb-2">STEP</div>
                      <div className="text-6xl font-bold text-primary">
                        {step.number}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-start gap-32">
                        {/* Text Content */}
                        <div className={`flex-1 ${step.position === 'left' ? 'order-1' : 'order-2'} max-w-xl`}>
                          <h3 className="text-5xl font-bold text-foreground mb-10 uppercase tracking-wide">
                            {step.title}
                          </h3>
                          <p className="text-muted-foreground text-2xl leading-relaxed">
                            {step.description}
                          </p>
                        </div>
                        
                        {/* Image */}
                        <div className={`${step.position === 'left' ? 'order-2' : 'order-1'} flex-shrink-0 ml-auto`}>
                          <Image
                            src={step.image}
                            alt={step.title}
                            width={400}
                            height={320}
                            className="object-cover"
                            priority
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}