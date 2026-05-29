import {
  collection,
  addDoc,
  doc,
  updateDoc,
  serverTimestamp,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "./firebase";

// Generate unique short ID
export const generateUniqueId = () => {
  return Math.random().toString(36).substring(2, 10) + Date.now().toString(36);
};

// Test Firebase connection
export const testFirebaseConnection = async () => {
  try {
    console.log("🧪 Testing Firebase connection...");
    const testRef = collection(db, "test");
    const q = query(testRef);
    await getDocs(q);
    console.log("✅ Firebase connection successful!");
    return { success: true };
  } catch (error) {
    console.error("❌ Firebase connection failed:", error);
    console.error("Error code:", error.code);
    console.error("Error message:", error.message);
    return {
      success: false,
      error: error.message,
      code: error.code,
    };
  }
};

// Create new question set with timeout
export const createQuestionSet = async (data) => {
  console.log("📝 Creating question set...", data);

  try {
    // Validate data
    if (
      !data.creatorName ||
      !data.recipientName ||
      !data.questions ||
      data.questions.length === 0
    ) {
      throw new Error(
        "Missing required fields: creatorName, recipientName, or questions",
      );
    }

    // Check if db is initialized
    if (!db) {
      throw new Error(
        "Firebase database not initialized. Please check your .env.local file.",
      );
    }

    const uniqueId = generateUniqueId();
    console.log("🔑 Generated unique ID:", uniqueId);

    const questionSet = {
      uniqueId,
      creatorName: data.creatorName || "Anonymous",
      recipientName: data.recipientName || "Someone",
      questions: data.questions,
      createdAt: serverTimestamp(),
      answers: null,
      isAnswered: false,
    };

    console.log("💾 Saving to Firestore...");
    console.log("📊 Data to save:", {
      uniqueId,
      creatorName: questionSet.creatorName,
      questionCount: questionSet.questions.length,
    });

    // Add timeout wrapper to prevent infinite hanging
    const savePromise = addDoc(collection(db, "questionSets"), questionSet);
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(
        () => reject(new Error("Request timeout after 15 seconds")),
        15000,
      ),
    );

    const docRef = await Promise.race([savePromise, timeoutPromise]);

    console.log("✅ Question set created successfully!");
    console.log("📄 Document ID:", docRef.id);
    console.log("🔗 Unique ID:", uniqueId);

    return {
      success: true,
      uniqueId,
      docId: docRef.id,
    };
  } catch (error) {
    console.warn("❌ ERROR creating question set!");
    console.warn("Error object:", error);
    console.warn("Error code:", error.code);
    console.warn("Error message:", error.message);
    console.warn("Error stack:", error.stack);

    // Provide more specific error messages
    let userMessage = error.message;
    let solution = "";

    if (error.code === "permission-denied") {
      userMessage =
        "Permission denied - Firestore security rules blocking write";
      solution =
        "Fix: Go to Firebase Console → Firestore → Rules → Set to test mode";
      console.warn("🔧 SOLUTION: Update Firestore rules to allow writes");
      console.warn("Rules should be:");
      console.warn(`
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
      `);
    } else if (error.code === "unavailable") {
      userMessage = "Firebase is unavailable";
      solution = "Check your internet connection and Firebase status";
    } else if (error.message.includes("timeout")) {
      userMessage = "Request timed out - Firestore may not be enabled";
      solution = "Enable Firestore Database in Firebase Console";
    } else if (error.message.includes("Firebase")) {
      userMessage = "Firebase not configured properly";
      solution = "Check your .env.local file has all Firebase credentials";
    }

    console.warn("💡 SOLUTION:", solution);

    return {
      success: false,
      error: userMessage,
      solution: solution,
      details: error.message,
      code: error.code,
    };
  }
};

// Get question set by unique ID
export const getQuestionSet = async (uniqueId) => {
  console.log("🔍 Fetching question set:", uniqueId);

  try {
    if (!uniqueId) {
      throw new Error("Unique ID is required");
    }

    if (!db) {
      throw new Error("Firebase database not initialized");
    }

    const q = query(
      collection(db, "questionSets"),
      where("uniqueId", "==", uniqueId),
    );

    console.log("📡 Querying Firestore...");
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log("❌ Question set not found");
      return { success: false, error: "Question set not found" };
    }

    const docData = querySnapshot.docs[0].data();
    const docId = querySnapshot.docs[0].id;

    console.log("✅ Question set found!", docId);

    return {
      success: true,
      data: {
        id: docId,
        ...docData,
      },
    };
  } catch (error) {
    console.error("❌ Error getting question set:", error);
    return {
      success: false,
      error: error.message,
      code: error.code,
    };
  }
};

// Submit answers
export const submitAnswers = async (uniqueId, answerData) => {
  console.log("📤 Submitting answers for:", uniqueId);

  try {
    if (!uniqueId || !answerData) {
      throw new Error("Unique ID and answer data are required");
    }

    if (!db) {
      throw new Error("Firebase database not initialized");
    }

    const q = query(
      collection(db, "questionSets"),
      where("uniqueId", "==", uniqueId),
    );

    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return { success: false, error: "Question set not found" };
    }

    const docId = querySnapshot.docs[0].id;
    const docRef = doc(db, "questionSets", docId);

    console.log("💾 Updating document...");
    await updateDoc(docRef, {
      answers: answerData,
      isAnswered: true,
      answeredAt: serverTimestamp(),
    });

    console.log("✅ Answers submitted successfully!");
    return { success: true };
  } catch (error) {
    console.error("❌ Error submitting answers:", error);
    return {
      success: false,
      error: error.message,
      code: error.code,
    };
  }
};

// Get creator's question sets with answers
export const getCreatorQuestionSets = async (creatorName) => {
  console.log("🔍 Fetching question sets for:", creatorName);

  try {
    if (!creatorName) {
      throw new Error("Creator name is required");
    }

    if (!db) {
      throw new Error("Firebase database not initialized");
    }

    const q = query(
      collection(db, "questionSets"),
      where("creatorName", "==", creatorName),
      where("isAnswered", "==", true),
    );

    const querySnapshot = await getDocs(q);

    const questionSets = [];
    querySnapshot.forEach((doc) => {
      questionSets.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    console.log(`✅ Found ${questionSets.length} question sets`);

    return {
      success: true,
      data: questionSets,
    };
  } catch (error) {
    console.error("❌ Error getting creator question sets:", error);
    return {
      success: false,
      error: error.message,
      code: error.code,
    };
  }
};
