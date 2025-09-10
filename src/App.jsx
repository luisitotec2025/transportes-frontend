import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage.jsx";
import AgregarVehiculo from "./AgregarVehiculo.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin/vehiculos" element={<AgregarVehiculo />} />
      </Routes>
    </BrowserRouter>
  );
}
