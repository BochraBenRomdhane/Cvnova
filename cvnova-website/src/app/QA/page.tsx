"use client";

import { useState } from "react";
import Image from "next/image";

export default function QA() {
  const prefix = process.env.NODE_ENV === 'production' ? '/Cvnova/' : '/';
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const qaData = [
    {
      question: "Why should I choose your services?",
      answer: "Because I focus on quality over time, clarity, and customization. Every CV, profile, or website is tailored to your goals."
    },
    {
      question: "How long does it take to deliver?",
      answer: "CVs and LinkedIn profiles usually take 2–3 business days. Websites and apps depend on the project scope."
    },
    {
      question: "Can I request edits?",
      answer: "Absolutely! Revisions are part of the process—I want you to be 100% satisfied."
    },
    {
      question: "Do you offer package deals?",
      answer: "Yes! If you'd like both a CV and LinkedIn optimization—or a website plus mobile app—I can create a bundle for you."
    }
  ];

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen" id="QA">
      {/* Header Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20">
        <div className="text-center">
          <div className="inline-block mb-4 sm:mb-6">
            <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-primary to-primary/60 rounded-full mx-auto"></div>
          </div>
          <h3 className="text-base sm:text-lg font-semibold text-primary mb-3 sm:mb-4 uppercase tracking-wider">
            Questions & Answers
          </h3>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-3 sm:mb-4 leading-tight">
            Got Questions?<br />
            We Have Answers.
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground mb-4 sm:mb-6">
            Everything you need to know about our services
          </p>
        </div>
      </div>

      {/* Q&A Content */}
      <div className="pt-12 pb-16 bg-gradient-to-br from-background to-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Questions on the left */}
            <div className="space-y-4">
              {qaData.map((item, index) => (
                <div key={index} className="bg-background/50 backdrop-blur-sm rounded-2xl shadow-sm border border-border/20 hover:shadow-md transition-all duration-200">
                  <button
                    onClick={() => toggleQuestion(index)}
                    className="w-full p-6 text-left flex items-center justify-between"
                  >
                    <h3 className="text-lg font-semibold text-foreground pr-4">
                      {item.question}
                    </h3>
                    <div className="flex-shrink-0">
                      <svg
                        className={`w-5 h-5 text-primary transition-transform duration-200 ${
                          openIndex === index ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>
                  {openIndex === index && (
                    <div className="px-6 pb-6">
                      <p className="text-muted-foreground leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Image on the right */}
            <div className="flex justify-center lg:justify-center">
              <Image
                src={`${prefix}qa.png`}
                alt="Q&A about our services"
                width={800}
                height={700}
                className="w-full max-w-2xl h-auto rounded-lg"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
