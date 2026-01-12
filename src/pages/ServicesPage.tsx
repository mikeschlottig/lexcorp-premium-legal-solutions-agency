import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Briefcase, ShieldCheck, Scale, ArrowRight, Zap } from 'lucide-react';
import { SERVICES, CASE_STUDIES } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { SectionHeader } from '@/components/ui/section-header';
const iconMap: Record<string, any> = {
  Briefcase,
  ShieldCheck,
  Scale,
};
export function ServicesPage() {
  return (
    <div className="w-full">
      {/* Services Hero */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 bg-slate-950 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1600&q=80" 
            className="w-full h-full object-cover"
            alt="Corporate Environment"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block">Our Expertise</span>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Mastering the Legal <br className="hidden md:block"/> Complexity of Business</h1>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Tailored legal frameworks designed to secure your commercial interests and catalyze global growth.
            </p>
          </motion.div>
        </div>
      </section>
      {/* Detailed Services Breakdown */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {SERVICES.map((service, idx) => {
            const Icon = iconMap[service.icon];
            const isEven = idx % 2 === 0;
            return (
              <div key={service.id} className={`flex flex-col lg:flex-row gap-16 items-center mb-32 last:mb-0 ${isEven ? '' : 'lg:flex-row-reverse'}`}>
                <div className="flex-1 space-y-8">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                    <Icon className="w-8 h-8" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold">{service.title}</h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {service.longDescription}
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {service.features?.map((feature) => (
                      <li key={feature} className="flex items-center gap-3 text-sm font-medium">
                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button size="lg" className="rounded-full">Request Case Analysis</Button>
                </div>
                <div className="flex-1 w-full">
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl"
                  >
                    <img 
                      src={`https://images.unsplash.com/photo-${idx === 0 ? '1450101499163-c8848c66ca85' : idx === 1 ? '1589829545856-d10d557cf95f' : '1505664194779-8beaceb93744'}?w=800&q=80`} 
                      className="w-full h-full object-cover"
                      alt={service.title}
                    />
                  </motion.div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
      {/* Case Studies Teaser */}
      <section className="py-24 md:py-32 bg-accent/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            title="Strategic Outcomes" 
            subtitle="Explore how our tactical legal solutions translated into real-world commercial success."
            alignment="center"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {CASE_STUDIES.map((study) => (
              <Card key={study.id} className="overflow-hidden border-none shadow-soft hover:shadow-xl transition-all">
                <div className="aspect-video relative overflow-hidden">
                  <img src={study.image} alt={study.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <span className="text-primary font-bold text-xs uppercase tracking-widest">{study.client}</span>
                    <h3 className="text-white text-2xl font-bold">{study.title}</h3>
                  </div>
                </div>
                <CardContent className="p-8">
                  <div className="mb-6">
                    <h4 className="font-bold text-sm uppercase text-muted-foreground mb-2">The Brief</h4>
                    <p className="text-muted-foreground">{study.brief}</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm uppercase text-muted-foreground mb-2">Result</h4>
                    <p className="font-semibold text-foreground">{study.outcome}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      {/* Process Section */}
      <section className="py-24 md:py-32 bg-slate-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Our Methodology</h2>
            <p className="text-slate-400">A rigorous, disciplined approach to every legal challenge.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            <div className="hidden md:block absolute top-12 left-0 right-0 h-0.5 bg-white/10" />
            {[
              { step: '01', title: 'Consultation', desc: 'In-depth analysis of your business landscape and legal objectives.' },
              { step: '02', title: 'Strategy', desc: 'Crafting high-impact legal frameworks tailored to your risk profile.' },
              { step: '03', title: 'Execution', desc: 'Surgical implementation and ongoing protection of your interests.' }
            ].map((item, i) => (
              <div key={i} className="relative z-10 text-center space-y-4">
                <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center text-white text-3xl font-bold mx-auto border-8 border-slate-900 shadow-2xl">
                  {item.step}
                </div>
                <h3 className="text-2xl font-bold pt-4">{item.title}</h3>
                <p className="text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* CTA */}
      <section className="py-24 bg-primary text-primary-foreground text-center">
        <div className="max-w-4xl mx-auto px-4">
          <Zap className="w-12 h-12 mx-auto mb-8 animate-pulse" />
          <h2 className="text-4xl font-bold mb-6">Ready to Strengthen Your Legal Position?</h2>
          <p className="text-xl opacity-80 mb-10">Schedule an introductory meeting with our practice area specialists.</p>
          <Button size="lg" variant="secondary" className="rounded-full px-12 h-16 text-lg">
            Consult a Specialist
          </Button>
        </div>
      </section>
    </div>
  );
}