import ajax from './ajax';
import { API } from '../../constants/api';

export const getLatestEvents = data => {
  const url = `${API}/event/latest`;
  return ajax(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });
};
