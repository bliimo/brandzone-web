import ajax from './ajax';
import { API } from '../../constants/api';

export const login = data => {
  const url = `${API}/login`;
  return ajax(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}