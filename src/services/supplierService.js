import {authHeader} from 'helpers';
import {urlConstants} from 'constants/urlConstants';
import handleResponse from 'services/handler';

const getAll = async () => {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  };

  const response = await fetch(
    urlConstants.REQUEST_URL + '/suppliers',
    requestOptions,
  );
  const suppliers = await handleResponse(response);
  return suppliers;
};

const getById = async id => {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  };

  const response = await fetch(
    urlConstants.REQUEST_URL + `/suppliers/${id}`,
    requestOptions,
  );
  const suppliers = await handleResponse(response);
  return suppliers;
};

const add = async supplier => {
  const requestOptions = {
    method: 'POST',
    headers: {...authHeader(), 'Content-Type': 'application/json'},
    body: JSON.stringify(supplier),
  };
  const response = await fetch(
    urlConstants.REQUEST_URL + `/suppliers`,
    requestOptions,
  );
  return handleResponse(response);
};

const update = async supplier => {
  const requestOptions = {
    method: 'PUT',
    headers: {...authHeader(), 'Content-Type': 'application/json'},
    body: JSON.stringify(supplier),
  };

  const response = await fetch(
    urlConstants.REQUEST_URL + `/suppliers/${supplier.id}`,
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
    urlConstants.REQUEST_URL + `/suppliers/${id}`,
    requestOptions,
  );
  return handleResponse(response);
};

export const supplierService = {
  add,
  getAll,
  getById,
  update,
  delete: _delete,
};
