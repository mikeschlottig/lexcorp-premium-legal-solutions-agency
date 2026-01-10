import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Briefcase, ShieldCheck, Scale, LucideIcon, Zap } from 'lucide-react';
import { SERVICES, CASE_STUDIES } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { SectionHeader } from '@/components/ui/section-header';
const iconMap: Record<string, LucideIcon> = {
  Briefcase,
  ShieldCheck,
  Scale,
};
export function ServicesPage() {
  return (
    <div className="w-full">
      {/* Services Hero */}
      <section className="relative pt-32 pb-24 md:pt-48 md:pb-40 bg-[#0F172A] overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10">
          <img
            src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1600&q=80"
            className="w-full h-full object-cover"
            alt="Corporate Environment"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[#B45309] font-bold tracking-[0.3em] uppercase text-xs mb-6 block">Practice Specialization</span>
            <h1 className="text-4xl md:text-7xl font-serif font-bold text-white mb-8 leading-[1.1]">Mastering Legal Complexity <br className="hidden md:block"/> in Global Markets</h1>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto font-light leading-relaxed">
              Tactical legal frameworks designed to mitigate risk, secure innovation, and catalyze exponential commercial growth across all major jurisdictions.
            </p>
          </motion.div>
        </div>
      </section>
      {/* Detailed Services Breakdown */}
      <section className="py-24 md:py-40 bg-white dark:bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {SERVICES.map((service, idx) => {
            const Icon = iconMap[service.icon];
            const isEven = idx % 2 === 0;
            return (
              <div key={service.id} className={`flex flex-col lg:flex-row gap-20 items-center mb-40 last:mb-0 ${isEven ? '' : 'lg:flex-row-reverse'}`}>
                <div className="flex-1 space-y-10">
                  <div className="w-20 h-20 rounded-[2rem] bg-[#B45309]/10 flex items-center justify-center text-[#B45309] border border-[#B45309]/20">
                    <Icon className="w-10 h-10" />
                  </div>
                  <h2 className="text-4xl md:text-5xl font-serif font-bold tracking-tight">{service.title}</h2>
                  <p className="text-lg text-muted-foreground leading-relaxed font-light">
                    {service.longDescription}
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {service.features?.map((feature) => (
                      <li key={feature} className="flex items-start gap-4 text-sm font-semibold tracking-tight">
                        <CheckCircle2 className="w-5 h-5 text-[#B45309] flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="pt-6">
                    <Button size="lg" className="rounded-full px-10 h-16 bg-[#0F172A] hover:bg-[#B45309] transition-all shadow-xl">
                      Request Partner Consultation
                    </Button>
                  </div>
                </div>
                <div className="flex-1 w-full">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="relative aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl border border-border/50"
                  >
                    <img
                      src={`https://images.unsplash.com/photo-${idx === 0 ? '1450101499163-c8848c66ca85' : idx === 1 ? '1589829545856-d10d557cf95f' : '1505664194779-8beaceb93744'}?w=800&q=80`}
                      className="w-full h-full object-cover transition-transform duration-1000 hover:scale-110"
                      alt={service.title}
                    />
                  </motion.div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
      {/* Case Studies */}
      <section className="py-24 md:py-40 bg-slate-50 dark:bg-slate-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Strategic Outcomes"
            subtitle="Explore our track record of securing high-value results through surgical legal execution and tactical foresight."
            alignment="center"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {CASE_STUDIES.map((study) => (
              <Card key={study.id} className="overflow-hidden border-none shadow-soft hover:shadow-glow-lg transition-all duration-500 rounded-[2.5rem] group">
                <div className="aspect-[16/10] relative overflow-hidden">
                  <img src={study.image} alt={study.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-10 left-10 right-10">
                    <span className="text-[#B45309] font-bold text-xs uppercase tracking-[0.3em] mb-3 block">{study.client}</span>
                    <h3 className="text-white text-3xl font-serif font-bold leading-tight">{study.title}</h3>
                  </div>
                </div>
                <CardContent className="p-10 space-y-10">
                  <div className="space-y-4">
                    <h4 className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Operational Challenge</h4>
                    <p className="text-muted-foreground leading-relaxed font-light">{study.brief}</p>
                  </div>
                  <div className="pt-8 border-t border-border/50">
                    <h4 className="font-bold text-xs uppercase tracking-widest text-[#B45309] mb-3">Definitive Outcome</h4>
                    <p className="font-serif font-bold text-xl text-foreground">{study.outcome}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      {/* Methodology */}
      <section className="py-24 md:py-40 bg-[#0F172A] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-6xl font-serif font-bold mb-6">Our Methodology</h2>
            <p className="text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">A disciplined, three-phase approach to securing elite legal outcomes for global industry leaders.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 relative">
            <div className="hidden md:block absolute top-14 left-20 right-20 h-px bg-white/10" />
            {[
              { step: '01', title: 'Consultation', desc: 'In-depth surgical analysis of the business landscape, regulatory risks, and strategic goals.' },
              { step: '02', title: 'Strategy', desc: 'Crafting high-impact legal frameworks and tactical responses tailored to complex requirements.' },
              { step: '03', title: 'Execution', desc: 'Surgical implementation and rigorous defense of your commercial and intellectual assets.' }
            ].map((item, i) => (
              <div key={i} className="relative z-10 text-center group">
                <div className="w-28 h-28 rounded-full bg-[#B45309] flex items-center justify-center text-white text-3xl font-serif font-bold mx-auto border-[12px] border-[#0F172A] shadow-2xl transition-transform duration-500 group-hover:scale-110">
                  {item.step}
                </div>
                <h3 className="text-2xl font-serif font-bold mt-10 mb-5">{item.title}</h3>
                <p className="text-slate-400 leading-relaxed font-light">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}