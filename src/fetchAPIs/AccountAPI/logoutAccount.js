export default function callAPI(data) {
    console.log(JSON.stringify(data), 'data: ');
    return new Promise((resolve, reject) => {
      const url = `http://192.168.1.111:3000/user/logout`;
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
          // console.log(res)
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  