import {ExcelComponent} from '@core/ExcelComponent';
import {HEADER} from './constants';
import {$} from '@core/dom';
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
  test = () => {
    // eslint-disable-next-line no-invalid-this
    console.log(this)
  }
  /**
  * make html template reusable for others components
  * @return {void} return html template
  */
  init() {
    super.init();
    $('.input').on('click', this.test)
  }
}
export default Header;
