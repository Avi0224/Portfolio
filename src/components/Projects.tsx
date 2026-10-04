import { projects } from '../data/projects'

export function Projects() {
  return (
    <section id="projects" className="flex flex-col w-full pointer-events-none overflow-hidden">
      {projects.map((project, index) => {
        const isEven = index % 2 === 0;
        return (
          <div key={index} className="min-h-screen flex flex-col justify-center px-6 md:px-24 pointer-events-none relative">
            
            {/* Massive Background Index */}
            <div className={`absolute top-1/2 -translate-y-1/2 text-[14rem] md:text-[18rem] font-bold text-amber-500/5 select-none pointer-events-none mix-blend-screen z-0 ${isEven ? 'right-0' : 'left-0'}`}>
              0{index + 2}
            </div>

            <div className={`pointer-events-auto max-w-xl w-full bg-neutral-900/60 border border-neutral-800 backdrop-blur-md p-6 relative group hover:border-amber-500/30 transition-colors duration-500 z-10 ${isEven ? 'self-start' : 'self-end'}`}>
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-amber-500/0 group-hover:border-amber-500/50 transition-colors" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-amber-500/0 group-hover:border-amber-500/50 transition-colors" />
              
              <h2 className="text-xl md:text-2xl font-light text-neutral-200 mb-2 uppercase tracking-widest">{project.title}</h2>
              <p className="text-xs md:text-sm text-amber-500/80 font-mono mb-6 uppercase">{project.outcome}</p>
              
              {project.screenshot ? (
                <div className="aspect-video bg-black/50 border border-neutral-800 mb-8 overflow-hidden relative">
                  <div className="absolute inset-0 border border-amber-500/20 mix-blend-overlay pointer-events-none z-10" />
                  <img src={project.screenshot} alt={`Screenshot of ${project.title}`} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500 grayscale group-hover:grayscale-0" />
                </div>
              ) : (
                <div className="aspect-video bg-black/50 border border-neutral-800 mb-8 flex items-center justify-center text-center p-6">
                  <span className="text-neutral-400 font-bold text-lg md:text-2xl uppercase tracking-[0.2em] leading-relaxed">
                    NO VISUAL DATA RIGHT NOW<br/><span className="text-amber-500 text-sm md:text-lg">BUT COMING SOON</span>
                  </span>
                </div>
              )}
              
              <a 
                href={project.link} 
                target="_blank" 
                rel="noreferrer"
                className="inline-block border border-amber-500/50 text-amber-500 px-8 py-3 text-sm font-mono uppercase tracking-widest hover:bg-amber-500 hover:text-black transition-colors"
              >
                Access Terminal
              </a>
            </div>
          </div>
        )
      })}
    </section>
  )
}
