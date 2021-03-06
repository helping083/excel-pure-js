import {TABLE_RESIZE} from '@/store/types';
/**
 * root store of our app
 * @param {object} state
 * @param {object} action
 * @return {object}
 */
export function rootReducer(state, action) {
  let prevState
  switch (action.type) {
    case TABLE_RESIZE:
      prevState = state.colState || {};
      prevState[action.data.id] = action.data.value;
      return {...state, colState: prevState}
    default: return state
  }
}
