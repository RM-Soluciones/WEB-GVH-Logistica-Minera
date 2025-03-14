import React, { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, Loader2, ArrowUp, ArrowDown, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Service {
  id: string;
  title: string;
  description: string;
  image_url: string;
  order: number;
  is_active: boolean;
}

const AdminServices = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentService, setCurrentService] = useState<Service | null>(null);
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image_url: '',
    is_active: true
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('order', { ascending: true });

      if (error) throw error;
      setServices(data || []);
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setLoading(false);
    }
  };

  const getDirectImageUrl = (url: string): string => {
    try {
      const urlObj = new URL(url);

      // Google Drive
      if (urlObj.hostname.includes('drive.google.com')) {
        const id = url.match(/[-\w]{25,}/);
        if (id) {
          return `https://drive.google.com/uc?export=view&id=${id[0]}`;
        }
      }

      // Dropbox
      if (urlObj.hostname.includes('dropbox.com')) {
        return url.replace('www.dropbox.com', 'dl.dropboxusercontent.com')
                 .replace('?dl=0', '');
      }

      // OneDrive
      if (urlObj.hostname.includes('1drv.ms') || urlObj.hostname.includes('onedrive.live.com')) {
        return `${url}&download=1`;
      }

      return url;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return url;
    }
  };

  const validateImageUrl = (url: string): Promise<boolean> => {
    return new Promise((resolve) => {
      const directUrl = getDirectImageUrl(url);
      const img = new Image();
      const timeoutId = setTimeout(() => {
        img.src = '';
        resolve(false);
      }, 5000); // 5 second timeout

      img.onload = () => {
        clearTimeout(timeoutId);
        resolve(true);
      };
      img.onerror = () => {
        clearTimeout(timeoutId);
        resolve(false);
      };
      img.src = directUrl;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setImageError(false);

    const directImageUrl = getDirectImageUrl(formData.image_url);
    const isValidImage = await validateImageUrl(formData.image_url);

    if (!isValidImage) {
      setImageError(true);
      setLoading(false);
      return;
    }

    try {
      const serviceData = {
        ...formData,
        image_url: directImageUrl
      };

      if (currentService) {
        const { error } = await supabase
          .from('services')
          .update(serviceData)
          .eq('id', currentService.id);

        if (error) throw error;
      } else {
        const maxOrder = Math.max(...services.map(s => s.order), -1);
        const { error } = await supabase
          .from('services')
          .insert([{ ...serviceData, order: maxOrder + 1 }]);

        if (error) throw error;
      }

      setIsModalOpen(false);
      setCurrentService(null);
      setFormData({
        title: '',
        description: '',
        image_url: '',
        is_active: true
      });
      fetchServices();
    } catch (error) {
      console.error('Error saving service:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (service: Service) => {
    setCurrentService(service);
    setFormData({
      title: service.title,
      description: service.description,
      image_url: service.image_url,
      is_active: service.is_active
    });
    setIsModalOpen(true);
    setImageError(false);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar este servicio?')) return;

    try {
      const { error } = await supabase
        .from('services')
        .delete()
        .eq('id', id);

      if (error) throw error;
      fetchServices();
    } catch (error) {
      console.error('Error deleting service:', error);
    }
  };

  const handleReorder = async (serviceId: string, direction: 'up' | 'down') => {
    const currentIndex = services.findIndex(s => s.id === serviceId);
    if (
      (direction === 'up' && currentIndex === 0) ||
      (direction === 'down' && currentIndex === services.length - 1)
    ) return;

    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    const swapService = services[newIndex];

    try {
      const { error } = await supabase
        .from('services')
        .update([
          { order: swapService.order, id: serviceId },
          { order: services[currentIndex].order, id: swapService.id }
        ]);

      if (error) throw error;
      fetchServices();
    } catch (error) {
      console.error('Error reordering services:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Gestión de Servicios</h2>
        <button
          onClick={() => {
            setCurrentService(null);
            setFormData({
              title: '',
              description: '',
              image_url: '',
              is_active: true
            });
            setIsModalOpen(true);
            setImageError(false);
          }}
          className="bg-orange-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-orange-600 transition-colors"
        >
          <Plus size={20} />
          <span>Nuevo Servicio</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <div key={service.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative aspect-video">
              <img
                src={service.image_url}
                alt={service.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80';
                }}
              />
            </div>
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900">{service.title}</h3>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(service)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Pencil size={20} />
                  </button>
                  <button
                    onClick={() => handleDelete(service.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
              <p className="text-gray-600 mb-4 line-clamp-3">{service.description}</p>
              <div className="flex items-center justify-between">
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    service.is_active
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {service.is_active ? 'Activo' : 'Inactivo'}
                </span>
                <div className="flex space-x-2">
                  {index > 0 && (
                    <button
                      onClick={() => handleReorder(service.id, 'up')}
                      className="text-gray-600 hover:text-gray-800"
                    >
                      <ArrowUp size={20} />
                    </button>
                  )}
                  {index < services.length - 1 && (
                    <button
                      onClick={() => handleReorder(service.id, 'down')}
                      className="text-gray-600 hover:text-gray-800"
                    >
                      <ArrowDown size={20} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for creating/editing services */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <h3 className="text-xl font-bold mb-4">
              {currentService ? 'Editar Servicio' : 'Nuevo Servicio'}
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
                  URL de la Imagen
                </label>
                <div className="space-y-2">
                  <div className="flex space-x-2">
                    <input
                      type="url"
                      value={formData.image_url}
                      onChange={(e) => {
                        setFormData({ ...formData, image_url: e.target.value });
                        setImageError(false);
                      }}
                      className={`flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                        imageError ? 'border-red-500' : ''
                      }`}
                      required
                    />
                    {formData.image_url && !imageError && (
                      <div className="w-12 h-12 border rounded-lg overflow-hidden">
                        <img
                          src={getDirectImageUrl(formData.image_url)}
                          alt="Preview"
                          className="w-full h-full object-cover"
                          onError={() => setImageError(true)}
                        />
                      </div>
                    )}
                  </div>
                  {imageError && (
                    <div className="flex items-center text-red-600 text-sm">
                      <AlertCircle size={16} className="mr-1" />
                      <span>La URL de la imagen no es válida o no es accesible. Asegúrate de que la imagen sea pública y accesible.</span>
                    </div>
                  )}
                  <p className="text-sm text-gray-500">
                    Puedes usar URLs de Google Drive, Dropbox, OneDrive o cualquier otro servicio de alojamiento de imágenes. Asegúrate de que los enlaces sean públicos y accesibles.
                  </p>
                </div>
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
                  Servicio Activo
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
                  {currentService ? 'Guardar Cambios' : 'Crear Servicio'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminServices;