import {DOMAIN} from '../../store/constant'

export default function callAPI(data) {
  console.log(data)
  return new Promise((resolve, reject) => {
    const url = `${DOMAIN}/user/register`;
    fetch(url, {
      headers: { 'Content-type': 'Application/json' },
      method: 'POST',
      body: JSON.stringify({
        name: data.name,
        tagname: data.tagname,
        email: data.email,
        password: data.password,
      }),
    })
      //.then((response) => response.json())
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
