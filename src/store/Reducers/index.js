import { combineReducers } from 'redux';
import AccountReducers from './AccountReducers';
import ImagesGridReducers from './ImageGridReducers';

export default combineReducers({
  account: AccountReducers,
  ImagesGridReducers,
});
