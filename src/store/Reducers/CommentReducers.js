import { SET_COMMENT_LIST } from './../Actions/CommentActions';
const DEFAULT_STATE = {
  commentList: {},
};

const CommentListReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case SET_COMMENT_LIST:
      return {
        commentList: action.payload,
      };
    default:
      return state;
  }
};

export default CommentListReducer;
