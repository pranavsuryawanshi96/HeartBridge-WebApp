import { configureStore, createSlice } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';

const LEGACY_QUESTION_STORAGE_KEY = 'question-connect-storage';
const QUESTION_STORAGE_KEY = 'heartbridge-question-draft';

const loadQuestionState = () => {
  if (typeof window === 'undefined') return undefined;

  try {
    window.localStorage.removeItem(LEGACY_QUESTION_STORAGE_KEY);

    const stored = window.localStorage.getItem(QUESTION_STORAGE_KEY);
    if (!stored) return undefined;

    const parsed = JSON.parse(stored);
    return parsed?.state || parsed;
  } catch {
    return undefined;
  }
};

const initialQuestionState = {
  creatorName: '',
  recipientName: '',
  questions: [],
  generatedLinkId: null,
  ...loadQuestionState(),
};

const questionSlice = createSlice({
  name: 'questions',
  initialState: initialQuestionState,
  reducers: {
    addQuestion: (state, action) => {
      state.questions.push({
        id: Date.now().toString(),
        ...action.payload,
      });
    },
    removeQuestion: (state, action) => {
      state.questions = state.questions.filter((question) => question.id !== action.payload);
    },
    updateQuestion: (state, action) => {
      const { id, updates } = action.payload;
      state.questions = state.questions.map((question) =>
        question.id === id ? { ...question, ...updates } : question
      );
    },
    clearQuestions: (state) => {
      state.questions = [];
    },
    setCreatorName: (state, action) => {
      state.creatorName = action.payload;
    },
    setRecipientName: (state, action) => {
      state.recipientName = action.payload;
    },
    setGeneratedLinkId: (state, action) => {
      state.generatedLinkId = action.payload;
    },
    resetStore: (state) => {
      state.creatorName = '';
      state.recipientName = '';
      state.questions = [];
      state.generatedLinkId = null;
    },
  },
});

const initialAnswerState = {
  respondentInfo: {
    name: '',
    age: '',
    gender: '',
    relation: '',
    mobile: '',
  },
  answers: {},
};

const answerSlice = createSlice({
  name: 'answers',
  initialState: initialAnswerState,
  reducers: {
    setRespondentInfo: (state, action) => {
      state.respondentInfo = action.payload;
    },
    setAnswer: (state, action) => {
      const { questionId, answer } = action.payload;
      state.answers[questionId] = answer;
    },
    resetAnswers: (state) => {
      state.respondentInfo = initialAnswerState.respondentInfo;
      state.answers = {};
    },
  },
});

const questionActions = questionSlice.actions;
const answerActions = answerSlice.actions;

export const store = configureStore({
  reducer: {
    questions: questionSlice.reducer,
    answers: answerSlice.reducer,
  },
});

store.subscribe(() => {
  if (typeof window === 'undefined') return;

  const state = store.getState().questions;
  window.localStorage.setItem(
    QUESTION_STORAGE_KEY,
    JSON.stringify({
      state: {
        creatorName: state.creatorName,
        recipientName: state.recipientName,
        questions: state.questions,
        generatedLinkId: state.generatedLinkId,
      },
    })
  );
});

export const useQuestionStore = () => {
  const dispatch = useDispatch();
  const questionState = useSelector((state) => state.questions);

  return {
    ...questionState,
    addQuestion: (question) => dispatch(questionActions.addQuestion(question)),
    removeQuestion: (id) => dispatch(questionActions.removeQuestion(id)),
    updateQuestion: (id, updates) => dispatch(questionActions.updateQuestion({ id, updates })),
    clearQuestions: () => dispatch(questionActions.clearQuestions()),
    setCreatorName: (name) => dispatch(questionActions.setCreatorName(name)),
    setRecipientName: (name) => dispatch(questionActions.setRecipientName(name)),
    setGeneratedLinkId: (linkId) => dispatch(questionActions.setGeneratedLinkId(linkId)),
    getQuestionData: () => ({
      creatorName: questionState.creatorName,
      recipientName: questionState.recipientName,
      questions: questionState.questions,
    }),
    resetStore: () => dispatch(questionActions.resetStore()),
  };
};

export const useAnswerStore = () => {
  const dispatch = useDispatch();
  const answerState = useSelector((state) => state.answers);

  return {
    ...answerState,
    setRespondentInfo: (info) => dispatch(answerActions.setRespondentInfo(info)),
    setAnswer: (questionId, answer) => dispatch(answerActions.setAnswer({ questionId, answer })),
    getAllAnswers: () => answerState,
    resetAnswers: () => dispatch(answerActions.resetAnswers()),
  };
};
