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
      <section className="relative pt-32 pb-24 md:pt-48 md:pb-40 bg-white dark:bg-transparent overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-[#B45309] font-bold tracking-[0.3em] uppercase text-xs mb-6 block">Legacy of Excellence</span>
              <h1 className="text-4xl md:text-7xl font-serif font-bold text-slate-950 dark:text-white mb-8 leading-[1.05]">Defining Legal <br/> Mastery Since 1994</h1>
              <p className="text-xl text-slate-600 dark:text-slate-400 mb-10 leading-relaxed font-light">
                Built on the foundation of absolute integrity and tactical precision, LexCorp has evolved from a boutique NYC practice to a premier global authority in commercial law.
              </p>
              <div className="flex gap-12 border-t border-border/50 pt-10">
                <div>
                  <h4 className="text-4xl font-serif font-bold text-[#B45309]">30+</h4>
                  <p className="text-[10px] text-slate-500 uppercase tracking-[0.2em] font-bold mt-2">Years History</p>
                </div>
                <div>
                  <h4 className="text-4xl font-serif font-bold text-[#B45309]">12</h4>
                  <p className="text-[10px] text-slate-500 uppercase tracking-[0.2em] font-bold mt-2">Global Hubs</p>
                </div>
                <div>
                  <h4 className="text-4xl font-serif font-bold text-[#B45309]">500+</h4>
                  <p className="text-[10px] text-slate-500 uppercase tracking-[0.2em] font-bold mt-2">Market Wins</p>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="relative aspect-square rounded-[4rem] overflow-hidden shadow-2xl border border-border/50"
            >
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80"
                className="w-full h-full object-cover transition-transform duration-[3s] hover:scale-105"
                alt="Law Firm Office"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#0F172A]/40 to-transparent" />
            </motion.div>
          </div>
        </div>
      </section>
      {/* Core Values */}
      <section className="py-24 md:py-40 bg-slate-50 dark:bg-slate-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Our Principles"
            subtitle="Our institutional culture is defined by an uncompromising pursuit of perfection and a generational commitment to client prosperity."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: Target, title: 'Tactical Precision', desc: 'No detail is left unexamined. We engineer airtight legal strategies that withstand the most rigorous scrutiny.' },
              { icon: Heart, title: 'Strategic Partnership', desc: 'We operate as a seamless extension of our clients’ executive leadership, aligning every action with long-term goals.' },
              { icon: Shield, title: 'Absolute Discretion', desc: 'Trust is our core currency. We maintain the highest levels of confidentiality and ethical standards globally.' }
            ].map((value, i) => (
              <Card key={i} className="border-none shadow-soft p-12 text-center bg-white dark:bg-slate-900 hover:-translate-y-4 transition-all duration-500 rounded-[3rem] group">
                <div className="w-20 h-20 rounded-[2rem] bg-[#B45309]/10 text-[#B45309] flex items-center justify-center mx-auto mb-10 group-hover:bg-[#B45309] group-hover:text-white transition-all duration-300 transform group-hover:rotate-6">
                  <value.icon className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-serif font-bold mb-6">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed font-light">{value.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
      {/* Leadership */}
      <section className="py-24 md:py-40 bg-white dark:bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Our Leadership"
            subtitle="Meet the senior partners directing LexCorp's global practice areas and legal innovation labs."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {TEAM_MEMBERS.map((member) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="group"
              >
                <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden mb-8 shadow-lg">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-transparent opacity-0 group-hover:opacity-90 transition-all duration-500 flex flex-col justify-end p-8">
                    <div className="flex gap-4">
                      {member.socials.linkedin && (
                        <a href={member.socials.linkedin} className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-[#B45309] transition-all">
                          <Linkedin className="w-6 h-6" />
                        </a>
                      )}
                      {member.socials.twitter && (
                        <a href={member.socials.twitter} className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-[#B45309] transition-all">
                          <Twitter className="w-6 h-6" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
                <h3 className="text-2xl font-serif font-bold mb-1">{member.name}</h3>
                <p className="text-[#B45309] font-bold text-sm mb-3 tracking-tight">{member.role}</p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-black mb-5">{member.expertise}</p>
                <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed font-light">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Global Presence */}
      <section className="py-24 md:py-40 bg-[#0F172A] text-white overflow-hidden border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-12">
              <h2 className="text-4xl md:text-6xl font-serif font-bold leading-tight">Global Reach. <br/> <span className="text-[#B45309]">Local Mastery.</span></h2>
              <p className="text-slate-400 text-xl font-light leading-relaxed">Headquartered in New York with strategic outposts in the world's most vital financial and tech hubs, we deliver seamless cross-border legal excellence.</p>
              <div className="grid grid-cols-2 gap-12">
                <div>
                  <h4 className="text-white font-serif font-bold text-lg mb-4 border-b border-white/10 pb-2">Americas</h4>
                  <ul className="text-slate-500 text-sm space-y-3 font-semibold tracking-tight">
                    <li className="hover:text-white transition-colors cursor-default">New York (Global HQ)</li>
                    <li className="hover:text-white transition-colors cursor-default">Silicon Valley</li>
                    <li className="hover:text-white transition-colors cursor-default">Washington D.C.</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-white font-serif font-bold text-lg mb-4 border-b border-white/10 pb-2">Europe</h4>
                  <ul className="text-slate-500 text-sm space-y-3 font-semibold tracking-tight">
                    <li className="hover:text-white transition-colors cursor-default">London</li>
                    <li className="hover:text-white transition-colors cursor-default">Berlin</li>
                    <li className="hover:text-white transition-colors cursor-default">Paris</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-white font-serif font-bold text-lg mb-4 border-b border-white/10 pb-2">Asia-Pacific</h4>
                  <ul className="text-slate-500 text-sm space-y-3 font-semibold tracking-tight">
                    <li className="hover:text-white transition-colors cursor-default">Singapore</li>
                    <li className="hover:text-white transition-colors cursor-default">Tokyo</li>
                    <li className="hover:text-white transition-colors cursor-default">Hong Kong</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-white font-serif font-bold text-lg mb-4 border-b border-white/10 pb-2">Middle East</h4>
                  <ul className="text-slate-500 text-sm space-y-3 font-semibold tracking-tight">
                    <li className="hover:text-white transition-colors cursor-default">Dubai</li>
                    <li className="hover:text-white transition-colors cursor-default">Riyadh</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="relative flex justify-center">
              <div className="w-[400px] h-[400px] md:w-[600px] md:h-[600px] bg-[#B45309]/5 rounded-full flex items-center justify-center p-20 animate-[pulse_4s_infinite]">
                <div className="w-full h-full rounded-full border border-[#B45309]/20 animate-[spin_40s_linear_infinite] flex items-center justify-center">
                   <div className="w-4 h-4 bg-[#B45309] rounded-full absolute top-0" />
                   <div className="w-4 h-4 bg-[#B45309] rounded-full absolute bottom-0" />
                   <div className="w-4 h-4 bg-[#B45309] rounded-full absolute left-0" />
                   <div className="w-4 h-4 bg-[#B45309] rounded-full absolute right-0" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Globe className="w-32 h-32 md:w-56 md:h-56 text-[#B45309] opacity-30" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}