import { useEffect, useState } from "react";
import Formulario from "./Formulario.jsx";

function HomePage() {
  const [vehiculos, setVehiculos] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Slider de imágenes de fondo
  const bannerImages = [
    "/chang-pdouble-cm5.jpg",
    "/chang-pnormal-cm5.jpg",
    "/fton-aum-3t.jpg",
    "/jac-xtdi-red107hp.jpg",
    "/Lite-Ace-Panel-01-1.jpg",
  ];

  // Cambio automático de imagen cada 5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % bannerImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Fetch de vehículos
  useEffect(() => {
    const fetchVehiculos = async () => {
      try {
        const response = await fetch("http://localhost:5000/vehiculos");
        if (!response.ok) throw new Error("Error en la respuesta del servidor");
        const data = await response.json();
        setVehiculos(data);
      } catch (error) {
        console.error("Error cargando vehículos:", error);
      }
    };
    fetchVehiculos();
  }, []);

  



  return (
    <div className="font-sans text-gray-900 bg-gray-50">

    {/* ---- Barra superior con contacto ---- */}
    <div className="w-full bg-yellow-500 text-black py-2 text-center font-semibold text-lg md:text-xl">
      📞 Contáctanos: <a href="tel:+50360192361" className="underline hover:text-black/70">+503 60192361</a>
    </div>
    {/* ------------------------------------ */}



      {/* Banner principal con slider */}
      <section className="relative w-full h-[400px] md:h-[500px] overflow-hidden">
        {bannerImages.map((img, i) => (
          <div
            key={i}
            className={`absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ${
              i === currentIndex ? "opacity-100" : "opacity-0"
            }`}
            style={{ backgroundImage: `url(${img})` }}
          ></div>
        ))}

        {/* Gradiente y contenido encima */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/20 flex flex-col items-center justify-center text-center text-white px-4">
         <h1 className="text-3xl md:text-5xl font-extrabold mb-4 drop-shadow-lg bg-black/60 px-4 py-2 rounded">
  Transporte y Mudanzas Manolo
</h1>
<p className="text-md md:text-xl mb-6 drop-shadow-md bg-black/60 px-4 py-2 rounded">
  Movemos tu mundo con confianza
</p>
          <a
            href="#contacto"
            className="bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-6 py-3 rounded-lg shadow-lg transition-transform transform hover:scale-105"
          >
            Cotiza Ahora
          </a>
        </div>
      </section>

      {/* Sección de servicios */}
      <section className="py-16 px-6 md:px-16 bg-gray-100">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
          Nuestros Servicios
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: "🚚", title: "Mudanzas Locales", desc: "Servicio rápido y seguro dentro de la ciudad." },
            { icon: "📦", title: "Embalaje Seguro", desc: "Protegemos tus muebles y objetos con materiales de primera." },
            { icon: "🏢", title: "Oficinas", desc: "Traslado completo de equipos y mobiliario sin interrupciones." },
            { icon: "🌎", title: "Transporte Nacional", desc: "Llevamos tu carga a cualquier parte del país con total confianza." },
          ].map((service, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-1 hover:scale-105"
            >
              <h3 className="text-2xl font-semibold mb-3">{service.icon} {service.title}</h3>
              <p className="text-gray-700">{service.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Sección de vehículos */}
      <section className="py-16 px-6 md:px-16 bg-white">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
          Nuestros Vehículos
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {vehiculos.length > 0 ? (
            vehiculos.map((v) => (
              <div
                key={v.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-transform transform hover:-translate-y-1 hover:scale-105"
              >
                {/* Imagen del vehículo */}
                {v.imagenUrl ? (
                  <img
                    src={v.imagenUrl}
                    alt={v.nombre}
                    className="w-full h-56 md:h-64 object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-56 md:h-64 bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500">Imagen no disponible</span>
                  </div>
                )}

                <div className="p-6">
                  <h3 className="text-xl md:text-2xl font-semibold mb-2">{v.nombre}</h3>
                  <p className="text-gray-600 mb-1"><strong>Marca:</strong> {v.marca}</p>
                  <p className="text-gray-600 mb-1"><strong>Modelo:</strong> {v.modelo}</p>
                  <p className="text-gray-600 mb-1"><strong>Capacidad:</strong> {v.capacidad_carga} ton</p>
                  <p className="text-gray-600 text-sm mb-4">{v.descripcion}</p>
                  <button className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-4 py-2 rounded-lg shadow-md transition-transform transform hover:scale-105">
                    Cotizar
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-3">
              No hay vehículos disponibles en este momento.
            </p>
          )}
        </div>
      </section>

      {/* Sección de contacto */}
      <section id="contacto" className="py-16 px-6 md:px-16 bg-gray-50">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
          Contáctanos
        </h2>
        <Formulario />
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white text-center py-8 mt-12">
        <p className="mb-2 font-semibold">
          © {new Date().getFullYear()} Transporte y Mudanzas Manolo
        </p>
        <p className="text-gray-300">
          📍 San Salvador | 📞 (503) 6019-2361 | ✉️ contacto@mudanzasmanolo.com
        </p>
      </footer>
    </div>
  );
}

export default HomePage;
