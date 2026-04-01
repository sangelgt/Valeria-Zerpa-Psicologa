import { useRef } from 'react'
import { ServiceCard } from './ServiceCard'
import { GraduationCap, Brain, Users, Compass, ShieldCheck, HeartPulse } from 'lucide-react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

export const ServiceGrid = () => {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    let mm = gsap.matchMedia()

    mm.add("(min-width: 1024px)", () => {
      // Escritorio: Animación matemática en Scrubbing por columnas
      const cards = gsap.utils.toArray('.service-card') as HTMLElement[]
      
      if (cards.length >= 6) {
        // Separación explícita por columnas del grid CSS
        const col1 = [cards[0], cards[3]]
        const col2 = [cards[1], cards[4]]
        const col3 = [cards[2], cards[5]]
        
        // Estado inicial (Ocultas a la derecha)
        gsap.set(cards, { x: '80vw', opacity: 0 }) 
        
        let tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%", // Inicia a mitad del encuadre
            end: "bottom 80%", // Termina de scrollear cuando la seccion se asienta
            scrub: 1, // Flujo atado al ratón y reversible
          }
        })
        
        // Lógica de porcentajes. Total = 100 puntos
        tl.to(col1, { x: 0, opacity: 1, duration: 20, ease: "power1.out" }, 10) // 10% - 30%
          .to(col2, { x: 0, opacity: 1, duration: 20, ease: "power1.out" }, 30) // 30% - 50%
          .to(col3, { x: 0, opacity: 1, duration: 20, ease: "power1.out" }, 50) // 50% - 70%
          .to({}, { duration: 30 }) // El tramo restante 70% - 100% actúa de filler de lectura
      }
    })

    mm.add("(max-width: 1023px)", () => {
      // Dispositivos Móviles: Las columnas se colapsan a 1 verticalmente
      const cards = gsap.utils.toArray('.service-card') as HTMLElement[]
      gsap.fromTo(cards, 
        { y: 50, opacity: 0 },
        { 
          y: 0, opacity: 1, 
          duration: 1, 
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%"
          }
        }
      )
    })

  }, { scope: sectionRef })
  const services = [
    // Youth Pillar
    {
      title: "Enlace Escolar",
      description: "Puente estratégico entre la familia y el colegio para optimizar el rendimiento y bienestar del estudiante.",
      Icon: GraduationCap,
      type: 'youth' as const
    },
    {
      title: "Clínica Juvenil",
      description: "Psicoterapia enfocada en el desarrollo emocional y la construcción de autoestima en la etapa escolar.",
      Icon: Brain,
      type: 'youth' as const
    },
    {
      title: "Orientación Vocacional",
      description: "Descubrimiento de talentos y diseño de futuro para adolescentes en transición universitaria.",
      Icon: Users,
      type: 'youth' as const
    },
    // Adult Pillar
    {
      title: "Duelo Migratorio",
      description: "Acompañamiento clínico para procesar el desarraigo y reconstruir la identidad en nuevos entornos.",
      Icon: Compass,
      type: 'adult' as const
    },
    {
      title: "Rediseño de Vida",
      description: "Estrategias de replanteamiento profesional y personal para adultos en momentos de crisis o cambio.",
      Icon: ShieldCheck,
      type: 'adult' as const
    },
    {
      title: "Bienestar Emocional",
      description: "Terapia para la gestión del estrés, ansiedad y fortalecimiento de la resiliencia diaria.",
      Icon: HeartPulse,
      type: 'adult' as const
    }
  ]

  return (
    <section id="services" ref={sectionRef} className="py-24 px-8 bg-brand-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6">
            Diferentes formas de <span className="text-brand-pink">cuidarte</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg font-light">
            Un espacio seguro para transitar los retos de la crianza y el peso de la adaptación migratoria.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 service-grid-container">
          {services.map((service, index) => (
            <ServiceCard 
              key={index}
              {...service}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
