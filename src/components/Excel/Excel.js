import {$} from '@core/dom';
import Emitter from '@core/emmiter';
import {StoreSubscriberSingleton} from '@core/StoreSubscriber';

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
    this.emmiter = new Emitter();
    this.store = options.store;
    this.subscriber = StoreSubscriberSingleton.getInstance(this.store);
  }

  /**
  * return root element for rendering
  * @return {HTMLElement}
  */
  getRoot() {
    const $root = $.create('div', 'excel');
    // caching options
    const componentOptions = {
      'emitter': this.emmiter,
      'store': this.store,
    };

    // create components instances
    this.components = this.components.map(Component=>{
      const $el = $.create('div', Component.className)
      const component = new Component($el, componentOptions);
      $el.html(component.toHTML());
      $root.append($el);
      return component;
    });

    return $root;
  }

  /**
   * @return {void}
   * componentWillUnmount/ngOnDestroy
  */
  destroy() {
    this.subscriber.unsubscribeFromStore();
    this.components.forEach(component => component.destroy());
  }

  /**
  * render app components
  * @return {void}
  */
  render() {
    this.$el.append(this.getRoot());
    this.subscriber.subsribeComponents(this.components);
    this.components.forEach(component => component.init());
  }
}
