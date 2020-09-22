import {ExcelComponent} from '@core/ExcelComponent';
import {TOOLBAR} from './constants';
/**
 *
 * toolbar component
 */
class Toolbar extends ExcelComponent {
  static className = TOOLBAR.className;
  /**
  * @override
  * @return {string} return html template
  */
  toHTML() {
    return TOOLBAR.toolbarHTML
  }
}
export default Toolbar;
