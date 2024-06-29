import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "../components/layouts/Layout";
import Home from "../pages/home";
import CadastraInformacoes from "../pages/curriculo/CadastraInformacoes";
import CadastraExperiencia from "../pages/curriculo/CadastraExperiencia";
import ListaExperiencia from "../pages/curriculo/ListaExperiencia";
import ListaPortifolio from "../pages/portifolio/ListaPortifolio";
import CadastrarPortifolio from "../pages/portifolio/CadastrarPortifolio";

const AppRoutes: React.FC = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/curriculo/informacoes/cadastro" element={<CadastraInformacoes />} />
        <Route path="/curriculo/experiencia/cadastro" element={<CadastraExperiencia />} />
        <Route path="/curriculo/experiencia/lista" element={<ListaExperiencia />} />
        <Route path="/portifolio/lista" element={<ListaPortifolio />} />
        <Route path="/portifolio/cadastro" element={<CadastrarPortifolio />} />
      </Routes>
    </Layout>
  );
};

export default AppRoutes;
