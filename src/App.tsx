import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import TechStack from './components/TechStack';
import Projects from './components/Projects';
import Experience from './components/Experience';
import AIFocus from './components/AIFocus';
import Contact from './components/Contact';
import Chatbot from './components/Chatbot';

function App() {
  return (
    <>
      <a href="#hero" className="skip-link">
        Skip to content
      </a>
      <Navbar />
      <main id="main" className="app-container">
        <Hero />
        <About />
        <TechStack />
        <Projects />
        <Experience />
        <AIFocus />
        <Contact />
      </main>
      <footer className="site-footer">
        <div className="app-container">
          <p>
            © {new Date().getFullYear()} M. Abeer Ahmed Siddiqui · <span>Built with care</span>
          </p>
        </div>
      </footer>
      <Chatbot />
    </>
  );
}

export default App;
