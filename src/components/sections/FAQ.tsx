import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    q: 'What courses does Nexora offer?',
    a: 'Nexora Master Class offers 8 practical digital skill courses: Digital Marketing, AI Skills, Shopify & E-commerce, Video Editing, Content Writing, Freelancing Mastery, English for Freelancers, and Basic Designing. All courses are designed for beginners and students.',
  },
  {
    q: 'What is the course fee?',
    a: 'Each course is priced at Rs. 300 only. This is the full fee for the complete course — no hidden charges or extra costs.',
  },
  {
    q: 'How can I enroll?',
    a: 'Enrollment is simple! Click any "Chat on WhatsApp" button on this page to message us directly at +92 349 8589564. We\'ll send you complete admission instructions and course details.',
  },
  {
    q: 'Are classes online?',
    a: 'Yes! All Nexora courses are fully online, so you can learn from home at a time that suits you. You just need a smartphone or laptop and an internet connection.',
  },
  {
    q: 'Will I receive a certificate after completing a course?',
    a: 'Yes, students receive a certificate upon successful completion of their course. Certificate details will be provided during the enrollment process.',
  },
  {
    q: 'Can beginners join Nexora courses?',
    a: 'Absolutely! Our courses are designed with beginners in mind. No prior experience is required for any of our courses — just a willingness to learn.',
  },
  {
    q: 'How do I get complete course details?',
    a: 'Click any "Get Details on WhatsApp" or "Chat on WhatsApp" button on this page to message our team. We\'ll share the full course outline, schedule, and all relevant information within no time.',
  },
  {
    q: 'Is there any support available during the course?',
    a: 'Yes! Nexora provides guidance and support throughout your learning journey. You can reach out via WhatsApp whenever you have questions.',
  },
];

const FAQ: React.FC = () => {
  return (
    <section id="faq" className="nav-section bg-muted py-20 md:py-28">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">FAQ</p>
          <div className="flex justify-center mb-4">
            <div className="w-12 h-0.5 bg-accent" />
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4 text-balance">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground text-base md:text-lg text-pretty">
            Everything you need to know about Nexora Master Class.
          </p>
        </div>

        {/* Accordion */}
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-card border border-border rounded-xl overflow-hidden shadow-card px-2"
            >
              <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline px-4 py-4 text-sm md:text-base">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4 text-muted-foreground text-sm md:text-base leading-relaxed">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;
