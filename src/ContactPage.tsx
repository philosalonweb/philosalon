/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, Mail, Clock, MapPin, MessageCircle, Instagram, Plus, Minus, Check } from 'lucide-react';
import Footer from './components/Footer.tsx';

const luxuryEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface ContactPageProps {
  onNavigate: (page: 'home' | 'about' | 'contact' | 'location' | 'gallery' | 'services', hash?: string) => void;
  onOpenBooking: () => void;
}

export default function ContactPage({ onNavigate, onOpenBooking }: ContactPageProps) {
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: '',
    agreed: false,
  });
  const [agreeError, setAgreeError] = useState(false);
  const [isSent, setIsSent] = useState(false);

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.agreed) {
      setAgreeError(true);
      return;
    }
    setAgreeError(false);
    setIsSent(true);
    setTimeout(() => {
      setFormData({
        name: '',
        phone: '',
        email: '',
        subject: '',
        message: '',
        agreed: false,
      });
      setIsSent(false);
    }, 4000);
  };

  const faqs = [
    {
      q: 'How can I book an appointment?',
      a: "You can book directly by clicking the 'Book an Appointment' button on our website, calling us at +91 98765 43210, or messaging us directly on WhatsApp.",
    },
    {
      q: 'What are your salon timings?',
      a: 'We are open Monday through Sunday from 10:00 AM to 8:00 PM at both our Lake Town and Sodepur locations.',
    },
    {
      q: 'Do you provide consultation before the services?',
      a: 'Yes! Our senior artists and stylists provide complimentary one-on-one consultations to understand your style, hair texture, and expectations before any service.',
    },
    {
      q: 'What is your cancellation policy?',
      a: 'We kindly request at least 4 to 6 hours notice if you wish to reschedule or cancel your appointment so we can offer the slot to another client.',
    },
    {
      q: 'Do you have parking available?',
      a: 'Yes, convenient client parking is available at both our Lake Town and Sodepur branches.',
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
            className="hover:text-[#83453B] tracking-[0.24em] transition-colors py-1 cursor-pointer"
          >
            LOCATION
          </button>
          <span className="text-[#C4BCB6] select-none font-light">|</span>

          <button
            type="button"
            onClick={() => onNavigate('contact')}
            className="text-[#83453B] font-semibold tracking-[0.24em] py-1 cursor-pointer transition-colors"
          >
            CONTACT
          </button>
        </nav>
      </motion.header>

      {/* 2. CONTACT US Title Section */}
      <section className="w-full bg-white pt-16 sm:pt-20 pb-12 px-6 sm:px-10 text-center overflow-hidden">
        <div className="max-w-[800px] mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: luxuryEase }}
            className="font-serif-heading text-black text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-tight uppercase"
          >
            CONTACT US
          </motion.h1>

          {/* Center divider line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: luxuryEase }}
            className="w-12 h-[2px] bg-black mx-auto mt-2 mb-4"
          ></motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: luxuryEase }}
            className="text-[#55504E] text-[13px] sm:text-[14px] leading-relaxed font-light"
          >
            <p>We'd love to hear from you.</p>
            <p>Reach out to us for appointments, queries or feedback.</p>
          </motion.div>
        </div>
      </section>

      {/* 3. 4-Column Contact Details Bar with Dividers */}
      <section className="w-full bg-white pb-16 px-6 sm:px-10 lg:px-16 overflow-hidden">
        <div className="max-w-[1240px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-10 sm:gap-y-8 divide-y sm:divide-y-0 lg:divide-x divide-[#E5E0DC]">
          {/* Item 1: CALL US */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0, ease: luxuryEase }}
            className="flex flex-col items-center text-center px-4 pt-6 sm:pt-0"
          >
            <div className="w-12 h-12 rounded-full border border-neutral-400 flex items-center justify-center text-black mb-3.5">
              <Phone size={18} strokeWidth={1.6} />
            </div>
            <div className="text-[12px] font-bold tracking-[0.16em] uppercase text-black mb-1 font-heading">
              CALL US
            </div>
            <a
              href="tel:+919876543210"
              className="text-[#33302E] text-[13px] hover:text-[#83453B] transition-colors"
            >
              +91 98765 43210
            </a>
          </motion.div>

          {/* Item 2: EMAIL US */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: luxuryEase }}
            className="flex flex-col items-center text-center px-4 pt-6 sm:pt-0"
          >
            <div className="w-12 h-12 rounded-full border border-neutral-400 flex items-center justify-center text-black mb-3.5">
              <Mail size={18} strokeWidth={1.6} />
            </div>
            <div className="text-[12px] font-bold tracking-[0.16em] uppercase text-black mb-1 font-heading">
              EMAIL US
            </div>
            <a
              href="mailto:info@philosalon.in"
              className="text-[#33302E] text-[13px] hover:text-[#83453B] transition-colors"
            >
              info@philosalon.in
            </a>
          </motion.div>

          {/* Item 3: OPENING HOURS */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: luxuryEase }}
            className="flex flex-col items-center text-center px-4 pt-6 sm:pt-0"
          >
            <div className="w-12 h-12 rounded-full border border-neutral-400 flex items-center justify-center text-black mb-3.5">
              <Clock size={18} strokeWidth={1.6} />
            </div>
            <div className="text-[12px] font-bold tracking-[0.16em] uppercase text-black mb-1 font-heading">
              OPENING HOURS
            </div>
            <div className="text-[#33302E] text-[13px]">
              Mon - Sun : 10:00 AM - 8:00 PM
            </div>
          </motion.div>

          {/* Item 4: OUR LOCATIONS */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3, ease: luxuryEase }}
            className="flex flex-col items-center text-center px-4 pt-6 sm:pt-0"
          >
            <div className="w-12 h-12 rounded-full border border-neutral-400 flex items-center justify-center text-black mb-3.5">
              <MapPin size={18} strokeWidth={1.6} />
            </div>
            <div className="text-[12px] font-bold tracking-[0.16em] uppercase text-black mb-1 font-heading">
              OUR LOCATIONS
            </div>
            <div className="text-[#33302E] text-[13px] flex items-center justify-center gap-1.5 flex-wrap">
              <a
                href="https://share.google/gBbfodRWdq0IBkZCj"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#83453B] underline underline-offset-2 transition-colors"
                title="View Lake Town on Google Maps"
              >
                Lake Town
              </a>
              <span>•</span>
              <a
                href="https://share.google/rzHiqrkQwLBx2vWac"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#83453B] underline underline-offset-2 transition-colors"
                title="View HB Town on Google Maps"
              >
                HB Town
              </a>
              <span>•</span>
              <a
                href="https://share.google/C5GLlMjhqQq68LQHa"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#83453B] underline underline-offset-2 transition-colors"
                title="View Parthopur on Google Maps"
              >
                Parthopur
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 4. Main Two-Column Section: Form (Left) & We Are Here To Help (Right) */}
      <section className="w-full bg-white pb-20 sm:pb-24 px-6 sm:px-10 lg:px-16 overflow-hidden">
        <div className="max-w-[1240px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: GET IN TOUCH Form */}
          <div className="lg:col-span-6 bg-[#FAFAFA] border border-[#ECE6E1] p-6 sm:p-10">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: luxuryEase }}
            >
              <h2 className="font-serif-heading text-black text-2xl sm:text-[26px] font-bold tracking-tight uppercase">
                GET IN TOUCH
              </h2>
              <div className="w-10 h-[2px] bg-black mt-2 mb-7"></div>

              {isSent ? (
                <div className="bg-white border border-green-200 p-6 rounded text-center py-10">
                  <div className="w-12 h-12 bg-green-100 text-green-700 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Check size={24} />
                  </div>
                  <h4 className="font-serif-heading text-black text-lg font-bold uppercase mb-1">
                    MESSAGE SENT
                  </h4>
                  <p className="text-neutral-600 text-sm">
                    Thank you for reaching out. We will respond to your inquiry shortly!
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Row 1: Your Name & Phone Number */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      required
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-white border border-[#D5CEC8] px-3.5 py-2.5 text-[13px] text-black outline-none focus:border-black transition-colors placeholder:text-neutral-500 rounded-none"
                    />
                    <input
                      type="tel"
                      required
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-white border border-[#D5CEC8] px-3.5 py-2.5 text-[13px] text-black outline-none focus:border-black transition-colors placeholder:text-neutral-500 rounded-none"
                    />
                  </div>

                  {/* Row 2: Email Address */}
                  <div>
                    <input
                      type="email"
                      required
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-white border border-[#D5CEC8] px-3.5 py-2.5 text-[13px] text-black outline-none focus:border-black transition-colors placeholder:text-neutral-500 rounded-none"
                    />
                  </div>

                  {/* Row 3: Subject */}
                  <div>
                    <input
                      type="text"
                      required
                      placeholder="Subject"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full bg-white border border-[#D5CEC8] px-3.5 py-2.5 text-[13px] text-black outline-none focus:border-black transition-colors placeholder:text-neutral-500 rounded-none"
                    />
                  </div>

                  {/* Row 4: Message */}
                  <div>
                    <textarea
                      required
                      rows={5}
                      placeholder="Message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-white border border-[#D5CEC8] px-3.5 py-2.5 text-[13px] text-black outline-none focus:border-black transition-colors placeholder:text-neutral-500 rounded-none resize-y"
                    ></textarea>
                  </div>

                  {/* Row 5: Checkbox agreement */}
                  <div className="flex flex-col gap-1 pt-1">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="terms"
                        checked={formData.agreed}
                        onChange={(e) => {
                          setFormData({ ...formData, agreed: e.target.checked });
                          if (e.target.checked) setAgreeError(false);
                        }}
                        className="w-4 h-4 rounded-none accent-black border-neutral-300 cursor-pointer"
                      />
                      <label htmlFor="terms" className="text-[12px] text-neutral-600 cursor-pointer select-none">
                        I agree to the Privacy Policy and Terms & Conditions.
                      </label>
                    </div>
                    {agreeError && (
                      <p className="text-[11px] text-red-600 pl-6">
                        Please agree to the terms to proceed.
                      </p>
                    )}
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

          {/* Right Column: WE ARE HERE TO HELP */}
          <div className="lg:col-span-6 pl-0 lg:pl-4 pt-2">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15, ease: luxuryEase }}
            >
              <h2 className="font-serif-heading text-black text-2xl sm:text-[26px] font-bold tracking-tight uppercase">
                WE ARE HERE TO HELP
              </h2>
              <div className="w-10 h-[2px] bg-black mt-2 mb-5"></div>

              <p className="text-[#55504E] text-[13px] sm:text-[14px] leading-relaxed font-light mb-8 max-w-lg">
                Whether you have a question about our services, want to book an appointment, or simply want to say hello, we are just a message away.
              </p>

              {/* Contact List */}
              <div className="space-y-6">
                {/* 1. Call Us */}
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-full border border-neutral-400 flex items-center justify-center text-black shrink-0">
                    <Phone size={17} strokeWidth={1.6} />
                  </div>
                  <div>
                    <div className="text-[13px] font-bold text-black font-heading leading-tight">
                      Call Us
                    </div>
                    <a
                      href="tel:+919876543210"
                      className="text-[#4A4542] text-[13px] hover:text-[#83453B] transition-colors"
                    >
                      +91 98765 43210
                    </a>
                  </div>
                </div>

                {/* 2. Email Us */}
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-full border border-neutral-400 flex items-center justify-center text-black shrink-0">
                    <Mail size={17} strokeWidth={1.6} />
                  </div>
                  <div>
                    <div className="text-[13px] font-bold text-black font-heading leading-tight">
                      Email Us
                    </div>
                    <a
                      href="mailto:info@philosalon.in"
                      className="text-[#4A4542] text-[13px] hover:text-[#83453B] transition-colors"
                    >
                      info@philosalon.in
                    </a>
                  </div>
                </div>

                {/* 3. WhatsApp - 3 Branches */}
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-full border border-neutral-400 flex items-center justify-center text-black shrink-0 mt-0.5">
                    <MessageCircle size={17} strokeWidth={1.6} />
                  </div>
                  <div>
                    <div className="text-[13px] font-bold text-black font-heading leading-tight mb-1.5">
                      WhatsApp Branch Numbers
                    </div>
                    <div className="space-y-1 text-[13px]">
                      <div className="flex items-center gap-1.5">
                        <span className="text-neutral-500 font-medium text-xs">Lake Town:</span>
                        <a
                          href="https://wa.me/919330362726"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#83453B] font-semibold hover:underline"
                        >
                          +91 93303 62726
                        </a>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-neutral-500 font-medium text-xs">HB Town:</span>
                        <a
                          href="https://wa.me/917980357947"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#83453B] font-semibold hover:underline"
                        >
                          +91 79803 57947
                        </a>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-neutral-500 font-medium text-xs">Parthopur:</span>
                        <a
                          href="https://wa.me/91629061165"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#83453B] font-semibold hover:underline"
                        >
                          +91 62906 1165
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 4. Instagram */}
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-full border border-neutral-400 flex items-center justify-center text-black shrink-0">
                    <Instagram size={17} strokeWidth={1.6} />
                  </div>
                  <div>
                    <div className="text-[13px] font-bold text-black font-heading leading-tight">
                      Instagram
                    </div>
                    <a
                      href="https://www.instagram.com/philosalon.in/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#4A4542] text-[13px] hover:text-[#83453B] transition-colors"
                    >
                      @philosalon.in
                    </a>
                  </div>
                </div>

                {/* 5. Facebook */}
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-full border border-neutral-400 flex items-center justify-center text-black shrink-0">
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-black" aria-hidden="true">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-[13px] font-bold text-black font-heading leading-tight">
                      Facebook
                    </div>
                    <a
                      href="https://www.facebook.com/philosalonofficial/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#4A4542] text-[13px] hover:text-[#83453B] transition-colors"
                    >
                      @philosalonofficial
                    </a>
                  </div>
                </div>

                {/* 6. YouTube */}
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-full border border-neutral-400 flex items-center justify-center text-black shrink-0">
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-black" aria-hidden="true">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-[13px] font-bold text-black font-heading leading-tight">
                      YouTube
                    </div>
                    <a
                      href="https://www.youtube.com/@philosalon"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#4A4542] text-[13px] hover:text-[#83453B] transition-colors"
                    >
                      @philosalon
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. FREQUENTLY ASKED QUESTIONS Section */}
      <section className="w-full bg-white pb-24 sm:pb-32 px-6 sm:px-10 lg:px-20 overflow-hidden">
        <div className="max-w-[880px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: luxuryEase }}
            className="text-center mb-10"
          >
            <h2 className="font-serif-heading text-black text-2xl sm:text-3xl lg:text-[34px] font-bold tracking-tight uppercase">
              FREQUENTLY ASKED QUESTIONS
            </h2>
            <div className="w-12 h-[2px] bg-black mx-auto mt-2.5 mb-2"></div>
          </motion.div>

          {/* Accordion list */}
          <div className="border-t border-[#E8E2DD]">
            {faqs.map((faq, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.08, ease: luxuryEase }}
                className="border-b border-[#E8E2DD]"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full py-4 sm:py-5 flex items-center justify-between text-left cursor-pointer group"
                >
                  <span className="text-[13px] sm:text-[14px] text-neutral-800 font-normal group-hover:text-black transition-colors">
                    {faq.q}
                  </span>
                  <span className="text-neutral-500 group-hover:text-black transition-colors shrink-0 ml-4">
                    {openFaq === idx ? <Minus size={16} /> : <Plus size={16} />}
                  </span>
                </button>

                <AnimatePresence>
                  {openFaq === idx && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.35, ease: luxuryEase }}
                      className="overflow-hidden"
                    >
                      <div className="pb-5 pt-1 text-[13px] text-neutral-600 leading-relaxed font-light">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Bottom Monochrome Footer matching reference design */}
      <Footer onNavigate={onNavigate} onOpenBooking={onOpenBooking} />
    </div>
  );
}
