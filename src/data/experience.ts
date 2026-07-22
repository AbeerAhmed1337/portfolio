export type ExperienceItem = {
  id: string;
  type: 'work' | 'education';
  title: string;
  org: string;
  date: string;
  summary?: string;
  points?: string[];
};

export const experienceItems: ExperienceItem[] = [
  {
    id: '10pearls',
    type: 'work',
    title: 'Software Engineering Intern',
    org: '10Pearls',
    date: 'May 2026 – July 2026',
    summary:
      'Developed a full-stack to-do task management platform utilizing React, ASP.NET Core Web API, and Microsoft SQL Server. Focused on creating a scalable architecture and seamless user experience.',
  },
  {
    id: 'kda',
    type: 'work',
    title: 'Intern',
    org: 'Karachi Development Authority (KDA)',
    date: 'June 2025',
    summary:
      'Supported technical operations and administrative workflows across cross-functional municipal development projects. Gained hands-on experience in large-scale organizational processes.',
  },
  {
    id: 'ned',
    type: 'education',
    title: 'Software Engineering Graduate',
    org: 'NED University of Engineering and Technology',
    date: '2022 – 2026',
    points: [
      'Engineered complex, multi-service architectures as part of intensive academic and personal initiatives.',
      'Led the backend and AI integration for major capstone projects, ensuring seamless communication between Node.js frontends, FastAPI microservices, and graph databases.',
      'Bridged the gap between theoretical computer science and practical deployment by utilizing tools like Docker and Git for CI/CD and version control.',
    ],
  },
];
