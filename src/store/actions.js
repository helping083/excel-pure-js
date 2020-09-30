import {TABLE_RESIZE} from './types';

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
