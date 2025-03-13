import React from 'react';
import { X } from 'lucide-react';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  type: 'terms' | 'privacy';
}

const LegalModal: React.FC<LegalModalProps> = ({ isOpen, onClose, title, type }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <article className="prose prose-slate max-w-none">
            {type === 'terms' ? (
              <>
                <h3 className="text-xl font-bold text-gray-900">1. Términos de Uso</h3>
                <p className="text-gray-600">
                  Al acceder y utilizar este sitio web, usted acepta cumplir y estar sujeto a estos términos y condiciones de uso.
                  Todo el contenido de este sitio web es propiedad de GVH Logística Minera y está protegido por las leyes de derechos de autor.
                </p>

                <h3 className="text-xl font-bold text-gray-900">2. Propiedad Intelectual</h3>
                <p className="text-gray-600">
                  Todo el contenido presente en este sitio web, incluyendo pero no limitado a textos, gráficos, logotipos, 
                  imágenes, clips de audio, descargas digitales y compilaciones de datos, es propiedad exclusiva de 
                  GVH Logística Minera y está protegido por las leyes nacionales e internacionales de propiedad intelectual.
                </p>

                <h3 className="text-xl font-bold text-gray-900">3. Uso Prohibido</h3>
                <p className="text-gray-600">
                  Queda estrictamente prohibido:
                </p>
                <ul className="list-disc pl-6 text-gray-600">
                  <li>Copiar, modificar, distribuir o utilizar comercialmente cualquier contenido de este sitio web sin autorización expresa.</li>
                  <li>Utilizar técnicas de ingeniería inversa o intentar obtener el código fuente del sitio web.</li>
                  <li>Utilizar el contenido del sitio web para crear servicios o contenido competitivo.</li>
                  <li>Realizar cualquier acción que pueda dañar, deshabilitar o sobrecargar la infraestructura del sitio.</li>
                </ul>

                <h3 className="text-xl font-bold text-gray-900">4. Limitación de Responsabilidad</h3>
                <p className="text-gray-600">
                  GVH Logística Minera no será responsable por daños directos, indirectos, incidentales o consecuentes 
                  que resulten del uso o la imposibilidad de usar este sitio web.
                </p>

                <h3 className="text-xl font-bold text-gray-900">5. Modificaciones</h3>
                <p className="text-gray-600">
                  Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios entrarán en vigor 
                  inmediatamente después de su publicación en el sitio web.
                </p>
              </>
            ) : (
              <>
                <h3 className="text-xl font-bold text-gray-900">1. Recopilación de Información</h3>
                <p className="text-gray-600">
                  GVH Logística Minera recopila información personal cuando usted:
                </p>
                <ul className="list-disc pl-6 text-gray-600">
                  <li>Se registra en nuestro sitio web</li>
                  <li>Envía un formulario de contacto</li>
                  <li>Postula a una vacante de trabajo</li>
                  <li>Solicita información sobre nuestros servicios</li>
                </ul>

                <h3 className="text-xl font-bold text-gray-900">2. Uso de la Información</h3>
                <p className="text-gray-600">
                  La información recopilada se utiliza para:
                </p>
                <ul className="list-disc pl-6 text-gray-600">
                  <li>Procesar sus solicitudes y consultas</li>
                  <li>Mejorar nuestros servicios</li>
                  <li>Enviar comunicaciones relevantes sobre nuestros servicios</li>
                  <li>Cumplir con obligaciones legales</li>
                </ul>

                <h3 className="text-xl font-bold text-gray-900">3. Protección de Datos</h3>
                <p className="text-gray-600">
                  Implementamos medidas de seguridad técnicas y organizativas apropiadas para proteger su información personal 
                  contra el acceso no autorizado, la alteración, la divulgación o la destrucción.
                </p>

                <h3 className="text-xl font-bold text-gray-900">4. Cookies y Tecnologías de Seguimiento</h3>
                <p className="text-gray-600">
                  Utilizamos cookies y tecnologías similares para mejorar su experiencia de navegación y analizar el uso del sitio web.
                  Puede configurar su navegador para rechazar todas las cookies o para recibir una notificación cuando se envíe una cookie.
                </p>

                <h3 className="text-xl font-bold text-gray-900">5. Derechos del Usuario</h3>
                <p className="text-gray-600">
                  Usted tiene derecho a:
                </p>
                <ul className="list-disc pl-6 text-gray-600">
                  <li>Acceder a su información personal</li>
                  <li>Rectificar datos inexactos</li>
                  <li>Solicitar la eliminación de sus datos</li>
                  <li>Oponerse al procesamiento de sus datos</li>
                  <li>Presentar una reclamación ante la autoridad de protección de datos</li>
                </ul>

                <h3 className="text-xl font-bold text-gray-900">6. Contacto</h3>
                <p className="text-gray-600">
                  Para cualquier consulta sobre nuestra política de privacidad, puede contactarnos a través de:
                  privacy@gvhlogistica.com
                </p>
              </>
            )}
          </article>
        </div>
        
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <button
            onClick={onClose}
            className="w-full bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default LegalModal;