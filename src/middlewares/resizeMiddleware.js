import {$} from '@core/dom';
/**
* middleware based on redux-middleware pattern
* @param {object} store
* @return {function}
* this middleware gets cols/rows data from local storage and
* sets widths/heights of cells and rows based on that data
*/
export default store => next => action => {
  if (action.type === 'TEST') {
    const {colState} = store.getState();
    const table = $('.excel__table');
    Object.keys(colState).forEach((key)=>{
      const cels = Array.from(table.findAll(`[data-col="${key}"]`));
      cels.forEach((item)=>{
        item.style.width=`${colState[key]}px`;
      });
    })
  }
  return next(action);
}
