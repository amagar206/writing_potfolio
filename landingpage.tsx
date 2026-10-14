import React, { useState, useEffect, useRef } from 'react';
import { 
  Terminal, 
  Code2, 
  PenTool, 
  Rocket, 
  Search, 
  Cpu, 
  Globe2, 
  ChevronRight,
  ExternalLink,
  Zap,
  CheckCircle2
} from 'lucide-react';

// Custom Hook for Scroll Reveal Animations
const useScrollReveal = () => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => setIsVisible(entry.isIntersecting));
    });
    
    const currentRef = domRef.current;
    if (currentRef) observer.observe(currentRef);
    
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  return [domRef, isVisible];
};

// Reusable Reveal Component
const Reveal = ({ children, delay = 0, direction = 'up' }) => {
  const [ref, isVisible] = useScrollReveal();
  
  const getDirectionClass = () => {
    switch(direction) {
      case 'up': return 'translate-y-10';
      case 'down': return '-translate-y-10';
      case 'left': return 'translate-x-10';
      case 'right': return '-translate-x-10';
      default: return 'translate-y-10';
    }
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${
        isVisible ? 'opacity-100 transform-none' : `opacity-0 ${getDirectionClass()}`
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default function App() {
  // Injecting custom CSS for specialized animations (typing, glowing borders)
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes blink {
        0%, 100% { opacity: 1; }
        50% { opacity: 0; }
      }
      .cursor-blink {
        animation: blink 1s step-end infinite;
      }
      .glass-panel {
        background: rgba(255, 255, 255, 0.03);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.1);
      }
      .glow-hover {
        transition: all 0.3s ease;
      }
      .glow-hover:hover {
        box-shadow: 0 0 20px rgba(34, 211, 238, 0.4);
        border-color: rgba(34, 211, 238, 0.6);
        transform: translateY(-5px);
      }
      .text-gradient {
        background: linear-gradient(to right, #60a5fa, #22d3ee);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
      .bg-grid-pattern {
        background-image: linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
                          linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px);
        background-size: 40px 40px;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const [typedText, setTypedText] = useState('');
  const phrases = ['Technical Content.', 'SEO Articles.', 'Sponsored Posts.'];
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Typing Effect Logic
  useEffect(() => {
    const typeSpeed = isDeleting ? 50 : 100;
    const currentPhrase = phrases[phraseIndex];
    
    const timeout = setTimeout(() => {
      if (!isDeleting && typedText === currentPhrase) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && typedText === '') {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
      } else {
        setTypedText(
          currentPhrase.substring(0, typedText.length + (isDeleting ? -1 : 1))
        );
      }
    }, typeSpeed);

    return () => clearTimeout(timeout);
  }, [typedText, isDeleting, phraseIndex]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-cyan-500/30 overflow-x-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-950 to-slate-950"></div>
      <div className="fixed inset-0 z-0 pointer-events-none bg-grid-pattern opacity-20"></div>

      {/* Main Content */}
      <div className="relative z-10">
        
        {/* Navbar */}
        <nav className="fixed top-0 w-full z-50 glass-panel border-b-0 border-white/5 py-4 px-6 md:px-12 flex justify-between items-center">
          <div className="text-xl font-bold tracking-tighter flex items-center gap-2">
            <Terminal className="text-cyan-400 w-6 h-6" />
            <span className="text-white">AMAGAR</span>
            <span className="text-cyan-400">.MOHMED</span>
          </div>
          <a 
            href="#hire-me" 
            className="px-5 py-2 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500 hover:text-slate-900 transition-all font-medium text-sm flex items-center gap-2"
          >
            Publisuites Profile <ExternalLink className="w-4 h-4" />
          </a>
        </nav>

        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center pt-20 px-6 relative">
          {/* Decorative glowing orbs */}
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500/20 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-600/20 rounded-full blur-[120px]"></div>

          <div className="max-w-4xl mx-auto text-center relative z-10">
            <Reveal delay={100}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-sm text-cyan-300 mb-6 border-cyan-500/30">
                <Zap className="w-4 h-4" /> Available for new projects on Publisuites
              </div>
            </Reveal>
            
            <Reveal delay={200}>
              <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight tracking-tight">
                Bridging the Gap Between <br className="hidden md:block" />
                <span className="text-gradient">Code & Compelling Copy.</span>
              </h1>
            </Reveal>
            
            <Reveal delay={300}>
              <div className="text-2xl md:text-3xl text-slate-400 mb-10 font-light h-10">
                I write high-converting <span className="text-cyan-400 font-medium">{typedText}</span><span className="cursor-blink text-cyan-400">|</span>
              </div>
            </Reveal>
            
            <Reveal delay={400}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button className="w-full sm:w-auto px-8 py-4 rounded-lg bg-cyan-500 text-slate-950 font-bold hover:bg-cyan-400 hover:shadow-[0_0_20px_rgba(34,211,238,0.5)] transition-all flex items-center justify-center gap-2">
                  Hire Me on Publisuites <ChevronRight className="w-5 h-5" />
                </button>
                <button className="w-full sm:w-auto px-8 py-4 rounded-lg glass-panel hover:bg-white/10 transition-all font-medium flex items-center justify-center gap-2">
                  View My Services
                </button>
              </div>
            </Reveal>
          </div>
        </section>

        {/* About Me Section */}
        <section className="py-24 px-6 bg-slate-900/50 border-y border-white/5" id="about">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <Reveal direction="left">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-blue-500/20 rounded-2xl transform rotate-3 scale-105"></div>
                  <div className="glass-panel p-8 rounded-2xl relative z-10">
                    <div className="flex items-center gap-4 mb-6 border-b border-white/10 pb-6">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 p-[2px]">
                        <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center text-xl font-bold">
                          AM
                        </div>
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-white">Amagar Mohmed</h2>
                        <p className="text-cyan-400">Technical Content Writer</p>
                      </div>
                    </div>
                    <ul className="space-y-4">
                      <li className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-white/5 text-slate-300"><Cpu className="w-5 h-5" /></div>
                        <div>
                          <p className="text-sm text-slate-400">Background</p>
                          <p className="font-medium text-slate-200">Digital Infrastructure & Programming</p>
                        </div>
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-white/5 text-slate-300"><Globe2 className="w-5 h-5" /></div>
                        <div>
                          <p className="text-sm text-slate-400">Languages</p>
                          <p className="font-medium text-slate-200">English (B1 Level) - Clear & Accessible</p>
                        </div>
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-white/5 text-slate-300"><Rocket className="w-5 h-5" /></div>
                        <div>
                          <p className="text-sm text-slate-400">Age & Drive</p>
                          <p className="font-medium text-slate-200">21 Years Old - Fresh perspective, adaptable</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </Reveal>
              
              <Reveal direction="right" delay={200}>
                <div>
                  <h3 className="text-sm font-bold text-cyan-500 tracking-wider uppercase mb-2">The Developer's Edge</h3>
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Writing Tech Content that Actually Makes Sense.</h2>
                  <p className="text-slate-400 text-lg mb-6 leading-relaxed">
                    Most content writers don't understand the technology they write about. As a 21-year-old with hands-on experience in <strong>Digital Infrastructure and Programming</strong>, I don't just research topics—I understand the architecture behind them.
                  </p>
                  <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                    Coupled with a solid B1 English level, I specialize in translating complex technical jargon into clear, engaging, and SEO-optimized content that resonates with both developers and decision-makers on Publisuites.
                  </p>
                  <div className="flex gap-4">
                    <span className="px-4 py-2 rounded-full bg-blue-900/30 text-blue-300 border border-blue-500/20 text-sm">Python</span>
                    <span className="px-4 py-2 rounded-full bg-blue-900/30 text-blue-300 border border-blue-500/20 text-sm">Networking</span>
                    <span className="px-4 py-2 rounded-full bg-blue-900/30 text-blue-300 border border-blue-500/20 text-sm">Web Dev</span>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-24 px-6 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Reveal>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Specialized Services</h2>
              <p className="text-slate-400 max-w-2xl mx-auto text-lg">High-quality content tailored for tech brands, software companies, and digital agencies on Publisuites.</p>
            </Reveal>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: <Code2 className="w-8 h-8 text-cyan-400" />,
                title: "In-Depth Tech Articles",
                desc: "Tutorials, documentation, and deep dives into programming concepts and IT infrastructure written by someone who understands the code."
              },
              {
                icon: <Search className="w-8 h-8 text-cyan-400" />,
                title: "SEO-Optimized Content",
                desc: "Strategic keyword integration without compromising readability. Rank higher on Google while maintaining technical accuracy."
              },
              {
                icon: <PenTool className="w-8 h-8 text-cyan-400" />,
                title: "Sponsored Posts",
                desc: "Engaging promotional content for SaaS products, tools, and digital services tailored specifically for your Publisuites campaigns."
              }
            ].map((service, index) => (
              <Reveal key={index} delay={index * 150}>
                <div className="glass-panel p-8 rounded-2xl h-full glow-hover group cursor-default">
                  <div className="w-14 h-14 rounded-xl bg-slate-800/50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform border border-white/5 group-hover:border-cyan-500/30">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{service.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Why Choose Me Section */}
        <section className="py-24 px-6 bg-slate-900/30 relative">
          <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"></div>
          
          <div className="max-w-5xl mx-auto">
            <Reveal>
              <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-16">Why Hire Me on Publisuites?</h2>
            </Reveal>
            
            <div className="grid sm:grid-cols-2 gap-8">
              {[
                { title: "Zero 'Fluff' Guarantee", desc: "No generic AI filler. Every sentence provides value, backed by real technical understanding." },
                { title: "Native Tech Literacy", desc: "I read documentation for fun. I can grasp your product's technical USP faster than a generalist writer." },
                { title: "Reliable & Fast Delivery", desc: "As a young, hungry freelancer, I prioritize quick turnarounds without sacrificing quality." },
                { title: "Clear B1 English", desc: "My writing is direct, grammatically sound, and avoids overly complex phrasing—perfect for global audiences." }
              ].map((item, index) => (
                <Reveal key={index} delay={index * 100} direction={index % 2 === 0 ? 'left' : 'right'}>
                  <div className="flex gap-4 p-6 glass-panel rounded-xl border-l-4 border-l-cyan-500 hover:bg-white/[0.05] transition-colors">
                    <CheckCircle2 className="w-6 h-6 text-cyan-400 shrink-0 mt-1" />
                    <div>
                      <h4 className="text-lg font-bold text-white mb-2">{item.title}</h4>
                      <p className="text-slate-400">{item.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA / Footer */}
        <section className="py-24 px-6 relative overflow-hidden" id="hire-me">
          <div className="absolute inset-0 bg-cyan-900/10 blur-[100px] rounded-full scale-150"></div>
          <div className="max-w-3xl mx-auto text-center relative z-10 glass-panel p-12 rounded-3xl border-cyan-500/20 shadow-[0_0_50px_rgba(34,211,238,0.1)]">
            <Reveal>
              <h2 className="text-4xl font-bold text-white mb-6">Ready to upgrade your tech content?</h2>
              <p className="text-slate-400 text-lg mb-10">
                Stop settling for generic articles. Let's create content that resonates with developers and drives conversions. Available for orders directly through Publisuites.
              </p>
              <button className="px-10 py-5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold text-lg hover:shadow-[0_0_30px_rgba(34,211,238,0.6)] hover:scale-105 transition-all flex items-center justify-center gap-3 mx-auto">
                Visit My Publisuites Profile <ExternalLink className="w-5 h-5" />
              </button>
            </Reveal>
          </div>
        </section>

        <footer className="py-8 text-center text-slate-500 text-sm border-t border-white/5 relative z-10">
          <p>© {new Date().getFullYear()} Amagar Mohmed. Designed for Tech Excellence.</p>
        </footer>
      </div>
    </div>
  );
}