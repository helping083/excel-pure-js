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
  /**
  * make html template reusable for others components
  * @return {string} return html template
  */
  static divide() {
    return `<div class=${HEADER.className}>${HEADER.headerHtml}</div>`
  }
}
export default Header;
