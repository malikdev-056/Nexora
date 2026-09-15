import React from 'react';
import { MessageCircle, GraduationCap, Facebook, Instagram, Youtube } from 'lucide-react';
import { getWhatsAppLink, trackWhatsAppClick, SOCIAL_LINKS } from '@/config/tracking';

const TikTokIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.78a4.85 4.85 0 01-1.01-.09z" />
  </svg>
);

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Courses', href: '#courses' },
  { label: 'Why Us', href: '#why-us' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
];

const Footer: React.FC = () => {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleWhatsApp = () => {
    trackWhatsAppClick('footer');
    window.open(getWhatsAppLink('Hi Nexora! I want to learn more about your courses.'), '_blank');
  };

  return (
    <footer className="navy-section border-t border-white/10">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-accent rounded-md flex items-center justify-center shrink-0">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-white font-bold text-base leading-tight">Nexora Master Class</p>
                <p className="text-blue-300 text-xs">Digital Academy</p>
              </div>
            </div>
            <p className="text-blue-200 text-sm leading-relaxed max-w-xs mb-6 text-pretty">
              Empowering students and aspiring freelancers with practical digital skills —
              affordable, accessible, and career-focused.
            </p>
            {/* Social */}
            <div className="flex gap-2.5 flex-wrap">
              {[
                { href: SOCIAL_LINKS.facebook, Icon: Facebook, label: 'Facebook' },
                { href: SOCIAL_LINKS.instagram, Icon: Instagram, label: 'Instagram' },
                { href: SOCIAL_LINKS.youtube, Icon: Youtube, label: 'YouTube' },
                { href: SOCIAL_LINKS.tiktok, Icon: TikTokIcon, label: 'TikTok' },
              ].map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 bg-white/10 hover:bg-accent text-white rounded-lg flex items-center justify-center transition-colors duration-150"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-5">Quick Links</h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="text-blue-200 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-5">Contact Us</h4>
            <p className="text-blue-200 text-sm mb-4 leading-relaxed">
              The fastest way to reach us is via WhatsApp. We're ready to help!
            </p>
            <button
              onClick={handleWhatsApp}
              className="whatsapp-btn flex items-center gap-2 px-4 py-2.5 rounded-lg font-semibold text-sm transition-colors duration-150 mb-4"
            >
              <MessageCircle className="w-4 h-4" />
              +92 349 8589564
            </button>
            <div className="space-y-2 text-sm text-blue-300">
              <a
                href="https://wa.me/923498589564"
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:text-white transition-colors"
              >
                wa.me/923498589564
              </a>
            </div>

            <div className="mt-6 pt-5 border-t border-white/10">
              <div className="flex gap-3 text-xs text-blue-400 flex-wrap">
                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                <span>·</span>
                <a href="#" className="hover:text-white transition-colors">Terms &amp; Conditions</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-blue-300">
          <span>© 2026 Nexora Master Class. All rights reserved.</span>
          <span className="text-blue-400">Nexora Digital Academy — Practical Skills, Real Careers.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
