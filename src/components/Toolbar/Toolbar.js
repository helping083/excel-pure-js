import {ExcelComponent} from '@core/ExcelComponent';
import {TOOLBAR} from './constants';
/**
 *
 * toolbar component
 */
class Toolbar extends ExcelComponent {
  static className = TOOLBAR.className;
  /**
  * @param {string} $root selector where this will be appended
  * @param {any} options
  */
  constructor($root, options) {
    super($root, {name: 'toolbar', ...options})
  }
  /**
  * @override
  * @return {string} return html template
  */
  toHTML() {
    return TOOLBAR.toolbarHTML
  }
}
export default Toolbar;
