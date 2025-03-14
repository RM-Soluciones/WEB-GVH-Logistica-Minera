import { useState } from 'react';
import { Link } from 'react-router-dom';
import { UserCircle, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const getDirectImageUrl = (url: string): string => {
    try {
      const urlObj = new URL(url);
      if (urlObj.hostname.includes('dropbox.com')) {
        return url.replace('www.dropbox.com', 'dl.dropboxusercontent.com')
                 .replace('?dl=0', '');
      }
      return url;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return url;
    }
  };

  const logoUrl = getDirectImageUrl("https://www.dropbox.com/scl/fi/0wso1q1xyb34pfcvw3n4g/GVH-LOGISTICA-MIENRA.png?rlkey=233x4vk1z3ebv2jv3grszcx99&st=bruywd9a&dl=0");

  return (
    <nav className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src={logoUrl}
              alt="GVH Logística Minera" 
              className="h-12 w-auto object-contain"
            />
          </Link>
          
          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="hover:text-orange-500 transition-colors">Inicio</Link>
            <Link to="/nosotros" className="hover:text-orange-500 transition-colors">Nosotros</Link>
            <Link to="/servicios" className="hover:text-orange-500 transition-colors">Servicios</Link>
            <Link to="/clientes" className="hover:text-orange-500 transition-colors">Clientes</Link>
            <Link to="/trabaja-con-nosotros" className="hover:text-orange-500 transition-colors">Trabaja con Nosotros</Link>
            <Link to="/contacto" className="hover:text-orange-500 transition-colors">Contacto</Link>
            <Link
              to="/login"
              className="flex items-center space-x-1 bg-orange-600 px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors"
            >
              <UserCircle size={20} />
              <span>Login</span>
            </Link>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4">
            <Link to="/" className="block hover:text-orange-500">Inicio</Link>
            <Link to="/nosotros" className="block hover:text-orange-500">Nosotros</Link>
            <Link to="/servicios" className="block hover:text-orange-500">Servicios</Link>
            <Link to="/clientes" className="block hover:text-orange-500">Clientes</Link>
            <Link to="/trabaja-con-nosotros" className="block hover:text-orange-500">Trabaja con Nosotros</Link>
            <Link to="/contacto" className="block hover:text-orange-500">Contacto</Link>
            <Link
              to="/login"
              className="flex items-center space-x-1 bg-orange-600 px-4 py-2 rounded-lg hover:bg-orange-700 w-full"
            >
              <UserCircle size={20} />
              <span>Login</span>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;