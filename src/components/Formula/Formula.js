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
      subscribe: ['currentText'],
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
  }

  /**
   * @override
   * @param {object} changes
   */
  storeChanged({currentText}) {
    this.$formula.text = currentText;
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
}
export default Formula;
