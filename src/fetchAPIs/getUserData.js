import { DOMAIN, LIMIT } from '../store/constant';

export default function callAPI(token, pageIndex) {
  return new Promise((resolve, reject) => {
    const url = `${DOMAIN}/api/photo/photo-user?limit=${LIMIT}&page=${pageIndex}`;
    fetch(url, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
      .then((response) => response.json())
      .then((res) => {
        //console.log(res)
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
