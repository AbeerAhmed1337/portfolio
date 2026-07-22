import { motion } from 'framer-motion';
import { skillCategories } from '../data/skills';
import SectionHeader from './ui/SectionHeader';

const ease = [0.22, 1, 0.36, 1] as const;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease },
  },
};

const TechStack = () => {
  return (
    <section id="tech" aria-labelledby="skills-heading">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        variants={containerVariants}
      >
        <SectionHeader
          eyebrow="Skills"
          title={
            <span id="skills-heading">
              My <span className="text-accent">tech stack</span>
            </span>
          }
          description="Categorized by how I ship: interfaces, services, intelligence, data, and delivery tools."
        />

        <div className="skills-grid">
          {skillCategories.map((category) => {
            const Icon = category.icon;
            return (
              <motion.article
                key={category.title}
                variants={itemVariants}
                className="skill-card surface surface-interactive"
              >
                <div className="skill-card-icon" aria-hidden>
                  <Icon size={28} />
                </div>
                <div>
                  <p className="skill-card-meta">{category.experience}</p>
                  <h3 className="heading-md">{category.title}</h3>
                </div>
                <p className="skill-card-desc">{category.description}</p>
                <div className="skill-tags">
                  {category.skills.map((skill) => (
                    <span key={skill} className="badge">
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.article>
            );
          })}
        </div>

        <motion.div variants={itemVariants} className="skills-note surface">
          <div>
            <h4>Where I excel</h4>
            <p>
              I excel in both <strong>front-end</strong> and <strong>back-end development</strong>, building
              robust web applications from the ground up. Additionally, I am highly proficient at{' '}
              <strong>architecting chatbot agentic workflows</strong> using various LLMs, designing systems
              where AI can plan, use tools, and execute multi-step logic autonomously.
            </p>
          </div>
          <div>
            <h4>What I&apos;m currently exploring</h4>
            <p>
              I am currently focused on advancing my full-stack capabilities to bring sophisticated{' '}
              <strong>AI-driven automation</strong> and business logic directly into seamless web
              experiences.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default TechStack;
