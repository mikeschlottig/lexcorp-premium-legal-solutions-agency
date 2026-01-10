import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { BLOG_POSTS } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
export function BlogPost() {
  const { id } = useParams();
  const post = BLOG_POSTS.find(p => p.id === id);
  if (!post) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-32 text-center">
        <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
        <p className="text-muted-foreground mb-8">The legal insight you are looking for has been archived or removed.</p>
        <Link to="/blog">
          <Button variant="outline">Back to Insights</Button>
        </Link>
      </div>
    );
  }
  return (
    <article className="pb-24">
      {/* Hero Header */}
      <header className="relative h-[60vh] flex items-end pb-12 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={post.image} 
            alt={post.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />
        </div>
        <div className="max-w-4xl mx-auto px-4 w-full relative z-10">
          <Link to="/blog" className="inline-flex items-center text-primary-foreground/70 hover:text-white transition-colors mb-8 group">
            <ArrowLeft className="mr-2 w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Insights
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-primary text-primary-foreground rounded-full text-xs font-bold uppercase tracking-widest">
              {post.category}
            </span>
            <span className="text-white/60 text-sm flex items-center gap-2">
              <Calendar className="w-4 h-4" /> {post.date}
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-tight">
            {post.title}
          </h1>
        </div>
      </header>
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Article Sidebar */}
          <aside className="lg:col-span-3 lg:sticky lg:top-32 h-fit space-y-12">
            <div className="space-y-6">
              <h4 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">About Author</h4>
              <div className="flex items-center gap-4">
                <Avatar className="w-14 h-14 border-2 border-primary/20">
                  <AvatarImage src={post.author.avatar} alt={post.author.name} />
                  <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h5 className="font-bold text-lg">{post.author.name}</h5>
                  <p className="text-xs text-muted-foreground">{post.author.role}</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Expert in cross-border transactions and emerging technology frameworks.
              </p>
            </div>
            <div className="pt-8 border-t border-border/50">
              <h4 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4">Share Article</h4>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon"><Twitter className="w-5 h-5" /></Button>
                <Button variant="ghost" size="icon"><Linkedin className="w-5 h-5" /></Button>
                <Button variant="ghost" size="icon"><Facebook className="w-5 h-5" /></Button>
                <Button variant="ghost" size="icon"><Share2 className="w-5 h-5" /></Button>
              </div>
            </div>
          </aside>
          {/* Article Body */}
          <main className="lg:col-span-8 prose prose-slate prose-lg dark:prose-invert max-w-none">
            <div 
              dangerouslySetInnerHTML={{ __html: post.content }} 
              className="[&>p]:mb-6 [&>p]:leading-relaxed [&>h3]:text-2xl [&>h3]:font-bold [&>h3]:mt-12 [&>h3]:mb-6"
            />
            <div className="mt-16 pt-16 border-t border-border/50">
              <div className="bg-accent/30 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="max-w-md">
                  <h3 className="text-2xl font-bold mb-2">Need advice on this topic?</h3>
                  <p className="text-muted-foreground text-sm">Consult with our specialized counsel for your specific case requirements.</p>
                </div>
                <Button size="lg" className="rounded-full px-8">Consult Partner</Button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </article>
  );
}