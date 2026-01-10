import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Gavel } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { ThemeToggle } from '@/components/ThemeToggle';
const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'Insights', path: '/blog' },
  { name: 'Services', path: '/#services' },
  { name: 'About', path: '/#about' },
];
export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b',
        isScrolled
          ? 'bg-background/80 backdrop-blur-md py-3 border-border shadow-sm'
          : 'bg-transparent py-5 border-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-primary text-primary-foreground p-1.5 rounded-lg transition-transform group-hover:rotate-12">
              <Gavel className="w-6 h-6" />
            </div>
            <span className="text-xl font-bold tracking-tight text-foreground">
              LEX<span className="text-muted-foreground font-light">CORP</span>
            </span>
          </Link>
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-primary',
                  location.pathname === link.path ? 'text-primary' : 'text-muted-foreground'
                )}
              >
                {link.name}
              </Link>
            ))}
            <div className="flex items-center gap-4 pl-4 border-l border-border">
              <ThemeToggle className="static" />
              <Button size="sm" className="rounded-full px-6">
                Consultation
              </Button>
            </div>
          </div>
          {/* Mobile Nav */}
          <div className="md:hidden flex items-center gap-4">
            <ThemeToggle className="static" />
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col gap-8 mt-12">
                  {NAV_LINKS.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      className="text-2xl font-semibold hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  ))}
                  <Button className="w-full mt-4">Book Consultation</Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}