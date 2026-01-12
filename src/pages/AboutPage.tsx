import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Users, Trophy, Linkedin, Twitter, Target, Heart, Shield } from 'lucide-react';
import { TEAM_MEMBERS } from '@/lib/data';
import { SectionHeader } from '@/components/ui/section-header';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
export function AboutPage() {
  return (
    <div className="w-full">
      {/* About Hero */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block">Our Heritage</span>
              <h1 className="text-4xl md:text-6xl font-bold text-slate-950 mb-6 leading-tight">Defining Legal Excellence Since 1994</h1>
              <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                Founded on the principles of integrity and tactical precision, LexCorp has grown from a boutique practice to a global powerhouse in commercial law.
              </p>
              <div className="flex gap-8 border-t pt-8">
                <div>
                  <h4 className="text-3xl font-bold text-primary">30+</h4>
                  <p className="text-sm text-slate-500 uppercase tracking-wider font-semibold">Years Experience</p>
                </div>
                <div>
                  <h4 className="text-3xl font-bold text-primary">12</h4>
                  <p className="text-sm text-slate-500 uppercase tracking-wider font-semibold">Global Offices</p>
                </div>
                <div>
                  <h4 className="text-3xl font-bold text-primary">500+</h4>
                  <p className="text-sm text-slate-500 uppercase tracking-wider font-semibold">Major Wins</p>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative aspect-square rounded-[40px] overflow-hidden shadow-2xl"
            >
              <img 
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80" 
                className="w-full h-full object-cover" 
                alt="Law Firm Office"
              />
            </motion.div>
          </div>
        </div>
      </section>
      {/* Core Values */}
      <section className="py-24 md:py-32 bg-accent/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            title="The Values That Guide Us" 
            subtitle="Our culture is defined by a relentless pursuit of perfection and a deep commitment to our clients' long-term prosperity."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Target, title: 'Unwavering Precision', desc: 'We leave no detail unexamined, ensuring every strategy is airtight and effective.' },
              { icon: Heart, title: 'Client Partnership', desc: 'We don’t just serve clients; we become an extension of their strategic leadership.' },
              { icon: Shield, title: 'Absolute Integrity', desc: 'Trust is our foundation. We maintain the highest ethical standards in all we do.' }
            ].map((value, i) => (
              <Card key={i} className="border-none shadow-soft p-8 text-center bg-white hover:-translate-y-2 transition-transform">
                <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{value.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
      {/* Leadership Team */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            title="Our Leadership" 
            subtitle="Meet the senior partners driving global legal innovation."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {TEAM_MEMBERS.map((member) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="relative aspect-[4/5] rounded-3xl overflow-hidden mb-6">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                    <div className="flex gap-4">
                      {member.socials.linkedin && (
                        <a href={member.socials.linkedin} className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-primary transition-colors">
                          <Linkedin className="w-5 h-5" />
                        </a>
                      )}
                      {member.socials.twitter && (
                        <a href={member.socials.twitter} className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-primary transition-colors">
                          <Twitter className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
                <h3 className="text-xl font-bold">{member.name}</h3>
                <p className="text-primary font-semibold text-sm mb-2">{member.role}</p>
                <p className="text-muted-foreground text-xs uppercase tracking-widest font-bold mb-4">{member.expertise}</p>
                <p className="text-sm text-muted-foreground line-clamp-3">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Global Offices */}
      <section className="py-24 md:py-32 bg-slate-950 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold mb-8">Global Reach. <br/> Local Expertise.</h2>
              <p className="text-slate-400 text-lg mb-12">With offices in the world's major financial and tech hubs, we provide seamless cross-border legal support wherever your business takes you.</p>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h4 className="text-white font-bold mb-2">North America</h4>
                  <ul className="text-slate-500 text-sm space-y-2">
                    <li>New York (HQ)</li>
                    <li>Silicon Valley</li>
                    <li>Washington D.C.</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-white font-bold mb-2">Europe</h4>
                  <ul className="text-slate-500 text-sm space-y-2">
                    <li>London</li>
                    <li>Berlin</li>
                    <li>Paris</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-white font-bold mb-2">Asia-Pacific</h4>
                  <ul className="text-slate-500 text-sm space-y-2">
                    <li>Singapore</li>
                    <li>Tokyo</li>
                    <li>Hong Kong</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-white font-bold mb-2">Middle East</h4>
                  <ul className="text-slate-500 text-sm space-y-2">
                    <li>Dubai</li>
                    <li>Riyadh</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-white/5 rounded-full flex items-center justify-center p-12">
                <div className="w-full h-full rounded-full border border-white/10 animate-[spin_20s_linear_infinite]" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Globe className="w-32 h-32 text-primary opacity-50" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}