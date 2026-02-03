import {
  Package,
  Users,
  Unplug,
  Clock,
  Code,
  Layers,
  DollarSign,
  Headphones,
  Globe,
  Monitor,
  Smartphone,
  Link2,
  Shield,
  Award,
  Heart,
  RefreshCw,
  Settings,
  Palette,
  Layout,
  Plug,
  Puzzle,
  FileCode,
  AppWindow,
  Server,
  Database,
  ShoppingCart,
  Building2,
  UserCircle,
} from 'lucide-react';
import type { SiteContent } from './types';

export const siteContent: SiteContent = {
  navigation: {
    logo: 'APPWEDO',
    navLinks: [
      { label: 'Services', href: '#services' },
      { label: 'Products', href: '#products' },
      { label: 'About', href: '#about' },
      { label: 'Team', href: '#team' },
    ],
    ctaButton: 'Get a Free Quote',
  },

  hero: {
    headline: 'We Build the Apps That Build Your Business',
    subheadline:
      'Custom web applications, mobile apps, and powerful APIs — engineered to solve your biggest business challenges. From idea to launch, we handle everything.',
    primaryCTA: 'Start Your Project',
    secondaryCTA: 'View Our Work',
    socialProof: [
      { value: '50+', label: 'Projects Delivered' },
      { value: '3', label: 'Continents Served' },
      { value: '100%', label: 'On-Time Delivery' },
    ],
    slides: [
      {
        id: 1,
        title: 'Web Dashboard',
        description: 'Custom dashboards & portals',
        type: 'web' as const,
      },
      {
        id: 2,
        title: 'Mobile Apps',
        description: 'iOS & Android applications',
        type: 'mobile' as const,
      },
      {
        id: 3,
        title: 'API Integration',
        description: 'Connect your systems',
        type: 'api' as const,
      },
    ],
  },

  problem: {
    headline: 'Your Business Deserves Better Than Off-the-Shelf Software',
    subheadline:
      "Generic tools force you to adapt your workflow to their limitations. You need technology that adapts to YOU — but finding reliable developers is a nightmare.",
    painPoints: [
      {
        icon: Package,
        title: "Off-the-shelf software doesn't fit",
        description:
          "You're paying for features you don't need and missing the ones you do. Your team wastes hours on workarounds.",
      },
      {
        icon: Users,
        title: 'Finding good developers is exhausting',
        description:
          "Freelancers ghost you. Agencies overcharge. Offshore teams deliver buggy code. You've been burned before.",
      },
      {
        icon: Unplug,
        title: "Your systems don't talk to each other",
        description:
          "Data lives in silos. Manual data entry eats up your team's time. Integration feels impossible.",
      },
      {
        icon: Clock,
        title: 'Projects always go over budget and timeline',
        description:
          '"It\'ll be ready in 2 weeks" turns into 2 months. Scope creep destroys your budget.',
      },
    ],
  },

  solution: {
    headline: 'Meet AppWeDo — Your Trusted Development Partner',
    subheadline:
      "We're a full-service software development company that builds custom web apps, mobile apps, and APIs tailored to your exact business needs. No cookie-cutter solutions. No surprises.",
    features: [
      {
        icon: Code,
        title: 'Custom-built for your workflow',
        description:
          'Every line of code is written specifically for how YOUR business operates. Not the other way around.',
      },
      {
        icon: Layers,
        title: 'Web + Mobile + API — all in one team',
        description:
          'No juggling multiple vendors. We handle your entire tech stack under one roof.',
      },
      {
        icon: DollarSign,
        title: 'Transparent pricing, on-time delivery',
        description:
          'Fixed quotes. Clear timelines. Weekly progress updates. You always know where your project stands.',
      },
      {
        icon: Headphones,
        title: 'Ongoing support included',
        description:
          "We don't disappear after launch. Yearly technical support keeps your systems running smoothly.",
      },
    ],
  },

  services: {
    label: 'Our Services',
    headline: 'Everything You Need to Go Digital',
    subheadline:
      "From a simple website to a complex enterprise system, we've got you covered.",
    services: [
      {
        icon: Monitor,
        title: 'Web Application Development',
        description:
          'We build innovative, scalable web applications that provide total communication and information solutions for your business. Custom dashboards, portals, ERPs, CRMs — you name it.',
      },
      {
        icon: Smartphone,
        title: 'Mobile App Development',
        description:
          'Bespoke iOS and Android applications with smooth, powerful functionality. Native performance. Beautiful interfaces. Apps your customers will actually want to use.',
      },
      {
        icon: Link2,
        title: 'API Design & Integration',
        description:
          'Connect your systems. Automate your workflows. Our API integration services enhance your website and app performance by making everything work together seamlessly.',
      },
      {
        icon: Shield,
        title: 'Yearly Technical Support',
        description:
          "We're not just developers — we're your long-term technology partner. Ongoing maintenance, updates, and support to keep your systems running 24/7.",
      },
    ],
  },

  benefits: {
    label: 'Why AppWeDo',
    headline: 'The AppWeDo Difference',
    subheadline:
      "We're not just another dev shop. Here's what makes working with us different.",
    benefits: [
      {
        icon: Award,
        title: 'Quality Over Speed',
        description:
          "We don't cut corners. Every project goes through rigorous testing before delivery.",
      },
      {
        icon: DollarSign,
        title: 'Best Price-to-Quality Ratio',
        description:
          'Premium development without the premium price tag. Get more for your budget.',
      },
      {
        icon: Heart,
        title: 'User-Friendly First',
        description:
          'We obsess over user experience. Your customers and employees will actually enjoy using what we build.',
      },
      {
        icon: Globe,
        title: 'Global Reach, Local Presence',
        description:
          'Headquartered in Canada with a global delivery team. Professional communication, every time.',
      },
      {
        icon: RefreshCw,
        title: 'Full Lifecycle Support',
        description:
          "From requirements gathering to post-launch maintenance — we're with you the entire journey.",
      },
      {
        icon: Settings,
        title: 'Flexible Engagement Models',
        description:
          'Fixed price projects, dedicated teams, or hourly support — work with us however suits you best.',
      },
    ],
  },

  actionPlan: {
    label: 'How It Works',
    headline: 'From Idea to Launch in 4 Steps',
    subheadline:
      'Our proven process ensures your project is delivered on time, on budget, and exactly as you envisioned.',
    steps: [
      {
        number: 1,
        title: 'Discovery Call',
        description:
          'We listen to your challenges, understand your goals, and map out the solution. No commitment — just a conversation.',
      },
      {
        number: 2,
        title: 'Proposal & Planning',
        description:
          'You receive a detailed proposal with scope, timeline, and fixed pricing. No hidden fees. No surprises.',
      },
      {
        number: 3,
        title: 'Design & Development',
        description:
          'Our team builds your solution with weekly updates. You see progress every step of the way and can provide feedback.',
      },
      {
        number: 4,
        title: 'Launch & Support',
        description:
          'We deploy your product, train your team, and provide ongoing technical support to keep everything running smoothly.',
      },
    ],
  },

  products: {
    label: 'Our Products',
    headline: 'Solutions for Every Business Need',
    products: [
      { icon: Palette, name: 'UI/UX Design' },
      { icon: Layout, name: 'CMS Implementation' },
      { icon: Plug, name: 'CMS Plugins Design' },
      { icon: Puzzle, name: 'CMS Extensions Design' },
      { icon: FileCode, name: 'CMS Template Design' },
      { icon: Smartphone, name: 'Mobile App Development' },
      { icon: AppWindow, name: 'Open App Solutions' },
      { icon: Server, name: 'RESTful API Design' },
      { icon: Code, name: 'Open API Development' },
      { icon: Database, name: 'ERP Systems' },
      { icon: Users, name: 'CRM Solutions' },
      { icon: ShoppingCart, name: 'E-commerce Platforms' },
      { icon: Building2, name: 'B2B Applications' },
      { icon: UserCircle, name: 'B2C Applications' },
    ],
  },

  testimonials: {
    label: 'Client Success Stories',
    headline: 'Trusted by Businesses Worldwide',
    testimonials: [
      {
        quote:
          'AppWeDo transformed our outdated systems into a sleek, integrated platform. Our team saves 15 hours a week on manual data entry alone. The ROI was visible within the first month.',
        name: 'David Chen',
        title: 'Operations Director',
        company: 'Logistics Company',
      },
      {
        quote:
          "They delivered our mobile app 2 weeks ahead of schedule and under budget. Communication was flawless — weekly calls, clear updates, no surprises. Finally, a dev team I can trust.",
        name: 'Sarah Mitchell',
        title: 'Founder',
        company: 'Health & Wellness Startup',
      },
      {
        quote:
          'We needed a complex API integration that two other agencies said was impossible. AppWeDo made it happen. Our systems finally talk to each other.',
        name: 'Michael Torres',
        title: 'CTO',
        company: 'E-commerce Platform',
      },
      {
        quote:
          "Their ongoing support has been incredible. Any issue we have is resolved within hours, not days. It's like having an in-house tech team without the overhead.",
        name: 'Jennifer Park',
        title: 'CEO',
        company: 'SaaS Company',
      },
    ],
  },

  faq: {
    label: 'Common Questions',
    headline: 'Frequently Asked Questions',
    faqs: [
      {
        question: 'How long does a typical project take?',
        answer:
          "It depends on complexity. A simple website takes 2-4 weeks. A custom mobile app takes 8-12 weeks. A full enterprise system can take 3-6 months. We'll give you an accurate timeline during our discovery call.",
      },
      {
        question: 'How much does it cost?',
        answer:
          'Projects start at $5,000 for basic web applications. Mobile apps typically range from $15,000-$50,000. Enterprise solutions are custom-quoted. We offer fixed pricing with no hidden fees.',
      },
      {
        question: 'Do you work with startups or only established businesses?',
        answer:
          'Both! We love helping startups bring their vision to life, and we have the enterprise experience to handle complex corporate projects. Our flexible engagement models work for any size.',
      },
      {
        question: 'What technologies do you use?',
        answer:
          "We're technology-agnostic and choose the best tools for your project. Our stack includes React, Node.js, Python, PHP, Swift, Kotlin, Flutter, and more. We also work with major CMS platforms.",
      },
      {
        question: 'Will I own the code?',
        answer:
          "Absolutely. You own 100% of the code, designs, and intellectual property we create for you. It's your product.",
      },
      {
        question: 'What happens after launch?',
        answer:
          "We offer yearly technical support packages that include maintenance, updates, bug fixes, and priority support. We're your long-term technology partner, not a one-and-done vendor.",
      },
    ],
  },

  specialOffer: {
    headline: 'First Time Working With Us?',
    offer: 'Save 25% on Your First Project',
    subheadline:
      'New clients get 25% off their first project. No strings attached. See why businesses trust AppWeDo to build their most important software.',
    cta: 'Claim Your Discount',
  },

  finalCTA: {
    headline: 'Ready to Solve Your Biggest Business Challenge?',
    subheadline:
      "Stop struggling with software that doesn't fit. Let's build something custom — designed around the way you actually work.",
    primaryCTA: 'Get Your Free Quote',
    secondaryCTA: 'Schedule a Discovery Call',
    contactInfo: {
      email: 'info@appwedo.com',
      phone: '+88 01799783391',
      responseTime: 'Social media — within a day | Email — up to 3 days',
    },
  },

  footer: {
    tagline:
      'We Create Your Apps — Web, Mobile & API solutions that solve real business problems.',
    quickLinks: [
      { label: 'Home', href: '#' },
      { label: 'About Us', href: '#about' },
      { label: 'Our Services', href: '#services' },
      { label: 'Meet The Team', href: '#team' },
      { label: 'Contact Us', href: '#contact' },
    ],
    legalLinks: [
      { label: 'Terms & Conditions', href: '#' },
      { label: 'Privacy Policy', href: '#' },
      { label: 'Customer Support', href: '#' },
      { label: 'Payments', href: '#' },
      { label: 'Help', href: '#' },
      { label: 'FAQs', href: '#faq' },
    ],
    address: 'Unit #201 - 1017 Fort St, Victoria, British Columbia, V8V 3K5, Canada',
    email: 'info@appwedo.com',
    phone: '+88 01799783391',
    copyright: '© APPWEDO. All Rights Reserved.',
  },
};
