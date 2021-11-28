export const SET_COMMENT_LIST = 'SET_COMMENT_LIST';

export const setComment = (payload) => {
  return {
    type: SET_COMMENT_LIST,
    payload,
  };
};
