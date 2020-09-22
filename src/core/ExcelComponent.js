import {DomListener} from '@core/DomListener';

/**
 * @abstract
 * abstract class for creating a component
 */
export class ExcelComponent extends DomListener {
  /**
  * @abstract
  * @return {string}
  * returns a component template
  */
  toHTML() {
    return '';
  }
}
