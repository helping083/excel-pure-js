import {ExcelComponent} from '@core/ExcelComponent';
import {TABLE} from './constants';
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
    return TABLE.tableHTML
  }
}
export default Table;
