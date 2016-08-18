import { createStore, combineReducers, applyMiddleware } from 'redux';
// import {reducer as formReducer} from 'redux-form';
import * as reducers from './reducers';
import promisesMiddleware from './middlewares/promises';
import createLogger from 'redux-logger';

const reducer = combineReducers(reducers);

// со времен выхода видео redux-logger изменился. теперь сперва создать логгер через createLogger()
const logger = createLogger();
const createStoreWithMiddleware = applyMiddleware(
  promisesMiddleware,
  logger
)(createStore);

const store = createStoreWithMiddleware(reducer, {
  issues: [],
  counter: 0,
});

export default store;