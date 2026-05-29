"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function MovingNoButton({ onYes, question }) {
  const [attempts, setAttempts] = useState(0);

  const funnyMessages = [
    "Please no 😭", "I'm gonna cry 🥺", "Don't do this to me 💔",
    "This could be a mistake!", "Think again 😊"
  ];

  const handleNoInteraction = () => {
    setAttempts((prev) => prev + 1);
  };

  const getXPosition = () => {
    if (attempts === 0) return 0;
    return attempts % 2 === 1 ? -200 : 200;
  };

  return (
    <div style={{
      position: "relative",
      minHeight: "450px",
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
      fontFamily: "inherit"
    }}>
      {/* Question */}
      <h3 style={{ fontSize: "2.2rem", marginBottom: "2.5rem", fontWeight: "bold", color: "#333" }}>
        {question} 💖
      </h3>

      {/* YES Button - Persuasive Animation */}
      <motion.button
        onClick={onYes}
        // Heartbeat animation that gets slightly faster with attempts
        animate={{ 
          scale: [1, 1.05, 1],
          boxShadow: [
            "0 10px 20px rgba(255,107,157,0.2)",
            "0 15px 30px rgba(255,107,157,0.6)",
            "0 10px 20px rgba(255,107,157,0.2)"
          ]
        }}
        transition={{ 
          duration: attempts > 3 ? 0.5 : 0.8, // Pulsing speeds up as they try to say No
          repeat: Infinity,
          ease: "easeInOut"
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        style={{
          padding: "1.2rem 3.5rem",
          background: "linear-gradient(135deg, #ff6b9d, #ee5253)",
          color: "white",
          border: "none",
          borderRadius: "50px",
          fontSize: "1.4rem",
          fontWeight: "800",
          cursor: "pointer",
          zIndex: 10,
          marginBottom: "40px"
        }}
      >
        YES 💝
      </motion.button>

      {/* NO Button Area */}
      <div style={{ position: "relative", width: "100%", height: "120px", display: "flex", justifyContent: "center" }}>
        <motion.div
          animate={{ x: getXPosition() }}
          transition={{
            type: "spring",
            stiffness: 500, // Very fast snap
            damping: 25,
            mass: 0.5
          }}
          style={{ position: "absolute" }}
        >
          {/* Invisible trigger area (The "Repulsion" Zone) */}
          <div
            onMouseEnter={handleNoInteraction}
            style={{
              padding: "50px", 
              cursor: "not-allowed"
            }}
          >
            <motion.button
              style={{
                padding: "0.9rem 2rem",
                background: "white",
                border: "2px solid #ffccd5",
                borderRadius: "50px",
                color: "#ff8da1",
                fontWeight: "600",
                fontSize: "1.1rem",
                pointerEvents: "none", // Cursor cannot actually land on it
                boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
                minWidth: "130px"
              }}
            >
              {attempts === 0 ? "No" : funnyMessages[(attempts - 1) % funnyMessages.length]}
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Small subtle text below the "NO" movement */}
      {attempts > 0 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{ color: "#ff6b9d", fontSize: "0.85rem", marginTop: "10px", fontWeight: "500" }}
        >
          Clicking "Yes" is much easier! 😉
        </motion.p>
      )}
    </div>
  );
}