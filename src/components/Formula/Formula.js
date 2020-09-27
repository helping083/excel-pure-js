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
  * @param {any} options
  */
  constructor($root, options) {
    super($root, {
      name: FORMULA.name,
      listeners: ['input'],
      ...options,
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
   * input listener
   * @param {event} event
   * @return {void}
   */
  onInput(event) {
    const text = event.target.textContent.trim();
    this.$emit('formula:input', text);
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
