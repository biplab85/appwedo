import { LucideIcon } from 'lucide-react';

export interface NavLink {
  label: string;
  href: string;
}

export interface NavigationContent {
  logo: string;
  navLinks: NavLink[];
  ctaButton: string;
}

export interface SocialProofStat {
  value: string;
  label: string;
}

export interface HeroSlide {
  id: number;
  title: string;
  description: string;
  type: 'web' | 'mobile' | 'api';
}

export interface HeroContent {
  headline: string;
  subheadline: string;
  primaryCTA: string;
  secondaryCTA: string;
  socialProof: SocialProofStat[];
  slides: HeroSlide[];
}

export interface PainPoint {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface ProblemContent {
  headline: string;
  subheadline: string;
  painPoints: PainPoint[];
}

export interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface SolutionContent {
  headline: string;
  subheadline: string;
  features: Feature[];
}

export interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface ServicesContent {
  label: string;
  headline: string;
  subheadline: string;
  services: Service[];
}

export interface Benefit {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface BenefitsContent {
  label: string;
  headline: string;
  subheadline: string;
  benefits: Benefit[];
}

export interface Step {
  number: number;
  title: string;
  description: string;
}

export interface ActionPlanContent {
  label: string;
  headline: string;
  subheadline: string;
  steps: Step[];
}

export interface Product {
  icon: LucideIcon;
  name: string;
}

export interface ProductsContent {
  label: string;
  headline: string;
  products: Product[];
}

export interface Testimonial {
  quote: string;
  name: string;
  title: string;
  company: string;
  avatar?: string;
}

export interface TestimonialsContent {
  label: string;
  headline: string;
  testimonials: Testimonial[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQContent {
  label: string;
  headline: string;
  faqs: FAQItem[];
}

export interface SpecialOfferContent {
  headline: string;
  offer: string;
  subheadline: string;
  cta: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  responseTime: string;
}

export interface FinalCTAContent {
  headline: string;
  subheadline: string;
  primaryCTA: string;
  secondaryCTA: string;
  contactInfo: ContactInfo;
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterContent {
  tagline: string;
  quickLinks: FooterLink[];
  legalLinks: FooterLink[];
  address: string;
  email: string;
  phone: string;
  copyright: string;
}

export interface SiteContent {
  navigation: NavigationContent;
  hero: HeroContent;
  problem: ProblemContent;
  solution: SolutionContent;
  services: ServicesContent;
  benefits: BenefitsContent;
  actionPlan: ActionPlanContent;
  products: ProductsContent;
  testimonials: TestimonialsContent;
  faq: FAQContent;
  specialOffer: SpecialOfferContent;
  finalCTA: FinalCTAContent;
  footer: FooterContent;
}
