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
      listeners: ['input', 'keydown'],
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
  * @override
  */
  init() {
    super.init();
    this.$formula = this.$root.find('#formula');
    this.$on('table:select', ($cell)=>{
      this.$formula.text = $cell.text;
    })
    this.$on('table:input', (target)=>{
      this.$formula.text = target.text;
    });
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

  /**
   * keydown listener
   * @param {event} event
   * @return {void}
   */
  onKeydown(event) {
    const keys = ['Enter', 'Tab'];
    if (keys.includes(event.key)) {
      event.preventDefault();
      this.$emit('formula:enter');
    }
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
