import axios from 'axios';

export const getWebsite = () => {
  return axios.get('/api/google').then(response => {
    return response.data;
  });
};

export const postWebsite = () => {
  return axios
    .post('/api/website', {
      website: 'website'
    })
    .then(response => console.log(response));
};
