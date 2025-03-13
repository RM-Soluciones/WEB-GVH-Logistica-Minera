import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Clients from './pages/Clients';
import Services from './pages/Services';
import Careers from './pages/Careers';
import Contact from './pages/Contact';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Routes>
          <Route
            path="/admin/*"
            element={<AdminDashboard />}
          />
          <Route
            path="*"
            element={
              <>
                <Navbar />
                <main className="flex-grow">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/nosotros" element={<About />} />
                    <Route path="/servicios" element={<Services />} />
                    <Route path="/clientes" element={<Clients />} />
                    <Route path="/trabaja-con-nosotros" element={<Careers />} />
                    <Route path="/contacto" element={<Contact />} />
                    <Route path="/login" element={<Login />} />
                  </Routes>
                </main>
                <Footer />
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App