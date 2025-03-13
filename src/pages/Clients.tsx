import React, { useState, useEffect } from 'react';
import { useKeenSlider } from 'keen-slider/react';
import "keen-slider/keen-slider.min.css";
import { Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Client {
  id: string;
  name: string;
  logo_url: string;
}

const Clients = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [sliderRef] = useKeenSlider(
    {
      slides: {
        perView: 3,
        spacing: 32,
      },
      breakpoints: {
        '(max-width: 768px)': {
          slides: {
            perView: 2,
            spacing: 16,
          },
        },
        '(max-width: 480px)': {
          slides: {
            perView: 1,
            spacing: 16,
          },
        },
      },
      loop: true,
      created(s) {
        s.moveToIdx(1, true, animation);
      },
      updated(s) {
        s.moveToIdx(s.track.details.abs + 1, true, animation);
      },
      animationEnded(s) {
        s.moveToIdx(s.track.details.abs + 1, true, animation);
      },
    },
    [
      // add plugin for auto-animation
      (slider) => {
        let timeout: ReturnType<typeof setTimeout>;
        let mouseOver = false;

        function clearNextTimeout() {
          clearTimeout(timeout);
        }

        function nextTimeout() {
          clearTimeout(timeout);
          if (mouseOver) return;
          timeout = setTimeout(() => {
            slider.next();
          }, 3000); // Change slide every 3 seconds
        }

        slider.on("created", () => {
          slider.container.addEventListener("mouseover", () => {
            mouseOver = true;
            clearNextTimeout();
          });
          slider.container.addEventListener("mouseout", () => {
            mouseOver = false;
            nextTimeout();
          });
          nextTimeout();
        });

        slider.on("dragStarted", clearNextTimeout);
        slider.on("animationEnded", nextTimeout);
        slider.on("updated", nextTimeout);
      },
    ]
  );

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .order('name', { ascending: true });

      if (error) throw error;
      setClients(data || []);
    } catch (error) {
      console.error('Error fetching clients:', error);
    } finally {
      setLoading(false);
    }
  };

  const animation = { duration: 20000, easing: (t: number) => t };

  if (loading) {
    return (
      <div className="min-h-[600px] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
      </div>
    );
  }

  if (clients.length === 0) {
    return (
      <div className="min-h-[600px] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Próximamente</h2>
          <p className="text-gray-600">Estamos trabajando con nuevos clientes.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Nuestros Clientes</h1>
          <p className="text-xl text-gray-600">
            Empresas que confían en nuestra experiencia y profesionalismo
          </p>
        </div>

        <div ref={sliderRef} className="keen-slider mb-16">
          {clients.map((client) => (
            <div
              key={client.id}
              className="keen-slider__slide"
            >
              <div className="bg-white rounded-lg shadow-md p-8 h-64 flex flex-col items-center justify-center">
                <img
                  src={client.logo_url}
                  alt={client.name}
                  className="max-w-full max-h-40 object-contain mb-4"
                />
                <h3 className="text-lg font-semibold text-gray-900 text-center">
                  {client.name}
                </h3>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-gray-600 max-w-2xl mx-auto">
            Nos enorgullece trabajar con empresas líderes en el sector minero,
            brindando soluciones logísticas de calidad y servicios especializados
            que impulsan su éxito.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Clients;