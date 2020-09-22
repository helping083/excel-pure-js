import {ExcelComponent} from '@core/ExcelComponent';
import {TABLE} from './constants';
import {createTable} from './table.template';
/**
 *
 * table component
 */
class Table extends ExcelComponent {
  static className = TABLE.className;
  /**
  * @override
  * @return {string} return html template
  */
  toHTML() {
    return createTable(1000)
  }
}
export default Table;
