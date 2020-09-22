/**
 *
 * class for creating main component
 */
export default class Excel {
  /**
     * @param {string} selector HTML selector name for rendering the app
     * @param {object} options app's props
  */
  constructor(selector, options ) {
    this.$el = document.querySelector(selector);
    this.components = options.components || []
  }
  /**
  * render app components
  * @return {void}
  */
  render() {
    console.log(this);
    this.$el.insertAdjacentHTML('afterbegin', `<h1>test</h1>`);
  }
}
