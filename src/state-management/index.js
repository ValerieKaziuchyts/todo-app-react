import { createStore } from 'redux';
import { reducer } from './reducers';

const saveState = (state) => {
  const serializedState = JSON.stringify(state);
  localStorage.setItem('state', serializedState);
};

const loadState = () => {
  try {
    const serialisedState = window.localStorage.getItem('state');
    if (!serialisedState) return undefined;
    return JSON.parse(serialisedState);
  } catch (err) {
    return undefined;
  }
};

const oldState = loadState();

export const store = createStore(reducer, oldState);

store.subscribe(() => {
  saveState(store.getState());
});
