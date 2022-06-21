import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { getErrors } from './store/errors';
import createStore from './store/store';
import { completeTask, getLoadingStatus, getTasks, loadTasks, taskCreate, taskRemoved, titleChanged } from './store/task';
// import { initiateStore } from './store/store';

const store = createStore();


const App = () => {
  const dispatch = useDispatch();
  const state = useSelector(getTasks());
  const isLoading = useSelector(getLoadingStatus());
  const error = useSelector(getErrors());
  
  useEffect(() => {
    dispatch(loadTasks());
  }, []);

  if(isLoading) {
    return <h1>Loading...</h1>
  }

  if(error) {
    return <p>{error}</p>
  }

  return <>
    <h1>redux</h1>
    <button onClick={() => dispatch(taskCreate({title: 'some title', completed: false}))}>create new task</button>
    <ul>
    {
      state.map(elem => <li key={elem.id}>
        <p>{elem.title}</p>
        <p>Completed: {elem.completed.toString()}</p>
        <button
          onClick={() => dispatch(completeTask(elem.id))}>
            Completed
        </button>
         <button
          onClick={() => dispatch(titleChanged(elem.id))}>
            Change title
        </button>
          <button
          onClick={() => dispatch(taskRemoved(elem.id))}>
            Delete task
        </button>
        <hr />
      </li>)
    }
    </ul>
  </>
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
