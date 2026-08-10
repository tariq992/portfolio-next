"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Code2, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isHovered, setIsHovered] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 50);

      const sections = navLinks.map((link) => link.href.slice(1));
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  // Don't render theme-dependent content until mounted to avoid hydration mismatch
  if (!mounted) {
    return null;
  }

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: ['easeOut'] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'py-2 md:py-3 bg-white/90 dark:bg-[#0a0a0f]/90 backdrop-blur-xl shadow-lg dark:shadow-black/30 border-b border-gray-200/30 dark:border-white/5' 
            : 'py-4 md:py-5 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex items-center transition-all duration-500 ${
            isScrolled ? 'justify-center md:justify-between' : 'justify-between'
          }`}>
            {/* Logo */}
            <motion.a
              href="#home"
              onClick={(e) => handleClick(e, '#home')}
              className={`flex items-center gap-3 group transition-all duration-500 ${
                isScrolled ? 'md:w-auto' : 'md:w-[30%]'
              }`}
              whileHover={{ scale: 1.03 }}
              onHoverStart={() => setIsHovered(true)}
              onHoverEnd={() => setIsHovered(false)}
            >
              <motion.div 
                className="relative w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/30 dark:shadow-purple-500/20"
                animate={{ 
                  rotate: isHovered ? [0, -10, 10, -5, 5, 0] : 0,
                  scale: isHovered ? 1.1 : 1
                }}
                transition={{ duration: 0.5 }}
              >
                <Code2 className="w-5 h-5 md:w-6 md:h-6 text-white" />
                <motion.div 
                  className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 blur-xl opacity-50"
                  animate={{ 
                    opacity: isHovered ? 0.8 : 0.5,
                    scale: isHovered ? 1.2 : 1
                  }}
                />
              </motion.div>
              
              <div className="flex flex-col">
                <motion.span 
                  className={`text-lg md:text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent transition-all duration-300 ${
                    isScrolled ? 'text-base md:text-lg' : 'text-xl md:text-2xl'
                  }`}
                  animate={{
                    letterSpacing: isHovered ? '0.05em' : '0em'
                  }}
                >
                  Tariq Mehmood
                </motion.span>
                <motion.span 
                  className="text-[10px] md:text-xs text-gray-500 dark:text-gray-400 font-medium tracking-wider uppercase"
                  animate={{
                    opacity: isScrolled ? 0 : 1,
                    height: isScrolled ? 0 : 'auto',
                    marginTop: isScrolled ? 0 : 2
                  }}
                >
                  Full Stack Developer
                </motion.span>
              </div>
            </motion.a>

            {/* Desktop Navigation */}
            <div className={`hidden md:flex items-center gap-1 transition-all duration-500 ${
              isScrolled ? 'absolute left-1/2 -translate-x-1/2' : ''
            }`}>
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.slice(1);
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleClick(e, link.href)}
                    className={`relative px-3 lg:px-4 py-2 text-sm font-medium transition-all duration-300 rounded-xl ${
                      isActive
                        ? 'text-blue-600 dark:text-blue-400'
                        : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    <span className="relative z-10">{link.name}</span>
                    {isActive && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute inset-0 bg-blue-500/10 dark:bg-blue-400/10 rounded-xl border border-blue-500/20 dark:border-blue-400/20"
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                      >
                        <motion.div 
                          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-400 dark:to-purple-400 rounded-full"
                          layoutId="activeNavLine"
                        />
                      </motion.div>
                    )}
                    <motion.div 
                      className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-pink-500/0 transition-all duration-300"
                      whileHover={{ 
                        background: 'linear-gradient(to right, rgba(59,130,246,0.05), rgba(168,85,247,0.05), rgba(236,72,153,0.05))'
                      }}
                    />
                  </a>
                );
              })}
            </div>

            {/* Right side - Theme toggle & Mobile Menu */}
            <div className="flex items-center gap-2">
              {/* Theme Toggle */}
              <motion.button
                onClick={toggleTheme}
                className="relative w-9 h-9 md:w-10 md:h-10 rounded-xl bg-gray-100/80 dark:bg-white/5 border border-gray-200/50 dark:border-white/10 flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
                whileHover={{ scale: 1.1, rotate: 15 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Toggle theme"
              >
                <motion.div
                  initial={false}
                  animate={{ 
                    rotate: theme === 'dark' ? 0 : 180,
                    scale: theme === 'dark' ? 1 : 0.8
                  }}
                  transition={{ duration: 0.4, type: 'spring' }}
                >
                  {theme === 'dark' ? (
                    <Moon className="w-4 h-4 md:w-5 md:h-5" />
                  ) : (
                    <Sun className="w-4 h-4 md:w-5 md:h-5" />
                  )}
                </motion.div>
              </motion.button>

              {/* Mobile Menu Button */}
              <motion.button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden w-9 h-9 md:w-10 md:h-10 rounded-xl bg-gray-100/80 dark:bg-white/5 border border-gray-200/50 dark:border-white/10 flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
                whileTap={{ scale: 0.9 }}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-4 h-4 md:w-5 md:h-5" />
                ) : (
                  <Menu className="w-4 h-4 md:w-5 md:h-5" />
                )}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Progress bar - shows scroll progress */}
        <motion.div 
          className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400"
          style={{ 
            width: `${Math.min((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100, 100)}%` 
          }}
          animate={{ 
            width: `${Math.min((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100, 100)}%` 
          }}
          transition={{ duration: 0.1 }}
        />
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div 
              className="absolute inset-0 bg-white/98 dark:bg-[#0a0a0f]/98 backdrop-blur-xl" 
              onClick={() => setIsMobileMenuOpen(false)} 
            />
            <div className="relative flex flex-col items-center justify-center h-full gap-6 px-4">
              {navLinks.map((link, index) => {
                const isActive = activeSection === link.href.slice(1);
                return (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleClick(e, link.href)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`relative text-3xl font-bold transition-colors ${
                      isActive
                        ? 'text-blue-600 dark:text-blue-400'
                        : 'text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400'
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <motion.div 
                        className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-400 dark:to-purple-400 rounded-full"
                        layoutId="mobileActive"
                      />
                    )}
                  </motion.a>
                );
              })}
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.1 }}
                className="mt-8 flex items-center gap-4"
              >
                <motion.button
                  onClick={toggleTheme}
                  className="w-12 h-12 rounded-2xl bg-gray-100/80 dark:bg-white/5 border border-gray-200/50 dark:border-white/10 flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
                  whileTap={{ scale: 0.9 }}
                  aria-label="Toggle theme"
                >
                  {theme === 'dark' ? (
                    <Moon className="w-5 h-5" />
                  ) : (
                    <Sun className="w-5 h-5" />
                  )}
                </motion.button>
                
                <motion.a
                  href="#contact"
                  onClick={(e) => handleClick(e, '#contact')}
                  className="px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-semibold shadow-lg shadow-purple-500/30 dark:shadow-purple-500/20"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                 `Let Talk
                </motion.a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}