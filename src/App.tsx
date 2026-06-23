import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import TechStack from './components/TechStack';
import Projects from './components/Projects';
import Experience from './components/Experience';
import AIFocus from './components/AIFocus';
import Contact from './components/Contact';

function App() {
  return (
    <>
      <div className="bg-glow glow-top-right"></div>
      <div className="bg-glow glow-bottom-left" style={{ top: '40%' }}></div>
      <Navbar />
      <main className="app-container">
        <Hero />
        <About />
        <TechStack />
        <Projects />
        <Experience />
        <AIFocus />
        <Contact />
      </main>
    </>
  );
}

export default App;
