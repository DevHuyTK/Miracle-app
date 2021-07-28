import {DOMAIN} from '../../store/constant'

export default function callAPI(data) {
  console.log(JSON.stringify(data), 'data: ');
  return new Promise((resolve, reject) => {
    const url = `${DOMAIN}/user/login`;
    fetch(url, {
      headers: { 'Content-type': 'Application/json' },
      method: 'POST',
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    })
      //.then((response) => response.json())
      .then((response) => response.json())
      .then((res) => {
        // console.log(res)
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
