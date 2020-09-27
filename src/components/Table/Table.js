import {ExcelComponent} from '@core/ExcelComponent';
import {TABLE} from './constants';
import {createTable} from './table.template';
import {resizeHandler, handleArrowPress} from './controllers';
import {shouldResize, isCell, isShiftKey} from './table.utils';
import TableSelection from './TableSelection';
import SelectImplementation from './SelectImplementation';
import {$} from '@core/dom';
/**
 *
 * table component
 */
class Table extends ExcelComponent {
  static className = TABLE.className;
  /**
  * @param {string} $root selector where this will be appended
  * @param {any} options
  */
  constructor($root, options) {
    super($root, {
      listeners: ['click',
        'mousedown', 'mousemove', 'mouseup', 'keydown', 'dragstart'],
      name: TABLE.name,
      ...options,
    })
    this.colsCount = TABLE.CODES.Z - TABLE.CODES.A + 1;
    this.rowsCount = 100;
  }

  /**
  * @override
  * @return {string} return html template
  */
  toHTML() {
    return createTable(this.rowsCount, this.colsCount);
  }

  /**
  *@override
  */
  prepare() {
    this.selection = new TableSelection(this.$root);
    this.selectImplementation =
      new SelectImplementation(this.$root, this.selection, Table.className);
  }

  // conponentDidMount
  /**
  * @override
  */
  init() {
    super.init();
    const cell = this.$root.find('[data-id="0:0"]');
    cell.focus();
    this.selection.select(cell)
    this.$on('formula:input', (text)=>{
      this.selection.current.text(text);
      console.log(text);
    })
  }

  /**
   * @param {event} e
   * @return {void}
   */
  onClick(e) {
    // if (isSelectable(e)) {
    //   const {id} = e.target.dataset
    //   const cell = this.$root.find(`[data-id="${id}"]`);
    //   this.selection.select(cell)
    // }
  }

  /**
   * @param {event} e
   * @return {void}
  */
  onMousedown(e) {
    if (shouldResize(e)) {
      resizeHandler(this.$root, e, e.pageY);
    } else if (isCell(e)) {
      const $target = $(e.target);

      if (isShiftKey(e)) {
        this.selectImplementation.implementMultipleSelect(e);
      } else if (!isShiftKey(e)) {
        this.selection.select($target);
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
    document.onmousemove = null;
  }

  /**
  *@param  {event} evt
  *@return {void}
  */
  onKeydown(evt) {
    // eslint-disable-next-line max-len
    handleArrowPress(this.$root, evt, this.selection, this.colsCount, this.rowsCount);
  }

  /**
  *@param  {event} e
  *@return {void}
  */
  onDragstart(e) {
    e.preventDefault();
  }
}

export default Table;
