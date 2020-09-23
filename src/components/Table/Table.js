import {ExcelComponent} from '@core/ExcelComponent';
import {TABLE} from './constants';
import {createTable} from './table.template';
import {$} from '@core/dom';
/**
 *
 * table component
 */
class Table extends ExcelComponent {
  static className = TABLE.className;
  /**
  * @param {string} $root selector where this will be appended
  */
  constructor($root) {
    super($root, {
      listeners: ['click', 'mousedown', 'mousemove', 'mouseup'],
      name: TABLE.name,
    })
  }

  /**
  * @override
  * @return {string} return html template
  */
  toHTML() {
    return createTable(100)
  }

  /**
   * @return {void}
   */
  onClick() {
    console.log('click')
  }

  /**
   * @param {event} e
   * @return {void}
  */
  onMousedown(e) {
    if (e.target.dataset.resize) {
      console.log(e.target.dataset.resize);
      const $resizer = $(e.target);
      const $parent = $resizer.closest('[data-type="resizable"]')
      const coords = $parent.getCoords();
      const {data} = $parent;
      const type = $resizer.data.resize;
      const cells = this.$root.findAll(`[data-col="${data.col}"]`);

      document.onmousemove = event => {
        if (type === TABLE.dataResize.COL) {
          const delta = event.pageX - coords.right;
          const value = coords.width + delta;
          $parent.css({width: value + 'px'});
          cells.forEach(el=>el.style.width=value+'px');
        } else {
          const delta = event.pageY - coords.bottom;
          const value = coords.height + delta;
          // selector.style.height = ;
          $parent.css({height: value + 'px'})
        }
      }
      document.onmouseup = () => {
        document.onmousemove = null;
      }
    }
  }

  /**
   * @return {void}
  */
  onMousemove() {

  }

  /**
   * @param {event} e
   * @return {void}
  */
  onMouseup(e) {
  }
}
export default Table;
