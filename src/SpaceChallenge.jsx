import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import { FiBook, FiCheckCircle, FiHelpCircle, FiAward, FiX } from "react-icons/fi";
import ReactConfetti from "react-confetti";
import { useNavigate } from "react-router-dom";

const colors = {
  background: "#1A1A2E",
  primary: "#6A11CB",
  secondary: "#9D44B5",
  container: "#16213E",
  success: "#4CAF50",
  error: "#F44336",
  text: "#FFFFFF",
  highlight: "#9D44B5",
  accent: "#C792EA"
};

const Container = styled.div`
  min-height: 100vh;
  background: ${colors.background};
  padding: 2rem;
  color: ${colors.text};
  font-family: 'Inter', sans-serif;
`;

const ClassroomCard = styled.div`
  max-width: 800px;
  margin: 0 auto;
  background: ${colors.container};
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  border: 1px solid ${colors.primary}30;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid ${colors.primary}30;

  h1 {
    font-size: 1.8rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    color: ${colors.accent};
  }
`;

const ActivityItem = styled(motion.div)`
  padding: 1.5rem;
  margin: 1rem 0;
  background: ${colors.container};
  border: 1px solid ${colors.highlight}50;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px ${colors.accent}20;
  }
`;

const FeedbackMessage = styled(motion.div)`
  padding: 1rem;
  border-radius: 8px;
  margin: 1rem 0;
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 0.95rem;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: ${colors.primary}20;
  border-radius: 4px;
  margin: 1rem 0;
  overflow: hidden;

  div {
    height: 100%;
    background: ${colors.primary};
    border-radius: 4px;
    transition: width 0.3s ease;
  }
`;

const DragItem = styled(motion.div)`
  padding: 1.5rem;
  margin: 1rem 0;
  background: ${colors.container};
  border: 1px solid ${colors.highlight}50;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 1rem;
  user-select: none;
`;

const DragHandle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${colors.accent};
  cursor: grab;
  padding: 0.5rem;
  margin-right: 0.5rem;

  &:active {
    cursor: grabbing;
  }
`;


const pedagogicalActivities = [
  {
    id: 1,
    title: "Planejamento de Aula",
    objective: "Monte a sequência didática correta:",
    items: [
      { id: 1, text: "Definir objetivos de aprendizagem", correct: true },
      { id: 2, text: "Atividade de aquecimento", correct: true },
      { id: 3, text: "Avaliação diagnóstica inicial", correct: false },
      { id: 4, text: "Atividade prática guiada", correct: true },
      { id: 5, text: "Feedback individualizado", correct: true }
    ],
    correctOrder: [1, 2, 4, 5],
    maxAttempts: 3
  }
];

export default function PedagogicalActivity() {
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState([]);
  const [feedback, setFeedback] = useState(null);
  const [xp, setXp] = useState(450);
  const [attemptsRemaining, setAttemptsRemaining] = useState(
    pedagogicalActivities[0].maxAttempts
  );
  const [showSuccess, setShowSuccess] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const toggleItemSelection = (itemId) => {
    setSelectedItems((prev) => {
      if (prev.includes(itemId)) {
        return prev.filter((id) => id !== itemId);
      }
      return [...prev, itemId];
    });
  };

  const validateSequence = () => {
    if (attemptsRemaining === 0) {
      setFeedback("error");
      return;
    }

    const correct = JSON.stringify(selectedItems) === JSON.stringify(pedagogicalActivities[0].correctOrder);

    if (correct) {
      setXp((prev) => prev + 300);
      setFeedback("success");
      setShowSuccess(true);
      setTimeout(() => navigate("/educacao-completa"), 2000);
    } else {
      setAttemptsRemaining((prev) => prev - 1);
      setFeedback("error");
    }
  };

  return (
    <Container>
      <ClassroomCard>
        <Header>
          <h1>
            <FiBook size={28} />
            Prática Pedagógica
          </h1>
          <div>
            <div style={{ fontSize: "0.9em", color: colors.accent }}>XP</div>
            <div style={{ fontSize: "1.2em", fontWeight: "bold" }}>{xp}</div>
          </div>
        </Header>

        <h2 style={{ color: colors.primary }}>{pedagogicalActivities[0].title}</h2>
        <p>{pedagogicalActivities[0].objective}</p>

        {/* Instruções */}
        <div style={{ marginBottom: "1.5rem", color: colors.accent }}>
          <p>
            <strong>Instruções:</strong> Arraste os itens na ordem correta para montar uma sequência didática eficaz.
            Clique em um item para selecioná-lo. Você tem {attemptsRemaining} tentativas.
          </p>
          <div
            style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}
            onClick={() => setShowHint(!showHint)}
          >
            <FiHelpCircle size={18} />
            <span style={{ fontSize: "0.9em" }}>Dicas</span>
          </div>
          {showHint && (
            <div style={{ marginTop: "0.5rem", fontSize: "0.9em", color: colors.text }}>
              Dica: Comece definindo os objetivos de aprendizagem e termine com feedback individualizado.
            </div>
          )}
        </div>

        {/* Barra de progresso */}
        <ProgressBar>
          <div style={{ width: `${(attemptsRemaining / pedagogicalActivities[0].maxAttempts) * 100}%` }} />
        </ProgressBar>

        {/* Itens da atividade */}
        <div>
          {pedagogicalActivities[0].items.map((item) => (
            <ActivityItem
              key={item.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => toggleItemSelection(item.id)}
              style={{
                borderColor: selectedItems.includes(item.id)
                  ? item.correct
                    ? colors.success
                    : colors.error
                  : colors.highlight + "50",
                background: selectedItems.includes(item.id)
                  ? item.correct
                    ? colors.success + "15"
                    : colors.error + "15"
                  : colors.container
              }}
            >
              <span>{item.text}</span>
              {selectedItems.includes(item.id) && (
                <FiX
                  style={{
                    marginLeft: "auto",
                    cursor: "pointer",
                    color: colors.error
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleItemSelection(item.id);
                  }}
                />
              )}
            </ActivityItem>
          ))}
        </div>

        {/* Botão de validação */}
        <div style={{ marginTop: "2rem", textAlign: "center" }}>
          <motion.button
            onClick={validateSequence}
            style={{
              background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
              color: "white",
              padding: "1rem 2.5rem",
              borderRadius: "8px",
              cursor: "pointer"
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiCheckCircle size={20} />
            Validar Sequência
          </motion.button>
          <div style={{ marginTop: "1rem", color: colors.accent }}>
            Tentativas restantes: {attemptsRemaining}
          </div>
        </div>

        {/* Feedback */}
        <AnimatePresence>
          {feedback === "success" && (
            <>
              <ReactConfetti width={window.innerWidth} height={window.innerHeight} recycle={false} />
              <FeedbackMessage
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{ background: colors.success + "15", borderLeft: `4px solid ${colors.success}` }}
              >
                <FiAward color={colors.success} size={24} />
                <strong>Parabéns! Você acertou!</strong>
              </FeedbackMessage>
            </>
          )}

          {feedback === "error" && (
            <FeedbackMessage
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ background: colors.error + "15", borderLeft: `4px solid ${colors.error}` }}
            >
              <FiX color={colors.error} size={24} />
              <strong>Tente novamente! Verifique a ordem dos itens.</strong>
            </FeedbackMessage>
          )}
        </AnimatePresence>
      </ClassroomCard>
    </Container>
  );
}