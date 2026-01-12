import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, Gavel, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { ThemeToggle } from '@/components/ThemeToggle';
const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services' },
  { name: 'About', path: '/about' },
  { name: 'Insights', path: '/blog' },
];
export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b',
        isScrolled
          ? 'bg-background/90 backdrop-blur-md py-3 border-border/80 shadow-sm'
          : 'bg-transparent py-6 border-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-primary text-primary-foreground p-1.5 rounded-lg transition-all duration-300 group-hover:rotate-12 group-hover:bg-[#B45309] group-hover:shadow-glow">
              <Gavel className="w-6 h-6" />
            </div>
            <span className="text-xl font-serif font-bold tracking-tight text-foreground">
              LEX<span className="text-muted-foreground font-sans font-light tracking-widest ml-1">CORP</span>
            </span>
          </Link>
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  'text-sm font-medium transition-all duration-300 hover:text-[#B45309] relative py-1',
                  location.pathname === link.path
                    ? 'text-foreground'
                    : 'text-muted-foreground'
                )}
              >
                {link.name}
                {location.pathname === link.path && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#B45309]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            ))}
            <div className="flex items-center gap-4 pl-6 border-l border-border/50">
              <ThemeToggle className="static" />
              <Button size="sm" className="rounded-full px-8 bg-[#B45309] hover:bg-[#92400E] text-white border-none shadow-soft hover:shadow-glow">
                Consultation
              </Button>
            </div>
          </div>
          {/* Mobile Nav */}
          <div className="md:hidden flex items-center gap-4">
            <ThemeToggle className="static" />
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="hover:bg-accent/50 transition-colors">
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:w-[400px] border-l-border/50 bg-background/95 backdrop-blur-lg">
                <div className="flex flex-col gap-10 mt-16 px-6">
                  {NAV_LINKS.map((link) => (
                    <SheetClose asChild key={link.path}>
                      <Link
                        to={link.path}
                        className={cn(
                          "text-3xl font-serif font-bold transition-all duration-300 hover:pl-2 hover:text-[#B45309]",
                          location.pathname === link.path ? "text-[#B45309]" : "text-foreground"
                        )}
                      >
                        {link.name}
                      </Link>
                    </SheetClose>
                  ))}
                  <SheetClose asChild>
                    <Button className="w-full mt-6 h-14 text-lg bg-[#B45309] hover:bg-[#92400E] rounded-2xl">
                      Book Consultation
                    </Button>
                  </SheetClose>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}