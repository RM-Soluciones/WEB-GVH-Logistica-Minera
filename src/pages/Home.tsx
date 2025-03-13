import { Link } from 'react-router-dom';
import { Shield, Users, ArrowRight, Building, Clock } from 'lucide-react';

const Home = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative h-screen">
        <div className="absolute inset-0">
        <video 
          className="w-full h-full object-cover" 
          src="/public/presentacion.mp4" 
          autoPlay 
          loop 
          muted 
          playsInline
        ></video>
          <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent opacity-80"></div>
        </div>
        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-3xl">
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
                Expertos en
                <span className="text-orange-500 block">Logística Minera</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl">
                Brindamos soluciones integrales en transporte, rescate y contingencias para optimizar sus operaciones.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/contacto" className="btn-primary">
                  Solicitar Cotización
                </Link>
                <Link to="/nosotros" className="btn-secondary">
                  Conocer Más
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { number: "25+", label: "Años de Experiencia" },
              { number: "100+", label: "Clientes Satisfechos" },
              { number: "50+", label: "Unidades en Flota" },
              { number: "24/7", label: "Atención Permanente" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-4xl font-bold text-orange-500 mb-2">{stat.number}</p>
                <p className="text-white">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Nuestros Servicios</h2>
            <p className="text-xl text-gray-600">
              Soluciones integrales para la industria minera
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Building className="w-12 h-12" />,
                title: "Transporte de Carga",
                description: "Transporte especializado de maquinaria pesada y materiales.",
                image: "/public/Servicios/cargas.png" 
              },
              {
                icon: <Shield className="w-12 h-12" />,
                title: "Rescate y Contingencias",
                description: "Servicio de rescate minero y respuesta ante emergencias.",
                image: "/public/Servicios/Rescate.png" 
              },
              {
                icon: <Building className="w-12 h-12" />,
                title: "Rental de Equipos",
                description: "Alquiler de maquinaria y equipos especializados.",
                image: "/public/Servicios/alquiler.png" 
              }
            ].map((service, index) => (
              <div key={index} className="group relative overflow-hidden rounded-xl">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-96 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-90"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <div className="bg-orange-500 p-3 rounded-full w-fit mb-4">
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                  <p className="text-gray-200">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: <Clock className="w-8 h-8 text-orange-500" />,
                title: "Atención 24/7",
                description: "Disponibilidad permanente para atender sus requerimientos."
              },
              {
                icon: <Users className="w-8 h-8 text-orange-500" />,
                title: "Personal Calificado",
                description: "Equipo especializado con amplia experiencia en el sector."
              },
              {
                icon: <Shield className="w-8 h-8 text-orange-500" />,
                title: "Máxima Seguridad",
                description: "Cumplimiento de los más altos estándares de seguridad."
              }
            ].map((feature, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section with Background Image */}
      <div className="relative py-16">
        {/* Replace with your CTA background image - public/img5.jpg */}
        <div className="absolute inset-0">
          <img
            src="/public/camiones.png"
            alt="Mining Equipment"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-white mb-8 md:mb-0">
              <h2 className="text-3xl font-bold mb-4">
                ¿Necesita servicios logísticos especializados?
              </h2>
              <p className="text-gray-300">
                Contáctenos para una propuesta personalizada
              </p>
            </div>
            <Link
              to="/contacto"
              className="flex items-center space-x-2 bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg transition-colors duration-200"
            >
              <span>Solicitar Información</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;