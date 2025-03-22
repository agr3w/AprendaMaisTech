import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { FiUser, FiLifeBuoy, FiSettings, FiLogOut, FiBookOpen } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

// Estilos base
const Background = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(-45deg, #1a1a2e, #16213e, #0f3460, #533483);
  background-size: 400% 400%;
  animation: gradientAnimation 15s ease infinite;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  @keyframes gradientAnimation {
    0% { background-position: 0% 20%; }
    50% { background-position: 100% 80%; }
    100% { background-position: 0% 20%; }
  }
`;

const GlassCard = styled(motion.div)`
  background: rgba(25, 25, 46, 0.6);
  backdrop-filter: blur(12px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  padding: 2rem;
  margin: 2rem auto;
  max-width: 1400px;
  width: 95%;
`;

// Navbar
const NavBar = styled.nav`
  background: rgba(25, 25, 46, 0.6);
  backdrop-filter: blur(12px);
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const Logo = styled(motion.div)`
  font-size: 1.5rem;
  font-weight: 700;
  background: linear-gradient(45deg, #9d44b5, #6a11cb);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const NavIcons = styled.div`
  display: flex;
  gap: 1.5rem;
  color: rgba(255, 255, 255, 0.8);

  svg {
    cursor: pointer;
    transition: all 0.3s ease;
    padding: 0.5rem;

    &:hover {
      color: #9d44b5;
      transform: translateY(-2px);
    }
  }
`;

const UserMenu = styled.div`
  position: relative;
  display: inline-block;

  &:hover div {
    display: block;
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  right: 0;
  background: rgba(25, 25, 46, 0.9);
  border-radius: 8px;
  padding: 1rem;
  min-width: 200px;
  display: none;
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const MenuItem = styled(motion.div)`
  padding: 0.8rem;
  border-radius: 6px;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }
`;

// Conteúdo principal
const CourseGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 2rem 0;
`;

const CourseCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  cursor: pointer;
  position: relative;
  min-height: 250px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  }
`;

const CourseTitle = styled.h3`
  color: #9d44b5;
  font-size: 1.3rem;
  margin-bottom: 1rem;
  text-shadow: 0 0 15px rgba(157, 68, 181, 0.3);
`;

const CourseDescription = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.95rem;
  line-height: 1.5;
`;

const Home = () => {
  const courses = [
    {
      id: 1,
      name: "Administração",
      description: "Aprenda gestão de negócios com videoaulas, estudos de caso e projetos práticos em Marketing, Finanças e RH."
    },
    {
      id: 2,
      name: "Análise de Sistemas",
      description: "Estude Programação, Banco de Dados e Redes com laboratórios virtuais, exercícios de codificação e projetos de software."
    },
    {
      id: 5,
      name: "Ciências Contábeis",
      description: "Explore Contabilidade, Tributação e Auditoria com simuladores contábeis e análises de relatórios financeiros."
    },
    {
      id: 6,
      name: "Direito",
      description: "Aprenda Direito Civil, Penal e Constitucional com videoaulas, debates online e simulações de júri."
    },
    {
      id: 16,
      name: "Gestão de RH",
      description: "Estude Recrutamento, Treinamento e Gestão de Carreiras com simulações de processos seletivos e estudos de caso."
    },
    {
      id: 17,
      name: "Gestão da Produção Industrial",
      description: "Aprenda sobre planejamento e controle de produção com projetos práticos e ferramentas de gestão industrial."
    },
    {
      id: 18,
      name: "Logística",
      description: "Estude gestão de cadeias de suprimentos com simulações logísticas e estudos de caso reais."
    },
    {
      id: 19,
      name: "Pedagogia",
      description: "Aprenda metodologias de ensino com videoaulas, planejamentos de aula e projetos educacionais."
    }
  ];

  const navigate = useNavigate();

  const handleNavigate = (course) => {
    let route = "";
    if (course.name === "Análise de Sistemas") {
      route = "/Analise-de-sistemas";
    } else if (course.name === "Pedagogia") {
      route = "/pedagogia";
    } else {
      // Se não houver rota definida, pode ser exibida uma mensagem ou não navegar.
      alert("Página do curso em breve!");
      return;
    }
    navigate(route);
    window.scrollTo(0, 0);
  };

  return (
    <Background>
      <NavBar>
        <Logo>Aprenda+ Tech</Logo>
        <NavIcons>
          <FiLifeBuoy size={36} aria-label="Suporte" />
          <UserMenu>
            <FiUser size={36} aria-label="Perfil do usuário" />
            <DropdownMenu>
              <MenuItem whileHover={{ x: 5 }} whileTap={{ scale: 0.95 }}>
                <FiSettings /> Configurações
              </MenuItem>
              <MenuItem whileHover={{ x: 5 }} whileTap={{ scale: 0.95 }}>
                <FiBookOpen /> Meus Cursos
              </MenuItem>
              <MenuItem whileHover={{ x: 5 }} whileTap={{ scale: 0.95 }}>
                <FiLogOut /> Sair
              </MenuItem>
            </DropdownMenu>
          </UserMenu>
        </NavIcons>
      </NavBar>

      <GlassCard initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          <h1 style={{ color: "#fff", textAlign: "center", marginBottom: "2rem" }}>
            Selecione Seu Curso
          </h1>
          <CourseGrid>
            {courses.map((course) => (
              <CourseCard
                key={course.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                role="button"
                tabIndex="0"
                onClick={() => handleNavigate(course)}
              >
                <CourseTitle>{course.name}</CourseTitle>
                <CourseDescription>{course.description}</CourseDescription>
                <motion.button
                  style={{
                    background: "linear-gradient(90deg, #9d44b5 0%, #6a11cb 100%)",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    padding: "0.8rem",
                    width: "100%",
                    marginTop: "1.5rem",
                    cursor: "pointer"
                  }}
                  onClick={() => handleNavigate(course)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Explorar Curso
                </motion.button>
              </CourseCard>
            ))}
          </CourseGrid>
          <div style={{ textAlign: "center", marginTop: "3rem" }}>
            <motion.button
              style={{
                background: "rgba(255, 255, 255, 0.1)",
                color: "#fff",
                padding: "1rem 2.5rem",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                borderRadius: "8px",
                cursor: "pointer"
              }}
              whileHover={{ background: "rgba(255, 255, 255, 0.2)" }}
              whileTap={{ scale: 0.95 }}
            >
              Ver Todos os Cursos
            </motion.button>
          </div>
        </motion.div>
      </GlassCard>
    </Background>
  );
};

export default Home;
