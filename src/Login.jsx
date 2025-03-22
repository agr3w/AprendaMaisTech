import React from "react";
import { motion } from "framer-motion";
import styled, { keyframes } from "styled-components";
import { loadFull } from "tsparticles";
import Particles from "react-tsparticles";
import { useNavigate } from "react-router-dom";

// Animação global do gradiente
const gradientAnimation = keyframes`
  0% { background-position: 0% 20%; }
  50% { background-position: 100% 80%; }
  100% { background-position: 0% 20%; }
`;

// Componentes estilizados
const Background = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(-45deg, #1a1a2e, #16213e, #0f3460, #533483);
  background-size: 400% 400%;
  animation: ${gradientAnimation} 15s ease infinite;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const ContentContainer = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Title = styled(motion.h1)`
  color: #fff;
  font-size: 4rem;
  text-align: center;
  text-shadow: 0 0 20px rgba(162, 0, 255, 0.5);
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

const LoginCard = styled(motion.div)`
  background: rgba(25, 25, 46, 0.8);
  padding: 2.5rem;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3),
    inset 0 4px 24px rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(12px) saturate(180%);
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;

  &::before {
    content: "";
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(
      45deg,
      transparent,
      rgba(106, 17, 203, 0.1),
      transparent
    );
    transform: rotate(45deg);
    animation: shine 6s infinite;
  }

  @keyframes shine {
    0% {
      transform: rotate(45deg) translateX(-50%);
    }
    100% {
      transform: rotate(45deg) translateX(50%);
    }
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const InputGroup = styled.div`
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  font-size: 1rem;
  color: #fff;
  transition: all 0.3s ease;

  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }

  &:focus {
    outline: none;
    border-color: #9d44b5;
    box-shadow: 0 0 0 3px rgba(157, 68, 181, 0.2);
    background: rgba(255, 255, 255, 0.08);
  }
`;

// Atualize o botão
const Button = styled(motion.button)`
  background: linear-gradient(135deg, #9d44b5 0%, #6a11cb 50%, #533483 100%);
  color: white;
  padding: 1rem;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.1),
      transparent
    );
    transition: 0.5s;
  }

  &:hover::before {
    left: 100%;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(157, 68, 181, 0.3);
  }
`;

// Componente do personagem animado
const Character = styled(motion.div).attrs({
  initial: { y: 20, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { duration: 0.8 },
})`
  position: absolute;
  bottom: 0;
  width: 150px;
  height: 150px;
  background: url("data:image/svg+xml;utf8,<svg ...>") no-repeat center; // SVG do personagem
  background-size: contain;

  @media (max-width: 768px) {
    display: none;
  }

  &:hover {
    transform: translateY(-10px);
  }
`;

const BackgroundOverlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  z-index: 1;
`;

// Animação das partículas
// Remova ou renomeie esta declaração
const Particles2 = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
`;
// Componente de partículas atualizado
const ParticlesBackground = () => {
  const particlesInit = async (engine) => {
    await loadFull(engine);
  };

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        background: { color: "transparent" },
        particles: {
          number: { value: 80, density: { enable: true, value_area: 800 } },
          color: { value: "#9D44B5" },
          shape: { type: "circle" },
          opacity: { value: 0.5 },
          size: { value: 3, random: true },
          move: {
            enable: true,
            speed: 2,
            direction: "none",
            random: false,
            straight: false,
            out_mode: "out",
            bounce: false,
          },
        },
        interactivity: {
          events: {
            onhover: { enable: true, mode: "repulse" },
            onclick: { enable: true, mode: "push" },
          },
          modes: {
            repulse: { distance: 100, duration: 0.4 },
            push: { particles_nb: 4 },
          },
        },
        retina_detect: true,
      }}
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        zIndex: 1,
      }}
    />
  );
};

const Login = () => {
  const navigate = useNavigate();

  const handleEnter = () => {
    navigate("/home");
  };
  return (
    <>
      <Background>
        <BackgroundOverlay />
        <ParticlesBackground />

        <ContentContainer>
          <Title
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            Aprenda + Tech
          </Title>
          <Character
            style={{ left: "10%" }}
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <LoginCard
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.98 }}
          >
            <Form>
              <InputGroup>
                <Input
                  type="email"
                  placeholder="E-mail"
                  aria-label="Email"
                  autoComplete="email"
                />
              </InputGroup>

              <InputGroup>
                <Input
                  type="password"
                  placeholder="Senha"
                  aria-label="Senha"
                  autoComplete="current-password"
                />
              </InputGroup>

              <Button
                onClick={handleEnter}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Entrar
              </Button>
            </Form>
          </LoginCard>
          <Character
            style={{ right: "10%" }}
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 4, repeat: Infinity, delay: 1 }}
          />
        </ContentContainer>
      </Background>
    </>
  );
};

export default Login;
