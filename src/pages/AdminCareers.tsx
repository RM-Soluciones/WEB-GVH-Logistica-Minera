import React, { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, Loader2, Users, Archive, Eye, Filter } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface JobVacancy {
  id: string;
  title: string;
  description: string;
  requirements: string;
  is_active: boolean;
}

interface JobApplication {
  id: string;
  vacancy_id: string;
  first_name: string;
  last_name: string;
  skills: string;
  resume_url: string;
  created_at: string;
  status: string;
  archived: boolean;
}

const AdminCareers = () => {
  const [vacancies, setVacancies] = useState<JobVacancy[]>([]);
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [currentVacancy, setCurrentVacancy] = useState<JobVacancy | null>(null);
  const [currentApplication, setCurrentApplication] = useState<JobApplication | null>(null);
  const [showApplications, setShowApplications] = useState(false);
  const [showArchived, setShowArchived] = useState(false);
  const [selectedVacancyFilter, setSelectedVacancyFilter] = useState<string>('all');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    requirements: '',
    is_active: true
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [vacanciesResponse, applicationsResponse] = await Promise.all([
        supabase
          .from('job_vacancies')
          .select('*')
          .order('created_at', { ascending: false }),
        supabase
          .from('job_applications')
          .select(`
            *,
            job_vacancies (
              id,
              title
            )
          `)
          .order('created_at', { ascending: false })
      ]);

      if (vacanciesResponse.error) throw vacanciesResponse.error;
      if (applicationsResponse.error) throw applicationsResponse.error;

      setVacancies(vacanciesResponse.data || []);
      setApplications(applicationsResponse.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (currentVacancy) {
        const { error } = await supabase
          .from('job_vacancies')
          .update(formData)
          .eq('id', currentVacancy.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('job_vacancies')
          .insert([formData]);

        if (error) throw error;
      }

      setIsModalOpen(false);
      setCurrentVacancy(null);
      setFormData({
        title: '',
        description: '',
        requirements: '',
        is_active: true
      });
      fetchData();
    } catch (error) {
      console.error('Error saving vacancy:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (vacancy: JobVacancy) => {
    setCurrentVacancy(vacancy);
    setFormData({
      title: vacancy.title,
      description: vacancy.description,
      requirements: vacancy.requirements,
      is_active: vacancy.is_active
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar esta vacante?')) return;

    try {
      const { error } = await supabase
        .from('job_vacancies')
        .delete()
        .eq('id', id);

      if (error) throw error;
      fetchData();
    } catch (error) {
      console.error('Error deleting vacancy:', error);
    }
  };

  const handleDeleteApplication = async (id: string) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar esta postulación? Esta acción no se puede deshacer.')) return;

    try {
      const { error } = await supabase
        .from('job_applications')
        .delete()
        .eq('id', id);

      if (error) throw error;
      fetchData();
    } catch (error) {
      console.error('Error deleting application:', error);
    }
  };

  const handleArchiveApplication = async (id: string, archived: boolean) => {
    try {
      const { error } = await supabase
        .from('job_applications')
        .update({ archived })
        .eq('id', id);

      if (error) throw error;
      fetchData();
    } catch (error) {
      console.error('Error archiving application:', error);
    }
  };

  const handleStatusChange = async (applicationId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('job_applications')
        .update({ status: newStatus })
        .eq('id', applicationId);

      if (error) throw error;
      fetchData();
    } catch (error) {
      console.error('Error updating application status:', error);
    }
  };

  const handleViewDetails = (application: JobApplication) => {
    setCurrentApplication(application);
    setIsDetailsModalOpen(true);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
      </div>
    );
  }

  const filteredApplications = applications.filter(app => {
    const isArchived = app.archived ?? false;
    const matchesVacancy = selectedVacancyFilter === 'all' || app.vacancy_id === selectedVacancyFilter;
    return isArchived === showArchived && matchesVacancy;
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          {showApplications ? 'Postulaciones Recibidas' : 'Gestión de Vacantes'}
        </h2>
        <div className="flex space-x-4">
          {showApplications && (
            <>
              <div className="flex items-center space-x-2">
                <Filter size={20} className="text-gray-500" />
                <select
                  value={selectedVacancyFilter}
                  onChange={(e) => setSelectedVacancyFilter(e.target.value)}
                  className="border rounded-lg px-3 py-2 text-gray-700 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="all">Todas las vacantes</option>
                  {vacancies.map(vacancy => (
                    <option key={vacancy.id} value={vacancy.id}>
                      {vacancy.title}
                    </option>
                  ))}
                </select>
              </div>
              <button
                onClick={() => setShowArchived(!showArchived)}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-gray-600 transition-colors"
              >
                <Archive size={20} />
                <span>{showArchived ? 'Ver Activas' : 'Ver Archivadas'}</span>
              </button>
            </>
          )}
          <button
            onClick={() => {
              setShowApplications(!showApplications);
              setSelectedVacancyFilter('all');
            }}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-gray-600 transition-colors"
          >
            <Users size={20} />
            <span>{showApplications ? 'Ver Vacantes' : 'Ver Postulaciones'}</span>
          </button>
          {!showApplications && (
            <button
              onClick={() => {
                setCurrentVacancy(null);
                setFormData({
                  title: '',
                  description: '',
                  requirements: '',
                  is_active: true
                });
                setIsModalOpen(true);
              }}
              className="bg-orange-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-orange-600 transition-colors"
            >
              <Plus size={20} />
              <span>Nueva Vacante</span>
            </button>
          )}
        </div>
      </div>

      {showApplications ? (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {filteredApplications.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <p className="text-lg">
                {showArchived 
                  ? 'No hay postulaciones archivadas'
                  : selectedVacancyFilter !== 'all'
                    ? 'No hay postulaciones para esta vacante'
                    : 'No hay postulaciones activas'}
              </p>
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Postulante
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Vacante
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fecha
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredApplications.map((application) => {
                  const vacancy = vacancies.find(v => v.id === application.vacancy_id);
                  return (
                    <tr key={application.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {application.first_name} {application.last_name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {vacancy?.title || 'Vacante no disponible'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {new Date(application.created_at).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          value={application.status}
                          onChange={(e) => handleStatusChange(application.id, e.target.value)}
                          className="text-sm rounded-full px-3 py-1"
                          style={{
                            backgroundColor: 
                              application.status === 'pending' ? '#FEF3C7' :
                              application.status === 'reviewing' ? '#DBEAFE' :
                              application.status === 'accepted' ? '#D1FAE5' :
                              application.status === 'rejected' ? '#FEE2E2' : '#F3F4F6',
                            color:
                              application.status === 'pending' ? '#92400E' :
                              application.status === 'reviewing' ? '#1E40AF' :
                              application.status === 'accepted' ? '#065F46' :
                              application.status === 'rejected' ? '#991B1B' : '#1F2937'
                          }}
                        >
                          <option value="pending">Pendiente</option>
                          <option value="reviewing">En Revisión</option>
                          <option value="accepted">Aceptado</option>
                          <option value="rejected">Rechazado</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-4">
                          <button
                            onClick={() => handleViewDetails(application)}
                            className="text-blue-600 hover:text-blue-800"
                            title="Ver detalles"
                          >
                            <Eye size={20} />
                          </button>
                          <a
                            href={application.resume_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-orange-600 hover:text-orange-800"
                          >
                            Ver CV
                          </a>
                          <button
                            onClick={() => handleArchiveApplication(application.id, !application.archived)}
                            className="text-gray-600 hover:text-gray-800"
                            title={application.archived ? 'Desarchivar' : 'Archivar'}
                          >
                            <Archive size={20} />
                          </button>
                          <button
                            onClick={() => handleDeleteApplication(application.id)}
                            className="text-red-600 hover:text-red-800"
                            title="Eliminar"
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vacancies.map((vacancy) => (
            <div key={vacancy.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900">{vacancy.title}</h3>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(vacancy)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Pencil size={20} />
                  </button>
                  <button
                    onClick={() => handleDelete(vacancy.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
              <p className="text-gray-600 mb-4 line-clamp-3">{vacancy.description}</p>
              <div className="flex items-center justify-between">
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    vacancy.is_active
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {vacancy.is_active ? 'Activa' : 'Inactiva'}
                </span>
                <span className="text-sm text-gray-500">
                  {applications.filter(a => a.vacancy_id === vacancy.id).length} postulaciones
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal for creating/editing vacancies */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <h3 className="text-xl font-bold mb-4">
              {currentVacancy ? 'Editar Vacante' : 'Nueva Vacante'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Título
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Descripción
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  rows={4}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Requisitos
                </label>
                <textarea
                  value={formData.requirements}
                  onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  rows={4}
                  required
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="is_active"
                  checked={formData.is_active}
                  onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                  className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded"
                />
                <label htmlFor="is_active" className="ml-2 block text-gray-700">
                  Vacante Activa
                </label>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
                >
                  {currentVacancy ? 'Guardar Cambios' : 'Crear Vacante'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal for viewing application details */}
      {isDetailsModalOpen && currentApplication && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold">Detalles de la Postulación</h3>
              <button
                onClick={() => setIsDetailsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-700">Postulante</h4>
                <p className="text-gray-900">{currentApplication.first_name} {currentApplication.last_name}</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-700">Vacante</h4>
                <p className="text-gray-900">
                  {vacancies.find(v => v.id === currentApplication.vacancy_id)?.title || 'No disponible'}
                </p>
              </div>
              <div>
                <h4 className="font-medium text-gray-700">Habilidades y Experiencia</h4>
                <p className="text-gray-900 whitespace-pre-wrap">{currentApplication.skills}</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-700">Fecha de Postulación</h4>
                <p className="text-gray-900">
                  {new Date(currentApplication.created_at).toLocaleDateString()}
                </p>
              </div>
              <div>
                <h4 className="font-medium text-gray-700">Estado</h4>
                <select
                  value={currentApplication.status}
                  onChange={(e) => handleStatusChange(currentApplication.id, e.target.value)}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                >
                  <option value="pending">Pendiente</option>
                  <option value="reviewing">En Revisión</option>
                  <option value="accepted">Aceptado</option>
                  <option value="rejected">Rechazado</option>
                </select>
              </div>
              <div className="flex justify-end space-x-4 pt-4">
                <a
                  href={currentApplication.resume_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Ver CV
                </a>
                <button
                  onClick={() => {
                    handleArchiveApplication(currentApplication.id, !currentApplication.archived);
                    setIsDetailsModalOpen(false);
                  }}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  {currentApplication.archived ? 'Desarchivar' : 'Archivar'}
                </button>
                <button
                  onClick={() => {
                    if (window.confirm('¿Estás seguro de que deseas eliminar esta postulación?')) {
                      handleDeleteApplication(currentApplication.id);
                      setIsDetailsModalOpen(false);
                    }
                  }}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCareers;