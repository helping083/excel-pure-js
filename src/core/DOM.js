/**
 * util class for working with dom operations
 */
class DOMBuilder {
  /**
  * @param {String|HTML} selector
  */
  constructor(selector) {
    // selector can be a string or dom node
    this.selector = typeof selector === 'string' ?
    document.querySelector(selector) :
    selector
  }

  /**
  * @param {string} markup html markup.
  * @return {String|HTMLElement} html
  * returns html string
  */
  html(markup) {
    if (typeof markup === 'string') {
      this.selector.innerHTML = markup;
      return this;
    }
    return this.selector.outerHTML.trim();
  }

  /**
  * @return {void}
  * returns clears markup
  */
  clear() {
    this.html('');
    return this
  }

  /**
  * @param {string} eventType
  * @param {function} cb
  * @param {boolean} isBubble
  * @return {void}
  * inits listeners by invoking initDomListener function from the parent class
  */
  on(eventType, cb, isBubble = true) {
    this.selector.addEventListener(eventType, cb, isBubble);
  }

  /**
  * @param {string} eventType
  * @param {function} cb
   */
  off(eventType, cb) {
    this.selector.removeEventListener(eventType, cb)
  }

  /**
  * @param {string} el
  * @return {HTMLElement}
   */
  closest(el) {
    return $(this.selector.closest(el))
  }

  /**
  * @return {object}
  * returns top/bottom/width/height/left/right of the selector
   */
  getCoords() {
    return this.selector.getBoundingClientRect();
  }

  /**
  * @param {string} $el
  * @return {this}
  * returns dom class instance with el selector
  */
  find($el) {
    return $(this.selector.querySelector($el));
  }

  /**
  * @param {string} el
  * @return {Array}
  * returns all dom nodes found by the selector
  */
  findAll(el) {
    return this.selector.querySelectorAll(el);
  }

  /**
  * @return {object}
  * returns data properties of the selector
  */
  get data() {
    return this.selector.dataset;
  }

  /**
  * @param {object} styles
  * @return {object}
  * appends css to the selector
  */
  css(styles = {}) {
    const {selector} = this
    // dangeorus because can work with porperties from the proto
    // for (const key in styles) {
    //   if (styles.hasOwnProperty[key]) {
    //     selector.style[key] = styles[key]
    //   }
    // }
    Object.keys(styles).forEach(key=>{
      selector.style[key] = styles[key]
    })
    return $(selector);
  }

  /**
   *
   * @param {string} className
   * @return {void}
   * adds a classlist to the selector
   */
  addClass(className) {
    this.selector.classList.add(className);
  }

  /**
   *
   * @param {string} className
   * @return {void}
   * removes a class to the selector
   */
  removeClass(className) {
    this.selector.classList.remove(className);
  }

  /**
  * @param {node} node
  * @return {void}
  * appends node to the selector
  */
  append(node) {
    const {selector} = node;
    if (node instanceof DOMBuilder) {
      node = selector;
    }
    // polyfill, works with older browsers
    if (Element.prototype.append) {
      this.selector.append(node)
    } else {
      this.selector.appendChild(node);
    }
    return this;
  }

  /**
   * @param {string} text
   * @return {void}
   */
  set text(text) {
    this.selector.innerHTML = text;
  }

  /**
 * @return {string}
 */
  get text() {
    return this.selector.innerHTML;
  }
  /**
  *
  * @return {this}
  */
  focus() {
    this.selector.focus();
    return this;
  }

  /**
 *
 * @param {boolean} parse
 * @return {object}
 */
  id(parse) {
    if (parse) {
      const parsed = this.id().split(':');
      return {
        row: +parsed[0],
        col: +parsed[1],
      }
    }
    return this.data.id
  }

  /**
   * @return {void}
  */
  remove() {
    this.selector.remove()
  }
}
/**
 * util function for init a DOM class instance and wrap him into $();
 * @param {string} selector
 * @return {DOMBuilder}
 */
export function $(selector) {
  return new DOMBuilder(selector);
}

$.create = (tagname, classes='') => {
  const htmlEl = document.createElement(tagname);
  if (classes) {
    htmlEl.classList.add(classes);
  }
  return $(htmlEl);
}

$.event = (tag, name, cb) =>{
  const {selector} = $(tag)
  selector.addEventListener(name, cb);
}
