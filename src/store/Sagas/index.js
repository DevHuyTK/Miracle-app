import { all } from 'redux-saga/effects';
import { AccountSaga } from './AccountSagas';
// import ItemPage from '../pages/ItemPage';
function* rootSaga() {
  yield all([...AccountSaga]);
}
export default rootSaga;
