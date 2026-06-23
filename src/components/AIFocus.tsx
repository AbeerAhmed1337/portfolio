import { motion } from 'framer-motion';
import { Cpu, Network, FileJson } from 'lucide-react';

const AIFocus = () => {
  return (
    <section id="ai-focus">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="heading-lg">Building <span className="text-gradient">Autonomous Systems</span></h2>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '3rem', maxWidth: '800px' }}>
          My expertise in Artificial Intelligence goes far beyond just sending prompts to an API endpoint. I treat AI as a core architectural component.
        </p>

        <div className="grid-3">
          <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ background: 'var(--glass-bg)', width: '50px', height: '50px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Cpu className="text-gradient" size={24} />
            </div>
            <h3 className="heading-md" style={{ margin: 0 }}>Agentic Workflows</h3>
            <p style={{ color: 'var(--text-secondary)' }}>
              I design systems where LLMs operate as agents—capable of planning, context retrieval, tool-calling, and executing complex, multi-step tasks autonomously.
            </p>
          </div>

          <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ background: 'var(--glass-bg)', width: '50px', height: '50px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Network className="text-gradient" size={24} />
            </div>
            <h3 className="heading-md" style={{ margin: 0 }}>Graph-RAG & Context</h3>
            <p style={{ color: 'var(--text-secondary)' }}>
              By integrating Neo4j with AI, I build applications that possess a deep, relational understanding of data, drastically reducing hallucinations and improving output accuracy.
            </p>
          </div>

          <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ background: 'var(--glass-bg)', width: '50px', height: '50px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FileJson className="text-gradient" size={24} />
            </div>
            <h3 className="heading-md" style={{ margin: 0 }}>Prompt Engineering & Guardrails</h3>
            <p style={{ color: 'var(--text-secondary)' }}>
              I specialize in structuring probabilistic models to return deterministic, strictly formatted data (like JSON objects) necessary for reliable frontend rendering.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default AIFocus;
