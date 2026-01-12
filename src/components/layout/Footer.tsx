import React from 'react';
import { Link } from 'react-router-dom';
import { Gavel, Linkedin, Twitter, Mail, MapPin, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
export function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-primary text-primary-foreground p-1.5 rounded-lg">
                <Gavel className="w-6 h-6" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                LEX<span className="text-slate-500 font-light">CORP</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed max-w-xs">
              Defining the future of legal services with strategic precision and unwavering commitment to client success.
            </p>
            <div className="flex gap-4">
              <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white">
                <Linkedin className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white">
                <Twitter className="w-5 h-5" />
              </Button>
            </div>
          </div>
          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-white font-semibold">Expertise</h4>
            <ul className="space-y-4 text-sm">
              <li><Link to="/services" className="hover:text-white transition-colors">Corporate Governance</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">Digital Assets & AI</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">Litigation & Arbitration</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">Mergers & Acquisitions</Link></li>
            </ul>
          </div>
          {/* Contact */}
          <div className="space-y-6">
            <h4 className="text-white font-semibold">Global Reach</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-1 text-primary" />
                <span>One World Trade Center, Suite 85<br />New York, NY 10007</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-primary" />
                <span>+1 (212) 555-0198</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-primary" />
                <span>counsel@lexcorp.law</span>
              </li>
            </ul>
          </div>
          {/* Newsletter */}
          <div className="space-y-6">
            <h4 className="text-white font-semibold">Stay Informed</h4>
            <p className="text-sm">Weekly insights on the evolving global legal landscape.</p>
            <div className="flex flex-col gap-2">
              <Input
                className="bg-slate-900 border-slate-800 text-white placeholder:text-slate-600 focus-visible:ring-primary"
                placeholder="Email address"
              />
              <Button className="w-full bg-white text-black hover:bg-slate-200">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p>�� 2024 LexCorp Global Partners LLP. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/about" className="hover:text-white transition-colors">About Firm</Link>
            <Link to="#" className="hover:text-white transition-colors">Attorney Advertising</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}