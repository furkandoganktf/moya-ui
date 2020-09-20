import {authHeader} from 'helpers';
import {urlConstants} from 'constants/urlConstants';
import handleResponse from 'services/handler';

const getAll = async () => {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  };

  const response = await fetch(
    urlConstants.REQUEST_URL + '/customers',
    requestOptions,
  );
  const customers = await handleResponse(response);
  return customers;
};

const getById = async id => {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  };

  const response = await fetch(
    urlConstants.REQUEST_URL + `/customers/${id}`,
    requestOptions,
  );
  const customers = await handleResponse(response);
  return customers;
};

const add = async customer => {
  const requestOptions = {
    method: 'POST',
    headers: {...authHeader(), 'Content-Type': 'application/json'},
    body: JSON.stringify(customer),
  };
  const response = await fetch(
    urlConstants.REQUEST_URL + `/customers`,
    requestOptions,
  );
  return handleResponse(response);
};

const update = async customer => {
  const requestOptions = {
    method: 'PUT',
    headers: {...authHeader(), 'Content-Type': 'application/json'},
    body: JSON.stringify(customer),
  };

  const response = await fetch(
    urlConstants.REQUEST_URL + `/customers/${customer.id}`,
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
    urlConstants.REQUEST_URL + `/customers/${id}`,
    requestOptions,
  );
  return handleResponse(response);
};

export const customerService = {
  add,
  getAll,
  getById,
  update,
  delete: _delete,
};
