import axios from 'axios';

const apiUrl = 'http://192.168.100.169:3000/graphql';

export const checkLoggedIn = async () => {
  let token = localStorage.getItem('token');
  if (token === null) {
    localStorage.setItem('token', '');
    token = '';
  }
  const tokenRequestBody = {
    query: `
      mutation {
        getTokenUser(token: "${token}") {
          _id
          token
        }
      }
    `
  };
  const tokenResponse = await axios.post(apiUrl, tokenRequestBody, {
    headers: { 'Content-Type': 'application/json' }
  });

  if (tokenResponse.data.data.getTokenUser !== null) {
    return tokenResponse.data.data.getTokenUser;
  }
  return null;
};
