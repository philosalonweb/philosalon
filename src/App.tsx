/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'motion/react';
import {
  X,
  Minus,
  Maximize2,
  CheckCircle2,
  Star,
  Quote,
  ChevronLeft,
  ChevronRight,
  MessageSquare,
  MessageCircle,
  MapPin,
  Sparkles,
  Send,
} from 'lucide-react';
import AboutPage from './AboutPage.tsx';
import ServicesPage from './ServicesPage.tsx';
import ContactPage from './ContactPage.tsx';
import LocationPage from './LocationPage.tsx';
import GalleryPage from './GalleryPage.tsx';
import Footer from './components/Footer.tsx';
import LoadingScreen from './components/LoadingScreen.tsx';

// Client Reviews Data Types & Initial Dataset
interface ClientReviewItem {
  id: string;
  name: string;
  rating: number;
  date: string;
  category: 'all' | 'hair' | 'color' | 'keratin' | 'bridal' | 'grooming';
  service: string;
  branch: string;
  text: string;
  verified: boolean;
  avatarColor: string;
}

const REVIEW_CATEGORIES = [
  { id: 'all', label: 'All Reviews' },
  { id: 'color', label: 'Balayage & Color' },
  { id: 'hair', label: 'Hair & Styling' },
  { id: 'keratin', label: 'Keratin & Treatments' },
  { id: 'bridal', label: 'Bridal & Editorial' },
  { id: 'grooming', label: "Men's Grooming" },
];

const INITIAL_REVIEWS: ClientReviewItem[] = [
  {
    id: 'rev-1',
    name: 'Riya Sen Sharma',
    rating: 5,
    date: '3 days ago',
    category: 'color',
    service: 'French Balayage & Olaplex Infusion',
    branch: 'Lake Town Branch',
    text: 'Philoman Lepcha and his team are true hair artists! I came in with stubborn brassy tones, and they gave me the smoothest ash-blonde balayage gradient without compromising hair health. The salon ambiance is serene and genuinely luxury.',
    verified: true,
    avatarColor: 'from-[#83453B] to-[#5C2620]',
  },
  {
    id: 'rev-2',
    name: 'Dr. Ananya Mukherjee',
    rating: 5,
    date: '1 week ago',
    category: 'bridal',
    service: 'Bridal Reception Glam & Styling',
    branch: 'H.B. Town Branch',
    text: 'For my wedding reception, I wanted an elegant contemporary updo that would stay flawless throughout the evening. PHILO exceeded every expectation. Their care, precision, and calming hospitality made my special day stress-free!',
    verified: true,
    avatarColor: 'from-[#6E2A23] to-[#421511]',
  },
  {
    id: 'rev-3',
    name: 'Debayan Chakraborty',
    rating: 5,
    date: '2 weeks ago',
    category: 'grooming',
    service: "Master Precision Fade & Beard Sculpting",
    branch: 'Sodepur Branch',
    text: "Undoubtedly the finest men's styling studio in Kolkata. The stylists spend dedicated time analyzing your face shape and hair texture before touching a pair of shears. Incredible craftsmanship and hygiene.",
    verified: true,
    avatarColor: 'from-[#9A554A] to-[#612B26]',
  },
  {
    id: 'rev-4',
    name: 'Poulomi Roy',
    rating: 5,
    date: '2 weeks ago',
    category: 'keratin',
    service: 'Philo Signature Keratin Therapy',
    branch: 'Lake Town Branch',
    text: 'My hair had lost all life after severe heat damage. The Philo Signature Keratin restored the glass-like shine, zero frizz, and natural bounce. Two months in and it still feels silk soft every morning!',
    verified: true,
    avatarColor: 'from-[#83453B] to-[#4A1D18]',
  },
  {
    id: 'rev-5',
    name: 'Sourav Das',
    rating: 5,
    date: '3 weeks ago',
    category: 'hair',
    service: 'Scalp Detox & Deep Conditioning Spa',
    branch: 'H.B. Town Branch',
    text: 'The ultimate sanctuary after an exhausting work week. The head massage during the spa was pure therapeutic relaxation. Spotless aesthetic interiors and warm staff who truly listen to what you want.',
    verified: true,
    avatarColor: 'from-[#5C2620] to-[#340B07]',
  },
  {
    id: 'rev-6',
    name: 'Sneha Banik',
    rating: 5,
    date: '1 month ago',
    category: 'color',
    service: 'Caramel Melt Highlights & Blowout',
    branch: 'Sodepur Branch',
    text: 'I traveled an hour specifically to visit Philo after seeing their client portfolio online, and it was worth every single minute. The color transition is seamless and looks gorgeous in natural sunlight.',
    verified: true,
    avatarColor: 'from-[#9A554A] to-[#70322A]',
  },
  {
    id: 'rev-7',
    name: 'Rituparna Sengupta',
    rating: 5,
    date: '1 month ago',
    category: 'bridal',
    service: 'Editorial Hair Setting & Glow Care',
    branch: 'Lake Town Branch',
    text: 'The attention to detail is remarkable. From the consultation coffee to the final mirror reveal, Philo represents the highest caliber of salon excellence in Bengal. Truly unmatched aesthetic.',
    verified: true,
    avatarColor: 'from-[#83453B] to-[#5C2620]',
  },
  {
    id: 'rev-8',
    name: 'Tanmay Bhattacharya',
    rating: 5,
    date: '1 month ago',
    category: 'hair',
    service: 'Textured Crop & Scalp Revitalization',
    branch: 'Sodepur Branch',
    text: 'Been coming to Philo since their opening in 2022. Consistent 5-star standard every single visit. Philoman is a mentor and perfectionist who sets the bar high.',
    verified: true,
    avatarColor: 'from-[#6E2A23] to-[#421511]',
  },
];

// Premium luxury easing curve
const luxuryEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Animated number counter with smooth easing on scroll into view
function AnimatedCounter({
  target,
  suffix = '',
  duration = 2,
}: {
  target: number;
  suffix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-20px' });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    let animationFrameId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = (timestamp - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);

      // Ultra-smooth ease-out quartic deceleration
      const easeOut = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOut * target));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isInView, target, duration]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export const BRANCHES = [
  {
    id: 'Parthopur',
    name: 'Parthopur',
    whatsapp: '629061165',
    waNumber: '91629061165',
    displayNumber: '+91 62906 1165',
    area: 'Sodepur / Parthapur Bazar',
    mapUrl: 'https://share.google/C5GLlMjhqQq68LQHa',
  },
  {
    id: 'HB Town',
    name: 'HB Town',
    whatsapp: '7980357947',
    waNumber: '917980357947',
    displayNumber: '+91 79803 57947',
    area: 'HB Town, Sodepur',
    mapUrl: 'https://share.google/rzHiqrkQwLBx2vWac',
  },
  {
    id: 'Lake Town',
    name: 'Lake Town',
    whatsapp: '9330362726',
    waNumber: '919330362726',
    displayNumber: '+91 93303 62726',
    area: 'Lake Town, Kolkata',
    mapUrl: 'https://share.google/gBbfodRWdq0IBkZCj',
  },
];

export default function App() {
  // Loading screen state
  const [isLoading, setIsLoading] = useState(true);

  // Navigation / Page state: Strictly starts from 'home' as requested
  const [currentPage, setCurrentPage] = useState<'home' | 'about' | 'contact' | 'location' | 'gallery' | 'services'>('home');

  // Modal & Minimize state
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedBranch, setSubmittedBranch] = useState(BRANCHES[2]);
  const [submittedWaUrl, setSubmittedWaUrl] = useState('');

  // Form state (default location: Lake Town)
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    location: 'Lake Town',
    service: '',
  });

  // Client Reviews state
  const [reviews, setReviews] = useState<ClientReviewItem[]>(INITIAL_REVIEWS);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [reviewPage, setReviewPage] = useState(0);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewToast, setReviewToast] = useState<string | null>(null);

  // New review modal form
  const [newReviewForm, setNewReviewForm] = useState({
    name: '',
    rating: 5,
    branch: 'Lake Town Branch',
    service: 'Hair Styling & Transformation',
    text: '',
  });

  const filteredReviews = reviews.filter((rev) => {
    if (selectedCategory === 'all') return true;
    return rev.category === selectedCategory;
  });

  const itemsPerPage = 3;
  const totalPages = Math.max(1, Math.ceil(filteredReviews.length / itemsPerPage));

  const handleNextReviewPage = () => {
    setReviewPage((prev) => (prev + 1) % totalPages);
  };

  const handlePrevReviewPage = () => {
    setReviewPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewForm.name.trim() || !newReviewForm.text.trim()) return;

    const brandColors = [
      'from-[#83453B] to-[#5C2620]',
      'from-[#6E2A23] to-[#421511]',
      'from-[#9A554A] to-[#612B26]',
    ];

    const createdReview: ClientReviewItem = {
      id: `rev-${Date.now()}`,
      name: newReviewForm.name.trim(),
      rating: newReviewForm.rating,
      date: 'Just now',
      category: 'hair',
      service: newReviewForm.service.trim() || 'Hair Styling',
      branch: newReviewForm.branch,
      text: newReviewForm.text.trim(),
      verified: true,
      avatarColor: brandColors[Math.floor(Math.random() * brandColors.length)],
    };

    setReviews((prev) => [createdReview, ...prev]);
    setIsReviewModalOpen(false);
    setNewReviewForm({
      name: '',
      rating: 5,
      branch: 'Lake Town Branch',
      service: 'Hair Styling & Transformation',
      text: '',
    });
    setReviewToast('Thank you! Your verified client review has been published.');
    setTimeout(() => setReviewToast(null), 4500);
  };

  // Ensure the web strictly starts from home on fresh entry / load
  useEffect(() => {
    setCurrentPage('home');
    if (typeof window !== 'undefined' && window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname);
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  // Sync hash changes for clean browser back/forward and direct links
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#about' || hash === '#/about') {
        setCurrentPage('about');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#services' || hash === '#/services') {
        setCurrentPage('services');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#gallery' || hash === '#/gallery') {
        setCurrentPage('gallery');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#contact' || hash === '#/contact') {
        setCurrentPage('contact');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#location' || hash === '#/location') {
        setCurrentPage('location');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setCurrentPage('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (page: 'home' | 'about' | 'contact' | 'location' | 'gallery' | 'services', hash?: string) => {
    setCurrentPage(page);
    if (page === 'about') {
      window.location.hash = '#about';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (page === 'services') {
      window.location.hash = '#services';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (page === 'gallery') {
      window.location.hash = '#gallery';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (page === 'contact') {
      window.location.hash = '#contact';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (page === 'location') {
      window.location.hash = '#location';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      if (hash) {
        window.location.hash = hash;
        const targetId = hash.replace('#', '');
        setTimeout(() => {
          const el = document.getElementById(targetId);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
          else window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 60);
      } else {
        window.location.hash = '';
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const handleOpenModal = (serviceNameOrEvent?: string | React.MouseEvent) => {
    if (typeof serviceNameOrEvent === 'string' && serviceNameOrEvent) {
      setForm((prev) => ({ ...prev, service: serviceNameOrEvent }));
    }
    setIsOpen(true);
    setIsMinimized(false);
  };

  const handleMinimize = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMinimized(true);
  };

  const handleClose = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setIsOpen(false);
    setIsMinimized(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const branchInfo = BRANCHES.find((b) => b.id === form.location) || BRANCHES[2];
    
    // Construct pre-filled WhatsApp message for the specific branch
    const messageLines = [
      `*New Appointment Request - Philo Salon*`,
      ``,
      `*Branch:* ${branchInfo.name} (${branchInfo.area})`,
      `*Client Name:* ${form.name.trim()}`,
      `*Phone Number:* ${form.phone.trim()}`,
      `*Email:* ${form.email.trim() || 'Not specified'}`,
      `*Service Requested:* ${form.service.trim() || 'Hair Consultation & Styling'}`,
      ``,
      `Please let me know the available booking time slots. Thank you!`,
    ];
    const encodedMessage = encodeURIComponent(messageLines.join('\n'));
    const waUrl = `https://wa.me/${branchInfo.waNumber}?text=${encodedMessage}`;

    setSubmittedBranch(branchInfo);
    setSubmittedWaUrl(waUrl);
    setIsSubmitted(true);

    // Open WhatsApp in new tab for direct booking
    try {
      window.open(waUrl, '_blank');
    } catch {
      // Accessible button rendered on confirmation view
    }
  };

  const handleResetForm = () => {
    setIsSubmitted(false);
    setForm({
      name: '',
      email: '',
      phone: '',
      location: 'Lake Town',
      service: '',
    });
    setSubmittedWaUrl('');
    setIsOpen(false);
    setIsMinimized(false);
  };

  // 45-second automatic pop-out interval
  useEffect(() => {
    if (!isOpen || isMinimized) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        setIsMinimized(false);
      }, 45000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, isMinimized]);

  return (
    <div className="min-h-screen bg-white text-[#2B2B2B] flex flex-col font-main selection:bg-[#9A554A] selection:text-white overflow-x-hidden">
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      {currentPage === 'about' ? (
        <AboutPage onNavigate={handleNavigate} onOpenBooking={handleOpenModal} />
      ) : currentPage === 'services' ? (
        <ServicesPage onNavigate={handleNavigate} onOpenBooking={handleOpenModal} />
      ) : currentPage === 'contact' ? (
        <ContactPage onNavigate={handleNavigate} onOpenBooking={handleOpenModal} />
      ) : currentPage === 'location' ? (
        <LocationPage onNavigate={handleNavigate} onOpenBooking={handleOpenModal} />
      ) : currentPage === 'gallery' ? (
        <GalleryPage onNavigate={handleNavigate} onOpenBooking={handleOpenModal} />
      ) : (
        <>
          {/* 1. Header & Navigation */}
          <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: luxuryEase }}
            className="w-full bg-white pt-6 pb-6 px-6 sm:px-10 lg:px-16"
          >
            {/* Top bar with Logo on TOP LEFT and Book Appointment on TOP RIGHT */}
            <div className="max-w-[1400px] mx-auto flex items-center justify-between gap-4">
              {/* Logo on TOP LEFT */}
              <button
                type="button"
                onClick={() => handleNavigate('home')}
                className="transition-transform duration-200 hover:scale-[1.02] cursor-pointer flex items-center"
                title="Philo Salon Home"
              >
                <img
                  src="/assets/salon/for_print_green_logo_v2.png"
                  alt="Philo Hairdressing and Make Up Studio"
                  className="h-8 sm:h-9 md:h-10 w-auto object-contain"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      'https://res.cloudinary.com/kbiolcw6/image/upload/v1793619002/For_Print_Green_logo_wvplyi.png';
                  }}
                />
              </button>

              {/* Book Appointment on TOP RIGHT */}
              <motion.button
                type="button"
                onClick={() => handleOpenModal()}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2 }}
                className="bg-[#83453B] hover:bg-[#723A31] text-white text-[11px] sm:text-[12px] font-semibold tracking-[0.18em] uppercase py-2.5 px-6 sm:px-7 rounded-full transition-colors duration-200 shadow-xs cursor-pointer"
              >
                BOOK AN APPOINMENT
              </motion.button>
            </div>

            {/* Centered navigation links */}
            <nav className="max-w-[1400px] mx-auto flex items-center justify-center flex-wrap gap-x-6 sm:gap-x-9 gap-y-2 text-[12px] sm:text-[13px] tracking-[0.24em] text-[#34302E] font-normal pt-4 uppercase">
              {['ABOUT', 'SERVICES', 'GALLERY', 'LOCATION', 'CONTACT'].map((item, idx, arr) => (
                <React.Fragment key={item}>
                  <button
                    type="button"
                    onClick={() => {
                      if (item === 'ABOUT') {
                        handleNavigate('about');
                      } else if (item === 'SERVICES') {
                        handleNavigate('services');
                      } else if (item === 'GALLERY') {
                        handleNavigate('gallery');
                      } else if (item === 'CONTACT') {
                        handleNavigate('contact');
                      } else if (item === 'LOCATION') {
                        handleNavigate('location');
                      } else {
                        handleNavigate('home', `#${item.toLowerCase()}`);
                      }
                    }}
                    className="hover:text-[#83453B] tracking-[0.24em] transition-colors py-1 inline-block cursor-pointer"
                  >
                    {item}
                  </button>
                  {idx < arr.length - 1 && (
                    <span className="text-[#C4BCB6] select-none font-light">|</span>
                  )}
                </React.Fragment>
              ))}
            </nav>
          </motion.header>

      {/* 2. Hero Section on Top of Home with Five Women in White Studio Portrait */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: luxuryEase }}
        className="w-full relative min-h-[400px] sm:min-h-[500px] md:min-h-[600px] lg:min-h-[680px] xl:min-h-[760px] bg-[#1a0a07] overflow-hidden group"
      >
        <img
          src="https://res.cloudinary.com/kbiolcw6/image/upload/v1793627279/Five_Women_in_White_Studio_Portrait_xz72lz.png"
          alt="Philo Salon - Five Women in White Studio Portrait"
          className="w-full h-full object-cover object-top sm:object-center transition-transform duration-1000 ease-out"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src =
              'https://philosalon.in/wp-content/uploads/2025/02/WhatsApp-Image-2025-02-25-at-6.00.08-PM.jpeg';
          }}
        />
        {/* Subtle cinematic gradient overlay for legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/20 pointer-events-none" />

        {/* Hero Overlay Branding & Quick Actions */}
        <div className="absolute bottom-6 sm:bottom-10 left-6 sm:left-12 lg:left-16 z-10 max-w-xl text-white">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: luxuryEase }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/45 backdrop-blur-md border border-white/20 text-[10px] sm:text-[11px] tracking-[0.24em] uppercase text-white/90 mb-3"
          >
            <Sparkles size={12} className="text-[#E5B582]" />
            <span>Philo Editorial Collection • 2026 / 2027</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: luxuryEase }}
            className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-[54px] leading-[1.08] tracking-tight uppercase font-light text-white drop-shadow-md"
          >
            Where Beauty <br />
            <span className="font-normal italic">Meets Artistry.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45, ease: luxuryEase }}
            className="text-white/85 text-[12px] sm:text-[14px] font-light tracking-wide mt-2 max-w-md hidden sm:block drop-shadow-sm"
          >
            Bespoke Hairdressing, Balayage Color Artistry & Couture Skin Rituals across Kolkata.
          </motion.p>
        </div>

        {/* Explore Service Menu Action on bottom right */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45, ease: luxuryEase }}
          className="absolute bottom-6 sm:bottom-10 right-6 sm:right-12 z-10"
        >
          <button
            type="button"
            onClick={() => handleNavigate('services')}
            className="group flex items-center gap-2.5 bg-white/95 hover:bg-white text-[#260805] text-[11px] sm:text-[12px] font-semibold tracking-[0.2em] uppercase py-3 px-6 sm:px-7 rounded-full backdrop-blur-md shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer"
          >
            <span>Explore Service Menu</span>
            <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </motion.section>

      {/* 3. Stats Bar with increasing animated numbers */}
      <section className="w-full bg-[#2A0805] py-7 sm:py-8 px-4 sm:px-8">
        <div className="max-w-[1240px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-4 text-center">
          {[
            { target: 3, suffix: '', label: 'BRANCHES', duration: 2.8 },
            { target: 10000, suffix: '+', label: 'HAPPY CLIENT', duration: 3.8 },
            { target: 20, suffix: '+', label: 'EXPERTS', duration: 3.2 },
            { target: 4, suffix: '+', label: 'YEAR OF TRUST', duration: 2.8 },
          ].map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.75, delay: idx * 0.12, ease: luxuryEase }}
            >
              <div className="text-white text-4xl sm:text-5xl md:text-[50px] font-normal leading-none font-heading tracking-tight tabular-nums">
                <AnimatedCounter target={stat.target} suffix={stat.suffix} duration={stat.duration} />
              </div>
              <div className="text-white/90 text-[10px] sm:text-[11px] tracking-[0.24em] uppercase font-medium mt-2">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. Where Beauty Meets Artistry Section */}
      <section id="about" className="w-full bg-white py-16 sm:py-20 lg:py-24 px-6 sm:px-10 lg:px-16 overflow-hidden">
        <div className="max-w-[1360px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Text with scroll reveals */}
          <div className="lg:col-span-5 pr-0 lg:pr-6">
            <motion.h2
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.85, ease: luxuryEase }}
              className="font-heading text-[#9A554A] text-3xl sm:text-4xl lg:text-[50px] leading-[1.12] font-normal tracking-[0.04em] uppercase"
            >
              WHERE BEAUTY<br />MEETS ARTISTRY.
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.85, delay: 0.15, ease: luxuryEase }}
              className="text-[#8A807A] text-[11px] sm:text-[12px] tracking-[0.24em] uppercase font-normal mt-2.5 mb-3"
            >
              DISCOVER YOUR BEAUTY, DEFINE YOUR STYLE.
            </motion.div>

            {/* Expanding Divider Line */}
            <motion.div
              initial={{ scaleX: 0, originX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.9, delay: 0.25, ease: luxuryEase }}
              className="w-full h-[1px] bg-[#D8C4B8] mb-6"
            ></motion.div>

            <div className="text-[#4E4845] text-[13px] sm:text-[14px] leading-[1.78] font-light space-y-4">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.8, delay: 0.3, ease: luxuryEase }}
              >
                At PHILO, we believe beauty is more than appearance — it's an expression of individuality. From expert haircuts and creative colour transformations to personalised skin and beauty treatments, every experience is shaped around your style and confidence.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.8, delay: 0.4, ease: luxuryEase }}
              >
                Built on a passion for craftsmanship, client happiness and sustainability, we bring together expertise, creativity and care to make every transformation meaningful.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.8, delay: 0.5, ease: luxuryEase }}
                className="pt-1"
              >
                PHILO — Your Style, Our Artistry.
              </motion.p>
            </div>
          </div>

          {/* Right Column: Visual Grid of Images from philosalon.in (Black boxes and number texts removed) */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 items-stretch">
              {/* Card 1: Main Salon Styling Imagery */}
              <motion.div
                initial={{ opacity: 0, y: 45, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.85, ease: luxuryEase }}
                whileHover={{ scale: 1.02 }}
                className="w-full h-[380px] sm:h-[460px] overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 bg-[#F4EFEA] group"
              >
                <img
                  src="/assets/salon/artistry_1.png"
                  alt="Philo Salon Artistry and Styling"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      'https://philosalon.in/wp-content/uploads/2025/02/Untitled-design-66.png';
                  }}
                />
              </motion.div>

              {/* Stacked Cards 2 and 3 */}
              <div className="flex flex-col gap-4 sm:gap-5 h-[380px] sm:h-[460px]">
                {/* Card 2 */}
                <motion.div
                  initial={{ opacity: 0, y: 40, scale: 0.96 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.85, delay: 0.15, ease: luxuryEase }}
                  whileHover={{ scale: 1.02 }}
                  className="w-full flex-1 overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 bg-[#F4EFEA] group"
                >
                  <img
                    src="/assets/salon/artistry_2.png"
                    alt="Philo Salon Hair Craftsmanship"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src =
                        'https://philosalon.in/wp-content/uploads/2025/02/Untitled-design-67.png';
                    }}
                  />
                </motion.div>

                {/* Card 3 */}
                <motion.div
                  initial={{ opacity: 0, y: 40, scale: 0.96 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.85, delay: 0.3, ease: luxuryEase }}
                  whileHover={{ scale: 1.02 }}
                  className="w-full flex-1 overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 bg-[#F4EFEA] group"
                >
                  <img
                    src="/assets/salon/artistry_3.jpg"
                    alt="Philo Salon Precision Styling"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src =
                        'https://philosalon.in/wp-content/uploads/2025/02/team3.jpg';
                    }}
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Four Feature Pillars / Badges with premium scroll reveal & subtle hover */}
      <section className="w-full bg-white pb-14 sm:pb-16 px-6 sm:px-10 lg:px-16 overflow-hidden">
        <div className="max-w-[1240px] mx-auto grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-6 text-center">
          {/* Badge 1: EXPERT ARTIST */}
          <motion.div
            initial={{ opacity: 0, y: 35, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.75, delay: 0, ease: luxuryEase }}
            whileHover={{ y: -6 }}
            className="flex flex-col items-center p-3 rounded-xl transition-all"
          >
            <motion.div
              whileHover={{ rotate: [0, -5, 5, 0] }}
              transition={{ duration: 0.4 }}
              className="w-14 h-14 flex items-center justify-center text-[#5E1410] mb-3"
            >
              <svg viewBox="0 0 44 44" className="w-12 h-12 fill-current" aria-hidden="true">
                <circle cx="18" cy="11.5" r="5.5" />
                <path d="M18 19.5c-5.8 0-10.5 3.5-10.5 7.8V29h21v-1.7c0-4.3-4.7-7.8-10.5-7.8z" />
                <circle cx="31" cy="23.5" r="5.5" fill="#5E1410" />
                <polygon points="31,19.8 32.5,23 35.8,23.3 33.3,25.4 34,28.7 31,27 28,28.7 28.7,25.4 26.2,23.3 29.5,23" fill="white" />
                <path d="M28.5 28.5L27 35l4-2.5 4 2.5-1.5-6.5" />
              </svg>
            </motion.div>
            <div className="text-[12px] sm:text-[13px] font-bold tracking-[0.14em] uppercase text-black leading-tight font-heading">
              EXPERT<br />ARTIST
            </div>
          </motion.div>

          {/* Badge 2: PREMIUM PRODUCTS */}
          <motion.div
            initial={{ opacity: 0, y: 35, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.75, delay: 0.12, ease: luxuryEase }}
            whileHover={{ y: -6 }}
            className="flex flex-col items-center p-3 rounded-xl transition-all"
          >
            <motion.div
              whileHover={{ rotate: [0, -5, 5, 0] }}
              transition={{ duration: 0.4 }}
              className="w-14 h-14 flex items-center justify-center text-[#5E1410] mb-3"
            >
              <svg viewBox="0 0 44 44" className="w-12 h-12 fill-current" aria-hidden="true">
                <path d="M7 16h8v18H7z" />
                <rect x="9" y="13" width="4" height="3" />
                <path d="M8 13h7v-2h-4V9H9v2H8z" />
                <rect x="17" y="24" width="10" height="10" rx="1.5" />
                <rect x="16" y="21.5" width="12" height="3" rx="0.8" />
                <path d="M29 18h8v16h-8z" />
                <rect x="31" y="14.5" width="4" height="3.5" />
                <rect x="32" y="12.5" width="2" height="2" />
                <circle cx="22" cy="18" r="1" />
                <circle cx="24.5" cy="16" r="1" />
              </svg>
            </motion.div>
            <div className="text-[12px] sm:text-[13px] font-bold tracking-[0.14em] uppercase text-black leading-tight font-heading">
              PREMIUM<br />PRODUCTS
            </div>
          </motion.div>

          {/* Badge 3: HYGIENE FIRST */}
          <motion.div
            initial={{ opacity: 0, y: 35, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.75, delay: 0.24, ease: luxuryEase }}
            whileHover={{ y: -6 }}
            className="flex flex-col items-center p-3 rounded-xl transition-all"
          >
            <motion.div
              whileHover={{ rotate: [0, -5, 5, 0] }}
              transition={{ duration: 0.4 }}
              className="w-14 h-14 flex items-center justify-center text-[#5E1410] mb-3"
            >
              <svg viewBox="0 0 44 44" className="w-12 h-12 fill-current" aria-hidden="true">
                <path d="M22 6.5L10 11.2v10.5c0 7.8 5.2 15 12 16.8 6.8-1.8 12-9 12-16.8V11.2L22 6.5z" />
                <path d="M19 25.8l-4.5-4.5 2-2 2.5 2.5 7.8-7.8 2 2-9.8 9.8z" fill="white" />
                <polygon points="36,6 37.2,8.8 40,10 37.2,11.2 36,14 34.8,11.2 32,10 34.8,8.8" />
                <polygon points="8,9 8.9,11 11,11.9 8.9,12.8 8,15 7.1,12.8 5,11.9 7.1,11" />
              </svg>
            </motion.div>
            <div className="text-[12px] sm:text-[13px] font-bold tracking-[0.14em] uppercase text-black leading-tight font-heading">
              HYGIENE<br />FIRST
            </div>
          </motion.div>

          {/* Badge 4: PERSONALIZED CARE */}
          <motion.div
            initial={{ opacity: 0, y: 35, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.75, delay: 0.36, ease: luxuryEase }}
            whileHover={{ y: -6 }}
            className="flex flex-col items-center p-3 rounded-xl transition-all"
          >
            <motion.div
              whileHover={{ scale: 1.15 }}
              transition={{ duration: 0.3 }}
              className="w-14 h-14 flex items-center justify-center text-[#5E1410] mb-3"
            >
              <svg viewBox="0 0 44 44" className="w-12 h-12 fill-current" aria-hidden="true">
                <path d="M22 35.5s-13-8.5-13-16.8c0-4.8 3.9-8.7 8.7-8.7 2.9 0 5.5 1.4 7.3 3.6 1.8-2.2 4.4-3.6 7.3-3.6 4.8 0 8.7 3.9 8.7 8.7 0 8.3-13 16.8-13 16.8z" />
              </svg>
            </motion.div>
            <div className="text-[12px] sm:text-[13px] font-bold tracking-[0.14em] uppercase text-black leading-tight font-heading">
              PERSONALIZED<br />CARE
            </div>
          </motion.div>
        </div>
      </section>

      {/* 6. PHILO Ribbon with infinite left-to-right swipe animation */}
      <section className="w-full bg-white border-y border-[#E5E0DC] py-2.5 overflow-hidden relative select-none">
        <motion.div
          animate={{ x: ['-50%', '0%'] }}
          transition={{
            repeat: Infinity,
            repeatType: 'loop',
            duration: 65,
            ease: 'linear',
          }}
          className="flex items-center w-max text-[11px] sm:text-[12px] tracking-[0.34em] font-medium text-[#46403D] uppercase font-heading will-change-transform"
        >
          {/* First set of repeating PHILO items */}
          <div className="flex items-center space-x-8 sm:space-x-12 pr-8 sm:pr-12">
            {Array.from({ length: 24 }).map((_, i) => (
              <span key={`philo-1-${i}`}>PHILO</span>
            ))}
          </div>
          {/* Second identical set for seamless infinite looping */}
          <div className="flex items-center space-x-8 sm:space-x-12 pr-8 sm:pr-12">
            {Array.from({ length: 24 }).map((_, i) => (
              <span key={`philo-2-${i}`}>PHILO</span>
            ))}
          </div>
        </motion.div>
      </section>

      {/* 7. PHILOMAN Lepcha Section with full scroll reveal */}
      <section className="w-full bg-white py-16 sm:py-20 lg:py-24 px-6 sm:px-10 lg:px-16 overflow-hidden">
        <div className="max-w-[1360px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Authentic Founder/Salon Portrait from philosalon.in */}
          <div className="lg:col-span-5 w-full">
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.9, ease: luxuryEase }}
              whileHover={{ scale: 1.015 }}
              className="w-full h-[480px] sm:h-[580px] lg:h-[660px] overflow-hidden shadow-2xl transition-all duration-500 bg-[#F4EFEA] group"
            >
              <img
                src="/assets/salon/founder_philo.jpg"
                alt="Philoman Lepcha - Founder of Philo Salon"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    'https://philosalon.in/wp-content/uploads/2025/02/about-images.jpg';
                }}
              />
            </motion.div>
          </div>

          {/* Right Column: Founder Story with sequential text reveal */}
          <div className="lg:col-span-7 pt-2 lg:pt-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, ease: luxuryEase }}
              className="text-[#8A807A] text-[11px] sm:text-[12px] tracking-[0.24em] uppercase font-normal mb-1"
            >
              THE VISIONARY BEHIND THE BRAND'S TRIUMPH
            </motion.div>

            {/* PHILOMAN Lepcha exact block */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.85, delay: 0.1, ease: luxuryEase }}
              className="inline-block mb-7"
            >
              <h2 className="font-heading text-[#9A554A] text-4xl sm:text-5xl lg:text-[66px] leading-[0.98] font-normal tracking-[0.05em] uppercase">
                PHILOMAN
              </h2>
              <div className="text-[#6F6864] text-2xl sm:text-3xl lg:text-[34px] font-light tracking-[0.02em] text-right mt-1 leading-none">
                Lepcha
              </div>
            </motion.div>

            <div className="text-[#4E4845] text-[13px] sm:text-[14px] leading-[1.78] font-light space-y-4 max-w-[720px]">
              {[
                `Every brand begins with a belief. PHILO began with a passion for transforming hair, celebrating beauty and making people feel confident in their own skin. Our story begins with Philoman Lepcha, a skilled hairstylist who spent years building his craft and relationships with clients in Sodepur. Affectionately known as "Philo" among his clients and friends, the name became more than a nickname — it became the inspiration for a vision.`,
                `In June 2022, that vision took shape with the opening of PHILO Hair & Beauty Salon.`,
                `Built on four core beliefs — Great Hair, Glamorous Skin, Happy Clients and Sustainability — PHILO was created to make beauty more personal. We believe every individual deserves an experience that reflects their personality, preferences and aspirations.`,
                `From precision haircuts and creative colour transformations to personalised skin treatments, our approach begins with listening, understanding and crafting a look that feels uniquely yours.`,
                `For us, beauty is not simply about changing how you look; it's about how confidently you carry yourself.`,
                `PHILO — A vision built on passion, shaped by artistry and defined by you.`,
              ].map((para, pIdx) => (
                <motion.p
                  key={pIdx}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.75, delay: 0.15 + pIdx * 0.08, ease: luxuryEase }}
                  className={pIdx === 5 ? 'pt-1' : ''}
                >
                  {para}
                </motion.p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 8. Ornamental Divider with expanding lines & rotating medallion */}
      <section className="w-full bg-white pb-16 pt-2 px-6 sm:px-10 overflow-hidden">
        <div className="max-w-[780px] mx-auto flex items-center justify-center">
          <motion.div
            initial={{ scaleX: 0, originX: 1 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: luxuryEase }}
            className="flex-1 h-[1px] bg-[#D8C4B8]"
          ></motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.65, rotate: -25 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: luxuryEase }}
            className="mx-5 text-[#A57C5A]"
          >
            {/* Ornamental Celtic / Mandala knot emblem */}
            <svg viewBox="0 0 64 64" className="w-12 h-12 stroke-[#A57C5A] fill-none stroke-[1.4]" aria-hidden="true">
              <circle cx="32" cy="32" r="29" />
              <path d="M32 32 C32 23, 39 17, 45 19 C51 21, 51 30, 45 32 C39 34, 32 32, 32 32" />
              <path d="M32 32 C41 32, 47 39, 45 45 C43 51, 34 51, 32 45 C30 39, 32 32, 32 32" />
              <path d="M32 32 C32 41, 25 47, 19 45 C13 43, 13 34, 19 32 C25 30, 32 32, 32 32" />
              <path d="M32 32 C23 32, 17 25, 19 19 C21 13, 30 13, 32 19 C34 25, 32 32, 32 32" />
              <circle cx="32" cy="32" r="4.5" />
              <circle cx="32" cy="32" r="1.5" fill="#A57C5A" />
            </svg>
          </motion.div>

          <motion.div
            initial={{ scaleX: 0, originX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: luxuryEase }}
            className="flex-1 h-[1px] bg-[#D8C4B8]"
          ></motion.div>
        </div>
      </section>

      {/* 9. CLIENT REVIEWS SECTION */}
      <section id="reviews" className="w-full bg-[#FAF7F5] py-20 px-4 sm:px-8 lg:px-14 border-t border-[#ECE4DF] overflow-hidden relative">
        {/* Subtle decorative background glows */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#83453B]/5 blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-[#A57C5A]/5 blur-3xl pointer-events-none -ml-20 -mb-20"></div>

        <div className="max-w-[1240px] mx-auto relative z-10">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: luxuryEase }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#E5DDD7] shadow-xs mb-4"
            >
              <div className="flex items-center text-[#D4AF37]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={13} className="fill-[#D4AF37] text-[#D4AF37]" />
                ))}
              </div>
              <span className="text-[11px] sm:text-[12px] font-medium tracking-[0.2em] uppercase text-[#6E645E]">
                4.9 / 5.0 • OVER 1,450+ CLIENT EXPERIENCES
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, delay: 0.1, ease: luxuryEase }}
              className="font-heading text-3xl sm:text-4xl md:text-5xl text-[#260805] uppercase tracking-[0.06em] leading-tight mb-4"
            >
              CLIENT REVIEWS
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, delay: 0.2, ease: luxuryEase }}
              className="text-[#645C56] text-[13px] sm:text-[15px] font-light leading-relaxed max-w-2xl mx-auto"
            >
              Discover why discerning patrons across Kolkata trust PHILO for couture hair transformations, personalized skin radiance, and unmatched artistry.
            </motion.p>

            {/* Short divider line with center knot */}
            <div className="flex items-center justify-center gap-3 mt-6">
              <div className="w-12 h-[1px] bg-[#D8C4B8]"></div>
              <div className="w-1.5 h-1.5 rotate-45 bg-[#83453B]"></div>
              <div className="w-12 h-[1px] bg-[#D8C4B8]"></div>
            </div>
          </div>

          {/* Aggregate rating cards & Write Review CTA */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15, ease: luxuryEase }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 mb-10"
          >
            {/* Stat 1 */}
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#ECE4DF] shadow-xs flex flex-col justify-between">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] sm:text-[12px] uppercase tracking-[0.16em] text-[#8A807A] font-medium">Average Rating</span>
                <Star size={16} className="fill-[#D4AF37] text-[#D4AF37]" />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="font-heading text-3xl sm:text-4xl font-bold text-[#260805]">4.9</span>
                <span className="text-[#8A807A] text-xs">/ 5.0</span>
              </div>
              <span className="text-[11px] text-[#7A706A] mt-1 font-light">Google & Salon Verified</span>
            </div>

            {/* Stat 2 */}
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#ECE4DF] shadow-xs flex flex-col justify-between">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] sm:text-[12px] uppercase tracking-[0.16em] text-[#8A807A] font-medium">Total Reviews</span>
                <MessageSquare size={16} className="text-[#83453B]" />
              </div>
              <div className="flex items-baseline gap-1">
                <span className="font-heading text-3xl sm:text-4xl font-bold text-[#260805]">
                  <AnimatedCounter target={1450} suffix="+" duration={1.8} />
                </span>
              </div>
              <span className="text-[11px] text-[#7A706A] mt-1 font-light">Happy & returning clients</span>
            </div>

            {/* Stat 3 */}
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#ECE4DF] shadow-xs flex flex-col justify-between">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] sm:text-[12px] uppercase tracking-[0.16em] text-[#8A807A] font-medium">Satisfaction</span>
                <CheckCircle2 size={16} className="text-emerald-700" />
              </div>
              <div className="flex items-baseline gap-1">
                <span className="font-heading text-3xl sm:text-4xl font-bold text-[#260805]">99.4%</span>
              </div>
              <span className="text-[11px] text-[#7A706A] mt-1 font-light">Client recommendation rate</span>
            </div>

            {/* Stat 4 / Write Review Action */}
            <div className="bg-gradient-to-br from-[#2A0805] to-[#4A1712] p-4 sm:p-5 rounded-2xl text-white flex flex-col justify-between shadow-md">
              <div>
                <div className="flex items-center gap-1.5 text-xs text-[#E3B7AF] mb-1 font-medium tracking-wider uppercase">
                  <Sparkles size={13} />
                  Your Voice Matters
                </div>
                <h4 className="font-heading text-[16px] sm:text-[18px] uppercase tracking-wide leading-snug">
                  Visited PHILO recently?
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setIsReviewModalOpen(true)}
                className="mt-3 bg-white text-[#2A0805] hover:bg-[#FAF7F5] transition-all text-[11px] sm:text-[12px] font-semibold tracking-[0.14em] uppercase py-2 px-3.5 rounded-full flex items-center justify-center gap-1.5 cursor-pointer shadow-xs active:scale-97"
              >
                <span>Write A Review</span>
                <Send size={12} />
              </button>
            </div>
          </motion.div>

          {/* Category Filter Pills & Carousel Controls */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
            <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
              {REVIEW_CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => {
                      setSelectedCategory(cat.id);
                      setReviewPage(0);
                    }}
                    className={`px-3.5 py-1.5 rounded-full text-[11px] sm:text-[12px] tracking-[0.12em] uppercase transition-all duration-200 cursor-pointer font-medium ${
                      isActive
                        ? 'bg-[#83453B] text-white shadow-md'
                        : 'bg-white text-[#6F6864] border border-[#E5DDD7] hover:border-[#83453B]/50 hover:text-black'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2">
              <span className="text-[12px] text-[#7A706A] mr-2">
                Page {reviewPage + 1} of {totalPages}
              </span>
              <button
                type="button"
                onClick={handlePrevReviewPage}
                disabled={totalPages <= 1}
                aria-label="Previous reviews"
                className="w-9 h-9 rounded-full bg-white border border-[#D8C4B8] flex items-center justify-center text-[#2A0805] hover:bg-[#83453B] hover:text-white hover:border-[#83453B] transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-xs"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                type="button"
                onClick={handleNextReviewPage}
                disabled={totalPages <= 1}
                aria-label="Next reviews"
                className="w-9 h-9 rounded-full bg-white border border-[#D8C4B8] flex items-center justify-center text-[#2A0805] hover:bg-[#83453B] hover:text-white hover:border-[#83453B] transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-xs"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* Reviews Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {filteredReviews
              .slice(reviewPage * itemsPerPage, (reviewPage + 1) * itemsPerPage)
              .map((rev, idx) => (
                <motion.div
                  key={rev.id}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.65, delay: idx * 0.1, ease: luxuryEase }}
                  className="bg-white rounded-2xl p-6 sm:p-7 border border-[#ECE4DF] shadow-[0_4px_24px_-10px_rgba(42,8,5,0.06)] hover:shadow-[0_12px_32px_-10px_rgba(42,8,5,0.12)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between relative group"
                >
                  {/* Decorative quote mark in top corner */}
                  <div className="absolute top-5 right-5 text-[#F0E6E0] group-hover:text-[#E8D9D0] transition-colors">
                    <Quote size={32} className="rotate-180" />
                  </div>

                  <div>
                    {/* Stars & Verified */}
                    <div className="flex items-center justify-between mb-4 pr-10">
                      <div className="flex items-center gap-1 text-[#D4AF37]">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} size={15} className="fill-[#D4AF37] text-[#D4AF37]" />
                        ))}
                      </div>
                      {rev.verified && (
                        <div className="flex items-center gap-1 text-[10px] sm:text-[11px] font-medium text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                          <CheckCircle2 size={11} />
                          <span>Verified</span>
                        </div>
                      )}
                    </div>

                    {/* Review text */}
                    <p className="text-[#3A332F] text-[13px] sm:text-[14px] leading-[1.72] font-light mb-6 italic">
                      "{rev.text}"
                    </p>
                  </div>

                  {/* Client Info Footer */}
                  <div className="pt-4 border-t border-[#F2ECE8]">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${rev.avatarColor} text-white font-heading font-bold text-sm flex items-center justify-center shrink-0 shadow-xs`}>
                        {rev.name.split(' ').map((n) => n[0]).slice(0, 2).join('')}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="font-heading text-[14px] sm:text-[15px] font-bold text-[#2A0805] uppercase tracking-wide truncate">
                          {rev.name}
                        </div>
                        <div className="text-[11px] font-medium text-[#83453B] truncate">
                          {rev.service}
                        </div>
                        <div className="flex items-center gap-2 text-[10px] sm:text-[11px] text-[#8C847E] mt-0.5">
                          <span className="flex items-center gap-0.5 truncate">
                            <MapPin size={10} className="shrink-0 text-[#83453B]" />
                            {rev.branch}
                          </span>
                          <span>•</span>
                          <span>{rev.date}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>

          {/* Pagination Dots */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-8">
              {[...Array(totalPages)].map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  type="button"
                  onClick={() => setReviewPage(dotIdx)}
                  aria-label={`Go to review page ${dotIdx + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    reviewPage === dotIdx ? 'w-8 bg-[#83453B]' : 'w-2 bg-[#D8C4B8] hover:bg-[#83453B]/60'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 10. Bottom Section: Hair Trend 2026-27 Banner Card with scroll reveal & interactive button */}
      <motion.section
        initial={{ opacity: 0, y: 50, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 1, ease: luxuryEase }}
        className="w-full relative overflow-hidden bg-neutral-900 group"
      >
        <motion.img
          src="/assets/hair_trend_2026_27.png"
          alt="Hair Trend 2026-27"
          initial={{ scale: 1.04 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: luxuryEase }}
          className="w-full h-auto min-h-[320px] object-cover block"
          onError={(e) => {
            e.currentTarget.src = "https://res.cloudinary.com/kbiolcw6/image/upload/v1793478106/Hair_Trend_2026_27_zivdix.png";
          }}
        />

        {/* BOOK NOW Button at bottom right */}
        <motion.div
          initial={{ opacity: 0, y: 25, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.35, ease: luxuryEase }}
          className="absolute bottom-6 sm:bottom-10 md:bottom-14 right-6 sm:right-12 md:right-20 lg:right-28 z-10"
        >
          <motion.button
            type="button"
            onClick={handleOpenModal}
            whileHover={{ scale: 1.05, boxShadow: "0 20px 30px -10px rgba(112, 50, 42, 0.5)" }}
            whileTap={{ scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="bg-gradient-to-r from-[#70322A] via-[#83453B] to-[#5C2620] text-white text-[12px] sm:text-[14px] tracking-[0.24em] uppercase font-normal py-3 sm:py-3.5 px-8 sm:px-12 rounded-full shadow-xl cursor-pointer"
          >
            BOOK NOW
          </motion.button>
        </motion.div>
      </motion.section>

      {/* 11. Bottom Monochrome Footer matching reference design */}
      <Footer onNavigate={handleNavigate} onOpenBooking={handleOpenModal} />
      </>
      )}

      {/* 10. Floating Minimized Glow-Up Card Pill (when minimized) */}
      <AnimatePresence>
        {isOpen && isMinimized && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 30 }}
            transition={{ duration: 0.3, ease: luxuryEase }}
            onClick={() => setIsMinimized(false)}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#260805] text-white pl-4 pr-3 py-3 rounded-full shadow-2xl border border-[#9A554A]/50 cursor-pointer hover:bg-[#340B07] transition-all group"
          >
            <div className="w-2.5 h-2.5 rounded-full bg-[#9A554A] animate-pulse"></div>
            <span className="text-[11px] sm:text-[12px] font-medium tracking-[0.18em] uppercase font-heading select-none">
              It's Time For A Glow-Up
            </span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsMinimized(false);
              }}
              className="bg-[#83453B] text-white p-1.5 rounded-full hover:bg-[#9A554A] transition-colors"
              title="Expand appointment form"
            >
              <Maximize2 size={13} />
            </button>
            <button
              type="button"
              onClick={handleClose}
              className="text-white/60 hover:text-white p-1 transition-colors"
              title="Close"
            >
              <X size={14} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 11. Interactive Appointment / Glow-Up Modal (Full Pop-Out Card) */}
      <AnimatePresence>
        {isOpen && !isMinimized && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleClose}
            className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 30 }}
              transition={{ duration: 0.4, ease: luxuryEase }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white max-w-[960px] w-full shadow-2xl overflow-hidden relative grid grid-cols-1 md:grid-cols-12 rounded-2xl sm:rounded-3xl border border-neutral-100"
            >
              {/* Window Controls (Minimize & Close) */}
              <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 bg-white/80 md:bg-white/90 backdrop-blur-xs p-1 rounded-full shadow-xs">
                <button
                  type="button"
                  onClick={handleMinimize}
                  className="p-1.5 text-neutral-600 hover:text-black hover:bg-neutral-100 rounded-full transition-colors cursor-pointer"
                  title="Minimize form"
                >
                  <Minus size={16} />
                </button>
                <button
                  type="button"
                  onClick={handleClose}
                  className="p-1.5 text-neutral-600 hover:text-black hover:bg-neutral-100 rounded-full transition-colors cursor-pointer"
                  title="Close form"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Left Column: Portrait Photo (No black overlay, no text, clean display) */}
              <div className="col-span-1 md:col-span-5 relative overflow-hidden bg-neutral-100 h-64 md:h-auto min-h-[260px] md:min-h-[520px]">
                <img
                  src="/assets/philo_card_image.jpg"
                  alt="PHILO Hair Glow-Up"
                  className="w-full h-full object-cover object-top md:object-center block absolute inset-0"
                  onError={(e) => {
                    e.currentTarget.src = "https://res.cloudinary.com/kbiolcw6/image/upload/v1793484476/PHILO2952_1_u7c0dm.jpg";
                  }}
                />
              </div>

              {/* Right Column: Exact Form matching reference image */}
              <div className="col-span-1 md:col-span-7 bg-white p-6 sm:p-8 md:p-10 flex flex-col justify-center">
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-10 px-4 text-center flex flex-col items-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-[#25D366]/15 flex items-center justify-center text-[#25D366] mb-4">
                      <MessageCircle size={36} />
                    </div>
                    <span className="text-[10px] tracking-[0.24em] uppercase text-[#83453B] font-semibold block mb-1">
                      WHATSAPP ROUTED TO {submittedBranch.name.toUpperCase()}
                    </span>
                    <h4 className="font-heading font-bold text-2xl text-black uppercase mb-2">
                      APPOINTMENT DISPATCHED
                    </h4>
                    <p className="text-neutral-600 text-sm max-w-sm mb-6 leading-relaxed">
                      Thank you, <span className="font-semibold text-black">{form.name || 'valued client'}</span>. Your appointment request for <span className="font-semibold text-[#83453B]">{submittedBranch.name} Branch</span> is ready to send to WhatsApp at <span className="font-semibold text-black">{submittedBranch.displayNumber}</span>.
                    </p>

                    {/* Direct WhatsApp CTA Button */}
                    <a
                      href={submittedWaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20ba5a] text-white text-[12px] font-semibold tracking-[0.16em] uppercase py-3.5 px-8 rounded-full shadow-lg transition-all mb-4 cursor-pointer hover:scale-102 active:scale-98"
                    >
                      <MessageCircle size={18} />
                      CONTINUE TO WHATSAPP ({submittedBranch.whatsapp})
                    </a>

                    <button
                      type="button"
                      onClick={handleResetForm}
                      className="text-neutral-500 hover:text-black text-[11px] tracking-[0.16em] uppercase underline cursor-pointer mt-1"
                    >
                      Close / Book Another Branch
                    </button>
                  </motion.div>
                ) : (
                  <>
                    {/* Header Text */}
                    <div className="mb-5 pr-12">
                      <h3 className="font-heading font-bold text-2xl sm:text-[28px] text-black leading-[1.15] tracking-tight uppercase">
                        IT'S TIME FOR A<br />
                        LITTLE GLOW-UP.
                      </h3>
                    </div>

                    {/* Exact Form Inputs */}
                    <form onSubmit={handleSubmit} className="space-y-3.5">
                      {/* NAME */}
                      <div>
                        <label className="text-[11px] font-normal tracking-[0.12em] uppercase text-black mb-1 block font-heading">
                          NAME
                        </label>
                        <input
                          type="text"
                          required
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          className="w-full border border-[#D5CEC8] focus:border-[#83453B] focus:ring-1 focus:ring-[#83453B] outline-none px-3 py-2 text-[13px] bg-white text-black transition-colors"
                        />
                      </div>

                      {/* E MAIL */}
                      <div>
                        <label className="text-[11px] font-normal tracking-[0.12em] uppercase text-black mb-1 block font-heading">
                          E MAIL
                        </label>
                        <input
                          type="email"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          className="w-full border border-[#D5CEC8] focus:border-[#83453B] focus:ring-1 focus:ring-[#83453B] outline-none px-3 py-2 text-[13px] bg-white text-black transition-colors"
                        />
                      </div>

                      {/* PH. NO. */}
                      <div>
                        <label className="text-[11px] font-normal tracking-[0.12em] uppercase text-black mb-1 block font-heading">
                          PH. NO.
                        </label>
                        <input
                          type="tel"
                          required
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          className="w-full border border-[#D5CEC8] focus:border-[#83453B] focus:ring-1 focus:ring-[#83453B] outline-none px-3 py-2 text-[13px] bg-white text-black transition-colors"
                        />
                      </div>

                      {/* LOCATION - 3 BRANCH SELECTION */}
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <label className="text-[11px] font-normal tracking-[0.12em] uppercase text-black block font-heading">
                            LOCATION (SELECT BRANCH)
                          </label>
                          <span className="text-[9.5px] text-[#83453B] font-semibold tracking-wider uppercase">
                            Direct WhatsApp
                          </span>
                        </div>

                        {/* 3 Interactive Branch Option Buttons */}
                        <div className="grid grid-cols-3 gap-2 mb-2">
                          {BRANCHES.map((b) => {
                            const isSelected = form.location === b.id;
                            return (
                              <button
                                key={b.id}
                                type="button"
                                onClick={() => setForm({ ...form, location: b.id })}
                                className={`py-2 px-1.5 rounded-sm text-center transition-all cursor-pointer border ${
                                  isSelected
                                    ? 'bg-[#83453B] text-white border-[#83453B] shadow-xs'
                                    : 'bg-[#F9F7F5] text-[#3E3835] border-[#D5CEC8] hover:border-[#83453B]'
                                }`}
                              >
                                <div className="text-[11px] font-bold uppercase tracking-wider leading-tight">
                                  {b.name}
                                </div>
                                <div
                                  className={`text-[9px] font-mono tracking-tight mt-0.5 ${
                                    isSelected ? 'text-white/85' : 'text-[#83453B]'
                                  }`}
                                >
                                  {b.whatsapp}
                                </div>
                              </button>
                            );
                          })}
                        </div>

                        {/* Standard Accessible Select Dropdown */}
                        <select
                          required
                          value={form.location}
                          onChange={(e) => setForm({ ...form, location: e.target.value })}
                          className="w-full border border-[#D5CEC8] focus:border-[#83453B] focus:ring-1 focus:ring-[#83453B] outline-none px-3 py-2 text-[12.5px] bg-white text-black transition-colors rounded-none cursor-pointer"
                        >
                          {BRANCHES.map((b) => (
                            <option key={b.id} value={b.id}>
                              {b.name} Branch — WhatsApp: {b.whatsapp}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* SERVICE */}
                      <div>
                        <label className="text-[11px] font-normal tracking-[0.12em] uppercase text-black mb-1 block font-heading">
                          SERVICE
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Haircut & Styling, Hair Color, Facial"
                          value={form.service}
                          onChange={(e) => setForm({ ...form, service: e.target.value })}
                          className="w-full border border-[#D5CEC8] focus:border-[#83453B] focus:ring-1 focus:ring-[#83453B] outline-none px-3 py-2 text-[13px] bg-white text-black transition-colors"
                        />
                      </div>

                      {/* Exact Submit Pill Button */}
                      <div className="flex items-center justify-between pt-3">
                        <span className="text-[10px] text-neutral-500 italic">
                          Sends to {form.location} WhatsApp
                        </span>
                        <button
                          type="submit"
                          className="bg-[#612B26] hover:bg-[#73332D] text-white text-[12px] font-medium tracking-[0.16em] uppercase py-2.5 px-8 rounded-full transition-all duration-200 shadow-md cursor-pointer hover:shadow-lg active:scale-98 inline-flex items-center gap-2"
                        >
                          <MessageCircle size={15} />
                          SEND MASSAGE
                        </button>
                      </div>
                    </form>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 12. Write A Review Modal */}
      <AnimatePresence>
        {isReviewModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsReviewModalOpen(false)}
            className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 25 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 25 }}
              transition={{ duration: 0.35, ease: luxuryEase }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white max-w-[560px] w-full rounded-2xl sm:rounded-3xl shadow-2xl border border-[#ECE4DF] overflow-hidden p-6 sm:p-8 relative"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setIsReviewModalOpen(false)}
                className="absolute top-5 right-5 p-1.5 text-neutral-500 hover:text-black hover:bg-neutral-100 rounded-full transition-colors cursor-pointer"
                title="Close"
              >
                <X size={18} />
              </button>

              <div className="mb-6">
                <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-[#83453B] block mb-1">
                  CLIENT PRAISE & TESTIMONIAL
                </span>
                <h3 className="font-heading text-2xl sm:text-3xl uppercase font-bold text-[#2A0805]">
                  Share Your Experience
                </h3>
                <p className="text-[#645C56] text-xs sm:text-sm mt-1 font-light">
                  Tell us about your salon visit, stylist care, and transformation at PHILO.
                </p>
              </div>

              <form onSubmit={handleReviewSubmit} className="space-y-4">
                {/* Rating Stars Selection */}
                <div>
                  <label className="text-[11px] font-normal tracking-[0.14em] uppercase text-black mb-1.5 block font-heading">
                    YOUR RATING
                  </label>
                  <div className="flex items-center gap-1.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewReviewForm({ ...newReviewForm, rating: star })}
                        className="p-1 hover:scale-110 transition-transform cursor-pointer"
                      >
                        <Star
                          size={24}
                          className={
                            star <= newReviewForm.rating
                              ? 'fill-[#D4AF37] text-[#D4AF37]'
                              : 'text-neutral-300'
                          }
                        />
                      </button>
                    ))}
                    <span className="text-xs text-[#8A807A] ml-2 font-medium">
                      {newReviewForm.rating === 5 ? 'Exceptional (5/5)' : `${newReviewForm.rating} / 5`}
                    </span>
                  </div>
                </div>

                {/* Name */}
                <div>
                  <label className="text-[11px] font-normal tracking-[0.14em] uppercase text-black mb-1 block font-heading">
                    FULL NAME
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sweta Banerjee"
                    value={newReviewForm.name}
                    onChange={(e) => setNewReviewForm({ ...newReviewForm, name: e.target.value })}
                    className="w-full border border-[#D5CEC8] focus:border-[#83453B] focus:ring-1 focus:ring-[#83453B] outline-none px-3.5 py-2.5 text-[13px] bg-white text-black transition-colors rounded-sm"
                  />
                </div>

                {/* Branch Selection */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-normal tracking-[0.14em] uppercase text-black mb-1 block font-heading">
                      BRANCH VISITED
                    </label>
                    <select
                      value={newReviewForm.branch}
                      onChange={(e) => setNewReviewForm({ ...newReviewForm, branch: e.target.value })}
                      className="w-full border border-[#D5CEC8] focus:border-[#83453B] focus:ring-1 focus:ring-[#83453B] outline-none px-3 py-2.5 text-[13px] bg-white text-black transition-colors rounded-sm cursor-pointer"
                    >
                      <option value="Lake Town Branch">Lake Town Branch</option>
                      <option value="HB Town Branch">HB Town Branch</option>
                      <option value="Parthopur Branch">Parthopur Branch</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-normal tracking-[0.14em] uppercase text-black mb-1 block font-heading">
                      SERVICE EXPERIENCED
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Balayage, Keratin, Hair Spa"
                      value={newReviewForm.service}
                      onChange={(e) => setNewReviewForm({ ...newReviewForm, service: e.target.value })}
                      className="w-full border border-[#D5CEC8] focus:border-[#83453B] focus:ring-1 focus:ring-[#83453B] outline-none px-3.5 py-2.5 text-[13px] bg-white text-black transition-colors rounded-sm"
                    />
                  </div>
                </div>

                {/* Review Text */}
                <div>
                  <label className="text-[11px] font-normal tracking-[0.14em] uppercase text-black mb-1 block font-heading">
                    YOUR REVIEW
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe your hair transformation, the stylist consultation, and the salon ambiance..."
                    value={newReviewForm.text}
                    onChange={(e) => setNewReviewForm({ ...newReviewForm, text: e.target.value })}
                    className="w-full border border-[#D5CEC8] focus:border-[#83453B] focus:ring-1 focus:ring-[#83453B] outline-none px-3.5 py-2.5 text-[13px] bg-white text-black transition-colors resize-none rounded-sm"
                  ></textarea>
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsReviewModalOpen(false)}
                    className="px-5 py-2.5 text-xs text-neutral-600 hover:text-black uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-[#612B26] hover:bg-[#73332D] text-white text-[12px] font-medium tracking-[0.16em] uppercase py-2.5 px-8 rounded-full transition-all shadow-md cursor-pointer hover:shadow-lg active:scale-98"
                  >
                    Submit Review
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 13. Toast Notification for Submissions */}
      <AnimatePresence>
        {reviewToast && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.92 }}
            transition={{ duration: 0.35, ease: luxuryEase }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#260805] text-white px-6 py-3.5 rounded-full shadow-2xl border border-[#83453B]/60 flex items-center gap-3"
          >
            <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <CheckCircle2 size={16} />
            </div>
            <span className="text-[12px] sm:text-[13px] font-medium tracking-wide">
              {reviewToast}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
