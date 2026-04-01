import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef } from 'react'
import { ArrowRight, MapPin, Search, LifeBuoy } from 'lucide-react'

export const ResilienceMap = () => {
  const container = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    // Pinning the left side while scrolling through steps
    gsap.to('.pin-side', {
      scrollTrigger: {
        trigger: container.current,
        start: "top 100px",
        end: "bottom bottom",
        pin: '.pin-side',
        pinSpacing: false,
        scrub: true
      }
    })

    // Reveal steps one by one
    gsap.utils.toArray('.map-step').forEach((step: any) => {
      gsap.from(step, {
        opacity: 0,
        x: 50,
        duration: 1,
        scrollTrigger: {
          trigger: step,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      })
    })
  }, { scope: container })

  const steps = [
    {
      id: "01",
      title: "Exploración & Diagnóstico",
      desc: "Identificamos las anclas emocionales y los bloqueos que impiden tu adaptación al cambio.",
      icon: Search
    },
    {
      id: "02",
      title: "Rediseño Terapéutico",
      desc: "Creamos un plan personalizado para reconstruir tu propósito, ya sea en un nuevo país o una nueva etapa.",
      icon: MapPin
    },
    {
      id: "03",
      title: "Consolidación & Vuelo",
      desc: "Cerramos el ciclo de crisis con herramientas de autogestión para un equilibrio sostenible.",
      icon: LifeBuoy
    }
  ]

  return (
    <section ref={container} id="resilience-map" className="py-24 px-8 bg-brand-aqua/5 relative min-h-[150vh]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-20">
        
        {/* Left Side (Pinned) */}
        <div className="pin-side md:w-1/2 flex flex-col justify-center h-fit pt-20">
          <span className="text-brand-aqua font-bold tracking-widest uppercase mb-4">Adultos en Transición</span>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-none mb-8">
            Tu Mapa de <br />
            <span className="text-brand-aqua italic">Resiliencia</span>
          </h2>
          <p className="text-gray-500 text-xl font-light leading-relaxed max-w-md">
            Un proceso de tres fases diseñado para convertir la incertidumbre migratoria y vital en una arquitectura de paz personal.
          </p>
          <div className="mt-12">
            <button className="flex items-center gap-3 text-brand-dark font-bold border-b-2 border-brand-aqua pb-2 hover:gap-5 transition-all">
              Leer sobre el método <ArrowRight size={20} />
            </button>
          </div>
        </div>

        {/* Right Side (Scrolling Steps) */}
        <div className="md:w-1/2 space-y-24 py-20">
          {steps.map((step) => (
            <div key={step.id} className="map-step p-12 bg-white rounded-[2rem] shadow-xl shadow-brand-aqua/10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 text-8xl font-black text-brand-aqua/5 group-hover:text-brand-aqua/10 transition-colors">
                {step.id}
              </div>
              <div className="w-16 h-16 bg-brand-aqua/20 rounded-2xl flex items-center justify-center text-brand-aqua mb-8">
                <step.icon size={32} />
              </div>
              <h3 className="text-3xl font-bold mb-6 tracking-tight">{step.title}</h3>
              <p className="text-gray-600 text-lg leading-relaxed font-light">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
