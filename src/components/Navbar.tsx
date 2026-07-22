import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useActiveSection, useScrolled } from '../hooks/useActiveSection';

const LINKS = [
  { href: '#about', id: 'about', label: 'About' },
  { href: '#tech', id: 'tech', label: 'Skills' },
  { href: '#projects', id: 'projects', label: 'Projects' },
  { href: '#experience', id: 'experience', label: 'Experience' },
  { href: '#contact', id: 'contact', label: 'Contact' },
] as const;

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const activeId = useActiveSection();
  const scrolled = useScrolled();

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <motion.nav
      className={`navbar${scrolled ? ' scrolled' : ''}`}
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      aria-label="Primary"
    >
      <div className="navbar-inner">
        <a href="#hero" className="logo" onClick={closeMenu}>
          Abeer<span>.dev</span>
        </a>

        <button
          type="button"
          className="nav-toggle"
          aria-expanded={menuOpen}
          aria-controls="primary-nav"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        <div id="primary-nav" className={`nav-links${menuOpen ? ' open' : ''}`}>
          {LINKS.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className={`nav-link${activeId === link.id ? ' active' : ''}`}
              onClick={closeMenu}
              aria-current={activeId === link.id ? 'true' : undefined}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
