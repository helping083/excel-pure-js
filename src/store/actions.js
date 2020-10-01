import {TABLE_RESIZE, CHANGE_TEXT} from './types';

/**
 * @param {object} data
 * @return {object}
 */
export function tableResizerAction(data) {
  return {
    type: TABLE_RESIZE,
    data,
  }
}

/**
 * @param {string} data
 * @return {object}
 */
export function changeText(data) {
  return {
    type: CHANGE_TEXT,
    data,
  }
}
