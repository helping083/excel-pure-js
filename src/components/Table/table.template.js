import {TABLE} from './constants';
/**
 * @return {string}
 * generates cell markup
 */
function createCell() {
  return `
  <div class="cell" contenteditable=""></div>
  `
}

/**
 * @param {any} col
 * @return {string}
 * generates column markup
 */
function createCol(col) {
  return `
    <div class="column">
      ${col}
    </div>
  `
}

/**
 * @param {number} index
 * @param {any} content
 * @return {string}
 * generates row markup
 */
function createRow(index, content) {
  return `
     <div class="row">
      <div class="row-info">${index ? index : ''}</div>
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
 * @param {number} rowsCount
 * @param {number} columnCount
 * @return {void}
 * generates table markup
 */
export function createTable(rowsCount = 10) {
  const colsCount = TABLE.CODES.Z - TABLE.CODES.A + 1;
  const rows = [];
  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(createCol)
      .join('')


  rows.push(createRow(null, cols))
  for (let i = 0; i < rowsCount; i++) {
    const cells = new Array(colsCount)
        .fill('')
        .map(createCell)
        .join('')
    rows.push(createRow(i + 1, cells))
  }
  return rows.join('')
}

