export default function callAPI(data) {
  return new Promise((resolve, reject) => {
    const url = `http://192.168.90.103:3000/user/refreshToken`;
    fetch(url, {
      headers: { 'Content-type': 'Application/json' },
      method: 'POST',
      body: JSON.stringify({
        refreshToken: data.refreshToken,
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
