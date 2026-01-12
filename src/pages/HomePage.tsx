import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Briefcase, ShieldCheck, Scale, Quote, LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { SectionHeader } from '@/components/ui/section-header';
import { SERVICES, TESTIMONIALS, BLOG_POSTS } from '@/lib/data';
import { Link } from 'react-router-dom';
const iconMap: Record<string, LucideIcon> = {
  Briefcase,
  ShieldCheck,
  Scale,
};
export function HomePage() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1600&q=80"
            className="w-full h-full object-cover"
            alt="Corporate Conference Room"
          />
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-[1px]" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#B45309]/20 text-[#B45309] text-xs font-bold uppercase tracking-widest mb-6 backdrop-blur-md border border-[#B45309]/30">
              Elite Global Legal Counsel
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white tracking-tight leading-[1.05] mb-8">
              Strategic Counsel for a <span className="text-[#B45309]">Complex World</span>
            </h1>
            <p className="text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl font-light">
              We empower industry leaders with elite legal strategies that protect assets, minimize risk, and catalyze transformative growth in volatile global markets.
            </p>
            <div className="flex flex-wrap gap-6">
              <Button size="lg" className="px-10 h-16 text-lg rounded-full bg-[#B45309] hover:bg-[#92400E] text-white border-none shadow-glow transition-all">
                Schedule Consultation
              </Button>
              <Button size="lg" variant="outline" asChild className="px-10 h-16 text-lg rounded-full bg-white/5 text-white border-white/20 hover:bg-white/10 transition-all">
                <Link to="/services">Our Practice Areas</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
      {/* Trust Bar */}
      <section className="py-14 border-y border-border/50 bg-accent/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.3em] mb-10">Empowering Global Market Leaders</p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-40 grayscale hover:grayscale-0 transition-all duration-700 cursor-default">
            {['FORTUNE 500', 'GLOBAL TECH', 'NYC FINANCE', 'EU LOGISTICS'].map(brand => (
              <span key={brand} className="text-xl md:text-2xl font-serif font-black italic tracking-tighter hover:text-[#B45309] transition-colors">{brand}</span>
            ))}
          </div>
        </div>
      </section>
      {/* Services Section */}
      <section id="services" className="py-24 md:py-40 bg-white dark:bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Elite Legal Expertise"
            subtitle="Our multidisciplinary teams provide sophisticated advice across all major sectors of commercial activity, ensuring compliance and strategic advantage."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {SERVICES.map((service, idx) => {
              const Icon = iconMap[service.icon];
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: idx * 0.15, duration: 0.6 }}
                >
                  <Card className="h-full border-none shadow-soft hover:shadow-glow-lg transition-all duration-500 group hover:-translate-y-3 rounded-3xl overflow-hidden bg-slate-50 dark:bg-slate-900/40">
                    <CardContent className="p-10">
                      <div className="w-16 h-16 rounded-2xl bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center text-[#B45309] mb-8 group-hover:bg-[#B45309] group-hover:text-white transition-all duration-300 transform group-hover:rotate-3">
                        <Icon className="w-8 h-8" />
                      </div>
                      <h3 className="text-2xl font-serif font-bold mb-4">{service.title}</h3>
                      <p className="text-muted-foreground leading-relaxed mb-8 font-light">
                        {service.description}
                      </p>
                      <Link to="/services" className="inline-flex items-center text-[#B45309] font-bold tracking-tight hover:gap-3 transition-all">
                        Practice Overview <ArrowRight className="ml-2 w-4 h-4" />
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
      {/* Testimonials */}
      <section className="py-24 md:py-40 bg-[#0F172A] text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#B45309]/5 blur-[120px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <span className="text-[#B45309] font-bold tracking-[0.2em] uppercase text-xs mb-6 block">Proven Strategic Impact</span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-10 leading-[1.1]">The Benchmark of <br/> Professional Success.</h2>
              <div className="space-y-10">
                <div className="flex gap-6 group">
                  <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-[#B45309]/20 flex items-center justify-center border border-[#B45309]/30 group-hover:bg-[#B45309] transition-colors duration-300">
                    <CheckCircle2 className="text-[#B45309] group-hover:text-white w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-xl mb-1">98% Client Retention</h4>
                    <p className="text-slate-400 font-light leading-relaxed">Our long-term institutional partnerships are founded on consistent value delivery and absolute discretion.</p>
                  </div>
                </div>
                <div className="flex gap-6 group">
                  <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-[#B45309]/20 flex items-center justify-center border border-[#B45309]/30 group-hover:bg-[#B45309] transition-colors duration-300">
                    <CheckCircle2 className="text-[#B45309] group-hover:text-white w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-xl mb-1">Billion-Dollar Deal Desk</h4>
                    <p className="text-slate-400 font-light leading-relaxed">Navigating ultra-high-stakes negotiations with tactical precision and cross-border regulatory expertise.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid gap-10">
              {TESTIMONIALS.map((t, idx) => (
                <motion.div
                  key={t.id}
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.25, duration: 0.7 }}
                  className="bg-white/5 backdrop-blur-md border border-white/10 p-10 rounded-[2rem] relative overflow-hidden group hover:bg-white/10 transition-all"
                >
                  <Quote className="absolute -top-4 -right-4 w-24 h-24 text-white/5 group-hover:text-[#B45309]/10 transition-colors" />
                  <p className="text-xl font-serif italic mb-8 text-slate-200 leading-relaxed">"{t.content}"</p>
                  <div className="flex items-center gap-5">
                    <img src={t.avatar} alt={t.name} className="w-14 h-14 rounded-2xl object-cover border-2 border-[#B45309]/30" />
                    <div>
                      <h5 className="font-serif font-bold text-lg">{t.name}</h5>
                      <p className="text-xs uppercase tracking-widest text-slate-500 font-bold">{t.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* Final CTA */}
      <section className="py-32 bg-[#0F172A] relative overflow-hidden border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-serif font-bold mb-8 text-white">Secure Your Commercial Future</h2>
          <p className="text-xl text-slate-400 mb-14 max-w-2xl mx-auto font-light leading-relaxed">
            Contact LexCorp today for a highly confidential consultation with our senior practice partners in New York, London, or Singapore.
          </p>
          <Button size="lg" variant="secondary" asChild className="px-16 h-20 text-xl font-bold rounded-full bg-white text-[#0F172A] hover:bg-[#B45309] hover:text-white transition-all shadow-2xl">
            <Link to="/about">Our Firm Heritage</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}