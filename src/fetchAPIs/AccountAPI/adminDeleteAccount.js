import { AsyncStorage } from 'react-native';
import {DOMAIN} from '../../store/constant'

export default function callAPI(data) {
  const value =  AsyncStorage.getItem('token')
  return new Promise((resolve, reject) => {
    const url = `${DOMAIN}/user/delete/${data._id}`;
    fetch(url, {
      method: 'DELETE',
      headers:{'Authorization':`Bearer ${value}`}
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
