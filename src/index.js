import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { initiateStore } from './store/store';
import * as actions from './store/actions';

const store = initiateStore();

const App = () => {
  const [state, setState] = useState(store.getState());

  const completeTask = (taskId) => {
    store.dispatch(actions.taskCompleted(taskId)); 
    console.log(store.getState());
  };

  const changeTitle = (taskId) => {
    store.dispatch(actions.titleChanged(taskId));
    console.log(store.getState());
  };

  const deleteTask = (taskId) => {
    store.dispatch(actions.taskDeleted(taskId))
  };
  
  useEffect(() => {
    store.subscribe(() => {
      setState(store.getState());
    });
  }, []);

  return <>
    <h1>redux</h1>
    <ul>
    {
      state.map(elem => <li key={elem.id}>
        <p>{elem.title}</p>
        <p>Completed: {elem.completed.toString()}</p>
        <button
          onClick={() => completeTask(elem.id)}>
            Completed
        </button>
         <button
          onClick={() => changeTitle(elem.id)}>
            Change title
        </button>
          <button
          onClick={() => deleteTask(elem.id)}>
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
    <App />
  </React.StrictMode>
);
