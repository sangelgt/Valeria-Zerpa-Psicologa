import { X } from 'lucide-react'
import type { ReactNode } from 'react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
}

export const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-brand-dark/40 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      
      <div className="bg-white w-full max-w-2xl rounded-[3rem] p-10 relative z-10 shadow-2xl animate-in zoom-in-95 duration-300 overflow-hidden">
        <button 
          onClick={onClose}
          className="absolute top-8 right-8 text-gray-400 hover:text-brand-pink transition-colors z-20"
        >
          <X size={28} />
        </button>
        {children}
      </div>
    </div>
  )
}
