import { motion } from 'framer-motion';
import { Briefcase, GraduationCap } from 'lucide-react';
import { experienceItems } from '../data/experience';
import SectionHeader from './ui/SectionHeader';

const Experience = () => {
  return (
    <section id="experience" aria-labelledby="experience-heading">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <SectionHeader
          eyebrow="Path"
          title={
            <span id="experience-heading">
              Experience &amp; <span className="text-accent">engineering initiatives</span>
            </span>
          }
          description="Internships and academic work that shaped how I design, build, and ship software."
        />

        <ol className="timeline">
          {experienceItems.map((item, index) => {
            const Icon = item.type === 'education' ? GraduationCap : Briefcase;
            return (
              <motion.li
                key={item.id}
                className="timeline-item"
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="timeline-dot" aria-hidden />
                <article className="timeline-card surface">
                  <div className="timeline-header">
                    <div>
                      <h3 className="heading-md">{item.title}</h3>
                      <p className="timeline-role">
                        <Icon size={16} aria-hidden />
                        {item.org}
                      </p>
                    </div>
                    <time className="timeline-date" dateTime={item.date}>
                      {item.date}
                    </time>
                  </div>
                  {item.summary ? <p>{item.summary}</p> : null}
                  {item.points ? (
                    <ul>
                      {item.points.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  ) : null}
                </article>
              </motion.li>
            );
          })}
        </ol>
      </motion.div>
    </section>
  );
};

export default Experience;
