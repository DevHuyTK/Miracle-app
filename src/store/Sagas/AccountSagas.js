import { put, takeEvery } from 'redux-saga/effects';
import * as types from '../constant';
import getNewFeed from '../../fetchAPIs/getNewFeed'
import getUserNewFeed from '../../fetchAPIs/getUserData'
import getAllUser from '../../fetchAPIs/getAllUser'
import getMatchingList from '../../fetchAPIs/getMatchingList'

function* getAllNewFeed(action) {
  try {
    const res = yield getNewFeed(action.payload);
    yield put({
      type: types.GET_NEWFEED_SUCCESS,
      payload: {
        newfeed: res.data,
      },
    });
  } catch (error) {
    yield put({
      type: types.GET_NEWFEED_FAILURE,
      payload: {
        error: error.message,
      },
    });
  }
}
function* getNewFeedUser(action) {
  try {
    const res = yield getUserNewFeed(action.payload);
    yield put({
      type: types.GET_USER_NEWFEED_SUCCESS,
      payload: {
        usernewfeed: res.data,
      },
    });
  } catch (error) {
    yield put({
      type: types.GET_USER_NEWFEED_FAILURE,
      payload: {
        error: error.message,
      },
    });
  }
}
function* getAllAccount(action) {
  try {
    const res = yield getAllUser(action.payload);
    yield put({
      type: types.GET_ALL_USER_SUCCESS,
      payload: {
        alluser: res.data,
      },
    });
  } catch (error) {
    yield put({
      type: types.GET_ALL_USER_FAILURE,
      payload: {
        error: error.message,
      },
    });
  }
}
function* getMatchingListAccount(action) {
  try {
    const res = yield getMatchingList(action.payload);
    yield put({
      type: types.GET_MATCHING_LIST_SUCCESS,
      payload: {
        user_info: res.data,
      },
    });
  } catch (error) {
    yield put({
      type: types.GET_MATCHING_LIST_FAILURE,
      payload: {
        error: error.message,
      },
    });
  }
}


export const AccountSaga = [
  takeEvery(types.GET_NEWFEED_REQUEST, getAllNewFeed),
  takeEvery(types.GET_USER_NEWFEED_REQUEST, getNewFeedUser),
  takeEvery(types.GET_ALL_USER_REQUEST, getAllAccount),
  takeEvery(types.GET_MATCHING_LIST_REQUEST, getMatchingListAccount)
];
