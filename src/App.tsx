// ** Imports do React
import React from "react";

// ** Imports de pacotes
import { BrowserRouter, Routes, Route } from "react-router-dom";

// ** Imports de páginas
import Login from "./pages/login";

// ** Imports de rotas
import AuthRoutes from '../src/routes/AppRoutes';

// ** Imports de contextos
import { AuthProvider } from "./context/AuthContext";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<AuthRoutes />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
