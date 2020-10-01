import {Excel, Header, Table, Formula, Toolbar} from '@/components/';
import './scss/index.scss';
import {rootReducer} from './store/rootReducer'
import {storage} from '@core/utils';
import applyMiddleware from './middlewares';
import storeCreate from '@core/storeCreate';
import {initialState} from './store/initialState';

const store = storeCreate(rootReducer, initialState, applyMiddleware);
store.subscribe(state => {
  storage('excel-state', state)
})

const excel = new Excel('#app', {
  components: [Header, Toolbar, Formula, Table],
  store,
});
excel.render();
