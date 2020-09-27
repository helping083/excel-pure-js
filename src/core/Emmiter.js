/**
 * Observable pattern.
 * This class is responsible for communication
 * between components
 */
class Emitter {
  /**
   * @param {Array} listeners
   */
  constructor() {
    this.listeners = {};
  }

  // dispatch fire trigger
  /**
   * @param {string} eventName
   * @return {void}
   */
  emit(eventName, ...args) {
    if (!Array.isArray(this.listeners[eventName])) {
      return false
    }
    this.listeners[eventName].forEach(listener => {
      listener(...args);
    })
  }

  // on listen
  /**
   * @param {string} event
   * @param {function} fnc
   * @return {function}
   */
  subscribe(event, fnc) {
    this.listeners[event] = this.listeners[event] || [];
    this.listeners[event].push(fnc);
    return () => {
      this.listeners[event] =
        this.listeners[event].filter(listener => listener !== fnc)
    }
  }
}
export default Emitter
