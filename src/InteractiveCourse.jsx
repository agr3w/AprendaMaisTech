import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import {
  FiTerminal,
  FiSmile,
  FiCheckCircle,
  FiCode,
  FiX,
} from "react-icons/fi";
import ReactConfetti from "react-confetti";
import { useNavigate } from "react-router-dom";

// Adicione esses novos componentes estilizados
const HeaderControls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0 1rem;
`;

const UserProgressWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

// Cores atualizadas
const colors = {
  background: "#1A1A2E",
  primary: "#6A11CB",
  secondary: "#9D44B5",
  terminal: "#2D2D4E",
  success: "#4CAF50",
  error: "#F44336",
  text: "#FFFFFF",
  code: "#C792EA",
};

const terminalColors = {
  success: "#4CAF50",
  error: "#F44336",
  warning: "#FFC107",
  info: "#2196F3",
};

const TerminalMessage = styled(motion.div)`
  padding: 1rem;
  border-radius: 6px;
  margin: 0.5rem 0;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-family: "Fira Code", monospace;

  ${(props) =>
    props.type === "success" &&
    `
    background: ${terminalColors.success}20;
    border-left: 4px solid ${terminalColors.success};
    color: ${terminalColors.success};
  `}

  ${(props) =>
    props.type === "error" &&
    `
    background: ${terminalColors.error}20;
    border-left: 4px solid ${terminalColors.error};
    color: ${terminalColors.error};
  `}

  ${(props) =>
    props.type === "hint" &&
    `
    background: ${terminalColors.warning}20;
    border-left: 4px solid ${terminalColors.warning};
    color: ${terminalColors.warning};
  `}
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: 280px 1fr;
  height: 100vh;
  background: ${colors.background};
  color: ${colors.text};
  font-family: "Fira Code", monospace;
`;

const Sidebar = styled.div`
  padding: 2rem;
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(0, 0, 0, 0.3);
`;

const IDEArea = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const EditorHeader = styled.div`
  padding: 1rem;
  background: ${colors.terminal};
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const CodeEditor = styled.div`
  flex: 1;
  padding: 2rem;
  position: relative;
  overflow: hidden;
`;

const Terminal = styled.div`
  background: ${colors.terminal};
  padding: 1.5rem;
  min-height: 200px;
  border-top: 3px solid ${colors.primary};
  position: relative;
`;

const CodeLine = styled.div`
  display: flex;
  gap: 1rem;
  margin: 0.5rem 0;
  align-items: center;
`;

const DragItem = styled(motion.div)`
  padding: 0.8rem 1.2rem;
  background: rgba(201, 146, 234, 0.1);
  border: 1px dashed ${colors.code};
  border-radius: 4px;
  cursor: grab;
  font-family: "Fira Code", monospace;
  color: ${colors.code};
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:active {
    cursor: grabbing;
  }
`;

const ProgressBadge = styled.div`
  position: relative;
  background: linear-gradient(45deg, ${colors.primary}, ${colors.secondary});
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 20px rgba(106, 17, 203, 0.3);

  span {
    font-size: 1.2rem;
    font-weight: bold;
    background: white;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const UserProgress = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  background: rgba(255, 255, 255, 0.05);
  padding: 0.8rem 1.5rem;
  border-radius: 30px;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const ProgressBar = styled.div`
  width: 120px;
  height: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  overflow: hidden;

  div {
    height: 100%;
    background: linear-gradient(90deg, ${colors.primary}, ${colors.secondary});
    transition: width 0.5s ease;
  }
`;

const NavButton = styled(motion.button)`
  background: rgba(255, 255, 255, 0.1);
  border: none;
  padding: 0.8rem 1.2rem;
  border-radius: 30px;
  color: white;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const courses = [
  {
    id: 1,
    name: "JavaScript Essentials",
    icon: <FiCode />,
    questions: [
      {
        type: "drag-code",
        question: "Complete a função para retornar a soma:",
        code: [
          { text: "function soma(a, b) {", static: true },
          { text: "    return ", static: false },
          { text: "}", static: true },
        ],
        correctAnswer: ["a + b"],
      },
    ],
  },
];

const options = ["a + b", "a - b", "a * b"];

export default function InteractiveCourse() {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [currentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [draggedItem, setDraggedItem] = useState(null);
  const [status, setStatus] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const navigate = useNavigate();
  const [userLevel] = useState(3); // Mock data - substituir por estado real
  const [xp, setXp] = useState(650); // Mock data
  const [currentXP] = useState(650);
  const xpToNextLevel = 1000;

  // Adicione esta função
  const handleBack = () => {
    navigate("/home");
  };

  const handleDragStart = (item) => {
    setDraggedItem(item);
  };

  const handleDragEnd = (event) => {
    const dropZone = document.getElementById("drop-zone");
    if (!dropZone) return;

    const dropZoneRect = dropZone.getBoundingClientRect();
    const cursorX = event.clientX;
    const cursorY = event.clientY;

    if (
      cursorX > dropZoneRect.left &&
      cursorX < dropZoneRect.right &&
      cursorY > dropZoneRect.top &&
      cursorY < dropZoneRect.bottom
    ) {
      if (!answers.includes(draggedItem)) {
        setAnswers((prev) => [...prev, draggedItem]);
      }
    }

    setDraggedItem(null);
  };

  const removeAnswer = (index) => {
    setAnswers((prev) => prev.filter((_, i) => i !== index));
  };

  // Modifique a função checkAnswer
  const checkAnswer = () => {
    const correctAnswer =
      courses[0].questions[currentQuestion].correctAnswer.join("");
    const isCorrect = answers.join("") === correctAnswer;

    if (isCorrect) {
      setStatus("success");
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } else {
      setStatus("error");
      setShowHint(false); // Resetar dica ao tentar novamente
    }
  };

  // Adicione esta função para mostrar dicas
  const handleShowHint = () => {
    setShowHint(true);
    setStatus("hint");
  };

  return (
    <Container>
      <Sidebar>
        <h2 style={{ display: "flex", gap: "0.5rem" }}>
          <FiTerminal /> Cursos
        </h2>
        {courses.map((course) => (
          <motion.div
            key={course.id}
            onClick={() => setSelectedCourse(course)}
            whileHover={{ scale: 1.02 }}
            style={{
              background:
                selectedCourse?.id === course.id
                  ? colors.terminal
                  : "transparent",
              padding: "1rem",
              borderRadius: "8px",
              margin: "0.5rem 0",
              cursor: "pointer",
            }}
          >
            <div style={{ display: "flex", gap: "1rem" }}>
              {course.icon}
              <div>
                <h3>{course.name}</h3>
                <small style={{ color: colors.code }}>Iniciante</small>
              </div>
            </div>
          </motion.div>
        ))}
      </Sidebar>

      <IDEArea>
        <EditorHeader>
          <HeaderControls>
            <NavButton onClick={handleBack} whileHover={{ scale: 1.05 }}>
              <FiX /> Voltar
            </NavButton>

            <UserProgressWrapper>
              <UserProgress>
                <ProgressBadge>
                  <span>Nv {userLevel}</span>
                </ProgressBadge>
                <div>
                  <div style={{ fontSize: "0.9em", marginBottom: "0.2rem" }}>
                    {xp} XP
                  </div>
                  <ProgressBar>
                    <div
                      style={{ width: `${(currentXP / xpToNextLevel) * 100}%` }}
                    />
                  </ProgressBar>
                </div>
              </UserProgress>

              <NavButton
                style={{ background: colors.secondary }}
                whileHover={{ scale: 1.05 }}
              >
                <FiSmile /> {userLevel * 150}
              </NavButton>
            </UserProgressWrapper>
          </HeaderControls>
        </EditorHeader>

        {selectedCourse ? (
          <>
            <CodeEditor>
              <div style={{ marginBottom: "2rem" }}>
                {courses[0].questions[currentQuestion].code.map(
                  (line, index) => (
                    <CodeLine key={index}>
                      <span style={{ color: colors.code }}>{index + 1}</span>
                      {line.static ? (
                        <span style={{ color: colors.code }}>{line.text}</span>
                      ) : (
                        <div
                          id="drop-zone"
                          style={{
                            display: "flex",
                            gap: "0.5rem",
                            minWidth: "200px",
                            minHeight: "40px",
                            background:
                              answers.length > 0
                                ? "transparent"
                                : "rgba(255,255,255,0.05)",
                            border:
                              answers.length > 0
                                ? "none"
                                : `2px dashed ${colors.secondary}`,
                            borderRadius: "4px",
                            padding: "0.5rem",
                          }}
                        >
                          {answers.map((item, i) => (
                            <motion.div
                              key={i}
                              style={{
                                position: "relative",
                                background: "rgba(201, 146, 234, 0.1)",
                                padding: "0.5rem",
                                borderRadius: "4px",
                              }}
                            >
                              {item}
                              <FiX
                                style={{
                                  position: "absolute",
                                  top: "-8px",
                                  right: "-8px",
                                  cursor: "pointer",
                                  background: colors.error,
                                  borderRadius: "50%",
                                  padding: "2px",
                                }}
                                onClick={() => removeAnswer(i)}
                              />
                            </motion.div>
                          ))}
                        </div>
                      )}
                    </CodeLine>
                  )
                )}
              </div>

              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                {options
                  .filter((opt) => !answers.includes(opt))
                  .map((option, i) => (
                    <DragItem
                      key={i}
                      drag
                      onDragStart={() => handleDragStart(option)}
                      onDragEnd={handleDragEnd}
                      whileHover={{ scale: 1.05 }}
                      dragSnapToOrigin={true}
                      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                    >
                      <FiSmile style={{ color: colors.secondary }} /> {option}
                    </DragItem>
                  ))}
              </div>
            </CodeEditor>

            <Terminal>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  marginBottom: "1rem",
                }}
              >
                <FiTerminal /> Terminal
              </div>

              <AnimatePresence>
                {status === "success" && (
                  <TerminalMessage
                    key="success"
                    type="success"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <FiCheckCircle />
                    <div>
                      <strong>✓ Sucesso!</strong>
                      <div style={{ fontSize: "0.9em" }}>
                        Todos os testes passaram!
                      </div>
                    </div>
                  </TerminalMessage>
                )}

                {status === "error" && (
                  <TerminalMessage
                    key="error"
                    type="error"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <FiX />
                    <div>
                      <strong>× Erro na execução!</strong>
                      <div style={{ fontSize: "0.9em" }}>
                        A saída não corresponde ao esperado
                      </div>
                    </div>
                  </TerminalMessage>
                )}

                {status === "hint" && (
                  <TerminalMessage
                    key="hint"
                    type="hint"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <FiSmile />
                    <div>
                      <strong>Dica Útil:</strong>
                      <div style={{ fontSize: "0.9em" }}>
                        Lembre-se que soma usa o operador '+'
                      </div>
                    </div>
                  </TerminalMessage>
                )}
              </AnimatePresence>

              <div style={{ marginTop: "1rem", display: "flex", gap: "1rem" }}>
                <motion.button
                  onClick={checkAnswer}
                  style={{
                    background: colors.primary,
                    border: "none",
                    padding: "0.5rem 1rem",
                    borderRadius: "4px",
                    color: "white",
                    cursor: "pointer",
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Executar Código
                </motion.button>

                {status === "error" && !showHint && (
                  <motion.button
                    onClick={handleShowHint}
                    style={{
                      background: terminalColors.warning,
                      border: "none",
                      padding: "0.5rem 1rem",
                      borderRadius: "4px",
                      color: "white",
                      cursor: "pointer",
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Precisa de Ajuda?
                  </motion.button>
                )}
              </div>
            </Terminal>
          </>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              gap: "1rem",
            }}
          >
            <FiCode size={64} style={{ color: colors.primary }} />
            <h2>Selecione um curso para começar</h2>
          </div>
        )}

        <AnimatePresence>
          {showSuccess && (
            <motion.div
              style={{
                position: "fixed",
                bottom: "2rem",
                right: "2rem",
                background: colors.success,
                padding: "1rem 2rem",
                borderRadius: "8px",
                display: "flex",
                gap: "0.5rem",
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
            >
              <FiCheckCircle /> Testes passaram com sucesso!
              <ReactConfetti
                width={200}
                height={200}
                recycle={false}
                numberOfPieces={100}
                style={{ position: "absolute", top: "-100px" }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </IDEArea>
    </Container>
  );
}
