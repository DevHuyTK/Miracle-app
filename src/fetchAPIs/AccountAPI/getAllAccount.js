import {DOMAIN} from '../../store/constant'

export default function callAPI(data) {
  return new Promise((resolve, reject) => {
    const url = `${DOMAIN}/users`;
    fetch(url, {
      method: 'GET',
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
