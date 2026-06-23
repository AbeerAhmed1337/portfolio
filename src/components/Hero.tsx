import { motion } from 'framer-motion';
import { ArrowRight, Terminal } from 'lucide-react';

const Hero = () => {
  return (
    <section id="hero" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: '80px' }}>
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ maxWidth: '800px' }}
      >
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          style={{ marginBottom: '1.5rem', display: 'inline-block' }}
        >
          <span className="badge flex-center" style={{ gap: '0.5rem' }}>
            <Terminal size={16} /> Full Stack & AI Developer
          </span>
        </motion.div>
        
        <h1 className="heading-xl" style={{ marginBottom: '1.5rem' }}>
          Engineering Intelligent Systems & <span className="text-gradient">Scalable Web Architectures</span>
        </h1>
        
        <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', marginBottom: '2.5rem', maxWidth: '600px' }}>
          I bridge the gap between robust full-stack development and artificial intelligence to build applications that don't just function—they think.
        </p>
        
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <a href="#projects" className="btn btn-primary">
            View My Work <ArrowRight size={18} />
          </a>
          <a href="#contact" className="btn btn-secondary">
            Let's Build Something
          </a>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
