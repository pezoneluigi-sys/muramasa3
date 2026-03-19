import React, { useEffect, useState, useRef } from 'react';
import { navigationItems, contactInfo } from '../data';
import { assets } from '../assets';

interface NavbarProps {
  viewMode: 'omakase' | 'alacarta';
  setViewMode: (mode: 'omakase' | 'alacarta') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ viewMode, setViewMode }) => {
  const [activeSection, setActiveSection] = useState<string>('');
  const desktopNavRef = useRef<HTMLDivElement>(null);
  const mobileNavRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (viewMode !== 'alacarta') {
        setActiveSection('');
        return;
      }

      // Determine the "scan line" where we check for active content.
      // We want to highlight the section that is currently visible just under the header.
      const isMobile = window.innerWidth < 1024;
      // Defines the vertical point on screen used to trigger the active state
      // Approx visual height of nav + buffer
      const navHeight = isMobile ? 130 : 90; 
      
      let current = '';
      
      // Using getBoundingClientRect to avoid issues with offsetParents (like relative main containers)
      // This calculates position relative to the viewport, so it correctly accounts for Hero/MenuGrid above
      for (const item of navigationItems) {
        const section = document.getElementById(item.id);
        if (section) {
          const rect = section.getBoundingClientRect();
          
          // Active if the section covers the scan line
          // rect.top <= navHeight: section start is above or at the scan line
          // rect.bottom > navHeight: section end is still below the scan line
          if (rect.top <= navHeight && rect.bottom > navHeight) {
            current = item.id;
          }
        }
      }

      // Bottom of page override to ensure last item is selected when reaching bottom
      const scrolledToBottom = (window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50;
      if (scrolledToBottom) {
        current = navigationItems[navigationItems.length - 1].id;
      }

      if (current) {
          setActiveSection(current);
      } else {
          setActiveSection('');
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Call once to set initial state
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [viewMode]);

  const scrollToActiveLink = (container: HTMLElement | null, sectionId: string) => {
    if (container && sectionId) {
        const activeLink = container.querySelector(`a[href="#${sectionId}"]`) as HTMLElement;
        if (activeLink) {
            const linkLeft = activeLink.offsetLeft;
            const linkWidth = activeLink.offsetWidth;
            const containerWidth = container.clientWidth;
            
            container.scrollTo({
                left: linkLeft - (containerWidth / 2) + (linkWidth / 2),
                behavior: 'smooth'
            });
        }
    }
  };

  useEffect(() => {
    scrollToActiveLink(desktopNavRef.current, activeSection);
    scrollToActiveLink(mobileNavRef.current, activeSection);
  }, [activeSection]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    
    if (viewMode !== 'alacarta') {
      setViewMode('alacarta');
      // Wait for DOM to render the sections before scrolling
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
            const isMobile = window.innerWidth < 1024;
            const headerOffset = isMobile ? 120 : 80; 
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        }
      }, 100);
      return;
    }

    const element = document.getElementById(id);
    if (element) {
        const isMobile = window.innerWidth < 1024;
        const headerOffset = isMobile ? 120 : 80; 
        
        // Use getBoundingClientRect + window.scrollY for absolute position, independent of container context
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
        });
    }
  };

  return (
    <nav id="sticky-nav" className="fixed top-0 w-full z-50 bg-sage-500 shadow-lg border-b border-sage-600 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <a href="#" className="flex items-center gap-2 group" onClick={(e) => { e.preventDefault(); window.scrollTo({top: 0, behavior: 'smooth'}); }}>
          {/* Rimosso p-1 e aggiunto transform scale per riempire il cerchio */}
          <div className="w-10 h-10 rounded-full bg-cream border-2 border-sage-300 overflow-hidden flex-shrink-0">
            <img 
              src={assets.logoSmall} 
              alt="Muramasa Logo Small" 
              className="w-full h-full object-cover filter brightness-110 transform scale-110"
              referrerPolicy="no-referrer"
            />
          </div>
          <span className="font-serif text-lg font-bold tracking-wider text-cream hidden sm:block group-hover:text-sage-100 transition-colors">
            MURAMASA
          </span>
        </a>

        <div ref={desktopNavRef} id="nav-links-container" className="hidden lg:flex gap-2 overflow-x-auto no-scrollbar items-center max-w-[60%] lg:max-w-none">
          {navigationItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleNavClick(e, item.id)}
                className={`nav-link px-3 py-1 text-xs tracking-wide rounded-md transition-all uppercase border-b-2 whitespace-nowrap cursor-pointer select-none
                  ${isActive 
                    ? 'text-wood-900 font-extrabold border-wood-800 bg-sage-400/20' 
                    : 'text-sage-50 font-bold border-transparent hover:text-white hover:border-cream/50'
                  }`}
              >
                {item.label}
              </a>
            );
          })}
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <div className="flex bg-sage-600 rounded-full p-1 shadow-inner">
            <button
              onClick={() => setViewMode('omakase')}
              className={`px-3 py-1 text-xs font-bold rounded-full transition-colors ${
                viewMode === 'omakase'
                  ? 'bg-cream text-sage-800 shadow-sm'
                  : 'text-sage-100 hover:text-white'
              }`}
            >
              Omakase
            </button>
            <button
              onClick={() => setViewMode('alacarta')}
              className={`px-3 py-1 text-xs font-bold rounded-full transition-colors whitespace-nowrap ${
                viewMode === 'alacarta'
                  ? 'bg-cream text-sage-800 shadow-sm'
                  : 'text-sage-100 hover:text-white'
              }`}
            >
              À la Carte
            </button>
          </div>
          <a href={contactInfo.whatsapp} target="_blank" rel="noopener noreferrer" className="bg-sage-100 hover:bg-white text-sage-700 w-9 h-9 rounded-full flex items-center justify-center shadow-md transition-all flex-shrink-0">
            <span className="material-symbols-outlined text-[18px]">chat</span>
          </a>
        </div>
      </div>
      
      {/* Mobile Navigation Strip (visible only on mobile) */}
      <div ref={mobileNavRef} className="lg:hidden w-full bg-sage-600 overflow-x-auto no-scrollbar py-2 px-2 flex gap-2 border-t border-sage-500 shadow-inner">
         {navigationItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleNavClick(e, item.id)}
                className={`flex-shrink-0 px-3 py-1 text-xs tracking-wide rounded-md transition-all uppercase border-b-2 whitespace-nowrap cursor-pointer select-none
                  ${isActive 
                    ? 'text-wood-900 bg-sage-200 border-wood-800 font-bold shadow-sm' 
                    : 'text-sage-100 border-transparent hover:bg-sage-500'
                  }`}
              >
                {item.label}
              </a>
            );
          })}
      </div>
    </nav>
  );
};