import React from 'react';
import { MessageCircle, ChevronDown, Award, Wifi, BookOpen, HeadphonesIcon } from 'lucide-react';
import { getWhatsAppLink, trackWhatsAppClick } from '@/config/tracking';

const trustPoints = [
  { icon: Award, label: 'Certificate Included' },
  { icon: BookOpen, label: 'Practical Learning' },
  { icon: Wifi, label: 'Online Access' },
  { icon: HeadphonesIcon, label: 'Dedicated Support' },
];

const Hero: React.FC = () => {
  const handleWhatsApp = () => {
    trackWhatsAppClick('hero_primary');
    window.open(getWhatsAppLink("Hi Nexora! I'd like to start learning. Please share course details."), '_blank');
  };

  const handleExploreCourses = () => {
    const el = document.querySelector('#courses');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="nav-section relative min-h-screen flex items-center overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0F1A2E 0%, #1B3A6B 55%, #2C4F8C 100%)' }}
    >
      {/* Background texture dots */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 md:px-8 w-full py-24 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Copy */}
          <div className="order-2 md:order-1">
            {/* Eyebrow */}
            <div className="flex items-center gap-2 mb-6">
              <span className="text-xs font-semibold uppercase tracking-widest text-blue-300 border border-blue-400/30 bg-blue-400/10 px-3 py-1 rounded-full">
                Nexora Digital Academy
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight mb-6 text-balance">
              Learn Digital Skills.{' '}
              <span className="text-blue-400">Build Your Future.</span>
            </h1>

            <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-lg leading-relaxed">
              Practical, career-focused digital skills for students, beginners, and aspiring
              freelancers — all from the comfort of your home.
            </p>

            {/* Price badge */}
            <div className="inline-flex items-center gap-3 bg-white/10 border border-white/20 rounded-xl px-5 py-3 mb-8">
              <span className="text-2xl font-extrabold text-white">Rs. 300</span>
              <span className="text-blue-200 text-sm">Course Fee Only</span>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 mb-10">
              <button
                onClick={handleWhatsApp}
                className="whatsapp-btn flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-base transition-all duration-150 hover:scale-[1.02] active:scale-100 shadow-lg"
              >
                <MessageCircle className="w-5 h-5" />
                Start Learning — WhatsApp Us
              </button>
              <button
                onClick={handleExploreCourses}
                className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-base border border-white/40 text-white bg-white/5 hover:bg-white/10 transition-colors duration-150"
              >
                Explore Courses
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>

            {/* Trust points */}
            <div className="flex flex-wrap gap-4">
              {trustPoints.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 text-blue-100 text-sm">
                  <Icon className="w-4 h-4 text-blue-400 shrink-0" />
                  {label}
                </div>
              ))}
            </div>
          </div>

          {/* Right: Image */}
          <div className="order-1 md:order-2 flex justify-center">
            <div className="relative w-full max-w-md">
              {/* Decorative ring */}
              <div className="absolute -inset-4 rounded-2xl border border-blue-400/20 pointer-events-none" />
              <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-2xl border border-white/10">
                <img
                  src="https://miaoda-site-img.s3cdn.medo.dev/images/KLing_2e6312ac-933e-43af-a266-79c4cb0f631f.jpg"
                  alt="Student studying digital skills online with laptop"
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-xl px-4 py-3 flex items-center gap-3 border border-border">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center shrink-0">
                  <MessageCircle className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Enroll via</p>
                  <p className="text-sm font-bold text-foreground">WhatsApp</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <button
        onClick={handleExploreCourses}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-blue-300 animate-bounce"
        aria-label="Scroll down"
      >
        <ChevronDown className="w-6 h-6" />
      </button>
    </section>
  );
};

export default Hero;
