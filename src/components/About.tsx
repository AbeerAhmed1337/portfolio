import { motion } from 'framer-motion';

const About = () => {
  return (
    <section id="about">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="heading-lg">Building the <span className="text-gradient">Brain and Body</span> of Modern Applications</h2>
        
        <div className="glass-panel" style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }}>
          <p style={{ marginBottom: '1.5rem' }}>
            I'm a software engineer who refuses to build static tools in a dynamic world. My engineering journey began with traditional web development, but the disruptive potential of Large Language Models fundamentally shifted my trajectory.
          </p>
          <p style={{ marginBottom: '1.5rem' }}>
            I quickly realized that an AI model without a scalable, well-architected infrastructure is just a sandbox experiment. I chose to master both domains—Full Stack and AI—so I could build end-to-end intelligent systems, from the underlying neural logic to the user interface.
          </p>
          <p>
            I thrive on solving complex problems: designing agentic workflows, automating decision-making processes, and seamlessly integrating AI into practical web applications. As a recent engineering graduate from NED University of Engineering and Technology, I am looking to join a forward-thinking team where I can push the boundaries of GenAI integrations and build production-grade software that delivers real-world value.
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default About;
