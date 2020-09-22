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
