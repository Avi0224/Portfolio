import { useState } from 'react'

export function Contact() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus("submitting")

    const formData = new FormData(e.currentTarget)
    
    // Add your Web3Forms access key to an .env file like: VITE_WEB3FORMS_ACCESS_KEY=your-key-here
    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || "YOUR_ACCESS_KEY_HERE"
    formData.append("access_key", accessKey)
    
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      })
      const data = await res.json()
      
      if (data.success) {
        setStatus("success")
        ;(e.target as HTMLFormElement).reset()
      } else {
        setStatus("error")
      }
    } catch (err) {
      setStatus("error")
    }
  }

  return (
    <section id="contact" className="min-h-screen flex items-center justify-center px-6 pointer-events-none relative z-10 pt-20">
      <div className="max-w-md w-full bg-black/40 backdrop-blur-md border border-neutral-800 p-6 md:p-8 pointer-events-auto">
        <h2 className="text-xl font-bold mb-6 uppercase tracking-[0.2em] border-l-4 border-amber-500 pl-3">
          Initiate Contact
        </h2>
        
        {status === "success" ? (
          <div className="border border-green-500/30 bg-green-500/10 text-green-400 p-6 font-mono text-sm uppercase tracking-wider text-center">
            Transmission Successful // Awaiting Response.
          </div>
        ) : (
          <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
            <input type="hidden" name="subject" value="New mission request // Portfolio" />
            <input type="hidden" name="from_name" value="Portfolio Uplink" />
            <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />

            <div className="relative group">
              <input 
                type="text" 
                id="name" 
                name="name" 
                placeholder="NAME"
                required 
                className="w-full bg-transparent border-b border-neutral-700 text-neutral-200 font-mono text-sm py-2 focus:outline-none focus:border-amber-500 transition-colors placeholder:text-neutral-600" 
                disabled={status === "submitting"} 
              />
            </div>
            <div className="relative group">
              <input 
                type="email" 
                id="email" 
                name="email" 
                placeholder="EMAIL FREQUENCY"
                required 
                className="w-full bg-transparent border-b border-neutral-700 text-neutral-200 font-mono text-sm py-2 focus:outline-none focus:border-amber-500 transition-colors placeholder:text-neutral-600" 
                disabled={status === "submitting"} 
              />
            </div>
            <div className="relative group">
              <textarea 
                id="message" 
                name="message" 
                rows={4} 
                placeholder="TRANSMISSION DATA..."
                required 
                className="w-full bg-transparent border-b border-neutral-700 text-neutral-200 font-mono text-sm py-2 focus:outline-none focus:border-amber-500 transition-colors placeholder:text-neutral-600 resize-none" 
                disabled={status === "submitting"}
              ></textarea>
            </div>
            
            {status === "error" && (
              <div className="text-red-500 font-mono text-xs uppercase tracking-wider mt-2 border-l-2 border-red-500 pl-2">
                Transmission Failed. Signal lost. Please retry.
              </div>
            )}

            <button 
              type="submit" 
              disabled={status === "submitting"} 
              className="mt-4 border border-amber-500/50 text-amber-500 uppercase tracking-[0.2em] font-mono text-xs px-8 py-4 hover:bg-amber-500 hover:text-black transition-all duration-300 disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-amber-500 w-full md:w-auto self-start"
            >
              {status === "submitting" ? "Encrypting..." : "Transmit Signal"}
            </button>
          </form>
        )}

        <div className="mt-12 pt-8 border-t border-neutral-800 flex gap-4 md:gap-6 font-mono text-[10px] md:text-xs uppercase tracking-widest text-neutral-500 flex-wrap">
          <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" className="hover:text-amber-500 transition-colors">LinkedIn</a>
          <a href="https://github.com/Avi0224" target="_blank" rel="noreferrer" className="hover:text-amber-500 transition-colors">GitHub</a>
          <a href="https://www.instagram.com/avi_02_24_" target="_blank" rel="noreferrer" className="hover:text-amber-500 transition-colors">Instagram</a>
          <a href="mailto:avibhav21@gmail.com" className="hover:text-amber-500 transition-colors">Direct Comm</a>
        </div>
      </div>
    </section>
  )
}
