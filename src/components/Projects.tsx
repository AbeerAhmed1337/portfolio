import { motion } from 'framer-motion';
import { ExternalLink, Code } from 'lucide-react';

const Projects = () => {
  return (
    <section id="projects">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="heading-lg">Featured <span className="text-gradient">Projects</span></h2>
        
        <div className="glass-panel" style={{ position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, right: 0, width: '150px', height: '150px', background: 'var(--accent-glow)', filter: 'blur(50px)', borderRadius: '50%', zIndex: -1 }}></div>
          
          <h3 className="heading-md">CollabriAI - AI-Driven Project Management</h3>
          <p style={{ color: 'var(--accent-secondary)', fontWeight: 500, marginBottom: '1rem' }}>
            An intelligent workflow application that automates task delegation and team generation.
          </p>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>The Problem</h4>
            <p style={{ color: 'var(--text-secondary)' }}>Traditional project management requires manual task routing and lacks contextual understanding of team capabilities.</p>
          </div>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Key Features</h4>
            <ul style={{ listStyle: 'none', color: 'var(--text-secondary)', paddingLeft: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li>• Real-time task synchronization and Kanban board state management.</li>
              <li>• Automated data mapping between relational structures and NoSQL documents.</li>
              <li>• AI-powered assignment algorithms based on developer workloads.</li>
            </ul>
          </div>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>The Intelligence (AI Logic)</h4>
            <p style={{ color: 'var(--text-secondary)' }}>Built an autonomous agent architecture that dynamically routes user queries, interacts with a Neo4j knowledge graph to understand project context, and triggers deterministic JSON outputs for frontend rendering.</p>
          </div>
          
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem' }}>
            {['React', 'FastAPI', 'LangChain', 'MongoDB', 'Neo4j', 'Docker'].map((tech) => (
              <span key={tech} className="badge">{tech}</span>
            ))}
          </div>
          
          <div style={{ display: 'flex', gap: '1rem' }}>
            <a href="#" className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
              <Code size={16} /> GitHub
            </a>
            <a href="#" className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
              <ExternalLink size={16} /> Live Demo
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Projects;
