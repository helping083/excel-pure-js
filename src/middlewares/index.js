import axiosMiddleware from './axiosMiddleware';
import applyMiddleware from '@core/applyMiddleware';
const middlewareList = [
  axiosMiddleware,
];

export default applyMiddleware(...middlewareList)
