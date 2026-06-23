import { motion } from 'framer-motion';
import { Mail, Briefcase, Code } from 'lucide-react';

const Contact = () => {
  return (
    <section id="contact" style={{ paddingBottom: '6rem' }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
        className="glass-panel"
        style={{ textAlign: 'center', padding: '4rem 2rem', position: 'relative', overflow: 'hidden' }}
      >
        <div style={{ position: 'absolute', bottom: '-50%', left: '50%', transform: 'translateX(-50%)', width: '300px', height: '300px', background: 'var(--accent-glow)', filter: 'blur(80px)', borderRadius: '50%', zIndex: -1 }}></div>
        
        <h2 className="heading-lg" style={{ marginBottom: '1rem' }}>Let's <span className="text-gradient">Build Something</span></h2>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem auto' }}>
          I am currently open to junior and entry-level developer roles where I can contribute to shipping impactful software. Let’s connect and discuss how my blend of full-stack engineering and AI architecture can bring value to your team.
        </p>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
          <a href="https://mail.google.com/mail/?view=cm&fs=1&to=siddiqui.abeer456@gmail.com&su=Hello%20Abeer" target="_blank" rel="noreferrer" className="btn btn-primary" style={{ padding: '1rem 2rem' }}>
            <Mail size={20} /> siddiqui.abeer456@gmail.com
          </a>
          <a href="https://www.linkedin.com/in/abeer-ahmed-1a5b002b6/" target="_blank" rel="noreferrer" className="btn btn-secondary" style={{ padding: '1rem 2rem' }}>
            <Briefcase size={20} /> LinkedIn
          </a>
          <a href="https://github.com/AbeerAhmed1337" target="_blank" rel="noreferrer" className="btn btn-secondary" style={{ padding: '1rem 2rem' }}>
            <Code size={20} /> GitHub
          </a>
        </div>
        
      </motion.div>
    </section>
  );
};

export default Contact;
