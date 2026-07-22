import type { LucideIcon } from 'lucide-react';
import { LayoutTemplate, Server, BrainCircuit, Database, Wrench } from 'lucide-react';

export type SkillCategory = {
  title: string;
  icon: LucideIcon;
  experience: string;
  description: string;
  skills: string[];
};

export const skillCategories: SkillCategory[] = [
  {
    title: 'Frontend',
    icon: LayoutTemplate,
    experience: 'Production UI',
    description: 'Responsive interfaces with clear hierarchy, accessible patterns, and maintainable component structure.',
    skills: ['React', 'HTML5', 'CSS3', 'JavaScript (ES6+)'],
  },
  {
    title: 'Backend',
    icon: Server,
    experience: 'API & services',
    description: 'Reliable server-side systems, REST APIs, and scalable request/response flows for real products.',
    skills: ['FastAPI', 'Node.js'],
  },
  {
    title: 'AI & ML',
    icon: BrainCircuit,
    experience: 'Agent systems',
    description: 'LLM integrations with structured outputs, retrieval, and multi-step agentic workflows.',
    skills: ['LLMs', 'LangChain', 'Agentic Workflows', 'RAG', 'Prompt Engineering'],
  },
  {
    title: 'Databases',
    icon: Database,
    experience: 'Data modeling',
    description: 'Relational, document, and graph stores chosen to match domain complexity and query patterns.',
    skills: ['MongoDB (NoSQL)', 'Neo4j (Graph)', 'SQL Server'],
  },
  {
    title: 'Tools',
    icon: Wrench,
    experience: 'Delivery craft',
    description: 'Version control, containerization, and API tooling for predictable shipping and debugging.',
    skills: ['Git', 'Docker', 'Postman', 'RESTful APIs'],
  },
];
