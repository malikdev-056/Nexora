import React from 'react';
import { DollarSign, Laptop, Award, Home, MessageSquare, BookMarked } from 'lucide-react';

const reasons = [
  {
    icon: DollarSign,
    title: 'Affordable at Rs. 300',
    desc: 'Quality digital education at just Rs. 300 per course — no hidden fees, no expensive equipment.',
    highlight: true,
  },
  {
    icon: Laptop,
    title: 'Practical Skill-Focused',
    desc: 'Every course is built around real tasks and projects — you learn by doing, not just watching.',
    highlight: false,
  },
  {
    icon: Award,
    title: 'Course Certificate',
    desc: 'Earn a certificate upon course completion to showcase your new skills to clients and employers.',
    highlight: false,
  },
  {
    icon: Home,
    title: 'Learn From Home',
    desc: 'All courses are fully online — study on your schedule, from any device, from anywhere.',
    highlight: false,
  },
  {
    icon: MessageSquare,
    title: 'Ongoing Support',
    desc: 'Get guidance and support throughout your learning journey — you\'re never alone.',
    highlight: false,
  },
  {
    icon: BookMarked,
    title: 'Multiple Skills, One Academy',
    desc: 'Marketing, AI, design, writing, freelancing — everything in one place for a complete digital career.',
    highlight: false,
  },
];

const WhyChooseUs: React.FC = () => {
  return (
    <section id="why-us" className="nav-section navy-section py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-300 mb-3">Why Choose Nexora</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 text-balance">
            Everything You Need to Succeed
          </h2>
          <p className="text-blue-200 text-base md:text-lg max-w-2xl mx-auto text-pretty">
            We've built Nexora around the needs of students and aspiring freelancers in Pakistan —
            affordable, practical, and fully accessible from home.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map(({ icon: Icon, title, desc, highlight }) => (
            <div
              key={title}
              className={`rounded-xl p-6 border transition-all duration-200 ${
                highlight
                  ? 'bg-accent border-accent/40 shadow-lg'
                  : 'bg-white/5 border-white/10 hover:bg-white/10'
              }`}
            >
              <div className={`w-11 h-11 rounded-lg flex items-center justify-center mb-4 ${
                highlight ? 'bg-white/20' : 'bg-white/10'
              }`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-white text-base mb-2">{title}</h3>
              <p className="text-blue-200 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
