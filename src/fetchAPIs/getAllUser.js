import { DOMAIN } from '../store/constant';

export default function callAPI() {
  return new Promise((resolve, reject) => {
    const url = `${DOMAIN}/api/user/get-users`;
    fetch(url, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
}