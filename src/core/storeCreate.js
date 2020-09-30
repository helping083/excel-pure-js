import {ActionTypes, isPlainObject, $$observable} from '@core/utils';
/**
 *
 * @param {object} reducer
 * @param {object} preloadedState
 * @param {any} enhancer
 * @return {object}
 */
export default function createStore(
    reducer, preloadedState={}, enhancer = undefined
) {
  if (
    (typeof preloadedState === 'function' && typeof enhancer === 'function') ||
    // eslint-disable-next-line prefer-rest-params
    (typeof enhancer === 'function' && typeof arguments[3] === 'function')
  ) {
    throw new Error(
        'It looks like you are passing several store enhancers to ' +
        'createStore(). This is not supported. Instead, compose them ' +
        'together to a single function.'
    )
  }

  if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
    enhancer = preloadedState
    preloadedState = undefined
  }

  if (typeof enhancer !== 'undefined') {
    if (typeof enhancer !== 'function') {
      throw new Error('Expected the enhancer to be a function.')
    }

    return enhancer(createStore)(
        reducer,
        preloadedState,
    )
  }

  if (typeof reducer !== 'function') {
    throw new Error('Expected the reducer to be a function.')
  }

  const currentReducer = reducer;
  let currentState = preloadedState; // as S
  let currentListeners = [];
  let nextListeners = currentListeners;
  let isDispatching = false;

  /**
   * This makes a shallow copy of currentListeners so we can use
   * nextListeners as a temporary list while dispatching.
   *
   * This prevents any bugs around consumers calling
   * subscribe/unsubscribe in the middle of a dispatch.
   */
  function ensureCanMutateNextListeners() {
    if (nextListeners === currentListeners) {
      nextListeners = currentListeners.slice()
    }
  }

  /**
   * Reads the state tree managed by the store.
   *
   * @return {object} The current state tree of your application.
   */
  function getState() {
    if (isDispatching) {
      throw new Error(
          'You may not call store.getState() while the reducer is executing. ' +
          'The reducer has already received the state as an argument. ' +
          `Pass it down from the top reducer 
           instead of reading it from the store.'`
      )
    }

    return currentState;
  }

  /**
   * @param {function} listener A callback to be invoked on every dispatch.
   * @return {function} A function to remove this change listener.
  */
  function subscribe(listener) {
    if (typeof listener !== 'function') {
      throw new Error('Expected the listener to be a function.')
    }

    if (isDispatching) {
      throw new Error(
          `You may not call store.subscribe() while the reducer is executing. If you would like to be notified after the store has been updated, subscribe from a component and invoke store.getState() in the callback to access the latest state. See https://redux.js.org/api/store#subscribelistener for more details.`
      )
    }

    let isSubscribed = true
    ensureCanMutateNextListeners()
    nextListeners.push(listener)

    return function unsubscribe() {
      if (!isSubscribed) {
        return
      }

      if (isDispatching) {
        throw new Error(
            // eslint-disable-next-line max-len
            'You may not unsubscribe from a store listener while the reducer is executing. ' +
            'See https://redux.js.org/api/store#subscribelistener for more details.'
        )
      }

      isSubscribed = false

      ensureCanMutateNextListeners()
      const index = nextListeners.indexOf(listener)
      nextListeners.splice(index, 1)
      currentListeners = null
    }
  }

  /**
 *
 * @param {object} action
 * @return {object}
 */
  function dispatch(action) {
    if (!isPlainObject(action)) {
      throw new Error(
          'Actions must be plain objects. ' +
          'Use custom middleware for async actions.'
      )
    }

    if (typeof action.type === 'undefined') {
      throw new Error(
          'Actions may not have an undefined "type" property. ' +
          'Have you misspelled a constant?'
      )
    }

    if (isDispatching) {
      throw new Error('Reducers may not dispatch actions.')
    }

    try {
      isDispatching = true
      currentState = currentReducer(currentState, action)
    } finally {
      isDispatching = false
    }

    const listeners = (currentListeners = nextListeners)
    for (let i = 0; i < listeners.length; i++) {
      const listener = listeners[i]
      // originally is listener(), here, this variant doesn't work
      listener(currentState)
    }

    return action
  }
  /**
   * Interoperability point for observable/reactive libraries.
   * @return {object} A minimal observable of state changes.
   * For more information, see the observable proposal:
   * https://github.com/tc39/proposal-observable
   */
  function observable() {
    const outerSubscribe = subscribe
    return {

      subscribe(observer) {
        if (typeof observer !== 'object' || observer === null) {
          throw new TypeError('Expected the observer to be an object.')
        }

        // eslint-disable-next-line require-jsdoc
        function observeState() {
          const observerAsObserver = observer
          if (observerAsObserver.next) {
            observerAsObserver.next(getState())
          }
        }

        observeState()
        const unsubscribe = outerSubscribe(observeState)
        return {unsubscribe}
      },

      [$$observable]() {
        return this
      },
    }
  }
  dispatch({type: ActionTypes.INIT});

  const store = {
    dispatch,
    subscribe,
    getState,
    [$$observable]: observable,
  }
  return store
}
