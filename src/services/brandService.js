import {authHeader} from 'helpers';
import {urlConstants} from 'constants/urlConstants';
import handleResponse from 'services/handler';

const getAll = async () => {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  };

  const response = await fetch(
    urlConstants.REQUEST_URL + '/brands',
    requestOptions,
  );
  const brands = await handleResponse(response);
  return brands;
};

const getById = async id => {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  };

  const response = await fetch(
    urlConstants.REQUEST_URL + `/brands/${id}`,
    requestOptions,
  );
  const brands = await handleResponse(response);
  return brands;
};

const add = async brand => {
  const requestOptions = {
    method: 'POST',
    headers: {...authHeader(), 'Content-Type': 'application/json'},
    body: JSON.stringify(brand),
  };
  const response = await fetch(
    urlConstants.REQUEST_URL + `/brands`,
    requestOptions,
  );
  return handleResponse(response);
};

const update = async brand => {
  const requestOptions = {
    method: 'PUT',
    headers: {...authHeader(), 'Content-Type': 'application/json'},
    body: JSON.stringify(brand),
  };

  const response = await fetch(
    urlConstants.REQUEST_URL + `/brands/${brand.id}`,
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
    urlConstants.REQUEST_URL + `/brands/${id}`,
    requestOptions,
  );
  return handleResponse(response);
};

export const brandService = {
  add,
  getAll,
  getById,
  update,
  delete: _delete,
};
