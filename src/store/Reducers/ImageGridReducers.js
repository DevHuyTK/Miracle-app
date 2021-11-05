import { SET_IMAGE } from './../Actions/ImageGridAction';

const ImageGridReducer = (
  state = [
    'https://i.imgur.com/UYiroysl.jpg',
    'https://i.imgur.com/UPrs1EWl.jpg',
    'https://i.imgur.com/MABUbpDl.jpg',
    'https://i.imgur.com/KZsmUi2l.jpg',
    'https://i.imgur.com/2nCt3Sbl.jpg',
    'https://i.imgur.com/UYiroysl.jpg',
    'https://i.imgur.com/UPrs1EWl.jpg',
  ],
  action
) => {
  switch (action.type) {
    case SET_IMAGE:
      return  [...action.payload ];
    default:
      return state;
  }
};

export default ImageGridReducer;
