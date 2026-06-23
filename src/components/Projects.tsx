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
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div className="glass-panel" style={{ position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, right: 0, width: '150px', height: '150px', background: 'var(--accent-glow)', filter: 'blur(50px)', borderRadius: '50%', zIndex: -1 }}></div>
          
          <h3 className="heading-md" style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            CollabriAI - AI-Driven Project Management
            <span className="badge" style={{ fontSize: '0.8rem', padding: '0.3rem 0.8rem' }}>Final Year Project</span>
          </h3>
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
            <a href="https://collabriai.vercel.app/" target="_blank" rel="noreferrer" className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
              <ExternalLink size={16} /> Live Demo
            </a>
          </div>
        </div>

        {/* Project 2: To-Do / Task Management */}
        <div className="glass-panel" style={{ position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, right: 0, width: '150px', height: '150px', background: 'var(--accent-glow)', filter: 'blur(50px)', borderRadius: '50%', zIndex: -1 }}></div>
          
          <h3 className="heading-md">To-Do / Task Management</h3>
          <p style={{ color: 'var(--accent-secondary)', fontWeight: 500, marginBottom: '1rem' }}>
            An app where users can create tasks based on their needs with a live Kanban board showing workspace activity.
          </p>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>The Problem</h4>
            <p style={{ color: 'var(--text-secondary)' }}>Traditional task trackers often lack real-time synchronization across teams, causing friction in collaborative workspaces. This application provides a seamless, live-updating environment to ensure all team members remain aligned without manual refreshing.</p>
          </div>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Key Features</h4>
            <ul style={{ listStyle: 'none', color: 'var(--text-secondary)', paddingLeft: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li>• Interactive Kanban Board for visual task management.</li>
              <li>• Real-Time Task Status Updates to instantly reflect changes.</li>
              <li>• Intuitive, user-friendly UI designed for maximum productivity.</li>
            </ul>
          </div>
          
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem' }}>
            {['React', 'ASP.NET MVC', 'SQL Server', 'Git'].map((tech) => (
              <span key={tech} className="badge">{tech}</span>
            ))}
          </div>
          
          <div style={{ display: 'flex', gap: '1rem' }}>
            <a href="https://github.com/AbeerAhmed1337/task_management" target="_blank" rel="noreferrer" className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
              <Code size={16} /> GitHub
            </a>
          </div>
        </div>

        {/* Project 3: Health-Chatbot */}
        <div className="glass-panel" style={{ position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, right: 0, width: '150px', height: '150px', background: 'var(--accent-glow)', filter: 'blur(50px)', borderRadius: '50%', zIndex: -1 }}></div>
          
          <h3 className="heading-md">Health-Chatbot - Safe Medical Advisory Agent</h3>
          <p style={{ color: 'var(--accent-secondary)', fontWeight: 500, marginBottom: '1rem' }}>
            A safe, friendly health information chatbot powered by OpenRouter API with rigorous prompt engineering and safety filtering.
          </p>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>The Problem</h4>
            <p style={{ color: 'var(--text-secondary)' }}>Many individuals hesitate to seek professional medical help for minor concerns but still require reliable, immediate health information. This application serves as a trustworthy first line of advice, providing safe, accessible health guidance directly to users while strictly maintaining non-diagnostic boundaries.</p>
          </div>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Safety & Logic Features</h4>
            <ul style={{ listStyle: 'none', color: 'var(--text-secondary)', paddingLeft: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li>• <strong>Emergency detection:</strong> Detects crisis keywords and immediately redirects to emergency services.</li>
              <li>• <strong>Out-of-scope blocking:</strong> Strictly refuses diagnosis or prescription requests to ensure user safety.</li>
              <li>• <strong>Sensitive topic flagging:</strong> Automatically adds necessary disclaimers for high-risk topics like mental health or cancer.</li>
              <li>• <strong>Advanced prompt engineering:</strong> System prompts enforce safe, friendly, non-diagnostic boundaries.</li>
              <li>• <strong>Conversation logging:</strong> Securely logs all chats for systematic review and improvement.</li>
            </ul>
          </div>
          
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem' }}>
            {['Python', 'OpenRouter API', 'Prompt Engineering', 'LLMs'].map((tech) => (
              <span key={tech} className="badge">{tech}</span>
            ))}
          </div>
          
          <div style={{ display: 'flex', gap: '1rem' }}>
            <a href="https://github.com/AbeerAhmed1337/Health-Chatbot/tree/main/health_chatbot" target="_blank" rel="noreferrer" className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
              <Code size={16} /> GitHub
            </a>
          </div>
        </div>

        {/* Project 4: Telecom Customer Churn Prediction */}
        <div className="glass-panel" style={{ position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, right: 0, width: '150px', height: '150px', background: 'var(--accent-glow)', filter: 'blur(50px)', borderRadius: '50%', zIndex: -1 }}></div>
          
          <h3 className="heading-md">Telecom Customer Churn Prediction</h3>
          <p style={{ color: 'var(--accent-secondary)', fontWeight: 500, marginBottom: '1rem' }}>
            An end-to-end, production-ready machine learning pipeline to predict customer churn.
          </p>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>The Problem</h4>
            <p style={{ color: 'var(--text-secondary)' }}>Customer churn is one of the most critical business problems in the telecom industry. Acquiring a new customer costs significantly more than retaining an existing one. This pipeline proactively identifies at-risk customers, allowing businesses to apply targeted retention strategies before losing them.</p>
          </div>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Key Features</h4>
            <ul style={{ listStyle: 'none', color: 'var(--text-secondary)', paddingLeft: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li>• <strong>Numerical Analysis:</strong> Evaluates continuous variables like customer tenure, monthly charges, and total billed amounts.</li>
              <li>• <strong>Categorical Processing:</strong> Encodes complex service features such as contract types, payment methods, and technical support status.</li>
              <li>• <strong>Binary Classification:</strong> Accurately predicts the `Churn` target variable to trigger automated retention workflows.</li>
            </ul>
          </div>
          
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem' }}>
            {['Python', 'pandas', 'scikit-learn', 'numpy', 'matplotlib', 'seaborn', 'joblib'].map((tech) => (
              <span key={tech} className="badge">{tech}</span>
            ))}
          </div>
          
          <div style={{ display: 'flex', gap: '1rem' }}>
            <a href="https://github.com/AbeerAhmed1337/telco-churn-ml-pipeline#problem-statement" target="_blank" rel="noreferrer" className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
              <Code size={16} /> GitHub
            </a>
          </div>
        </div>

        {/* Project 5: Auto Tagging Support Tickets */}
        <div className="glass-panel" style={{ position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, right: 0, width: '150px', height: '150px', background: 'var(--accent-glow)', filter: 'blur(50px)', borderRadius: '50%', zIndex: -1 }}></div>
          
          <h3 className="heading-md">Auto Tagging Support Tickets Using LLMs</h3>
          <p style={{ color: 'var(--accent-secondary)', fontWeight: 500, marginBottom: '1rem' }}>
            An automated classification system that categorizes customer support tickets into six predefined categories.
          </p>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>The Problem</h4>
            <p style={{ color: 'var(--text-secondary)' }}>Support teams often drown in unstructured, unclassified tickets, leading to delayed response times and misrouted issues. Manually tagging tickets is tedious, expensive, and scales poorly. This project solves that bottleneck by using LLMs to deeply understand the semantic context of a ticket and instantly route it to the correct department (Billing, Technical, Account, etc.).</p>
          </div>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Key Observations & Results</h4>
            <ul style={{ listStyle: 'none', color: 'var(--text-secondary)', paddingLeft: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li>• <strong>LLM Dominance:</strong> The LLM significantly outperformed traditional ML models (85% vs ~70% accuracy), proving its superior semantic understanding.</li>
              <li>• <strong>Few-Shot Impact:</strong> Injecting just a few examples resolved complex "boundary issues", pushing Top-1 accuracy to an impressive 92%.</li>
              <li>• <strong>Zero-Shot Reliability:</strong> Even without training, the LLM proved highly reliable for Top-3 suggestions (98%), making it ideal for human-in-the-loop systems.</li>
            </ul>
          </div>
          
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem' }}>
            {['Python', 'Jupyter Notebook', 'LLMs', 'Prompt Engineering', 'scikit-learn'].map((tech) => (
              <span key={tech} className="badge">{tech}</span>
            ))}
          </div>
          
          <div style={{ display: 'flex', gap: '1rem' }}>
            <a href="https://github.com/AbeerAhmed1337/support-ticket-auto-tagging" target="_blank" rel="noreferrer" className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
              <Code size={16} /> GitHub
            </a>
          </div>
        </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Projects;
