import { useState } from 'react'
import type { FormEvent } from 'react'
import { supabase } from '../lib/supabase'
import { Download, BookOpen, GraduationCap, CheckCircle } from 'lucide-react'
import { Modal } from './Modal'

export const LeadMagnets = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [selectedMagnet, setSelectedMagnet] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    
    const formData = new FormData(e.currentTarget)
    const name = formData.get('name') as string
    const email = formData.get('email') as string

    const { error: insertError } = await supabase
      .from('leads_web')
      .insert([
        { 
          full_name: name,
          email: email,
          interests: [selectedMagnet || 'Lead Magnet'],
          lead_magnet_downloaded: selectedMagnet || 'General Magnet',
          source: 'website'
        }
      ])

    setLoading(false)

    if (insertError) {
      console.error('Error insertando lead magnet:', insertError)
      setError('Hubo un error al procesar tu solicitud. Por favor intenta de nuevo.')
    } else {
      setSubmitted(true)
    }
  }

  const resources = [
    {
      title: "Guía de Éxito Escolar",
      desc: "5 estrategias para que el entorno escolar no afecte la salud mental de tu hijo.",
      icon: GraduationCap,
      label: "Para Padres",
      color: "brand-pink"
    },
    {
      title: "Manual de Duelo Migratorio",
      desc: "Herramientas clínicas para reconstruir tu identidad y paz mental en el extranjero.",
      icon: BookOpen,
      label: "Para Adultos",
      color: "brand-aqua"
    }
  ]

  return (
    <section id="resources" className="py-24 px-8 bg-brand-dark text-white rounded-[4rem] mx-4 md:mx-8 mb-24 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-pink/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-aqua/10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16 px-4">
          <span className="text-xs font-black tracking-[0.4em] uppercase opacity-50 mb-4 block">Recursos Gratuitos</span>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-8">
            Descarga nuestras <br /> <span className="text-brand-pink italic">guías expertas</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg font-light leading-relaxed">
            Hemos diseñado este material clínico para brindarte una primera sensación de alivio y claridad.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {resources.map((res, i) => (
            <div key={i} className="group p-10 bg-white/5 border border-white/10 rounded-3xl hover:border-brand-pink/50 transition-all">
              <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-white mb-8 group-hover:bg-brand-pink/20 group-hover:text-brand-pink transition-all">
                <res.icon size={28} />
              </div>
              <div className="flex items-center gap-3 mb-4">
                <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 bg-white/5 text-gray-300 rounded-full`}>
                  {res.label}
                </span>
              </div>
              <h3 className="text-2xl font-bold mb-4 tracking-tight">{res.title}</h3>
              <p className="text-gray-400 font-light mb-8 leading-relaxed text-base">
                {res.desc}
              </p>
              <button 
                onClick={() => {
                  setSelectedMagnet(res.title);
                  setIsModalOpen(true);
                }}
                className="flex items-center gap-3 text-white font-bold group-hover:text-brand-pink transition-colors underline decoration-brand-pink/30"
              >
                Obtener Guía Gratis <Download size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => { setIsModalOpen(false); setSubmitted(false); }}>
        {!submitted ? (
          <div className="text-center pt-8">
            <h3 className="text-4xl font-black mb-4 tracking-tighter text-brand-dark">Desbloquea el <br /> <span className="text-brand-pink italic">Recurso</span></h3>
            <p className="text-gray-500 mb-10 font-light">Introduce tus datos para que te enviemos el material a tu correo y que puedas empezar ya.</p>
            
            <form onSubmit={handleSubmit} className="space-y-6 text-left">
              {error && (
                <div className="p-4 bg-red-50 text-red-500 rounded-2xl text-center text-sm border border-red-100">
                  {error}
                </div>
              )}
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-2">Tu Nombre</label>
                <input name="name" required placeholder="Ej. Maria Lopez" className="w-full p-5 bg-gray-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-brand-pink/50 text-brand-dark" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-2">Tu Email mejor usado</label>
                <input name="email" required type="email" placeholder="maria@correo.com" className="w-full p-5 bg-gray-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-brand-pink/50 text-brand-dark" />
              </div>
              <button 
                type="submit" 
                disabled={loading}
                className={`w-full py-6 bg-brand-dark text-white rounded-2xl font-black text-xl transition-all shadow-xl shadow-brand-pink/20 ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-brand-pink'}`}
              >
                {loading ? 'Procesando...' : 'Enviar mi Guía al Correo'}
              </button>
              <p className="text-[10px] text-center text-gray-400 font-bold uppercase tracking-widest mt-4">Respetamos tu privacidad • Sin spam</p>
            </form>
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-brand-pink/10 rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle size={48} className="text-brand-pink animate-in zoom-in" />
            </div>
            <h3 className="text-4xl font-black tracking-tighter text-brand-dark mb-4">¡Listo! Tu guia ya está <br /> <span className="text-brand-pink italic">en camino</span></h3>
            <p className="text-gray-500 font-light max-w-sm mx-auto mb-8">
              Gracias por confiarme este pequeño primer paso. Por favor, revisa tu correo (incluida la carpeta de SPAM por si acaso) para acceder al material.
            </p>
            <button 
              onClick={() => setIsModalOpen(false)}
              className="text-brand-pink font-black uppercase tracking-widest text-sm hover:underline"
            >
              Cerrar Ventana
            </button>
          </div>
        )}
      </Modal>
    </section>
  )
}
