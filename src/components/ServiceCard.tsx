import type { LucideIcon } from 'lucide-react'

interface ServiceCardProps {
  title: string
  description: string
  Icon: LucideIcon
  type: 'youth' | 'adult'
}

export const ServiceCard = ({ title, description, Icon, type }: ServiceCardProps) => {
  const accentClass = type === 'youth' 
    ? 'bg-brand-pink/10 text-brand-pink border-brand-pink/20' 
    : 'bg-brand-aqua/10 text-brand-aqua border-brand-aqua/20'

  return (
    <div className={`service-card p-10 rounded-3xl border ${accentClass} hover:shadow-2xl transition-all duration-500 group cursor-default`}>
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 ${type === 'youth' ? 'bg-brand-pink text-white' : 'bg-brand-aqua text-brand-dark'}`}>
        <Icon size={28} />
      </div>
      <h3 className="text-2xl font-bold mb-4 tracking-tight group-hover:translate-x-1 transition-transform">{title}</h3>
      <p className="text-gray-500 leading-relaxed font-light">
        {description}
      </p>
    </div>
  )
}
