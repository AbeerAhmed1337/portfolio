import { motion } from 'framer-motion';
import { ArrowRight, Terminal, Download } from 'lucide-react';
// We are importing the placeholder for the profile image.
import profileImage from '../assets/WhatsApp Image 2026-06-23 at 9.47.29 PM.jpeg';
import cvFile from '../assets/ABEER AHMED CV 2026.pdf';

const Hero = () => {
  return (
    <section id="hero" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: '80px' }}>
      <div className="hero-container">
        {/* Left Content */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          style={{ flex: 1.2, maxWidth: '650px' }}
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="badge-container"
            style={{ marginBottom: '1.5rem', display: 'flex' }}
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
          
          <div className="btn-group" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <motion.a 
              whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(99, 102, 241, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              href="#projects" 
              className="btn btn-primary"
            >
              View My Work <ArrowRight size={18} />
            </motion.a>
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={cvFile}
              download="Abeer_Ahmed_Siddiqui_CV.pdf"
              className="btn btn-secondary"
              style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}
            >
              <Download size={18} /> Download CV
            </motion.a>
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#contact" 
              className="btn btn-secondary"
            >
              Let's Build Something
            </motion.a>
          </div>
        </motion.div>

        {/* Right Content (Image) */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
          <motion.div 
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            style={{ position: 'relative', width: '100%', maxWidth: '400px' }}
          >
            {/* Glowing background behind image */}
            <motion.div 
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.4, 0.7, 0.4]
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              style={{ position: 'absolute', inset: -20, background: 'var(--accent-glow)', filter: 'blur(60px)', borderRadius: '50%', zIndex: -1 }}
            ></motion.div>
            
            {/* The Image */}
            <img 
              src={profileImage} 
              alt="M. Abeer Ahmed Siddiqui" 
              style={{ 
                width: '100%', 
                height: 'auto', 
                borderRadius: '24px', 
                border: '1px solid var(--glass-border)', 
                boxShadow: '0 20px 40px rgba(0,0,0,0.4)', 
                objectFit: 'cover' 
              }} 
              // Fallback if the image doesn't exist yet
              onError={(e) => {
                e.currentTarget.src = 'https://via.placeholder.com/400x500/12121a/6366f1?text=Save+your+image+as+src/assets/profile.png';
              }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
