// import {$} from '@core/dom';
/**
* class for working with table selection
*/
class TableSelection {
  static className = 'selected';
  /**
  *@param {HTMLElement} $root
  */
  constructor($root) {
    this.$root = $root;
    this.group = [];
    this.current = null
  }

  /**
   * @param {HTMLDivElement} $element
   * @return {void}
   * select a single row and makes him active
  */
  select($element) {
    this.clear();
    $element.focus().addClass(TableSelection.className);
    this.group.push($element);
    this.current = $element
  }

  /**
  * @return {void}
  */
  clear() {
    this.group.forEach($el => $el.removeClass(TableSelection.className));
    this.group = [];
  }

  /**
  * @param {Array} $group
   * @return {void}
   * selects a multiple row and makes them active
  */
  selectGroup($group = []) {
    this.clear()
    this.group = $group
    this.group.forEach($el => $el.addClass(TableSelection.className))
  }
}

export default TableSelection;
