import { motion } from 'framer-motion';

const Navbar = () => {
  return (
    <motion.nav 
      className="navbar"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="logo" style={{ fontWeight: 700, fontSize: '1.2rem' }}>
        <span className="text-gradient">Abeer</span>.dev
      </div>
      <div className="nav-links">
        <a href="#about" className="nav-link">About</a>
        <a href="#tech" className="nav-link">Stack</a>
        <a href="#projects" className="nav-link">Projects</a>
        <a href="#experience" className="nav-link">Experience</a>
        <a href="#contact" className="nav-link">Contact</a>
      </div>
    </motion.nav>
  );
};

export default Navbar;
