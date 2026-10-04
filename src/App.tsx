import { useRef } from 'react'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { Projects } from './components/Projects'
import { Contact } from './components/Contact'
import { Scene } from './canvas/Scene'
import { Hud } from './components/Hud'
import { useSmoothScroll } from './hooks/useSmoothScroll'

function App() {
  useSmoothScroll()
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div ref={containerRef} className="relative w-full">
      <Scene eventSource={containerRef} />
      <Hud />
      <Header />
      <main className="relative z-10">
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>
    </div>
  )
}

export default App
