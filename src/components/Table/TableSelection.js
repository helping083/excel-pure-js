/**
* class for working with table selection
*/
class TableSelection {
  /**
   *
  */
  constructor() {
    this.group = [];
  }
  /**
   * @param {HTMLDivElement} $element
   * @return {void}
   * select a single row and makes him active
  */
  select($element) {
    this.group.push($element);
  }

  /**
   * @return {void}
   * selects a multiple row and makes them active
  */
  selectGroup() {

  }
}
export default TableSelection;
