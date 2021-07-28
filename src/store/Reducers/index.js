import { combineReducers } from 'redux';
import AccountReducers from './AccountReducers';
export default combineReducers({
  account: AccountReducers,
});
