"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { FaHeart, FaPaperPlane, FaCheckCircle, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useParams, useRouter } from "next/navigation";
import { useAnswerStore } from "@/store/useStore";
import { getQuestionSet, submitAnswers } from "@/lib/db";
import { QuestionRenderer } from "@/components/QuestionTypes";
import RespondentInfoForm from "@/components/RespondentInforForm";

export default function AnswerClient() {
  const params = useParams();
  const router = useRouter();
  const uniqueId = params.id;

  const { respondentInfo, answers, setRespondentInfo, setAnswer, resetAnswers } = useAnswerStore();
  
  const [questionSet, setQuestionSet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showInfoForm, setShowInfoForm] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  
  const canvasRef = useRef(null);

  // Fetch question set
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        const result = await getQuestionSet(uniqueId);
        
        if (result.success) {
          setQuestionSet(result.data);
        } else {
          setError(result.error || "Question set not found");
        }
      } catch (err) {
        console.error("Error fetching questions:", err);
        setError("Failed to load questions. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (uniqueId) {
      fetchQuestions();
    }
  }, [uniqueId]);

  // Hearts animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const hearts = [];
    
    class Heart {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + 50;
        this.size = Math.random() * 15 + 10;
        this.speedY = Math.random() * 1.5 + 0.8;
        this.opacity = Math.random() * 0.4 + 0.2;
        this.wobble = Math.random() * 1.5;
      }

      update() {
        this.y -= this.speedY;
        this.x += Math.sin(this.y / 30) * this.wobble;
        
        if (this.y < -50) {
          this.y = canvas.height + 50;
          this.x = Math.random() * canvas.width;
        }
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.font = `${this.size}px Arial`;
        ctx.fillText("💝", this.x, this.y);
        ctx.restore();
      }
    }

    for (let i = 0; i < 12; i++) {
      hearts.push(new Heart());
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      hearts.forEach(heart => {
        heart.update();
        heart.draw();
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

  const handleInfoSubmit = () => {
    if (respondentInfo.name && respondentInfo.age && respondentInfo.gender && 
        respondentInfo.relation && respondentInfo.mobile) {
      setShowInfoForm(false);
    }
  };

  const handleAnswerChange = (questionId, value) => {
    setAnswer(questionId, value);
  };

  const handleNext = () => {
    if (currentIndex < questionSet.questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleSubmit = async () => {
    // Check if all questions are answered
    const allAnswered = questionSet.questions.every(q => answers[q.id]);
    
    if (!allAnswered) {
      alert("Please answer all questions before submitting! 💝");
      return;
    }

    setSubmitting(true);

    try {
      const answerData = {
        respondentInfo,
        answers
      };

      const result = await submitAnswers(uniqueId, answerData);
      
      if (result.success) {
        setIsSubmitted(true);
      } else {
        alert("Error submitting answers. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error submitting answers. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff"
      }}>
        <div style={{ textAlign: "center" }}>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            style={{ fontSize: "4rem", marginBottom: "1rem" }}
          >
            ⏳
          </motion.div>
          <p style={{ fontSize: "1.2rem", color: "#999" }}>Loading questions...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        padding: "2rem"
      }}>
        <div style={{ textAlign: "center", maxWidth: "500px" }}>
          <div style={{ fontSize: "5rem", marginBottom: "1rem" }}>😕</div>
          <h1 style={{ fontSize: "2rem", marginBottom: "1rem", color: "#ff9800" }}>
            Oops! Something Went Wrong
          </h1>
          <p style={{ fontSize: "1.1rem", color: "#999", marginBottom: "2rem" }}>
            {error}
          </p>
          <button
            onClick={() => router.push('/home')}
            style={{
              padding: "1rem 2rem",
              background: "linear-gradient(135deg, #ff9800, #ff5722)",
              border: "none",
              borderRadius: "50px",
              color: "#fff",
              fontSize: "1rem",
              fontWeight: "700",
              cursor: "pointer"
            }}
          >
            Create Your Own Questions 🚀
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = questionSet?.questions[currentIndex];
  const progress = questionSet ? ((currentIndex + 1) / questionSet.questions.length) * 100 : 0;

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
          top: "15%",
          right: "10%",
          width: "350px",
          height: "350px",
          background: "radial-gradient(circle, rgba(233,30,99,0.3) 0%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(70px)",
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
          position: "fixed",
          bottom: "15%",
          left: "10%",
          width: "400px",
          height: "400px",
          background: "radial-gradient(circle, rgba(3,169,244,0.3) 0%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(80px)",
          zIndex: 0
        }}
      />

      {/* Main Content */}
      {showInfoForm ? (
        // Respondent Info Form
        <div style={{
          position: "relative",
          zIndex: 1,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem"
        }}>
          <RespondentInfoForm
            info={respondentInfo}
            onChange={setRespondentInfo}
            onSubmit={handleInfoSubmit}
          />
        </div>
      ) : !isSubmitted ? (
        // Questions
        <div style={{
          position: "relative",
          zIndex: 1,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem"
        }}>
          
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{
              textAlign: "center",
              marginBottom: "3rem",
              maxWidth: "700px"
            }}
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ fontSize: "4rem", marginBottom: "1rem" }}
            >
              💌
            </motion.div>
            
            <h1 style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: "800",
              marginBottom: "1rem",
              background: "linear-gradient(135deg, #fff 0%, #e91e63 50%, #ff9800 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}>
              {questionSet?.creatorName || "Someone Special"} Wants to Know...
            </h1>
            
            <p style={{
              fontSize: "1.2rem",
              color: "#b0b0b0",
              lineHeight: "1.8"
            }}>
              Take your time and answer from the heart. Your responses will be shared with them. 💝
            </p>
          </motion.div>

          {/* Progress Bar */}
          <div style={{
            width: "100%",
            maxWidth: "700px",
            marginBottom: "2rem"
          }}>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "0.5rem",
              fontSize: "0.9rem",
              color: "#999"
            }}>
              <span>Question {currentIndex + 1} of {questionSet?.questions.length}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <div style={{
              width: "100%",
              height: "8px",
              background: "rgba(255,255,255,0.1)",
              borderRadius: "10px",
              overflow: "hidden"
            }}>
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
                style={{
                  height: "100%",
                  background: "linear-gradient(90deg, #e91e63, #ff9800)",
                  borderRadius: "10px"
                }}
              />
            </div>
          </div>

          {/* Question Card */}
          <AnimatePresence mode="wait">
            {currentQuestion && (
              <motion.div
                key={currentQuestion.id}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.4 }}
                style={{
                  width: "100%",
                  maxWidth: "700px",
                  background: "rgba(255,255,255,0.05)",
                  backdropFilter: "blur(20px)",
                  padding: "3rem 2.5rem",
                  borderRadius: "30px",
                  border: "1px solid rgba(255,255,255,0.1)",
                  boxShadow: "0 30px 80px rgba(0,0,0,0.4)",
                  marginBottom: "2rem"
                }}
              >
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  marginBottom: "2rem"
                }}>
                  <div style={{
                    width: "50px",
                    height: "50px",
                    background: "linear-gradient(135deg, #e91e63, #ff9800)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.5rem",
                    fontWeight: "800",
                    flexShrink: 0
                  }}>
                    {currentIndex + 1}
                  </div>
                  <h2 style={{
                    fontSize: "1.5rem",
                    fontWeight: "700",
                    color: "#fff",
                    margin: 0,
                    lineHeight: "1.4"
                  }}>
                    {currentQuestion.text}
                  </h2>
                </div>

                <QuestionRenderer
                  question={currentQuestion}
                  value={answers[currentQuestion.id]}
                  onChange={(value) => handleAnswerChange(currentQuestion.id, value)}
                />

                <div style={{
                  marginTop: "1rem",
                  fontSize: "0.85rem",
                  color: "#666",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem"
                }}>
                  <FaHeart style={{ color: "#e91e63" }} />
                  <span>Be honest and genuine - there are no wrong answers</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div style={{
            display: "flex",
            gap: "1rem",
            width: "100%",
            maxWidth: "700px",
            flexWrap: "wrap"
          }}>
            <motion.button
              whileHover={{ scale: currentIndex > 0 ? 1.02 : 1 }}
              whileTap={{ scale: currentIndex > 0 ? 0.98 : 1 }}
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              style={{
                flex: 1,
                minWidth: "150px",
                padding: "1rem 2rem",
                background: currentIndex === 0 
                  ? "rgba(255,255,255,0.05)" 
                  : "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: "15px",
                color: currentIndex === 0 ? "#555" : "#fff",
                fontSize: "1.1rem",
                fontWeight: "600",
                cursor: currentIndex === 0 ? "not-allowed" : "pointer",
                transition: "all 0.3s ease",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem"
              }}
            >
              <FaArrowLeft /> Previous
            </motion.button>

            {currentIndex < questionSet.questions.length - 1 ? (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleNext}
                style={{
                  flex: 1,
                  minWidth: "150px",
                  padding: "1rem 2rem",
                  background: "linear-gradient(135deg, #e91e63, #ff9800)",
                  border: "none",
                  borderRadius: "15px",
                  color: "#fff",
                  fontSize: "1.1rem",
                  fontWeight: "700",
                  cursor: "pointer",
                  boxShadow: "0 10px 30px rgba(233,30,99,0.3)",
                  transition: "all 0.3s ease",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem"
                }}
              >
                Next <FaArrowRight />
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: submitting ? 1 : 1.02, boxShadow: "0 15px 40px rgba(76,175,80,0.4)" }}
                whileTap={{ scale: submitting ? 1 : 0.98 }}
                onClick={handleSubmit}
                disabled={submitting}
                style={{
                  flex: 1,
                  minWidth: "150px",
                  padding: "1rem 2rem",
                  background: submitting
                    ? "rgba(76,175,80,0.5)"
                    : "linear-gradient(135deg, #4caf50, #388e3c)",
                  border: "none",
                  borderRadius: "15px",
                  color: "#fff",
                  fontSize: "1.1rem",
                  fontWeight: "700",
                  cursor: submitting ? "not-allowed" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                  boxShadow: "0 10px 30px rgba(76,175,80,0.3)",
                  transition: "all 0.3s ease"
                }}
              >
                {submitting ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      ⏳
                    </motion.div>
                    Submitting...
                  </>
                ) : (
                  <>
                    <FaPaperPlane /> Submit All Answers
                  </>
                )}
              </motion.button>
            )}
          </div>
        </div>
      ) : (
        // Thank You Screen
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          style={{
            position: "relative",
            zIndex: 1,
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem",
            textAlign: "center"
          }}
        >
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 10, -10, 0]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ fontSize: "8rem", marginBottom: "2rem" }}
          >
            🎉
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            style={{
              maxWidth: "700px",
              background: "rgba(255,255,255,0.05)",
              backdropFilter: "blur(20px)",
              padding: "4rem 3rem",
              borderRadius: "35px",
              border: "1px solid rgba(255,255,255,0.1)",
              boxShadow: "0 30px 80px rgba(0,0,0,0.4)"
            }}
          >
            <FaCheckCircle style={{ 
              fontSize: "5rem", 
              color: "#4caf50", 
              marginBottom: "2rem" 
            }} />

            <h1 style={{
              fontSize: "3rem",
              fontWeight: "800",
              marginBottom: "1.5rem",
              background: "linear-gradient(135deg, #fff 0%, #4caf50 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}>
              Thank You! 💝
            </h1>

            <p style={{
              fontSize: "1.3rem",
              color: "#b0b0b0",
              lineHeight: "1.8",
              marginBottom: "2rem"
            }}>
              Your heartfelt answers have been sent to <strong style={{ color: "#ff9800" }}>{questionSet?.creatorName}</strong>!
              They'll be so happy to read your thoughts. Thank you for taking the time to 
              share and strengthen your connection. 🌟
            </p>

            <div style={{
              background: "rgba(255,255,255,0.05)",
              padding: "2rem",
              borderRadius: "20px",
              marginBottom: "2rem"
            }}>
              <h3 style={{
                fontSize: "1.5rem",
                marginBottom: "1rem",
                color: "#ff9800"
              }}>
                Want to Create Your Own?
              </h3>
              <p style={{
                fontSize: "1rem",
                color: "#999",
                marginBottom: "1.5rem",
                lineHeight: "1.6"
              }}>
                Create meaningful polls and questions to connect with your loved ones!
                Build stronger relationships through curiosity and genuine conversations.
              </p>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push('/home')}
                style={{
                  padding: "1rem 2.5rem",
                  background: "linear-gradient(135deg, #ff9800, #ff5722)",
                  border: "none",
                  borderRadius: "50px",
                  color: "#fff",
                  fontSize: "1.1rem",
                  fontWeight: "700",
                  cursor: "pointer",
                  boxShadow: "0 10px 30px rgba(255,152,0,0.4)"
                }}
              >
                Create Your Own Questions 🚀
              </motion.button>
            </div>

            <div style={{
              display: "flex",
              gap: "2rem",
              justifyContent: "center",
              marginTop: "3rem",
              fontSize: "3rem"
            }}>
              <motion.span
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                💖
              </motion.span>
              <motion.span
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
              >
                ✨
              </motion.span>
              <motion.span
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
              >
                🤗
              </motion.span>
            </div>

            <p style={{
              marginTop: "3rem",
              fontSize: "1rem",
              color: "#666"
            }}>
              Connections are built one question at a time. 🌱
            </p>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
