import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Download, Menu, X, GraduationCap, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Courses', href: '#courses' },
  { label: 'Why Us', href: '#why-us' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
];

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCertificateScroll = () => {
    const el = document.querySelector('#how-it-works');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAdminLogin = () => {
    navigate('/admin/login');
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-primary shadow-md' : 'bg-primary/95 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Logo */}
          <button
            onClick={() => handleNavClick('#home')}
            className="flex items-center gap-2 shrink-0"
            aria-label="Nexora Master Class — Home"
          >
            <div className="w-8 h-8 bg-accent rounded-md flex items-center justify-center shrink-0">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="text-white font-bold text-lg leading-tight hidden sm:block">
              Nexora <span className="text-blue-300">Master Class</span>
            </span>
            <span className="text-white font-bold text-base leading-tight sm:hidden">Nexora</span>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6" aria-label="Main navigation">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.href)}
                className="text-blue-100 hover:text-white text-sm font-medium transition-colors hover:underline underline-offset-4 decoration-accent"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            <button
              onClick={handleAdminLogin}
              className="flex items-center gap-2 rounded-md border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/20"
            >
              <LogIn className="w-4 h-4" />
              Login
            </button>
            <button
              onClick={handleCertificateScroll}
              className="flex items-center gap-2 rounded-md bg-blue-400 px-4 py-2 text-sm font-semibold text-slate-950 transition-colors hover:bg-blue-300"
            >
              <Download className="w-4 h-4" />
              Download Your Certificate
            </button>
          </div>

          {/* Mobile menu */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden text-white hover:bg-white/10">
                <Menu className="w-6 h-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 bg-primary border-l border-white/10 p-0">
              <div className="flex items-center justify-between px-6 h-16 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 bg-accent rounded-md flex items-center justify-center">
                    <GraduationCap className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-white font-bold">Nexora</span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setMobileOpen(false)}
                  className="text-white hover:bg-white/10"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
              <nav className="flex flex-col px-4 py-4 gap-1" aria-label="Mobile navigation">
                {navItems.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => handleNavClick(item.href)}
                    className="text-left text-blue-100 hover:text-white hover:bg-white/10 px-4 py-3 rounded-md text-base font-medium transition-colors min-h-12 flex items-center"
                  >
                    {item.label}
                  </button>
                ))}
                <div className="pt-4 pb-2 space-y-2">
                  <button
                    onClick={() => { setMobileOpen(false); handleAdminLogin(); }}
                    className="w-full flex items-center justify-center gap-2 rounded-md border border-white/20 bg-white/10 px-4 py-3 font-semibold text-white transition-colors hover:bg-white/20"
                  >
                    <LogIn className="w-5 h-5" />
                    Login
                  </button>
                  <button
                    onClick={() => { setMobileOpen(false); handleCertificateScroll(); }}
                    className="w-full flex items-center justify-center gap-2 rounded-md bg-blue-400 px-4 py-3 font-semibold text-slate-950 transition-colors hover:bg-blue-300"
                  >
                    <Download className="w-5 h-5" />
                    Download Your Certificate
                  </button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
