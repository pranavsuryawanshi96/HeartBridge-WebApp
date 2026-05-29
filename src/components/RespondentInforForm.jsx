"use client";

import { motion } from "framer-motion";
import { FaUser, FaCalendar, FaVenusMars, FaHeart, FaPhone } from "react-icons/fa";

export default function RespondentInfoForm({ info, onChange, onSubmit }) {
  const handleChange = (field, value) => {
    onChange({ ...info, [field]: value });
  };

  const isFormComplete = () => {
    return info.name && info.age && info.gender && info.relation && info.mobile;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      style={{
        background: "rgba(255,255,255,0.05)",
        backdropFilter: "blur(20px)",
        padding: "3rem 2.5rem",
        borderRadius: "30px",
        border: "1px solid rgba(255,255,255,0.1)",
        boxShadow: "0 30px 80px rgba(0,0,0,0.4)",
        maxWidth: "600px",
        margin: "0 auto"
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ fontSize: "4rem", marginBottom: "1rem" }}
        >
          👋
        </motion.div>
        <h2 style={{
          fontSize: "2rem",
          marginBottom: "0.5rem",
          background: "linear-gradient(135deg, #fff, #ff9800)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          fontWeight: "800"
        }}>
          Tell Us About Yourself
        </h2>
        <p style={{ color: "#b0b0b0", fontSize: "1rem" }}>
          So we can share your answers with the person who sent this ❤️
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        
        {/* Name */}
        <div>
          <label style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            marginBottom: "0.5rem",
            color: "#b0b0b0",
            fontSize: "0.9rem",
            fontWeight: "600"
          }}>
            <FaUser style={{ color: "#ff9800" }} />
            Your Name *
          </label>
          <input
            type="text"
            value={info.name}
            onChange={(e) => handleChange('name', e.target.value)}
            placeholder="e.g., Alex Johnson"
            required
            style={{
              width: "100%",
              padding: "1rem 1.2rem",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "15px",
              color: "#fff",
              fontSize: "1rem",
              outline: "none",
              transition: "all 0.3s ease"
            }}
            onFocus={(e) => {
              e.target.style.border = "1px solid rgba(255,152,0,0.5)";
              e.target.style.background = "rgba(255,255,255,0.08)";
            }}
            onBlur={(e) => {
              e.target.style.border = "1px solid rgba(255,255,255,0.1)";
              e.target.style.background = "rgba(255,255,255,0.05)";
            }}
          />
        </div>

        {/* Age */}
        <div>
          <label style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            marginBottom: "0.5rem",
            color: "#b0b0b0",
            fontSize: "0.9rem",
            fontWeight: "600"
          }}>
            <FaCalendar style={{ color: "#03a9f4" }} />
            Your Age *
          </label>
          <input
            type="number"
            value={info.age}
            onChange={(e) => handleChange('age', e.target.value)}
            placeholder="e.g., 25"
            min="1"
            max="120"
            required
            style={{
              width: "100%",
              padding: "1rem 1.2rem",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "15px",
              color: "#fff",
              fontSize: "1rem",
              outline: "none",
              transition: "all 0.3s ease"
            }}
            onFocus={(e) => {
              e.target.style.border = "1px solid rgba(3,169,244,0.5)";
              e.target.style.background = "rgba(255,255,255,0.08)";
            }}
            onBlur={(e) => {
              e.target.style.border = "1px solid rgba(255,255,255,0.1)";
              e.target.style.background = "rgba(255,255,255,0.05)";
            }}
          />
        </div>

        {/* Gender */}
        <div>
          <label style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            marginBottom: "0.5rem",
            color: "#b0b0b0",
            fontSize: "0.9rem",
            fontWeight: "600"
          }}>
            <FaVenusMars style={{ color: "#e91e63" }} />
            Gender *
          </label>
          <select
            value={info.gender}
            onChange={(e) => handleChange('gender', e.target.value)}
            required
            style={{
              width: "100%",
              padding: "1rem 1.2rem",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "15px",
              color: info.gender ? "#fff" : "#666",
              fontSize: "1rem",
              outline: "none",
              cursor: "pointer",
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
          >
            <option value="" style={{ background: "#1a1a2e" }}>Select Gender</option>
            <option value="Male" style={{ background: "#1a1a2e" }}>Male</option>
            <option value="Female" style={{ background: "#1a1a2e" }}>Female</option>
            <option value="Other" style={{ background: "#1a1a2e" }}>Other</option>
            <option value="Prefer not to say" style={{ background: "#1a1a2e" }}>Prefer not to say</option>
          </select>
        </div>

        {/* Relation */}
        <div>
          <label style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            marginBottom: "0.5rem",
            color: "#b0b0b0",
            fontSize: "0.9rem",
            fontWeight: "600"
          }}>
            <FaHeart style={{ color: "#ff9800" }} />
            Relationship to Sender *
          </label>
          <select
            value={info.relation}
            onChange={(e) => handleChange('relation', e.target.value)}
            required
            style={{
              width: "100%",
              padding: "1rem 1.2rem",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "15px",
              color: info.relation ? "#fff" : "#666",
              fontSize: "1rem",
              outline: "none",
              cursor: "pointer",
              transition: "all 0.3s ease"
            }}
            onFocus={(e) => {
              e.target.style.border = "1px solid rgba(255,152,0,0.5)";
              e.target.style.background = "rgba(255,255,255,0.08)";
            }}
            onBlur={(e) => {
              e.target.style.border = "1px solid rgba(255,255,255,0.1)";
              e.target.style.background = "rgba(255,255,255,0.05)";
            }}
          >
            <option value="" style={{ background: "#1a1a2e" }}>Select Relationship</option>
            <option value="Partner" style={{ background: "#1a1a2e" }}>💑 Partner / Spouse</option>
            <option value="Friend" style={{ background: "#1a1a2e" }}>👫 Friend</option>
            <option value="Best Friend" style={{ background: "#1a1a2e" }}>🤝 Best Friend</option>
            <option value="Family" style={{ background: "#1a1a2e" }}>👨‍👩‍👧‍👦 Family Member</option>
            <option value="Parent" style={{ background: "#1a1a2e" }}>👨‍👩 Parent</option>
            <option value="Sibling" style={{ background: "#1a1a2e" }}>👫 Sibling</option>
            <option value="Colleague" style={{ background: "#1a1a2e" }}>💼 Colleague</option>
            <option value="Other" style={{ background: "#1a1a2e" }}>🌟 Other</option>
          </select>
        </div>

        {/* Mobile */}
        <div>
          <label style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            marginBottom: "0.5rem",
            color: "#b0b0b0",
            fontSize: "0.9rem",
            fontWeight: "600"
          }}>
            <FaPhone style={{ color: "#4caf50" }} />
            Mobile Number *
          </label>
          <input
            type="tel"
            value={info.mobile}
            onChange={(e) => handleChange('mobile', e.target.value)}
            placeholder="e.g., +1 234 567 8900"
            required
            style={{
              width: "100%",
              padding: "1rem 1.2rem",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "15px",
              color: "#fff",
              fontSize: "1rem",
              outline: "none",
              transition: "all 0.3s ease"
            }}
            onFocus={(e) => {
              e.target.style.border = "1px solid rgba(76,175,80,0.5)";
              e.target.style.background = "rgba(255,255,255,0.08)";
            }}
            onBlur={(e) => {
              e.target.style.border = "1px solid rgba(255,255,255,0.1)";
              e.target.style.background = "rgba(255,255,255,0.05)";
            }}
          />
        </div>

      </div>

      {/* Submit Button */}
      <motion.button
        whileHover={{ scale: isFormComplete() ? 1.02 : 1 }}
        whileTap={{ scale: isFormComplete() ? 0.98 : 1 }}
        onClick={onSubmit}
        disabled={!isFormComplete()}
        style={{
          width: "100%",
          marginTop: "2rem",
          padding: "1.2rem",
          background: isFormComplete()
            ? "linear-gradient(135deg, #ff9800, #ff5722)"
            : "rgba(255,255,255,0.1)",
          border: "none",
          borderRadius: "15px",
          color: isFormComplete() ? "#fff" : "#666",
          fontSize: "1.1rem",
          fontWeight: "700",
          cursor: isFormComplete() ? "pointer" : "not-allowed",
          boxShadow: isFormComplete()
            ? "0 10px 30px rgba(255,152,0,0.3)"
            : "none",
          transition: "all 0.3s ease"
        }}
      >
        {isFormComplete() ? "Continue to Questions ✨" : "Please fill all fields"}
      </motion.button>

      <p style={{
        marginTop: "1.5rem",
        textAlign: "center",
        color: "#666",
        fontSize: "0.85rem"
      }}>
        🔒 Your information will only be shared with the person who sent this
      </p>
    </motion.div>
  );
}