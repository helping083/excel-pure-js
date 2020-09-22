import {ExcelComponent} from '@core/ExcelComponent';
import {HEADER} from './constants';
/**
 *
 * header component
 */
class Header extends ExcelComponent {
  static className = HEADER.className;
  /**
  * @override
  * @return {string} return html template
  */
  toHTML() {
    return HEADER.headerHtml;
  }
}
export default Header;
