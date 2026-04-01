import { useState } from 'react'
import type { FormEvent } from 'react'
import { Send, CheckCircle } from 'lucide-react'
import { supabase } from '../lib/supabase'

export const ContactForm = () => {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    
    const formData = new FormData(e.currentTarget)
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const segment = formData.get('segment') as string
    const message = formData.get('message') as string

    const { error: insertError } = await supabase
      .from('leads_web')
      .insert([
        { 
          full_name: name,
          email: email,
          interests: [segment],
          lead_magnet_downloaded: segment,
          message: message,
          source: 'website'
        }
      ])

    setLoading(false)

    if (insertError) {
      console.error('Error insertando lead:', insertError)
      setError('Hubo un error al enviar el mensaje. Por favor intenta de nuevo.')
      // En un caso real mostramos un toast, acá por simplicidad en línea
    } else {
      setSubmitted(true)
    }
  }

  if (submitted) {
    return (
      <div className="p-20 text-center flex flex-col items-center justify-center min-h-[400px]">
        <CheckCircle size={80} className="text-brand-pink mb-6 animate-bounce" />
        <h3 className="text-3xl font-bold mb-4 tracking-tighter">¡Mensaje Enviado!</h3>
        <p className="text-gray-500 font-light">Valeria se pondrá en contacto contigo muy pronto.</p>
      </div>
    )
  }

  return (
    <section id="contact" className="py-24 px-8 bg-brand-white">
      <div className="max-w-4xl mx-auto p-12 md:p-20 bg-brand-pink/5 rounded-[4rem] border border-brand-pink/10 relative overflow-hidden">
        
        {/* Blob decorativo */}
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-brand-pink/10 rounded-full blur-3xl"></div>

        <div className="relative z-10 text-center mb-12">
          <h2 className="text-5xl font-black tracking-tighter mb-4">Descarga tu <br /> <span className="text-brand-pink italic">Recurso Experto</span></h2>
          <p className="text-gray-500 text-lg font-light max-w-xl mx-auto leading-relaxed">
            Completa tus datos para recibir el material en tu correo y comenzar a transformar tu situación hoy mismo.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl mx-auto relative z-10">
          {error && (
            <div className="p-4 bg-red-50 text-red-500 rounded-2xl text-center border border-red-100">
              {error}
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-sm font-bold tracking-widest uppercase text-gray-400">Tu Nombre</label>
              <input name="name" required type="text" placeholder="Ej. Ana Pérez" className="w-full p-5 bg-white rounded-2xl border-none outline-none focus:ring-2 focus:ring-brand-pink/50 transition-all text-brand-dark" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold tracking-widest uppercase text-gray-400">Email de Recibo</label>
              <input name="email" required type="email" placeholder="ana@ejemplo.com" className="w-full p-5 bg-white rounded-2xl border-none outline-none focus:ring-2 focus:ring-brand-pink/50 transition-all text-brand-dark" />
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-sm font-bold tracking-widest uppercase text-gray-400">¿Cuál guía deseas recibir?</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="flex items-center gap-3 p-5 bg-white rounded-2xl cursor-pointer hover:bg-brand-pink/5 transition-colors border-2 border-transparent has-[:checked]:border-brand-pink">
                <input type="radio" name="segment" value="youth" defaultChecked className="hidden" />
                <span className="font-bold text-brand-dark">Guía de Éxito Escolar</span>
              </label>
              <label className="flex items-center gap-3 p-5 bg-white rounded-2xl cursor-pointer hover:bg-brand-aqua/5 transition-colors border-2 border-transparent has-[:checked]:border-brand-aqua">
                <input type="radio" name="segment" value="adult" className="hidden" />
                <span className="font-bold text-brand-dark">Manual de Resiliencia</span>
              </label>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold tracking-widest uppercase text-gray-400">Tu Mensaje</label>
            <textarea name="message" rows={4} placeholder="Cuéntale un poco sobre tu situación..." className="w-full p-5 bg-white rounded-2xl border-none outline-none focus:ring-2 focus:ring-brand-pink/50 transition-all text-brand-dark resize-none"></textarea>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className={`w-full py-6 bg-brand-dark text-white rounded-3xl font-black text-xl flex items-center justify-center gap-3 transition-all transform hover:-translate-y-1 active:scale-95 shadow-xl shadow-brand-pink/20 ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-brand-pink'}`}
          >
            {loading ? 'Enviando...' : 'Enviar Mensaje'} {<Send size={24} />}
          </button>
        </form>

      </div>
    </section>
  )
}
