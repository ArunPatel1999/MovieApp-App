//import : axios
import axios from 'axios';
//variables : BASEURL
export const BASE_URL = `https://moviepur-gcal.onrender.com/`;
//variables : end points
export const check_user_exists = `user/exists`;
export const user = `user`;
export const banner = `banner`;
export const recommandation = `movie/recommandation`;
export const most_like = `movie/mostLike`;
export const find_all = `movie/findAllForUser`;
export const search = `imdb/search/`;
export const movie_detail = `imdb/`;
export const add_in_fav_or_watch = `user/addIn/`;
export const remove_from_fav_or_watch = `user/removeIn/`;
export const all_fav_or_watch = `user/findAllByUser/`;
export const file_pursuit_link = `download-link/normal/filepursuit`;
export const f_movie_link = `download-link/normal/fMovie/`;
//function : imp function
const objToQueryString = obj => {
  const keyValuePairs = [];
  for (const key in obj) {
    keyValuePairs.push(
      encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]),
    );
  }
  return keyValuePairs.length == 0 ? '' : '?' + keyValuePairs.join('&');
};
//function : getAPI
export const getAPI = async (endPoint, paramsData = {}, token = '') => {
  const url = BASE_URL + endPoint + objToQueryString(paramsData);
  const header = {
    Accept: '*/*',
    Authentication: `Bearer ${token}`,
    Authorization: `${
      token == null || token == '' ? null : 'Bearer ' + token
    } `,
    'Content-Type': 'application/json',
  };
  console.log('URL:-GET', url);
  return await axios
    .get(url, {
      headers: header,
    })
    .then(response => {
      return {
        status: true,
        response: response.data,
      };
    })
    .catch(error => {
      console.log('data', error.response.data);
      console.log('status', error.response.status);
      // console.log('header', error.response.headers);
      return {
        status: false,
        response: error,
      };
    });
};

export const postAPI = async (endPoint, data, token) => {
  const url = BASE_URL + endPoint;
  const header = {
    Accept: '*/*',
    Authorization: `${token == null || token == '' ? null : 'Bearer' + token} `,
    'Content-Type': data.hasOwnProperty('_parts')
      ? 'multipart/form-data'
      : 'application/json',
  };
  console.log('URL:-POST', url);
  console.log('POST DATA:-', data);
  return await axios
    .post(url, data, {
      headers: header,
    })
    .then(response => {
      return {
        status: true,
        response: response.data,
      };
    })
    .catch(error => {
      console.log('ERROR', error.response);
      // console.log('data', error.response.data);
      // console.log('status', error.response.status);
      // console.log('header', error.response.headers);
      return {
        status: false,
        response: error,
      };
    });
};

export const patchAPI = async (endPoint, data, token) => {
  const url = BASE_URL + endPoint;
  const header = {
    Accept: '*/*',
    Authorization: `${token == null || token == '' ? null : 'Bearer' + token} `,
    'Content-Type': data.hasOwnProperty('_parts')
      ? 'multipart/form-data'
      : 'application/json',
  };
  console.log('URL:-', url);
  console.log('POST DATA:-', data);
  return await axios
    .patch(url, data, {
      headers: header,
    })
    .then(response => {
      return {
        status: true,
        response: response.data,
      };
    })
    .catch(error => {
      console.log('ERROR', error.response);
      // console.log('data', error.response.data);
      // console.log('status', error.response.status);
      // console.log('header', error.response.headers);
      return {
        status: false,
        response: error,
      };
    });
};

export const deleteAPI = async (endPoint, paramsData = {}) => {
  const url = BASE_URL + endPoint + objToQueryString(paramsData);
  console.log('URL:-', url);
  return await axios
    .delete(url)
    .then(response => {
      return {
        status: true,
        response: response.data,
      };
    })
    .catch(error => {
      console.log('ERROR', error.response);
      // console.log('data', error.response.data);
      // console.log('status', error.response.status);
      // console.log('header', error.response.headers);
      return {
        status: false,
        response: error,
      };
    });
};
