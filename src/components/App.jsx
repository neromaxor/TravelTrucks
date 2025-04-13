import { Routes, Route } from "react-router-dom";
import AppBar from "./AppBar/AppBar.jsx";
import css from "./App.module.css";
import { Suspense, lazy } from "react";

const Home = lazy(() => import("./../pages/Home.jsx"));
const Catalog = lazy(() => import("./../pages/Catalog.jsx"));
const CampersList = lazy(() => import("./Campers/CampersList.jsx"));
const CamperDetails = lazy(() => import("./../pages/CamperDetails.jsx"));
export default function App() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <AppBar />
        <Routes>
          <Route path="/details" element={<CamperDetails/>} />
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/campers" element={<CampersList />} />
        </Routes>
      </Suspense>
    </div>
  );
}
 