import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Briefcase, ShieldCheck, Scale, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { SectionHeader } from '@/components/ui/section-header';
import { SERVICES, TESTIMONIALS, BLOG_POSTS } from '@/lib/data';
import { Link } from 'react-router-dom';
const iconMap: Record<string, any> = {
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
          <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-[2px]" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6 backdrop-blur-md">
              A Global Leader in Premium Legal Solutions
            </span>
            <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-[1.1] mb-8">
              Strategic Counsel for a <span className="text-primary">Complex World</span>
            </h1>
            <p className="text-xl text-slate-300 mb-10 leading-relaxed">
              We empower industry leaders with elite legal strategies that protect assets, minimize risk, and catalyze transformative growth.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="px-8 h-14 text-lg rounded-full">
                Schedule Consultation
              </Button>
              <Button size="lg" variant="outline" className="px-8 h-14 text-lg rounded-full bg-white/5 text-white border-white/20 hover:bg-white/10">
                Our Practice Areas
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
      {/* Trust Bar */}
      <section className="py-12 border-y border-border/50 bg-accent/5">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-8">Trusted by Global Entities</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            {['FORTUNE 500', 'GLOBAL TECH', 'NYC FINANCE', 'EU LOGISTICS'].map(brand => (
              <span key={brand} className="text-2xl font-black italic">{brand}</span>
            ))}
          </div>
        </div>
      </section>
      {/* Services Section */}
      <section id="services" className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            title="Elite Legal Expertise"
            subtitle="Our multidisciplinary teams provide sophisticated advice across all major sectors of commercial activity."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SERVICES.map((service, idx) => {
              const Icon = iconMap[service.icon];
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Card className="h-full border-none shadow-soft hover:shadow-xl transition-all duration-300 group hover:-translate-y-2">
                    <CardContent className="p-8">
                      <div className="w-14 h-14 rounded-2xl bg-accent flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                        <Icon className="w-7 h-7" />
                      </div>
                      <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                      <p className="text-muted-foreground leading-relaxed mb-6">
                        {service.description}
                      </p>
                      <Link to="#" className="inline-flex items-center text-primary font-semibold hover:gap-2 transition-all">
                        Learn More <ArrowRight className="ml-2 w-4 h-4" />
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
      <section className="py-24 md:py-32 bg-slate-950 text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block">Proven Results</span>
              <h2 className="text-4xl md:text-5xl font-bold mb-8">Our commitment to excellence is reflected in our clients' success.</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <CheckCircle2 className="text-primary w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">98% Retention Rate</h4>
                    <p className="text-slate-400">Our long-term partnerships are built on consistent value and trust.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <CheckCircle2 className="text-primary w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Billion-Dollar Deal Desk</h4>
                    <p className="text-slate-400">Handling high-stakes negotiations with surgical precision.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid gap-8">
              {TESTIMONIALS.map((t, idx) => (
                <motion.div 
                  key={t.id}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.2 }}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-3xl"
                >
                  <Quote className="w-10 h-10 text-primary/40 mb-4" />
                  <p className="text-xl italic mb-6 text-slate-200">"{t.content}"</p>
                  <div className="flex items-center gap-4">
                    <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover border-2 border-primary/20" />
                    <div>
                      <h5 className="font-bold">{t.name}</h5>
                      <p className="text-sm text-slate-500">{t.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* Latest Insights Preview */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <SectionHeader 
              title="Global Insights"
              subtitle="Latest perspectives on law, policy, and market dynamics."
              alignment="left"
              className="mb-0 max-w-xl"
            />
            <Link to="/blog">
              <Button variant="outline" className="hidden md:flex rounded-full px-8">
                View All Articles
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {BLOG_POSTS.slice(0, 3).map((post) => (
              <Link key={post.id} to={`/blog/${post.id}`}>
                <Card className="group h-full overflow-hidden border-none shadow-soft hover:shadow-xl transition-all">
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-6">
                    <span className="text-xs font-bold text-primary uppercase tracking-wider mb-2 block">{post.category}</span>
                    <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{post.title}</h3>
                    <p className="text-muted-foreground text-sm line-clamp-2">{post.excerpt}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          <div className="mt-8 flex justify-center md:hidden">
            <Link to="/blog">
              <Button variant="outline" className="w-full">View All Articles</Button>
            </Link>
          </div>
        </div>
      </section>
      {/* Final CTA */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">Secure Your Future with Global Legal Experts</h2>
          <p className="text-xl text-primary-foreground/80 mb-12 max-w-2xl mx-auto">
            Contact us today for a confidential consultation with our senior partners.
          </p>
          <Button size="lg" variant="secondary" className="px-12 h-16 text-lg rounded-full shadow-2xl">
            Book Appointment
          </Button>
        </div>
      </section>
    </div>
  );
}