import {ExcelComponent} from '@core/ExcelComponent';
import {FORMULA} from './constants';
/**
 *
 * formula component
 */
class Formula extends ExcelComponent {
  static className = FORMULA.className;
  /**
  * @param {string} $root selector where this will be appended
  */
  constructor($root) {
    super($root, {
      name: FORMULA.name,
      listeners: ['input'],
    })
  }
  /**
  * @override
  * @return {string} return html template
  */
  toHTML() {
    return FORMULA.formulaHTML
  }
  /**
  * @param  {Event} e event object
  * @return {void} input listener
  */
  onInput(e) {
    console.log('onInput excel')
  }
}
export default Formula;
