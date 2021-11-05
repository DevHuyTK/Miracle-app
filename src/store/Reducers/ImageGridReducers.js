import { SET_IMAGE } from './../Actions/ImageGridAction';

const ImageGridReducer = (state = [], action) => {
  switch (action.type) {
    case SET_IMAGE:
      return [...action.payload];
    default:
      return state;
  }
};

export default ImageGridReducer;
