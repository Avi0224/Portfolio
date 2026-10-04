export function Hero() {
  return (
    <section id="hero" className="min-h-screen flex flex-col justify-center px-6 md:px-24 pointer-events-none">
      <div className="max-w-xl pointer-events-auto">
        <h1 className="text-3xl md:text-4xl font-light text-neutral-100 mb-6 uppercase tracking-[0.3em] leading-tight">
          AI <span className="text-amber-500 font-bold">DEVELOPER</span>
        </h1>
        <p className="text-xs md:text-sm text-neutral-400 font-mono tracking-widest uppercase max-w-lg leading-relaxed border-l border-amber-500/30 pl-4">
          Building and integrating AI into applications to enable automation, data-driven decision-making and enhanced user experiences.
        </p>
      </div>
    </section>
  )
}
