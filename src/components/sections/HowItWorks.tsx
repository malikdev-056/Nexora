import React, { useState } from 'react';
import { MousePointer2, MessageCircle, FileText, CreditCard, GraduationCap, Download } from 'lucide-react';
import { getWhatsAppLink, trackWhatsAppClick } from '@/config/tracking';
import { lookupCertificateByStudentCode } from '@/lib/api';

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
  const [studentCode, setStudentCode] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [statusType, setStatusType] = useState<'success' | 'error' | ''>('');

  const handleWhatsApp = () => {
    trackWhatsAppClick('how_it_works');
    window.open(getWhatsAppLink("Hi Nexora! I'd like to enroll in a course. Please share the steps."), '_blank');
  };

  const handleCertificateLookup = async () => {
    const trimmedCode = studentCode.trim();
    if (!trimmedCode) {
      setStatusType('error');
      setStatusMessage('Please enter your student ID first.');
      return;
    }

    try {
      setStatusType('');
      setStatusMessage('Checking your certificate...');
      const result = await lookupCertificateByStudentCode(trimmedCode);

      const fileResponse = await fetch(result.fileUrl);
      if (!fileResponse.ok) {
        throw new Error('Certificate could not be downloaded right now.');
      }

      const blob = await fileResponse.blob();
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = result.fileName || `${result.studentCode}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);

      setStatusType('success');
      setStatusMessage(`Certificate found for ${result.studentName}. Download started.`);
    } catch (error) {
      setStatusType('error');
      setStatusMessage(error instanceof Error ? error.message : 'No certificate was found for this student ID.');
    }
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

        <div className="mt-8 max-w-xl mx-auto rounded-2xl border border-border bg-white p-5 shadow-card">
          <div className="mb-3 flex items-center gap-2 text-slate-900">
            <Download className="h-4 w-4 text-accent" />
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">Download Your Certificate</span>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              value={studentCode}
              onChange={(event) => setStudentCode(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  event.preventDefault();
                  void handleCertificateLookup();
                }
              }}
              placeholder="Enter your student ID"
              className="flex-1 rounded-lg border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none ring-0 focus:border-accent"
            />
            <button
              onClick={() => void handleCertificateLookup()}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
            >
              <Download className="h-4 w-4" />
              Download
            </button>
          </div>
          {statusMessage && (
            <p className={`mt-3 text-sm ${statusType === 'error' ? 'text-red-600' : 'text-emerald-600'}`}>
              {statusMessage}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
