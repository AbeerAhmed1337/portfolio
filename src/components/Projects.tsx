import { motion } from 'framer-motion';
import { ExternalLink, Code } from 'lucide-react';
import { projects } from '../data/projects';
import SectionHeader from './ui/SectionHeader';
import Button from './ui/Button';

const Projects = () => {
  return (
    <section id="projects" aria-labelledby="projects-heading">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <SectionHeader
          eyebrow="Work"
          title={
            <span id="projects-heading">
              Featured <span className="text-accent">projects</span>
            </span>
          }
          description="Selected builds across full-stack products, agent systems, and applied machine learning."
        />

        <div className="projects-list">
          {projects.map((project, index) => (
            <motion.article
              key={project.id}
              className="project-card surface surface-interactive"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: Math.min(index * 0.05, 0.2), ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="project-preview" aria-hidden>
                <span className="project-preview-mark">{project.mark}</span>
                <span className="project-preview-title">{project.id}</span>
              </div>

              <div className="project-body">
                <div className="project-title-row">
                  <h3 className="heading-md">{project.title}</h3>
                  {project.featured ? <span className="badge badge-featured">Featured</span> : null}
                  {project.badge ? <span className="badge badge-accent">{project.badge}</span> : null}
                </div>

                <p className="project-tagline">{project.tagline}</p>

                <div className="project-section">
                  <h4>The problem</h4>
                  <p>{project.problem}</p>
                </div>

                <div className="project-section">
                  <h4>{project.featuresTitle}</h4>
                  <ul>
                    {project.features.map((feature) => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>
                </div>

                {project.intelligence ? (
                  <div className="project-section">
                    <h4>The intelligence</h4>
                    <p>{project.intelligence}</p>
                  </div>
                ) : null}

                <div className="project-footer">
                  <div className="skill-tags">
                    {project.tech.map((tech) => (
                      <span key={tech} className="badge">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="project-actions">
                    {project.github ? (
                      <Button
                        href={project.github}
                        {...(project.github !== '#'
                          ? { target: '_blank', rel: 'noreferrer' }
                          : { onClick: (e: React.MouseEvent<HTMLAnchorElement>) => e.preventDefault() })}
                        variant="primary"
                        size="sm"
                      >
                        <Code size={15} aria-hidden /> GitHub
                      </Button>
                    ) : null}
                    {project.live ? (
                      <Button
                        href={project.live}
                        target="_blank"
                        rel="noreferrer"
                        variant="secondary"
                        size="sm"
                      >
                        <ExternalLink size={15} aria-hidden /> Live Demo
                      </Button>
                    ) : null}
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Projects;
