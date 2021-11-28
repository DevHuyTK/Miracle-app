import { combineReducers } from 'redux';
import AccountReducers from './AccountReducers';
import ImagesGridReducers from './ImageGridReducers';
import CommentListReducer from './CommentReducers';

export default combineReducers({
  account: AccountReducers,
  ImagesGridReducers,
  comment:CommentListReducer,
});
