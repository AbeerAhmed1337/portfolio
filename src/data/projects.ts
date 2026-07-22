export type Project = {
  id: string;
  title: string;
  tagline: string;
  featured?: boolean;
  badge?: string;
  problem: string;
  featuresTitle: string;
  features: string[];
  intelligence?: string;
  tech: string[];
  github?: string;
  live?: string;
  mark: string;
};

export const projects: Project[] = [
  {
    id: 'collabriai',
    title: 'CollabriAI — AI-Driven Project Management',
    tagline: 'An intelligent workflow application that automates task delegation and team generation.',
    featured: true,
    badge: 'Final Year Project',
    problem:
      'Traditional project management requires manual task routing and lacks contextual understanding of team capabilities.',
    featuresTitle: 'Key Features',
    features: [
      'Real-time task synchronization and Kanban board state management.',
      'Automated data mapping between relational structures and NoSQL documents.',
      'AI-powered assignment algorithms based on developer workloads.',
    ],
    intelligence:
      'Built an autonomous agent architecture that dynamically routes user queries, interacts with a Neo4j knowledge graph to understand project context, and triggers deterministic JSON outputs for frontend rendering.',
    tech: ['React', 'FastAPI', 'LangChain', 'MongoDB', 'Neo4j', 'Docker'],
    github: '#',
    live: 'https://collabriai.vercel.app/',
    mark: '01',
  },
  {
    id: 'task-management',
    title: 'To-Do / Task Management',
    tagline:
      'An app where users can create tasks based on their needs with a live Kanban board showing workspace activity.',
    problem:
      'Traditional task trackers often lack real-time synchronization across teams, causing friction in collaborative workspaces. This application provides a seamless, live-updating environment to ensure all team members remain aligned without manual refreshing.',
    featuresTitle: 'Key Features',
    features: [
      'Interactive Kanban Board for visual task management.',
      'Real-Time Task Status Updates to instantly reflect changes.',
      'Intuitive, user-friendly UI designed for maximum productivity.',
    ],
    tech: ['React', 'ASP.NET MVC', 'SQL Server', 'Git'],
    github: 'https://github.com/AbeerAhmed1337/task_management',
    mark: '02',
  },
  {
    id: 'health-chatbot',
    title: 'Health-Chatbot — Safe Medical Advisory Agent',
    tagline:
      'A safe, friendly health information chatbot powered by OpenRouter API with rigorous prompt engineering and safety filtering.',
    problem:
      'Many individuals hesitate to seek professional medical help for minor concerns but still require reliable, immediate health information. This application serves as a trustworthy first line of advice, providing safe, accessible health guidance directly to users while strictly maintaining non-diagnostic boundaries.',
    featuresTitle: 'Safety & Logic Features',
    features: [
      'Emergency detection: Detects crisis keywords and immediately redirects to emergency services.',
      'Out-of-scope blocking: Strictly refuses diagnosis or prescription requests to ensure user safety.',
      'Sensitive topic flagging: Automatically adds necessary disclaimers for high-risk topics like mental health or cancer.',
      'Advanced prompt engineering: System prompts enforce safe, friendly, non-diagnostic boundaries.',
      'Conversation logging: Securely logs all chats for systematic review and improvement.',
    ],
    tech: ['Python', 'OpenRouter API', 'Prompt Engineering', 'LLMs'],
    github: 'https://github.com/AbeerAhmed1337/Health-Chatbot/tree/main/health_chatbot',
    mark: '03',
  },
  {
    id: 'churn',
    title: 'Telecom Customer Churn Prediction',
    tagline: 'An end-to-end, production-ready machine learning pipeline to predict customer churn.',
    problem:
      'Customer churn is one of the most critical business problems in the telecom industry. Acquiring a new customer costs significantly more than retaining an existing one. This pipeline proactively identifies at-risk customers, allowing businesses to apply targeted retention strategies before losing them.',
    featuresTitle: 'Key Features',
    features: [
      'Numerical Analysis: Evaluates continuous variables like customer tenure, monthly charges, and total billed amounts.',
      'Categorical Processing: Encodes complex service features such as contract types, payment methods, and technical support status.',
      'Binary Classification: Accurately predicts the Churn target variable to trigger automated retention workflows.',
    ],
    tech: ['Python', 'pandas', 'scikit-learn', 'numpy', 'matplotlib', 'seaborn', 'joblib'],
    github: 'https://github.com/AbeerAhmed1337/telco-churn-ml-pipeline#problem-statement',
    mark: '04',
  },
  {
    id: 'ticket-tagging',
    title: 'Auto Tagging Support Tickets Using LLMs',
    tagline:
      'An automated classification system that categorizes customer support tickets into six predefined categories.',
    problem:
      'Support teams often drown in unstructured, unclassified tickets, leading to delayed response times and misrouted issues. Manually tagging tickets is tedious, expensive, and scales poorly. This project solves that bottleneck by using LLMs to deeply understand the semantic context of a ticket and instantly route it to the correct department (Billing, Technical, Account, etc.).',
    featuresTitle: 'Key Observations & Results',
    features: [
      'LLM Dominance: The LLM significantly outperformed traditional ML models (85% vs ~70% accuracy), proving its superior semantic understanding.',
      'Few-Shot Impact: Injecting just a few examples resolved complex "boundary issues", pushing Top-1 accuracy to an impressive 92%.',
      'Zero-Shot Reliability: Even without training, the LLM proved highly reliable for Top-3 suggestions (98%), making it ideal for human-in-the-loop systems.',
    ],
    tech: ['Python', 'Jupyter Notebook', 'LLMs', 'Prompt Engineering', 'scikit-learn'],
    github: 'https://github.com/AbeerAhmed1337/support-ticket-auto-tagging',
    mark: '05',
  },
];
