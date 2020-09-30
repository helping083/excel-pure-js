import {ExcelComponent} from '@core/ExcelComponent';
import {TABLE} from './constants';
import {createTable} from './table.template';
import {resizeHandler, handleArrowPress} from './controllers';
import {shouldResize, isCell, isShiftKey} from './table.utils';
import TableSelection from './TableSelection';
import SelectImplementation from './SelectImplementation';
import {$} from '@core/dom';
import * as actions from '@/store/actions'
/**
 *
 * table component
 */
class Table extends ExcelComponent {
  static className = TABLE.className;
  /**
  * @param {string} $root selector where the component will be appended
  * @param {any} options
  */
  constructor($root, options) {
    super($root, {
      listeners: ['click',
        'mousedown', 'mousemove', 'mouseup', 'keydown', 'dragstart', 'input'],
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
    return createTable(this.rowsCount, this.colsCount, this.store.getState());
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
    this.initSubscriptions();
    this.initCellSelection();
  }

  /**
   * @return {void}
   * selects first cell and sets the active class
   */
  initCellSelection() {
    const cell = this.$root.find('[data-id="0:0"]');
    cell.focus();
    this.selectCell(cell);
  }

  /**
   * @param {HTMLElement} $cell
   */
  selectCell($cell) {
    this.selection.select($cell);
    this.$emit('table:select', $cell);
    this.$dispatch({type: 'TEST'})
  }

  /**
   * @return {void}
   * subscribes for events emmiters
  */
  initSubscriptions() {
    this.$on('formula:input', (text)=>{
      this.selection.current.text = text;
    })
    this.$on('formula:enter', () => {
      this.selection.current.focus();
    });
    this.emit = this.$emit.bind(this);
    this.$subscribe(state => {
      console.log('table state', state);
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
  async resizeTable(e) {
    try {
      const data = await resizeHandler(this.$root, e, e.pageY)
      this.$dispatch(actions.tableResizerAction(data));
    } catch (error) {
      console.warn('resize error', error)
    }
  }

  /**
   * @param {event} e
   * @return {void}
  */
  onMousedown(e) {
    if (shouldResize(e)) {
      this.resizeTable(e);
    } else if (isCell(e)) {
      const $target = $(e.target);

      if (isShiftKey(e)) {
        this.selectImplementation.implementMultipleSelect(e);
      } else if (!isShiftKey(e)) {
        this.selectCell($target);
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
    handleArrowPress(this.$root, evt, this.selection, this.colsCount, this.rowsCount, this.emit);
  }

  /**
  *@param  {event} e
  *@return {void}
  */
  onDragstart(e) {
    e.preventDefault();
  }

  /**
  *@param  {event} e
  *@return {void}
  */
  onInput(e) {
    this.$emit('table:input', $(e.target));
  }
}

export default Table;
