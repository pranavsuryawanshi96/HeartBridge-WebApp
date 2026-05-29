"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { FaUser, FaCalendar, FaHeart, FaPhone, FaVenusMars, FaSearch } from "react-icons/fa";
import Link from "next/link";
import { getCreatorQuestionSets } from "@/lib/db";

export default function Dashboard() {
  const [creatorName, setCreatorName] = useState("");
  const [questionSets, setQuestionSets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const canvasRef = useRef(null);

  // Particle background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 40;

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

  const fetchResponses = async () => {
    if (!creatorName.trim()) {
      alert("Please enter your name!");
      return;
    }

    setLoading(true);
    try {
      const result = await getCreatorQuestionSets(creatorName);
      
      if (result.success) {
        setQuestionSets(result.data);
      } else {
        alert("Error fetching responses. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error fetching responses. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const filteredSets = questionSets.filter(set => 
    set.recipientName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    set.answers?.respondentInfo?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (timestamp) => {
    if (!timestamp) return "N/A";
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)",
      color: "#fff",
      fontFamily: "'Inter', 'Poppins', sans-serif",
      position: "relative",
      overflow: "hidden"
    }}>
      
      {/* Animated Canvas Background */}
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 0,
          pointerEvents: "none"
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
          ease: "easeInOut"
        }}
        style={{
          position: "fixed",
          top: "10%",
          right: "15%",
          width: "300px",
          height: "300px",
          background: "radial-gradient(circle, rgba(255,152,0,0.4) 0%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(60px)",
          zIndex: 0
        }}
      />

      {/* Navigation */}
      <nav style={{
        position: "relative",
        zIndex: 10,
        padding: "1.5rem 2rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "1px solid rgba(255,255,255,0.1)"
      }}>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          style={{
            fontSize: "1.5rem",
            fontWeight: "800",
            background: "linear-gradient(135deg, #ff9800, #03a9f4)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            display: "flex",
            flexDirection: "row",
            gap: '0.75rem'
          }}
        >
          <img src="/heartsync_logo.svg" alt="HeartSync Logo" style={{ width: "40px", height: "40px", marginRight: "10px" }}></img> HeartSync
        </motion.div>
        
        <div style={{ display: "flex", gap: "1.5rem" }}>
          <Link href="/home" style={{
            color: "#fff",
            textDecoration: "none",
            padding: "0.5rem 1.5rem",
            borderRadius: "25px",
            border: "1px solid rgba(255,255,255,0.2)",
            transition: "all 0.3s ease"
          }}>
            Home
          </Link>
          <Link href="/about" style={{
            color: "#fff",
            textDecoration: "none",
            padding: "0.5rem 1.5rem",
            borderRadius: "25px",
            border: "1px solid rgba(255,255,255,0.2)",
            transition: "all 0.3s ease"
          }}>
            About
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <div style={{
        position: "relative",
        zIndex: 1,
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "3rem 2rem"
      }}>
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            textAlign: "center",
            marginBottom: "3rem"
          }}
        >
          <h1 style={{
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: "900",
            marginBottom: "1rem",
            background: "linear-gradient(135deg, #fff 0%, #ff9800 50%, #03a9f4 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            lineHeight: "1.2"
          }}>
            Responses Dashboard
          </h1>
          <p style={{
            fontSize: "clamp(1rem, 2vw, 1.3rem)",
            color: "#b0b0b0"
          }}>
            View all the heartfelt answers you've received 💝
          </p>
        </motion.div>

        {/* Search Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            background: "rgba(255,255,255,0.05)",
            backdropFilter: "blur(10px)",
            padding: "2.5rem",
            borderRadius: "25px",
            border: "1px solid rgba(255,255,255,0.1)",
            marginBottom: "3rem"
          }}
        >
          <h2 style={{
            fontSize: "1.5rem",
            marginBottom: "1.5rem",
            color: "#ff9800",
            fontWeight: "700"
          }}>
            🔍 Find Your Responses
          </h2>

          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <input
              type="text"
              value={creatorName}
              onChange={(e) => setCreatorName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && fetchResponses()}
              placeholder="Enter your name..."
              style={{
                flex: 1,
                minWidth: "250px",
                padding: "1rem 1.2rem",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "15px",
                color: "#fff",
                fontSize: "1rem",
                outline: "none"
              }}
            />
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={fetchResponses}
              disabled={loading}
              style={{
                padding: "1rem 2.5rem",
                background: loading
                  ? "rgba(255,152,0,0.5)"
                  : "linear-gradient(135deg, #ff9800, #ff5722)",
                border: "none",
                borderRadius: "15px",
                color: "#fff",
                fontSize: "1rem",
                fontWeight: "700",
                cursor: loading ? "not-allowed" : "pointer",
                whiteSpace: "nowrap"
              }}
            >
              {loading ? "Loading..." : "Get Responses"}
            </motion.button>
          </div>
        </motion.div>

        {/* Results Count & Search */}
        {questionSets.length > 0 && (
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "2rem",
            flexWrap: "wrap",
            gap: "1rem"
          }}>
            <div style={{
              fontSize: "1.1rem",
              color: "#999"
            }}>
              Found <strong style={{ color: "#ff9800" }}>{filteredSets.length}</strong> response{filteredSets.length !== 1 ? 's' : ''}
            </div>
            
            <div style={{ position: "relative", minWidth: "250px" }}>
              <FaSearch style={{
                position: "absolute",
                left: "1rem",
                top: "50%",
                transform: "translateY(-50%)",
                color: "#999"
              }} />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name..."
                style={{
                  width: "100%",
                  padding: "0.8rem 1rem 0.8rem 2.5rem",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "12px",
                  color: "#fff",
                  fontSize: "0.9rem",
                  outline: "none"
                }}
              />
            </div>
          </div>
        )}

        {/* Response Cards */}
        {filteredSets.length === 0 && !loading && questionSets.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              textAlign: "center",
              padding: "4rem 2rem",
              background: "rgba(255,255,255,0.05)",
              borderRadius: "25px",
              border: "1px solid rgba(255,255,255,0.1)"
            }}
          >
            <div style={{ fontSize: "5rem", marginBottom: "1rem" }}>📭</div>
            <h3 style={{ fontSize: "1.5rem", marginBottom: "0.5rem", color: "#fff" }}>
              No Responses Yet
            </h3>
            <p style={{ color: "#999", marginBottom: "2rem" }}>
              Enter your name above to see responses to your questions
            </p>
          </motion.div>
        ) : filteredSets.length === 0 && searchTerm ? (
          <div style={{
            textAlign: "center",
            padding: "3rem 2rem",
            background: "rgba(255,255,255,0.05)",
            borderRadius: "25px"
          }}>
            <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>🔍</div>
            <p style={{ color: "#999" }}>No results found for "{searchTerm}"</p>
          </div>
        ) : (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
            gap: "2rem"
          }}>
            {filteredSets.map((set, index) => (
              <motion.div
                key={set.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5, boxShadow: "0 20px 60px rgba(255,152,0,0.3)" }}
                style={{
                  background: "rgba(255,255,255,0.05)",
                  backdropFilter: "blur(10px)",
                  padding: "2rem",
                  borderRadius: "20px",
                  border: "1px solid rgba(255,255,255,0.1)",
                  transition: "all 0.3s ease"
                }}
              >
                {/* Respondent Info */}
                <div style={{
                  background: "rgba(255,152,0,0.1)",
                  padding: "1.5rem",
                  borderRadius: "15px",
                  marginBottom: "1.5rem",
                  border: "1px solid rgba(255,152,0,0.2)"
                }}>
                  <h3 style={{
                    fontSize: "1.5rem",
                    marginBottom: "1rem",
                    color: "#ff9800",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem"
                  }}>
                    <FaUser />
                    {set.answers?.respondentInfo?.name || "Anonymous"}
                  </h3>
                  
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gap: "0.8rem",
                    fontSize: "0.9rem",
                    color: "#ccc"
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <FaCalendar style={{ color: "#03a9f4" }} />
                      {set.answers?.respondentInfo?.age || "N/A"} years
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <FaVenusMars style={{ color: "#e91e63" }} />
                      {set.answers?.respondentInfo?.gender || "N/A"}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <FaHeart style={{ color: "#ff9800" }} />
                      {set.answers?.respondentInfo?.relation || "N/A"}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <FaPhone style={{ color: "#4caf50" }} />
                      {set.answers?.respondentInfo?.mobile || "N/A"}
                    </div>
                  </div>
                </div>

                {/* Sent To */}
                <div style={{
                  fontSize: "0.85rem",
                  color: "#999",
                  marginBottom: "1rem",
                  padding: "0.5rem 1rem",
                  background: "rgba(255,255,255,0.05)",
                  borderRadius: "10px"
                }}>
                  Sent to: <strong style={{ color: "#03a9f4" }}>{set.recipientName}</strong>
                </div>

                {/* Questions & Answers */}
                <div style={{
                  maxHeight: "300px",
                  overflowY: "auto",
                  paddingRight: "0.5rem"
                }}>
                  {set.questions?.map((question, qIndex) => (
                    <div key={question.id} style={{
                      marginBottom: "1.5rem",
                      padding: "1rem",
                      background: "rgba(255,255,255,0.03)",
                      borderRadius: "12px",
                      borderLeft: "3px solid #ff9800"
                    }}>
                      <div style={{
                        fontSize: "0.85rem",
                        color: "#ff9800",
                        marginBottom: "0.5rem",
                        fontWeight: "600"
                      }}>
                        Q{qIndex + 1}: {question.text}
                      </div>
                      <div style={{
                        fontSize: "0.95rem",
                        color: "#e0e0e0",
                        lineHeight: "1.6"
                      }}>
                        {set.answers?.answers?.[question.id] || "No answer"}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Timestamp */}
                <div style={{
                  marginTop: "1rem",
                  paddingTop: "1rem",
                  borderTop: "1px solid rgba(255,255,255,0.1)",
                  fontSize: "0.75rem",
                  color: "#666",
                  textAlign: "right"
                }}>
                  Answered: {formatDate(set.answeredAt)}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}