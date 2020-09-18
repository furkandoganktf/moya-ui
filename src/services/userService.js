import {authHeader} from 'helpers';
import {urlConstants} from 'constants/urlConstants';
import handleResponse from 'services/handler';

export const userService = {
  login,
  logout,
  register,
  getAll,
  getById,
  update,
  delete: _delete,
};

async function login(username, password) {
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
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('user');
}

function getAll() {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  };

  return fetch(urlConstants.REQUEST_URL + '/users', requestOptions).then(
    handleResponse,
  );
}

function getById(id) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  };

  return fetch(urlConstants.REQUEST_URL + `/users/${id}`, requestOptions).then(
    handleResponse,
  );
}

function register(user) {
  const requestOptions = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(user),
  };
  return fetch(
    urlConstants.REQUEST_URL + '/users/register',
    requestOptions,
  ).then(handleResponse);
}

function update(user) {
  const requestOptions = {
    method: 'PUT',
    headers: {...authHeader(), 'Content-Type': 'application/json'},
    body: JSON.stringify(user),
  };

  return fetch(
    urlConstants.REQUEST_URL + `/users/${user.id}`,
    requestOptions,
  ).then(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
  const requestOptions = {
    method: 'DELETE',
    headers: authHeader(),
  };

  return fetch(urlConstants.REQUEST_URL + `/users/${id}`, requestOptions).then(
    handleResponse,
  );
}
