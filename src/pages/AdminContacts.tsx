import React, { useState, useEffect } from 'react';
import { Loader2, Mail, Eye, Archive, Trash2, Filter } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
  status: string;
  created_at: string;
}

const AdminContacts = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [currentContact, setCurrentContact] = useState<Contact | null>(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const { data, error } = await supabase
        .from('contacts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setContacts(data || []);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (contactId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('contacts')
        .update({ status: newStatus })
        .eq('id', contactId);

      if (error) throw error;
      fetchContacts();
    } catch (error) {
      console.error('Error updating contact status:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar este contacto?')) return;

    try {
      const { error } = await supabase
        .from('contacts')
        .delete()
        .eq('id', id);

      if (error) throw error;
      fetchContacts();
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  const handleViewDetails = (contact: Contact) => {
    if (contact.status === 'new') {
      handleStatusChange(contact.id, 'read');
    }
    setCurrentContact(contact);
    setIsDetailsModalOpen(true);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
      </div>
    );
  }

  const filteredContacts = contacts.filter(contact => 
    statusFilter === 'all' || contact.status === statusFilter
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Mensajes de Contacto</h2>
        <div className="flex items-center space-x-2">
          <Filter size={20} className="text-gray-500" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border rounded-lg px-3 py-2 text-gray-700 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <option value="all">Todos los mensajes</option>
            <option value="new">Nuevos</option>
            <option value="read">Leídos</option>
            <option value="replied">Respondidos</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {filteredContacts.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <Mail className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg">No hay mensajes {statusFilter !== 'all' ? 'con este estado' : ''}</p>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Remitente
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Empresa
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
              {filteredContacts.map((contact) => (
                <tr key={contact.id} className={contact.status === 'new' ? 'bg-orange-50' : ''}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{contact.name}</div>
                      <div className="text-sm text-gray-500">{contact.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{contact.company}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {new Date(contact.created_at).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={contact.status}
                      onChange={(e) => handleStatusChange(contact.id, e.target.value)}
                      className="text-sm rounded-full px-3 py-1"
                      style={{
                        backgroundColor: 
                          contact.status === 'new' ? '#FEF3C7' :
                          contact.status === 'read' ? '#DBEAFE' :
                          contact.status === 'replied' ? '#D1FAE5' : '#F3F4F6',
                        color:
                          contact.status === 'new' ? '#92400E' :
                          contact.status === 'read' ? '#1E40AF' :
                          contact.status === 'replied' ? '#065F46' : '#1F2937'
                      }}
                    >
                      <option value="new">Nuevo</option>
                      <option value="read">Leído</option>
                      <option value="replied">Respondido</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => handleViewDetails(contact)}
                        className="text-blue-600 hover:text-blue-800"
                        title="Ver detalles"
                      >
                        <Eye size={20} />
                      </button>
                      <button
                        onClick={() => handleDelete(contact.id)}
                        className="text-red-600 hover:text-red-800"
                        title="Eliminar"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal for viewing contact details */}
      {isDetailsModalOpen && currentContact && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold">Detalles del Mensaje</h3>
              <button
                onClick={() => setIsDetailsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-gray-700">Nombre</h4>
                  <p className="text-gray-900">{currentContact.name}</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-700">Empresa</h4>
                  <p className="text-gray-900">{currentContact.company}</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-700">Email</h4>
                  <p className="text-gray-900">{currentContact.email}</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-700">Teléfono</h4>
                  <p className="text-gray-900">{currentContact.phone}</p>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-700">Mensaje</h4>
                <p className="text-gray-900 whitespace-pre-wrap mt-2 p-4 bg-gray-50 rounded-lg">
                  {currentContact.message}
                </p>
              </div>
              <div>
                <h4 className="font-medium text-gray-700">Estado</h4>
                <select
                  value={currentContact.status}
                  onChange={(e) => handleStatusChange(currentContact.id, e.target.value)}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                >
                  <option value="new">Nuevo</option>
                  <option value="read">Leído</option>
                  <option value="replied">Respondido</option>
                </select>
              </div>
              <div className="flex justify-end space-x-4 pt-4">
                <a
                  href={`mailto:${currentContact.email}`}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                  onClick={() => handleStatusChange(currentContact.id, 'replied')}
                >
                  Responder
                </a>
                <button
                  onClick={() => {
                    if (window.confirm('¿Estás seguro de que deseas eliminar este mensaje?')) {
                      handleDelete(currentContact.id);
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

export default AdminContacts;