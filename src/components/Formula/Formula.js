import {ExcelComponent} from '@core/ExcelComponent';
import {FORMULA} from './constants';
// import {$} from '@core/dom';
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
  // /**
  // * @param  {Event} e event object
  // * @return {void} input listener
  // */
  // myFunction = (e) => {
  //   // eslint-disable-next-line no-invalid-this
  //   console.log(this);
  // }
  // /**
  // * @override
  // * @return {void} input listener
  // */
  // init() {
  //   // super.init();
  //   // $.event('.info', 'click', this.myFunction);
  //   $('.info').on('click', this.myFunction);
  // }
}
export default Formula;
