export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}
export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  avatar: string;
}
export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  image: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
}
export const SERVICES: Service[] = [
  {
    id: 'corporate-law',
    title: 'Corporate Law',
    description: 'Expert guidance on mergers, acquisitions, and day-to-day corporate governance for global enterprises.',
    icon: 'Briefcase',
  },
  {
    id: 'intellectual-property',
    title: 'Intellectual Property',
    description: 'Securing your innovations with robust patent, trademark, and copyright protection strategies.',
    icon: 'ShieldCheck',
  },
  {
    id: 'dispute-resolution',
    title: 'Dispute Resolution',
    description: 'Strategic litigation and alternative dispute resolution services to protect your commercial interests.',
    icon: 'Scale',
  },
];
export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Jenkins',
    role: 'CEO, TechNova Solutions',
    content: 'LexCorp provided impeccable legal support during our international expansion. Their attention to detail is unmatched.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
  },
  {
    id: '2',
    name: 'Marcus Thorne',
    role: 'Founder, Thorne Real Estate',
    content: 'A truly premium experience. They don’t just offer legal advice; they offer strategic partnership.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
  },
];
export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'future-of-ai-regulation',
    title: 'The Future of AI Regulation in 2025',
    excerpt: 'As artificial intelligence continues to evolve, global legal frameworks are racing to catch up. Here is what you need to know.',
    content: `
      <p>The landscape of Artificial Intelligence regulation is shifting rapidly. Governments worldwide are moving from theoretical frameworks to enforceable statutes. For businesses, this means a significant increase in compliance requirements.</p>
      <h3>The Rise of the EU AI Act</h3>
      <p>The European Union has set a global benchmark with the AI Act, categorizing AI systems by risk. Understanding where your software fits into this hierarchy is no longer optional.</p>
      <h3>Liability in the Age of Autonomy</h3>
      <p>Who is responsible when an AI makes a mistake? Current litigation trends suggest a pivot toward developer accountability, making robust insurance and legal audits essential.</p>
    `,
    category: 'Technology Law',
    date: 'Oct 12, 2024',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
    author: {
      name: 'Elena Vance',
      role: 'Senior Partner',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    },
  },
  {
    id: 'mergers-acquisitions-trends',
    title: 'M&A Trends: Navigating High Interest Rates',
    excerpt: 'Despite economic headwinds, strategic acquisitions remain a key growth driver for resilient firms.',
    content: '<p>Complete guide to modern M&A strategies in a volatile market...</p>',
    category: 'Corporate',
    date: 'Nov 05, 2024',
    image: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800&q=80',
    author: {
      name: 'Julian Thorne',
      role: 'Head of Corporate',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
    },
  },
  {
    id: 'protecting-your-brand',
    title: 'Global Trademarking: Protecting Your Brand',
    excerpt: 'Expanding into new territories requires a proactive approach to intellectual property rights.',
    content: '<p>Steps to ensure your brand is protected globally...</p>',
    category: 'IP Law',
    date: 'Dec 01, 2024',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80',
    author: {
      name: 'Elena Vance',
      role: 'Senior Partner',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    },
  },
];