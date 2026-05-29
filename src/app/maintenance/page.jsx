"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FaHeart, FaComments, FaPaperPlane, FaUsers, FaRocket } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Maintenance() {
  const canvasRef = useRef(null);
  const [showPopup, setShowPopup] = useState(true);
  const router = useRouter();

  // Animated particles background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 80;

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.opacity = Math.random() * 0.5 + 0.3;
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
      
      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            ctx.strokeStyle = `rgba(3, 169, 244, ${0.2 * (1 - distance / 120)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

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

  const handleExploreNow = () => {
    setShowPopup(false);
    setTimeout(() => {
      router.push('/');
    }, 300);
  };

  return (
    <div style={{
      minHeight: "100vh",
      width: "100vw",
      background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      color: "#fff",
      fontFamily: "'Inter', 'Poppins', sans-serif",
      textAlign: "center",
      padding: "2rem",
      position: "relative",
      overflow: "hidden"
    }}>
      
      {/* Animated Canvas Background */}
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 0
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
          position: "absolute",
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

      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
        style={{
          position: "absolute",
          bottom: "10%",
          left: "10%",
          width: "350px",
          height: "350px",
          background: "radial-gradient(circle, rgba(3,169,244,0.3) 0%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(70px)",
          zIndex: 0
        }}
      />

      {/* Main Content Container */}
      <div style={{ position: "relative", zIndex: 1, maxWidth: "1200px" }}>
        
        {/* Animated Badge */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
          style={{
            display: "inline-block",
            background: "linear-gradient(135deg, #ff9800, #ff5722)",
            padding: "0.5rem 1.5rem",
            borderRadius: "30px",
            marginBottom: "2rem",
            fontSize: "0.9rem",
            fontWeight: "600",
            boxShadow: "0 4px 20px rgba(255,152,0,0.4)"
          }}
        >
          🚀 Coming Soon
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          style={{
            marginBottom: "1.5rem",
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: "800",
            background: "linear-gradient(135deg, #fff 0%, #ff9800 50%, #03a9f4 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            lineHeight: "1.2"
          }}
        >
          Building Connections<br />Through Questions
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          style={{
            marginBottom: "3rem",
            fontSize: "clamp(1rem, 2vw, 1.3rem)",
            color: "#b0b0b0",
            maxWidth: "700px",
            margin: "0 auto 3rem auto",
            lineHeight: "1.8"
          }}
        >
          A platform where curiosity meets connection. Create meaningful questions,
          share them with people you care about, and discover deeper bonds through
          their heartfelt answers.
        </motion.p>

        {/* Feature Cards */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "2rem",
          marginBottom: "3rem",
          maxWidth: "900px",
          margin: "0 auto 3rem auto"
        }}>
          
          {/* Feature 1 */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            whileHover={{ 
              y: -10,
              boxShadow: "0 20px 40px rgba(255,152,0,0.3)"
            }}
            style={{
              background: "rgba(255,255,255,0.05)",
              backdropFilter: "blur(10px)",
              padding: "2rem 1.5rem",
              borderRadius: "20px",
              border: "1px solid rgba(255,255,255,0.1)",
              transition: "all 0.3s ease"
            }}
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ fontSize: "3rem", marginBottom: "1rem" }}
            >
              ❓
            </motion.div>
            <h3 style={{ fontSize: "1.2rem", marginBottom: "0.5rem", color: "#ff9800" }}>
              Create Questions
            </h3>
            <p style={{ fontSize: "0.9rem", color: "#999", lineHeight: "1.6" }}>
              Craft thoughtful questions that matter to you and your relationships
            </p>
          </motion.div>

          {/* Feature 2 */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            whileHover={{ 
              y: -10,
              boxShadow: "0 20px 40px rgba(3,169,244,0.3)"
            }}
            style={{
              background: "rgba(255,255,255,0.05)",
              backdropFilter: "blur(10px)",
              padding: "2rem 1.5rem",
              borderRadius: "20px",
              border: "1px solid rgba(255,255,255,0.1)",
              transition: "all 0.3s ease"
            }}
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ fontSize: "3rem", marginBottom: "1rem" }}
            >
              🔗
            </motion.div>
            <h3 style={{ fontSize: "1.2rem", marginBottom: "0.5rem", color: "#03a9f4" }}>
              Share Links
            </h3>
            <p style={{ fontSize: "0.9rem", color: "#999", lineHeight: "1.6" }}>
              Generate unique links and send them to friends, family, or partners
            </p>
          </motion.div>

          {/* Feature 3 */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.6 }}
            whileHover={{ 
              y: -10,
              boxShadow: "0 20px 40px rgba(233,30,99,0.3)"
            }}
            style={{
              background: "rgba(255,255,255,0.05)",
              backdropFilter: "blur(10px)",
              padding: "2rem 1.5rem",
              borderRadius: "20px",
              border: "1px solid rgba(255,255,255,0.1)",
              transition: "all 0.3s ease"
            }}
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ fontSize: "3rem", marginBottom: "1rem" }}
            >
              💝
            </motion.div>
            <h3 style={{ fontSize: "1.2rem", marginBottom: "0.5rem", color: "#e91e63" }}>
              Receive Answers
            </h3>
            <p style={{ fontSize: "0.9rem", color: "#999", lineHeight: "1.6" }}>
              Get heartfelt responses that strengthen your bonds and understanding
            </p>
          </motion.div>

        </div>

        {/* Floating Icons Animation */}
        <div style={{ 
          position: "relative", 
          height: "120px", 
          marginBottom: "2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "3rem"
        }}>
          <motion.div
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, 5, 0]
            }}
            transition={{ duration: 3, repeat: Infinity }}
            style={{ fontSize: "3.5rem" }}
          >
            💑
          </motion.div>
          
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ 
              fontSize: "2.5rem",
              color: "#ff9800"
            }}
          >
            <FaHeart />
          </motion.div>

          <motion.div
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, -5, 0]
            }}
            transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
            style={{ fontSize: "3.5rem" }}
          >
            👨‍👩‍👧‍👦
          </motion.div>

          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            style={{ 
              fontSize: "2.5rem",
              color: "#03a9f4"
            }}
          >
            <FaUsers />
          </motion.div>

          <motion.div
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, 5, 0]
            }}
            transition={{ duration: 3, repeat: Infinity, delay: 1 }}
            style={{ fontSize: "3.5rem" }}
          >
            👫
          </motion.div>
        </div>

        {/* CTA Buttons */}
        <div style={{ 
          display: "flex", 
          gap: "1.5rem", 
          justifyContent: "center",
          flexWrap: "wrap"
        }}>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/about" style={{
              display: "inline-block",
              background: "linear-gradient(135deg, #ff9800, #ff5722)",
              padding: "1rem 2.5rem",
              borderRadius: "50px",
              color: "#fff",
              textDecoration: "none",
              fontWeight: "700",
              fontSize: "1.1rem",
              boxShadow: "0 10px 30px rgba(255,152,0,0.4)",
              border: "none",
              cursor: "pointer",
              transition: "all 0.3s ease"
            }}>
              Discover More 🚀
            </Link>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <button style={{
              background: "transparent",
              padding: "1rem 2.5rem",
              borderRadius: "50px",
              color: "#03a9f4",
              textDecoration: "none",
              fontWeight: "700",
              fontSize: "1.1rem",
              border: "2px solid #03a9f4",
              cursor: "pointer",
              transition: "all 0.3s ease"
            }}>
              Notify Me 🔔
            </button>
          </motion.div>
        </div>

        {/* Progress Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          style={{
            marginTop: "4rem",
            fontSize: "0.9rem",
            color: "#666"
          }}
        >
          <div style={{ marginBottom: "1rem" }}>Building Progress</div>
          <div style={{
            width: "300px",
            height: "6px",
            background: "rgba(255,255,255,0.1)",
            borderRadius: "10px",
            margin: "0 auto",
            overflow: "hidden"
          }}>
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "65%" }}
              transition={{ duration: 2, delay: 1.5 }}
              style={{
                height: "100%",
                background: "linear-gradient(90deg, #ff9800, #03a9f4)",
                borderRadius: "10px"
              }}
            />
          </div>
        </motion.div>

      </div>

      {/* Launch Popup Modal */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "rgba(0,0,0,0.85)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1000,
              padding: "2rem"
            }}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", duration: 0.6 }}
              style={{
                background: "linear-gradient(135deg, rgba(26,26,46,0.98), rgba(22,33,62,0.98))",
                backdropFilter: "blur(30px)",
                padding: "3rem 2.5rem",
                borderRadius: "35px",
                border: "2px solid rgba(255,152,0,0.4)",
                maxWidth: "550px",
                width: "100%",
                boxShadow: "0 40px 100px rgba(255,152,0,0.4)",
                textAlign: "center",
                position: "relative",
                overflow: "hidden"
              }}
            >
              {/* Confetti Animation */}
              <motion.div
                animate={{ 
                  rotate: [0, 360],
                  scale: [1, 1.2, 1]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{
                  position: "absolute",
                  top: "-20px",
                  right: "-20px",
                  fontSize: "4rem",
                  opacity: 0.3
                }}
              >
                ✨
              </motion.div>

              <motion.div
                animate={{ 
                  rotate: [0, -360],
                  scale: [1, 1.2, 1]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
                style={{
                  position: "absolute",
                  bottom: "-20px",
                  left: "-20px",
                  fontSize: "4rem",
                  opacity: 0.3
                }}
              >
                💫
              </motion.div>

              {/* Animated Rocket */}
              <motion.div
                animate={{ 
                  y: [0, -15, 0],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity 
                }}
                style={{ 
                  fontSize: "5rem", 
                  marginBottom: "1.5rem"
                }}
              >
                🚀
              </motion.div>

              {/* Title */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                style={{
                  fontSize: "2.5rem",
                  fontWeight: "900",
                  marginBottom: "1rem",
                  background: "linear-gradient(135deg, #fff 0%, #ff9800 50%, #03a9f4 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  lineHeight: "1.2"
                }}
              >
                Website is Ready!
              </motion.h2>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                style={{
                  fontSize: "1.2rem",
                  color: "#b0b0b0",
                  marginBottom: "2.5rem",
                  lineHeight: "1.8"
                }}
              >
                Start creating meaningful connections through questions! 
                Our platform is now <strong style={{ color: "#ff9800" }}>live and ready</strong> for you to explore. 💝
              </motion.p>

              {/* Features List */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                style={{
                  background: "rgba(255,255,255,0.05)",
                  padding: "1.5rem",
                  borderRadius: "20px",
                  marginBottom: "2rem",
                  border: "1px solid rgba(255,255,255,0.1)"
                }}
              >
                <div style={{ 
                  display: "flex", 
                  flexDirection: "column", 
                  gap: "1rem",
                  textAlign: "left"
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
                    <span style={{ fontSize: "1.5rem" }}>✅</span>
                    <span style={{ color: "#e0e0e0" }}>Create unlimited questions</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
                    <span style={{ fontSize: "1.5rem" }}>✅</span>
                    <span style={{ color: "#e0e0e0" }}>Generate shareable links</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
                    <span style={{ fontSize: "1.5rem" }}>✅</span>
                    <span style={{ color: "#e0e0e0" }}>Receive heartfelt answers</span>
                  </div>
                </div>
              </motion.div>

              {/* CTA Buttons */}
              <div style={{ 
                display: "flex", 
                gap: "1rem",
                flexDirection: "column"
              }}>
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(255,152,0,0.5)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleExploreNow}
                  style={{
                    width: "100%",
                    padding: "1.2rem",
                    background: "linear-gradient(135deg, #ff9800, #ff5722)",
                    border: "none",
                    borderRadius: "50px",
                    color: "#fff",
                    fontSize: "1.2rem",
                    fontWeight: "700",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.8rem",
                    boxShadow: "0 10px 30px rgba(255,152,0,0.4)",
                    transition: "all 0.3s ease"
                  }}
                >
                  <FaRocket /> Explore Now
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowPopup(false)}
                  style={{
                    width: "100%",
                    padding: "1rem",
                    background: "transparent",
                    border: "2px solid rgba(255,255,255,0.2)",
                    borderRadius: "50px",
                    color: "#999",
                    fontSize: "1rem",
                    fontWeight: "600",
                    cursor: "pointer",
                    transition: "all 0.3s ease"
                  }}
                >
                  Stay Here
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}