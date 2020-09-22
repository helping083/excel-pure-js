import {capitalize} from '@core/utils';
/**
 * class for creating listeners in components
 */
export class DomListener {
  /**
     * @param {string} $root HTML selector name for rendering the app
     * @param {Array} listeners array of listeners to work with
     *
  */
  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error('no root for dom listener');
    }
    this.$root = $root;
    this.listeners = listeners;
  }
  /**
  * adds event listener
  * @return {void}
  */
  initDomListeners() {
    this.listeners.forEach(listener=>{
      const method = getMethodName(listener);
      if (!this[method]) {
        throw new Error(
            `${method} is not implemented in ${this.name} component`
        )
      }
      this[method] = this[method].bind(this);
      // addeventlistener
      this.$root.on(listener, this[method])
    })
  }
  /**
  * removes event listener
  * @return {void}
  */
  removeDOMListeners() {
    this.listeners.forEach((listener) => {
      const method = getMethodName(listener);
      this.$root.off(listener, this[method])
    })
  }
}

/**
 * @param {string} eventName
 * @return {sting}
*/
function getMethodName(eventName) {
  return `on${capitalize(eventName)}`;
}
