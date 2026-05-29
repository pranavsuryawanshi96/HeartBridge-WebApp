// State Management with Zustand
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useQuestionStore = create(
  persist(
    (set, get) => ({
      // Creator's data
      creatorName: '',
      recipientName: '',
      questions: [],
      generatedLinkId: null,
      
      // Question management
      addQuestion: (question) => set((state) => ({
        questions: [...state.questions, {
          id: Date.now().toString(),
          ...question
        }]
      })),
      
      removeQuestion: (id) => set((state) => ({
        questions: state.questions.filter(q => q.id !== id)
      })),
      
      updateQuestion: (id, updates) => set((state) => ({
        questions: state.questions.map(q => 
          q.id === id ? { ...q, ...updates } : q
        )
      })),
      
      clearQuestions: () => set({ questions: [] }),
      
      // Creator info
      setCreatorName: (name) => set({ creatorName: name }),
      setRecipientName: (name) => set({ recipientName: name }),
      
      // Link generation
      setGeneratedLinkId: (linkId) => set({ generatedLinkId: linkId }),
      
      // Get all data for submission
      getQuestionData: () => {
        const state = get();
        return {
          creatorName: state.creatorName,
          recipientName: state.recipientName,
          questions: state.questions,
        };
      },
      
      // Reset everything
      resetStore: () => set({
        creatorName: '',
        recipientName: '',
        questions: [],
        generatedLinkId: null,
      })
    }),
    {
      name: 'question-connect-storage', // localStorage key
      partialize: (state) => ({
        creatorName: state.creatorName,
        recipientName: state.recipientName,
        questions: state.questions,
        generatedLinkId: state.generatedLinkId,
      })
    }
  )
);

// Answer store for recipients
export const useAnswerStore = create((set) => ({
  respondentInfo: {
    name: '',
    age: '',
    gender: '',
    relation: '',
    mobile: '',
  },
  answers: {},
  
  setRespondentInfo: (info) => set({ respondentInfo: info }),
  
  setAnswer: (questionId, answer) => set((state) => ({
    answers: { ...state.answers, [questionId]: answer }
  })),
  
  getAllAnswers: () => {
    const state = useAnswerStore.getState();
    return {
      respondentInfo: state.respondentInfo,
      answers: state.answers,
    };
  },
  
  resetAnswers: () => set({
    respondentInfo: { name: '', age: '', gender: '', relation: '', mobile: '' },
    answers: {},
  })
}));