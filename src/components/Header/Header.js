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
  * @param {string} $root selector where this will be appended
  * @param {any} options
  */
  constructor($root, options) {
    super($root, {name: 'header', ...options})
  }

  /**
  * @override
  * @return {string} return html template
  */
  toHTML() {
    return HEADER.headerHtml;
  }

  /**
  * makes html template reusable for others components
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
