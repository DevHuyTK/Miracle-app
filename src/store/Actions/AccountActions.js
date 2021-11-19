import * as types from '../constant';

export function getAccountNewFeed(payload) {
  return {
    type: types.GET_NEWFEED_REQUEST,
    payload,
  };
}
export function getAccountUserNewFeed(payload) {
  return {
    type: types.GET_USER_NEWFEED_REQUEST,
    payload,
  };
}
export function getAllAccount(payload) {
  return {
    type: types.GET_ALL_USER_REQUEST,
    payload,
  };
}
export function getMatchingListAccount(payload) {
  return {
    type: types.GET_MATCHING_LIST_REQUEST,
    payload,
  };
}

