import {Excel, Header, Table, Formula, Toolbar} from '@/components/';
import './scss/index.scss';

const excel = new Excel('#app', {
  components: [Header, Toolbar, Formula, Table],
});
excel.render();
