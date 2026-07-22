import { motion } from 'framer-motion';
import SectionHeader from './ui/SectionHeader';

const stats = [
  { value: '2026', label: 'NED graduate' },
  { value: '3x', label: 'Internships' },
  { value: 'AI+', label: 'Agentic systems' },
  { value: 'FS', label: 'Full-stack builds' },
];

const highlights = [
  'End-to-end intelligent systems — from model logic to UI.',
  'Agentic workflows, automation, and production-minded GenAI.',
  'Open to junior / entry-level roles on forward-thinking teams.',
];

const skillPreview = [
  'React',
  'FastAPI',
  'LangChain',
  'Neo4j',
  'MongoDB',
  'Docker',
];

const About = () => {
  return (
    <section id="about" aria-labelledby="about-heading">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <SectionHeader
          eyebrow="About"
          title={
            <span id="about-heading">
              Building the <span className="text-accent">brain and body</span> of modern applications
            </span>
          }
        />

        <div className="about-layout">
          <div className="about-bio">
            <p>
              I&apos;m a software engineer who refuses to build static tools in a dynamic world. My
              engineering journey began with traditional web development, but the disruptive potential of
              Large Language Models fundamentally shifted my trajectory.
            </p>
            <p>
              I quickly realized that an AI model without a scalable, well-architected infrastructure is
              just a sandbox experiment. I chose to master both domains—Full Stack and AI—so I could build
              end-to-end intelligent systems, from the underlying neural logic to the user interface.
            </p>
            <p>
              I thrive on solving complex problems: designing agentic workflows, automating decision-making
              processes, and seamlessly integrating AI into practical web applications. As a recent
              engineering graduate from NED University of Engineering and Technology, I am looking to join
              a forward-thinking team where I can push the boundaries of GenAI integrations and build
              production-grade software that delivers real-world value.
            </p>
          </div>

          <aside className="about-aside" aria-label="Profile highlights">
            <div className="about-stat-grid">
              {stats.map((stat) => (
                <div key={stat.label} className="about-stat surface">
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>

            <div className="about-card surface">
              <h3>Education</h3>
              <p style={{ color: 'var(--ink-secondary)', fontSize: '0.95rem', marginBottom: '0.75rem' }}>
                <strong style={{ color: 'var(--ink)' }}>B.E. Software Engineering</strong>
                <br />
                NED University of Engineering and Technology
              </p>
              <p className="text-muted" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>
                2022 – 2026
              </p>
            </div>

            <div className="about-card surface">
              <h3>Focus</h3>
              <ul className="highlight-list">
                {highlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="about-card surface">
              <h3>Skills preview</h3>
              <div className="skill-preview">
                {skillPreview.map((skill) => (
                  <span key={skill} className="badge">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </motion.div>
    </section>
  );
};

export default About;
