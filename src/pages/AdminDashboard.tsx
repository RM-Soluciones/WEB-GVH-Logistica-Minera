import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, LayoutDashboard, Users, BriefcaseIcon, Mail, Wrench } from 'lucide-react';
import { supabase } from '../lib/supabase';
import AdminClients from './AdminClients';
import AdminCareers from './AdminCareers';
import AdminContacts from './AdminContacts';
import AdminServices from './AdminServices';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [currentSection, setCurrentSection] = useState('dashboard');
  const [pendingApplications, setPendingApplications] = useState(0);
  const [newMessages, setNewMessages] = useState(0);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const [applicationsResponse, messagesResponse] = await Promise.all([
        supabase
          .from('job_applications')
          .select('id')
          .eq('status', 'pending')
          .eq('archived', false),
        supabase
          .from('contacts')
          .select('id')
          .eq('status', 'new')
      ]);

      if (applicationsResponse.error) throw applicationsResponse.error;
      if (messagesResponse.error) throw messagesResponse.error;

      setPendingApplications(applicationsResponse.data?.length || 0);
      setNewMessages(messagesResponse.data?.length || 0);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  const renderContent = () => {
    switch (currentSection) {
      case 'clients':
        return <AdminClients />;
      case 'careers':
        return <AdminCareers />;
      case 'contacts':
        return <AdminContacts />;
      case 'services':
        return <AdminServices />;
      case 'dashboard':
      default:
        return (
          <div className="p-8">
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-gray-900">Bienvenido al Panel de Administración</h1>
              <p className="text-gray-600">Selecciona una opción del menú para comenzar</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Postulaciones Pendientes</h3>
                <p className="text-3xl font-bold text-orange-600">{pendingApplications}</p>
                <button
                  onClick={() => setCurrentSection('careers')}
                  className="mt-4 text-orange-600 hover:text-orange-700 text-sm font-medium"
                >
                  Ver postulaciones →
                </button>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Mensajes Nuevos</h3>
                <p className="text-3xl font-bold text-orange-600">{newMessages}</p>
                <button
                  onClick={() => setCurrentSection('contacts')}
                  className="mt-4 text-orange-600 hover:text-orange-700 text-sm font-medium"
                >
                  Ver mensajes →
                </button>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Accesos Rápidos</h3>
                <div className="space-y-2 mt-4">
                  <button
                    onClick={() => setCurrentSection('services')}
                    className="w-full text-left text-gray-600 hover:text-orange-600"
                  >
                    Gestionar Servicios →
                  </button>
                  <button
                    onClick={() => setCurrentSection('clients')}
                    className="w-full text-left text-gray-600 hover:text-orange-600"
                  >
                    Gestionar Clientes →
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed w-64 h-full bg-gray-900">
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h2 className="text-xl font-bold text-white">Panel Admin</h2>
          <button
            onClick={handleLogout}
            className="text-gray-400 hover:text-white transition-colors"
            title="Cerrar sesión"
          >
            <LogOut size={20} />
          </button>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => setCurrentSection('dashboard')}
                className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                  currentSection === 'dashboard'
                    ? 'text-white bg-orange-600'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
              >
                <LayoutDashboard size={20} />
                <span>Dashboard</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setCurrentSection('clients')}
                className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                  currentSection === 'clients'
                    ? 'text-white bg-orange-600'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
              >
                <Users size={20} />
                <span>Clientes</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setCurrentSection('services')}
                className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                  currentSection === 'services'
                    ? 'text-white bg-orange-600'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
              >
                <Wrench size={20} />
                <span>Servicios</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setCurrentSection('careers')}
                className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                  currentSection === 'careers'
                    ? 'text-white bg-orange-600'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <BriefcaseIcon size={20} />
                  <span>Vacantes</span>
                </div>
                {pendingApplications > 0 && (
                  <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs">
                    {pendingApplications}
                  </span>
                )}
              </button>
            </li>
            <li>
              <button
                onClick={() => setCurrentSection('contacts')}
                className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                  currentSection === 'contacts'
                    ? 'text-white bg-orange-600'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Mail size={20} />
                  <span>Contactos</span>
                </div>
                {newMessages > 0 && (
                  <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs">
                    {newMessages}
                  </span>
                )}
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="ml-64">
        {renderContent()}
      </div>
    </div>
  );
};

export default AdminDashboard;