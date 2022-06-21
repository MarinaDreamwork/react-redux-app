import { createSlice, createAction } from "@reduxjs/toolkit";
import todosService from "../services/todos.service";
import { setErrors } from "./errors";

const initialState = { entities: [], isLoading: true };

// const taskRequested = createAction('tasks/requested');
// const taskRequestedFailed = createAction('tasks/requstFailed');

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    update(state, action) {
      const elementIndex = state.entities.findIndex(el => el.id === action.payload.id);
      state.entities[elementIndex] = {
        ...state.entities[elementIndex],
        ...action.payload
      }; 
      return state;
    },
    remove(state, action) {
      state.entities = state.entities.filter(el => el.id !== action.payload.id);
    },
    received(state, action) {
      state.entities = action.payload;
      state.isLoading = false
    },
    taskRequested(state, action) {
      state.isLoading = true;
    },
    taskRequestedFailed(state, action) {
      state.isLoading = false;
    },
    taskCreated(state, action) {
      state.entities.push(action.payload);
    }
  }
});

const { actions, reducer: taskReducer} = taskSlice;
const { update, remove, received, taskRequested, taskRequestedFailed, taskCreated } = actions;

export const completeTask = (id) => (dispatch, getState) => {
  dispatch(update({ id, completed: true })); 
};

export const titleChanged = (id) => (dispatch, getState) => {
  dispatch(update({ id, title: `New title for task ${id}`}));
};

export const taskRemoved = (id) => (dispatch) => {
  dispatch(remove({ id }));
};

export const taskCreate = (payload) => async (dispatch) => {
  try{
    const data = await todosService.createTask(payload);
    dispatch(taskCreated(data));
  } catch (error) {
    console.log(error);
  }
};

export const loadTasks = () => async (dispatch) => {
  dispatch(taskRequested());
  try {
    const data = await todosService.fetch();
    dispatch(received(data));
  } catch(error) {
    dispatch(taskRequestedFailed(error.message));
    dispatch(setErrors(error.message));
  }
};

export const getTasks = () => (state) => state.tasks.entities;

export const getLoadingStatus = () => (state) => state.tasks.isLoading;

export default taskReducer;