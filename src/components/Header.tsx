export function Header() {
  return (
    <header className="fixed top-0 left-0 w-full p-4 md:p-6 flex justify-between items-center z-50 text-neutral-300 font-mono text-[10px] md:text-xs uppercase tracking-[0.2em]">
      <div className="font-bold text-amber-500">INIT // DESIGN</div>
      <nav className="flex items-center gap-6 md:gap-8">
        <a href="#projects" className="hover:text-amber-400 transition-colors">Projects</a>
        <a href="#contact" className="border border-amber-500/50 text-amber-500 px-4 py-1.5 hover:bg-amber-500/10 transition-colors">Contact</a>
      </nav>
    </header>
  )
}
