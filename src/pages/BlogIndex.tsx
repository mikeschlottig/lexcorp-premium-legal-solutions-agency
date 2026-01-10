import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BLOG_POSTS } from '@/lib/data';
import { SectionHeader } from '@/components/ui/section-header';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search, Calendar, User } from 'lucide-react';
export function BlogIndex() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-24 md:py-32">
        <div className="flex flex-col items-center mb-16">
          <SectionHeader 
            title="Knowledge & Insights"
            subtitle="Deep dives into global legal trends, regulatory shifts, and commercial strategy."
          />
          <div className="relative w-full max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input 
              placeholder="Search legal insights..." 
              className="pl-12 h-14 rounded-full border-muted bg-accent/20"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post, idx) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Link to={`/blog/${post.id}`}>
                <Card className="h-full group overflow-hidden border-none shadow-soft hover:shadow-xl transition-all duration-300">
                  <div className="aspect-[16/10] overflow-hidden relative">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-widest text-primary shadow-sm">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <CardContent className="p-8">
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        {post.date}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5" />
                        {post.author.name}
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors leading-tight">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed line-clamp-3 mb-6">
                      {post.excerpt}
                    </p>
                    <div className="pt-6 border-t border-border/50">
                      <span className="text-sm font-bold text-primary">Read Full Article</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}