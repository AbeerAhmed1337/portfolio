import { motion } from 'framer-motion';
import { Cpu, Network, FileJson } from 'lucide-react';
import SectionHeader from './ui/SectionHeader';

const pillars = [
  {
    title: 'Agentic Workflows',
    icon: Cpu,
    body: 'I design systems where LLMs operate as agents—capable of planning, context retrieval, tool-calling, and executing complex, multi-step tasks autonomously.',
  },
  {
    title: 'Graph-RAG & Context',
    icon: Network,
    body: 'By integrating Neo4j with AI, I build applications that possess a deep, relational understanding of data, drastically reducing hallucinations and improving output accuracy.',
  },
  {
    title: 'Prompt Engineering & Guardrails',
    icon: FileJson,
    body: 'I specialize in structuring probabilistic models to return deterministic, strictly formatted data (like JSON objects) necessary for reliable frontend rendering.',
  },
];

const AIFocus = () => {
  return (
    <section id="ai-focus" aria-labelledby="ai-heading">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <SectionHeader
          eyebrow="AI systems"
          title={
            <span id="ai-heading">
              Building <span className="text-accent">autonomous systems</span>
            </span>
          }
          description="My expertise in Artificial Intelligence goes far beyond just sending prompts to an API endpoint. I treat AI as a core architectural component."
        />

        <div className="ai-grid">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <motion.article
                key={pillar.title}
                className="ai-card surface surface-interactive"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="ai-card-icon" aria-hidden>
                  <Icon size={20} />
                </div>
                <h3 className="heading-md">{pillar.title}</h3>
                <p>{pillar.body}</p>
              </motion.article>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
};

export default AIFocus;
