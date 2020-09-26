import {$} from '@core/dom';
import {range} from '../../core/utils';
/**
 * implemenation of select functionality of table rows
*/
class SelectImplementation {
  /**
   *
   * @param {HTMLElement} $root app element
   * @param {class} selection class for setting css classes of selected els
   * @param {string} className
  */
  constructor($root, selection, className) {
    this.$root = $root;
    this.selection = selection;
    this.className = className;
  }

  /**
   *
   * @param {eventObject} event
   * @return {object}
   */
  createLasso(event) {
    const el = $.create('div');
    const {clientX, clientY} = event;
    el.css({
      position: 'fixed',
      border: '3px dashed blue',
      backgroundColor: 'rgba(52, 152, 219, 0.2)',
      width: '1px',
      height: '1px',
      left: clientX+'px',
      top: clientY+'px',
      zIndex: -1,
    })
    $(`.${this.className}`).append(el);
    return {el, clientX, clientY}
  }

  /**
 *
 * @param {event} e
 * @param {number} clientX
 * @param {number} clientY
 * @param {HTMLElement} $el
 * @return {void}
 * renders lasso on event
 */
  renderLasso(e, clientX, clientY, $el) {
    // e is the parent's event object for example mousedown
    // clientX an clientY is properties of event object for example mousemove
    const top = Math.min(e.clientY, clientY);
    const left = Math.min(e.clientX, clientX)
    const width = Math.abs(e.clientX - clientX);
    const height = Math.abs(e.clientY - clientY);
    $el.css({
      width: width + 'px',
      height: height + 'px',
      top: top+'px',
      left: left+'px',
    })
  }

  /**
   * @param {event} e
   * @return {void}
   */
  implementMultipleSelect(e) {
    const {el, clientX, clientY} = this.createLasso(e, this.className)
    const $target = $(e.target);
    // set active class onMouseDown
    this.selection.select($target);
    const current = $target.id(true);

    document.onmousemove = e => {
      this.renderLasso(e, clientX, clientY, el);
    }

    document.onmouseup = e => {
      // remove laso
      el.remove();
      const target = $(e.target).id(true);
      const cells = range(current.col, target.col);
      const rows = range(current.row, target.row);
      const ids = cells.reduce((acc, col)=>{
        rows.forEach(row => acc.push(`${row}:${col}`));
        return acc
      }, [])
      const els = ids.map(id => this.$root.find(`[data-id="${id}"]`));
      this.selection.selectGroup(els);

      document.onmousemove = null;
      document.onmouseup = null;
    }
  }
}
export default SelectImplementation;
