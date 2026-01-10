export interface Service {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  icon: string;
  features?: string[];
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
export interface TeamMember {
  id: string;
  name: string;
  role: string;
  expertise: string;
  bio: string;
  image: string;
  socials: {
    linkedin?: string;
    twitter?: string;
  };
}
export interface CaseStudy {
  id: string;
  title: string;
  client: string;
  brief: string;
  outcome: string;
  image: string;
}
export const SERVICES: Service[] = [
  {
    id: 'corporate-law',
    title: 'Corporate Law',
    description: 'Expert guidance on mergers, acquisitions, and day-to-day corporate governance for global enterprises.',
    longDescription: 'Our corporate practice is the cornerstone of the firm, representing a diverse client base ranging from multinational corporations to emerging growth companies. We provide comprehensive legal support through every stage of the business lifecycle.',
    icon: 'Briefcase',
    features: [
      'Mergers & Acquisitions',
      'Corporate Governance',
      'Venture Capital & Private Equity',
      'Joint Ventures & Strategic Alliances',
      'Public & Private Offerings'
    ]
  },
  {
    id: 'intellectual-property',
    title: 'Intellectual Property',
    description: 'Securing your innovations with robust patent, trademark, and copyright protection strategies.',
    longDescription: 'In a knowledge-based economy, protecting your intellectual capital is paramount. Our IP group combines deep technical expertise with legal acumen to safeguard your most valuable intangible assets across global jurisdictions.',
    icon: 'ShieldCheck',
    features: [
      'Patent Prosecution & Litigation',
      'Trademark Portfolio Management',
      'Copyright Protection',
      'Trade Secret Counseling',
      'Licensing & Technology Transfer'
    ]
  },
  {
    id: 'dispute-resolution',
    title: 'Dispute Resolution',
    description: 'Strategic litigation and alternative dispute resolution services to protect your commercial interests.',
    longDescription: 'When conflicts arise, we prioritize strategic resolution that aligns with your business objectives. Whether through aggressive litigation or sophisticated alternative dispute resolution, we protect your interests in the most complex forums.',
    icon: 'Scale',
    features: [
      'Commercial Litigation',
      'International Arbitration',
      'White-Collar Defense',
      'Crisis Management',
      'Employment Disputes'
    ]
  },
];
export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'elena-vance',
    name: 'Elena Vance',
    role: 'Senior Partner',
    expertise: 'Technology & IP Law',
    bio: 'With over 20 years of experience, Elena has pioneered legal frameworks for emerging technologies. She serves as a strategic advisor to Fortune 100 tech giants.',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
    socials: { linkedin: '#', twitter: '#' }
  },
  {
    id: 'julian-thorne',
    name: 'Julian Thorne',
    role: 'Head of Corporate',
    expertise: 'Cross-Border M&A',
    bio: 'Julian specializes in multi-jurisdictional transactions and corporate restructuring. He has overseen deals exceeding $50 billion in total value.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
    socials: { linkedin: '#' }
  },
  {
    id: 'marcus-reid',
    name: 'Marcus Reid',
    role: 'Partner',
    expertise: 'Litigation & Arbitration',
    bio: 'A formidable presence in the courtroom, Marcus represents clients in high-stakes commercial disputes and international arbitration cases.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
    socials: { twitter: '#' }
  },
  {
    id: 'sophia-chen',
    name: 'Sophia Chen',
    role: 'Senior Counsel',
    expertise: 'Global Compliance',
    bio: 'Sophia leads our regulatory compliance division, ensuring clients navigate the complex landscape of international trade and data privacy laws.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    socials: { linkedin: '#' }
  }
];
export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'tech-merger-2024',
    title: 'Global Tech Merger',
    client: 'Stellar Systems Inc.',
    brief: 'Navigated complex regulatory hurdles across 12 jurisdictions to facilitate a $4.2B merger.',
    outcome: 'Successful closing within 8 months with all regulatory approvals secured.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80'
  },
  {
    id: 'ip-defense-2023',
    title: 'Biotech IP Defense',
    client: 'Genomix Labs',
    brief: 'Defended critical gene-editing patents against a multi-national infringement challenge.',
    outcome: 'Complete victory in federal court, securing patents and $120M in damages.',
    image: 'https://images.unsplash.com/photo-1532187863486-abf9d39d99f5?w=800&q=80'
  }
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