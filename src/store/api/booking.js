import ajax from './ajax';
import { API } from '../../constants/api';

export const setBookings = data => {
  console.log(data);
  const url = `${API}/booking/set/bookings`;
  return ajax(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${data.token}`
    }
  });
};
