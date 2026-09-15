import React, { useState } from 'react';
import { MessageCircle, Phone, Facebook, Instagram, Youtube, Send } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { getWhatsAppLink, trackWhatsAppClick, SOCIAL_LINKS } from '@/config/tracking';

// TikTok icon since lucide-react doesn't have one
const TikTokIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.78a4.85 4.85 0 01-1.01-.09z" />
  </svg>
);

interface FormData {
  name: string;
  email: string;
  message: string;
}

const Contact: React.FC = () => {
  const [form, setForm] = useState<FormData>({ name: '', email: '', message: '' });
  const [submitting, setSubmitting] = useState(false);

  const handleWhatsApp = () => {
    trackWhatsAppClick('contact_section');
    window.open(getWhatsAppLink('Hi Nexora! I have a question about your courses.'), '_blank');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const sanitize = (str: string) => str.replace(/[<>&"']/g, '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const name = sanitize(form.name.trim());
    const email = sanitize(form.email.trim());
    const message = sanitize(form.message.trim());

    if (!name || !email || !message) {
      toast.error('Please fill in all fields.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error('Please enter a valid email address.');
      return;
    }

    setSubmitting(true);
    // Send via WhatsApp as fallback — no backend required
    const waMsg = `Hi Nexora! I'm ${name} (${email}).\n\n${message}`;
    setTimeout(() => {
      setSubmitting(false);
      setForm({ name: '', email: '', message: '' });
      toast.success('Redirecting you to WhatsApp to send your message!');
      window.open(getWhatsAppLink(waMsg), '_blank');
    }, 600);
  };

  return (
    <section id="contact" className="nav-section bg-background py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">Get in Touch</p>
          <div className="flex justify-center mb-4">
            <div className="w-12 h-0.5 bg-accent" />
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4 text-balance">
            Contact Nexora Master Class
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto text-pretty">
            Ready to start learning? Reach out on WhatsApp for the fastest response.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left: WhatsApp Primary CTA + info */}
          <div>
            {/* WhatsApp CTA */}
            <div className="bg-primary rounded-2xl p-8 text-white mb-6 border border-white/10">
              <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center mb-5">
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Chat with us on WhatsApp</h3>
              <p className="text-blue-200 text-sm mb-6 leading-relaxed">
                The fastest way to get course details, admission info, or any answer you need.
                We're available to help you start your learning journey!
              </p>
              <button
                onClick={handleWhatsApp}
                className="whatsapp-btn w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl font-bold text-lg transition-colors duration-150 hover:opacity-90"
              >
                <MessageCircle className="w-6 h-6" />
                +92 349 8589564 — Chat Now
              </button>
            </div>

            {/* Phone number for copy */}
            <div className="flex items-center gap-4 p-4 bg-muted rounded-xl border border-border mb-6">
              <Phone className="w-5 h-5 text-accent shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide font-semibold">WhatsApp / Phone</p>
                <a
                  href="tel:+923498589564"
                  className="text-foreground font-semibold text-base hover:text-accent transition-colors select-all"
                >
                  +92 349 8589564
                </a>
              </div>
            </div>

            {/* Social links */}
            <div className="p-5 bg-muted rounded-xl border border-border">
              <p className="text-sm font-semibold text-foreground mb-4">Follow Nexora</p>
              <div className="flex gap-3 flex-wrap">
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
                    className="w-10 h-10 bg-primary text-white rounded-lg flex items-center justify-center hover:bg-accent transition-colors duration-150"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Optional contact form */}
          <div className="bg-card border border-border rounded-2xl p-8 shadow-card">
            <h3 className="text-lg font-bold text-foreground mb-1">Send a Message</h3>
            <p className="text-muted-foreground text-sm mb-6">
              Fill the form and we'll connect via WhatsApp.
            </p>
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <div>
                <Label htmlFor="contact-name" className="text-sm font-medium">
                  Your Name
                </Label>
                <Input
                  id="contact-name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="e.g. Ahmed Khan"
                  className="mt-1.5 px-3"
                  maxLength={80}
                  required
                />
              </div>
              <div>
                <Label htmlFor="contact-email" className="text-sm font-medium">
                  Email Address
                </Label>
                <Input
                  id="contact-email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="mt-1.5 px-3"
                  maxLength={120}
                  required
                />
              </div>
              <div>
                <Label htmlFor="contact-message" className="text-sm font-medium">
                  Message
                </Label>
                <Textarea
                  id="contact-message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell us which course you're interested in..."
                  className="mt-1.5 px-3 resize-none min-h-[120px]"
                  maxLength={500}
                  required
                />
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-accent text-white flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold text-base transition-all duration-150 hover:opacity-90 disabled:opacity-60"
              >
                <Send className="w-4 h-4" />
                {submitting ? 'Sending…' : 'Send via WhatsApp'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
