/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import Footer from './components/Footer.tsx';

const luxuryEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface AboutPageProps {
  onNavigate: (page: 'home' | 'about' | 'contact' | 'location' | 'gallery' | 'services', hash?: string) => void;
  onOpenBooking: () => void;
}

export default function AboutPage({ onNavigate, onOpenBooking }: AboutPageProps) {
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
            className="text-[#83453B] font-semibold tracking-[0.24em] py-1 cursor-pointer transition-colors"
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
            className="hover:text-[#83453B] tracking-[0.24em] transition-colors py-1 cursor-pointer"
          >
            CONTACT
          </button>
        </nav>
      </motion.header>

      {/* 2. Top Hero Banner with PHILO3057 requested editorial image */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: luxuryEase }}
        className="w-full relative h-[420px] sm:h-[500px] md:h-[580px] lg:h-[650px] overflow-hidden bg-[#1a0a07]"
      >
        <img
          src="/assets/about/about_hero_top.jpg"
          alt="Philo Salon Artistry & Heritage"
          className="w-full h-full object-cover object-center"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src =
              'https://res.cloudinary.com/kbiolcw6/image/upload/v1793618576/PHILO3057-2mb_acit3b.jpg';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />
      </motion.section>

      {/* 3. Section: About Us */}
      <section className="w-full bg-white py-16 sm:py-20 lg:py-24 px-6 sm:px-10 lg:px-20 overflow-hidden">
        <div className="max-w-[960px] mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.85, ease: luxuryEase }}
            className="font-heading text-[#9A554A] text-4xl sm:text-5xl lg:text-[56px] font-normal tracking-wide text-center mb-3"
          >
            About Us
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.85, delay: 0.15, ease: luxuryEase }}
            className="text-black font-semibold text-base sm:text-lg lg:text-[20px] tracking-[0.08em] uppercase text-center mb-10 leading-snug"
          >
            A DREAM SHAPED BY PASSION.<br />A JOURNEY BUILT ON TRUST
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.9, delay: 0.25, ease: luxuryEase }}
            className="text-[#4A4542] text-[13px] sm:text-[14px] leading-[1.85] font-light text-justify max-w-[880px] mx-auto"
          >
            Welcome to PHILO, where hair, heart and sustainability come together to create a magic. We are not just a hair salon for you—we are a place where your confidence comes to life with our craftsmanship. And every strand tells a story. Our journey began with the dream of two visionaries, Philoman Lepcha and Tanmay Saha. Philoman, a gifted hairstylist with years of experience in Sodepur, earned the affectionate nickname “PHILO” from clients who saw him as more than just a stylist—they saw him as an artist. Inspired by this love, he opened the doors to PHILO in June 2022, a place where beauty would meet purpose. At PHILO, we believe that hair is your expression and personality. That’s why we pour our hearts into understanding your dreams, your style, and your personality. Trust our expert skills for a playful cut, a bold new color, or a breathtaking transformation. We’re here to make you feel confident, empowered, and radiant with every look. But our mission isn’t just about the theme, it’s about so much more. We’re deeply passionate, dedicated, and committed to our sustainability. That’s why we take care of our hair in an environmentally friendly way by using the highest quality products. We’re proving that looking good makes you feel good and more confident. This self-expression is important for you and the world around you. PHILO isn’t just a salon; it’s a home for creativity, connection, and care. We’ve built a space where you’re not just another client—you’re part of our family. Here, you’ll find warmth, inclusivity, and a team that’s as passionate about your happiness as you are. When you step into PHILO, you’re stepping into a story—a story of passion, purpose, and people. Let us help you embrace your beauty, celebrate your uniqueness, and leave with more than just great hair—you’ll leave with confidence that shines as bright as you do. Come, be part of something special. Let PHILO show you what it means to truly love your hair—and the planet we share.
          </motion.div>
        </div>
      </section>

      {/* 4. Ornamental Divider */}
      <section className="w-full bg-white pb-14 px-6 sm:px-10 overflow-hidden">
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

      {/* 5. Section: OUR PHILOSOPHY */}
      <section className="w-full bg-white pb-20 sm:pb-24 px-6 sm:px-10 lg:px-16 overflow-hidden">
        <div className="max-w-[1360px] mx-auto">
          {/* Section Heading & Subtitle */}
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.85, ease: luxuryEase }}
              className="font-heading text-[#9A554A] text-3xl sm:text-4xl lg:text-[46px] font-normal tracking-[0.05em] uppercase mb-2.5"
            >
              OUR PHILOSOPHY
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.85, delay: 0.15, ease: luxuryEase }}
              className="text-black font-semibold text-[13px] sm:text-[14px] tracking-[0.16em] uppercase"
            >
              BEAUTY WITH A PURPOSE. CARE WITH A PERSONAL TOUCH.
            </motion.div>
          </div>

          {/* Grid Layout: Left 4 Icons (2x2), Right Tall Black Box */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
            {/* Left Column: 4 Values Grid */}
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-y-12 gap-x-8 text-center self-center py-4">
              {/* 1. CRAFTSMANSHIP */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.75, delay: 0.1, ease: luxuryEase }}
                className="flex flex-col items-center"
              >
                <div className="w-20 h-20 flex items-center justify-center mb-4">
                  <img
                    src="/assets/craftsmanship_icon.png"
                    alt="Craftsmanship"
                    className="w-18 h-18 sm:w-20 sm:h-20 object-contain hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.currentTarget.src = "https://res.cloudinary.com/kbiolcw6/image/upload/v1793613882/1_k4wsg6.png";
                    }}
                  />
                </div>
                <div className="text-[12px] sm:text-[13px] font-bold tracking-[0.14em] uppercase text-black mb-2 font-heading">
                  CRAFTSMANSHIP
                </div>
                <div className="text-[10px] sm:text-[11px] leading-relaxed uppercase text-[#554F4C] tracking-wide font-normal max-w-[190px]">
                  EVERY DETAIL MATTERS. WE BELIEVE IN SKILL, PRECISION AND CREATIVITY.
                </div>
              </motion.div>

              {/* 2. INDIVIDUALITY */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.75, delay: 0.2, ease: luxuryEase }}
                className="flex flex-col items-center"
              >
                <div className="w-20 h-20 flex items-center justify-center mb-4">
                  <img
                    src="/assets/individuality_icon.png"
                    alt="Individuality"
                    className="w-16 h-16 sm:w-18 sm:h-18 object-contain hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.currentTarget.src = "https://res.cloudinary.com/kbiolcw6/image/upload/v1793613881/2_uutxlb.png";
                    }}
                  />
                </div>
                <div className="text-[12px] sm:text-[13px] font-bold tracking-[0.14em] uppercase text-black mb-2 font-heading">
                  INDIVIDUALITY
                </div>
                <div className="text-[10px] sm:text-[11px] leading-relaxed uppercase text-[#554F4C] tracking-wide font-normal max-w-[190px]">
                  YOUR PERSONALITY INSPIRES THE LOOK. EVERY TRANSFORMATION BEGINS WITH UNDERSTANDING YOU.
                </div>
              </motion.div>

              {/* 3. THOUGHTFUL CARE */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.75, delay: 0.3, ease: luxuryEase }}
                className="flex flex-col items-center"
              >
                <div className="w-20 h-20 flex items-center justify-center mb-4">
                  <img
                    src="/assets/thoughtful_care_icon.png"
                    alt="Thoughtful Care"
                    className="w-16 h-16 sm:w-18 sm:h-18 object-contain hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.currentTarget.src = "https://res.cloudinary.com/kbiolcw6/image/upload/v1793613881/3_vapjwi.png";
                    }}
                  />
                </div>
                <div className="text-[12px] sm:text-[13px] font-bold tracking-[0.14em] uppercase text-black mb-2 font-heading">
                  THOUGHTFUL CARE
                </div>
                <div className="text-[10px] sm:text-[11px] leading-relaxed uppercase text-[#554F4C] tracking-wide font-normal max-w-[190px]">
                  YOUR COMFORT, CONFIDENCE AND EXPERIENCE MATTER AT EVERY STEP.
                </div>
              </motion.div>

              {/* 4. CONSCIOUS BEAUTY */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.75, delay: 0.4, ease: luxuryEase }}
                className="flex flex-col items-center"
              >
                <div className="w-20 h-20 flex items-center justify-center mb-4">
                  <img
                    src="/assets/conscious_beauty_icon.png"
                    alt="Conscious Beauty"
                    className="w-16 h-16 sm:w-18 sm:h-18 object-contain hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.currentTarget.src = "https://res.cloudinary.com/kbiolcw6/image/upload/v1793613881/4_o3p0t6.png";
                    }}
                  />
                </div>
                <div className="text-[12px] sm:text-[13px] font-bold tracking-[0.14em] uppercase text-black mb-2 font-heading">
                  CONSCIOUS BEAUTY
                </div>
                <div className="text-[10px] sm:text-[11px] leading-relaxed uppercase text-[#554F4C] tracking-wide font-normal max-w-[190px]">
                  WE VALUE RESPONSIBLE CHOICES AND MINDFUL BEAUTY PRACTICES
                </div>
              </motion.div>
            </div>

            {/* Right Column: Philo Salon Lookbook / Artistry Imagery */}
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.9, ease: luxuryEase }}
                className="w-full min-h-[460px] lg:min-h-[580px] h-full overflow-hidden shadow-xl bg-[#F4EFEA] group"
              >
                <img
                  src="/assets/salon/lookbook.jpg"
                  alt="Philo Salon Lookbook"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      'https://philosalon.in/wp-content/uploads/2025/02/lookbook.jpg';
                  }}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Section: OUR PROMISE (with Salon Craftsmanship on left) */}
      <section className="w-full bg-white pb-20 sm:pb-24 px-6 sm:px-10 lg:px-16 overflow-hidden">
        <div className="max-w-[1360px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Salon Craftsmanship Imagery from philosalon.in */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.9, ease: luxuryEase }}
              className="w-full h-[480px] sm:h-[560px] overflow-hidden shadow-xl bg-[#F4EFEA] group"
            >
              <img
                src="/assets/salon/gallery_1.jpg"
                alt="Philo Salon Promise and Mastery"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    'https://philosalon.in/wp-content/uploads/2025/02/DSC_7870-scaled.jpg';
                }}
              />
            </motion.div>
          </div>

          {/* Right Column: OUR PROMISE Copy */}
          <div className="lg:col-span-7 pt-2 lg:pt-4 pl-0 lg:pl-6">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.85, ease: luxuryEase }}
              className="font-heading text-[#9A554A] text-3xl sm:text-4xl lg:text-[50px] font-normal tracking-[0.05em] uppercase mb-4"
            >
              OUR PROMISE
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.85, delay: 0.1, ease: luxuryEase }}
              className="text-black font-bold text-base sm:text-lg lg:text-[20px] tracking-[0.06em] uppercase leading-tight mb-8"
            >
              YOU ARE NEVER JUST<br />ANOTHER APPOINTMENT.
            </motion.div>

            <div className="text-[#4E4845] text-[12px] sm:text-[13px] leading-[1.8] font-light uppercase space-y-6 max-w-[680px] tracking-wide">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.75, delay: 0.2, ease: luxuryEase }}
              >
                YOU ARE AN INDIVIDUAL WITH YOUR OWN STYLE, PREFERENCES AND STORY.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.75, delay: 0.3, ease: luxuryEase }}
              >
                WE TAKE THE TIME TO LISTEN, UNDERSTAND AND RECOMMEND WHAT WORKS FOR YOU.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.75, delay: 0.4, ease: luxuryEase }}
              >
                FROM YOUR FIRST CONSULTATION TO THE FINAL FINISHING TOUCH, OUR PROMISE IS TO MAKE EVERY VISIT FEEL WELCOMING, CONSIDERED AND PERSONAL.
              </motion.p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Ornamental Divider */}
      <section className="w-full bg-white pb-14 px-6 sm:px-10 overflow-hidden">
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

      {/* 8. Section: OUR VISION & OUR MISSION (with Box 7 on right) */}
      <section className="w-full bg-white pb-20 sm:pb-24 px-6 sm:px-10 lg:px-16 overflow-hidden">
        <div className="max-w-[1360px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
          {/* Left Column: Vision & Mission Blocks */}
          <div className="lg:col-span-7 pr-0 lg:pr-6 flex flex-col justify-between">
            {/* OUR VISION */}
            <div className="mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: luxuryEase }}
                className="text-black font-bold text-[13px] sm:text-[14px] tracking-[0.14em] uppercase mb-1.5 font-heading"
              >
                OUR VISION
              </motion.div>

              <motion.h3
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.85, delay: 0.1, ease: luxuryEase }}
                className="font-heading text-[#9A554A] text-3xl sm:text-4xl lg:text-[44px] font-bold leading-[1.12] tracking-tight uppercase mb-4"
              >
                REDEFINING BEAUTY.<br />INSPIRING CONFIDENCE.
              </motion.h3>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2, ease: luxuryEase }}
                className="text-[#4E4845] text-[12px] sm:text-[13px] leading-[1.8] font-light uppercase tracking-wide text-justify"
              >
                WE ENVISION A WORLD WHERE BEAUTY GOES BEYOND APPEARANCE — WHERE EVERY INDIVIDUAL FEELS VALUED, CELEBRATED AND CONFIDENT IN THEIR OWN IDENTITY. AT PHILO, WE ASPIRE TO CREATE MORE THAN BEAUTIFUL TRANSFORMATIONS; WE WANT TO CREATE MOMENTS THAT INSPIRE SELF-LOVE, EMPOWER INDIVIDUALITY AND LEAVE A LASTING FEELING OF CONFIDENCE. BECAUSE TRUE BEAUTY ISN’T ABOUT BECOMING SOMEONE ELSE. IT’S ABOUT FEELING EXTRAORDINARY AS YOURSELF.
              </motion.p>
            </div>

            {/* OUR MISSION */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: luxuryEase }}
                className="text-black font-bold text-[13px] sm:text-[14px] tracking-[0.14em] uppercase mb-1.5 font-heading"
              >
                OUR MISSION
              </motion.div>

              <motion.h3
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.85, delay: 0.1, ease: luxuryEase }}
                className="font-heading text-[#9A554A] text-3xl sm:text-4xl lg:text-[44px] font-bold leading-[1.12] tracking-tight uppercase mb-4"
              >
                CRAFTING BEAUTY.<br />CREATING EXPERIENCES.
              </motion.h3>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2, ease: luxuryEase }}
                className="text-[#4E4845] text-[12px] sm:text-[13px] leading-[1.8] font-light uppercase tracking-wide space-y-4 text-justify"
              >
                <p>
                  OUR MISSION IS TO MAKE EVERY INDIVIDUAL FEEL VALUED, UNDERSTOOD AND BEAUTIFUL IN THEIR OWN WAY. THROUGH HEARTFELT CARE, PROFESSIONAL ARTISTRY AND A PASSION FOR PERFECTION, WE STRIVE TO CREATE EXPERIENCES THAT GO BEYOND BEAUTY SERVICES — TOUCHING LIVES, UPLIFTING CONFIDENCE AND BRINGING OUT THE BEAUTY THAT ALREADY EXISTS WITHIN EVERY PERSON.
                </p>
                <p>
                  AT PHILO, WE DON'T JUST CREATE BEAUTIFUL LOOKS; WE CREATE MOMENTS THAT REMIND PEOPLE HOW BEAUTIFUL THEY TRULY ARE.
                </p>
              </motion.div>
            </div>
          </div>

          {/* Right Column: Philo Salon Transformation Imagery */}
          <div className="lg:col-span-5 h-full">
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.9, ease: luxuryEase }}
              className="w-full h-[520px] sm:h-[620px] lg:h-full min-h-[520px] overflow-hidden shadow-xl bg-[#F4EFEA] group"
            >
              <img
                src="/assets/salon/founder_philo.jpg"
                alt="Philo Salon Vision and Mission"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    'https://philosalon.in/wp-content/uploads/2025/02/about-images.jpg';
                }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 9. Section: Row of Three Salon Masterpiece Showcases */}
      <section className="w-full bg-white pb-20 sm:pb-24 px-6 sm:px-10 lg:px-16 overflow-hidden">
        <div className="max-w-[1360px] mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
          {[
            {
              src: '/assets/salon/gallery_2.jpg',
              alt: 'Philo Salon Haute Coiffure',
              fallback: 'https://philosalon.in/wp-content/uploads/2025/02/MNP_7466-scaled-1.jpg',
            },
            {
              src: '/assets/salon/gallery_3.jpg',
              alt: 'Philo Salon Texture and Movement',
              fallback: 'https://philosalon.in/wp-content/uploads/2025/02/MNP_7461-scaled-1.jpg',
            },
            {
              src: '/assets/salon/artistry_3.jpg',
              alt: 'Philo Salon Modern Chic',
              fallback: 'https://philosalon.in/wp-content/uploads/2025/02/team3.jpg',
            },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 35, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.85, delay: idx * 0.15, ease: luxuryEase }}
              whileHover={{ scale: 1.02 }}
              className="w-full h-[360px] sm:h-[440px] lg:h-[500px] overflow-hidden shadow-lg bg-[#F4EFEA] group"
            >
              <img
                src={item.src}
                alt={item.alt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = item.fallback;
                }}
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* 10. Section: OUR FUTURE OUTLOOK */}
      <section className="w-full bg-white pb-24 sm:pb-32 px-6 sm:px-10 lg:px-20 overflow-hidden">
        <div className="max-w-[960px] mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.8, ease: luxuryEase }}
            className="font-heading text-black font-bold text-2xl sm:text-3xl lg:text-[34px] tracking-[0.08em] uppercase mb-3"
          >
            OUR FUTURE OUTLOOK
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.85, delay: 0.1, ease: luxuryEase }}
            className="font-heading text-black font-bold text-lg sm:text-xl lg:text-[24px] tracking-tight uppercase mb-10 leading-snug"
          >
            A FUTURE WHERE BEAUTY INSPIRES,<br />
            CONFIDENCE LIVES & EVERY STORY MATTERS.
          </motion.div>

          <div className="text-[#4E4845] text-[12px] sm:text-[13px] leading-[1.85] font-light uppercase tracking-wide text-justify space-y-4 max-w-[880px] mx-auto">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, delay: 0.2, ease: luxuryEase }}
            >
              AT PHILO, WE DREAM OF BUILDING MORE THAN A BEAUTY DESTINATION. WE ASPIRE TO CREATE A LEGACY BUILT ON TRUST, PASSION AND THE COUNTLESS LIVES WE TOUCH THROUGH THE ART OF BEAUTY.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, delay: 0.3, ease: luxuryEase }}
            >
              AS WE GROW, OUR PROMISE REMAINS UNCHANGED — TO MAKE EVERY INDIVIDUAL FEEL SEEN, VALUED AND CONFIDENT IN THEIR OWN SKIN. WE ENVISION BRINGING NEW POSSIBILITIES TO BEAUTY THROUGH EVOLVING ARTISTRY, MEANINGFUL EXPERIENCES AND A DEEPER UNDERSTANDING OF WHAT MAKES EVERY PERSON UNIQUE. OUR JOURNEY IS NOT SIMPLY ABOUT REACHING NEW MILESTONES OR OPENING NEW DOORS; IT IS ABOUT CREATING SOMETHING THAT PEOPLE CONNECT WITH, BELIEVE IN AND PROUDLY BECOME A PART OF.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, delay: 0.4, ease: luxuryEase }}
            >
              BECAUSE OUR GREATEST ACHIEVEMENT WILL NEVER BE HOW FAR PHILO GROWS, BUT HOW MANY LIVES WE MAKE FEEL A LITTLE MORE BEAUTIFUL ALONG THE WAY.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, delay: 0.5, ease: luxuryEase }}
              className="pt-2 font-normal text-black"
            >
              PHILO — GROWING WITH PURPOSE. TOUCHING LIVES THROUGH BEAUTY.
            </motion.p>
          </div>
        </div>
      </section>

      {/* 9. Bottom Monochrome Footer matching reference design */}
      <Footer onNavigate={onNavigate} onOpenBooking={onOpenBooking} />
    </div>
  );
}
