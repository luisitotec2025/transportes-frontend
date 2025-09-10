// src/Vehiculos.jsx
import { useEffect, useState } from "react";

function Vehiculos() {
  const [vehiculos, setVehiculos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVehiculos = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/vehiculos`);
        if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);
        const data = await res.json();
        console.log("Vehículos recibidos en el frontend:", data);
        setVehiculos(data);
      } catch (err) {
        console.error("Error al cargar vehículos:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchVehiculos();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-500 py-16">Cargando vehículos...</p>;
  }

  if (vehiculos.length === 0) {
    return <p className="text-center text-gray-500 py-16">No hay vehículos disponibles.</p>;
  }

  return (
    <section className="py-16 px-6 md:px-16 bg-gray-50">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
        Nuestros Vehículos
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {vehiculos.map((vehiculo) => {
          const imageUrl = vehiculo.imagenUrl || "https://via.placeholder.com/400x300?text=No+Image";

          return (
            <div
              key={vehiculo.id}
              className="bg-white p-6 rounded-3xl shadow-2xl overflow-hidden hover:scale-105 transition-transform duration-300"
            >
              <img
                src={imageUrl}
                alt={vehiculo.nombre}
                className="w-full h-56 object-cover rounded-md mb-4"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://via.placeholder.com/400x300?text=No+Image";
                }}
              />

              <div className="space-y-2">
                <h3 className="text-xl font-semibold">{vehiculo.nombre}</h3>
                <p className="text-gray-600"><strong>Marca:</strong> {vehiculo.marca}</p>
                <p className="text-gray-600"><strong>Modelo:</strong> {vehiculo.modelo}</p>
                <p className="text-gray-600"><strong>Motor:</strong> {vehiculo.motor}</p>
                <p className="text-gray-600"><strong>Capacidad de carga:</strong> {vehiculo.capacidad_carga} toneladas</p>
                <p className="text-gray-600 text-sm"><strong>Detalles:</strong> {vehiculo.caracteristicas}</p>
                <button className="w-full bg-[#07b9ff] hover:bg-[#06a0e0] text-white font-semibold py-2 rounded-xl mt-3 shadow-md transition duration-300">
                  Cotizar
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Vehiculos;
