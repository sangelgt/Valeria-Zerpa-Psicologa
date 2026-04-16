import './index.css'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { TextPlugin } from 'gsap/TextPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useRef, useState } from 'react'

import { ServiceGrid } from './components/ServiceGrid'
import { ResilienceMap } from './components/ResilienceMap'
import { LeadMagnets } from './components/LeadMagnets'
import { AboutMe } from './components/AboutMe'
import { Modal } from './components/Modal'
import { Analytics } from '@vercel/analytics/react'

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, TextPlugin)

function App() {
  const container = useRef<HTMLDivElement>(null)
  const cursorFollower = useRef<HTMLDivElement>(null)
  const [legalModal, setLegalModal] = useState<'none'|'terms'|'privacy'>('none')
  
  const waLink = "https://wa.me/584148089418?text=%C2%A1Hola%2C%20Valeria%21%20Un%20gusto%20saludarte.%20%F0%9F%91%8B%20Vengo%20de%20tu%20p%C3%A1gina%20web%20y%20me%20gustar%C3%ADa%20recibir%20m%C3%A1s%20informaci%C3%B3n%20sobre%20tus%20consultas%20y%20servicios%20terap%C3%A9uticos.%20%E2%9C%A8"

  useGSAP(() => {
    // 1. Cursor Follow Animation (Interactive Background)
    const handleMouseMove = (e: MouseEvent) => {
      if (cursorFollower.current) {
        gsap.to(cursorFollower.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 2,
          ease: 'power2.out'
        })
      }
    }
    window.addEventListener('mousemove', handleMouseMove)

    // 2. Initial entrance for Hero
    gsap.from('.hero-content', {
      y: 30,
      opacity: 0,
      duration: 2.5,
      ease: 'power2.out',
      delay: 0.5
    })

    // 3. Typing Animation (Write and Erase Cleanly)
    const words = [
      { text: "Escucha", color: "text-brand-pink" },
      { text: "Acompañamiento", color: "text-brand-aqua" },
      { text: "Bienestar", color: "text-brand-green" }
    ]
    let tl = gsap.timeline({ repeat: -1 })
    
    words.forEach(word => {
      // Clear out text first and set color
      tl.set('.typing-text', { text: "", className: `typing-text ${word.color} inline-block min-w-[300px]` })
        // Type the new word
        .to('.typing-text', { duration: 1, text: word.text, ease: "none" })
        // Wait and hold
        .to({}, { duration: 1.5 })
        // Erase the word
        .to('.typing-text', { duration: 0.6, text: "", ease: "none" })
    })

    // 4. Navbar Entrance
    gsap.from('nav', {
      y: -100,
      opacity: 0,
      duration: 1.5,
      ease: 'power3.out'
    })



    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, { scope: container })

  return (
    <div ref={container} className="min-h-screen bg-brand-white font-sans text-brand-dark selection:bg-brand-pink/30 selection:text-white overflow-x-hidden">
      
      {/* Background Interactive Element */}
      <div 
        ref={cursorFollower}
        className="fixed top-0 left-0 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 bg-brand-pink/30 rounded-full blur-[100px] pointer-events-none z-0 opacity-80 mix-blend-multiply"
      ></div>

      {/* Navbar Section */}
      <nav className="fixed top-0 left-0 w-full z-50 px-8 py-4 flex justify-between items-center glass m-4 rounded-full w-[96%] md:w-[98%] mx-auto">
        <div className="text-xl font-bold tracking-tighter flex items-center gap-2 relative z-10">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-brand-pink to-brand-aqua"></div>
          Valeria Zerpa
        </div>
        
        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-8 text-[11px] font-black uppercase tracking-[0.2em] text-brand-dark/60 z-10 w-max">
          <a href="#about" className="hover:text-brand-pink hover:opacity-100 transition-all opacity-80">Sobre Mí</a>
          <a href="#services" className="hover:text-brand-aqua hover:opacity-100 transition-all opacity-80">Cuidado</a>
          <a href="#resilience-map" className="hover:text-brand-pink hover:opacity-100 transition-all opacity-80">El Proceso</a>
          <a href="#resources" className="hover:text-brand-aqua hover:opacity-100 transition-all opacity-80">Recursos</a>
        </div>

        <a href={waLink} target="_blank" className="hidden md:inline-flex px-8 py-3 bg-brand-dark text-white rounded-full font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-brand-pink transition-all shadow-xl shadow-brand-pink/10 active:scale-95 relative z-10">
          WhatsApp 1:1
        </a>
      </nav>

      {/* Main Content */}
      <main className="relative z-10">
        {/* HERO SECTION */}
        <section id="hero" className="relative min-h-[90vh] flex items-center justify-center pt-24 overflow-hidden">
          <div className="hero-content text-center max-w-5xl px-6 relative z-10">
            <h1 className="text-6xl md:text-[7.5rem] font-black leading-[0.9] tracking-tighter mb-12">
              Tu historia <br />
              merece espacio y <br />
              <span className="typing-text inline-block min-w-[200px]">Escucha</span>
            </h1>
            <p className="mt-12 text-xl md:text-2xl text-text-dim font-light max-w-3xl mx-auto leading-relaxed">
              Acompañamiento especializado para que el peso de las decisiones escolares o el proceso migratorio <span className="text-brand-dark font-medium">no lo lleves a solas.</span>
            </p>
            
            <div className="mt-16 flex flex-col sm:flex-row gap-6 justify-center items-center">
              <div className="p-[2px] rounded-2xl bg-gradient-to-r from-brand-pink to-brand-aqua group shadow-2xl shadow-brand-pink/20 hover:shadow-brand-pink/40 transition-all">
                <a href={waLink} target="_blank" className="px-12 py-6 bg-white text-brand-dark font-black text-xl rounded-[calc(1rem-2px)] hover:bg-transparent hover:text-white transition-all inline-block">
                  Hablemos de tu proceso
                </a>
              </div>
              <a href="#resources" className="px-12 py-6 border-2 border-brand-dark/10 font-black text-xl rounded-2xl hover:border-brand-aqua hover:bg-brand-aqua/5 transition-all text-brand-dark opacity-60 hover:opacity-100">
                Recursos para cuidarte
              </a>
            </div>
          </div>
        </section>

        {/* ABOUT SECTION (Authority) */}
        <AboutMe />

        {/* SERVICES SECTION (Care) */}
        <ServiceGrid />

        {/* RESILIENCE MAP SECTION (Process) */}
        <ResilienceMap />

        {/* LEAD MAGNETS SECTION */}
        <LeadMagnets />

        {/* FINAL CTA SECTION (UNIVERSAL WHATSAPP) */}
        <section className="py-24 px-8 bg-brand-white relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[150%] bg-[radial-gradient(circle_at_center,_var(--color-brand-pink-opaque)_10%,_transparent_60%)] pointer-events-none opacity-20"></div>
          
          <div className="max-w-7xl mx-auto text-center relative z-10">
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter mb-12 uppercase leading-[0.85]">
              Tu camino <br /> <span className="text-brand-pink">empieza aquí</span>
            </h2>
            <div className="max-w-lg mx-auto mb-16 px-4">
              <p className="text-text-dim font-light text-xl leading-relaxed">
                Toma la decisión de cuidarte hoy. Pulsa el botón para iniciar una conversación directa conmigo sin compromisos ni formularios.
              </p>
            </div>
            
            <a 
              href={waLink} 
              target="_blank"
              className="inline-flex items-center gap-6 px-16 py-8 bg-brand-dark text-white rounded-full font-black text-2xl hover:bg-brand-pink transition-all shadow-2xl shadow-brand-pink/20 group active:scale-95"
            >
              Iniciar Chat por WhatsApp
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center transition-transform group-hover:translate-x-2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>
              </div>
            </a>
            
            <div className="mt-12 flex items-center justify-center gap-4 text-xs font-black uppercase tracking-[0.3em] opacity-40">
              <span className="w-8 h-[2px] bg-brand-dark"></span>
              Atención Personalizada 1:1
              <span className="w-8 h-[2px] bg-brand-dark"></span>
            </div>
          </div>
        </section>
      </main>

      {/* Footer Section */}
      <footer className="py-20 px-8 bg-brand-dark text-white rounded-t-[5rem] relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-pink/5 rounded-full blur-3xl"></div>
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="text-3xl font-black tracking-tighter flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-brand-pink to-brand-aqua"></div>
              Valeria Zerpa.
            </div>
            <div className="flex gap-6 mt-4 md:mt-0 text-[10px] uppercase font-bold text-white/40 tracking-widest">
              <button onClick={() => setLegalModal('terms')} className="hover:text-white transition-colors">Términos de Servicio</button>
              <button onClick={() => setLegalModal('privacy')} className="hover:text-white transition-colors">Privacidad de Datos</button>
            </div>
          </div>
          <div className="flex gap-10 text-gray-500 font-bold uppercase tracking-widest text-[10px]">
            <a href="#" className="hover:text-brand-pink transition-colors">Instagram</a>
            <a href="#" className="hover:text-brand-aqua transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-brand-pink transition-colors">WhatsApp</a>
          </div>
          <div className="text-right text-[10px] font-bold text-white/20 uppercase tracking-[0.4em]">
            © 2026 • DISEÑO POR ANTIGRAVITY
          </div>
        </div>
      </footer>

      {/* MODAL PARA TÉRMINOS LEGALES */}
      <Modal isOpen={legalModal !== 'none'} onClose={() => setLegalModal('none')}>
        <div className="max-h-[70vh] overflow-y-auto px-2 pb-6 custom-scrollbar text-left text-brand-dark">
          <h2 className="text-3xl font-black tracking-tighter mb-8">
            {legalModal === 'terms' ? 'Términos y Condiciones' : 'Política de Privacidad y Uso de Datos'}
          </h2>
          
          <div className="space-y-6 text-gray-600 font-light leading-relaxed">
            {legalModal === 'terms' ? (
              <>
                <p><strong>1. Naturaleza de los Servicios:</strong> Valeria Zerpa Torres ofrece servicios de consultoría psicológica y vinculación escolar. Los resultados están sujetos a procesos individuales de adaptación.</p>
                <p><strong>2. Agenda y Citas:</strong> Las cancelaciones deben notificarse con 24 horas de antelación para reprogramaciones sin coste adicional. Solo en casos de fuerza mayor podrán gestionarse excepciones comunicándose directamente a los medios de contacto correspondientes.</p>
                <p><strong>3. Responsabilidad:</strong> La plataforma web y sus recursos (Lead Magnets) son guías orientativas y bajo ningún concepto reemplazan o pueden utilizarse como diagnóstico médico oficial formal.</p>
                <p><strong>4. Modificaciones:</strong> Nos reservamos el derecho de actualizar, modificar o revocar estos términos de servicio sin previo aviso, entrando en total vigencia de su publicación inmediata en la web oficial.</p>
              </>
            ) : (
              <>
                <p><strong>1. Recolección de Datos:</strong> Al rellenar nuestros formularios de descarga de recursos, obtenemos su nombre e email exclusivamente para remitirle la guía solicitada y material asociado a la naturaleza de su solicitud.</p>
                <p><strong>2. Confidencialidad:</strong> Al estar enmarcados bajo el trato de psicología clínica, los temas abordados en las sesiones de acompañamiento mantienen el más estricto rigor de la privacidad profesional entre terapeuta y paciente.</p>
                <p><strong>3. Uso de la Información:</strong> Los datos digitales facilitados a través de esta plataforma no serán vendidos ni facilitados a ningún proveedor o tercero ajeno a los procesos de trabajo de Valeria Zerpa Torres bajo ningún acuerdo ni circunstancia.</p>
                <p><strong>4. Tus Derechos Reales:</strong> En cualquier etapa podrás pedir que tu correo o información de expediente sea suprimida mediante un simple mensaje por los mismos canales de contacto a los que se dirige la atención.</p>
              </>
            )}
          </div>
        </div>
      </Modal>

      <Analytics />
    </div>
  )
}

export default App
