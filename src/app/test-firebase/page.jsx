"use client";

import { useState, useEffect } from "react";
import { testFirebaseConnection, createQuestionSet } from "@/lib/db";

export default function TestFirebase() {
  const [status, setStatus] = useState({ loading: true, message: "Testing..." });
  const [testResults, setTestResults] = useState([]);

  const addResult = (emoji, title, message, success) => {
    setTestResults(prev => [...prev, { emoji, title, message, success }]);
  };

  useEffect(() => {
    runTests();
  }, []);

  const runTests = async () => {
    setTestResults([]);
    
    // Test 1: Environment Variables
    addResult(
      "🔧",
      "Environment Variables",
      process.env.NEXT_PUBLIC_FIREBASE_API_KEY ? "✅ API Key found" : "❌ API Key missing",
      !!process.env.NEXT_PUBLIC_FIREBASE_API_KEY
    );

    addResult(
      "🔧",
      "Project ID",
      process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "❌ Project ID missing",
      !!process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
    );

    // Test 2: Firebase Connection
    const connectionTest = await testFirebaseConnection();
    addResult(
      "🔥",
      "Firebase Connection",
      connectionTest.success ? "✅ Connected successfully" : `❌ ${connectionTest.error}`,
      connectionTest.success
    );

    // Test 3: Create Test Document
    if (connectionTest.success) {
      const testData = {
        creatorName: "Test User",
        recipientName: "Test Recipient",
        questions: [
          { id: "1", text: "Test question?", type: "text" }
        ]
      };

      const createTest = await createQuestionSet(testData);
      addResult(
        "💾",
        "Create Document",
        createTest.success 
          ? `✅ Document created! ID: ${createTest.uniqueId}` 
          : `❌ ${createTest.error}`,
        createTest.success
      );
    }

    setStatus({ loading: false, message: "Tests complete!" });
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)",
      color: "#fff",
      padding: "2rem",
      fontFamily: "'Inter', sans-serif"
    }}>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <h1 style={{
          fontSize: "2.5rem",
          marginBottom: "1rem",
          background: "linear-gradient(135deg, #ff9800, #03a9f4)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent"
        }}>
          🔬 Firebase Connection Test
        </h1>

        <p style={{ color: "#999", marginBottom: "2rem" }}>
          This page tests your Firebase configuration. If all tests pass, your app is ready!
        </p>

        {/* Test Results */}
        <div style={{
          background: "rgba(255,255,255,0.05)",
          padding: "2rem",
          borderRadius: "20px",
          border: "1px solid rgba(255,255,255,0.1)"
        }}>
          {testResults.map((result, index) => (
            <div
              key={index}
              style={{
                padding: "1rem",
                marginBottom: "1rem",
                background: result.success 
                  ? "rgba(76,175,80,0.1)" 
                  : "rgba(244,67,54,0.1)",
                border: `1px solid ${result.success ? "rgba(76,175,80,0.3)" : "rgba(244,67,54,0.3)"}`,
                borderRadius: "10px"
              }}
            >
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                marginBottom: "0.5rem"
              }}>
                <span style={{ fontSize: "2rem" }}>{result.emoji}</span>
                <strong>{result.title}</strong>
              </div>
              <div style={{
                paddingLeft: "3rem",
                color: result.success ? "#4caf50" : "#f44336"
              }}>
                {result.message}
              </div>
            </div>
          ))}

          {status.loading && (
            <div style={{ textAlign: "center", padding: "2rem" }}>
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>⏳</div>
              <p>{status.message}</p>
            </div>
          )}
        </div>

        {/* Instructions */}
        <div style={{
          marginTop: "2rem",
          padding: "1.5rem",
          background: "rgba(255,152,0,0.1)",
          border: "1px solid rgba(255,152,0,0.3)",
          borderRadius: "15px"
        }}>
          <h3 style={{ color: "#ff9800", marginBottom: "1rem" }}>💡 How to Fix Issues:</h3>
          <ol style={{ color: "#ccc", lineHeight: "1.8" }}>
            <li>Create <code>.env.local</code> file in project root</li>
            <li>Add Firebase credentials from Firebase Console</li>
            <li>Enable Firestore Database in Firebase Console</li>
            <li>Set Firestore rules to test mode</li>
            <li>Restart dev server: <code>npm run dev</code></li>
          </ol>
          <p style={{ marginTop: "1rem", color: "#999" }}>
            See <strong>TROUBLESHOOTING.md</strong> for detailed instructions!
          </p>
        </div>

        {/* Retry Button */}
        <button
          onClick={runTests}
          style={{
            marginTop: "2rem",
            padding: "1rem 2rem",
            background: "linear-gradient(135deg, #ff9800, #ff5722)",
            border: "none",
            borderRadius: "10px",
            color: "#fff",
            fontSize: "1rem",
            fontWeight: "700",
            cursor: "pointer"
          }}
        >
          🔄 Run Tests Again
        </button>

        {/* Console Instructions */}
        <div style={{
          marginTop: "2rem",
          padding: "1rem",
          background: "rgba(3,169,244,0.1)",
          border: "1px solid rgba(3,169,244,0.3)",
          borderRadius: "10px",
          fontSize: "0.9rem",
          color: "#999"
        }}>
          <strong style={{ color: "#03a9f4" }}>💻 Pro Tip:</strong> Open browser console (F12) to see detailed logs with emojis!
        </div>
      </div>
    </div>
  );
}