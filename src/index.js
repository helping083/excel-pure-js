import {Excel, Header, Table, Formula, Toolbar} from '@/components/';
import './scss/index.scss';
import {rootReducer} from './store/rootReducer'
// import {createStore} from './core/createStore';
import {storage} from '@core/utils';
import applyMiddleware from './middlewares';
import storeCreate from '@core/storeCreate';

// const store = createStore(rootReducer, storage('excel-state'))
const store = storeCreate(rootReducer, storage('excel-state'), applyMiddleware);
store.subscribe(state => {
  storage('excel-state', state)
})

const excel = new Excel('#app', {
  components: [Header, Toolbar, Formula, Table],
  store,
});
excel.render();
