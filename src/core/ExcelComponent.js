import {DomListener} from '@core/DomListener';

/**
 * parent class for creating a component which contains methods for
 * creating a markup and adding listeners
 */
export class ExcelComponent extends DomListener {
  /**
  * @param {string} $root selector
  * @param {object} options options for working with dom
  */
  constructor($root, options={}) {
    super($root, options.listeners)
    this.name = options.name;
  }
  /**
  * @abstract
  * @return {string}
  * returns a component template
  */
  toHTML() {
    return '';
  }
  /**
  * @return {void}
  * inits listeners by invoking initDomListener function from the parent class
  */
  init() {
    console.log('init')
    this.initDomListeners();
  }
}
