import { useState } from "react";

export default function Formulario() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [estado, setEstado] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/contactos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, email, mensaje }),
      });

      if (!res.ok) throw new Error("Error al enviar contacto");

      setEstado("✅ Mensaje enviado correctamente!");
      setNombre("");
      setEmail("");
      setMensaje("");
    } catch (err) {
      console.error(err);
      setEstado("❌ Error al enviar mensaje.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-8 rounded-3xl shadow-2xl space-y-5">
      <h3 className="text-2xl font-bold text-gray-800 text-center mb-4">Contáctanos</h3>

      <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        required
        className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400"
      />
      <textarea
        placeholder="Mensaje"
        value={mensaje}
        onChange={(e) => setMensaje(e.target.value)}
        required
        rows="5"
        className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400"
      />

      <button
        type="submit"
        className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3 rounded-2xl shadow-lg transition duration-300"
      >
        Enviar Mensaje
      </button>

      {estado && <p className="text-center mt-3 font-medium text-gray-700">{estado}</p>}
    </form>
  );
}
