import { useState } from "react";

export default function AgregarVehiculo() {
  const [vehiculo, setVehiculo] = useState({
    nombre: "",
    marca: "",
    modelo: "",
    anio: "",
    tipo_gas: "",
    capacidad_carga: "",
    caracteristicas: "",
  });

  const [imagenFile, setImagenFile] = useState(null);
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVehiculo((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setImagenFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");
    setError("");
    setLoading(true);

    try {
      const formData = new FormData();
      Object.keys(vehiculo).forEach((key) => formData.append(key, vehiculo[key]));
      if (imagenFile) formData.append("imagen", imagenFile);

      const res = await fetch("https://4d4e09013372.ngrok-free.app", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Error al guardar el vehículo");
      }

      setMensaje("✅ Vehículo agregado exitosamente!");
      setVehiculo({
        nombre: "",
        marca: "",
        modelo: "",
        anio: "",
        tipo_gas: "",
        capacidad_carga: "",
        caracteristicas: "",
      });
      setImagenFile(null);
      document.getElementById("imagen").value = "";
    } catch (err) {
      console.error(err);
      setError("❌ Ocurrió un error al agregar el vehículo: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-lg mt-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Agregar Vehículo</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="nombre" placeholder="Nombre" value={vehiculo.nombre} onChange={handleChange} required className="w-full p-3 border rounded-lg" />
        <input type="text" name="marca" placeholder="Marca" value={vehiculo.marca} onChange={handleChange} className="w-full p-3 border rounded-lg" />
        <input type="text" name="modelo" placeholder="Modelo" value={vehiculo.modelo} onChange={handleChange} className="w-full p-3 border rounded-lg" />
        <input type="number" name="anio" placeholder="Año" value={vehiculo.anio} onChange={handleChange} className="w-full p-3 border rounded-lg" />
        <input type="text" name="tipo_gas" placeholder="Tipo de Gas" value={vehiculo.tipo_gas} onChange={handleChange} className="w-full p-3 border rounded-lg" />
        <input type="number" step="0.01" name="capacidad_carga" placeholder="Capacidad de Carga (ton)" value={vehiculo.capacidad_carga} onChange={handleChange} className="w-full p-3 border rounded-lg" />
        <textarea name="caracteristicas" placeholder="Características" value={vehiculo.caracteristicas} onChange={handleChange} className="w-full p-3 border rounded-lg" />

        <input type="file" id="imagen" accept="image/*" onChange={handleFileChange} className="w-full p-3 border rounded-lg" />

        <button type="submit" disabled={loading} className={`w-full font-bold py-3 rounded-lg transition ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#07b9ff] text-white hover:bg-blue-500"}`}>
          {loading ? "Guardando..." : "Guardar Vehículo"}
        </button>
      </form>

      {mensaje && <p className="mt-4 text-center text-green-600">{mensaje}</p>}
      {error && <p className="mt-4 text-center text-red-600">{error}</p>}
    </div>
  );
}
