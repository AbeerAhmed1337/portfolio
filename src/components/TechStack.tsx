import { motion } from 'framer-motion';
import { LayoutTemplate, Server, BrainCircuit, Database, Wrench } from 'lucide-react';

const TechStack = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const categories = [
    {
      title: 'Frontend',
      icon: <LayoutTemplate className="text-gradient" size={24} />,
      skills: ['React', 'HTML5', 'CSS3', 'JavaScript (ES6+)']
    },
    {
      title: 'Backend',
      icon: <Server className="text-gradient" size={24} />,
      skills: ['FastAPI', 'Node.js']
    },
    {
      title: 'AI & ML',
      icon: <BrainCircuit className="text-gradient" size={24} />,
      skills: ['LLMs', 'LangChain', 'Agentic Workflows', 'RAG', 'Prompt Engineering']
    },
    {
      title: 'Databases',
      icon: <Database className="text-gradient" size={24} />,
      skills: ['MongoDB (NoSQL)', 'Neo4j (Graph)', 'SQL Server']
    },
    {
      title: 'Tools',
      icon: <Wrench className="text-gradient" size={24} />,
      skills: ['Git', 'Docker', 'Postman', 'RESTful APIs']
    }
  ];

  return (
    <section id="tech">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={containerVariants}
      >
        <h2 className="heading-lg">My <span className="text-gradient">Tech Stack</span></h2>
        
        <div className="grid-3" style={{ marginBottom: '4rem' }}>
          {categories.map((category, index) => (
            <motion.div key={index} variants={itemVariants} className="glass-panel">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                {category.icon}
                <h3 className="heading-md" style={{ margin: 0 }}>{category.title}</h3>
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {category.skills.map((skill, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--accent-primary)' }}></div>
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div variants={itemVariants} className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', borderLeft: '4px solid var(--accent-primary)' }}>
          <div>
            <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem', fontSize: '1.1rem' }}>Where I Excel</h4>
            <p style={{ color: 'var(--text-secondary)' }}>
              I excel in both <strong>front-end</strong> and <strong>back-end development</strong>, building robust web applications from the ground up. Additionally, I am highly proficient at <strong>architecting chatbot agentic workflows</strong> using various LLMs, designing systems where AI can plan, use tools, and execute multi-step logic autonomously.
            </p>
          </div>
          <div>
            <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem', fontSize: '1.1rem' }}>What I'm Currently Exploring</h4>
            <p style={{ color: 'var(--text-secondary)' }}>
              I am currently focused on advancing my full-stack capabilities to bring sophisticated <strong>AI-driven automation</strong> and business logic directly into seamless web experiences.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default TechStack;
