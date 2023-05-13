import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import gitSliceReducer from './git/gitSlice';
import gitSaga from './git/gitSaga';

// creating the saga middleware and it's configuration with redux store
const saga = createSagaMiddleware();
const store = configureStore({
  reducer: { gitSliceReducer },
  middleware: [saga],
});

saga.run(gitSaga);

export default store;
