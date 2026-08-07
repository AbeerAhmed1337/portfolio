# Projects Built by Abeer Ahmed

## Project 1: CollabriAI — AI-Driven Project Management (Featured / Final Year Project)

**Tagline:** An intelligent workflow application that automates task delegation and team generation.

**Problem:** Traditional project management requires manual task routing and lacks contextual understanding of team capabilities.

**Key Features:**
- Real-time task synchronization and Kanban board state management.
- Automated data mapping between relational structures and NoSQL documents.
- AI-powered assignment algorithms based on developer workloads.

**AI Intelligence:** Built an autonomous agent architecture that dynamically routes user queries, interacts with a Neo4j knowledge graph to understand project context, and triggers deterministic JSON outputs for frontend rendering.

**Tech Stack:** React, FastAPI, LangChain, MongoDB, Neo4j, Docker

**Live:** https://collabriai.vercel.app/

---

## Project 2: To-Do / Task Management

**Tagline:** An app where users can create tasks based on their needs with a live Kanban board showing workspace activity.

**Problem:** Traditional task trackers often lack real-time synchronization across teams, causing friction in collaborative workspaces. This application provides a seamless, live-updating environment to ensure all team members remain aligned without manual refreshing.

**Key Features:**
- Interactive Kanban Board for visual task management.
- Real-Time Task Status Updates to instantly reflect changes.
- Intuitive, user-friendly UI designed for maximum productivity.

**Tech Stack:** React, ASP.NET MVC, SQL Server, Git

**GitHub:** https://github.com/AbeerAhmed1337/task_management

---

## Project 3: Health-Chatbot — Safe Medical Advisory Agent

**Tagline:** A safe, friendly health information chatbot powered by OpenRouter API with rigorous prompt engineering and safety filtering.

**Problem:** Many individuals hesitate to seek professional medical help for minor concerns but still require reliable, immediate health information. This application serves as a trustworthy first line of advice, providing safe, accessible health guidance directly to users while strictly maintaining non-diagnostic boundaries.

**Safety & Logic Features:**
- Emergency detection: Detects crisis keywords and immediately redirects to emergency services.
- Out-of-scope blocking: Strictly refuses diagnosis or prescription requests to ensure user safety.
- Sensitive topic flagging: Automatically adds necessary disclaimers for high-risk topics like mental health or cancer.
- Advanced prompt engineering: System prompts enforce safe, friendly, non-diagnostic boundaries.
- Conversation logging: Securely logs all chats for systematic review and improvement.

**Tech Stack:** Python, OpenRouter API, Prompt Engineering, LLMs

**GitHub:** https://github.com/AbeerAhmed1337/Health-Chatbot/tree/main/health_chatbot

---

## Project 4: Telecom Customer Churn Prediction

**Tagline:** An end-to-end, production-ready machine learning pipeline to predict customer churn.

**Problem:** Customer churn is one of the most critical business problems in the telecom industry. Acquiring a new customer costs significantly more than retaining an existing one. This pipeline proactively identifies at-risk customers, allowing businesses to apply targeted retention strategies before losing them.

**Key Features:**
- Numerical Analysis: Evaluates continuous variables like customer tenure, monthly charges, and total billed amounts.
- Categorical Processing: Encodes complex service features such as contract types, payment methods, and technical support status.
- Binary Classification: Accurately predicts the Churn target variable to trigger automated retention workflows.

**Tech Stack:** Python, pandas, scikit-learn, numpy, matplotlib, seaborn, joblib

**GitHub:** https://github.com/AbeerAhmed1337/telco-churn-ml-pipeline#problem-statement

---

## Project 5: Auto Tagging Support Tickets Using LLMs

**Tagline:** An automated classification system that categorizes customer support tickets into six predefined categories.

**Problem:** Support teams often drown in unstructured, unclassified tickets, leading to delayed response times and misrouted issues. Manually tagging tickets is tedious, expensive, and scales poorly. This project solves that bottleneck by using LLMs to deeply understand the semantic context of a ticket and instantly route it to the correct department (Billing, Technical, Account, etc.).

**Key Observations & Results:**
- LLM Dominance: The LLM significantly outperformed traditional ML models (85% vs ~70% accuracy), proving its superior semantic understanding.
- Few-Shot Impact: Injecting just a few examples resolved complex "boundary issues", pushing Top-1 accuracy to an impressive 92%.
- Zero-Shot Reliability: Even without training, the LLM proved highly reliable for Top-3 suggestions (98%), making it ideal for human-in-the-loop systems.

**Tech Stack:** Python, Jupyter Notebook, LLMs, Prompt Engineering, scikit-learn

**GitHub:** https://github.com/AbeerAhmed1337/support-ticket-auto-tagging
