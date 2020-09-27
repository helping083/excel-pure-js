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
    this.emitter = options.emitter;
    this.prepare();
    this.unsubscribers = [];
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
  * init hook
  * inits listeners by invoking initDomListener function from the parent class
  */
  init() {
    this.initDomListeners();
  }

  /**
  * @abstract
  * @return {void}
  * before init hook
  */
  prepare() {

  }

  /**
   *@return {void}
   *removes dom listener by invoking removeDomlistener from the parent class
  */
  destroy() {
    this.removeDomListeners();
    this.unsubscribers.forEach(unsub => unsub())
  }

  /**
  * facade interface for emmiters
  * @param {event} event
  * @param {object} options
  * @return {void}
  */
  $emit(event, ...args) {
    this.emitter.emit(event, ...args);
  }

  /**
   *
   * @param {event} event
   * @param {function} fn
   * subscribes to events based on the observable pattern
  */
  $on(event, fn) {
    const unsub = this.emitter.subscribe(event, fn);
    this.unsubscribers.push(unsub);
  }
}
