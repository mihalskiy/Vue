import { router } from '../index';
import axios from 'axios';

const API_URL = 'http://localhost:1337/auth';
const LOGIN_URL = `${API_URL}/local`;
const REGISTER_URL = `${API_URL}/local/register`;

export default {
  user: {
    authenticated: false,
  },

  loginOrSignup(action, context, creds, redirect) {
    let url = '';
    switch (action) {
      case 'login':
        url = LOGIN_URL;
        break;
      case 'signup':
        url = REGISTER_URL;
        break;
      default:
        url = LOGIN_URL;
    }
    axios.post(url, creds)
      .then((response) => {
        localStorage.setItem('token', response.data.token);

        this.user.authenticated = true;

        if (redirect) {
          router.push(redirect);
        } else {
          router.push('/');
        }
      })
      .catch((err) => {
        context.error = err.response.data;
      });
  },

  logout() {
    localStorage.removeItem('token');
    this.user.authenticated = false;
  },

  checkAuth() {
    const jwt = localStorage.getItem('token');

    this.user.authenticated = !!jwt;
  },

  getAuthHeader() {
    return {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    };
  },
};
