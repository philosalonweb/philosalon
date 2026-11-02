/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  Sparkles,
  Clock,
  CheckCircle2,
  Phone,
  Calendar,
  Scissors,
  ChevronRight,
  MessageCircle,
  X,
  Download,
  FileText,
  TableProperties,
  ListFilter,
  Check,
} from 'lucide-react';
import Footer, { SALON_BRANCHES } from './components/Footer.tsx';

// Official PDF Link
export const OFFICIAL_PDF_URL = '/assets/aistudio/PHILO_Salon_Full_Service_Price_List_1e67bc26.pdf';

/* =========================================================================
   AUTHENTIC PHILO SALON SERVICE DIRECTORY (Derived from Official Price List)
   ========================================================================= */
export interface ServiceItem {
  id: string;
  name: string;
  section: 'skin' | 'female-hair' | 'male-hair' | 'hands-feet';
  sectionLabel: string;
  subCategory: string;
  gender: 'Women' | 'Men' | 'Unisex';
  price: string;
  brand?: string;
  description: string;
}

export const SALON_SERVICES: ServiceItem[] = [
  // --- 1. SKIN SERVICES: CLEANUPS ---
  {
    id: 'sk-1',
    name: 'Lotus Basic Cleanup',
    section: 'skin',
    sectionLabel: 'Skin & Facials',
    subCategory: 'Cleanups & Express Care',
    gender: 'Unisex',
    price: '₹1,000',
    brand: 'Lotus Herbals',
    description: 'Refreshing botanical pore cleanse, gentle scrub, steam, blackhead clearing, and soothing pack.',
  },
  {
    id: 'sk-2',
    name: 'Janssen Basic Cleanup',
    section: 'skin',
    sectionLabel: 'Skin & Facials',
    subCategory: 'Cleanups & Express Care',
    gender: 'Unisex',
    price: '₹1,800',
    brand: 'Janssen Cosmetics',
    description: 'German cosmeceutical deep clarifying cleanse, enzyme exfoliation, vacuum extraction, and calming serum.',
  },
  {
    id: 'sk-3',
    name: 'Janssen Fire & Ice Cleanup',
    section: 'skin',
    sectionLabel: 'Skin & Facials',
    subCategory: 'Cleanups & Express Care',
    gender: 'Unisex',
    price: '₹2,500',
    brand: 'Janssen Cosmetics',
    description: 'Intensive thermal resurfacing followed by cryogenic cooling to instantly refine skin texture and awaken tired skin.',
  },

  // --- 2. SKIN SERVICES: FACIALS (LOTUS / JANSSEN / CASMARA) ---
  {
    id: 'sk-4',
    name: 'Basic Nourishing Facial',
    section: 'skin',
    sectionLabel: 'Skin & Facials',
    subCategory: 'Facials & Skin Treatments',
    gender: 'Unisex',
    price: 'Lotus: ₹1,200 | Janssen: ₹2,800 | Casmara: ₹3,000',
    brand: 'Lotus / Janssen / Casmara',
    description: 'Essential nourishment and hydration customized to your skin sensitivity and tone.',
  },
  {
    id: 'sk-5',
    name: 'Brightening Radiance Facial',
    section: 'skin',
    sectionLabel: 'Skin & Facials',
    subCategory: 'Facials & Skin Treatments',
    gender: 'Unisex',
    price: 'Lotus: ₹2,000 | Janssen: ₹3,500 | Casmara: ₹3,500',
    brand: 'Lotus / Janssen / Casmara',
    description: 'Targets sun damage, uneven pigmentation, and dullness to reveal a luminous, lit-from-within glow.',
  },
  {
    id: 'sk-6',
    name: 'Whitening & Illuminating Facial',
    section: 'skin',
    sectionLabel: 'Skin & Facials',
    subCategory: 'Facials & Skin Treatments',
    gender: 'Unisex',
    price: 'Lotus: ₹2,500 | Janssen: ₹4,000 | Casmara: ₹3,800',
    brand: 'Lotus / Janssen / Casmara',
    description: 'Advanced melanin control and pure radiance infusion for immaculate, porcelain clarity.',
  },
  {
    id: 'sk-7',
    name: 'Ultimo Gold Luxury Facial',
    section: 'skin',
    sectionLabel: 'Skin & Facials',
    subCategory: 'Facials & Skin Treatments',
    gender: 'Unisex',
    price: '₹4,000',
    brand: 'Lotus Herbals',
    description: '24K gold dust leaf infusion with revitalizing botanical extracts for regal bridal glow.',
  },
  {
    id: 'sk-8',
    name: 'Intense Hydrating Facial',
    section: 'skin',
    sectionLabel: 'Skin & Facials',
    subCategory: 'Facials & Skin Treatments',
    gender: 'Unisex',
    price: 'Janssen: ₹5,000 | Casmara: ₹4,500',
    brand: 'Janssen / Casmara',
    description: 'Multi-molecular hyaluronic acid infusion to quench dehydrated dermis cells.',
  },
  {
    id: 'sk-9',
    name: 'Medical-Grade Hydra Facial',
    section: 'skin',
    sectionLabel: 'Skin & Facials',
    subCategory: 'Facials & Skin Treatments',
    gender: 'Unisex',
    price: 'From ₹4,000',
    brand: 'Janssen Cosmetics',
    description: 'Vortex suction extraction, lymphatic stimulation, and peptide infusion for spotless glass skin.',
  },
  {
    id: 'sk-10',
    name: 'Lotus Preservita Facial',
    section: 'skin',
    sectionLabel: 'Skin & Facials',
    subCategory: 'Facials & Skin Treatments',
    gender: 'Unisex',
    price: '₹3,800',
    brand: 'Lotus Herbals',
    description: 'Natural active concentrate formulated to balance uneven tone and soothe stubborn blemishes.',
  },
  {
    id: 'sk-11',
    name: 'Casmara Uplifting & Sculpting Facial',
    section: 'skin',
    sectionLabel: 'Skin & Facials',
    subCategory: 'Facials & Skin Treatments',
    gender: 'Unisex',
    price: '₹5,999',
    brand: 'Casmara (Spain)',
    description: 'Signature Spanish peel-off mask technology with active firming peptides and cryo sculpting.',
  },
  {
    id: 'sk-12',
    name: 'Janssen Platinum Cellular Regeneration',
    section: 'skin',
    sectionLabel: 'Skin & Facials',
    subCategory: 'Facials & Skin Treatments',
    gender: 'Unisex',
    price: '₹7,500',
    brand: 'Janssen Cosmetics',
    description: 'Elite anti-aging therapy with colloidal platinum to reactivate mitochondrial cell vitality.',
  },
  {
    id: 'sk-13',
    name: 'Janssen Demanding Skin Supreme',
    section: 'skin',
    sectionLabel: 'Skin & Facials',
    subCategory: 'Facials & Skin Treatments',
    gender: 'Unisex',
    price: '₹8,500',
    brand: 'Janssen Cosmetics',
    description: 'Top-tier German formula crafted for depleted skin in need of complete structural revival.',
  },

  // --- 3. TARGETED DERMATOLOGICAL TREATMENTS ---
  {
    id: 'sk-14',
    name: 'Targeted Acne Clarifying Treatment',
    section: 'skin',
    sectionLabel: 'Skin & Facials',
    subCategory: 'Targeted Treatments',
    gender: 'Unisex',
    price: 'Lotus: ₹2,500 | Janssen: ₹5,000 | Casmara: ₹4,500',
    brand: 'Lotus / Janssen / Casmara',
    description: 'Regulates sebum oversecretion, dissolves active bacterial congestion, and calms redness.',
  },
  {
    id: 'sk-15',
    name: 'Anti-Ageing Collagen Boost Treatment',
    section: 'skin',
    sectionLabel: 'Skin & Facials',
    subCategory: 'Targeted Treatments',
    gender: 'Unisex',
    price: 'Lotus: ₹3,500 | Casmara: ₹4,500',
    brand: 'Lotus / Casmara',
    description: 'Firming elastin and collagen active booster for fine lines and skin elasticity loss.',
  },
  {
    id: 'sk-16',
    name: 'Delicate Skin Calming Treatment',
    section: 'skin',
    sectionLabel: 'Skin & Facials',
    subCategory: 'Targeted Treatments',
    gender: 'Unisex',
    price: 'Janssen: ₹4,500 | Casmara: ₹4,000',
    brand: 'Janssen / Casmara',
    description: 'Hypo-allergenic barrier therapy for reactive, rosacea-prone, or fragile skin.',
  },
  {
    id: 'sk-17',
    name: 'Oily Skin Mattifying Balance Treatment',
    section: 'skin',
    sectionLabel: 'Skin & Facials',
    subCategory: 'Targeted Treatments',
    gender: 'Unisex',
    price: 'Janssen: ₹5,500 | Casmara: ₹4,000',
    brand: 'Janssen / Casmara',
    description: 'Thermal clay and marine active balancing to refine enlarged pores and prevent shine.',
  },
  {
    id: 'sk-18',
    name: 'Mature Skin Cellular Reconstruction',
    section: 'skin',
    sectionLabel: 'Skin & Facials',
    subCategory: 'Targeted Treatments',
    gender: 'Unisex',
    price: '₹6,500',
    brand: 'Janssen Cosmetics',
    description: 'Deep matrix peptide nourishment to restore lipid density and smooth facial contours.',
  },

  // --- 4. D-TAN RITUALS ---
  {
    id: 'dt-1',
    name: 'Full Body D-Tan Ritual',
    section: 'skin',
    sectionLabel: 'Skin & Facials',
    subCategory: 'D-Tan Treatments',
    gender: 'Unisex',
    price: '₹4,500',
    description: 'Complete head-to-toe lightening pack to erase stubborn sun tanning and restore smooth tone.',
  },
  {
    id: 'dt-2',
    name: 'Full Face D-Tan',
    section: 'skin',
    sectionLabel: 'Skin & Facials',
    subCategory: 'D-Tan Treatments',
    gender: 'Unisex',
    price: '₹800',
    description: 'Instant tan removal formula with botanical lactic and fruit enzymes.',
  },
  {
    id: 'dt-3',
    name: 'Hands & Legs D-Tan',
    section: 'skin',
    sectionLabel: 'Skin & Facials',
    subCategory: 'D-Tan Treatments',
    gender: 'Unisex',
    price: 'Hands: ₹1,000 | Legs: ₹1,300',
    description: 'Half Hands: ₹600 | Half Legs: ₹800 | Feet: ₹500',
  },
  {
    id: 'dt-4',
    name: 'Back & Torso D-Tan',
    section: 'skin',
    sectionLabel: 'Skin & Facials',
    subCategory: 'D-Tan Treatments',
    gender: 'Unisex',
    price: 'Full Back: ₹1,200 | Full Front: ₹1,200',
    description: 'Half Back: ₹700 | Half Front: ₹700 | Neck Line: ₹350 | Underarms: ₹300',
  },

  // --- 5. RICA WAX & PEEL OFF ---
  {
    id: 'wx-1',
    name: 'Rica Italian Wax - Full Body',
    section: 'skin',
    sectionLabel: 'Skin & Facials',
    subCategory: 'Waxing & Threading',
    gender: 'Women',
    price: '₹4,500',
    brand: 'Rica (Italy)',
    description: 'Colophony-free Italian waxing enriched with botanical oils for pain-minimized hair removal.',
  },
  {
    id: 'wx-2',
    name: 'Brazilian (Bikini) Wax',
    section: 'skin',
    sectionLabel: 'Skin & Facials',
    subCategory: 'Waxing & Threading',
    gender: 'Women',
    price: '₹1,500',
    brand: 'Rica (Italy)',
    description: 'Gentle peel-off Rica formulation for sensitive intimate areas.',
  },
  {
    id: 'wx-3',
    name: 'Rica Waxing - Arms & Legs',
    section: 'skin',
    sectionLabel: 'Skin & Facials',
    subCategory: 'Waxing & Threading',
    gender: 'Women',
    price: 'Full Arms: ₹1,200 | Full Legs: ₹1,400',
    brand: 'Rica (Italy)',
    description: 'Half Arm: ₹700 | Half Leg: ₹900 | Underarms: ₹400',
  },
  {
    id: 'th-1',
    name: 'Precision Facial Threading',
    section: 'skin',
    sectionLabel: 'Skin & Facials',
    subCategory: 'Waxing & Threading',
    gender: 'Women',
    price: 'Eyebrow: ₹50 | Upper Lip: ₹30 | Full Face: ₹350',
    description: 'Forehead: ₹30 | Chin: ₹30 | Side Face: ₹30 | Eyebrow Shaping: ₹50',
  },
  {
    id: 'sp-1',
    name: 'Full Body Skin Polishing',
    section: 'skin',
    sectionLabel: 'Skin & Facials',
    subCategory: 'Skin Polishing',
    gender: 'Unisex',
    price: '₹4,999',
    description: 'Underarms: ₹350 | Full Hand: ₹1,200 | Full Leg: ₹1,400 | Back: ₹1,200 | Front: ₹1,000',
  },

  // --- 6. FEMALE HAIR SERVICES ---
  {
    id: 'fh-1',
    name: 'Female Signature Haircut (By Stylist Tier)',
    section: 'female-hair',
    sectionLabel: 'Female Haircare',
    subCategory: 'Precision Cuts',
    gender: 'Women',
    price: 'Stylist: ₹600 | Sr. Stylist: ₹800 | Creative Director: ₹999 | Director: ₹1,199',
    description: 'Face-framing analysis, clarifying wash, bespoke haircut, and signature blowdry style.',
  },
  {
    id: 'fh-2',
    name: 'Kids Haircut (Girls)',
    section: 'female-hair',
    sectionLabel: 'Female Haircare',
    subCategory: 'Precision Cuts',
    gender: 'Women',
    price: 'Stylist: ₹500 | Sr. Stylist: ₹600 | Creative Director: ₹700 | Director: ₹999',
    description: 'Gentle, patience-first haircut styling for young girls.',
  },
  {
    id: 'fh-3',
    name: 'Hair Wash + Blow Dry Styling',
    section: 'female-hair',
    sectionLabel: 'Female Haircare',
    subCategory: 'Wash & Blowdry',
    gender: 'Women',
    price: 'Short: ₹799 | Medium: ₹1,299 | Long: ₹1,499 | X-Long: ₹1,799',
    description: 'Botanical shampoo cleanse, conditioning rinse, heat protection, and high-volume blowout.',
  },
  {
    id: 'fh-4',
    name: 'Hair Wash + Quick Dry',
    section: 'female-hair',
    sectionLabel: 'Female Haircare',
    subCategory: 'Wash & Blowdry',
    gender: 'Women',
    price: 'Short: ₹600 | Medium: ₹800 | Long: ₹999 | X-Long: ₹1,299',
    description: 'Cleanse and rough dry for everyday freshness.',
  },
  {
    id: 'fh-5',
    name: 'Schwarzkopf / Wella Hair Spa',
    section: 'female-hair',
    sectionLabel: 'Female Haircare',
    subCategory: 'Hair Spa & Scalp',
    gender: 'Women',
    price: 'Short: ₹1,600 | Medium: ₹2,000 | Long: ₹2,400 | X-Long: ₹2,999',
    brand: 'Schwarzkopf / Wella',
    description: 'Intense deep conditioning cream bath, steam infusion, and relaxing scalp circulation massage.',
  },
  {
    id: 'fh-6',
    name: 'Therapeutic Aromatherapy Head Massage',
    section: 'female-hair',
    sectionLabel: 'Female Haircare',
    subCategory: 'Hair Spa & Scalp',
    gender: 'Women',
    price: '20 Mins: ₹999 | 30 Mins: ₹1,500',
    description: 'Pressure point relief with warm botanical oils to melt tension and stimulate hair roots.',
  },
  {
    id: 'fh-7',
    name: 'Targeted Hair Fiber Treatments',
    section: 'female-hair',
    sectionLabel: 'Female Haircare',
    subCategory: 'Hair Treatments',
    gender: 'Women',
    price: 'Short: ₹2,699 | Medium: ₹3,299 | Long: ₹3,699 | X-Long: ₹3,999',
    description: 'Choose from: Anti-Hairfall, Anti-Dandruff, Intense Repair, Deep Hydrate, or Color Save.',
  },
  {
    id: 'fh-8',
    name: 'Olaplex Structural Bond Reconstruction',
    section: 'female-hair',
    sectionLabel: 'Female Haircare',
    subCategory: 'Hair Treatments',
    gender: 'Women',
    price: 'Short: ₹2,799 | Medium: ₹3,499 | Long: ₹3,999 | X-Long: ₹4,299',
    brand: 'Olaplex (USA)',
    description: 'Patented bond multipliers reconnect broken disulfide bonds inside chemical-stressed hair.',
  },
  {
    id: 'fh-9',
    name: 'Luxe Keratin Restore Hair Treatment',
    section: 'female-hair',
    sectionLabel: 'Female Haircare',
    subCategory: 'Hair Treatments',
    gender: 'Women',
    price: 'Short: ₹2,799 | Medium: ₹3,499 | Long: ₹3,999 | X-Long: ₹4,299',
    brand: 'Wella SP LuxeOil',
    description: 'Argan, jojoba, and almond oil infusion with hydrolyzed keratin to restore silky supple bounce.',
  },
  {
    id: 'fh-10',
    name: 'Straightening / Smoothening',
    section: 'female-hair',
    sectionLabel: 'Female Haircare',
    subCategory: 'Chemical Transformations',
    gender: 'Women',
    price: 'Short: ₹4,999 | Medium: ₹7,499 | Long: ₹9,999 | X-Long: ₹12,999',
    brand: 'L’Oréal / Schwarzkopf',
    description: 'Long-lasting sleek, silky straight finish with frizz control and manageable shine.',
  },
  {
    id: 'fh-11',
    name: 'Keratin Protein Treatment',
    section: 'female-hair',
    sectionLabel: 'Female Haircare',
    subCategory: 'Chemical Transformations',
    gender: 'Women',
    price: 'Short: ₹5,999 | Medium: ₹8,499 | Long: ₹10,999 | X-Long: ₹13,499',
    brand: 'Cadiveu / Global Keratin',
    description: 'Replenishes lost keratin to tame unmanageable curls and eliminate humidity frizz.',
  },
  {
    id: 'fh-12',
    name: 'Nanoplastia / Hair Botox Silk Treatment',
    section: 'female-hair',
    sectionLabel: 'Female Haircare',
    subCategory: 'Chemical Transformations',
    gender: 'Women',
    price: 'Short: ₹7,999 | Medium: ₹9,499 | Long: ₹11,999 | X-Long: ₹14,999',
    brand: 'Floractive Nano / Felps',
    description: 'Formaldehyde-free organic amino acid technology giving high-definition mirror glass shine.',
  },

  // --- 7. MALE HAIR & GROOMING SERVICES ---
  {
    id: 'mh-1',
    name: "Men's Precision Haircut (By Stylist Tier)",
    section: 'male-hair',
    sectionLabel: 'Male Grooming',
    subCategory: 'Haircuts & Grooming',
    gender: 'Men',
    price: 'Stylist: ₹500 | Sr. Stylist: ₹600 | Creative Director: ₹700 | Director: ₹999',
    description: 'Bespoke shear & clipper fade, clarifying wash, neck taper, and matte texturizing finish.',
  },
  {
    id: 'mh-2',
    name: 'Kids Haircut (Boys)',
    section: 'male-hair',
    sectionLabel: 'Male Grooming',
    subCategory: 'Haircuts & Grooming',
    gender: 'Men',
    price: 'Stylist: ₹400 | Sr. Stylist: ₹500 | Creative Director: ₹600 | Director: ₹700',
    description: 'Comfortable, stylish haircut for young boys.',
  },
  {
    id: 'mh-3',
    name: 'Artisan Shave & Beard Design',
    section: 'male-hair',
    sectionLabel: 'Male Grooming',
    subCategory: 'Shave & Beard',
    gender: 'Men',
    price: 'Clean Shave: ₹100-₹150 | French Shave: ₹150 | Beard Trim: ₹150-₹250',
    description: 'Hot towel pre-shave oil, straight-edge razor precision line, and cooling alum balm.',
  },
  {
    id: 'mh-4',
    name: "Men's Wash & Hair Setting",
    section: 'male-hair',
    sectionLabel: 'Male Grooming',
    subCategory: 'Wash & Style',
    gender: 'Men',
    price: 'Wash + Setting: From ₹400 | Hair Setting Only: From ₹250',
    description: 'Scalp cleansing with customized styling paste or pomade.',
  },
  {
    id: 'mh-5',
    name: "Men's Schwarzkopf / Wella Hair Spa",
    section: 'male-hair',
    sectionLabel: 'Male Grooming',
    subCategory: 'Hair Spa',
    gender: 'Men',
    price: '₹1,200',
    brand: 'Schwarzkopf / Wella',
    description: 'Deep conditioning scalp nourishment and relaxing head massage.',
  },
  {
    id: 'mh-6',
    name: "Men's Relaxing Head Massage",
    section: 'male-hair',
    sectionLabel: 'Male Grooming',
    subCategory: 'Hair Spa',
    gender: 'Men',
    price: '20 Mins: ₹700 | 30 Mins: ₹1,200',
    description: 'Deep tissue acupressure massage with botanical oils to relieve executive stress.',
  },
  {
    id: 'mh-7',
    name: "Men's Advanced Treatment Spa",
    section: 'male-hair',
    sectionLabel: 'Male Grooming',
    subCategory: 'Hair Spa',
    gender: 'Men',
    price: 'From ₹2,199 (Treatment Spa) | From ₹2,299 (Olaplex / Luxe Oil)',
    description: 'Anti-Hairfall, Anti-Dandruff, Intense Repair, Hydrate, Color Save, Olaplex, or Luxe Oil.',
  },
  {
    id: 'mh-8',
    name: "Men's Hair Colour & Highlights",
    section: 'male-hair',
    sectionLabel: 'Male Grooming',
    subCategory: 'Hair Colour',
    gender: 'Men',
    price: 'Root Touch-Up: ₹1,600 | Global: From ₹1,600 | Balayage/Ombre: From ₹4,500',
    description: 'Ammonia-free gentle coverage. Highlights from ₹400 / ₹250. 8+ High Lifting by length & density.',
  },
  {
    id: 'mh-9',
    name: "Men's Straightening, Keratin & Nanoplastia",
    section: 'male-hair',
    sectionLabel: 'Male Grooming',
    subCategory: 'Chemical Treatments',
    gender: 'Men',
    price: 'Straightening: From ₹2,499 | Keratin: From ₹2,499 | Nanoplastia/Botox: From ₹2,999',
    description: 'Frizz management, curl softening, and organic smoothing tailored for shorter masculine hair textures.',
  },

  // --- 8. HANDS, FEET & NAILS ---
  {
    id: 'hf-1',
    name: 'Manicure Collection',
    section: 'hands-feet',
    sectionLabel: 'Hands, Feet & Nails',
    subCategory: 'Manicure Rituals',
    gender: 'Unisex',
    price: 'Basic: ₹700 | Crystal: ₹1,000 | Bombini: ₹1,500 | AVL Luxury Herbal: ₹2,000',
    description: 'Cuticle trimming, nail shaping, aromatic scrub, hand massage, and buff or polish.',
  },
  {
    id: 'hf-2',
    name: 'Pedicure Collection',
    section: 'hands-feet',
    sectionLabel: 'Hands, Feet & Nails',
    subCategory: 'Pedicure Rituals',
    gender: 'Unisex',
    price: 'Basic: ₹800 | Crystal: ₹1,200 | Bombini: ₹2,000 | AVL Luxury Herbal: ₹2,500',
    description: 'Dead skin buffing, callus filing, foot soak, sugar exfoliation, reflexology calf massage, and polish.',
  },
  {
    id: 'hf-3',
    name: 'Nail Extension & Gel Enhancements',
    section: 'hands-feet',
    sectionLabel: 'Hands, Feet & Nails',
    subCategory: 'Nail Enhancements',
    gender: 'Women',
    price: 'Extensions: ₹1,500 | With Gel: ₹1,200 | Hands & Feet: ₹2,800',
    description: 'One tip repair: ₹200 | One tip repair with gel: ₹200. Long-lasting sculptured tips.',
  },
  {
    id: 'hf-4',
    name: 'Nail Grooming & Art',
    section: 'hands-feet',
    sectionLabel: 'Hands, Feet & Nails',
    subCategory: 'Nail Enhancements',
    gender: 'Unisex',
    price: 'Nail Art (Both Hands): ₹700 | Cut, File & Polish: ₹250 | Cut & File: ₹150',
    description: 'Cut, File & Polish: ₹250 for hands, ₹250 for feet. Custom creative designs.',
  },
];

/* =========================================================================
   STRUCTURED DATA TABLES FOR RATE MATRIX TAB
   ========================================================================= */
export const FACIALS_TABLE = [
  { service: 'Basic Facial', lotus: '₹1,200', janssen: '₹2,800', casmara: '₹3,000' },
  { service: 'Brightening Facial', lotus: '₹2,000', janssen: '₹3,500', casmara: '₹3,500' },
  { service: 'Whitening Facial', lotus: '₹2,500', janssen: '₹4,000', casmara: '₹3,800' },
  { service: 'Ultimo Gold Facial', lotus: '₹4,000', janssen: '—', casmara: '—' },
  { service: 'Hydrating Facial', lotus: '—', janssen: '₹5,000', casmara: '₹4,500' },
  { service: 'Hydra Facial', lotus: '—', janssen: 'From ₹4,000', casmara: '—' },
  { service: 'Preservita', lotus: '₹3,800', janssen: '—', casmara: '—' },
  { service: 'Uplifting Facial', lotus: '—', janssen: '—', casmara: '₹5,999' },
  { service: 'Platinum Facial', lotus: '—', janssen: '₹7,500', casmara: '—' },
  { service: 'Demanding Facial', lotus: '—', janssen: '₹8,500', casmara: '—' },
  { service: 'Acne Treatment', lotus: '₹2,500', janssen: '₹5,000', casmara: '₹4,500' },
  { service: 'Anti-Ageing Treatment', lotus: '₹3,500', janssen: '—', casmara: '₹4,500' },
  { service: 'Delicate Skin Treatment', lotus: '—', janssen: '₹4,500', casmara: '₹4,000' },
  { service: 'Oily Skin Treatment', lotus: '—', janssen: '₹5,500', casmara: '₹4,000' },
  { service: 'Mature Skin Treatment', lotus: '—', janssen: '₹6,500', casmara: '—' },
];

export const FEMALE_HAIR_PRICING = [
  {
    category: 'Hair Wash & Styling',
    rows: [
      { service: 'Hair Wash + Dry', short: '₹600', med: '₹800', long: '₹999', xlong: '₹1,299' },
      { service: 'Hair Wash + Blow Dry Styling', short: '₹799', med: '₹1,299', long: '₹1,499', xlong: '₹1,799' },
    ],
  },
  {
    category: 'Hair Spa (Schwarzkopf / Wella)',
    rows: [
      { service: 'Schwarzkopf / Wella Hair Spa', short: '₹1,600', med: '₹2,000', long: '₹2,400', xlong: '₹2,999' },
    ],
  },
  {
    category: 'Targeted Hair Fiber Treatments',
    rows: [
      { service: 'Anti-Hairfall Treatment', short: '₹2,699', med: '₹3,299', long: '₹3,699', xlong: '₹3,999' },
      { service: 'Anti-Dandruff Treatment', short: '₹2,699', med: '₹3,299', long: '₹3,699', xlong: '₹3,999' },
      { service: 'Intense Repair Treatment', short: '₹2,699', med: '₹3,299', long: '₹3,699', xlong: '₹3,999' },
      { service: 'Hydrate Treatment', short: '₹2,699', med: '₹3,299', long: '₹3,699', xlong: '₹3,999' },
      { service: 'Color Save Treatment', short: '₹2,699', med: '₹3,299', long: '₹3,699', xlong: '₹3,999' },
      { service: 'Olaplex Bond Treatment', short: '₹2,799', med: '₹3,499', long: '₹3,999', xlong: '₹4,299' },
      { service: 'Keratin Restore (Luxe Oil)', short: '₹2,799', med: '₹3,499', long: '₹3,999', xlong: '₹4,299' },
    ],
  },
  {
    category: 'Chemical Hair Transformations',
    rows: [
      { service: 'Straightening / Smoothening', short: '₹4,999', med: '₹7,499', long: '₹9,999', xlong: '₹12,999' },
      { service: 'Keratin Treatment', short: '₹5,999', med: '₹8,499', long: '₹10,999', xlong: '₹13,499' },
      { service: 'Nanoplastia / Hair Botox', short: '₹7,999', med: '₹9,499', long: '₹11,999', xlong: '₹14,999' },
    ],
  },
];

export const HAIRCUTS_TABLE = [
  { service: 'Kids Haircut (Boys)', stylist: '₹400', srStylist: '₹500', creativeDir: '₹600', dir: '₹700' },
  { service: "Men's Haircut", stylist: '₹500', srStylist: '₹600', creativeDir: '₹700', dir: '₹999' },
  { service: 'Kids Haircut (Girls)', stylist: '₹500', srStylist: '₹600', creativeDir: '₹700', dir: '₹999' },
  { service: 'Female Haircut', stylist: '₹600', srStylist: '₹800', creativeDir: '₹999', dir: '₹1,199' },
];

interface ServicesPageProps {
  onNavigate: (page: 'home' | 'about' | 'contact' | 'location' | 'gallery' | 'services', hash?: string) => void;
  onOpenBooking: (serviceName?: string) => void;
}

export default function ServicesPage({ onNavigate, onOpenBooking }: ServicesPageProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'skin' | 'female-hair' | 'male-hair' | 'hands-feet' | 'rate-card'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGender, setSelectedGender] = useState<'all' | 'Women' | 'Men'>('all');
  const [branchWaModal, setBranchWaModal] = useState<{ open: boolean; serviceName: string }>({
    open: false,
    serviceName: '',
  });

  const openWhatsAppBranch = (phone: string, branchName: string, serviceName?: string) => {
    const text = encodeURIComponent(
      `Hello Philo Salon (${branchName} Branch)! I am inquiring about "${serviceName || 'a salon appointment'}". Could you please share available appointment slots?`
    );
    window.open(`https://wa.me/91${phone}?text=${text}`, '_blank', 'noopener,noreferrer');
    setBranchWaModal({ open: false, serviceName: '' });
  };

  const handleBookingClick = (serviceName?: string) => {
    if (onOpenBooking) {
      onOpenBooking(serviceName);
    }
  };

  // Filtered Services List
  const filteredServices = useMemo(() => {
    return SALON_SERVICES.filter((item) => {
      // Category Section
      if (activeTab === 'skin' && item.section !== 'skin') return false;
      if (activeTab === 'female-hair' && item.section !== 'female-hair') return false;
      if (activeTab === 'male-hair' && item.section !== 'male-hair') return false;
      if (activeTab === 'hands-feet' && item.section !== 'hands-feet') return false;

      // Gender
      if (selectedGender !== 'all' && item.gender !== 'Unisex' && item.gender !== selectedGender) {
        return false;
      }

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          item.name.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.subCategory.toLowerCase().includes(q) ||
          (item.brand && item.brand.toLowerCase().includes(q)) ||
          item.price.toLowerCase().includes(q)
        );
      }

      return true;
    });
  }, [activeTab, selectedGender, searchQuery]);

  // Group filtered services by subcategory for clean classic reading
  const groupedServices = useMemo(() => {
    const map = new Map<string, ServiceItem[]>();
    filteredServices.forEach((item) => {
      const current = map.get(item.subCategory) || [];
      current.push(item);
      map.set(item.subCategory, current);
    });
    return Array.from(map.entries());
  }, [filteredServices]);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#260805] font-sans selection:bg-[#83453B] selection:text-white">
      {/* 1. Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#ECE4DF]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <button
            type="button"
            onClick={() => onNavigate('home')}
            className="flex items-center gap-3 cursor-pointer text-left"
            aria-label="Philo Salon Home"
          >
            <img
              src="https://res.cloudinary.com/kbiolcw6/image/upload/v1793619002/For_Print_Green_logo_wvplyi.png"
              alt="PHILO Salon"
              className="h-10 sm:h-11 w-auto object-contain"
            />
          </button>

          <nav className="flex items-center gap-2 sm:gap-4">
            <button
              type="button"
              onClick={() => onNavigate('home')}
              className="text-xs uppercase tracking-[0.18em] px-3 py-2 text-[#6F6864] hover:text-[#260805] transition-colors cursor-pointer"
            >
              Home
            </button>
            <button
              type="button"
              onClick={() => onNavigate('gallery')}
              className="hidden sm:inline-block text-xs uppercase tracking-[0.18em] px-3 py-2 text-[#6F6864] hover:text-[#260805] transition-colors cursor-pointer"
            >
              Gallery
            </button>
            <button
              type="button"
              onClick={() => onNavigate('location')}
              className="hidden sm:inline-block text-xs uppercase tracking-[0.18em] px-3 py-2 text-[#6F6864] hover:text-[#260805] transition-colors cursor-pointer"
            >
              Branches
            </button>
            <a
              href={OFFICIAL_PDF_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs uppercase tracking-[0.16em] font-medium text-[#83453B] hover:text-[#260805] transition-colors"
              title="Download official PDF price list"
            >
              <Download size={13} />
              <span className="hidden sm:inline">Official PDF</span>
            </a>
            <button
              type="button"
              onClick={() => handleBookingClick('General Consultation')}
              className="inline-flex items-center gap-2 px-5 py-2 text-xs uppercase tracking-[0.18em] font-semibold bg-[#260805] text-white hover:bg-[#83453B] rounded-full transition-all shadow-xs cursor-pointer"
            >
              <Calendar size={13} />
              <span>Book Appointment</span>
            </button>
          </nav>
        </div>
      </header>

      {/* 2. Hero: Simple, Classic, Timeless Editorial Heading */}
      <section className="pt-14 pb-10 px-4 sm:px-6 lg:px-8 border-b border-[#ECE4DF] bg-white text-center">
        <div className="max-w-3xl mx-auto">
          <p className="text-[11px] uppercase tracking-[0.28em] text-[#83453B] font-medium mb-3">
            PHILO SALON & SPA • SERVICE DIRECTORY
          </p>
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl uppercase tracking-[0.06em] text-[#260805] font-light mb-4">
            Service Menu & Price List
          </h1>
          <p className="text-xs sm:text-sm text-[#6F6864] font-light leading-relaxed max-w-xl mx-auto">
            A comprehensive overview of our hairdressing, skin therapies, and grooming services.
            Official standardized pricing across Parthopur, HB Town, and Lake Town.
          </p>

          <div className="flex items-center justify-center gap-3 mt-6">
            <a
              href={OFFICIAL_PDF_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#DCD5CD] text-[11px] uppercase tracking-[0.16em] text-[#554D48] hover:text-[#260805] hover:border-[#260805] transition-all bg-white"
            >
              <FileText size={13} />
              <span>Download Official PDF Rate Card</span>
            </a>
          </div>
        </div>
      </section>

      {/* 3. Simple Classic Category Filter & Search Bar */}
      <section className="sticky top-20 z-30 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#ECE4DF]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Classic Underline/Pill Tabs */}
          <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto no-scrollbar w-full md:w-auto pb-1 md:pb-0">
            {[
              { id: 'all', label: 'All Services' },
              { id: 'skin', label: 'Skin & Facials' },
              { id: 'female-hair', label: 'Female Haircare' },
              { id: 'male-hair', label: 'Male Grooming' },
              { id: 'hands-feet', label: 'Hands, Feet & Nails' },
              { id: 'rate-card', label: 'Rate Matrix Table' },
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={`whitespace-nowrap px-3.5 py-1.5 rounded-full text-xs uppercase tracking-[0.14em] font-medium transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#260805] text-white shadow-xs'
                      : 'text-[#6F6864] hover:text-[#260805] hover:bg-white/80'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Search Box & Gender Toggle */}
          <div className="flex items-center gap-2.5 w-full md:w-auto justify-end">
            <div className="relative flex-1 md:w-56">
              <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9A8E85]" />
              <input
                type="text"
                placeholder="Search services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-[#DCD5CD] rounded-full pl-8 pr-7 py-1.5 text-xs text-[#260805] placeholder-[#9A8E85] focus:outline-hidden focus:border-[#83453B]"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#9A8E85] hover:text-[#260805]"
                >
                  <X size={12} />
                </button>
              )}
            </div>

            {activeTab !== 'rate-card' && (
              <div className="flex items-center bg-white border border-[#DCD5CD] rounded-full p-0.5 text-[10px] uppercase tracking-wider text-[#7A706A]">
                {(['all', 'Women', 'Men'] as const).map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setSelectedGender(g)}
                    className={`px-2.5 py-1 rounded-full cursor-pointer transition-colors ${
                      selectedGender === g ? 'bg-[#83453B] text-white font-medium' : 'hover:text-[#260805]'
                    }`}
                  >
                    {g === 'all' ? 'All' : g}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 4. Service Menu Content Area */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">

        {/* 4A. TABULAR RATE MATRIX VIEW */}
        {activeTab === 'rate-card' ? (
          <div className="space-y-12">
            {/* Table 1: Facials */}
            <div className="bg-white rounded-2xl border border-[#ECE4DF] p-6 sm:p-8 shadow-xs">
              <div className="mb-4">
                <span className="text-[10px] uppercase tracking-[0.24em] font-medium text-[#83453B] block">
                  European & Botanical Skincare
                </span>
                <h2 className="font-heading text-xl sm:text-2xl uppercase tracking-wide text-[#260805]">
                  Facials & Skin Treatments (Brand Matrix)
                </h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-[#ECE4DF] text-[10px] uppercase tracking-wider text-[#7A706A] bg-[#FAF8F5]">
                      <th className="py-3 px-4 font-semibold">Service</th>
                      <th className="py-3 px-4 font-semibold">Lotus Herbals</th>
                      <th className="py-3 px-4 font-semibold">Janssen Cosmetics</th>
                      <th className="py-3 px-4 font-semibold">Casmara (Spain)</th>
                      <th className="py-3 px-4 text-right font-semibold">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F0EAE4]">
                    {FACIALS_TABLE.map((row, idx) => (
                      <tr key={idx} className="hover:bg-[#FAF8F5]/60 transition-colors">
                        <td className="py-2.5 px-4 font-medium text-[#260805]">{row.service}</td>
                        <td className="py-2.5 px-4 text-[#5D5550]">{row.lotus}</td>
                        <td className="py-2.5 px-4 text-[#260805] font-medium">{row.janssen}</td>
                        <td className="py-2.5 px-4 text-[#83453B] font-medium">{row.casmara}</td>
                        <td className="py-2.5 px-4 text-right">
                          <button
                            type="button"
                            onClick={() => handleBookingClick(row.service)}
                            className="text-[11px] uppercase tracking-wider text-[#83453B] hover:text-[#260805] font-medium underline cursor-pointer"
                          >
                            Book
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Table 2: Haircuts */}
            <div className="bg-white rounded-2xl border border-[#ECE4DF] p-6 sm:p-8 shadow-xs">
              <div className="mb-4">
                <span className="text-[10px] uppercase tracking-[0.24em] font-medium text-[#83453B] block">
                  Artisan Hairdressing
                </span>
                <h2 className="font-heading text-xl sm:text-2xl uppercase tracking-wide text-[#260805]">
                  Precision Haircut by Stylist Tier
                </h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-[#ECE4DF] text-[10px] uppercase tracking-wider text-[#7A706A] bg-[#FAF8F5]">
                      <th className="py-3 px-4 font-semibold">Category</th>
                      <th className="py-3 px-4 font-semibold">Stylist</th>
                      <th className="py-3 px-4 font-semibold">Senior Stylist</th>
                      <th className="py-3 px-4 font-semibold text-[#83453B]">Creative Director</th>
                      <th className="py-3 px-4 font-semibold text-[#260805]">Director</th>
                      <th className="py-3 px-4 text-right font-semibold">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F0EAE4]">
                    {HAIRCUTS_TABLE.map((row, idx) => (
                      <tr key={idx} className="hover:bg-[#FAF8F5]/60 transition-colors">
                        <td className="py-2.5 px-4 font-medium text-[#260805]">{row.service}</td>
                        <td className="py-2.5 px-4 text-[#5D5550]">{row.stylist}</td>
                        <td className="py-2.5 px-4 text-[#5D5550]">{row.srStylist}</td>
                        <td className="py-2.5 px-4 text-[#83453B] font-medium">{row.creativeDir}</td>
                        <td className="py-2.5 px-4 text-[#260805] font-bold">{row.dir}</td>
                        <td className="py-2.5 px-4 text-right">
                          <button
                            type="button"
                            onClick={() => handleBookingClick(row.service)}
                            className="text-[11px] uppercase tracking-wider text-[#83453B] hover:text-[#260805] font-medium underline cursor-pointer"
                          >
                            Book
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Table 3: Length-Graduated Hair Services */}
            <div className="space-y-6">
              {FEMALE_HAIR_PRICING.map((grp, gIdx) => (
                <div key={gIdx} className="bg-white rounded-2xl border border-[#ECE4DF] overflow-hidden shadow-xs">
                  <div className="bg-[#FAF8F5] px-6 py-3 border-b border-[#ECE4DF] font-heading text-sm uppercase tracking-wide text-[#260805]">
                    {grp.category}
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="border-b border-[#ECE4DF] text-[10px] uppercase tracking-wider text-[#7A706A]">
                          <th className="py-2.5 px-6 font-semibold">Service</th>
                          <th className="py-2.5 px-6 font-semibold">Short</th>
                          <th className="py-2.5 px-6 font-semibold">Medium</th>
                          <th className="py-2.5 px-6 font-semibold">Long</th>
                          <th className="py-2.5 px-6 font-semibold text-[#83453B]">Extra Long</th>
                          <th className="py-2.5 px-6 text-right font-semibold">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#F0EAE4]">
                        {grp.rows.map((row, rIdx) => (
                          <tr key={rIdx} className="hover:bg-[#FCFAF7] transition-colors">
                            <td className="py-2.5 px-6 font-medium text-[#260805]">{row.service}</td>
                            <td className="py-2.5 px-6 text-[#5D5550]">{row.short}</td>
                            <td className="py-2.5 px-6 text-[#5D5550]">{row.med}</td>
                            <td className="py-2.5 px-6 text-[#5D5550]">{row.long}</td>
                            <td className="py-2.5 px-6 font-medium text-[#83453B]">{row.xlong}</td>
                            <td className="py-2.5 px-6 text-right">
                              <button
                                type="button"
                                onClick={() => handleBookingClick(row.service)}
                                className="text-[11px] uppercase tracking-wider text-[#83453B] hover:text-[#260805] font-medium underline cursor-pointer"
                              >
                                Book
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* 4B. SIMPLE & CLASSIC SERVICE MENU (Grouped with clean editorial lines) */
          <div className="space-y-12">
            {groupedServices.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl border border-[#ECE4DF] p-8">
                <Search size={28} className="mx-auto text-[#9A8E85] mb-2" />
                <h3 className="font-heading text-lg uppercase text-[#260805]">No matching services</h3>
                <p className="text-xs text-[#7A706A] mt-1 mb-4">
                  No services found matching "{searchQuery}".
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedGender('all');
                  }}
                  className="px-4 py-1.5 rounded-full bg-[#260805] text-white text-xs uppercase tracking-wider font-semibold cursor-pointer"
                >
                  Reset Search
                </button>
              </div>
            ) : (
              groupedServices.map(([subCat, items]) => (
                <section key={subCat} className="bg-white rounded-2xl border border-[#ECE4DF] p-6 sm:p-8 shadow-xs">
                  {/* Category Header */}
                  <div className="flex items-baseline justify-between border-b border-[#ECE4DF] pb-3 mb-6">
                    <div>
                      <span className="text-[10px] uppercase tracking-[0.24em] font-semibold text-[#83453B] block">
                        {items[0].sectionLabel}
                      </span>
                      <h2 className="font-heading text-xl sm:text-2xl uppercase tracking-wide text-[#260805]">
                        {subCat}
                      </h2>
                    </div>
                    <span className="text-xs text-[#7A706A] font-light">
                      {items.length} {items.length === 1 ? 'service' : 'services'}
                    </span>
                  </div>

                  {/* Classic Editorial Item Rows */}
                  <div className="divide-y divide-[#F2ECE6]">
                    {items.map((svc) => (
                      <div
                        key={svc.id}
                        className="py-4 first:pt-0 last:pb-0 flex flex-col md:flex-row md:items-start justify-between gap-3 group"
                      >
                        {/* Service Title and Description */}
                        <div className="flex-1 pr-4">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <h3 className="font-heading text-[15px] sm:text-[16px] text-[#260805] uppercase tracking-wide group-hover:text-[#83453B] transition-colors">
                              {svc.name}
                            </h3>
                            {svc.brand && (
                              <span className="text-[9.5px] px-2 py-0.5 rounded-full bg-[#FAF8F5] border border-[#ECE4DF] text-[#7A706A]">
                                {svc.brand}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-[#6F6864] font-light leading-relaxed max-w-2xl">
                            {svc.description}
                          </p>
                        </div>

                        {/* Price and Action Buttons */}
                        <div className="flex items-center md:flex-col md:items-end justify-between gap-2 shrink-0 pt-2 md:pt-0">
                          <div className="font-heading text-sm sm:text-[15px] font-semibold text-[#260805] text-right">
                            {svc.price}
                          </div>
                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => handleBookingClick(svc.name)}
                              className="px-3.5 py-1.5 rounded-full bg-[#260805] hover:bg-[#83453B] text-white text-[10.5px] uppercase tracking-[0.14em] font-medium transition-colors cursor-pointer"
                            >
                              Book
                            </button>
                            <button
                              type="button"
                              onClick={() => setBranchWaModal({ open: true, serviceName: svc.name })}
                              className="p-1.5 rounded-full border border-[#DCD5CD] hover:border-[#83453B] text-[#83453B] hover:bg-[#FAF8F5] transition-colors cursor-pointer"
                              title={`WhatsApp enquire about ${svc.name}`}
                              aria-label={`WhatsApp enquiry for ${svc.name}`}
                            >
                              <MessageCircle size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              ))
            )}
          </div>
        )}

        {/* 5. Simple Branch Direct Booking Strip */}
        <section className="mt-14 pt-10 border-t border-[#ECE4DF] text-center">
          <h3 className="font-heading text-lg sm:text-xl uppercase tracking-wider text-[#260805] mb-2">
            Visit Our Salons Across Kolkata
          </h3>
          <p className="text-xs text-[#6F6864] max-w-lg mx-auto mb-6 font-light">
            Walk-ins welcome, or book in advance for personalized consultations with our senior stylists.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {SALON_BRANCHES.map((b) => (
              <button
                key={b.name}
                type="button"
                onClick={() => openWhatsAppBranch(b.waNumber, b.name)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white border border-[#DCD5CD] hover:border-[#83453B] text-xs text-[#260805] transition-all cursor-pointer shadow-2xs"
              >
                <span className="font-medium">{b.name} Branch</span>
                <span className="text-[#83453B] font-mono text-[11px]">({b.display})</span>
              </button>
            ))}
          </div>
        </section>
      </main>

      {/* 6. Direct WhatsApp Branch Selector Modal */}
      <AnimatePresence>
        {branchWaModal.open && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setBranchWaModal({ open: false, serviceName: '' })}
              className="absolute inset-0 bg-black/60 backdrop-blur-xs"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-sm bg-white rounded-2xl p-6 shadow-2xl z-10 border border-[#ECE4DF]"
            >
              <div className="flex items-center justify-between pb-3 border-b border-[#F0EAE4] mb-3">
                <h3 className="font-heading text-lg text-[#260805] uppercase">
                  Select Salon Branch
                </h3>
                <button
                  type="button"
                  onClick={() => setBranchWaModal({ open: false, serviceName: '' })}
                  className="p-1 text-[#7A706A] hover:bg-[#F4EFEA] rounded-full cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>

              <p className="text-xs text-[#6F6864] mb-4 font-light">
                Enquiring about: <strong className="text-[#260805]">{branchWaModal.serviceName}</strong>. Choose a branch to chat on WhatsApp:
              </p>

              <div className="space-y-2">
                {SALON_BRANCHES.map((b) => (
                  <button
                    key={b.name}
                    type="button"
                    onClick={() => openWhatsAppBranch(b.waNumber, b.name, branchWaModal.serviceName)}
                    className="w-full flex items-center justify-between p-3 rounded-xl border border-[#ECE4DF] hover:border-[#83453B] hover:bg-[#FAF8F5] transition-all text-left cursor-pointer group"
                  >
                    <div>
                      <div className="font-heading text-sm font-semibold text-[#260805] group-hover:text-[#83453B]">
                        {b.name} Branch
                      </div>
                      <div className="text-[11px] text-[#7A706A]">{b.display}</div>
                    </div>
                    <ChevronRight size={14} className="text-[#83453B]" />
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 7. Reference Footer (Without Marketing By) */}
      <Footer onNavigate={onNavigate} onOpenBooking={() => onOpenBooking()} />
    </div>
  );
}
