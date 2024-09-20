import { Routes, Route } from "react-router-dom";
import Home from "./../pages/Home.jsx";
import Catalog from "./../pages/Catalog.jsx";
import AppBar from "./AppBar/AppBar.jsx";
import css from "./App.module.css";

export default function App() {
  return (
    <>
      <AppBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
      </Routes>
    </>
  );
}
