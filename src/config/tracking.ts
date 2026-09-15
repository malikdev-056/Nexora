// Nexora Master Class — centralized tracking & contact config
// Swap these values without touching component code

export const WHATSAPP_NUMBER = '923498589564';
export const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}`;

export function getWhatsAppLink(message?: string) {
  if (message) {
    return `${WHATSAPP_LINK}?text=${encodeURIComponent(message)}`;
  }
  return WHATSAPP_LINK;
}

// Meta Pixel — set META_PIXEL_ID in .env.local as VITE_META_PIXEL_ID
export const META_PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID as string | undefined;

// Event tracking helpers (no-op when pixel not configured)
export function trackWhatsAppClick(source: string) {
  if (typeof window !== 'undefined' && (window as any).fbq && META_PIXEL_ID) {
    (window as any).fbq('trackCustom', 'WhatsAppClick', { source });
  }
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'whatsapp_click', { event_category: 'CTA', event_label: source });
  }
}

export function trackCourseClick(courseName: string) {
  if (typeof window !== 'undefined' && (window as any).fbq && META_PIXEL_ID) {
    (window as any).fbq('trackCustom', 'CourseDetailClick', { course: courseName });
  }
}

// Official Nexora social media links
export const SOCIAL_LINKS = {
  facebook: 'https://www.facebook.com/profile.php?id=61591522950362',
  instagram: 'https://www.instagram.com/learn.nexora/?hl=en',
  youtube: 'https://www.youtube.com/',
  tiktok: 'https://www.tiktok.com/',
};
