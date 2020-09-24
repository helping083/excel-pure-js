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
 * @param {event} e;
 */
export function resizeHandler($root, e) {
  const {$resizer, $parent, coords, data, type} = tableResizer(e);
  const sideProp = type === TABLE.dataResize.COL ? 'bottom' : 'right';
  let value;
  $resizer.css({
    opacity: 1,
    [sideProp]: '-5000px',
  })
  document.onmousemove = event => {
    if (type === TABLE.dataResize.COL) {
      const delta = event.pageX - coords.right;
      value = coords.width + delta;
      $resizer.css({right: -delta + 'px'})
    } else {
      const delta = event.pageY - coords.bottom;
      value = coords.height + delta;
      $resizer.css({
        bottom: -delta + 'px',
      })
    }
  }
  document.onmouseup = () => {
    document.onmousemove = null;
    document.onmouseup = null;
    if (type === TABLE.dataResize.COL) {
      $parent.css({width: value + 'px'});
      $root.findAll(`[data-col="${data.col}"]`)
          .forEach(el=>el.style.width = value + 'px');
    } else {
      $parent.css({height: value + 'px'})
    }
    $resizer.css({
      opacity: 0,
      bottom: 0,
      right: 0,
    })
  }
}
