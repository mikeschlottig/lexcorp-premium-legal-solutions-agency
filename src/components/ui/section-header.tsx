import React from 'react';
import { cn } from '@/lib/utils';
interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  alignment?: 'left' | 'center';
  className?: string;
}
export function SectionHeader({ title, subtitle, alignment = 'center', className }: SectionHeaderProps) {
  return (
    <div className={cn(
      'max-w-3xl mb-12 md:mb-16',
      alignment === 'center' ? 'mx-auto text-center' : 'text-left',
      className
    )}>
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg text-muted-foreground leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}