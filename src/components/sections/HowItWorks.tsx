import React from 'react';
import { MousePointer2, MessageCircle, FileText, CreditCard, GraduationCap } from 'lucide-react';
import { getWhatsAppLink, trackWhatsAppClick } from '@/config/tracking';

const steps = [
  {
    num: '01',
    icon: MousePointer2,
    title: 'Choose Your Course',
    desc: 'Browse our 8 digital skill courses and pick the one that matches your goals.',
  },
  {
    num: '02',
    icon: MessageCircle,
    title: 'Message Us on WhatsApp',
    desc: 'Send us a quick message on WhatsApp with the course name you\'re interested in.',
  },
  {
    num: '03',
    icon: FileText,
    title: 'Receive Full Course Details',
    desc: 'We\'ll send you all the course information, schedule, and admission instructions.',
  },
  {
    num: '04',
    icon: CreditCard,
    title: 'Complete Admission & Payment',
    desc: 'Follow our simple admission process and complete payment as per academy instructions.',
  },
  {
    num: '05',
    icon: GraduationCap,
    title: 'Start Learning!',
    desc: 'Begin your course, complete it at your pace, and earn your certificate.',
  },
];

const HowItWorks: React.FC = () => {
  const handleWhatsApp = () => {
    trackWhatsAppClick('how_it_works');
    window.open(getWhatsAppLink("Hi Nexora! I'd like to enroll in a course. Please share the steps."), '_blank');
  };

  return (
    <section id="how-it-works" className="nav-section bg-background py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">The Process</p>
          <div className="flex justify-center mb-4">
            <div className="w-12 h-0.5 bg-accent" />
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4 text-balance">
            How to Get Started
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto text-pretty">
            Enrolling at Nexora is simple — just 5 easy steps.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connector line — desktop */}
          <div className="hidden lg:block absolute top-10 left-0 right-0 h-0.5 bg-border mx-24" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-8">
            {steps.map(({ num, icon: Icon, title, desc }) => (
              <div key={num} className="flex flex-col items-center text-center relative">
                {/* Step circle */}
                <div className="w-20 h-20 bg-primary rounded-full flex flex-col items-center justify-center mb-5 shadow-card border-4 border-background relative z-10 shrink-0">
                  <Icon className="w-7 h-7 text-white" />
                  <span className="text-[10px] font-bold text-blue-200 mt-0.5">{num}</span>
                </div>
                <h3 className="font-bold text-foreground text-sm md:text-base mb-2">{title}</h3>
                <p className="text-muted-foreground text-xs md:text-sm leading-relaxed text-pretty">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-14 text-center">
          <button
            onClick={handleWhatsApp}
            className="whatsapp-btn inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-lg transition-colors duration-150 shadow-lg hover:scale-[1.02] active:scale-100"
          >
            <MessageCircle className="w-6 h-6" />
            Start Your Enrollment — WhatsApp Us Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
