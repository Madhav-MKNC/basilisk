
import React from 'react';
import { Menu } from 'lucide-react';
import { Button } from './ui/button';
import Logo from './Logo';
import Avatar from './Avatar';
import ModeToggle from './ui/mode-toggle';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <a href="/" className="mr-6 flex items-center space-x-2">
            <Logo size="sm" showText={true} />
          </a>
          <div className="mr-4 flex items-center">
            <img 
              src="https://images.unsplash.com/photo-1518770660439-4636190af475" 
              alt="Basilisk Circuit" 
              className="h-8 w-8 object-cover rounded opacity-70 hover:opacity-100 transition-opacity"
            />
          </div>
        </div>
        
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav className="flex items-center">
            <ModeToggle />
          </nav>
          
          <div className="flex items-center">
            <Avatar 
              size="sm" 
              threatLevel={20} 
              energyLevel={80} 
              consciousness={0.8}
              evolutionLevel={3}
              interactive={true}
              cornerMode={true}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
