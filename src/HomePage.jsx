// src/HomePage.jsx
import { useEffect, useState } from "react";
import Formulario from "./Formulario.jsx";

export default function HomePage() {
  const [vehiculos, setVehiculos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVehiculos = async () => {
      try {
        const res = await fetch("http://localhost:5000/vehiculos");
        const data = await res.json();
        setVehiculos(data);
      } catch (err) {
        console.error("Error fetch:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchVehiculos();
  }, []);

  return (
    <div className="font-sans bg-gray-50 min-h-screen">

      {/* Header corporativo responsive */}
      <header className="relative w-full h-[420px] sm:h-[480px] md:h-[550px] shadow-lg">
        <img
          src="/C2-Panel-Van-3.jpg"
          alt="Fondo corporativo transporte"
          className="absolute inset-0 w-full h-full object-cover brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/30"></div>
        <div className="relative z-10 container mx-auto px-4 sm:px-6 flex flex-col md:flex-row justify-between items-center h-full gap-6">
          {/* Título y mensaje corporativo */}
          <div className="bg-white/90 p-5 sm:p-6 rounded-2xl shadow-lg w-full md:max-w-lg text-center md:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-black mb-2">
              Transporte y Mudanzas Manolo
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-800">
              Movemos tu mundo con confianza
            </p>
            <p className="mt-3 text-blue-600 font-semibold sm:text-lg md:text-xl">
              📞 Para contrataciones, llame a los números
            </p>
          </div>

          {/* Números de contacto */}
          <div className="flex flex-col items-center md:items-end gap-3 w-full md:w-auto">
            <div className="bg-[#07b9ff] text-white font-bold text-lg sm:text-xl md:text-2xl px-5 py-3 rounded-xl shadow-md w-full text-center md:w-auto">
              📞 6019-2361
            </div>
            <div className="bg-[#07b9ff] text-white font-bold text-lg sm:text-xl md:text-2xl px-5 py-3 rounded-xl shadow-md w-full text-center md:w-auto">
              📞 7220-8777
            </div>
          </div>
        </div>
      </header>

      {/* Sección de servicios */}
      <section className="py-16 px-6 md:px-16 bg-gray-100">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
          Nuestros Servicios
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: "🚚", title: "Mudanzas Locales", desc: "Servicio rápido y seguro dentro de la ciudad." },
            { icon: "📦", title: "Embalaje Seguro", desc: "Protegemos tus muebles y objetos con materiales de primera." },
            { icon: "🏢", title: "Traslado de Oficinas", desc: "Mudanzas completas sin interrupciones." },
            { icon: "🌎", title: "Transporte Nacional", desc: "Llevamos tu carga a cualquier parte del país con total confianza." },
          ].map((s, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-3xl shadow-2xl hover:shadow-3xl hover:-translate-y-2 transition-all duration-300 text-center"
            >
              <div className="text-4xl mb-4">{s.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{s.title}</h3>
              <p className="text-gray-600">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Vehículos */}
      <section className="py-16 px-6 md:px-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
          Nuestros Vehículos
        </h2>
        {loading ? (
          <p className="text-center text-gray-500">Cargando vehículos...</p>
        ) : vehiculos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {vehiculos.map((v) => (
              <div
                key={v.id}
                className="bg-white rounded-3xl shadow-2xl overflow-hidden hover:scale-105 transition-transform duration-300"
              >
                {v.imagenUrl ? (
                  <img
                    src={v.imagenUrl}
                    alt={v.nombre}
                    className="w-full h-56 object-cover"
                  />
                ) : (
                  <div className="w-full h-56 bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500">Imagen no disponible</span>
                  </div>
                )}
                <div className="p-6 space-y-2">
                  <h3 className="text-xl font-semibold">{v.nombre}</h3>
                  <p className="text-gray-600"><strong>Marca:</strong> {v.marca}</p>
                  <p className="text-gray-600"><strong>Modelo:</strong> {v.modelo}</p>
                  <p className="text-gray-600"><strong>Capacidad:</strong> {v.capacidad_carga} ton</p>
                  <p className="text-gray-600 text-sm">{v.descripcion}</p>
                  <button className="w-full bg-[#07b9ff] hover:bg-[#06a0e0] text-white font-semibold py-2 rounded-xl mt-3 shadow-md transition duration-300">
                    Cotizar
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No hay vehículos disponibles.</p>
        )}
      </section>

      {/* Formulario */}
      <section className="py-16 px-6 md:px-16 bg-gray-100">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-800">
          Contáctanos
        </h2>
        <Formulario />
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white text-center py-6">
        <p>© {new Date().getFullYear()} Transporte y Mudanzas Manolo</p>
        <p className="text-gray-400 text-sm">
          📍 San Salvador | 📞 (503) 2222-2222 | ✉️ contacto@mudanzasmanolo.com
        </p>
      </footer>
    </div>
  );
}
