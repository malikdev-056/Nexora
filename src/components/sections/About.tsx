import React from 'react';
import { Target, Users, Lightbulb, TrendingUp, GraduationCap, Quote } from 'lucide-react';

const strengths = [
  {
    icon: Target,
    title: 'Practical & Focused',
    desc: 'Every course is built around real-world skills you can apply immediately — no fluff, no filler.',
  },
  {
    icon: Users,
    title: 'Beginner-Friendly',
    desc: 'Our courses are designed for students and beginners with zero prior experience required.',
  },
  {
    icon: Lightbulb,
    title: 'Career-Oriented',
    desc: 'From freelancing to digital marketing, every skill we teach opens doors to earning opportunities.',
  },
  {
    icon: TrendingUp,
    title: 'Affordable Access',
    desc: "World-class digital education at just Rs. 300 — because talent shouldn't be limited by budget.",
  },
];

const CEO_IMAGE =
  'https://miaoda-conversation-file.s3cdn.medo.dev/user-efbnmvrry41s/app-efbo4uy4w2dd/20260915/de6118f5-e452-4b8b-a784-17e2d4ffde13.jpg';

const About: React.FC = () => {
  return (
    <section id="about" className="nav-section bg-background py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 md:px-8">

        {/* ── Academy Intro ─────────────────────────────── */}
        <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
          {/* Left: Academy image */}
          <div className="relative">
            <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-card border border-border">
              <img
                src="https://miaoda-site-img.s3cdn.medo.dev/images/KLing_cb3414e2-c41c-4b3b-85cc-068dfdfe4137.jpg"
                alt="Online education certificate and achievement"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            {/* Stats badge */}
            <div className="absolute -bottom-6 -right-4 md:-right-8 bg-primary text-white rounded-xl shadow-xl px-5 py-4 border border-white/10">
              <p className="text-3xl font-extrabold text-white">8+</p>
              <p className="text-blue-200 text-sm font-medium">Digital Courses</p>
            </div>
          </div>

          {/* Right: Text */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">About Nexora</p>
            <div className="accent-rule" />
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-6 text-balance">
              Empowering Pakistan's Digital Generation
            </h2>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-6">
              Nexora Master Class is a digital academy dedicated to making quality skill education
              accessible to everyone. We believe in learning that creates results — practical courses
              that equip students, beginners, and aspiring freelancers with the tools they need to
              succeed in today's digital economy.
            </p>
            <p className="text-muted-foreground text-base leading-relaxed mb-10">
              Our approach is simple: real skills, real practice, real progress. Whether you're
              looking to start a freelancing career, grow a business online, or simply gain
              valuable digital knowledge — Nexora is your launchpad.
            </p>

            <h3 className="text-lg font-bold text-foreground mb-4">Why Nexora?</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {strengths.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex gap-3 p-4 bg-muted rounded-xl border border-border">
                  <div className="w-9 h-9 bg-accent/10 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                    <Icon className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">{title}</p>
                    <p className="text-muted-foreground text-xs mt-1 leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Meet the Founder / Tutor ─────────────────── */}
        <div className="border-t border-border pt-20">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">Meet Our Founder & Tutor</p>
            <div className="flex justify-center mb-4">
              <div className="w-12 h-0.5 bg-accent" />
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground text-balance">
              The Vision Behind Nexora
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-14 items-center">
            {/* Left: CEO photo */}
            <div className="relative flex justify-center">
              <div className="relative w-full max-w-sm">
                {/* Decorative frame */}
                <div className="absolute -inset-3 rounded-2xl border-2 border-accent/20 pointer-events-none" />
                <div className="aspect-square w-full overflow-hidden rounded-2xl shadow-hover border-2 border-border">
                  <img
                    src={CEO_IMAGE}
                    alt="Bint-e-Shakeela — CEO & Founder of Nexora Digital Academy"
                    className="w-full h-full object-cover object-top"
                    loading="lazy"
                  />
                </div>
                {/* Name plate */}
                <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap bg-primary text-white rounded-xl shadow-xl px-6 py-3 border border-white/10 flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-blue-300 shrink-0" />
                  <div className="text-center">
                    <p className="font-extrabold text-sm text-white leading-tight">Bint-e-Shakeela</p>
                    <p className="text-blue-200 text-xs font-medium">CEO &amp; Founder · Lead Tutor</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Bio */}
            <div className="pt-6 md:pt-0">
              <h3 className="text-2xl md:text-3xl font-extrabold text-foreground mb-2">
                Bint-e-Shakeela
              </h3>
              <p className="text-accent font-semibold text-sm uppercase tracking-wide mb-5">
                CEO &amp; Founder · Lead Tutor · Nexora Digital Academy
              </p>

              {/* Pull quote */}
              <div className="relative bg-muted border-l-4 border-accent rounded-r-xl px-6 py-5 mb-6">
                <Quote className="absolute top-3 right-4 w-8 h-8 text-accent/20" />
                <p className="text-foreground font-semibold text-base md:text-lg italic leading-relaxed text-pretty">
                  "We don't just teach skills — we build futures."
                </p>
              </div>

              <p className="text-muted-foreground text-base leading-relaxed mb-4 text-pretty">
                Bint-e-Shakeela is the CEO, Founder, and Lead Tutor of Nexora Digital Academy. Driven
                by a passion for accessible education, she built Nexora with one mission: to give
                every student — regardless of background or budget — the digital skills needed to
                thrive in today's economy.
              </p>
              <p className="text-muted-foreground text-base leading-relaxed mb-6 text-pretty">
                She personally teaches and guides students through Nexora's courses, ensuring every
                learner receives practical, hands-on training. Her motto: <span className="text-foreground font-medium">Discipline + Consistency = Success</span>.
              </p>

              {/* Credential tags */}
              <div className="flex flex-wrap gap-2">
                {['Digital Skills Expert', 'Lead Educator', 'Entrepreneur', 'Freelancing Coach', 'AI & Marketing'].map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-semibold bg-accent/10 text-accent border border-accent/20 px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;
