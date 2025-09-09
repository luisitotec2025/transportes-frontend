import { useEffect, useState } from "react";

function Vehiculos() {
  const [vehiculos, setVehiculos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/vehiculos")
      .then((res) => res.json())
      .then((data) => {
        console.log("Vehículos recibidos en el frontend:", data); // 👈 revisa aquí
        setVehiculos(data);
      })
      .catch((err) => console.error("Error al cargar vehículos:", err));
  }, []);

  return (
    <section className="py-16 px-6 md:px-16 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-10">Nuestros Vehículos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {vehiculos.map((vehiculo) => {
          const imageUrl = vehiculo.imagenUrl; // 👈 usa exactamente el campo que envía el backend

          return (
            <div
              key={vehiculo.id}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
            >
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt={vehiculo.nombre}
                  className="w-full h-64 object-contain rounded-md mb-4"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com/400x300?text=No+Image";
                  }}
                />
              ) : (
                <div className="w-full h-64 bg-gray-200 flex items-center justify-center rounded-md mb-4">
                  <span className="text-gray-500">Imagen no disponible</span>
                </div>
              )}

              <h3 className="text-xl font-semibold mb-2 text-center">
                {vehiculo.nombre}
              </h3>
              <p className="mb-1">
                <strong>Marca:</strong> {vehiculo.marca}
              </p>
              <p className="mb-1">
                <strong>Modelo:</strong> {vehiculo.modelo}
              </p>
              <p className="mb-1">
                <strong>Motor:</strong> {vehiculo.motor}
              </p>
              <p className="mb-1">
                <strong>Capacidad de carga:</strong> {vehiculo.capacidad_carga} toneladas
              </p>
              <p className="mb-1">
                <strong>Detalles:</strong> {vehiculo.detalles}
              </p>

              <button className="mt-4 w-full bg-yellow-500 text-black px-4 py-2 rounded-lg shadow hover:bg-yellow-400 transition">
                Cotizar
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Vehiculos;
