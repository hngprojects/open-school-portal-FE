"use client";

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FAQItem: React.FC<{
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}> = ({ question, answer, isOpen, onToggle }) => {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-3 md:p-6 text-left hover:bg-gray-50 transition-colors"
      >
        <h3 className="text-lg font-semibold text-gray-900 pr-4">
          {question}
        </h3>
        <ChevronDown
          className={`w-6 h-6 text-gray-600 flex-shrink-0 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 pb-6 text-gray-600 leading-relaxed">
          {answer}
        </div>
      </div>
    </div>
  );
};

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "What is the open school portal",
      answer: "The Open School Portal is a comprehensive all-in-one school management system designed to streamline administrative tasks. It helps schools manage students, track attendance, process fees, generate reports, and integrate NFC smart ID cards for secure access and tracking. The platform centralizes all your school's operations in one easy-to-use interface."
    },
    {
      question: "Is there a cost to join waitlist",
      answer: "No, joining the waitlist is completely free! By signing up early, you'll get priority access when we launch and receive exclusive updates about new features. Early waitlist members may also qualify for special launch pricing and promotional offers once the platform goes live."
    },
    {
      question: "How does data security work",
      answer: "We take data security very seriously. Your school's data is protected with enterprise-grade encryption both in transit and at rest. We implement strict access controls, regular security audits, and comply with international data protection standards. All data is backed up regularly, and we maintain redundant systems to ensure your information is always safe and accessible."
    }
  ];

  const handleToggle = (index: number | null) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full container py-10 md:py-16 bg-white">
        <div className="w-full space-y-8">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
        Frequently Asked Questions
      </h2>
      <div className="flex flex-col gap-4">
        {faqs.map((faq, index) => (
          <FAQItem
            key={index}
            question={faq.question}
            answer={faq.answer}
            isOpen={openIndex === index}
            onToggle={() => handleToggle(index)}
          />
        ))}
      </div>
        </div>
    </div>
  );
}