// "use client";

// import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
// import { useState, useRef, useEffect } from "react";
// import { FaHeart, FaQuestionCircle, FaPaperPlane, FaCheckCircle, FaLightbulb } from "react-icons/fa";
// import Link from "next/link";

// // 3D Tilt Card Component
// const TiltCard = ({ children, className, style }) => {
//   const x = useMotionValue(0);
//   const y = useMotionValue(0);

//   const mouseXSpring = useSpring(x);
//   const mouseYSpring = useSpring(y);

//   const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
//   const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

//   const handleMouseMove = (e) => {
//     const rect = e.target.getBoundingClientRect();
//     const width = rect.width;
//     const height = rect.height;
//     const mouseX = e.clientX - rect.left;
//     const mouseY = e.clientY - rect.top;
//     const xPct = mouseX / width - 0.5;
//     const yPct = mouseY / height - 0.5;
//     x.set(xPct);
//     y.set(yPct);
//   };

//   const handleMouseLeave = () => {
//     x.set(0);
//     y.set(0);
//   };

//   return (
//     <motion.div
//       onMouseMove={handleMouseMove}
//       onMouseLeave={handleMouseLeave}
//       style={{
//         rotateX,
//         rotateY,
//         transformStyle: "preserve-3d",
//         ...style
//       }}
//       className={className}
//     >
//       <div style={{ transform: "translateZ(75px)", transformStyle: "preserve-3d" }}>
//         {children}
//       </div>
//     </motion.div>
//   );
// };

// export default function About() {
//   const [activeStep, setActiveStep] = useState(0);
//   const canvasRef = useRef(null);

//   // Particle animation
//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
    
//     const ctx = canvas.getContext("2d");
//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight;

//     const hearts = [];
    
//     class Heart {
//       constructor() {
//         this.x = Math.random() * canvas.width;
//         this.y = canvas.height + 50;
//         this.size = Math.random() * 20 + 10;
//         this.speedY = Math.random() * 2 + 1;
//         this.opacity = Math.random() * 0.5 + 0.3;
//         this.wobble = Math.random() * 2;
//       }

//       update() {
//         this.y -= this.speedY;
//         this.x += Math.sin(this.y / 30) * this.wobble;
        
//         if (this.y < -50) {
//           this.y = canvas.height + 50;
//           this.x = Math.random() * canvas.width;
//         }
//       }

//       draw() {
//         ctx.save();
//         ctx.globalAlpha = this.opacity;
//         ctx.font = `${this.size}px Arial`;
//         ctx.fillText("❤️", this.x, this.y);
//         ctx.restore();
//       }
//     }

//     for (let i = 0; i < 15; i++) {
//       hearts.push(new Heart());
//     }

//     function animate() {
//       ctx.clearRect(0, 0, canvas.width, canvas.height);
//       hearts.forEach(heart => {
//         heart.update();
//         heart.draw();
//       });
//       requestAnimationFrame(animate);
//     }

//     animate();

//     const handleResize = () => {
//       canvas.width = window.innerWidth;
//       canvas.height = window.innerHeight;
//     };

//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const steps = [
//     {
//       icon: <FaQuestionCircle />,
//       title: "Create Questions",
//       description: "Add thoughtful questions you want to ask someone special",
//       emoji: "✍️"
//     },
//     {
//       icon: <FaPaperPlane />,
//       title: "Generate & Share Link",
//       description: "Get a unique link and send it to your loved one",
//       emoji: "🔗"
//     },
//     {
//       icon: <FaHeart />,
//       title: "They Answer",
//       description: "They receive your questions and share their thoughts",
//       emoji: "💭"
//     },
//     {
//       icon: <FaCheckCircle />,
//       title: "Get Responses",
//       description: "Receive their heartfelt answers and grow closer",
//       emoji: "💝"
//     }
//   ];

//   return (
//     <div style={{
//       minHeight: "100vh",
//       background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)",
//       color: "#fff",
//       fontFamily: "'Inter', 'Poppins', sans-serif",
//       position: "relative",
//       overflow: "hidden",
//       paddingBottom: "4rem"
//     }}>
      
//       {/* Animated Canvas Background */}
//       <canvas
//         ref={canvasRef}
//         style={{
//           position: "fixed",
//           top: 0,
//           left: 0,
//           zIndex: 0,
//           pointerEvents: "none"
//         }}
//       />

//       {/* Gradient Orbs */}
//       <motion.div
//         animate={{
//           scale: [1, 1.2, 1],
//           opacity: [0.3, 0.5, 0.3],
//           x: [0, 50, 0],
//           y: [0, 30, 0]
//         }}
//         transition={{
//           duration: 8,
//           repeat: Infinity,
//           ease: "easeInOut"
//         }}
//         style={{
//           position: "fixed",
//           top: "5%",
//           right: "10%",
//           width: "400px",
//           height: "400px",
//           background: "radial-gradient(circle, rgba(255,152,0,0.3) 0%, transparent 70%)",
//           borderRadius: "50%",
//           filter: "blur(80px)",
//           zIndex: 0
//         }}
//       />

//       <motion.div
//         animate={{
//           scale: [1, 1.3, 1],
//           opacity: [0.2, 0.4, 0.2],
//           x: [0, -30, 0],
//           y: [0, 50, 0]
//         }}
//         transition={{
//           duration: 10,
//           repeat: Infinity,
//           ease: "easeInOut",
//           delay: 2
//         }}
//         style={{
//           position: "fixed",
//           bottom: "10%",
//           left: "5%",
//           width: "450px",
//           height: "450px",
//           background: "radial-gradient(circle, rgba(3,169,244,0.3) 0%, transparent 70%)",
//           borderRadius: "50%",
//           filter: "blur(90px)",
//           zIndex: 0
//         }}
//       />

//       {/* Main Content */}
//       <div style={{ position: "relative", zIndex: 1, padding: "2rem" }}>
        
//         {/* Hero Section */}
//         <div style={{
//           minHeight: "100vh",
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           justifyContent: "center",
//           textAlign: "center",
//           maxWidth: "1200px",
//           margin: "0 auto"
//         }}>
          
//           <motion.div
//             initial={{ scale: 0, rotate: -180 }}
//             animate={{ scale: 1, rotate: 0 }}
//             transition={{ duration: 0.8, type: "spring" }}
//             style={{
//               display: "inline-block",
//               background: "linear-gradient(135deg, #ff9800, #ff5722)",
//               padding: "0.5rem 1.5rem",
//               borderRadius: "30px",
//               marginBottom: "2rem",
//               fontSize: "0.9rem",
//               fontWeight: "600",
//               boxShadow: "0 4px 20px rgba(255,152,0,0.4)"
//             }}
//           >
//             💡 The Vision
//           </motion.div>

//           <motion.h1
//             initial={{ opacity: 0, y: -50 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 1 }}
//             style={{
//               fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
//               fontWeight: "900",
//               marginBottom: "2rem",
//               background: "linear-gradient(135deg, #fff 0%, #ff9800 40%, #03a9f4 80%, #e91e63 100%)",
//               WebkitBackgroundClip: "text",
//               WebkitTextFillColor: "transparent",
//               lineHeight: "1.2"
//             }}
//           >
//             Deeper Connections,<br />One Question at a Time
//           </motion.h1>

//           <motion.p
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.3, duration: 1 }}
//             style={{
//               maxWidth: "800px",
//               fontSize: "clamp(1.1rem, 2vw, 1.4rem)",
//               color: "#b0b0b0",
//               marginBottom: "3rem",
//               lineHeight: "1.8"
//             }}
//           >
//             Imagine a platform where you can ask the questions that truly matter —
//             to your partner, best friend, or family member. They answer honestly,
//             and you discover new dimensions of your relationship.
//           </motion.p>

//           {/* Animated Emoji Section */}
//           <div style={{
//             display: "flex",
//             gap: "2rem",
//             marginBottom: "3rem",
//             flexWrap: "wrap",
//             justifyContent: "center"
//           }}>
//             <motion.div
//               animate={{ 
//                 y: [0, -20, 0],
//                 rotate: [0, 10, 0]
//               }}
//               transition={{ duration: 3, repeat: Infinity }}
//               style={{ fontSize: "5rem" }}
//             >
//               💑
//             </motion.div>
//             <motion.div
//               animate={{ 
//                 y: [0, -15, 0],
//                 scale: [1, 1.1, 1]
//               }}
//               transition={{ duration: 2.5, repeat: Infinity, delay: 0.3 }}
//               style={{ fontSize: "5rem" }}
//             >
//               👨‍👩‍👧‍👦
//             </motion.div>
//             <motion.div
//               animate={{ 
//                 y: [0, -20, 0],
//                 rotate: [0, -10, 0]
//               }}
//               transition={{ duration: 3, repeat: Infinity, delay: 0.6 }}
//               style={{ fontSize: "5rem" }}
//             >
//               👫
//             </motion.div>
//             <motion.div
//               animate={{ 
//                 y: [0, -15, 0],
//                 scale: [1, 1.1, 1]
//               }}
//               transition={{ duration: 2.5, repeat: Infinity, delay: 0.9 }}
//               style={{ fontSize: "5rem" }}
//             >
//               🤝
//             </motion.div>
//           </div>

//           <motion.div
//             initial={{ opacity: 0, scale: 0.8 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ delay: 0.6, duration: 0.8 }}
//           >
//             <Link href="/" style={{
//               display: "inline-block",
//               background: "linear-gradient(135deg, #ff9800, #ff5722)",
//               padding: "1rem 3rem",
//               borderRadius: "50px",
//               color: "#fff",
//               textDecoration: "none",
//               fontWeight: "700",
//               fontSize: "1.2rem",
//               boxShadow: "0 10px 30px rgba(255,152,0,0.5)",
//               transition: "transform 0.3s ease, box-shadow 0.3s ease"
//             }}
//             onMouseEnter={(e) => {
//               e.target.style.transform = "scale(1.05)";
//               e.target.style.boxShadow = "0 15px 40px rgba(255,152,0,0.6)";
//             }}
//             onMouseLeave={(e) => {
//               e.target.style.transform = "scale(1)";
//               e.target.style.boxShadow = "0 10px 30px rgba(255,152,0,0.5)";
//             }}
//             >
//               Back to Home 🏠
//             </Link>
//           </motion.div>
//         </div>

//         {/* How It Works Section */}
//         <div style={{
//           maxWidth: "1200px",
//           margin: "0 auto",
//           padding: "4rem 2rem"
//         }}>
//           <motion.h2
//             initial={{ opacity: 0 }}
//             whileInView={{ opacity: 1 }}
//             transition={{ duration: 0.8 }}
//             style={{
//               fontSize: "clamp(2rem, 4vw, 3rem)",
//               fontWeight: "800",
//               textAlign: "center",
//               marginBottom: "1rem",
//               background: "linear-gradient(135deg, #ff9800, #03a9f4)",
//               WebkitBackgroundClip: "text",
//               WebkitTextFillColor: "transparent"
//             }}
//           >
//             How It Works
//           </motion.h2>

//           <motion.p
//             initial={{ opacity: 0 }}
//             whileInView={{ opacity: 1 }}
//             transition={{ duration: 0.8, delay: 0.2 }}
//             style={{
//               textAlign: "center",
//               fontSize: "1.2rem",
//               color: "#999",
//               marginBottom: "4rem"
//             }}
//           >
//             Four simple steps to strengthen your relationships
//           </motion.p>

//           {/* Interactive Steps */}
//           <div style={{
//             display: "grid",
//             gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
//             gap: "2rem",
//             marginBottom: "4rem"
//           }}>
//             {steps.map((step, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, y: 50 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.6, delay: index * 0.1 }}
//                 onMouseEnter={() => setActiveStep(index)}
//                 style={{
//                   background: activeStep === index 
//                     ? "linear-gradient(135deg, rgba(255,152,0,0.15), rgba(3,169,244,0.15))"
//                     : "rgba(255,255,255,0.05)",
//                   backdropFilter: "blur(10px)",
//                   padding: "2.5rem 2rem",
//                   borderRadius: "25px",
//                   border: activeStep === index 
//                     ? "2px solid rgba(255,152,0,0.5)"
//                     : "1px solid rgba(255,255,255,0.1)",
//                   textAlign: "center",
//                   cursor: "pointer",
//                   transition: "all 0.4s ease",
//                   transform: activeStep === index ? "scale(1.05)" : "scale(1)",
//                   boxShadow: activeStep === index 
//                     ? "0 20px 50px rgba(255,152,0,0.3)"
//                     : "none"
//                 }}
//               >
//                 <motion.div
//                   animate={activeStep === index ? { 
//                     scale: [1, 1.2, 1],
//                     rotate: [0, 360, 360]
//                   } : {}}
//                   transition={{ duration: 0.8 }}
//                   style={{
//                     fontSize: "4rem",
//                     marginBottom: "1rem"
//                   }}
//                 >
//                   {step.emoji}
//                 </motion.div>
                
//                 <div style={{
//                   fontSize: "3rem",
//                   color: "#ff9800",
//                   marginBottom: "1rem"
//                 }}>
//                   {step.icon}
//                 </div>

//                 <h3 style={{
//                   fontSize: "1.4rem",
//                   marginBottom: "1rem",
//                   color: "#fff",
//                   fontWeight: "700"
//                 }}>
//                   {step.title}
//                 </h3>

//                 <p style={{
//                   fontSize: "1rem",
//                   color: "#999",
//                   lineHeight: "1.6"
//                 }}>
//                   {step.description}
//                 </p>

//                 <div style={{
//                   marginTop: "1.5rem",
//                   fontSize: "2rem",
//                   fontWeight: "800",
//                   color: activeStep === index ? "#ff9800" : "#333"
//                 }}>
//                   {index + 1}
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>

//         {/* Use Cases Section with 3D Cards */}
//         <div style={{
//           maxWidth: "1200px",
//           margin: "0 auto",
//           padding: "4rem 2rem"
//         }}>
//           <motion.h2
//             initial={{ opacity: 0 }}
//             whileInView={{ opacity: 1 }}
//             transition={{ duration: 0.8 }}
//             style={{
//               fontSize: "clamp(2rem, 4vw, 3rem)",
//               fontWeight: "800",
//               textAlign: "center",
//               marginBottom: "3rem",
//               background: "linear-gradient(135deg, #e91e63, #ff9800)",
//               WebkitBackgroundClip: "text",
//               WebkitTextFillColor: "transparent"
//             }}
//           >
//             Perfect For Every Relationship
//           </motion.h2>

//           <div style={{
//             display: "grid",
//             gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
//             gap: "3rem",
//             perspective: "1000px"
//           }}>
            
//             {/* Couples Card */}
//             <TiltCard style={{
//               background: "linear-gradient(135deg, rgba(233,30,99,0.2), rgba(255,152,0,0.1))",
//               backdropFilter: "blur(15px)",
//               padding: "3rem 2rem",
//               borderRadius: "30px",
//               border: "1px solid rgba(233,30,99,0.3)",
//               boxShadow: "0 20px 60px rgba(233,30,99,0.2)"
//             }}>
//               <div style={{ fontSize: "5rem", marginBottom: "1rem", textAlign: "center" }}>
//                 💑
//               </div>
//               <h3 style={{
//                 fontSize: "1.8rem",
//                 marginBottom: "1rem",
//                 color: "#e91e63",
//                 fontWeight: "700",
//                 textAlign: "center"
//               }}>
//                 For Couples
//               </h3>
//               <p style={{
//                 fontSize: "1.1rem",
//                 color: "#ccc",
//                 lineHeight: "1.8",
//                 textAlign: "center"
//               }}>
//                 "What's your favorite memory of us?" "What makes you feel most loved?"
//                 Deepen intimacy and understanding with meaningful conversations.
//               </p>
//             </TiltCard>

//             {/* Friends Card */}
//             <TiltCard style={{
//               background: "linear-gradient(135deg, rgba(3,169,244,0.2), rgba(76,175,80,0.1))",
//               backdropFilter: "blur(15px)",
//               padding: "3rem 2rem",
//               borderRadius: "30px",
//               border: "1px solid rgba(3,169,244,0.3)",
//               boxShadow: "0 20px 60px rgba(3,169,244,0.2)"
//             }}>
//               <div style={{ fontSize: "5rem", marginBottom: "1rem", textAlign: "center" }}>
//                 👫
//               </div>
//               <h3 style={{
//                 fontSize: "1.8rem",
//                 marginBottom: "1rem",
//                 color: "#03a9f4",
//                 fontWeight: "700",
//                 textAlign: "center"
//               }}>
//                 For Friends
//               </h3>
//               <p style={{
//                 fontSize: "1.1rem",
//                 color: "#ccc",
//                 lineHeight: "1.8",
//                 textAlign: "center"
//               }}>
//                 "What's something you've never told me?" "When did you know we'd be best friends?"
//                 Strengthen your friendship through genuine curiosity.
//               </p>
//             </TiltCard>

//             {/* Family Card */}
//             <TiltCard style={{
//               background: "linear-gradient(135deg, rgba(255,152,0,0.2), rgba(255,87,34,0.1))",
//               backdropFilter: "blur(15px)",
//               padding: "3rem 2rem",
//               borderRadius: "30px",
//               border: "1px solid rgba(255,152,0,0.3)",
//               boxShadow: "0 20px 60px rgba(255,152,0,0.2)"
//             }}>
//               <div style={{ fontSize: "5rem", marginBottom: "1rem", textAlign: "center" }}>
//                 👨‍👩‍👧‍👦
//               </div>
//               <h3 style={{
//                 fontSize: "1.8rem",
//                 marginBottom: "1rem",
//                 color: "#ff9800",
//                 fontWeight: "700",
//                 textAlign: "center"
//               }}>
//                 For Family
//               </h3>
//               <p style={{
//                 fontSize: "1.1rem",
//                 color: "#ccc",
//                 lineHeight: "1.8",
//                 textAlign: "center"
//               }}>
//                 "What values are most important to you?" "What's your proudest moment?"
//                 Preserve family stories and create lasting memories together.
//               </p>
//             </TiltCard>

//           </div>
//         </div>

//         {/* Why This Matters Section */}
//         <div style={{
//           maxWidth: "900px",
//           margin: "6rem auto 4rem auto",
//           padding: "0 2rem",
//           textAlign: "center"
//         }}>
//           <motion.div
//             initial={{ opacity: 0, scale: 0.9 }}
//             whileInView={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.8 }}
//             style={{
//               background: "rgba(255,255,255,0.05)",
//               backdropFilter: "blur(20px)",
//               padding: "4rem 3rem",
//               borderRadius: "30px",
//               border: "1px solid rgba(255,255,255,0.1)",
//               boxShadow: "0 30px 60px rgba(0,0,0,0.3)"
//             }}
//           >
//             <div style={{ fontSize: "4rem", marginBottom: "1.5rem" }}>
//               💭
//             </div>
//             <h2 style={{
//               fontSize: "2.5rem",
//               marginBottom: "1.5rem",
//               background: "linear-gradient(135deg, #fff, #ff9800)",
//               WebkitBackgroundClip: "text",
//               WebkitTextFillColor: "transparent",
//               fontWeight: "800"
//             }}>
//               Why This Matters
//             </h2>
//             <p style={{
//               fontSize: "1.2rem",
//               color: "#b0b0b0",
//               lineHeight: "2",
//               marginBottom: "2rem"
//             }}>
//               In our busy lives, we often forget to ask the questions that truly matter.
//               We assume we know our loved ones, but there's always more to discover.
//               This platform creates space for curiosity, vulnerability, and genuine connection —
//               the foundation of every meaningful relationship.
//             </p>
//             <div style={{
//               display: "flex",
//               gap: "2rem",
//               justifyContent: "center",
//               marginTop: "2rem",
//               flexWrap: "wrap"
//             }}>
//               <div style={{ fontSize: "3rem" }}>🌱</div>
//               <div style={{ fontSize: "3rem" }}>🤝</div>
//               <div style={{ fontSize: "3rem" }}>💬</div>
//               <div style={{ fontSize: "3rem" }}>💖</div>
//             </div>
//           </motion.div>
//         </div>

//         {/* Final CTA */}
//         <div style={{
//           textAlign: "center",
//           padding: "4rem 2rem",
//           maxWidth: "800px",
//           margin: "0 auto"
//         }}>
//           <motion.h2
//             initial={{ opacity: 0 }}
//             whileInView={{ opacity: 1 }}
//             style={{
//               fontSize: "2.5rem",
//               marginBottom: "2rem",
//               fontWeight: "800"
//             }}
//           >
//             Ready to Build Stronger Connections?
//           </motion.h2>
//           <motion.div
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//           >
//             <button style={{
//               background: "linear-gradient(135deg, #ff9800, #ff5722)",
//               padding: "1.2rem 3rem",
//               borderRadius: "50px",
//               color: "#fff",
//               border: "none",
//               fontWeight: "700",
//               fontSize: "1.2rem",
//               cursor: "pointer",
//               boxShadow: "0 10px 30px rgba(255,152,0,0.5)"
//             }}>
//               Join the Waitlist 🚀
//             </button>
//           </motion.div>
//         </div>

//       </div>
//     </div>
//   );
// }


"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { FaHeart, FaQuestionCircle, FaUserFriends, FaPaperPlane, FaCheckCircle } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";

// 3D Tilt Card Component
const TiltCard = ({ children, className, style }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

  const handleMouseMove = (e) => {
    const rect = e.target.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        ...style
      }}
      className={className}
    >
      <div style={{ transform: "translateZ(75px)", transformStyle: "preserve-3d" }}>
        {children}
      </div>
    </motion.div>
  );
};

export default function About() {
  const [activeStep, setActiveStep] = useState(0);
  const [showBanner, setShowBanner] = useState(true);
  const canvasRef = useRef(null);
  const router = useRouter();

  // Particle animation
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
        this.size = Math.random() * 20 + 10;
        this.speedY = Math.random() * 2 + 1;
        this.opacity = Math.random() * 0.5 + 0.3;
        this.wobble = Math.random() * 2;
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
        ctx.fillText("❤️", this.x, this.y);
        ctx.restore();
      }
    }

    for (let i = 0; i < 15; i++) {
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

  const steps = [
    {
      icon: <FaQuestionCircle />,
      title: "Create Questions",
      description: "Add thoughtful questions you want to ask someone special",
      emoji: "✍️"
    },
    {
      icon: <FaPaperPlane />,
      title: "Generate & Share Link",
      description: "Get a unique link and send it to your loved one",
      emoji: "🔗"
    },
    {
      icon: <FaHeart />,
      title: "They Answer",
      description: "They receive your questions and share their thoughts",
      emoji: "💭"
    },
    {
      icon: <FaCheckCircle />,
      title: "Get Responses",
      description: "Receive their heartfelt answers and grow closer",
      emoji: "💝"
    }
  ];

  const handleExplorePlatform = () => {
    setShowBanner(false);
    setTimeout(() => {
      router.push('/home');
    }, 300);
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)",
      color: "#fff",
      fontFamily: "'Inter', 'Poppins', sans-serif",
      position: "relative",
      overflow: "hidden",
      paddingBottom: showBanner ? "120px" : "4rem" // Extra padding when banner is visible
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
          x: [0, 50, 0],
          y: [0, 30, 0]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          position: "fixed",
          top: "5%",
          right: "10%",
          width: "400px",
          height: "400px",
          background: "radial-gradient(circle, rgba(255,152,0,0.3) 0%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(80px)",
          zIndex: 0
        }}
      />

      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
          x: [0, -30, 0],
          y: [0, 50, 0]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        style={{
          position: "fixed",
          bottom: "10%",
          left: "5%",
          width: "450px",
          height: "450px",
          background: "radial-gradient(circle, rgba(3,169,244,0.3) 0%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(90px)",
          zIndex: 0
        }}
      />

      {/* Main Content */}
      <div style={{ position: "relative", zIndex: 1, padding: "2rem" }}>
        
        {/* Hero Section */}
        <div style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          maxWidth: "1200px",
          margin: "0 auto"
        }}>
          
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
            💡 The Vision
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            style={{
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              fontWeight: "900",
              marginBottom: "2rem",
              background: "linear-gradient(135deg, #fff 0%, #ff9800 40%, #03a9f4 80%, #e91e63 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              lineHeight: "1.2"
            }}
          >
            Deeper Connections,<br />One Question at a Time
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
            style={{
              maxWidth: "800px",
              fontSize: "clamp(1.1rem, 2vw, 1.4rem)",
              color: "#b0b0b0",
              marginBottom: "3rem",
              lineHeight: "1.8"
            }}
          >
            Imagine a platform where you can ask the questions that truly matter —
            to your partner, best friend, or family member. They answer honestly,
            and you discover new dimensions of your relationship.
          </motion.p>

          {/* Animated Emoji Section */}
          <div style={{
            display: "flex",
            gap: "2rem",
            marginBottom: "3rem",
            flexWrap: "wrap",
            justifyContent: "center"
          }}>
            <motion.div
              animate={{ 
                y: [0, -20, 0],
                rotate: [0, 10, 0]
              }}
              transition={{ duration: 3, repeat: Infinity }}
              style={{ fontSize: "5rem" }}
            >
              💑
            </motion.div>
            <motion.div
              animate={{ 
                y: [0, -15, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 2.5, repeat: Infinity, delay: 0.3 }}
              style={{ fontSize: "5rem" }}
            >
              👨‍👩‍👧‍👦
            </motion.div>
            <motion.div
              animate={{ 
                y: [0, -20, 0],
                rotate: [0, -10, 0]
              }}
              transition={{ duration: 3, repeat: Infinity, delay: 0.6 }}
              style={{ fontSize: "5rem" }}
            >
              👫
            </motion.div>
            <motion.div
              animate={{ 
                y: [0, -15, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 2.5, repeat: Infinity, delay: 0.9 }}
              style={{ fontSize: "5rem" }}
            >
              🤝
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <Link href="/" style={{
              display: "inline-block",
              background: "linear-gradient(135deg, #ff9800, #ff5722)",
              padding: "1rem 3rem",
              borderRadius: "50px",
              color: "#fff",
              textDecoration: "none",
              fontWeight: "700",
              fontSize: "1.2rem",
              boxShadow: "0 10px 30px rgba(255,152,0,0.5)",
              transition: "transform 0.3s ease, box-shadow 0.3s ease"
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "scale(1.05)";
              e.target.style.boxShadow = "0 15px 40px rgba(255,152,0,0.6)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "scale(1)";
              e.target.style.boxShadow = "0 10px 30px rgba(255,152,0,0.5)";
            }}
            >
              Back to Home 🏠
            </Link>
          </motion.div>
        </div>

        {/* How It Works Section */}
        <div style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "4rem 2rem"
        }}>
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: "800",
              textAlign: "center",
              marginBottom: "1rem",
              background: "linear-gradient(135deg, #ff9800, #03a9f4)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}
          >
            How It Works
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{
              textAlign: "center",
              fontSize: "1.2rem",
              color: "#999",
              marginBottom: "4rem"
            }}
          >
            Four simple steps to strengthen your relationships
          </motion.p>

          {/* Interactive Steps */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "2rem",
            marginBottom: "4rem"
          }}>
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onMouseEnter={() => setActiveStep(index)}
                style={{
                  background: activeStep === index 
                    ? "linear-gradient(135deg, rgba(255,152,0,0.15), rgba(3,169,244,0.15))"
                    : "rgba(255,255,255,0.05)",
                  backdropFilter: "blur(10px)",
                  padding: "2.5rem 2rem",
                  borderRadius: "25px",
                  border: activeStep === index 
                    ? "2px solid rgba(255,152,0,0.5)"
                    : "1px solid rgba(255,255,255,0.1)",
                  textAlign: "center",
                  cursor: "pointer",
                  transition: "all 0.4s ease",
                  transform: activeStep === index ? "scale(1.05)" : "scale(1)",
                  boxShadow: activeStep === index 
                    ? "0 20px 50px rgba(255,152,0,0.3)"
                    : "none"
                }}
              >
                <motion.div
                  animate={activeStep === index ? { 
                    scale: [1, 1.2, 1],
                    rotate: [0, 360, 360]
                  } : {}}
                  transition={{ duration: 0.8 }}
                  style={{
                    fontSize: "4rem",
                    marginBottom: "1rem"
                  }}
                >
                  {step.emoji}
                </motion.div>
                
                <div style={{
                  fontSize: "3rem",
                  color: "#ff9800",
                  marginBottom: "1rem"
                }}>
                  {step.icon}
                </div>

                <h3 style={{
                  fontSize: "1.4rem",
                  marginBottom: "1rem",
                  color: "#fff",
                  fontWeight: "700"
                }}>
                  {step.title}
                </h3>

                <p style={{
                  fontSize: "1rem",
                  color: "#999",
                  lineHeight: "1.6"
                }}>
                  {step.description}
                </p>

                <div style={{
                  marginTop: "1.5rem",
                  fontSize: "2rem",
                  fontWeight: "800",
                  color: activeStep === index ? "#ff9800" : "#333"
                }}>
                  {index + 1}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Use Cases Section with 3D Cards */}
        <div style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "4rem 2rem"
        }}>
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: "800",
              textAlign: "center",
              marginBottom: "3rem",
              background: "linear-gradient(135deg, #e91e63, #ff9800)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}
          >
            Perfect For Every Relationship
          </motion.h2>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "3rem",
            perspective: "1000px"
          }}>
            
            {/* Couples Card */}
            <TiltCard style={{
              background: "linear-gradient(135deg, rgba(233,30,99,0.2), rgba(255,152,0,0.1))",
              backdropFilter: "blur(15px)",
              padding: "3rem 2rem",
              borderRadius: "30px",
              border: "1px solid rgba(233,30,99,0.3)",
              boxShadow: "0 20px 60px rgba(233,30,99,0.2)"
            }}>
              <div style={{ fontSize: "5rem", marginBottom: "1rem", textAlign: "center" }}>
                💑
              </div>
              <h3 style={{
                fontSize: "1.8rem",
                marginBottom: "1rem",
                color: "#e91e63",
                fontWeight: "700",
                textAlign: "center"
              }}>
                For Couples
              </h3>
              <p style={{
                fontSize: "1.1rem",
                color: "#ccc",
                lineHeight: "1.8",
                textAlign: "center"
              }}>
                "What's your favorite memory of us?" "What makes you feel most loved?"
                Deepen intimacy and understanding with meaningful conversations.
              </p>
            </TiltCard>

            {/* Friends Card */}
            <TiltCard style={{
              background: "linear-gradient(135deg, rgba(3,169,244,0.2), rgba(76,175,80,0.1))",
              backdropFilter: "blur(15px)",
              padding: "3rem 2rem",
              borderRadius: "30px",
              border: "1px solid rgba(3,169,244,0.3)",
              boxShadow: "0 20px 60px rgba(3,169,244,0.2)"
            }}>
              <div style={{ fontSize: "5rem", marginBottom: "1rem", textAlign: "center" }}>
                👫
              </div>
              <h3 style={{
                fontSize: "1.8rem",
                marginBottom: "1rem",
                color: "#03a9f4",
                fontWeight: "700",
                textAlign: "center"
              }}>
                For Friends
              </h3>
              <p style={{
                fontSize: "1.1rem",
                color: "#ccc",
                lineHeight: "1.8",
                textAlign: "center"
              }}>
                "What's something you've never told me?" "When did you know we'd be best friends?"
                Strengthen your friendship through genuine curiosity.
              </p>
            </TiltCard>

            {/* Family Card */}
            <TiltCard style={{
              background: "linear-gradient(135deg, rgba(255,152,0,0.2), rgba(255,87,34,0.1))",
              backdropFilter: "blur(15px)",
              padding: "3rem 2rem",
              borderRadius: "30px",
              border: "1px solid rgba(255,152,0,0.3)",
              boxShadow: "0 20px 60px rgba(255,152,0,0.2)"
            }}>
              <div style={{ fontSize: "5rem", marginBottom: "1rem", textAlign: "center" }}>
                👨‍👩‍👧‍👦
              </div>
              <h3 style={{
                fontSize: "1.8rem",
                marginBottom: "1rem",
                color: "#ff9800",
                fontWeight: "700",
                textAlign: "center"
              }}>
                For Family
              </h3>
              <p style={{
                fontSize: "1.1rem",
                color: "#ccc",
                lineHeight: "1.8",
                textAlign: "center"
              }}>
                "What values are most important to you?" "What's your proudest moment?"
                Preserve family stories and create lasting memories together.
              </p>
            </TiltCard>

          </div>
        </div>

        {/* Why This Matters Section */}
        <div style={{
          maxWidth: "900px",
          margin: "6rem auto 4rem auto",
          padding: "0 2rem",
          textAlign: "center"
        }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            style={{
              background: "rgba(255,255,255,0.05)",
              backdropFilter: "blur(20px)",
              padding: "4rem 3rem",
              borderRadius: "30px",
              border: "1px solid rgba(255,255,255,0.1)",
              boxShadow: "0 30px 60px rgba(0,0,0,0.3)"
            }}
          >
            <div style={{ fontSize: "4rem", marginBottom: "1.5rem" }}>
              💭
            </div>
            <h2 style={{
              fontSize: "2.5rem",
              marginBottom: "1.5rem",
              background: "linear-gradient(135deg, #fff, #ff9800)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontWeight: "800"
            }}>
              Why This Matters
            </h2>
            <p style={{
              fontSize: "1.2rem",
              color: "#b0b0b0",
              lineHeight: "2",
              marginBottom: "2rem"
            }}>
              In our busy lives, we often forget to ask the questions that truly matter.
              We assume we know our loved ones, but there's always more to discover.
              This platform creates space for curiosity, vulnerability, and genuine connection —
              the foundation of every meaningful relationship.
            </p>
            <div style={{
              display: "flex",
              gap: "2rem",
              justifyContent: "center",
              marginTop: "2rem",
              flexWrap: "wrap"
            }}>
              <div style={{ fontSize: "3rem" }}>🌱</div>
              <div style={{ fontSize: "3rem" }}>🤝</div>
              <div style={{ fontSize: "3rem" }}>💬</div>
              <div style={{ fontSize: "3rem" }}>💖</div>
            </div>
          </motion.div>
        </div>

        {/* Final CTA */}
        <div style={{
          textAlign: "center",
          padding: "4rem 2rem",
          maxWidth: "800px",
          margin: "0 auto"
        }}>
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            style={{
              fontSize: "2.5rem",
              marginBottom: "2rem",
              fontWeight: "800"
            }}
          >
            Ready to Build Stronger Connections?
          </motion.h2>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <button 
              onClick={handleExplorePlatform}
              style={{
                background: "linear-gradient(135deg, #ff9800, #ff5722)",
                padding: "1.2rem 3rem",
                borderRadius: "50px",
                color: "#fff",
                border: "none",
                fontWeight: "700",
                fontSize: "1.2rem",
                cursor: "pointer",
                boxShadow: "0 10px 30px rgba(255,152,0,0.5)"
              }}
            >
              Explore the Platform 🚀
            </button>
          </motion.div>
        </div>

      </div>

      {/* Cookie-Style Banner - Website is Ready */}
      {showBanner && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            background: "linear-gradient(135deg, rgba(26,26,46,0.98), rgba(22,33,62,0.98))",
            backdropFilter: "blur(20px)",
            borderTop: "2px solid rgba(255,152,0,0.4)",
            padding: "1.5rem 2rem",
            zIndex: 1000,
            boxShadow: "0 -10px 40px rgba(0,0,0,0.5)"
          }}
        >
          <div style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "2rem",
            flexWrap: "wrap"
          }}>
            <div style={{ flex: 1, minWidth: "280px" }}>
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                marginBottom: "0.5rem"
              }}>
                <motion.span
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{ fontSize: "2rem" }}
                >
                  🎉
                </motion.span>
                <h3 style={{
                  fontSize: "1.3rem",
                  fontWeight: "700",
                  color: "#ff9800",
                  margin: 0
                }}>
                  Website is Ready!
                </h3>
              </div>
              <p style={{
                fontSize: "1rem",
                color: "#b0b0b0",
                margin: 0,
                lineHeight: "1.6"
              }}>
                Start creating meaningful polls and questions. Connect with loved ones through heartfelt answers! 💝
              </p>
            </div>

            <div style={{
              display: "flex",
              gap: "1rem",
              alignItems: "center"
            }}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleExplorePlatform}
                style={{
                  background: "linear-gradient(135deg, #ff9800, #ff5722)",
                  padding: "0.9rem 2rem",
                  borderRadius: "50px",
                  color: "#fff",
                  border: "none",
                  fontWeight: "700",
                  fontSize: "1.1rem",
                  cursor: "pointer",
                  boxShadow: "0 5px 20px rgba(255,152,0,0.4)",
                  whiteSpace: "nowrap"
                }}
              >
                Explore Now 🚀
              </motion.button>

              <button
                onClick={() => setShowBanner(false)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#666",
                  fontSize: "1.5rem",
                  cursor: "pointer",
                  padding: "0.5rem",
                  transition: "color 0.3s ease"
                }}
                onMouseEnter={(e) => e.target.style.color = "#ff9800"}
                onMouseLeave={(e) => e.target.style.color = "#666"}
              >
                ✕
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}