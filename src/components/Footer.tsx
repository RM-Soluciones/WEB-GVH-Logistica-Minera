import React, { useState } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import LegalModal from './LegalModal';

const Footer = () => {
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center space-x-2 mb-6">
              {/* Replace with your logo - public/logo.png */}
              <img 
                src="/logo.png" 
                alt="GVH Logística Minera" 
                className="h-12 w-auto"
              />
            </div>
            <p className="text-gray-400">
              Soluciones integrales para la industria minera: transporte, rescate, contingencias y rental de equipos.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-6 text-orange-500">Servicios</h3>
            <ul className="space-y-3 text-gray-400">
              <li>Transporte de Carga</li>
              <li>Rescate y Contingencias</li>
              <li>Transporte de Personal</li>
              <li>Rental de Equipos</li>
              <li>Servicios Especializados</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-6 text-orange-500">Contacto</h3>
            <div className="space-y-4">
              <p className="flex items-center space-x-3 text-gray-400">
                <Phone size={18} />
                <span>+51 123 456 789</span>
              </p>
              <p className="flex items-center space-x-3 text-gray-400">
                <Mail size={18} />
                <span>contacto@gvhlogistica.com</span>
              </p>
              <p className="flex items-center space-x-3 text-gray-400">
                <MapPin size={18} />
                <span>Lima, Perú</span>
              </p>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-6 text-orange-500">Horario de Atención</h3>
            <div className="text-gray-400">
              <p className="mb-2">Lunes a Viernes</p>
              <p className="font-semibold mb-4">8:00 AM - 6:00 PM</p>
              <p className="mb-2">Sábado</p>
              <p className="font-semibold">9:00 AM - 1:00 PM</p>
              <p className="mt-4 font-semibold text-orange-500">
                Servicio de Emergencias 24/7
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} GVH Logística Minera. Todos los derechos reservados.
            </p>
            <div className="flex space-x-6">
              <button
                onClick={() => setIsTermsOpen(true)}
                className="text-gray-400 hover:text-orange-500 transition-colors"
              >
                Términos y Condiciones
              </button>
              <button
                onClick={() => setIsPrivacyOpen(true)}
                className="text-gray-400 hover:text-orange-500 transition-colors"
              >
                Política de Privacidad
              </button>
            </div>
          </div>
        </div>
      </div>

      <LegalModal
        isOpen={isTermsOpen}
        onClose={() => setIsTermsOpen(false)}
        title="Términos y Condiciones"
        type="terms"
      />

      <LegalModal
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
        title="Política de Privacidad"
        type="privacy"
      />
    </footer>
  );
};

export default Footer;