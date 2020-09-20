import {authHeader} from 'helpers';
import {urlConstants} from 'constants/urlConstants';
import handleResponse from 'services/handler';

const login = async (username, password) => {
  const requestOptions = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({username, password}),
  };

  const response = await fetch(
    urlConstants.REQUEST_URL + '/users/authenticate',
    requestOptions,
  );
  const user = await handleResponse(response);
  // store user details and jwt token in local storage to keep user logged in between page refreshes
  localStorage.setItem('user', JSON.stringify(user));
  return user;
};

const logout = () => {
  // remove user from local storage to log user out
  localStorage.removeItem('user');
};

const getAll = async () => {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  };

  const response = await fetch(
    urlConstants.REQUEST_URL + '/users',
    requestOptions,
  );
  const users = await handleResponse(response);
  return users;
};

const getById = async id => {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  };

  const response = await fetch(
    urlConstants.REQUEST_URL + `/users/${id}`,
    requestOptions,
  );
  const users = await handleResponse(response);
  return users;
};

const register = async user => {
  const requestOptions = {
    method: 'POST',
    headers: {...authHeader(), 'Content-Type': 'application/json'},
    body: JSON.stringify(user),
  };
  const response = await fetch(
    urlConstants.REQUEST_URL + `/users/register`,
    requestOptions,
  );
  return handleResponse(response);
};

const update = async user => {
  const requestOptions = {
    method: 'PUT',
    headers: {...authHeader(), 'Content-Type': 'application/json'},
    body: JSON.stringify(user),
  };

  const response = await fetch(
    urlConstants.REQUEST_URL + `/users/${user.id}`,
    requestOptions,
  );
  return handleResponse(response);
};

// prefixed function name with underscore because delete is a reserved word in javascript
const _delete = async id => {
  const requestOptions = {
    method: 'DELETE',
    headers: authHeader(),
  };

  const response = await fetch(
    urlConstants.REQUEST_URL + `/users/${id}`,
    requestOptions,
  );
  return handleResponse(response);
};

export const getLogs = async () => {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  };

  const response = await fetch(
    urlConstants.REQUEST_URL + `/logs`,
    requestOptions,
  );
  return handleResponse(response);
};

export const userService = {
  login,
  logout,
  register,
  getAll,
  getById,
  update,
  delete: _delete,
};
