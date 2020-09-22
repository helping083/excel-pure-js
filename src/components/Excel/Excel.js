import {$} from '@core/dom';
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
    this.$el = $(selector);
    this.components = options.components || []
  }
  /**
  * return root element for rendering
  * @return {HTMLElement}
  */
  getRoot() {
    const $root = $.create('div', 'excel')
    // create components instances
    this.components = this.components.map(Component=>{
      const $el = $.create('div', Component.className)
      const component = new Component($el);
      $el.html(component.toHTML());
      $root.append($el);
      return component;
    })
    return $root;
  }
  /**
  * render app components
  * @return {void}
  */
  render() {
    this.$el.append(this.getRoot());
    this.components.forEach(component => component.init());
  }
}
