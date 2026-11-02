/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, Calendar, ChevronRight } from 'lucide-react';
import Footer from './components/Footer.tsx';

const luxuryEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface GalleryPageProps {
  onNavigate: (page: 'home' | 'about' | 'contact' | 'location' | 'gallery' | 'services', hash?: string) => void;
  onOpenBooking: () => void;
}

interface GalleryItem {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  fallback: string;
}

const galleryData: Record<number, GalleryItem> = {
  1: {
    id: 1,
    title: 'Editorial Hair Styling',
    category: 'Hair Artistry',
    description: 'Sculpted silhouettes and high-fashion editorial styling curated by Philo artists.',
    image: '/assets/salon/gallery_1.jpg',
    fallback: 'https://philosalon.in/wp-content/uploads/2025/02/DSC_7870-scaled.jpg',
  },
  2: {
    id: 2,
    title: 'Chocolate Caramel Textured Waves',
    category: 'Color & Styling',
    description: 'Rich dimensional caramel ribbons woven through deep chocolate tones, finished with voluminous beach waves.',
    image: '/assets/gallery/gallery_user_1.jpg',
    fallback: 'https://res.cloudinary.com/kbiolcw6/image/upload/v1793617383/sdse_3_nhzsce.jpg',
  },
  3: {
    id: 3,
    title: 'Golden Honey Blonde Face-Framing Balayage',
    category: 'Blonde & Highlights',
    description: 'Bright sun-drenched golden honey highlights with seamless root melt and glamorous red-carpet waves.',
    image: '/assets/gallery/gallery_batch2_2.jpg',
    fallback: 'https://res.cloudinary.com/kbiolcw6/image/upload/v1793617695/to_day_2_wryvly.jpg',
  },
  4: {
    id: 4,
    title: 'The Signature Philo Experience',
    category: 'Salon Showcase',
    description: 'A grand sanctuary of contemporary luxury, artistic mastery, and tranquil pampering.',
    image: '/assets/salon/hero_banner_1.jpg',
    fallback: 'https://philosalon.in/wp-content/uploads/2025/02/WhatsApp-Image-2025-02-25-at-6.00.08-PM.jpeg',
  },
  5: {
    id: 5,
    title: 'Wispy Curtain Bangs & Feathered Layers',
    category: 'Bangs & Layering',
    description: 'Flirtatious airy wispy bangs tailored to open the face, seamlessly flowing into soft feathered brunette lengths.',
    image: '/assets/gallery/gallery_batch2_4.jpg',
    fallback: 'https://res.cloudinary.com/kbiolcw6/image/upload/v1793617695/sdse_1_pjhnwl.jpg',
  },
  6: {
    id: 6,
    title: 'Vanilla Cream Ribbon Balayage',
    category: 'Blonde & Highlights',
    description: 'Delicate high-contrast vanilla ribbon highlights framing rich chocolate undertones, finished in a signature cascaded wave.',
    image: '/assets/gallery/gallery_batch2_5.jpg',
    fallback: 'https://res.cloudinary.com/kbiolcw6/image/upload/v1793617697/to_day_1_wuuzwk.jpg',
  },
  7: {
    id: 7,
    title: 'Radiant Mocha Glamour Waves',
    category: 'Signature Styling',
    description: 'Multi-tonal mocha blends with sweeping curtain layers that accentuate movement, shine, and effortless glam.',
    image: '/assets/gallery/gallery_user_4.jpg',
    fallback: 'https://res.cloudinary.com/kbiolcw6/image/upload/v1793617377/12_3_gtat0y.jpg',
  },
  8: {
    id: 8,
    title: 'Honey Bronde Face-Framing Glow',
    category: 'Luxury Balayage',
    description: 'Sunlit bronde hues crafted for seamless regrowth, offering rich warmth and a sculpted, healthy glow.',
    image: '/assets/gallery/gallery_user_5.jpg',
    fallback: 'https://res.cloudinary.com/kbiolcw6/image/upload/v1793617375/786_3_ojhshu.jpg',
  },
  9: {
    id: 9,
    title: 'Champagne Bronde Cascading Balayage',
    category: 'Balayage & Ombré',
    description: 'A masterclass in hair illumination—champagne ribbons softly melting over rich dark bases with flowing glamour curls.',
    image: '/assets/gallery/gallery_batch2_7.jpg',
    fallback: 'https://res.cloudinary.com/kbiolcw6/image/upload/v1793617712/ug_1_kq3wha.jpg',
  },
  10: {
    id: 10,
    title: 'Backstage Craftsmanship & Artistry',
    category: 'Philo Academy',
    description: 'Meticulous techniques and behind-the-scenes passion poured into every transformation.',
    image: '/assets/salon/hero_banner_2.png',
    fallback: 'https://philosalon.in/wp-content/uploads/2025/02/philo-banner-2.png',
  },
  11: {
    id: 11,
    title: 'Honey Caramel Ombré Cascades',
    category: 'Master Stylist Craft',
    description: 'Seamless melt from rich espresso roots into luminous honey caramel cascading curls, sculpted by Philo masters.',
    image: '/assets/gallery/gallery_user_7.jpg',
    fallback: 'https://res.cloudinary.com/kbiolcw6/image/upload/v1793617374/nm_env17y.jpg',
  },
  12: {
    id: 12,
    title: 'Caramel Mocha Silk Waves',
    category: 'Brunette & Mocha',
    description: 'Deep glossy espresso base infused with multi-dimensional caramel mocha babylights and mirror shine.',
    image: '/assets/gallery/gallery_batch2_3.jpg',
    fallback: 'https://res.cloudinary.com/kbiolcw6/image/upload/v1793617695/sdse_2_y6jlal.jpg',
  },
  13: {
    id: 13,
    title: 'Smoky Ash Brown Velvet Blowout',
    category: 'Gloss & Smoothing',
    description: 'Modern cool ash tones paired with a luxurious volume blowout and sweeping curtain bangs.',
    image: '/assets/gallery/gallery_user_6.jpg',
    fallback: 'https://res.cloudinary.com/kbiolcw6/image/upload/v1793617312/1_2_im11tw.jpg',
  },
  14: {
    id: 14,
    title: 'Chocolate Caramel Textured Waves',
    category: 'Balayage & Ombré',
    description: 'Rich dimensional caramel ribbons woven through deep chocolate tones, finished with voluminous beach waves.',
    image: '/assets/gallery/gallery_user_1.jpg',
    fallback: 'https://res.cloudinary.com/kbiolcw6/image/upload/v1793617383/sdse_3_nhzsce.jpg',
  },
  15: {
    id: 15,
    title: 'Golden Balayage Glass Hair',
    category: 'Gloss & Smoothing',
    description: 'Ultra-reflective glass hair treatment paired with delicate golden honey balayage for sleek, mirror-smooth radiance.',
    image: '/assets/gallery/gallery_user_2.jpg',
    fallback: 'https://res.cloudinary.com/kbiolcw6/image/upload/v1793617377/sdse_2_fregoj.jpg',
  },
  16: {
    id: 16,
    title: 'Soft Brunette Contour Waves',
    category: 'Brunette & Mocha',
    description: 'Bespoke contouring highlights designed to frame facial features with natural warm undertones and gentle bounce.',
    image: '/assets/gallery/gallery_user_3.jpg',
    fallback: 'https://res.cloudinary.com/kbiolcw6/image/upload/v1793617374/234_xhouuy.jpg',
  },
  17: {
    id: 17,
    title: 'Radiant Mocha Glamour Waves',
    category: 'Brunette & Mocha',
    description: 'Multi-tonal mocha blends with sweeping curtain layers that accentuate movement, shine, and effortless glam.',
    image: '/assets/gallery/gallery_user_4.jpg',
    fallback: 'https://res.cloudinary.com/kbiolcw6/image/upload/v1793617377/12_3_gtat0y.jpg',
  },
  18: {
    id: 18,
    title: 'Honey Bronde Face-Framing Glow',
    category: 'Balayage & Ombré',
    description: 'Sunlit bronde hues crafted for seamless regrowth, offering rich warmth and a sculpted, healthy glow.',
    image: '/assets/gallery/gallery_user_5.jpg',
    fallback: 'https://res.cloudinary.com/kbiolcw6/image/upload/v1793617375/786_3_ojhshu.jpg',
  },
  19: {
    id: 19,
    title: 'Smoky Ash Brown Velvet Blowout',
    category: 'Gloss & Smoothing',
    description: 'Modern cool ash tones paired with a luxurious volume blowout and sweeping curtain bangs.',
    image: '/assets/gallery/gallery_user_6.jpg',
    fallback: 'https://res.cloudinary.com/kbiolcw6/image/upload/v1793617312/1_2_im11tw.jpg',
  },
  20: {
    id: 20,
    title: 'Honey Caramel Ombré Cascades',
    category: 'Balayage & Ombré',
    description: 'Seamless melt from rich espresso roots into luminous honey caramel cascading curls, sculpted by Philo masters.',
    image: '/assets/gallery/gallery_user_7.jpg',
    fallback: 'https://res.cloudinary.com/kbiolcw6/image/upload/v1793617374/nm_env17y.jpg',
  },
  21: {
    id: 21,
    title: 'Golden Honey Blonde Face-Framing Balayage',
    category: 'Blonde & Highlights',
    description: 'Bright sun-drenched golden honey highlights with seamless root melt and glamorous red-carpet waves.',
    image: '/assets/gallery/gallery_batch2_2.jpg',
    fallback: 'https://res.cloudinary.com/kbiolcw6/image/upload/v1793617695/to_day_2_wryvly.jpg',
  },
  22: {
    id: 22,
    title: 'Caramel Mocha Silk Waves',
    category: 'Brunette & Mocha',
    description: 'Deep glossy espresso base infused with multi-dimensional caramel mocha babylights and mirror shine.',
    image: '/assets/gallery/gallery_batch2_3.jpg',
    fallback: 'https://res.cloudinary.com/kbiolcw6/image/upload/v1793617695/sdse_2_y6jlal.jpg',
  },
  23: {
    id: 23,
    title: 'Wispy Curtain Bangs & Feathered Layers',
    category: 'Bangs & Layering',
    description: 'Flirtatious airy wispy bangs tailored to open the face, seamlessly flowing into soft feathered brunette lengths.',
    image: '/assets/gallery/gallery_batch2_4.jpg',
    fallback: 'https://res.cloudinary.com/kbiolcw6/image/upload/v1793617695/sdse_1_pjhnwl.jpg',
  },
  24: {
    id: 24,
    title: 'Vanilla Cream Ribbon Balayage',
    category: 'Blonde & Highlights',
    description: 'Delicate high-contrast vanilla ribbon highlights framing rich chocolate undertones, finished in a signature cascaded wave.',
    image: '/assets/gallery/gallery_batch2_5.jpg',
    fallback: 'https://res.cloudinary.com/kbiolcw6/image/upload/v1793617697/to_day_1_wuuzwk.jpg',
  },
  25: {
    id: 25,
    title: 'Amber Chestnut Textured Balayage',
    category: 'Brunette & Mocha',
    description: 'Warm amber and rich chestnut dimensional tones designed for long-lasting vibrant sheen and effortless texture.',
    image: '/assets/gallery/gallery_batch2_6.jpg',
    fallback: 'https://res.cloudinary.com/kbiolcw6/image/upload/v1793617703/sdse_3_wehbmf.jpg',
  },
  26: {
    id: 26,
    title: 'Champagne Bronde Cascading Balayage',
    category: 'Balayage & Ombré',
    description: 'A masterclass in hair illumination—champagne ribbons softly melting over rich dark bases with flowing glamour curls.',
    image: '/assets/gallery/gallery_batch2_7.jpg',
    fallback: 'https://res.cloudinary.com/kbiolcw6/image/upload/v1793617712/ug_1_kq3wha.jpg',
  },
  101: {
    id: 101,
    title: 'Architectural Sculpted Waves',
    category: 'Haute Couture Styling',
    description: 'Precision sculpted wave architecture paired with high-impact dimensional light reflection for the 2026-2027 runway season.',
    image: '/assets/trends/trend_1.jpg',
    fallback: 'https://res.cloudinary.com/kbiolcw6/image/upload/v1793618585/PHILO3100-2mb_xndxk2.jpg',
  },
  102: {
    id: 102,
    title: 'Editorial High-Gloss Silhouette',
    category: 'Runway Gloss & Finish',
    description: 'Ultra-reflective glass gloss finish paired with organic flowing silhouettes, redefining modern minimalist salon luxury for 2026-2027.',
    image: '/assets/trends/trend_2.jpg',
    fallback: 'https://res.cloudinary.com/kbiolcw6/image/upload/v1793618585/PHILO2761-2mb_gh8xzq.jpg',
  },
  103: {
    id: 103,
    title: 'Sculpted Contour Dynamics',
    category: 'Avant-Garde Dimension',
    description: 'Bespoke facial contouring through sculpted texture and directional light placement, forecast for late 2026 & 2027.',
    image: '/assets/trends/trend_3.jpg',
    fallback: 'https://res.cloudinary.com/kbiolcw6/image/upload/v1793618583/PHILO2836-2mb_zqglsn.jpg',
  },
  104: {
    id: 104,
    title: 'Dimensional Bronde Future Melt',
    category: 'Next-Gen Balayage',
    description: 'A seamless transition of warm bronde and cool champagne micro-ribbons designed for effortless movement and low-maintenance luxury.',
    image: '/assets/trends/trend_4.jpg',
    fallback: 'https://res.cloudinary.com/kbiolcw6/image/upload/v1793618583/PHILO2973-2mb_m06fd5.jpg',
  },
  105: {
    id: 105,
    title: 'Avant-Garde Fluid Texture',
    category: 'Editorial Volume',
    description: 'Expansive volume with featherlight touch, celebrating organic movement, airiness, and natural individuality for 2026/27.',
    image: '/assets/trends/trend_5.jpg',
    fallback: 'https://res.cloudinary.com/kbiolcw6/image/upload/v1793618581/PHILO2892-2mb_rj4izd.jpg',
  },
  106: {
    id: 106,
    title: 'Modern Velvet Noir Elegance',
    category: 'Precision Cut & Shine',
    description: 'Deep velvet noir tones with razor-sharp clean lines and subtle interior layering for unmatched weightlessness.',
    image: '/assets/trends/trend_6.jpg',
    fallback: 'https://res.cloudinary.com/kbiolcw6/image/upload/v1793618578/PHILO2646-2mb_mwwvsf.jpg',
  },
  107: {
    id: 107,
    title: 'Luminous Cascade Waves',
    category: 'Haute Couture Hairdressing',
    description: 'Interwoven golden ribbons cascading through rich espresso depth, creating a dramatic halo effect under runway lighting.',
    image: '/assets/trends/trend_7.jpg',
    fallback: 'https://res.cloudinary.com/kbiolcw6/image/upload/v1793618577/PHILO2677-2mb_u3xdjg.jpg',
  },
  108: {
    id: 108,
    title: 'The Philo 2026-27 Signature Icon',
    category: 'Iconic Editorial',
    description: 'The defining campaign visual for Philo 2026 & 2027. Flawless symmetry, bespoke tonal nuance, and cinematic salon sophistication.',
    image: '/assets/trends/trend_8.jpg',
    fallback: 'https://res.cloudinary.com/kbiolcw6/image/upload/v1793618576/PHILO3057-2mb_acit3b.jpg',
  },
};

const trends2026_27 = [
  {
    id: 101,
    code: 'PHILO 3100',
    title: 'Architectural Sculpted Waves',
    trendYear: 'TREND 2026-27',
    category: 'Haute Couture Styling',
    description: 'Precision sculpted wave architecture paired with high-impact dimensional light reflection for the 2026-2027 runway season.',
    image: '/assets/trends/trend_1.jpg',
    fallback: 'https://res.cloudinary.com/kbiolcw6/image/upload/v1793618585/PHILO3100-2mb_xndxk2.jpg',
  },
  {
    id: 102,
    code: 'PHILO 2761',
    title: 'Editorial High-Gloss Silhouette',
    trendYear: 'TREND 2026-27',
    category: 'Runway Gloss & Finish',
    description: 'Ultra-reflective glass gloss finish paired with organic flowing silhouettes, redefining modern minimalist salon luxury for 2026-2027.',
    image: '/assets/trends/trend_2.jpg',
    fallback: 'https://res.cloudinary.com/kbiolcw6/image/upload/v1793618585/PHILO2761-2mb_gh8xzq.jpg',
  },
  {
    id: 103,
    code: 'PHILO 2836',
    title: 'Sculpted Contour Dynamics',
    trendYear: 'TREND 2026-27',
    category: 'Avant-Garde Dimension',
    description: 'Bespoke facial contouring through sculpted texture and directional light placement, forecast for late 2026 & 2027.',
    image: '/assets/trends/trend_3.jpg',
    fallback: 'https://res.cloudinary.com/kbiolcw6/image/upload/v1793618583/PHILO2836-2mb_zqglsn.jpg',
  },
  {
    id: 104,
    code: 'PHILO 2973',
    title: 'Dimensional Bronde Future Melt',
    trendYear: 'TREND 2026-27',
    category: 'Next-Gen Balayage',
    description: 'A seamless transition of warm bronde and cool champagne micro-ribbons designed for effortless movement and low-maintenance luxury.',
    image: '/assets/trends/trend_4.jpg',
    fallback: 'https://res.cloudinary.com/kbiolcw6/image/upload/v1793618583/PHILO2973-2mb_m06fd5.jpg',
  },
  {
    id: 105,
    code: 'PHILO 2892',
    title: 'Avant-Garde Fluid Texture',
    trendYear: 'TREND 2026-27',
    category: 'Editorial Volume',
    description: 'Expansive volume with featherlight touch, celebrating organic movement, airiness, and natural individuality for 2026/27.',
    image: '/assets/trends/trend_5.jpg',
    fallback: 'https://res.cloudinary.com/kbiolcw6/image/upload/v1793618581/PHILO2892-2mb_rj4izd.jpg',
  },
  {
    id: 106,
    code: 'PHILO 2646',
    title: 'Modern Velvet Noir Elegance',
    trendYear: 'TREND 2026-27',
    category: 'Precision Cut & Shine',
    description: 'Deep velvet noir tones with razor-sharp clean lines and subtle interior layering for unmatched weightlessness.',
    image: '/assets/trends/trend_6.jpg',
    fallback: 'https://res.cloudinary.com/kbiolcw6/image/upload/v1793618578/PHILO2646-2mb_mwwvsf.jpg',
  },
  {
    id: 107,
    code: 'PHILO 2677',
    title: 'Luminous Cascade Waves',
    trendYear: 'TREND 2026-27',
    category: 'Haute Couture Hairdressing',
    description: 'Interwoven golden ribbons cascading through rich espresso depth, creating a dramatic halo effect under runway lighting.',
    image: '/assets/trends/trend_7.jpg',
    fallback: 'https://res.cloudinary.com/kbiolcw6/image/upload/v1793618577/PHILO2677-2mb_u3xdjg.jpg',
  },
  {
    id: 108,
    code: 'PHILO 3057',
    title: 'The Philo 2026-27 Signature Icon',
    trendYear: 'TREND 2026-27',
    category: 'Iconic Editorial',
    description: 'The defining campaign visual for Philo 2026 & 2027. Flawless symmetry, bespoke tonal nuance, and cinematic salon sophistication.',
    image: '/assets/trends/trend_8.jpg',
    fallback: 'https://res.cloudinary.com/kbiolcw6/image/upload/v1793618576/PHILO3057-2mb_acit3b.jpg',
  },
];

const clientTransformations = [
  {
    id: 14,
    title: 'Chocolate Caramel Textured Waves',
    category: 'Balayage & Ombré',
    tag: 'Balayage Waves',
    description: 'Rich dimensional caramel ribbons woven through deep chocolate tones, finished with voluminous beach waves.',
    image: '/assets/gallery/gallery_user_1.jpg',
    fallback: 'https://res.cloudinary.com/kbiolcw6/image/upload/v1793617383/sdse_3_nhzsce.jpg',
  },
  {
    id: 21,
    title: 'Golden Honey Blonde Face-Framing Balayage',
    category: 'Blonde & Highlights',
    tag: 'Honey Blonde',
    description: 'Bright sun-drenched golden honey highlights with seamless root melt and glamorous red-carpet waves.',
    image: '/assets/gallery/gallery_batch2_2.jpg',
    fallback: 'https://res.cloudinary.com/kbiolcw6/image/upload/v1793617695/to_day_2_wryvly.jpg',
  },
  {
    id: 22,
    title: 'Caramel Mocha Silk Waves',
    category: 'Brunette & Mocha',
    tag: 'Caramel Silk',
    description: 'Deep glossy espresso base infused with multi-dimensional caramel mocha babylights and mirror shine.',
    image: '/assets/gallery/gallery_batch2_3.jpg',
    fallback: 'https://res.cloudinary.com/kbiolcw6/image/upload/v1793617695/sdse_2_y6jlal.jpg',
  },
  {
    id: 23,
    title: 'Wispy Curtain Bangs & Feathered Layers',
    category: 'Bangs & Layering',
    tag: 'Curtain Fringe',
    description: 'Flirtatious airy wispy bangs tailored to open the face, seamlessly flowing into soft feathered brunette lengths.',
    image: '/assets/gallery/gallery_batch2_4.jpg',
    fallback: 'https://res.cloudinary.com/kbiolcw6/image/upload/v1793617695/sdse_1_pjhnwl.jpg',
  },
  {
    id: 24,
    title: 'Vanilla Cream Ribbon Balayage',
    category: 'Blonde & Highlights',
    tag: 'Ribbon Highlights',
    description: 'Delicate high-contrast vanilla ribbon highlights framing rich chocolate undertones, finished in a signature cascaded wave.',
    image: '/assets/gallery/gallery_batch2_5.jpg',
    fallback: 'https://res.cloudinary.com/kbiolcw6/image/upload/v1793617697/to_day_1_wuuzwk.jpg',
  },
  {
    id: 25,
    title: 'Amber Chestnut Textured Balayage',
    category: 'Brunette & Mocha',
    tag: 'Amber Waves',
    description: 'Warm amber and rich chestnut dimensional tones designed for long-lasting vibrant sheen and effortless texture.',
    image: '/assets/gallery/gallery_batch2_6.jpg',
    fallback: 'https://res.cloudinary.com/kbiolcw6/image/upload/v1793617703/sdse_3_wehbmf.jpg',
  },
  {
    id: 26,
    title: 'Champagne Bronde Cascading Balayage',
    category: 'Balayage & Ombré',
    tag: 'Champagne Bronde',
    description: 'A masterclass in hair illumination—champagne ribbons softly melting over rich dark bases with flowing glamour curls.',
    image: '/assets/gallery/gallery_batch2_7.jpg',
    fallback: 'https://res.cloudinary.com/kbiolcw6/image/upload/v1793617712/ug_1_kq3wha.jpg',
  },
  {
    id: 15,
    title: 'Golden Balayage Glass Hair',
    category: 'Gloss & Smoothing',
    tag: 'Glass Gloss',
    description: 'Ultra-reflective glass hair treatment paired with delicate golden honey balayage for sleek, mirror-smooth radiance.',
    image: '/assets/gallery/gallery_user_2.jpg',
    fallback: 'https://res.cloudinary.com/kbiolcw6/image/upload/v1793617377/sdse_2_fregoj.jpg',
  },
  {
    id: 16,
    title: 'Soft Brunette Contour Waves',
    category: 'Brunette & Mocha',
    tag: 'Contour Waves',
    description: 'Bespoke contouring highlights designed to frame facial features with natural warm undertones and gentle bounce.',
    image: '/assets/gallery/gallery_user_3.jpg',
    fallback: 'https://res.cloudinary.com/kbiolcw6/image/upload/v1793617374/234_xhouuy.jpg',
  },
  {
    id: 17,
    title: 'Radiant Mocha Glamour Waves',
    category: 'Brunette & Mocha',
    tag: 'Glamour Waves',
    description: 'Multi-tonal mocha blends with sweeping curtain layers that accentuate movement, shine, and effortless glam.',
    image: '/assets/gallery/gallery_user_4.jpg',
    fallback: 'https://res.cloudinary.com/kbiolcw6/image/upload/v1793617377/12_3_gtat0y.jpg',
  },
  {
    id: 18,
    title: 'Honey Bronde Face-Framing Glow',
    category: 'Balayage & Ombré',
    tag: 'Face-Framing',
    description: 'Sunlit bronde hues crafted for seamless regrowth, offering rich warmth and a sculpted, healthy glow.',
    image: '/assets/gallery/gallery_user_5.jpg',
    fallback: 'https://res.cloudinary.com/kbiolcw6/image/upload/v1793617375/786_3_ojhshu.jpg',
  },
  {
    id: 19,
    title: 'Smoky Ash Brown Velvet Blowout',
    category: 'Gloss & Smoothing',
    tag: 'Curtain Bangs',
    description: 'Modern cool ash tones paired with a luxurious volume blowout and sweeping curtain bangs.',
    image: '/assets/gallery/gallery_user_6.jpg',
    fallback: 'https://res.cloudinary.com/kbiolcw6/image/upload/v1793617312/1_2_im11tw.jpg',
  },
  {
    id: 20,
    title: 'Honey Caramel Ombré Cascades',
    category: 'Balayage & Ombré',
    tag: 'Ombré Melt',
    description: 'Seamless melt from rich espresso roots into luminous honey caramel cascading curls, sculpted by Philo masters.',
    image: '/assets/gallery/gallery_user_7.jpg',
    fallback: 'https://res.cloudinary.com/kbiolcw6/image/upload/v1793617374/nm_env17y.jpg',
  },
];

export default function GalleryPage({ onNavigate, onOpenBooking }: GalleryPageProps) {
  const [selectedBox, setSelectedBox] = useState<GalleryItem | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const openItem = (num: number) => {
    setSelectedBox(galleryData[num] || {
      id: num,
      title: `Philo Showcase ${num}`,
      category: 'Artistry & Styling',
      description: 'Capturing moments of beauty, transformation, and individual style at Philo.',
    });
  };

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
            className="text-[#83453B] font-semibold tracking-[0.24em] py-1 cursor-pointer transition-colors"
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

      {/* 2. Top Banner Header: GALLERY */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, ease: luxuryEase }}
        className="w-full bg-[#320805] py-5 sm:py-6 px-4"
      >
        <h1 className="text-white text-3xl sm:text-4xl md:text-[44px] font-bold tracking-[0.16em] uppercase text-center font-heading">
          GALLERY
        </h1>
      </motion.div>

      {/* 3. Section Title, Subtitle, Intro Text & Medallion Divider */}
      <section className="w-full bg-white pt-12 sm:pt-16 pb-8 sm:pb-12 px-6 sm:px-10 lg:px-16 overflow-hidden">
        <div className="max-w-[1040px] mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: luxuryEase }}
            className="font-heading text-[#320805] text-3xl sm:text-4xl md:text-[46px] font-bold leading-tight tracking-[0.05em] uppercase"
          >
            A GLIMPSE INTO PHILO
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15, ease: luxuryEase }}
            className="text-[#231F20] text-sm sm:text-base md:text-[16px] tracking-[0.16em] font-semibold mt-2.5 mb-5 uppercase"
          >
            WHERE EVERY PICTURE TELLS A STORY.
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.25, ease: luxuryEase }}
            className="text-[#4E4845] text-[12px] sm:text-[13px] md:text-[13.5px] leading-[1.8] font-light uppercase tracking-wide max-w-[860px] mx-auto text-center space-y-1.5"
          >
            <p>
              EXPLORE THE WORLD OF PHILO THROUGH MOMENTS OF CREATIVITY,
            </p>
            <p>
              TRANSFORMATION AND BEAUTY. FROM STUNNING MAKEOVERS TO THE LITTLE
            </p>
            <p>
              DETAILS BEHIND OUR CRAFT, EVERY FRAME CAPTURES OUR PASSION FOR MAKING
            </p>
            <p>
              PEOPLE FEEL CONFIDENT, BEAUTIFUL AND UNIQUELY THEMSELVES.
            </p>
            <p className="font-normal text-[#2B2B2B] pt-0.5">
              PHILO — BEAUTY WORTH REMEMBERING.
            </p>
          </motion.div>

          {/* Ornamental Celtic / Mandala knot medallion with divider lines */}
          <div className="max-w-[680px] mx-auto flex items-center justify-center mt-9 mb-4">
            <motion.div
              initial={{ scaleX: 0, originX: 1 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.85, ease: luxuryEase }}
              className="flex-1 h-[1px] bg-[#D8C4B8]"
            ></motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: luxuryEase }}
              className="mx-5 text-[#A57C5A]"
            >
              <svg viewBox="0 0 64 64" className="w-11 h-11 stroke-[#A57C5A] fill-none stroke-[1.4]" aria-hidden="true">
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
              transition={{ duration: 0.85, ease: luxuryEase }}
              className="flex-1 h-[1px] bg-[#D8C4B8]"
            ></motion.div>
          </div>

          {/* Quick Section Jump Pills */}
          <div className="flex items-center justify-center flex-wrap gap-3 mt-6">
            <a
              href="#trends-2026-27"
              className="inline-flex items-center gap-2 bg-[#83453B] hover:bg-[#6e352c] text-white text-[11px] sm:text-[12px] font-semibold tracking-[0.2em] uppercase py-2 px-5 rounded-full transition-all duration-300 shadow-sm"
            >
              <span>Trend of 2026 & 27</span>
            </a>
            <a
              href="#client-makeovers"
              className="inline-flex items-center gap-2 bg-white hover:bg-[#F5EFEA] text-[#83453B] text-[11px] sm:text-[12px] font-semibold tracking-[0.2em] uppercase py-2 px-5 rounded-full border border-[#83453B]/40 transition-all duration-300"
            >
              <span>Client Makeovers</span>
            </a>
          </div>
        </div>
      </section>

      {/* 4. Complete Gallery Grid: Visual Showcase from philosalon.in (Black boxes and number texts removed) */}
      <section className="w-full bg-white pb-20 sm:pb-28 px-4 sm:px-8 lg:px-12 overflow-hidden">
        <div className="max-w-[1240px] mx-auto space-y-4 sm:space-y-6">
          {/* ROW 1: Items 1, 2, 3 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {[1, 2, 3].map((num, idx) => {
              const item = galleryData[num];
              return (
                <motion.div
                  key={num}
                  onClick={() => openItem(num)}
                  initial={{ opacity: 0, y: 35, scale: 0.97 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.8, delay: idx * 0.1, ease: luxuryEase }}
                  whileHover={{ scale: 1.02, boxShadow: '0 20px 30px -10px rgba(0,0,0,0.3)' }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full h-[360px] sm:h-[440px] md:h-[480px] cursor-pointer transition-all duration-300 group relative overflow-hidden bg-[#F4EFEA] shadow-md"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = item.fallback;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-end text-white">
                    <span className="text-[10px] tracking-[0.2em] uppercase text-[#D8C4B8] font-medium block">
                      {item.category}
                    </span>
                    <span className="text-base font-heading font-medium tracking-wide">
                      {item.title}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* ROW 2: Item 4 (Wide Horizontal Showcase) */}
          {(() => {
            const item = galleryData[4];
            return (
              <motion.div
                onClick={() => openItem(4)}
                initial={{ opacity: 0, y: 40, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.85, ease: luxuryEase }}
                whileHover={{ scale: 1.01, boxShadow: '0 25px 35px -10px rgba(0,0,0,0.3)' }}
                whileTap={{ scale: 0.99 }}
                className="w-full h-[320px] sm:h-[420px] md:h-[520px] cursor-pointer transition-all duration-300 group relative overflow-hidden bg-[#F4EFEA] shadow-md"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = item.fallback;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-8 flex flex-col justify-end text-white">
                  <span className="text-[11px] tracking-[0.24em] uppercase text-[#D8C4B8] font-medium block">
                    {item.category}
                  </span>
                  <span className="text-xl sm:text-2xl font-heading font-medium tracking-wide">
                    {item.title}
                  </span>
                </div>
              </motion.div>
            );
          })()}

          {/* ROW 3: Middle Layout (Items 5, 6, 7, 8, 9, 10) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 items-stretch">
            {/* Left Column (Col 1): Item 5 and Item 9 */}
            <div className="flex flex-col gap-4 sm:gap-6">
              {/* Item 5 */}
              {(() => {
                const item = galleryData[5];
                return (
                  <motion.div
                    onClick={() => openItem(5)}
                    initial={{ opacity: 0, y: 35, scale: 0.97 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.8, ease: luxuryEase }}
                    whileHover={{ scale: 1.02, boxShadow: '0 20px 30px -10px rgba(0,0,0,0.3)' }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full h-[280px] sm:h-[340px] cursor-pointer transition-all duration-300 group relative overflow-hidden bg-[#F4EFEA] shadow-md"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = item.fallback;
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-end text-white">
                      <span className="text-[10px] tracking-[0.2em] uppercase text-[#D8C4B8] font-medium block">
                        {item.category}
                      </span>
                      <span className="text-base font-heading font-medium tracking-wide">
                        {item.title}
                      </span>
                    </div>
                  </motion.div>
                );
              })()}

              {/* Item 9 (Tall Portrait) */}
              {(() => {
                const item = galleryData[9];
                return (
                  <motion.div
                    onClick={() => openItem(9)}
                    initial={{ opacity: 0, y: 35, scale: 0.97 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.8, delay: 0.15, ease: luxuryEase }}
                    whileHover={{ scale: 1.02, boxShadow: '0 20px 30px -10px rgba(0,0,0,0.3)' }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex-1 min-h-[380px] sm:min-h-[460px] cursor-pointer transition-all duration-300 group relative overflow-hidden bg-[#F4EFEA] shadow-md"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = item.fallback;
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-end text-white">
                      <span className="text-[10px] tracking-[0.2em] uppercase text-[#D8C4B8] font-medium block">
                        {item.category}
                      </span>
                      <span className="text-base font-heading font-medium tracking-wide">
                        {item.title}
                      </span>
                    </div>
                  </motion.div>
                );
              })()}
            </div>

            {/* Right 2 Columns (Col 2 & Col 3): Items 6, 7, 8 and Item 10 below */}
            <div className="lg:col-span-2 flex flex-col gap-4 sm:gap-6">
              {/* Top sub-grid: Item 6 & [Item 7, Item 8] */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 flex-1">
                {/* Item 6 (Tall Portrait) */}
                {(() => {
                  const item = galleryData[6];
                  return (
                    <motion.div
                      onClick={() => openItem(6)}
                      initial={{ opacity: 0, y: 35, scale: 0.97 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      viewport={{ once: true, margin: '-40px' }}
                      transition={{ duration: 0.8, delay: 0.1, ease: luxuryEase }}
                      whileHover={{ scale: 1.02, boxShadow: '0 20px 30px -10px rgba(0,0,0,0.3)' }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full min-h-[360px] sm:min-h-[480px] cursor-pointer transition-all duration-300 group relative overflow-hidden bg-[#F4EFEA] shadow-md"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src = item.fallback;
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-end text-white">
                        <span className="text-[10px] tracking-[0.2em] uppercase text-[#D8C4B8] font-medium block">
                          {item.category}
                        </span>
                        <span className="text-base font-heading font-medium tracking-wide">
                          {item.title}
                        </span>
                      </div>
                    </motion.div>
                  );
                })()}

                {/* Col 3: Stacked Item 7 and Item 8 */}
                <div className="flex flex-col gap-4 sm:gap-6">
                  {/* Item 7 */}
                  {(() => {
                    const item = galleryData[7];
                    return (
                      <motion.div
                        onClick={() => openItem(7)}
                        initial={{ opacity: 0, y: 35, scale: 0.97 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        viewport={{ once: true, margin: '-40px' }}
                        transition={{ duration: 0.8, delay: 0.15, ease: luxuryEase }}
                        whileHover={{ scale: 1.02, boxShadow: '0 20px 30px -10px rgba(0,0,0,0.3)' }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full flex-1 min-h-[170px] sm:min-h-[225px] cursor-pointer transition-all duration-300 group relative overflow-hidden bg-[#F4EFEA] shadow-md"
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src = item.fallback;
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-5 flex flex-col justify-end text-white">
                          <span className="text-[9px] tracking-[0.2em] uppercase text-[#D8C4B8] font-medium block">
                            {item.category}
                          </span>
                          <span className="text-sm font-heading font-medium tracking-wide">
                            {item.title}
                          </span>
                        </div>
                      </motion.div>
                    );
                  })()}

                  {/* Item 8 */}
                  {(() => {
                    const item = galleryData[8];
                    return (
                      <motion.div
                        onClick={() => openItem(8)}
                        initial={{ opacity: 0, y: 35, scale: 0.97 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        viewport={{ once: true, margin: '-40px' }}
                        transition={{ duration: 0.8, delay: 0.2, ease: luxuryEase }}
                        whileHover={{ scale: 1.02, boxShadow: '0 20px 30px -10px rgba(0,0,0,0.3)' }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full flex-1 min-h-[170px] sm:min-h-[225px] cursor-pointer transition-all duration-300 group relative overflow-hidden bg-[#F4EFEA] shadow-md"
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src = item.fallback;
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-5 flex flex-col justify-end text-white">
                          <span className="text-[9px] tracking-[0.2em] uppercase text-[#D8C4B8] font-medium block">
                            {item.category}
                          </span>
                          <span className="text-sm font-heading font-medium tracking-wide">
                            {item.title}
                          </span>
                        </div>
                      </motion.div>
                    );
                  })()}
                </div>
              </div>

              {/* Item 10: Wide Box */}
              {(() => {
                const item = galleryData[10];
                return (
                  <motion.div
                    onClick={() => openItem(10)}
                    initial={{ opacity: 0, y: 35, scale: 0.98 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.8, delay: 0.25, ease: luxuryEase }}
                    whileHover={{ scale: 1.01, boxShadow: '0 20px 30px -10px rgba(0,0,0,0.3)' }}
                    whileTap={{ scale: 0.99 }}
                    className="w-full h-[180px] sm:h-[230px] md:h-[260px] cursor-pointer transition-all duration-300 group relative overflow-hidden bg-[#F4EFEA] shadow-md"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = item.fallback;
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-end text-white">
                      <span className="text-[10px] tracking-[0.2em] uppercase text-[#D8C4B8] font-medium block">
                        {item.category}
                      </span>
                      <span className="text-base font-heading font-medium tracking-wide">
                        {item.title}
                      </span>
                    </div>
                  </motion.div>
                );
              })()}
            </div>
          </div>

          {/* ROW 4: Items 11, 12, 13 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 pt-2">
            {[11, 12, 13].map((num, idx) => {
              const item = galleryData[num];
              return (
                <motion.div
                  key={num}
                  onClick={() => openItem(num)}
                  initial={{ opacity: 0, y: 35, scale: 0.97 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.8, delay: idx * 0.1, ease: luxuryEase }}
                  whileHover={{ scale: 1.02, boxShadow: '0 20px 30px -10px rgba(0,0,0,0.3)' }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full h-[360px] sm:h-[440px] md:h-[480px] cursor-pointer transition-all duration-300 group relative overflow-hidden bg-[#F4EFEA] shadow-md"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = item.fallback;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-end text-white">
                    <span className="text-[10px] tracking-[0.2em] uppercase text-[#D8C4B8] font-medium block">
                      {item.category}
                    </span>
                    <span className="text-base font-heading font-medium tracking-wide">
                      {item.title}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. TREND OF 2026 AND 27 - Haute Couture Editorial Showcase */}
      <section
        id="trends-2026-27"
        className="w-full bg-[#180705] text-white py-20 sm:py-28 px-4 sm:px-8 lg:px-14 relative overflow-hidden border-t border-b border-[#36130E]"
      >
        {/* Subtle background luxury glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[350px] bg-[#83453B]/15 blur-[120px] pointer-events-none rounded-full" />

        <div className="max-w-[1340px] mx-auto relative z-10">
          {/* Header */}
          <div className="text-center max-w-[860px] mx-auto mb-14 sm:mb-16">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: luxuryEase }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#83453B]/50 bg-[#83453B]/10 text-[#E2B6A3] text-[10.5px] sm:text-[11.5px] font-semibold tracking-[0.24em] uppercase mb-4"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#E2B6A3] animate-pulse"></span>
              Editorial Forecast Archive
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, ease: luxuryEase }}
              className="text-white font-heading text-3xl sm:text-4xl md:text-5xl lg:text-[54px] uppercase tracking-wider leading-tight"
            >
              TREND OF 2026 AND 27
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.18, ease: luxuryEase }}
              className="text-[#D3C1B7] text-[13px] sm:text-[14.5px] leading-relaxed mt-4 font-light max-w-2xl mx-auto"
            >
              Unveiling the future of high-fashion hairdressing and avant-garde beauty. From razor-sculpted contours and metallic gloss dimensions to voluminous editorial movement—experience Philo's signature trend collection defining the 2026 & 2027 seasons.
            </motion.p>

            <div className="w-16 h-[1.5px] bg-[#83453B] mx-auto mt-6" />
          </div>

          {/* 8 Trend Items Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
            {trends2026_27.map((item, idx) => (
              <motion.div
                key={item.id}
                onClick={() => openItem(item.id)}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.8, delay: idx * 0.08, ease: luxuryEase }}
                whileHover={{ y: -8, boxShadow: '0 25px 40px -10px rgba(0,0,0,0.7)' }}
                className="bg-[#240C08] rounded-xl overflow-hidden border border-[#481A14] hover:border-[#9A554A] shadow-lg cursor-pointer group flex flex-col transition-all duration-300"
              >
                {/* Photo container */}
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-black">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = item.fallback;
                    }}
                  />
                  {/* Code & Trend Badges */}
                  <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
                    <span className="bg-black/75 backdrop-blur-xs text-white text-[9.5px] tracking-[0.2em] uppercase font-bold py-1 px-2.5 rounded-full border border-white/10">
                      {item.code}
                    </span>
                  </div>
                  <div className="absolute top-3.5 right-3.5">
                    <span className="bg-[#83453B]/90 backdrop-blur-xs text-white text-[9px] tracking-[0.2em] uppercase font-semibold py-1 px-2.5 rounded-full">
                      {item.trendYear}
                    </span>
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-5 flex flex-col justify-end text-white">
                    <span className="text-[10px] tracking-[0.22em] uppercase text-[#E2B6A3] font-semibold block mb-1">
                      Tap To View Full Resolution
                    </span>
                    <p className="text-[11.5px] text-neutral-300 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Card info footer */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between bg-gradient-to-b from-[#240C08] to-[#1C0906]">
                  <div>
                    <span className="text-[10px] tracking-[0.2em] uppercase text-[#C48E7E] font-semibold block mb-1">
                      {item.category}
                    </span>
                    <h3 className="text-base font-heading font-normal text-white group-hover:text-[#E2B6A3] transition-colors leading-snug">
                      {item.title}
                    </h3>
                  </div>
                  <div className="pt-3 border-t border-[#3A1610] mt-3.5 flex items-center justify-between text-[11px] text-[#A6958E]">
                    <span className="font-mono text-[10px] tracking-widest text-[#D3C1B7]">{item.code}</span>
                    <span className="text-[#E2B6A3] font-medium tracking-wider group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                      Explore Look <span>→</span>
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Trend CTA Bar */}
          <div className="mt-14 sm:mt-16 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: luxuryEase }}
              className="inline-flex flex-col sm:flex-row items-center justify-between gap-6 bg-[#250C08]/80 border border-[#521D16] p-6 sm:p-8 rounded-2xl max-w-3xl mx-auto backdrop-blur-xs text-left"
            >
              <div>
                <span className="text-[#E2B6A3] text-[10.5px] font-semibold tracking-[0.24em] uppercase block mb-1">
                  Haute Couture Bespoke Sessions
                </span>
                <h4 className="text-xl font-heading text-white uppercase tracking-wide">
                  Inspired by the 2026 & 2027 Forecasts?
                </h4>
                <p className="text-[12.5px] text-[#C4B7B0] mt-1.5 max-w-lg leading-relaxed">
                  Book an in-depth signature trend consultation with Philo master artists at Lake Town or Sodepur.
                </p>
              </div>
              <button
                type="button"
                onClick={onOpenBooking}
                className="bg-[#83453B] hover:bg-[#974E43] text-white text-[11px] sm:text-[12px] font-semibold tracking-[0.2em] uppercase py-3.5 px-7 rounded-full transition-colors shrink-0 shadow-lg cursor-pointer"
              >
                BOOK TREND LOOK
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 6. Dedicated Signature Client Transformations Showcase */}
      <section
        id="client-makeovers"
        className="w-full bg-[#FAF7F5] py-20 sm:py-24 px-4 sm:px-8 lg:px-14 border-t border-[#ECE4DF] overflow-hidden"
      >
        <div className="max-w-[1240px] mx-auto">
          {/* Header */}
          <div className="text-center max-w-[800px] mx-auto mb-12">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: luxuryEase }}
              className="text-[#83453B] text-[11px] sm:text-[12px] font-semibold tracking-[0.24em] uppercase mb-2"
            >
              Real Clients · Real Artistry
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, ease: luxuryEase }}
              className="text-black font-heading text-3xl sm:text-4xl md:text-[44px] uppercase tracking-wide leading-tight"
            >
              Signature Client Makeovers
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: luxuryEase }}
              className="text-[#6F6864] text-[13px] sm:text-[14px] leading-relaxed mt-4 font-normal"
            >
              Step into the chair and experience couture hair transformations sculpted by Philo master artists. From dimensional balayage and glass gloss finishes to bespoke curtain bangs and lived-in waves.
            </motion.p>

            {/* Category Filter Pills */}
            <div className="flex items-center justify-center flex-wrap gap-2.5 mt-8">
              {['All', 'Balayage & Ombré', 'Brunette & Mocha', 'Blonde & Highlights', 'Gloss & Smoothing', 'Bangs & Layering'].map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 sm:px-5 py-2 rounded-full text-[11px] sm:text-[12px] tracking-[0.16em] uppercase font-medium transition-all duration-300 cursor-pointer ${
                    activeCategory === cat
                      ? 'bg-[#83453B] text-white shadow-md'
                      : 'bg-white text-[#554F4C] border border-[#E5DDD7] hover:border-[#83453B] hover:text-[#83453B]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Grid of client transformation images */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-7">
            {clientTransformations
              .filter((item) => activeCategory === 'All' || item.category === activeCategory)
              .map((item, idx) => (
                <motion.div
                  key={item.id}
                  onClick={() => openItem(item.id)}
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.8, delay: idx * 0.08, ease: luxuryEase }}
                  whileHover={{ y: -6, boxShadow: '0 25px 35px -10px rgba(0,0,0,0.25)' }}
                  className="bg-white rounded-xl overflow-hidden border border-[#E8DFD9] shadow-sm cursor-pointer group flex flex-col transition-all duration-300"
                >
                  <div className="relative aspect-[4/5] w-full overflow-hidden bg-neutral-900">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = item.fallback;
                      }}
                    />
                    <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-xs text-white text-[9px] tracking-[0.2em] uppercase font-semibold py-1 px-2.5 rounded-full">
                      {item.tag}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-5 flex flex-col justify-end text-white">
                      <span className="text-[10px] tracking-[0.2em] uppercase text-[#D8C4B8] font-medium block">
                        Tap To View Details
                      </span>
                    </div>
                  </div>
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] tracking-[0.2em] uppercase text-[#83453B] font-semibold block mb-1">
                        {item.category}
                      </span>
                      <h3 className="text-base font-heading font-normal text-[#260805] group-hover:text-[#83453B] transition-colors leading-snug">
                        {item.title}
                      </h3>
                    </div>
                    <div className="pt-3 border-t border-[#F0E8E3] mt-3 flex items-center justify-between text-[11px] text-[#7A726E]">
                      <span>Philo Certified Look</span>
                      <span className="text-[#83453B] font-medium tracking-wider group-hover:translate-x-1 transition-transform">
                        Explore →
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>

          {/* Bottom Call to Action */}
          <div className="mt-14 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: luxuryEase }}
              className="inline-flex flex-col sm:flex-row items-center gap-4 bg-white p-6 sm:p-8 rounded-2xl border border-[#E5DDD7] shadow-sm max-w-2xl mx-auto"
            >
              <div className="text-left flex-1">
                <h4 className="text-lg font-heading text-[#260805] uppercase">
                  Ready For Your Transformation?
                </h4>
                <p className="text-[12px] sm:text-[13px] text-[#6F6864] mt-1">
                  Book a personalized consultation with our senior stylists at Lake Town or Sodepur.
                </p>
              </div>
              <button
                type="button"
                onClick={onOpenBooking}
                className="bg-[#83453B] hover:bg-[#723A31] text-white text-[11px] sm:text-[12px] font-semibold tracking-[0.18em] uppercase py-3 px-6 rounded-full transition-colors shrink-0 shadow-md cursor-pointer"
              >
                BOOK AN APPOINTMENT
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Bottom Monochrome Footer matching reference design */}
      <Footer onNavigate={onNavigate} onOpenBooking={onOpenBooking} />

      {/* Interactive Modal / Lightbox when any Gallery Item is clicked */}
      <AnimatePresence>
        {selectedBox && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.3, ease: luxuryEase }}
              className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-[#D8C4B8]/40"
            >
              {/* Modal Image Header */}
              <div className="relative w-full h-64 sm:h-72 bg-neutral-900 overflow-hidden">
                <img
                  src={selectedBox.image}
                  alt={selectedBox.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = selectedBox.fallback;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#260805] via-transparent to-black/40 pointer-events-none" />
                <button
                  type="button"
                  onClick={() => setSelectedBox(null)}
                  className="absolute top-4 right-4 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
                <div className="absolute bottom-4 left-6 right-6">
                  <span className="text-[10px] tracking-[0.24em] uppercase text-[#D8C4B8] font-semibold block">
                    {selectedBox.category}
                  </span>
                  <h3 className="text-xl font-heading text-white tracking-wide">
                    {selectedBox.title}
                  </h3>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 sm:p-8 space-y-5">
                <p className="text-[#4E4845] text-[14px] leading-relaxed font-light">
                  {selectedBox.description}
                </p>

                <div className="bg-[#FAF7F5] rounded-xl p-4 border border-[#EBE3DE] flex items-center justify-between">
                  <div>
                    <div className="text-[11px] font-bold tracking-[0.16em] uppercase text-[#320805]">
                      Experience This Craft
                    </div>
                    <div className="text-[12px] text-[#6F6864] mt-0.5">
                      Consult with our master stylists at any Philo branch.
                    </div>
                  </div>
                  <Sparkles size={22} className="text-[#83453B] shrink-0" />
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedBox(null);
                      onOpenBooking();
                    }}
                    className="flex-1 bg-[#83453B] hover:bg-[#723A31] text-white font-medium text-[12px] tracking-[0.18em] uppercase py-3 rounded-full flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md"
                  >
                    <Calendar size={15} />
                    BOOK CONSULTATION
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedBox(null)}
                    className="px-5 py-3 rounded-full border border-[#D8C4B8] text-[#4E4845] hover:bg-[#FAF7F5] text-[12px] tracking-[0.18em] uppercase font-medium transition-colors cursor-pointer"
                  >
                    CLOSE
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
