import {TABLE, DEFAULT_WIDTH, DEFAULT_HEIGHT} from './constants';
// /**
//  * @param {any} _
//  * @param {number} col
//  * @return {string}
//  * generates cell markup
//  */
// function createCell(_, col) {
//   return `
//   <div class="cell" contenteditable="" data-col="${col}"></div>
//   `
// }
/**
* @param {object} state
* @param {number} row
* @return {functon}
*/
function toCell(state, row) {
  return function(_, col) {
    const id = `${row}:${col}`
    const data = state.dataState[id];
    return `
    <div 
      class="cell" 
      contenteditable="true" 
      data-type="${TABLE.type.CELL}"
      style="width: ${getWidth(state.colState, col)}"
      data-col="${col}" 
      data-id="${id}">${data||''}</div>`
  }
}

/**
 * @param {any} col
 * @param {number} index
 * @param {string} width
 * @return {string}
 * generates column markup
 */
function createCol({col, index, width}) {
  return `
    <div 
      class="column" 
      data-type="resizable" 
      draggable="false"
      style="width:${width}" 
      data-col="${index}">
      ${col}
      <div class="col-resize" data-resize=${TABLE.dataResize.COL}></div>
    </div>
  `
}

/**
 * @param {number} index
 * @param {any} content
 * @param {object} state
 * @return {string}
 * generates row markup
 */
function createRow(index, content, state) {
  const height = getHeight(state, index);
  const dataRow = index ? `data-row="${index}"` :'';
  const resizer = index ?
    `<div class="row-resize" data-resize=${TABLE.dataResize.ROW}></div>` : '';

  return `
     <div 
      class="row" 
      data-type="resizable"
      style="height: ${height}"
      ${dataRow}
      >
      <div class="row-info">
        ${index ? index : ''}
        ${resizer}
      </div>
      <div class="row-data">${content}</div>
     </div>
  `
}

/**
 * @param {any} _
 * @param {number} index
 * @return {string}
 * util funcion which creates number to a string based on char code
 */
function toChar(_, index) {
  return String.fromCharCode(TABLE.CODES.A + index);
}

/**
 * @param {object} state
 * @param {number} index
 * @return {string}
 * utils function which calculates a width of a col
 */
function getWidth(state, index) {
  return `${(state[index] || DEFAULT_WIDTH)}px`;
}

/**
 *
 * @param {object} state
 * @param {number} index
 * @return {string}
 * utils function which calculates a width of a col
 */
function getHeight(state, index) {
  return `${(state[index] || DEFAULT_HEIGHT)}px`;
}

/**
 * @param {object} state
 * @return {function}
 */
function withWidthFrom(state) {
  return function(col, index) {
    return {
      col, index, width: getWidth(state.colState, index),
    }
  }
}

/**
 * @param {number} rowsCount
 * @param {number} colsCount
 * @param {object} state app state
 * @return {void}
 * generates table markup
 */
export function createTable(rowsCount = 10, colsCount = 10, state = {}) {
  const rows = [];
  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(withWidthFrom(state))
      .map(createCol)
      .join('')

  rows.push(createRow(null, cols, {}))
  for (let i = 0; i < rowsCount; i++) {
    const cells = new Array(colsCount)
        .fill('')
        // .map(createCell)
        .map(toCell(state, i))
        .join('')
    rows.push(createRow(i + 1, cells, state.rowState))
  }
  return rows.join('')
}

