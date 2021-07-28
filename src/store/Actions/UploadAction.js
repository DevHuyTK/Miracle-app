import { UPLOAD_IMG_REQUEST, UPLOAD_IMG_SUCCESS, UPLOAD_IMG_FAILURE } from '../constant';

function uploadImgRequest(payload) {
  return {
    type: UPLOAD_IMG_REQUEST,
    payload,
  };
}

function uploadImgSuccess(payload) {
  return {
    type: UPLOAD_IMG_SUCCESS,
    payload,
  };
}

function uploadImgFailure(payload) {
  return {
    type: UPLOAD_IMG_FAILURE,
    payload,
  };
}

export { uploadImgRequest, uploadImgSuccess, uploadImgFailure };
