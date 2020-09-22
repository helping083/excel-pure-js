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
  }
  /**
  * removes event listener
  * @return {void}
  */
  removeDomListeners() {

  }
}
