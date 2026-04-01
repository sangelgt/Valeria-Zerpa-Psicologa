import { useRef } from 'react'
import { Milestone, GraduationCap, Award } from 'lucide-react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

import valeriaPortrait from '../assets/foto-recortada.jpeg'

export const AboutMe = () => {
  const container = useRef<HTMLElement>(null)

  useGSAP(() => {
    // Framing / Entry animation when scrolling into view
    gsap.fromTo('.about-photo', 
      { scale: 0.8, opacity: 0 },
      {
        scrollTrigger: {
          trigger: container.current,
          start: 'top 80%',
        },
        scale: 1,
        opacity: 1,
        duration: 1.5,
        ease: 'power3.out'
      }
    )

    gsap.fromTo('.about-text > *', 
      { y: 30, opacity: 0 },
      {
        scrollTrigger: {
          trigger: container.current,
          start: 'top 80%',
        },
        y: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.1,
        ease: 'power2.out'
      }
    )
  }, { scope: container })

  const credentials = [
    { icon: GraduationCap, title: "Especialista Clínica", text: "Psicología Clínica con enfoque en infanto-juvenil y adultos." },
    { icon: Milestone, title: "Foco en Migración", text: "Acompañamiento especializado en procesos de duelo y adaptación externa." },
    { icon: Award, title: "Éxito Escolar", text: "Consultoría experta para superar barreras de aprendizaje y conducta." }
  ]

  return (
    <section id="about" ref={container} className="py-32 px-8 bg-brand-white relative">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-20">
        
        {/* Photo/Visual Area */}
        <div className="w-full md:w-1/2 relative about-photo opacity-0">
          <div className="absolute -top-10 -left-10 w-full h-full bg-brand-pink/10 rounded-[4rem] -z-10 rotate-3"></div>
          <div className="aspect-[4/5] bg-gray-200 rounded-[3rem] overflow-hidden shadow-2xl relative">
             <img 
               src={valeriaPortrait} 
               alt="Valeria Zerpa" 
               className="w-full h-full object-cover object-center"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/30 via-transparent to-transparent"></div>
          </div>
        </div>

        {/* Text Area */}
        <div className="w-full md:w-1/2 about-text">
          <span className="text-xs font-black uppercase tracking-[0.4em] text-brand-pink mb-4 block">Sobre la Profesional</span>
          <h2 className="text-5xl md:text-6xl font-black tracking-tighter mb-8 leading-tight">
            Valeria Zerpa <br />
            <span className="text-brand-dark opacity-40 italic">Acompañando procesos</span>
          </h2>
          
          <div className="space-y-6 text-text-dim text-lg leading-relaxed font-light mb-12">
            <p>
              Mi práctica se basa en la convicción de que cada historia merece un espacio de validación profunda. No busco solo "resolver problemas", sino construir puentes hacia tu propio bienestar.
            </p>
            <p>
              Con años de experiencia en el ámbito escolar y clínico, he desarrollado un método que combina la precisión diagnóstica con la calidez del acompañamiento humano, eliminando las barreras burocráticas que suelen dilatar el inicio de la sanación.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {credentials.map((cred, i) => (
              <div key={i} className="group">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-brand-dark shadow-lg group-hover:bg-brand-aqua/20 transition-all mb-4">
                  <cred.icon size={24} />
                </div>
                <h4 className="font-bold text-brand-dark mb-2">{cred.title}</h4>
                <p className="text-xs text-text-subtle leading-normal">{cred.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
