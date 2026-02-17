import { ParticlesBackground } from './components/ParticlesBackground';
import { ChatBot } from './components/ChatBot';
import { Header } from './sections/Header';
import { Hero } from './sections/Hero';
import { Services } from './sections/Services';
import { BusinessSection } from './sections/BusinessSection';
import { Footer } from './sections/Footer';

function App() {
  return (
    <div className="relative min-h-screen">
      {/* Particles Background */}
      <ParticlesBackground />
      
      {/* Header */}
      <Header />
      
      {/* Main Content */}
      <main className="relative z-10">
        <Hero />
        <Services />
        <BusinessSection />
      </main>
      
      {/* Footer */}
      <Footer />
      
      {/* ChatBot */}
      <ChatBot />
    </div>
  );
}

export default App;
