import React, { useState, useEffect } from 'react';
import { Loader2, FileText, Send, MapPin, Mail, Clock } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface JobVacancy {
  id: string;
  title: string;
  description: string;
  requirements: string;
}

const Careers = () => {
  const [vacancies, setVacancies] = useState<JobVacancy[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedVacancy, setSelectedVacancy] = useState<JobVacancy | null>(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    skills: '',
    resumeUrl: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    fetchVacancies();
  }, []);

  const fetchVacancies = async () => {
    try {
      const { data, error } = await supabase
        .from('job_vacancies')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setVacancies(data || []);
    } catch (error) {
      console.error('Error fetching vacancies:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedVacancy) return;

    setSubmitting(true);
    try {
      const { error } = await supabase
        .from('job_applications')
        .insert([{
          vacancy_id: selectedVacancy.id,
          first_name: formData.firstName,
          last_name: formData.lastName,
          skills: formData.skills,
          resume_url: formData.resumeUrl
        }]);

      if (error) throw error;
      setSubmitSuccess(true);
      setFormData({
        firstName: '',
        lastName: '',
        skills: '',
        resumeUrl: ''
      });
      setSelectedVacancy(null);
    } catch (error) {
      console.error('Error submitting application:', error);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[600px] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
      </div>
    );
  }

  return (
    <div className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Trabaja con Nosotros</h1>
          <p className="text-xl text-gray-600">
            Únete a nuestro equipo y sé parte de una empresa líder en logística minera
          </p>
        </div>

        {submitSuccess ? (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
            <h2 className="text-2xl font-bold text-green-800 mb-2">¡Postulación Enviada!</h2>
            <p className="text-green-700">
              Gracias por tu interés. Revisaremos tu postulación y te contactaremos pronto.
            </p>
            <button
              onClick={() => setSubmitSuccess(false)}
              className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              Postular a otra vacante
            </button>
          </div>
        ) : selectedVacancy ? (
          <div className="bg-white rounded-lg shadow-md p-8">
            <button
              onClick={() => setSelectedVacancy(null)}
              className="text-gray-600 hover:text-gray-800 mb-6"
            >
              ← Volver a las vacantes
            </button>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">{selectedVacancy.title}</h2>
            <div className="prose max-w-none mb-8">
              <h3 className="text-lg font-semibold mb-2">Descripción del Puesto</h3>
              <p className="text-gray-600 mb-4">{selectedVacancy.description}</p>
              
              <h3 className="text-lg font-semibold mb-2">Requisitos</h3>
              <p className="text-gray-600 mb-6">{selectedVacancy.requirements}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Nombre
                  </label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Apellido
                  </label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Habilidades y Experiencia
                </label>
                <textarea
                  value={formData.skills}
                  onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  rows={4}
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  URL del Curriculum (Google Drive, Dropbox, etc. (verificar que el link sea publico))
                </label>
                <input
                  type="url"
                  value={formData.resumeUrl}
                  onChange={(e) => setFormData({ ...formData, resumeUrl: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-orange-500 text-white py-3 px-6 rounded-lg hover:bg-orange-600 transition-colors flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Enviando...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Enviar Postulación</span>
                  </>
                )}
              </button>
            </form>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {vacancies.map((vacancy) => (
                <div key={vacancy.id} className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{vacancy.title}</h3>
                  <p className="text-gray-600 mb-6 line-clamp-3">{vacancy.description}</p>
                  <button
                    onClick={() => setSelectedVacancy(vacancy)}
                    className="w-full bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors flex items-center justify-center space-x-2"
                  >
                    <FileText size={20} />
                    <span>Ver Detalles y Postular</span>
                  </button>
                </div>
              ))}
            </div>

            {/* Location and Contact Section */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Map */}
                <div className="h-[400px] w-full">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d879.5261219173157!2d-65.41612270118925!3d-24.823079661117557!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x941bdd2f0b5410e3%3A0x7c2d006d82d943db!2sGVH%20Log%C3%ADstica%20Minera!5e0!3m2!1sen!2sar!4v1741869039127!5m2!1sen!2sar"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>

                {/* Contact Info */}
                <div className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Información de Contacto</h2>
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <MapPin className="w-6 h-6 text-orange-500 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold text-gray-900">Dirección</h3>
                        <p className="text-gray-600">
                          Av.Tavella 3663<br />
                          Salta, Argentina
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <Mail className="w-6 h-6 text-orange-500 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold text-gray-900">Email</h3>
                        <p className="text-gray-600">rrhh@gvhlogistica.com</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <Clock className="w-6 h-6 text-orange-500 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold text-gray-900">Horario de Atención</h3>
                        <p className="text-gray-600">
                          Lunes a Viernes: 9:00 AM - 6:00 PM<br />
                          Sábado: 9:00 AM - 1:00 PM
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Careers;