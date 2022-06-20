import * as actions from './actionTypes';

export function taskCompleted(id) {
  return { 
    type: actions.taskUpdated,
    payload: { id, completed: true }
  }
};

export function titleChanged(id) {
  return {
    type: actions.taskUpdated,
    payload: { id, title: `New title for task ${id}`}
  }
};

export function taskDeleted(id) {
  return {
    type: actions.taskDeleted,
    payload: { id }
  }
};