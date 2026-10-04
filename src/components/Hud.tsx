import { useEffect, useState } from 'react'

export function Hud() {
  const [time, setTime] = useState(new Date().toISOString())
  const [scroll, setScroll] = useState(0)
  
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toISOString())
    }, 1000)

    const handleScroll = () => {
      setScroll(window.scrollY)
    }
    window.addEventListener('scroll', handleScroll)

    return () => {
      clearInterval(interval)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div className="fixed inset-0 z-0 pointer-events-none flex flex-col justify-between p-4 md:p-6 overflow-hidden">
      {/* Top Bar */}
      <div className="flex justify-between items-start text-xs font-mono text-amber-500/50 uppercase tracking-widest mt-16">
        <div>
          SYS.TERRAIN.GEN // ACTIVE<br/>
          ELEVATION: {(scroll * 0.1).toFixed(2)}M<br/>
          SECTOR: {Math.floor(scroll / 1000) + 1}
        </div>
        <div className="text-right">
          T+{time.split('T')[1].split('.')[0]}<br/>
          {time.split('T')[0]}
        </div>
      </div>
      
      {/* Side Data */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 flex flex-col gap-2 text-[10px] font-mono text-amber-500/40">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="flex gap-2 items-center">
            <div className={`w-4 h-[1px] ${i === 4 ? 'bg-amber-500/80 w-6' : 'bg-amber-500/30'}`} />
            {((scroll * 0.05) + i * 10).toFixed(2)}
          </div>
        ))}
      </div>

      <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-2 text-[10px] font-mono text-amber-500/40 items-end">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="flex gap-2 items-center">
            {((scroll * 0.02) + i * 5).toFixed(2)}
            <div className={`w-4 h-[1px] ${i === 2 ? 'bg-amber-500/80 w-6' : 'bg-amber-500/30'}`} />
          </div>
        ))}
      </div>

      {/* Bottom Bar */}
      <div className="flex justify-between items-end text-[10px] font-mono text-amber-500/50 uppercase tracking-widest mb-4">
        <div>OPTICS: ONLINE</div>
        <div>UPLINK: SECURE</div>
      </div>
      
      {/* Corner Brackets */}
      <div className="absolute top-4 left-4 w-8 h-8 border-t border-l border-amber-500/30" />
      <div className="absolute top-4 right-4 w-8 h-8 border-t border-r border-amber-500/30" />
      <div className="absolute bottom-4 left-4 w-8 h-8 border-b border-l border-amber-500/30" />
      <div className="absolute bottom-4 right-4 w-8 h-8 border-b border-r border-amber-500/30" />
    </div>
  )
}
