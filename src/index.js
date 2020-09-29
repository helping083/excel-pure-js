import {Excel, Header, Table, Formula, Toolbar} from '@/components/';
import './scss/index.scss';
import {rootReducer} from './store/rootReducer'
import {createStore} from './core/createStore';

const store = createStore(rootReducer)

const excel = new Excel('#app', {
  components: [Header, Toolbar, Formula, Table],
  store,
});
excel.render();
