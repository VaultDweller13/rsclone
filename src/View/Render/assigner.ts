import { confirm } from './castle/characterCreator';
import enterCastle from './castle/castle';

function assign() {
  confirm.setFunc(enterCastle);
}
export default assign;
