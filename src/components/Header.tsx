import { useState, useEffect } from "react";
import { NavLink } from "@/components/NavLink";
import { Menu, X, Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FontSizeAdjuster } from "@/components/FontSizeAdjuster";

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // default to light mode
  const [isDark, setIsDark] = useState(false);

  // On mount, initialize theme from localStorage if present,
  // otherwise use system preference. Persist changes to localStorage.
  useEffect(() => {
    try {
      const stored = localStorage.getItem("theme");
      const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;

      if (stored === "dark" || (!stored && prefersDark)) {
        document.documentElement.classList.add("dark");
        setIsDark(true);
      } else {
        document.documentElement.classList.remove("dark");
        setIsDark(false);
      }
    } catch (e) {
      // If localStorage isn't available, fall back to light
      document.documentElement.classList.remove("dark");
      setIsDark(false);
    }
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    if (next) {
      document.documentElement.classList.add("dark");
      try { localStorage.setItem("theme", "dark"); } catch (e) { void e; }
    } else {
      document.documentElement.classList.remove("dark");
      try { localStorage.setItem("theme", "light"); } catch (e) { void e; }
    }
  };

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/poetry", label: "Poetry" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto flex h-16 items-center justify-between px-4" aria-label="Main navigation">
        <NavLink to="/" className="text-2xl font-playfair font-bold text-primary hover:opacity-80 transition-opacity">
         Wispering Pages 
        </NavLink>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
              activeClassName="text-primary after:w-full"
            >
              {link.label}
            </NavLink>
          ))}
          <FontSizeAdjuster />
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="hover:bg-accent"
          >
            {/* show Sun when in light mode, Moon when in dark mode */}
            {isDark ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <FontSizeAdjuster />
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="hover:bg-accent"
          >
            {isDark ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="absolute top-16 left-0 right-0 bg-background border-b border-border md:hidden"
            >
              <div className="container mx-auto py-4 px-4 flex flex-col gap-4">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    end={link.to === "/"}
                    className="text-lg font-medium text-foreground/70 hover:text-primary transition-colors py-2"
                    activeClassName="text-primary"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </NavLink>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};
