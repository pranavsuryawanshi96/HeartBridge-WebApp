"use client";

import { motion } from "framer-motion";
import MovingNoButton from "./MovingNoButton";

// Text Question Component
export const TextQuestion = ({ question, value, onChange }) => {
  return (
    <div style={{ marginBottom: "2rem" }}>
      <textarea
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Share your thoughts here... 💭"
        style={{
          width: "100%",
          minHeight: "180px",
          padding: "1.5rem",
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "20px",
          color: "#fff",
          fontSize: "1.1rem",
          outline: "none",
          resize: "vertical",
          fontFamily: "inherit",
          lineHeight: "1.8",
          transition: "all 0.3s ease"
        }}
        onFocus={(e) => {
          e.target.style.border = "1px solid rgba(233,30,99,0.5)";
          e.target.style.background = "rgba(255,255,255,0.08)";
        }}
        onBlur={(e) => {
          e.target.style.border = "1px solid rgba(255,255,255,0.1)";
          e.target.style.background = "rgba(255,255,255,0.05)";
        }}
      />
    </div>
  );
};

// Radio (Yes/No) Question Component
export const RadioQuestion = ({ question, value, onChange }) => {
  const options = ['Yes', 'No'];

  return (
    <div style={{ marginBottom: "2rem" }}>
      <div style={{
        display: "flex",
        gap: "1.5rem",
        justifyContent: "center",
        marginTop: "2rem"
      }}>
        {options.map((option) => (
          <motion.button
            key={option}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onChange(option)}
            style={{
              padding: "1.2rem 3rem",
              background: value === option
                ? option === 'Yes'
                  ? "linear-gradient(135deg, #4caf50, #45a049)"
                  : "linear-gradient(135deg, #f44336, #d32f2f)"
                : "rgba(255,255,255,0.05)",
              border: value === option
                ? "2px solid " + (option === 'Yes' ? "#4caf50" : "#f44336")
                : "1px solid rgba(255,255,255,0.1)",
              borderRadius: "50px",
              color: "#fff",
              fontSize: "1.3rem",
              fontWeight: "700",
              cursor: "pointer",
              transition: "all 0.3s ease",
              boxShadow: value === option
                ? `0 10px 30px ${option === 'Yes' ? 'rgba(76,175,80,0.4)' : 'rgba(244,67,54,0.4)'}`
                : "none"
            }}
          >
            {option === 'Yes' ? '💚 YES' : '💔 NO'}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

// Multiple Choice Question Component
export const MultipleChoiceQuestion = ({ question, value, onChange }) => {
  const options = question.options || [];

  return (
    <div style={{ marginBottom: "2rem" }}>
      <div style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        marginTop: "2rem"
      }}>
        {options.map((option, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.02, x: 5 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onChange(option)}
            style={{
              padding: "1.2rem 1.5rem",
              background: value === option
                ? "linear-gradient(135deg, #ff9800, #ff5722)"
                : "rgba(255,255,255,0.05)",
              border: value === option
                ? "2px solid rgba(255,152,0,0.5)"
                : "1px solid rgba(255,255,255,0.1)",
              borderRadius: "15px",
              color: "#fff",
              fontSize: "1.1rem",
              fontWeight: value === option ? "700" : "600",
              cursor: "pointer",
              transition: "all 0.3s ease",
              textAlign: "left",
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              boxShadow: value === option
                ? "0 5px 20px rgba(255,152,0,0.3)"
                : "none"
            }}
          >
            <div style={{
              width: "24px",
              height: "24px",
              borderRadius: "50%",
              background: value === option
                ? "#fff"
                : "rgba(255,255,255,0.1)",
              border: value === option
                ? "none"
                : "2px solid rgba(255,255,255,0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0
            }}>
              {value === option && (
                <div style={{
                  width: "12px",
                  height: "12px",
                  borderRadius: "50%",
                  background: "#ff9800"
                }} />
              )}
            </div>
            {option}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

// Special Question Component (Will You Marry Me)
export const SpecialQuestion = ({ question, value, onChange }) => {
  const handleYes = () => {
    onChange('Yes');
  };

  const handleNo = () => {
    onChange('No');
  };

  return (
    <div style={{ marginBottom: "2rem" }}>
      <MovingNoButton
        question={question.text}
        onYes={handleYes}
        onNo={handleNo}
      />
      {value && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{
            marginTop: "2rem",
            padding: "1.5rem",
            background: value === 'Yes'
              ? "rgba(76,175,80,0.2)"
              : "rgba(244,67,54,0.2)",
            border: `1px solid ${value === 'Yes' ? 'rgba(76,175,80,0.4)' : 'rgba(244,67,54,0.4)'}`,
            borderRadius: "20px",
            textAlign: "center",
            color: "#fff",
            fontSize: "1.2rem",
            fontWeight: "700"
          }}
        >
          {value === 'Yes' ? '💚 You said YES! 🎉' : '💔 You said No...'}
        </motion.div>
      )}
    </div>
  );
};

// Question Type Renderer
export const QuestionRenderer = ({ question, value, onChange }) => {
  switch (question.type) {
    case 'text':
      return <TextQuestion question={question} value={value} onChange={onChange} />;
    case 'radio':
      return <RadioQuestion question={question} value={value} onChange={onChange} />;
    case 'multiple':
      return <MultipleChoiceQuestion question={question} value={value} onChange={onChange} />;
    case 'special':
      return <SpecialQuestion question={question} value={value} onChange={onChange} />;
    default:
      return <TextQuestion question={question} value={value} onChange={onChange} />;
  }
};