import { useState, useEffect } from "react";

function BannerSlider() {
  const bannerImages = [
    "/chang-pdouble-cm5.jpg",
    "/chang-pnormal-cm5.jpg",
    "/fton-aum-3t.jpg",
    "/jac-xtdi-red107hp.jpg",
    "/Lite-Ace-Panel-01-1.jpg"
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % bannerImages.length);
    }, 5000); // Cambia cada 5 segundos

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-[400px] md:h-[500px] overflow-hidden">
      {/* Fondo de las imágenes */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000"
        style={{ backgroundImage: `url(${bannerImages[currentIndex]})` }}
      ></div>

      {/* Contenido encima del fondo */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/20 flex flex-col items-center justify-center text-center text-white px-4">
        <h1 className="text-3xl md:text-5xl font-extrabold mb-4 drop-shadow-lg">
          Transporte y Mudanzas Manolo
        </h1>
        <p className="text-md md:text-xl mb-6 drop-shadow-md">
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
  );
}

export default BannerSlider;
