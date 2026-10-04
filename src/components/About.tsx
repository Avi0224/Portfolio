import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'

export function About() {
  const containerRef = useRef<HTMLElement>(null)
  
  const text = "I'm Avibhav, an AI engineer who turns ideas into working products, fast. I build AI automations, web applications, and immersive 3D websites for businesses that want results, not prototypes. By using AI across the entire development process, I deliver in days what typically takes weeks, without compromising quality. My work ranges from interactive 3D experiences to applications built to solve real problems. Every project starts with one question: what will actually change for the people using it? If you have a problem worth solving or an idea worth building, let's talk."
  const words = text.split(" ")

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 90%", "start 40%"] // Much faster, snappier reveal
  })

  // Check if reduced motion is enabled
  const prefersReducedMotion = typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false

  return (
    <section id="about" ref={containerRef} className="min-h-screen flex items-center px-6 md:px-24 pointer-events-none w-full">
      <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Massive Editorial Numbering */}
        <div className="md:col-span-4 flex flex-col justify-center items-start md:items-end opacity-20">
          <div className="text-[12rem] leading-none font-bold text-amber-500 tracking-tighter mix-blend-screen">01</div>
          <div className="text-xl font-mono text-amber-500 tracking-widest uppercase border-t border-amber-500 pt-4 mt-4 w-full md:text-right">
            System Log
          </div>
        </div>

        {/* Right Column: The Data Box */}
        <div className="md:col-span-8 relative pointer-events-auto">
          <div className="max-w-2xl bg-neutral-900/50 border border-amber-500/10 backdrop-blur-md p-10 shadow-2xl relative">
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-amber-500/50" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-amber-500/50" />
            
            <p className="text-lg md:text-xl text-neutral-300 font-light leading-relaxed flex flex-wrap gap-x-[0.25em]">
              {words.map((word, i) => {
                const start = i / words.length;
                const end = start + (1 / words.length);
                const opacity = useTransform(scrollYProgress, [start, end], [0.1, 1]);
                
                return (
                  <motion.span key={i} style={{ opacity: prefersReducedMotion ? 1 : opacity }}>
                    {word}
                  </motion.span>
                )
              })}
            </p>
            <div className="mt-12 flex flex-wrap gap-4 text-xs font-mono text-neutral-500 uppercase tracking-wider">
              <div className="px-3 py-1.5 border border-neutral-700 flex items-center gap-2 hover:border-amber-500 hover:text-amber-500 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/></svg>
                TypeScript
              </div>
              <div className="px-3 py-1.5 border border-neutral-700 flex items-center gap-2 hover:border-amber-500 hover:text-amber-500 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.29 7 12 12 20.71 7"/><line x1="12" y1="22" x2="12" y2="12"/></svg>
                React Three Fiber
              </div>
              <div className="px-3 py-1.5 border border-neutral-700 flex items-center gap-2 hover:border-amber-500 hover:text-amber-500 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/><path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/></svg>
                GLSL Shaders
              </div>
              <div className="px-3 py-1.5 border border-neutral-700 flex items-center gap-2 hover:border-amber-500 hover:text-amber-500 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>
                Python
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
