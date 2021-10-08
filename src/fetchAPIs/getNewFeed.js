import { DOMAIN } from '../store/constant';

export default function callAPI(token) {
  return new Promise((resolve, reject) => {
    const url = `${DOMAIN}/api/photo`;
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
