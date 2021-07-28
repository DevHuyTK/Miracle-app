import { DOMAIN } from '../../store/constant';

export default function callAPI(data) {
  console.log(data);
  return new Promise((resolve, reject) => {
    const url = `${DOMAIN}/user/${data.id}`;
    fetch(url, {
      headers: {
        'Content-type': 'Application/json',
        Authorization: `Bearer ${data.token}`,
      },
      method: 'PUT',
      body: JSON.stringify({
        name: data.name,
        tagname: data.tagname,
        password: data.password,
        age: data.age,
        avatar: data.avatar,
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
