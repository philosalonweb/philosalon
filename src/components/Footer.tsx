/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, ExternalLink, CheckCircle2, ChevronRight, Phone, MapPin } from 'lucide-react';

interface FooterProps {
  onNavigate?: (page: 'home' | 'about' | 'contact' | 'location' | 'gallery' | 'services', hash?: string) => void;
  onOpenBooking?: () => void;
}

export const SALON_BRANCHES = [
  {
    name: 'Parthopur',
    number: '629061165',
    waNumber: '91629061165',
    display: '+91 62906 1165',
    area: 'Sodepur / Parthapur Bazar, Kolkata',
    mapUrl: 'https://share.google/C5GLlMjhqQq68LQHa',
  },
  {
    name: 'HB Town',
    number: '7980357947',
    waNumber: '917980357947',
    display: '+91 79803 57947',
    area: 'HB Town, Sodepur, Kolkata',
    mapUrl: 'https://share.google/rzHiqrkQwLBx2vWac',
  },
  {
    name: 'Lake Town',
    number: '9330362726',
    waNumber: '919330362726',
    display: '+91 93303 62726',
    area: 'Lake Town, Kolkata',
    mapUrl: 'https://share.google/gBbfodRWdq0IBkZCj',
  },
];

export default function Footer({ onNavigate, onOpenBooking }: FooterProps) {
  // WhatsApp Branch Selector Modal
  const [isWaModalOpen, setIsWaModalOpen] = useState(false);

  // Informational modals for Support links
  const [activeModal, setActiveModal] = useState<'faq' | 'franchise' | 'membership' | 'blogs' | null>(null);

  const handleBookingClick = () => {
    if (onOpenBooking) {
      onOpenBooking();
    } else if (onNavigate) {
      onNavigate('home', '#booking');
    }
  };

  const openWhatsAppBranch = (waNumber: string, branchName: string) => {
    const message = encodeURIComponent(
      `Hello PHILO Salon (${branchName} Branch), I would like to book an appointment / enquire about your styling & beauty services.`
    );
    window.open(`https://wa.me/${waNumber}?text=${message}`, '_blank', 'noopener,noreferrer');
    setIsWaModalOpen(false);
  };

  return (
    <>
      <footer className="w-full bg-[#f4f4f4] text-[#1c1c1c] border-t border-[#e2e2e2] overflow-hidden relative font-sans">
        <div className="max-w-[1560px] mx-auto min-h-[360px] sm:min-h-[400px] flex flex-col lg:flex-row items-stretch">
          
          {/* LEFT & MIDDLE CONTENT AREA */}
          <div className="flex-1 py-12 sm:py-14 md:py-16 px-6 sm:px-10 lg:px-14 flex flex-col md:flex-row items-start justify-start gap-10 md:gap-12 lg:gap-14 bg-gradient-to-r from-[#ffffff] via-[#f7f7f8] to-[#ededed]">
            
            {/* COLUMN 1: Support & Contact Us */}
            <div className="flex flex-col justify-between shrink-0 min-w-[180px] sm:min-w-[210px]">
              {/* Support */}
              <div>
                <h3 className="font-['Playfair_Display',Georgia,serif] text-2xl sm:text-[28px] text-[#141414] font-medium tracking-tight mb-1 inline-block pb-1 border-b border-[#222222]">
                  Support
                </h3>
                <ul className="mt-4 space-y-2.5 text-[15px] sm:text-[16px] text-[#333333]">
                  <li>
                    <button
                      type="button"
                      onClick={() => setActiveModal('faq')}
                      className="hover:text-black transition-colors cursor-pointer text-left font-normal"
                    >
                      F.A.Q's
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => setActiveModal('franchise')}
                      className="hover:text-black transition-colors cursor-pointer text-left font-normal"
                    >
                      Franchise
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => setActiveModal('membership')}
                      className="hover:text-black transition-colors cursor-pointer text-left font-normal"
                    >
                      Membership
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => setActiveModal('blogs')}
                      className="hover:text-black transition-colors cursor-pointer text-left font-normal"
                    >
                      Blogs
                    </button>
                  </li>
                </ul>
              </div>

              {/* Contact Us */}
              <div className="mt-8 sm:mt-10">
                <h3 className="font-['Playfair_Display',Georgia,serif] text-2xl sm:text-[28px] text-[#141414] font-medium tracking-tight mb-1 inline-block pb-1 border-b border-[#222222]">
                  Contact Us
                </h3>
                <ul className="mt-4 space-y-2.5 text-[15px] sm:text-[16px] text-[#333333]">
                  <li>
                    <button
                      type="button"
                      onClick={handleBookingClick}
                      className="hover:text-black transition-colors cursor-pointer text-left font-normal"
                    >
                      Book an Appointment
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => setIsWaModalOpen(true)}
                      className="group flex items-center gap-2 hover:text-black transition-colors cursor-pointer text-left font-normal"
                      title="Select branch to chat on WhatsApp"
                    >
                      <span>Whatsapp Us</span>
                      {/* WhatsApp outline icon matching reference */}
                      <svg
                        viewBox="0 0 24 24"
                        className="w-[18px] h-[18px] fill-none stroke-[#141414] stroke-[1.9] group-hover:scale-110 transition-transform"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                        <path d="M9.5 9.5a1.2 1.2 0 0 0 .5 1.5c1 1.2 2 1.8 3.5 2 .7.1 1.2-.2 1.5-.7l.5-.8c.2-.3.1-.7-.2-.9l-1.3-.7c-.3-.2-.7-.1-.9.1l-.4.5c-.2.2-.5.3-.8.2-.8-.3-1.6-.9-2.1-1.7-.2-.3-.1-.6.1-.8l.5-.4c.2-.2.3-.6.1-.9L10 6.6c-.2-.3-.6-.4-.9-.2l-.6.5c-.5.4-.6 1-.3 1.6z" strokeWidth="1.2" fill="#141414" />
                      </svg>
                    </button>
                  </li>
                </ul>
              </div>
            </div>

            {/* VERTICAL DIVIDER */}
            <div className="hidden md:block w-[1px] bg-[#d2d2d2] self-stretch mx-2" aria-hidden="true" />

            {/* COLUMN 2: Stay Connected */}
            <div className="flex-1 flex flex-col justify-between max-w-[480px]">
              <div>
                <h3 className="font-['Playfair_Display',Georgia,serif] text-2xl sm:text-[30px] md:text-[32px] text-[#141414] font-medium tracking-tight mb-3">
                  Stay Connected
                </h3>
                <p className="text-[14px] sm:text-[15px] text-[#555555] leading-relaxed max-w-[420px] font-light">
                  Be the first to know about new launches, offers, and events across our salons.
                </p>

                {/* Social Icons row */}
                <div className="flex items-center gap-4 sm:gap-5 mt-6">
                  {/* Instagram icon (outline rounded-square with inner camera circle) */}
                  <a
                    href="https://www.instagram.com/philosalon.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="text-[#141414] hover:text-[#555555] transition-transform duration-200 hover:scale-110"
                    title="Follow PHILO on Instagram"
                  >
                    <svg
                      viewBox="0 0 32 32"
                      className="w-8 h-8 fill-none stroke-[#141414] stroke-[2.2]"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="4" y="4" width="24" height="24" rx="7" />
                      <circle cx="16" cy="16" r="5.5" />
                      <circle cx="22.5" cy="9.5" r="1.3" fill="#141414" />
                    </svg>
                  </a>

                  {/* LinkedIn icon (rounded square with 'in') */}
                  <a
                    href="https://www.linkedin.com/search/results/all/?keywords=Philo%20Salon%20Kolkata"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="text-[#141414] hover:text-[#555555] transition-transform duration-200 hover:scale-110"
                    title="Connect on LinkedIn"
                  >
                    <svg viewBox="0 0 32 32" className="w-8 h-8 fill-[#141414]">
                      <rect x="4" y="4" width="24" height="24" rx="6" />
                      <circle cx="10.5" cy="11.5" r="1.6" fill="#ffffff" />
                      <rect x="9.2" y="14.5" width="2.6" height="8" fill="#ffffff" />
                      <path
                        d="M15 14.5h2.4v1.1h.03c.34-.64 1.18-1.32 2.45-1.32 2.62 0 3.1 1.72 3.1 3.96V22.5h-2.5v-3.75c0-.9-.02-2.05-1.25-2.05-1.25 0-1.44.98-1.44 1.99V22.5H15v-8z"
                        fill="#ffffff"
                      />
                    </svg>
                  </a>

                  {/* Facebook icon (circle with 'f') */}
                  <a
                    href="https://www.facebook.com/philosalonofficial/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="text-[#141414] hover:text-[#555555] transition-transform duration-200 hover:scale-110"
                    title="Follow PHILO on Facebook"
                  >
                    <svg viewBox="0 0 32 32" className="w-8 h-8 fill-[#141414]">
                      <circle cx="16" cy="16" r="13" />
                      <path
                        d="M17.8 17.5h2.4l.35-3h-2.75v-1.8c0-.8.3-1.4 1.4-1.4h1.4V8.7c-.25-.03-1.1-.1-2.1-.1-2.1 0-3.55 1.3-3.55 3.65v2.25H12.5v3h2.35V26.5h3v-9z"
                        fill="#ffffff"
                      />
                    </svg>
                  </a>

                  {/* YouTube official link icon */}
                  <a
                    href="https://www.youtube.com/@philosalon"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="YouTube"
                    className="text-[#141414] hover:text-[#555555] transition-transform duration-200 hover:scale-110"
                    title="Subscribe to PHILO on YouTube"
                  >
                    <svg viewBox="0 0 32 32" className="w-8 h-8 fill-[#141414]">
                      <rect x="4" y="6" width="24" height="20" rx="6" />
                      <polygon points="13,11 21,16 13,21" fill="#ffffff" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* HORIZONTAL DIVIDER & COPYRIGHT */}
              <div className="mt-8 sm:mt-12 pt-6 border-t border-[#d5d5d5] w-full">
                <p className="text-[13px] sm:text-[14px] text-[#4d4d4d] tracking-wide">
                  © Copyright 2026 PHILO Salon. All Rights Reserved.
                </p>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: PHILO STOREFRONT ILLUMINATED IMAGE */}
          <div className="w-full lg:w-[48%] xl:w-[50%] min-h-[280px] sm:min-h-[320px] lg:min-h-auto relative bg-[#1c1c1c] overflow-hidden flex items-center justify-center">
            {/* The crisp monochrome storefront photo cropped directly from reference */}
            <picture className="w-full h-full block">
              <source srcSet="/footer-salon-storefront.webp" type="image/webp" />
              <img
                src="/footer-salon-storefront.png"
                alt="PHILO Hairdressing and Make Up Studio Storefront"
                className="w-full h-full object-cover object-left lg:object-center select-none"
                loading="lazy"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    'https://res.cloudinary.com/kbiolcw6/image/upload/v1793627172/PHILO_Salon_Monochrome_Footer_e64y11.png';
                }}
              />
            </picture>

            {/* Subtle soft gradient blend on the left edge for seamless transition into the light left area */}
            <div
              className="absolute inset-y-0 left-0 w-24 sm:w-36 pointer-events-none hidden lg:block bg-gradient-to-r from-[#ededed] via-[#ededed]/60 to-transparent"
              aria-hidden="true"
            />
          </div>

        </div>
      </footer>

      {/* WHATSAPP BRANCH SELECTOR MODAL */}
      {isWaModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setIsWaModalOpen(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-gray-100 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <span className="text-xs font-semibold tracking-wider uppercase text-[#83453B]">
                  Direct WhatsApp Connect
                </span>
                <h3 className="font-['Playfair_Display',Georgia,serif] text-2xl text-gray-900 mt-1">
                  Choose Your Branch
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  Select a PHILO salon branch to initiate direct WhatsApp chat.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsWaModalOpen(false)}
                className="text-gray-400 hover:text-gray-700 p-1.5 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 mt-5">
              {SALON_BRANCHES.map((b) => (
                <button
                  key={b.name}
                  type="button"
                  onClick={() => openWhatsAppBranch(b.waNumber, b.name)}
                  className="w-full text-left p-4 rounded-xl border border-gray-200 hover:border-[#83453B] hover:bg-[#83453B]/5 transition-all flex items-center justify-between group cursor-pointer"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                      <svg
                        viewBox="0 0 24 24"
                        className="w-5 h-5 fill-none stroke-current stroke-2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 group-hover:text-[#83453B] transition-colors">
                        {b.name} Branch
                      </h4>
                      <p className="text-xs text-gray-500 mt-0.5">{b.area}</p>
                      <p className="text-xs font-mono text-emerald-700 font-semibold mt-1">
                        {b.display}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#83453B] group-hover:translate-x-1 transition-all" />
                </button>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
              <span>Operational: 10:30 AM – 8:30 PM Daily</span>
              <button
                type="button"
                onClick={() => {
                  setIsWaModalOpen(false);
                  handleBookingClick();
                }}
                className="text-[#83453B] font-medium hover:underline cursor-pointer"
              >
                Or use online booking
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SUPPORT INFORMATIONAL MODALS (FAQ, Franchise, Membership, Blogs) */}
      {activeModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setActiveModal(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-gray-100 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between pb-4 border-b border-gray-100">
              <div>
                <span className="text-xs font-semibold tracking-wider uppercase text-[#83453B]">
                  PHILO Salon Support
                </span>
                <h3 className="font-['Playfair_Display',Georgia,serif] text-2xl text-gray-900 mt-1 capitalize">
                  {activeModal === 'faq' && "Frequently Asked Questions (F.A.Q's)"}
                  {activeModal === 'franchise' && 'Franchise & Studio Partnerships'}
                  {activeModal === 'membership' && 'PHILO Elite Salon Membership'}
                  {activeModal === 'blogs' && 'Trends, Haircare & Beauty Blogs'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="text-gray-400 hover:text-gray-700 p-1.5 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-5 text-sm text-gray-600 space-y-4">
              {activeModal === 'faq' && (
                <>
                  <div className="border border-gray-100 rounded-xl p-4 bg-gray-50/50">
                    <h4 className="font-medium text-gray-900 mb-1">
                      Do I need to book in advance for balayage or keratin?
                    </h4>
                    <p className="text-gray-600 text-xs sm:text-sm">
                      Yes, our precision coloring and keratin treatments require a dedicated 2–3 hour session with Philoman Lepcha or our senior color directors. Advance booking ensures bespoke consultation and strand diagnosis.
                    </p>
                  </div>
                  <div className="border border-gray-100 rounded-xl p-4 bg-gray-50/50">
                    <h4 className="font-medium text-gray-900 mb-1">
                      What are the salon timings across all branches?
                    </h4>
                    <p className="text-gray-600 text-xs sm:text-sm">
                      All three branches (Lake Town, HB Town, and Parthopur) are open 7 days a week from 10:30 AM to 8:30 PM.
                    </p>
                  </div>
                  <div className="border border-gray-100 rounded-xl p-4 bg-gray-50/50">
                    <h4 className="font-medium text-gray-900 mb-1">
                      What products and brands do you use?
                    </h4>
                    <p className="text-gray-600 text-xs sm:text-sm">
                      We exclusively utilize dermatologically tested, conscious salon formulations including Olaplex, L'Oréal Professionnel Serie Expert, Kérastase, and organic scalp botanicals.
                    </p>
                  </div>
                </>
              )}

              {activeModal === 'franchise' && (
                <>
                  <p className="leading-relaxed">
                    Partner with Kolkata's premier hair & beauty destination. PHILO offers full turnkey support including studio architecture, master stylist training by Philoman Lepcha, supply chain, and digital salon marketing.
                  </p>
                  <div className="bg-[#83453B]/5 border border-[#83453B]/20 rounded-xl p-4">
                    <h4 className="font-semibold text-[#83453B] mb-1">Franchise Inquiry Requirements:</h4>
                    <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-gray-700">
                      <li>Prime commercial location (800 – 2,000 sq.ft)</li>
                      <li>Passion for uncompromising luxury hair & beauty craftsmanship</li>
                      <li>Dedicated management and community focus</li>
                    </ul>
                  </div>
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setActiveModal(null);
                        openWhatsAppBranch('919330362726', 'Corporate Franchise');
                      }}
                      className="w-full py-3 bg-[#83453B] text-white font-medium rounded-xl hover:bg-[#6e2a23] transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Inquire via Franchise Desk WhatsApp</span>
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                </>
              )}

              {activeModal === 'membership' && (
                <>
                  <p className="leading-relaxed">
                    Elevate your salon rituals with the <strong>PHILO Elite Privilege Pass</strong>. Designed for clients who value regular hair vitality, signature blowouts, and priority booking.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                    <div className="border border-gray-200 rounded-xl p-3 bg-gray-50">
                      <div className="text-xs uppercase font-semibold text-[#83453B]">Silver Tier</div>
                      <div className="text-base font-bold text-gray-900 mt-0.5">15% Savings</div>
                      <p className="text-xs text-gray-500 mt-1">Complimentary scalp analysis & 2 guest passes/year.</p>
                    </div>
                    <div className="border border-[#83453B] rounded-xl p-3 bg-[#83453B]/5">
                      <div className="text-xs uppercase font-semibold text-[#83453B]">Gold VIP Tier</div>
                      <div className="text-base font-bold text-gray-900 mt-0.5">25% Savings</div>
                      <p className="text-xs text-gray-500 mt-1">Priority director slots, birthday pampering hamper & treatments.</p>
                    </div>
                  </div>
                </>
              )}

              {activeModal === 'blogs' && (
                <>
                  <p className="leading-relaxed">
                    Explore trend forecasts, editorial styling secrets, and post-color maintenance guides written by PHILO creative stylists.
                  </p>
                  <div className="space-y-3 mt-2">
                    <div
                      className="p-3 border border-gray-200 rounded-xl hover:border-gray-400 transition-colors cursor-pointer"
                      onClick={() => {
                        setActiveModal(null);
                        if (onNavigate) onNavigate('gallery');
                      }}
                    >
                      <span className="text-xs text-[#83453B] font-semibold">Trend Forecast 2026/27</span>
                      <h4 className="font-medium text-gray-900 text-sm mt-0.5">
                        French Balayage Meets Glass-Hair Texture: The Modern Kolkata Lookbook
                      </h4>
                      <p className="text-xs text-gray-500 mt-1">Click to view our curated 2026/27 Gallery portfolio.</p>
                    </div>
                    <div
                      className="p-3 border border-gray-200 rounded-xl hover:border-gray-400 transition-colors cursor-pointer"
                      onClick={() => {
                        setActiveModal(null);
                        if (onNavigate) onNavigate('about');
                      }}
                    >
                      <span className="text-xs text-[#83453B] font-semibold">Behind The Scissors</span>
                      <h4 className="font-medium text-gray-900 text-sm mt-0.5">
                        Philoman Lepcha on Sculpting Hair as Architecture
                      </h4>
                      <p className="text-xs text-gray-500 mt-1">Discover our story and creative philosophy.</p>
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="pt-4 border-t border-gray-100 flex justify-end">
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="px-5 py-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
