import { motion } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';
import profileImage from '../assets/WhatsApp Image 2026-06-23 at 9.47.29 PM.jpeg';
import cvFile from '../assets/Muhammad_Abeer_Ahmed_Siddiqui_AI_Engineer_CV.docx?url';
import Button from './ui/Button';

const ease = [0.22, 1, 0.36, 1] as const;

const Hero = () => {
  return (
    <section id="hero" className="hero" aria-labelledby="hero-heading">
      <div className="hero-grid">
        <div className="hero-copy">
          <motion.p
            className="eyebrow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0, ease }}
          >
            Full Stack &amp; AI Developer
          </motion.p>

          <motion.h1
            id="hero-heading"
            className="heading-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08, ease }}
          >
            Engineering intelligent systems
            <br />
            <span className="text-accent">&amp; scalable web architectures</span>
          </motion.h1>

          <motion.p
            className="lead"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.16, ease }}
          >
            I bridge the gap between robust full-stack development and artificial intelligence to build
            applications that don&apos;t just function—they think.
          </motion.p>

          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.24, ease }}
          >
            <Button href="#projects">
              View My Work <ArrowRight size={18} aria-hidden />
            </Button>
            <Button href={cvFile} download="Muhammad_Abeer_Ahmed_Siddiqui_AI_Engineer_CV.docx" variant="secondary">
              <Download size={18} aria-hidden /> Download CV
            </Button>
            <Button href="#contact" variant="ghost">
              Let&apos;s Build Something
            </Button>
          </motion.div>

          <motion.div
            className="hero-meta"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.32, ease }}
            aria-label="Highlights"
          >
            <div className="hero-meta-item">
              <strong>5+</strong>
              <span>Shipped projects</span>
            </div>
            <div className="hero-meta-item">
              <strong>FS + AI</strong>
              <span>End-to-end focus</span>
            </div>
            <div className="hero-meta-item">
              <strong>NED</strong>
              <span>BSCS Graduate</span>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="hero-portrait"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15, ease }}
        >
          <div className="hero-portrait-accent" aria-hidden />
          <div className="hero-portrait-frame">
            <img
              src={profileImage}
              alt="M. Abeer Ahmed Siddiqui"
              width={400}
              height={500}
              fetchPriority="high"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
