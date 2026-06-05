import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import {
  FaPlus,
  FaTrash,
  FaLink,
  FaCopy,
  FaHeart,
  FaCheck,
  FaPaperPlane,
  FaQuestionCircle,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useQuestionStore } from "@/store/useStore";
import { createQuestionSet } from "@/lib/db";

export default function Home() {
  const {
    creatorName,
    recipientName,
    questions,
    addQuestion,
    removeQuestion,
    setCreatorName,
    setRecipientName,
    getQuestionData,
  } = useQuestionStore();

  const [currentQuestion, setCurrentQuestion] = useState("");
  const [creatorNameInput, setCreatorNameInput] = useState(creatorName);
  const [recipientNameInput, setRecipientNameInput] = useState(recipientName);
  const [errors, setErrors] = useState({});
  const [questionType, setQuestionType] = useState("text");
  const [multipleOptions, setMultipleOptions] = useState(["", ""]);
  const [generatedLink, setGeneratedLink] = useState("");
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const canvasRef = useRef(null);

  // Particle background animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 50;

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        this.opacity = Math.random() * 0.5 + 0.2;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }

      draw() {
        ctx.fillStyle = `rgba(255, 152, 0, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });
      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Add question
  const handleAddQuestion = () => {
    const newErrors = {};
    const savedCreatorName = creatorNameInput.trim() || creatorName.trim();
    const savedRecipientName =
      recipientNameInput.trim() || recipientName.trim();

    if (!savedCreatorName) {
      newErrors.creatorName = "Please enter your name";
    }

    if (!savedRecipientName) {
      newErrors.recipientName = "Please enter who this is for";
    }

    if (!currentQuestion.trim()) {
      newErrors.currentQuestion = "Please enter your question";
    }
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    if (currentQuestion.trim()) {
      const questionData = {
        text: currentQuestion,
        type: questionType,
        options:
          questionType === "multiple"
            ? multipleOptions.filter((opt) => opt.trim())
            : [],
      };

      setCreatorName(savedCreatorName);
      setRecipientName(savedRecipientName);
      addQuestion(questionData);
      setCreatorNameInput("");
      setRecipientNameInput("");
      setCurrentQuestion("");
      setQuestionType("text");
      setMultipleOptions(["", ""]);
      setErrors({});
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
    }
  };

  // Add option for multiple choice
  const addOption = () => {
    setMultipleOptions([...multipleOptions, ""]);
  };

  // Update option
  const updateOption = (index, value) => {
    const newOptions = [...multipleOptions];
    newOptions[index] = value;
    setMultipleOptions(newOptions);
  };

  // Remove option
  const removeOption = (index) => {
    if (multipleOptions.length > 2) {
      setMultipleOptions(multipleOptions.filter((_, i) => i !== index));
    }
  };

  // Generate link
  const generateLink = async () => {
    if (questions.length === 0) {
      alert("Please add at least one question!");
      return;
    }
    if (!creatorName.trim()) {
      alert("Please enter your name!");
      return;
    }
    if (!recipientName.trim()) {
      alert("Please enter recipient's name!");
      return;
    }

    setLoading(true);

    try {
      const questionData = getQuestionData();
      console.log("📋 Question data being sent:", questionData); // Debug log

      const result = await createQuestionSet(questionData);

      if (result.success) {
        const appUrl = import.meta.env.VITE_APP_URL || window.location.origin;
        const link = `${appUrl}/answer/${result.uniqueId}`;
        setGeneratedLink(link);
        setShowLinkModal(true);
      } else {
        const message = [result.error, result.solution]
          .filter(Boolean)
          .join("\n\n");
        alert(message || "Error generating link. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error generating link. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Copy link
  const copyLink = () => {
    navigator.clipboard.writeText(generatedLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const questionTypes = [
    { value: "text", label: "📝 Text Answer", icon: "✍️" },
    { value: "radio", label: "✅ Yes/No", icon: "🔘" },
    { value: "multiple", label: "📋 Multiple Choice", icon: "☑️" },
    { value: "special", label: "💍 Will You Marry Me?", icon: "💑" },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)",
        color: "#fff",
        fontFamily: "'Inter', 'Poppins', sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Animated Canvas Background */}
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      {/* Gradient Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          position: "fixed",
          top: "10%",
          right: "15%",
          width: "300px",
          height: "300px",
          background:
            "radial-gradient(circle, rgba(255,152,0,0.4) 0%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(60px)",
          zIndex: 0,
        }}
      />

      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        style={{
          position: "fixed",
          bottom: "10%",
          left: "10%",
          width: "350px",
          height: "350px",
          background:
            "radial-gradient(circle, rgba(3,169,244,0.3) 0%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(70px)",
          zIndex: 0,
        }}
      />

      {/* Navigation */}
      <nav
        style={{
          position: "relative",
          zIndex: 10,
          padding: "1.5rem 2rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <Link
          to="/"
          style={{
            textDecoration: "none",
          }}
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            style={{
              fontSize: "2.15rem",
              fontWeight: "800",
              background: "linear-gradient(135deg, #ff9800, #03a9f4)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "1.25rem",
              cursor: "pointer",
            }}
          >
            <img
              src="/heartbridge_logo.png"
              alt="HeartBridge Logo"
              style={{
                width: "68px",
                height: "38px",
                objectFit: "contain",
                display: "block",
              }}
            />
            HeartBridge
          </motion.div>
        </Link>

        <div style={{ display: "flex", gap: "1.5rem" }}>
          <Link
            to="/about"
            style={{
              color: "#fff",
              textDecoration: "none",
              padding: "0.5rem 1.5rem",
              borderRadius: "25px",
              border: "1px solid rgba(255,255,255,0.2)",
              transition: "all 0.3s ease",
            }}
          >
            About
          </Link>
          <Link
            to="/"
            style={{
              color: "#fff",
              textDecoration: "none",
              padding: "0.5rem 1.5rem",
              borderRadius: "25px",
              border: "1px solid rgba(255,255,255,0.2)",
              transition: "all 0.3s ease",
            }}
          >
            Updates
          </Link>
          <Link
            to="/dashboard"
            style={{
              color: "#fff",
              textDecoration: "none",
              padding: "0.5rem 1.5rem",
              borderRadius: "25px",
              background: "linear-gradient(135deg, #ff9800, #ff5722)",
              transition: "all 0.3s ease",
            }}
          >
            Dashboard
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "3rem 2rem",
        }}
      >
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            textAlign: "center",
            marginBottom: "3rem",
          }}
        >
          <h1
            style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: "900",
              marginBottom: "1rem",
              background:
                "linear-gradient(135deg, #fff 0%, #ff9800 50%, #03a9f4 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              lineHeight: "1.2",
            }}
          >
            Ask Questions That Matter
          </h1>
          <p
            style={{
              fontSize: "clamp(1rem, 2vw, 1.3rem)",
              color: "#b0b0b0",
              maxWidth: "700px",
              margin: "0 auto",
            }}
          >
            Create meaningful questions, share them with loved ones, and
            discover deeper connections through their heartfelt answers.
          </p>
        </motion.div>

        {/* Main Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
            gap: "2rem",
            marginBottom: "3rem",
          }}
        >
          {/* Question Creation Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{
              background: "rgba(255,255,255,0.05)",
              backdropFilter: "blur(10px)",
              padding: "2.5rem",
              borderRadius: "25px",
              border: "1px solid rgba(255,255,255,0.1)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                marginBottom: "2rem",
              }}
            >
              <FaQuestionCircle
                style={{ fontSize: "2rem", color: "#ff9800" }}
              />
              <h2 style={{ fontSize: "1.8rem", fontWeight: "700" }}>
                Create Questions
              </h2>
            </div>

            {/* Creator Name */}
            <div style={{ marginBottom: "1.5rem" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  color: "#b0b0b0",
                  fontSize: "0.9rem",
                }}
              >
                {errors.creatorName && (
                  <p
                    style={{
                      color: "#ff6b6b",
                      marginTop: "0.5rem",
                      fontSize: "0.85rem",
                    }}
                  >
                    {errors.creatorName}
                  </p>
                )}
                Your Name 👤
              </label>
              <input
                type="text"
                value={creatorNameInput}
                onChange={(e) => {
                  setCreatorNameInput(e.target.value);
                  setErrors((currentErrors) => ({
                    ...currentErrors,
                    creatorName: "",
                  }));
                }}
                placeholder="e.g., John, Sarah, Alex..."
                style={{
                  width: "100%",
                  padding: "1rem",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "15px",
                  color: "#fff",
                  fontSize: "1rem",
                  outline: "none",
                  transition: "all 0.3s ease",
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

            {/* Recipient Name */}
            <div style={{ marginBottom: "1.5rem" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  color: "#b0b0b0",
                  fontSize: "0.9rem",
                }}
              >
                Who is this for? ❤️
                {errors.recipientName && (
                  <p
                    style={{
                      color: "#ff6b6b",
                      marginTop: "0.5rem",
                      fontSize: "0.85rem",
                    }}
                  >
                    {errors.recipientName}
                  </p>
                )}
              </label>
              <input
                type="text"
                value={recipientNameInput}
                onChange={(e) => {
                  setRecipientNameInput(e.target.value);
                  setErrors((currentErrors) => ({
                    ...currentErrors,
                    recipientName: "",
                  }));
                }}
                placeholder="e.g., Sarah, Mom, Best Friend..."
                style={{
                  width: "100%",
                  padding: "1rem",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "15px",
                  color: "#fff",
                  fontSize: "1rem",
                  outline: "none",
                  transition: "all 0.3s ease",
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

            {/* Question Type Selector */}
            <div style={{ marginBottom: "1.5rem" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  color: "#b0b0b0",
                  fontSize: "0.9rem",
                }}
              >
                Question Type
              </label>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: "0.8rem",
                }}
              >
                {questionTypes.map((type) => (
                  <motion.button
                    key={type.value}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setQuestionType(type.value)}
                    style={{
                      padding: "0.8rem",
                      background:
                        questionType === type.value
                          ? "linear-gradient(135deg, #ff9800, #ff5722)"
                          : "rgba(255,255,255,0.05)",
                      border:
                        questionType === type.value
                          ? "1px solid rgba(255,152,0,0.5)"
                          : "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "12px",
                      color: "#fff",
                      fontSize: "0.85rem",
                      fontWeight: questionType === type.value ? "700" : "600",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <span style={{ fontSize: "1.2rem" }}>{type.icon}</span>
                    <span>{type.label.split(" ").slice(1).join(" ")}</span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Question Input */}
            <div style={{ marginBottom: "1.5rem" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  color: "#b0b0b0",
                  fontSize: "0.9rem",
                }}
              >
                Your Question
              </label>
              <textarea
                value={currentQuestion}
                onChange={(e) => setCurrentQuestion(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleAddQuestion();
                  }
                }}
                placeholder={
                  questionType === "special"
                    ? "Will you marry me?"
                    : questionType === "radio"
                      ? "Do you love me?"
                      : questionType === "multiple"
                        ? "What's your favorite color?"
                        : "e.g., What's your favorite memory of us?"
                }
                style={{
                  width: "100%",
                  minHeight: "100px",
                  padding: "1rem",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "15px",
                  color: "#fff",
                  fontSize: "1rem",
                  outline: "none",
                  resize: "vertical",
                  fontFamily: "inherit",
                  transition: "all 0.3s ease",
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

            {/* Multiple Choice Options */}
            {questionType === "multiple" && (
              <div style={{ marginBottom: "1.5rem" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "0.5rem",
                    color: "#b0b0b0",
                    fontSize: "0.9rem",
                  }}
                >
                  Options
                </label>
                {multipleOptions.map((option, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      gap: "0.5rem",
                      marginBottom: "0.5rem",
                    }}
                  >
                    <input
                      type="text"
                      value={option}
                      onChange={(e) => updateOption(index, e.target.value)}
                      placeholder={`Option ${index + 1}`}
                      style={{
                        flex: 1,
                        padding: "0.8rem",
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: "10px",
                        color: "#fff",
                        fontSize: "0.9rem",
                        outline: "none",
                      }}
                    />
                    {multipleOptions.length > 2 && (
                      <button
                        onClick={() => removeOption(index)}
                        style={{
                          padding: "0.8rem",
                          background: "rgba(244,67,54,0.2)",
                          border: "none",
                          borderRadius: "10px",
                          color: "#f44336",
                          cursor: "pointer",
                        }}
                      >
                        <FaTrash />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  onClick={addOption}
                  style={{
                    width: "100%",
                    padding: "0.8rem",
                    background: "rgba(3,169,244,0.2)",
                    border: "1px dashed rgba(3,169,244,0.5)",
                    borderRadius: "10px",
                    color: "#03a9f4",
                    fontSize: "0.9rem",
                    cursor: "pointer",
                    marginTop: "0.5rem",
                  }}
                >
                  + Add Option
                </button>
              </div>
            )}

            {/* Add Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleAddQuestion}
              style={{
                width: "100%",
                padding: "1rem",
                background: "linear-gradient(135deg, #ff9800, #ff5722)",
                border: "none",
                borderRadius: "15px",
                color: "#fff",
                fontSize: "1.1rem",
                fontWeight: "700",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
                boxShadow: "0 10px 30px rgba(255,152,0,0.3)",
                transition: "all 0.3s ease",
              }}
            >
              <FaPlus /> Add Question
            </motion.button>

            {/* Success Message */}
            <AnimatePresence>
              {showSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  style={{
                    marginTop: "1rem",
                    padding: "0.8rem",
                    background: "rgba(76,175,80,0.2)",
                    border: "1px solid rgba(76,175,80,0.4)",
                    borderRadius: "10px",
                    color: "#4caf50",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    fontSize: "0.9rem",
                  }}
                >
                  <FaCheck /> Question added successfully!
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Questions List Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{
              background: "rgba(255,255,255,0.05)",
              backdropFilter: "blur(10px)",
              padding: "2.5rem",
              borderRadius: "25px",
              border: "1px solid rgba(255,255,255,0.1)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "2rem",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "1rem" }}
              >
                <FaHeart style={{ fontSize: "2rem", color: "#e91e63" }} />
                <h2 style={{ fontSize: "1.8rem", fontWeight: "700" }}>
                  Your Questions
                </h2>
              </div>
              <div
                style={{
                  background: "rgba(255,152,0,0.2)",
                  padding: "0.5rem 1rem",
                  borderRadius: "20px",
                  fontSize: "0.9rem",
                  fontWeight: "600",
                  color: "#ff9800",
                }}
              >
                {questions.length}{" "}
                {questions.length === 1 ? "question" : "questions"}
              </div>
            </div>

            {/* Questions List */}
            <div
              style={{
                maxHeight: "400px",
                overflowY: "auto",
                marginBottom: "1.5rem",
                paddingRight: "0.5rem",
              }}
            >
              <AnimatePresence>
                {questions.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    style={{
                      textAlign: "center",
                      padding: "3rem 1rem",
                      color: "#666",
                    }}
                  >
                    <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>
                      📝
                    </div>
                    <p>No questions yet. Start adding some!</p>
                  </motion.div>
                ) : (
                  questions.map((question, index) => (
                    <motion.div
                      key={question.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                      style={{
                        background: "rgba(255,255,255,0.05)",
                        padding: "1.2rem",
                        borderRadius: "15px",
                        marginBottom: "1rem",
                        border: "1px solid rgba(255,255,255,0.1)",
                        transition: "all 0.3s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background =
                          "rgba(255,255,255,0.08)";
                        e.currentTarget.style.border =
                          "1px solid rgba(255,152,0,0.3)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background =
                          "rgba(255,255,255,0.05)";
                        e.currentTarget.style.border =
                          "1px solid rgba(255,255,255,0.1)";
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "start",
                          gap: "1rem",
                        }}
                      >
                        <div
                          style={{
                            minWidth: "30px",
                            height: "30px",
                            background:
                              "linear-gradient(135deg, #ff9800, #ff5722)",
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "0.9rem",
                            fontWeight: "700",
                            flexShrink: 0,
                          }}
                        >
                          {index + 1}
                        </div>
                        <div style={{ flex: 1 }}>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "0.5rem",
                              marginBottom: "0.5rem",
                            }}
                          >
                            <span style={{ fontSize: "1.2rem" }}>
                              {question.type === "text" && "📝"}
                              {question.type === "radio" && "✅"}
                              {question.type === "multiple" && "📋"}
                              {question.type === "special" && "💍"}
                            </span>
                            <span
                              style={{
                                fontSize: "0.75rem",
                                color: "#999",
                                background: "rgba(255,255,255,0.1)",
                                padding: "0.2rem 0.6rem",
                                borderRadius: "10px",
                              }}
                            >
                              {question.type === "text" && "Text"}
                              {question.type === "radio" && "Yes/No"}
                              {question.type === "multiple" &&
                                "Multiple Choice"}
                              {question.type === "special" && "Special"}
                            </span>
                          </div>
                          <p
                            style={{
                              margin: 0,
                              lineHeight: "1.6",
                              fontSize: "1rem",
                              color: "#e0e0e0",
                              marginBottom:
                                question.options?.length > 0 ? "0.5rem" : 0,
                            }}
                          >
                            {question.text}
                          </p>
                          {question.options && question.options.length > 0 && (
                            <div
                              style={{
                                fontSize: "0.85rem",
                                color: "#999",
                                marginTop: "0.5rem",
                              }}
                            >
                              Options: {question.options.join(", ")}
                            </div>
                          )}
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => removeQuestion(question.id)}
                          style={{
                            background: "rgba(244,67,54,0.2)",
                            border: "none",
                            borderRadius: "50%",
                            width: "35px",
                            height: "35px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                            color: "#f44336",
                            fontSize: "1rem",
                            transition: "all 0.3s ease",
                            flexShrink: 0,
                          }}
                        >
                          <FaTrash />
                        </motion.button>
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>

            {/* Generate Link Button */}
            {questions.length > 0 && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={generateLink}
                disabled={loading}
                style={{
                  width: "100%",
                  padding: "1.2rem",
                  background: loading
                    ? "rgba(3,169,244,0.5)"
                    : "linear-gradient(135deg, #03a9f4, #0288d1)",
                  border: "none",
                  borderRadius: "15px",
                  color: "#fff",
                  fontSize: "1.1rem",
                  fontWeight: "700",
                  cursor: loading ? "not-allowed" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                  boxShadow: "0 10px 30px rgba(3,169,244,0.3)",
                  transition: "all 0.3s ease",
                }}
              >
                {loading ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      ⏳
                    </motion.div>
                    Generating...
                  </>
                ) : (
                  <>
                    <FaPaperPlane /> Generate & Share Link
                  </>
                )}
              </motion.button>
            )}
          </motion.div>
        </div>

        {/* Quick Tips */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          style={{
            background: "rgba(255,255,255,0.05)",
            backdropFilter: "blur(10px)",
            padding: "2rem",
            borderRadius: "25px",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <h3
            style={{
              fontSize: "1.5rem",
              marginBottom: "1.5rem",
              color: "#ff9800",
              fontWeight: "700",
            }}
          >
            💡 Quick Tips
          </h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "1.5rem",
            }}
          >
            <div>
              <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>✍️</div>
              <h4 style={{ marginBottom: "0.5rem", color: "#fff" }}>
                Be Specific
              </h4>
              <p
                style={{ color: "#999", fontSize: "0.9rem", lineHeight: "1.6" }}
              >
                Instead of "How are you?", try "What made you smile today?"
              </p>
            </div>
            <div>
              <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>🤔</div>
              <h4 style={{ marginBottom: "0.5rem", color: "#fff" }}>
                Open-Ended
              </h4>
              <p
                style={{ color: "#999", fontSize: "0.9rem", lineHeight: "1.6" }}
              >
                Avoid yes/no questions for text answers. Let them share stories
                and feelings.
              </p>
            </div>
            <div>
              <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>💖</div>
              <h4 style={{ marginBottom: "0.5rem", color: "#fff" }}>
                Be Genuine
              </h4>
              <p
                style={{ color: "#999", fontSize: "0.9rem", lineHeight: "1.6" }}
              >
                Ask what you truly want to know. Curiosity builds connection.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Link Generation Modal */}
      <AnimatePresence>
        {showLinkModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowLinkModal(false)}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "rgba(0,0,0,0.8)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1000,
              padding: "2rem",
            }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background:
                  "linear-gradient(135deg, rgba(26,26,46,0.98), rgba(22,33,62,0.98))",
                backdropFilter: "blur(20px)",
                padding: "3rem",
                borderRadius: "30px",
                border: "2px solid rgba(255,152,0,0.3)",
                maxWidth: "600px",
                width: "100%",
                boxShadow: "0 30px 80px rgba(255,152,0,0.3)",
              }}
            >
              <div style={{ textAlign: "center", marginBottom: "2rem" }}>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  style={{ fontSize: "4rem", marginBottom: "1rem" }}
                >
                  🎉
                </motion.div>
                <h2
                  style={{
                    fontSize: "2rem",
                    marginBottom: "1rem",
                    background: "linear-gradient(135deg, #ff9800, #03a9f4)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    fontWeight: "800",
                  }}
                >
                  Your Link is Ready!
                </h2>
                <p style={{ color: "#b0b0b0", fontSize: "1.1rem" }}>
                  Share this link with{" "}
                  <strong style={{ color: "#ff9800" }}>{recipientName}</strong>{" "}
                  and wait for their heartfelt answers! 💝
                </p>
              </div>

              <div
                style={{
                  background: "rgba(255,255,255,0.05)",
                  padding: "1.5rem",
                  borderRadius: "15px",
                  border: "1px solid rgba(255,255,255,0.1)",
                  marginBottom: "2rem",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                  }}
                >
                  <FaLink style={{ fontSize: "1.5rem", color: "#03a9f4" }} />
                  <input
                    type="text"
                    value={generatedLink}
                    readOnly
                    style={{
                      flex: 1,
                      background: "transparent",
                      border: "none",
                      color: "#fff",
                      fontSize: "0.95rem",
                      outline: "none",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  />
                </div>
              </div>

              <div style={{ display: "flex", gap: "1rem" }}>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={copyLink}
                  style={{
                    flex: 1,
                    padding: "1rem",
                    background: copied
                      ? "linear-gradient(135deg, #4caf50, #388e3c)"
                      : "linear-gradient(135deg, #ff9800, #ff5722)",
                    border: "none",
                    borderRadius: "15px",
                    color: "#fff",
                    fontSize: "1.1rem",
                    fontWeight: "700",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                    transition: "all 0.3s ease",
                  }}
                >
                  {copied ? (
                    <>
                      <FaCheck /> Copied!
                    </>
                  ) : (
                    <>
                      <FaCopy /> Copy Link
                    </>
                  )}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowLinkModal(false)}
                  style={{
                    padding: "1rem 2rem",
                    background: "transparent",
                    border: "2px solid rgba(255,255,255,0.2)",
                    borderRadius: "15px",
                    color: "#fff",
                    fontSize: "1.1rem",
                    fontWeight: "700",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                  }}
                >
                  Close
                </motion.button>
              </div>

              <p
                style={{
                  marginTop: "1.5rem",
                  textAlign: "center",
                  color: "#666",
                  fontSize: "0.85rem",
                }}
              >
                💡 Tip: Send this link via WhatsApp, Email, or any messaging
                app!
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
