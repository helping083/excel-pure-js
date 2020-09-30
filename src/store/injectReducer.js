/**
 * util function for reducers, replaces standart reducer syntax
 * @param {object} initialState initial state of the reducer
 * @param {object} handlers actions
 * @return {object} returns cloned state to the client
 */
export default (initialState, handlers) => (state = initialState, action= {}) =>
    // eslint-disable-next-line no-prototype-builtins
    action.hasOwnProperty('type') ?
    handlers[action.type] ? handlers[action.type](state, action) : state :
    state;
