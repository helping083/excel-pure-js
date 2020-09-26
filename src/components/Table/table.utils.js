import {TABLE} from './constants';
/**
 * @param {event} e
 * @return {object}
*/
export function shouldResize(e) {
  return e.target.dataset.resize;
}

/**
 * @param {event} e
 * @return {boolean}
*/
export function isSelectable(e) {
  const {id} = e.target.dataset
  return !!id;
}

/**
 * @param {event} e
 * @return {boolean}
*/
export function isCell(e) {
  return e.target.dataset.type === TABLE.type.CELL;
}

/**
 * @param {event} e
 * @return {boolean}
 * checks if shift key was pressed while the event
*/
export function isShiftKey(e) {
  const {shiftKey} = e;
  return !!shiftKey;
}
