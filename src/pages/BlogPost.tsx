import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { BLOG_POSTS } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, Share2, Facebook, Twitter, Linkedin, Clock } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
export function BlogPost() {
  const { id } = useParams();
  const post = BLOG_POSTS.find(p => p.id === id);
  if (!post) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-40 text-center">
        <h1 className="text-4xl font-serif font-bold mb-6">Insight Not Found</h1>
        <p className="text-muted-foreground mb-10 max-w-md mx-auto">The requested legal article has been archived or its location has changed.</p>
        <Link to="/blog">
          <Button variant="outline" className="rounded-full px-8 h-12">Return to Insights</Button>
        </Link>
      </div>
    );
  }
  return (
    <article className="pb-32">
      {/* Hero Header */}
      <header className="relative h-[70vh] flex items-end pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/40 to-transparent" />
        </div>
        <div className="max-w-5xl mx-auto px-4 w-full relative z-10">
          <Link to="/blog" className="inline-flex items-center text-white/70 hover:text-[#B45309] transition-colors mb-10 group text-sm font-bold uppercase tracking-widest">
            <ArrowLeft className="mr-3 w-4 h-4 group-hover:-translate-x-2 transition-transform" />
            Back to Global Insights
          </Link>
          <div className="flex items-center gap-4 mb-6">
            <span className="px-4 py-1.5 bg-[#B45309] text-white rounded-full text-[10px] font-black uppercase tracking-[0.2em]">
              {post.category}
            </span>
            <div className="flex items-center gap-4 text-white/60 text-xs font-bold uppercase tracking-widest">
              <span className="flex items-center gap-2"><Calendar className="w-4 h-4 text-[#B45309]" /> {post.date}</span>
              <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-[#B45309]" /> 6 min read</span>
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white tracking-tight leading-[1.1]">
            {post.title}
          </h1>
        </div>
      </header>
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">
          {/* Article Sidebar */}
          <aside className="lg:col-span-3 lg:sticky lg:top-32 h-fit space-y-16">
            <div className="space-y-8">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#B45309]">Article Author</h4>
              <div className="flex items-center gap-5">
                <Avatar className="w-16 h-16 border-2 border-[#B45309]/30 rounded-2xl">
                  <AvatarImage src={post.author.avatar} alt={post.author.name} />
                  <AvatarFallback className="font-serif font-bold">{post.author.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h5 className="font-serif font-bold text-lg leading-tight">{post.author.name}</h5>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mt-1">{post.author.role}</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed font-light italic">
                Strategic counsel specializing in cross-border M&A and disruptive technology regulation across EMEA and APAC markets.
              </p>
            </div>
            <div className="pt-10 border-t border-border/50">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground mb-6">Disseminate Knowledge</h4>
              <div className="flex gap-3">
                <Button variant="ghost" size="icon" className="hover:text-[#B45309] hover:bg-[#B45309]/5 transition-all"><Twitter className="w-5 h-5" /></Button>
                <Button variant="ghost" size="icon" className="hover:text-[#B45309] hover:bg-[#B45309]/5 transition-all"><Linkedin className="w-5 h-5" /></Button>
                <Button variant="ghost" size="icon" className="hover:text-[#B45309] hover:bg-[#B45309]/5 transition-all"><Facebook className="w-5 h-5" /></Button>
                <Button variant="ghost" size="icon" className="hover:text-[#B45309] hover:bg-[#B45309]/5 transition-all"><Share2 className="w-5 h-5" /></Button>
              </div>
            </div>
          </aside>
          {/* Article Body */}
          <main className="lg:col-span-8">
            <div className="prose prose-slate prose-lg dark:prose-invert max-w-none">
              <div
                dangerouslySetInnerHTML={{ __html: post.content }}
                className="[&>p]:text-slate-700 dark:[&>p]:text-slate-300 [&>p]:leading-[1.8] [&>p]:mb-8 [&>p]:font-light [&>h3]:text-3xl [&>h3]:font-serif [&>h3]:font-bold [&>h3]:mt-16 [&>h3]:mb-8 [&>h3]:text-[#0F172A] dark:[&>h3]:text-white"
              />
            </div>
            {/* Authoritative CTA */}
            <div className="mt-24 pt-20 border-t border-border/50">
              <div className="bg-[#0F172A] dark:bg-slate-900 rounded-[3rem] p-12 flex flex-col md:flex-row items-center justify-between gap-10 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#B45309]/10 blur-[80px] group-hover:bg-[#B45309]/20 transition-all duration-700" />
                <div className="max-w-lg relative z-10">
                  <h3 className="text-3xl font-serif font-bold mb-4 text-white">Specific Case Counsel</h3>
                  <p className="text-slate-400 font-light leading-relaxed">Our senior practice partners provide tailored advice for multinational enterprises navigating the complexities mentioned above.</p>
                </div>
                <Button size="lg" className="rounded-full px-12 h-16 bg-[#B45309] hover:bg-[#92400E] text-white border-none shadow-glow font-bold relative z-10">
                  Consult Lead Partner
                </Button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </article>
  );
}