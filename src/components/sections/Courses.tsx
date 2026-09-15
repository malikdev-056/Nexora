import React from 'react';
import { MessageCircle, TrendingUp, Brain, ShoppingBag, Video, PenTool, Globe2, BookOpen, Palette } from 'lucide-react';
import { getWhatsAppLink, trackCourseClick, trackWhatsAppClick } from '@/config/tracking';

interface Course {
  id: string;
  icon: React.ElementType;
  title: string;
  description: string;
  image: string;
  tag: string;
}

const courses: Course[] = [
  {
    id: 'digital-marketing',
    icon: TrendingUp,
    title: 'Digital Marketing',
    description: 'Master SEO, social media marketing, content strategy, and paid ads to grow any brand online.',
    image: 'https://miaoda-site-img.s3cdn.medo.dev/images/KLing_b9a184d6-6672-4362-80e8-f9dddfa86454.jpg',
    tag: 'Most Popular',
  },
  {
    id: 'ai-skills',
    icon: Brain,
    title: 'AI Skills',
    description: 'Harness the power of AI tools for productivity, content creation, and modern workflows.',
    image: 'https://miaoda-site-img.s3cdn.medo.dev/images/KLing_bafedb74-6254-491e-ae1c-ffb94ce1f927.jpg',
    tag: 'Trending',
  },
  {
    id: 'shopify-ecommerce',
    icon: ShoppingBag,
    title: 'Shopify & E-commerce',
    description: 'Build and scale your own online store — from product setup to marketing and sales.',
    image: 'https://miaoda-site-img.s3cdn.medo.dev/images/KLing_a31608b4-82e5-4189-84d9-4d6bfdb6d10d.jpg',
    tag: 'Business',
  },
  {
    id: 'video-editing',
    icon: Video,
    title: 'Video Editing',
    description: 'Create compelling videos for YouTube, social media, and client projects using professional tools.',
    image: 'https://miaoda-site-img.s3cdn.medo.dev/images/KLing_56d3b256-993e-4e7f-915d-30c4740aace2.jpg',
    tag: 'Creative',
  },
  {
    id: 'content-writing',
    icon: PenTool,
    title: 'Content Writing',
    description: 'Write persuasive blogs, social media copy, and website content that attracts and converts.',
    image: 'https://miaoda-site-img.s3cdn.medo.dev/images/KLing_081ba690-c717-45d1-b2f2-454f86ee94ac.jpg',
    tag: 'Freelance Ready',
  },
  {
    id: 'freelancing-mastery',
    icon: Globe2,
    title: 'Freelancing Mastery',
    description: 'Launch your freelance career on Fiverr, Upwork and beyond — proposals, profiles, and payments.',
    image: 'https://miaoda-site-img.s3cdn.medo.dev/images/KLing_081ba690-c717-45d1-b2f2-454f86ee94ac.jpg',
    tag: 'Earn Online',
  },
  {
    id: 'english-mastery',
    icon: BookOpen,
    title: 'English for Freelancers',
    description: 'Build professional English communication skills to win and retain international clients.',
    image: 'https://miaoda-site-img.s3cdn.medo.dev/images/KLing_d09772c4-3f8b-4a4f-bfc7-8adfcff84824.jpg',
    tag: 'Essential',
  },
  {
    id: 'basic-designing',
    icon: Palette,
    title: 'Basic Designing',
    description: 'Learn graphic design fundamentals — logos, social posts, and brand visuals using Canva and more.',
    image: 'https://miaoda-site-img.s3cdn.medo.dev/images/KLing_71a52048-9ed2-472b-ad91-421540981a26.jpg',
    tag: 'Beginner',
  },
];

const CourseCard: React.FC<{ course: Course }> = ({ course }) => {
  const { icon: Icon } = course;

  const handleClick = () => {
    trackCourseClick(course.title);
    trackWhatsAppClick(`course_card_${course.id}`);
    window.open(
      getWhatsAppLink(`Hi Nexora! I'm interested in the "${course.title}" course. Please share details.`),
      '_blank'
    );
  };

  return (
    <article className="bg-card border border-border rounded-xl overflow-hidden shadow-card hover:shadow-hover transition-shadow duration-200 flex flex-col h-full group">
      <div className="aspect-[16/9] w-full overflow-hidden relative">
        <img
          src={course.image}
          alt={`${course.title} course`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        <span className="absolute top-3 left-3 text-xs font-semibold bg-primary text-white px-2.5 py-1 rounded-full">
          {course.tag}
        </span>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-9 h-9 bg-accent/10 rounded-lg flex items-center justify-center shrink-0">
            <Icon className="w-5 h-5 text-accent" />
          </div>
          <h3 className="font-bold text-foreground text-base">{course.title}</h3>
        </div>
        <p className="text-muted-foreground text-sm leading-relaxed flex-1 mb-4">{course.description}</p>
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-border">
          <span className="text-sm font-semibold text-foreground">Rs. <span className="text-accent text-base font-extrabold">300</span></span>
          <button
            onClick={handleClick}
            className="whatsapp-btn flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold transition-colors duration-150"
            aria-label={`Get details about ${course.title} on WhatsApp`}
          >
            <MessageCircle className="w-4 h-4" />
            Get Details
          </button>
        </div>
      </div>
    </article>
  );
};

const Courses: React.FC = () => {
  return (
    <section id="courses" className="nav-section bg-muted py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">Our Curriculum</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4 text-balance">
            8 Career-Ready Digital Courses
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto text-pretty">
            Each course is crafted to give you practical, job-ready skills — all at an unbeatable price of Rs. 300.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">Not sure which course to pick? We'll help you choose.</p>
          <a
            href={getWhatsAppLink("Hi Nexora! I need help choosing the right course. Can you guide me?")}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick('courses_bottom')}
            className="whatsapp-btn inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-base transition-colors duration-150"
          >
            <MessageCircle className="w-5 h-5" />
            Chat on WhatsApp — We'll Guide You
          </a>
        </div>
      </div>
    </section>
  );
};

export default Courses;
