import * as types from '../constant';
const DEFAULT_STATE = {
  newfeed: [],
  usernewfeed: [],
  alluser: [],
  dataFetched: false,
  isFetching: false,
  error: false,
  errorMessage: null,
};
export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case types.GET_NEWFEED_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case types.GET_NEWFEED_SUCCESS:
      return {
        ...state,
        isFetching: false,
        dataFetched: false,
        error: false,
        errorMessage: null,
        newfeed: action.payload.newfeed,
      };
    case types.GET_NEWFEED_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: true,
        errorMessage: action.payload.error,
      };
    case types.GET_USER_NEWFEED_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case types.GET_USER_NEWFEED_SUCCESS:
      return {
        ...state,
        isFetching: false,
        dataFetched: false,
        error: false,
        errorMessage: null,
        usernewfeed: action.payload.usernewfeed,
      };
    case types.GET_USER_NEWFEED_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: true,
        errorMessage: action.payload.error,
      };
    case types.GET_ALL_USER_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case types.GET_ALL_USER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        dataFetched: false,
        error: false,
        errorMessage: null,
        alluser: action.payload.alluser,
      };
    case types.GET_ALL_USER_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: true,
        errorMessage: action.payload.error,
      };
    default:
      return state;
  }
};
