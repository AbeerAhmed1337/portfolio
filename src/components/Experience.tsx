import { motion } from 'framer-motion';
import { Briefcase, GraduationCap } from 'lucide-react';

const Experience = () => {
  return (
    <section id="experience">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="heading-lg">Experience & <span className="text-gradient">Engineering Initiatives</span></h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          <div className="glass-panel" style={{ borderLeft: '4px solid var(--accent-primary)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <div style={{ background: 'var(--glass-bg)', padding: '0.75rem', borderRadius: '12px' }}>
                <Briefcase size={24} className="text-gradient" />
              </div>
              <div>
                <h3 className="heading-md" style={{ margin: 0 }}>Software Engineering Intern</h3>
                <p style={{ color: 'var(--accent-secondary)', fontWeight: 500 }}>10Pearls | May 2026</p>
              </div>
            </div>
            <p style={{ color: 'var(--text-secondary)' }}>
              Developed a full-stack to-do task management platform utilizing React, ASP.NET Core Web API, and Microsoft SQL Server. Focused on creating a scalable architecture and seamless user experience.
            </p>
          </div>
          
          <div className="glass-panel" style={{ borderLeft: '4px solid var(--accent-primary)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <div style={{ background: 'var(--glass-bg)', padding: '0.75rem', borderRadius: '12px' }}>
                <Briefcase size={24} className="text-gradient" />
              </div>
              <div>
                <h3 className="heading-md" style={{ margin: 0 }}>Intern</h3>
                <p style={{ color: 'var(--accent-secondary)', fontWeight: 500 }}>Karachi Development Authority (KDA)</p>
              </div>
            </div>
            <p style={{ color: 'var(--text-secondary)' }}>
              Supported technical operations and administrative workflows across cross-functional municipal development projects. Gained hands-on experience in large-scale organizational processes.
            </p>
          </div>

          <div className="glass-panel" style={{ borderLeft: '4px solid #d946ef' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <div style={{ background: 'var(--glass-bg)', padding: '0.75rem', borderRadius: '12px' }}>
                <GraduationCap size={24} style={{ color: '#d946ef' }} />
              </div>
              <div>
                <h3 className="heading-md" style={{ margin: 0 }}>Software Engineering Graduate</h3>
                <p style={{ color: '#d946ef', fontWeight: 500 }}>NED University of Engineering and Technology</p>
              </div>
            </div>
            <ul style={{ listStyle: 'none', color: 'var(--text-secondary)', paddingLeft: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li>• Engineered complex, multi-service architectures as part of intensive academic and personal initiatives.</li>
              <li>• Led the backend and AI integration for major capstone projects, ensuring seamless communication between Node.js frontends, FastAPI microservices, and graph databases.</li>
              <li>• Bridged the gap between theoretical computer science and practical deployment by utilizing tools like Docker and Git for CI/CD and version control.</li>
            </ul>
          </div>

        </div>
      </motion.div>
    </section>
  );
};

export default Experience;
