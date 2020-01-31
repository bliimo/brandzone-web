import ajax from './ajax';
import { API } from '../../constants/api';

export const getCurrentUser = data => {
  const url = `${API}/myAccount`;
  return ajax(
    url,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    },
    {
      token: data.token
    }
  );
};

export const getUsers = data => {
  const url = `${API}/users`;
  return ajax(
    url,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    },
    {
      token: data.token
    }
  );
};

export const getUserInfo = data => {
  const url = `${API}/users/${data.id}`;
  return ajax(
    url,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    },
    {
      token: data.token
    }
  );
};

export const addUser = data => {
  const { userType } = data;
  const url = `${API}/${userType}/register`;
  return ajax(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  });
};

export const inviteUsers = data => {
  const url = `${API}/invite_users`;
  return ajax(
    url,
    {
      method: 'POST',
      body: JSON.stringify(data.userData),
      headers: {
        'Content-Type': 'application/json'
      }
    },
    {
      token: data.token
    }
  );
};

export const updateAccountStatus = data => {
  const url = `${API}/users/${data.userId}`;
  return ajax(
    url,
    {
      method: 'PUT',
      body: JSON.stringify(data.status),
      headers: {
        'Content-Type': 'application/json'
      }
    },
    {
      token: data.token
    }
  );
};

export const editUserInfo = data => {
  const url = `${API}/users/${data.userId}`;
  return ajax(
    url,
    {
      method: 'PUT',
      body: JSON.stringify(data.userData),
      headers: {
        'Content-Type': 'application/json'
      }
    },
    {
      token: data.token
    }
  );
};

export const upload = data => {
  const url = `${API}/storage/uploadFile`;
  return ajax(
    url,
    {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    },
    {
      token: data.token
    }
  );
};
