import React from 'react';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Ahmed Raza',
    course: 'Digital Marketing',
    text: 'Nexora\'s Digital Marketing course completely changed how I approach online business. The content is practical and easy to follow. Worth every rupee!',
    rating: 5,
    initials: 'AR',
  },
  {
    name: 'Fatima Khan',
    course: 'Freelancing Mastery',
    text: 'I was a complete beginner and had no idea how to start freelancing. After this course, I got my first client within weeks. Highly recommend Nexora!',
    rating: 5,
    initials: 'FK',
  },
  {
    name: 'Usman Ali',
    course: 'Video Editing',
    text: 'The video editing course is excellent for beginners. I learned industry tools and now take on small editing projects. Amazing value for Rs. 300.',
    rating: 5,
    initials: 'UA',
  },
  {
    name: 'Sara Mahmood',
    course: 'Content Writing',
    text: 'I enrolled for Content Writing and loved the structured approach. The instructor explains everything clearly. My writing improved dramatically.',
    rating: 5,
    initials: 'SM',
  },
];

const StarRating: React.FC<{ rating: number }> = ({ rating }) => (
  <div className="flex gap-1">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-border'}`}
      />
    ))}
  </div>
);

const Testimonials: React.FC = () => {
  return (
    <section className="navy-section py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-300 mb-3">Student Stories</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 text-balance">
            What Our Students Say
          </h2>
          <p className="text-blue-200 text-base md:text-lg max-w-xl mx-auto text-pretty">
            Real experiences from students who took the first step with Nexora.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t) => (
            <article
              key={t.name}
              className="bg-white/5 border border-white/10 rounded-xl p-6 flex flex-col hover:bg-white/10 transition-colors duration-200"
            >
              <Quote className="w-8 h-8 text-accent mb-4 shrink-0 opacity-70" />
              <p className="text-blue-100 text-sm leading-relaxed flex-1 mb-5 text-pretty">"{t.text}"</p>
              <div className="pt-4 border-t border-white/10">
                <StarRating rating={t.rating} />
                <div className="flex items-center gap-3 mt-3">
                  <div className="w-9 h-9 bg-accent rounded-full flex items-center justify-center shrink-0">
                    <span className="text-white text-xs font-bold">{t.initials}</span>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{t.name}</p>
                    <p className="text-blue-300 text-xs">{t.course}</p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
