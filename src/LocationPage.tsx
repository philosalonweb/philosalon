/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import Footer from './components/Footer.tsx';
import {
  Headphones,
  FileText,
  Mail,
  Clock,
  MessageSquare,
  MessageCircle,
  Users,
  Send,
  PenTool,
  Calendar,
  CheckCircle2,
  Heart,
  ExternalLink,
} from 'lucide-react';

const luxuryEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface LocationPageProps {
  onNavigate: (page: 'home' | 'about' | 'contact' | 'location' | 'gallery' | 'services', hash?: string) => void;
  onOpenBooking: () => void;
}

export default function LocationPage({ onNavigate, onOpenBooking }: LocationPageProps) {
  // General Enquiries Form State
  const [enquiryForm, setEnquiryForm] = useState({
    name: '',
    subject: '',
    email: '',
    phone: '',
    purpose: 'Collaboration',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleEnquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setEnquiryForm({
        name: '',
        subject: '',
        email: '',
        phone: '',
        purpose: 'Collaboration',
        message: '',
      });
      setIsSubmitted(false);
    }, 4500);
  };

  const branches = [
    {
      id: 2,
      name: 'PARTHAPUR',
      whatsapp: '629061165',
      waNumber: '91629061165',
      displayPhone: '+91 62906 1165',
      image: '/assets/salon/branch_parthapur.png',
      fallback: 'https://philosalon.in/wp-content/uploads/2025/02/2-1.png',
      addressLines: [
        'Sarojini Naidu Rd, Parthapur Bazar,',
        'Jamandapara, Sodepur, Kolkata,',
        'Panihati, West Bengal 700113',
      ],
      mapUrl: 'https://share.google/C5GLlMjhqQq68LQHa',
      reverse: false,
    },
    {
      id: 3,
      name: 'H.B. TOWN',
      whatsapp: '7980357947',
      waNumber: '917980357947',
      displayPhone: '+91 79803 57947',
      image: '/assets/salon/branch_hbtown.png',
      fallback: 'https://philosalon.in/wp-content/uploads/2025/02/1-2.png',
      addressLines: [
        '74, Barasat Rd, opposite Panihati,',
        'Anandalok, H B Town, Sodepur, Kolkata,',
        'Panihati, West Bengal 700110',
      ],
      mapUrl: 'https://share.google/rzHiqrkQwLBx2vWac',
      reverse: true,
    },
    {
      id: 4,
      name: 'LAKE TOWN',
      whatsapp: '9330362726',
      waNumber: '919330362726',
      displayPhone: '+91 93303 62726',
      image: '/assets/salon/branch_laketown.png',
      fallback: 'https://philosalon.in/wp-content/uploads/2025/02/Untitled-design-70.png',
      addressLines: [
        'P, 146, Lake Town Rd, Block B, Lake Town,',
        'South Dumdum, Kolkata, West Bengal',
        '700089',
      ],
      mapUrl: 'https://share.google/gBbfodRWdq0IBkZCj',
      reverse: false,
    },
  ];

  return (
    <div className="min-h-screen bg-white text-[#2B2B2B] flex flex-col font-main selection:bg-[#9A554A] selection:text-white overflow-x-hidden">
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
            onClick={() => onNavigate('home')}
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
            onClick={onOpenBooking}
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
          <button
            type="button"
            onClick={() => onNavigate('about')}
            className="hover:text-[#83453B] tracking-[0.24em] transition-colors py-1 cursor-pointer"
          >
            ABOUT
          </button>
          <span className="text-[#C4BCB6] select-none font-light">|</span>

          <button
            type="button"
            onClick={() => onNavigate('services')}
            className="hover:text-[#83453B] tracking-[0.24em] transition-colors py-1 cursor-pointer"
          >
            SERVICES
          </button>
          <span className="text-[#C4BCB6] select-none font-light">|</span>

          <button
            type="button"
            onClick={() => onNavigate('gallery')}
            className="hover:text-[#83453B] tracking-[0.24em] transition-colors py-1 cursor-pointer"
          >
            GALLERY
          </button>
          <span className="text-[#C4BCB6] select-none font-light">|</span>

          <button
            type="button"
            onClick={() => onNavigate('location')}
            className="text-[#83453B] font-semibold tracking-[0.24em] py-1 cursor-pointer transition-colors"
          >
            LOCATION
          </button>
          <span className="text-[#C4BCB6] select-none font-light">|</span>

          <button
            type="button"
            onClick={() => onNavigate('contact')}
            className="hover:text-[#83453B] tracking-[0.24em] transition-colors py-1 cursor-pointer"
          >
            CONTACT
          </button>
        </nav>
      </motion.header>

      {/* 2. Top Hero Banner from philosalon.in */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: luxuryEase }}
        className="w-full relative h-[420px] sm:h-[480px] md:h-[540px] lg:h-[600px] overflow-hidden bg-[#1a0a07]"
      >
        <img
          src="/assets/salon/hero_banner_3.png"
          alt="Philo Salon Locations and Experience"
          className="w-full h-full object-cover object-center"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src =
              'https://philosalon.in/wp-content/uploads/2025/02/philo-banner-3-1.png';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/25 pointer-events-none" />
      </motion.section>

      {/* 3. Title Section: FIND YOUR WAY TO PHILO */}
      <section className="w-full bg-white pt-16 sm:pt-20 pb-12 sm:pb-16 px-6 sm:px-10 text-center">
        <div className="max-w-[820px] mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: luxuryEase }}
            className="text-[#40130E] text-3xl sm:text-4xl md:text-[44px] font-extrabold tracking-tight uppercase leading-tight font-heading"
          >
            FIND YOUR WAY TO PHILO
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15, ease: luxuryEase }}
            className="mt-5 text-[#383330] text-[14px] sm:text-[15px] leading-[1.75] font-normal max-w-[700px] mx-auto"
          >
            More than just a destination, PHILO is where beauty meets care,
            creativity and confidence. Visit us at our Lake Town or Sodepur
            salon and experience a space designed to make you feel special,
            refreshed and beautifully yourself.
          </motion.p>
        </div>
      </section>

      {/* 4. Three Location Cards (Alternating Layout) */}
      <section className="w-full bg-white pb-20 sm:pb-24 px-6 sm:px-10 lg:px-20">
        <div className="max-w-[1100px] mx-auto space-y-10 sm:space-y-12">
          {branches.map((branch) => {
            const isReverse = branch.reverse;
            return (
              <motion.div
                key={branch.id}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.8, ease: luxuryEase }}
                className="grid grid-cols-1 md:grid-cols-2 gap-0 overflow-hidden items-stretch shadow-lg"
              >
                {/* Branch Image Showcase from philosalon.in */}
                <div
                  className={`min-h-[300px] sm:min-h-[340px] md:min-h-[380px] overflow-hidden bg-[#F4EFEA] group ${
                    isReverse ? 'md:order-2' : 'md:order-1'
                  }`}
                >
                  <img
                    src={branch.image}
                    alt={`${branch.name} Branch`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = branch.fallback;
                    }}
                  />
                </div>

                {/* Grey Details Card */}
                <div
                  className={`bg-[#D9D9D9] p-8 sm:p-12 md:p-14 flex flex-col justify-center items-center text-center ${
                    isReverse ? 'md:order-1' : 'md:order-2'
                  }`}
                >
                  <h2 className="text-black text-2xl sm:text-3xl md:text-[34px] font-bold tracking-tight uppercase font-heading mb-4">
                    {branch.name}
                  </h2>

                  <div className="text-black text-[13px] sm:text-[14px] leading-relaxed max-w-[340px] mb-8 font-normal">
                    {branch.addressLines.map((line, lIdx) => (
                      <p key={lIdx}>{line}</p>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-3">
                    <a
                      href={branch.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block border border-black bg-transparent hover:bg-black hover:text-white text-black text-[11px] sm:text-[12px] font-medium tracking-[0.2em] uppercase py-2.5 px-6 transition-all duration-200 cursor-pointer"
                    >
                      VIEW ON MAP
                    </a>
                    <a
                      href={`https://wa.me/${branch.waNumber}?text=${encodeURIComponent(
                        `Hello Philo Salon ${branch.name} Branch, I would like to book an appointment.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 border border-[#83453B] bg-[#83453B] hover:bg-[#6f3830] text-white text-[11px] sm:text-[12px] font-medium tracking-[0.16em] uppercase py-2.5 px-5 transition-all duration-200 cursor-pointer shadow-xs"
                    >
                      <MessageCircle size={14} />
                      <span>WHATSAPP ({branch.whatsapp})</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 5. GRIEVANCE REDRESSAL Section */}
      <section className="w-full bg-white pt-10 pb-16 sm:pb-24 px-6 sm:px-10 lg:px-20 border-t border-neutral-200">
        <div className="max-w-[1100px] mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: luxuryEase }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="font-serif-heading text-black text-2xl sm:text-3xl lg:text-[34px] font-bold tracking-tight uppercase">
              GRIEVANCE REDRESSAL
            </h2>
            <div className="w-12 h-[1.5px] bg-black mx-auto mt-2.5 mb-2"></div>
            <p className="text-[#66605D] text-[13px] tracking-wide font-light">
              Raise Your Concern
            </p>
          </motion.div>

          {/* Two-Column Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Column: WE'RE HERE TO LISTEN */}
            <motion.div
              initial={{ opacity: 0, x: -25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: luxuryEase }}
              className="lg:col-span-5 pt-2"
            >
              {/* Headset circular icon */}
              <div className="w-12 h-12 rounded-full border border-neutral-400 flex items-center justify-center text-black mb-5">
                <Headphones size={22} strokeWidth={1.5} />
              </div>

              <h3 className="font-serif-heading text-black text-2xl sm:text-[28px] font-bold uppercase leading-tight">
                WE'RE HERE<br />TO LISTEN
              </h3>
              <div className="w-12 h-[2px] bg-black mt-2.5 mb-6"></div>

              <div className="text-[#4E4845] text-[13px] sm:text-[13.5px] leading-[1.8] space-y-4 max-w-md font-light">
                <p>
                  At PHILO, your experience matters to us. If something during your visit did not meet your expectations, we encourage you to let us know. Honest feedback helps us improve and resolve concerns responsibly.
                </p>
                <p>
                  We follow a structured grievance redressal process to ensure every concern is reviewed fairly and addressed with care.
                </p>
              </div>
            </motion.div>

            {/* Right Column: HOW TO RAISE A CONCERN card */}
            <motion.div
              initial={{ opacity: 0, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: luxuryEase }}
              className="lg:col-span-7 bg-[#F7F6F5] p-6 sm:p-10 rounded-sm"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-white shrink-0">
                  <FileText size={18} strokeWidth={1.6} />
                </div>
                <div>
                  <h4 className="font-serif-heading text-black text-[17px] sm:text-[19px] font-bold uppercase leading-snug">
                    HOW TO RAISE A<br />CONCERN
                  </h4>
                  <div className="w-10 h-[2px] bg-black mt-1.5"></div>
                </div>
              </div>

              <p className="text-[#4A4542] text-[12.5px] sm:text-[13px] leading-relaxed mb-5 mt-4">
                For service-related concerns or grievances, please share the following details so we can assist you effectively:
              </p>

              {/* Numbered List */}
              <div className="space-y-2 mb-8 text-[12.5px] sm:text-[13px] text-black">
                <p><span className="font-bold">1.</span> Your full name</p>
                <p><span className="font-bold">2.</span> Contact number</p>
                <p><span className="font-bold">3.</span> Date of visit</p>
                <p><span className="font-bold">4.</span> Location visited</p>
                <p><span className="font-bold">5.</span> Brief description of the concern</p>
              </div>

              <div className="pt-4 border-t border-neutral-300 space-y-4">
                {/* Email channel */}
                <div className="flex items-center gap-4">
                  <div className="w-9 h-9 rounded-full bg-black flex items-center justify-center text-white shrink-0">
                    <Mail size={16} strokeWidth={1.6} />
                  </div>
                  <div className="text-[12.5px] sm:text-[13px]">
                    <span className="text-[#55504E]">Email us at: </span>
                    <a
                      href="mailto:management@philosalon.com"
                      className="font-bold text-black hover:text-[#83453B] transition-colors"
                    >
                      management@philosalon.com
                    </a>
                  </div>
                </div>

                {/* Clock review timeline */}
                <div className="flex items-center gap-4">
                  <div className="w-9 h-9 rounded-full bg-black flex items-center justify-center text-white shrink-0">
                    <Clock size={16} strokeWidth={1.6} />
                  </div>
                  <div className="text-[12.5px] sm:text-[13px] text-[#4A4542]">
                    Once received, our team will review the matter and respond within{' '}
                    <span className="font-bold text-black">24 - 48 working hours.</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 6. Thin Separator */}
      <div className="max-w-[1100px] mx-auto w-full px-6 sm:px-10">
        <div className="border-t border-neutral-200"></div>
      </div>

      {/* 7. NOT BOOKING. NOT A COMPLAINT. STILL WANT TO TALK? Section */}
      <section className="w-full bg-white pt-14 pb-16 sm:pb-24 px-6 sm:px-10 lg:px-20">
        <div className="max-w-[1100px] mx-auto">
          {/* Section Heading */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: luxuryEase }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="font-serif-heading text-black text-2xl sm:text-3xl lg:text-[34px] font-bold tracking-tight uppercase leading-snug">
              NOT BOOKING. NOT A COMPLAINT.<br />STILL WANT TO TALK?
            </h2>
            <div className="w-12 h-[1.5px] bg-black mx-auto mt-3 mb-2"></div>
            <p className="text-[#66605D] text-[13px] tracking-wide font-light">
              Get in Touch for Other Enquiries
            </p>
          </motion.div>

          {/* Two-Column Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Column: FOR GENERAL ENQUIRIES */}
            <motion.div
              initial={{ opacity: 0, x: -25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: luxuryEase }}
              className="lg:col-span-5 pt-2"
            >
              <div className="w-11 h-11 rounded-full bg-black flex items-center justify-center text-white mb-4">
                <MessageSquare size={18} strokeWidth={1.6} />
              </div>

              <h3 className="font-serif-heading text-black text-xl sm:text-[22px] font-bold uppercase leading-snug">
                FOR GENERAL<br />ENQUIRIES
              </h3>
              <p className="text-[11.5px] tracking-[0.16em] uppercase text-black font-semibold mt-1">
                INCLUDING:
              </p>
              <div className="w-12 h-[2px] bg-black mt-2 mb-6"></div>

              {/* Items with icons */}
              <div className="space-y-4 mb-8 text-[12.5px] sm:text-[13px] text-[#2B2B2B]">
                <div className="flex items-center gap-3.5">
                  <Users size={17} className="text-black shrink-0" strokeWidth={1.6} />
                  <span>Collaborations & Partnerships</span>
                </div>
                <div className="flex items-center gap-3.5">
                  <Send size={16} className="text-black shrink-0" strokeWidth={1.6} />
                  <span>Media & Brand Enquiries</span>
                </div>
                <div className="flex items-center gap-3.5">
                  <PenTool size={16} className="text-black shrink-0" strokeWidth={1.6} />
                  <span>Feedback or Suggestions</span>
                </div>
                <div className="flex items-start gap-3.5">
                  <Calendar size={17} className="text-black shrink-0 mt-0.5" strokeWidth={1.6} />
                  <span>Any matter not related to appointments or grievances</span>
                </div>
              </div>

              <div className="pt-6 border-t border-neutral-200 text-[#4E4845] text-[12.5px] sm:text-[13px] leading-relaxed max-w-sm">
                <p>Please reach out to us using the contact form.</p>
                <p>Our team will get back to you as soon as possible.</p>
              </div>
            </motion.div>

            {/* Right Column: TELL US HOW WE CAN HELP card form */}
            <motion.div
              initial={{ opacity: 0, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: luxuryEase }}
              className="lg:col-span-7 bg-[#F7F6F5] p-6 sm:p-10 rounded-sm"
            >
              <div className="flex items-start gap-4 mb-2">
                <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-white shrink-0">
                  <Send size={18} strokeWidth={1.6} />
                </div>
                <div>
                  <h4 className="font-serif-heading text-black text-[17px] sm:text-[19px] font-bold uppercase leading-snug">
                    TELL US HOW<br />WE CAN HELP.
                  </h4>
                </div>
              </div>

              <p className="text-[#66605D] text-[11.5px] sm:text-[12px] mb-6">
                <span className="font-semibold text-black">Please note:</span> this form is meant for general enquiries only.
              </p>

              {isSubmitted ? (
                <div className="bg-white border border-[#D5CEC8] p-8 text-center rounded-sm">
                  <div className="w-12 h-12 bg-[#83453B]/10 text-[#83453B] rounded-full flex items-center justify-center mx-auto mb-3">
                    <CheckCircle2 size={24} />
                  </div>
                  <h5 className="font-heading text-base font-bold text-black uppercase mb-1">
                    Message Received
                  </h5>
                  <p className="text-neutral-600 text-[13px]">
                    Thank you! Our management team will get back to you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleEnquirySubmit} className="space-y-3.5">
                  {/* Row 1: Your Name & Subject */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <input
                      type="text"
                      required
                      placeholder="Your Name"
                      value={enquiryForm.name}
                      onChange={(e) => setEnquiryForm({ ...enquiryForm, name: e.target.value })}
                      className="w-full bg-white border border-[#D5CEC8] px-3.5 py-2.5 text-[13px] text-black outline-none focus:border-black transition-colors placeholder:text-neutral-500 rounded-none"
                    />
                    <input
                      type="text"
                      required
                      placeholder="Subject"
                      value={enquiryForm.subject}
                      onChange={(e) => setEnquiryForm({ ...enquiryForm, subject: e.target.value })}
                      className="w-full bg-white border border-[#D5CEC8] px-3.5 py-2.5 text-[13px] text-black outline-none focus:border-black transition-colors placeholder:text-neutral-500 rounded-none"
                    />
                  </div>

                  {/* Row 2: Email Address & Phone No. */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <input
                      type="email"
                      required
                      placeholder="Email Address"
                      value={enquiryForm.email}
                      onChange={(e) => setEnquiryForm({ ...enquiryForm, email: e.target.value })}
                      className="w-full bg-white border border-[#D5CEC8] px-3.5 py-2.5 text-[13px] text-black outline-none focus:border-black transition-colors placeholder:text-neutral-500 rounded-none"
                    />
                    <input
                      type="tel"
                      required
                      placeholder="Phone No."
                      value={enquiryForm.phone}
                      onChange={(e) => setEnquiryForm({ ...enquiryForm, phone: e.target.value })}
                      className="w-full bg-white border border-[#D5CEC8] px-3.5 py-2.5 text-[13px] text-black outline-none focus:border-black transition-colors placeholder:text-neutral-500 rounded-none"
                    />
                  </div>

                  {/* Row 3: Purpose Dropdown */}
                  <div>
                    <label className="block text-[11px] text-neutral-500 uppercase tracking-wide mb-1">
                      Purpose
                    </label>
                    <select
                      value={enquiryForm.purpose}
                      onChange={(e) => setEnquiryForm({ ...enquiryForm, purpose: e.target.value })}
                      className="w-full bg-white border border-[#D5CEC8] px-3.5 py-2.5 text-[13px] text-black outline-none focus:border-black transition-colors rounded-none cursor-pointer"
                    >
                      <option value="Collaboration">Collaboration</option>
                      <option value="Media & Brand Enquiry">Media & Brand Enquiry</option>
                      <option value="Feedback or Suggestions">Feedback or Suggestions</option>
                      <option value="Other Enquiry">Other Enquiry</option>
                    </select>
                  </div>

                  {/* Row 4: Message */}
                  <div>
                    <textarea
                      required
                      rows={5}
                      placeholder="Message"
                      value={enquiryForm.message}
                      onChange={(e) => setEnquiryForm({ ...enquiryForm, message: e.target.value })}
                      className="w-full bg-white border border-[#D5CEC8] px-3.5 py-2.5 text-[13px] text-black outline-none focus:border-black transition-colors placeholder:text-neutral-500 rounded-none resize-y"
                    ></textarea>
                  </div>

                  {/* Row 5: reCaptcha note */}
                  <div className="flex items-center gap-2 pt-1">
                    <CheckCircle2 size={16} className="text-neutral-400 shrink-0" />
                    <span className="text-[11.5px] text-neutral-500">
                      Please enter the reCaptcha public and private keys inside the admin panel!
                    </span>
                  </div>

                  {/* Row 6: Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="bg-black hover:bg-neutral-800 text-white text-[11px] font-semibold tracking-[0.16em] uppercase py-3 px-8 transition-colors cursor-pointer rounded-none"
                    >
                      SEND MESSAGE
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* 8. Bottom Feedback Strip Card */}
      <section className="w-full bg-white pb-20 px-6 sm:px-10 lg:px-20">
        <div className="max-w-[1100px] mx-auto border border-[#E0DCD8] p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* Left item */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center text-white shrink-0">
              <Heart size={20} fill="white" />
            </div>
            <div>
              <div className="text-[14px] font-bold text-black font-heading leading-tight">
                Your Feedback, Our Growth.
              </div>
              <div className="text-[12.5px] text-[#66605D] mt-0.5">
                Thank you for helping us serve you better.
              </div>
            </div>
          </div>

          {/* Right item */}
          <div className="flex items-center justify-between md:justify-end gap-6 md:border-l md:border-neutral-200 md:pl-8">
            <div className="text-[12.5px] text-[#4A4542] leading-relaxed">
              We truly value your time,<br />
              feedback and trust in PHILO.
            </div>
            {/* Elegant botanical leaf illustration */}
            <svg
              viewBox="0 0 64 64"
              className="w-12 h-12 text-[#9A938D] stroke-current fill-none stroke-[1.5] shrink-0"
              aria-hidden="true"
            >
              <path d="M12 52 C20 44, 34 30, 48 12" />
              <path d="M22 42 C18 36, 18 28, 26 28 C28 34, 26 40, 22 42 Z" />
              <path d="M32 32 C36 26, 42 26, 42 34 C36 36, 32 34, 32 32 Z" />
              <path d="M40 24 C40 18, 48 16, 50 22 C48 26, 42 26, 40 24 Z" />
              <path d="M18 46 C14 42, 14 36, 20 36 C22 42, 20 46, 18 46 Z" />
            </svg>
          </div>
        </div>
      </section>

      {/* 9. Bottom Monochrome Footer matching reference design */}
      <Footer onNavigate={onNavigate} onOpenBooking={onOpenBooking} />
    </div>
  );
}
