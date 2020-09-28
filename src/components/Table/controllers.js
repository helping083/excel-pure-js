/* eslint-disable camelcase */
import {$} from '@core/dom';
import {TABLE} from './constants';
/**
 *
 * @param {event} e
 * @return {object}
 */
export function tableResizer(e) {
  const $resizer = $(e.target);
  const $parent = $resizer.closest('[data-type="resizable"]')
  const coords = $parent.getCoords();
  const {data} = $parent;
  const type = $resizer.data.resize;
  return {$resizer, $parent, coords, data, type}
}

/**
 * @param {this} $root
 * @param {event} event;
 * @param {number} original_mouse_y
 */
export function resizeHandler($root, event, original_mouse_y) {
  const $resizer = $(event.target)
  const $parent = $resizer.closest('[data-type="resizable"]')
  const coords = $parent.getCoords()
  const type = $resizer.data.resize
  const sideProp = type === 'col' ?
    {direction: 'height', val: 'vh'} :
    {direction: 'width', val: 'vw'}
  let value

  $resizer.css({
    opacity: 1,
    [sideProp.direction]: `100${sideProp.val}`,
  })

  document.onmousemove = e => {
    if (type === 'col') {
      const delta = e.pageX - coords.right
      value = coords.width + delta
      $resizer.css({right: -delta + 'px'})
    } else {
      const delta = e.pageY - original_mouse_y;
      value = coords.height + delta
      $resizer.css({bottom: -delta + 'px'})
    }
  }

  document.onmouseup = () => {
    document.onmousemove = null
    document.onmouseup = null

    if (type === 'col') {
      $parent.css({width: value + 'px'})
      $root.findAll(`[data-col="${$parent.data.col}"]`)
          .forEach(el => el.style.width = value + 'px')
    } else {
      $parent.css({height: value + 'px'})
    }

    $resizer.css({
      opacity: 0,
      bottom: 0,
      right: 0,
      [sideProp.direction === 'width' ? 'height': 'width']: '4px',
      [sideProp.direction]: 100+ '%',
    })
  }
}


/**
* Find the closest matching ancestor to a node
* @param  {Object}   el HTMLElement
* @param  {Function} fn Callback
* @return {Object|Boolean}
*/
function closest(el, fn) {
  return (
    el &&
    el !== document.documentElement &&
    // eslint-disable-next-line no-unused-vars
    (fn(el) ? el : closest(el.parentNode, fn))
  );
}

/**
 * @param {$root} $root
 * @param {event} e event object
 * @param {object} tableSelection class for setting active cell
 * @param {number} colsCount
 * @param {number} rowsCount
 * @param {object} emitter
 * @return {void}
 * function is responsible for changing active cell on key press
*/
export function handleArrowPress(
    $root, e, tableSelection, colsCount, rowsCount, emitter
) {
  if (TABLE.tableActionCodes[e.code] && !e.shiftKey) {
    e.preventDefault()
    const {col, row} = tableSelection.current.id(true);
    const $next = $root.find(nextSelector(e.code, col, row))
    tableSelection.select($next);
    emitter('table:select', $next);
  }
}

/**
 * @param {string|undefined} key
 * @param {number} col
 * @param {number} row
 * @return {string}
 */
function nextSelector(key, col, row) {
  const MIN_VALUE = 0;
  switch (key) {
    case TABLE.tableActionCodes.Enter:
    case TABLE.tableActionCodes.ArrowDown:
      row++
      break
    case TABLE.tableActionCodes.Tab:
    case TABLE.tableActionCodes.ArrowRight:
      col++
      break
    case TABLE.tableActionCodes.ArrowLeft:
      col = col - 1 < MIN_VALUE ? MIN_VALUE: col -1;
      break
    case TABLE.tableActionCodes.ArrowUp:
      row = row - 1 < MIN_VALUE ? MIN_VALUE: row -1;
      break
  }
  return `[data-id="${row}:${col}"]`
}

