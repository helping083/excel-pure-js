import {isEqual} from '@core/utils';

/**
 * class which is responsible for store subscripton
 */
class StoreSubscriber {
  /**
   *
   * @param {object} store app's state
   *
   */
  constructor(store) {
    this.store = store;
    this.sub = null;
    this.prevState = {};
  }

  /**
   *
   * @param {array} components
   * @return {void}
   */
  subsribeComponents(components) {
    this.prevState = this.store.getState();
    this.sub = this.store.subscribe(state=>{
      // COMPARES
      Object.keys(state).forEach(key=>{
        // also changed code in getState in reducer with json methods
        if (!isEqual(this.prevState[key], state[key])) {
          components.forEach(component => {
            if (component.isWatching(key)) {
              const changes = {[key]: state[key]}
              component.storeChanged(changes)
            }
          })
        }
      })
      this.prevState = this.store.getState();
    })
  }

  /**
   *@return {void}
   */
  unsubscribeFromStore() {
    this.sub.unsubscribe();
  }
}

/**
 * Singleton which is responsible for creating a single instance of store
 * subscription for the app
 */
export class StoreSubscriberSingleton {
  static instance = null
  /**
   *
   * @param {object} store
   * @return {StoreSubscriber}
   */
  static getInstance(store) {
    if (!StoreSubscriberSingleton.instance) {
      StoreSubscriberSingleton.instance = new StoreSubscriber(store);
    }
    return StoreSubscriberSingleton.instance;
  }
}
