import axios from 'axios';

export const getWebsite = () => {
  return axios.get('/api/google').then(response => {
    return response.data;
  });
};
