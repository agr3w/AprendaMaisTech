import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
import InteractiveCourse from "./InteractiveCourse";
import SpaceChallenge from "./SpaceChallenge";

// Componente principal de roteamento
const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/Analise-de-sistemas" element={<InteractiveCourse />} />
      <Route path="/pedagogia" element={<SpaceChallenge />}  />
    </Routes>
  );
};

export default AppRouter;
