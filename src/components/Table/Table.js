import {ExcelComponent} from '@core/ExcelComponent';
import {TABLE} from './constants';
import {createTable} from './table.template';
import {resizeHandler} from './controllers';
import {shouldResize} from './table.utils';
// import {$} from '@core/dom';
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
    if (shouldResize(e)) {
      resizeHandler(this.$root, e);
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
