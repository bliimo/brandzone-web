import ajax from './ajax';
import { API } from '../../constants/api';

export const getInstitution = () => {
  const url = `${API}/institutionType/showAll`;
  return ajax(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });
};
