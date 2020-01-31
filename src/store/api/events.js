import ajax from './ajax';
import { API } from '../../constants/api';

export const getEvents = data => {
  const url = `${API}/event/showAll`;
  return ajax(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: ''
    }
  });
};
