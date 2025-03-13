import { Shield, Target, Heart, Globe, Users } from 'lucide-react';

const About = () => {
  return (
    <div>
      {/* Hero Section */}
      <div className="relative py-20 bg-gray-900">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="/public/Nosotros/Servicios.JPG"
            alt="Mining Background"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Sobre Nosotros</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Brindamos Soluciones de Transporte y Logística
          </p>
        </div>
      </div>

      {/* Historia Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Nuestra Historia</h2>
              <p className="text-gray-600 mb-6">
                GVH nace un 18 de octubre de 1999 desde una visión familiar surgida en los años 90, innovando a través de una alternativa de traslado para los trabajadores mineros, quienes solían estar meses en la mina y se transportaban de una manera muy precaria.
              </p>
              <p className="text-gray-600 mb-6">
                A través de esta mirada hacia el futuro nació el primer transporte de personal minero. A partir de 2018 se inició un cambio trascendental para nosotros, especialmente desde que empezó la construcción de algunos proyectos en la región.
              </p>
              <p className="text-gray-600">
                Desde allí se produjo un efecto importante que nos permitió integrarnos a la cadena de valor minera, ganar más know-how e ir trabajando conjuntamente con las empresas para comprender sus necesidades específicas.
              </p>
            </div>
            <div>
              <img
                src="/public/Nosotros/personal.JPG"
                alt="Mining Transport"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Misión, Visión y Valores */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <Target className="w-12 h-12 text-orange-500 mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Misión</h3>
              <p className="text-gray-600">
                Proporcionar soluciones de logística minera seguras, eficientes y sostenibles en zonas extremas en alta montaña. Reflejamos un compromiso con la seguridad, la eficiencia, la sostenibilidad y la responsabilidad social.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <Globe className="w-12 h-12 text-orange-500 mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Visión</h3>
              <p className="text-gray-600">
                Queremos convertirnos en líderes globales en el sector, al mismo tiempo que nos comprometemos con un enfoque social y corporativo. Buscamos no solo brindar soluciones logísticas de calidad, sino también generar un impacto positivo en las comunidades donde operamos.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <Heart className="w-12 h-12 text-orange-500 mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Valores</h3>
              <p className="text-gray-600">
                Nos comprometemos a contribuir al desarrollo y bienestar de la sociedad en general y de nuestras comunidades locales en particular. Los valores de GVH guían nuestras acciones y decisiones y nos ayudan a construir una empresa comprometida con la sociedad.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative py-20">
        <div className="absolute inset-0">
          <img
            src="public\Nosotros\Servicios.JPG"
            alt="Mining Operations"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gray-900 opacity-90"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Quiénes Somos</h2>
            <p className="text-xl text-gray-300">
              Somos una empresa de logística de confianza desde 1999
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <Globe className="w-16 h-16 text-orange-500 mx-auto mb-6" />
              <h3 className="text-xl font-bold text-white mb-4">Conectando La Puna Con El Mundo</h3>
              <p className="text-gray-300">
                Servicio especializado en el sector de la puna, contamos con las mejores prestaciones para llevar a cabo tu proyecto.
              </p>
            </div>
            <div className="text-center">
              <Shield className="w-16 h-16 text-orange-500 mx-auto mb-6" />
              <h3 className="text-xl font-bold text-white mb-4">Calificaciones Internacionales</h3>
              <p className="text-gray-300">
                Servicio especializado en el sector de la puna, contamos con las mejores prestaciones para llevar a cabo tu proyecto.
              </p>
            </div>
            <div className="text-center">
              <Users className="w-16 h-16 text-orange-500 mx-auto mb-6" />
              <h3 className="text-xl font-bold text-white mb-4">Soluciones Innovadoras</h3>
              <p className="text-gray-300">
                Estamos siempre en la búsqueda de nuevas y mejores soluciones para las necesidades de nuestros clientes.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-8">
            Más de 25 años conectando la minería con el futuro
          </h2>
          <div className="inline-flex space-x-4">
            <a href="/contacto" className="btn-primary">
              Contáctanos
            </a>
            <a href="/servicios" className="btn-secondary">
              Ver Servicios
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;