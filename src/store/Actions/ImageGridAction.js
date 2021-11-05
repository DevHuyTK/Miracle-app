export const SET_IMAGE = 'SET_IMAGE';

export const setImage = (imageGrid) => {
  return {
    type: SET_IMAGE,
    payload: imageGrid,
  };
};
