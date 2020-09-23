import {authHeader} from 'helpers';
import {urlConstants} from 'constants/urlConstants';
import handleResponse from 'services/handler';

const getAll = async () => {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  };

  const response = await fetch(
    urlConstants.REQUEST_URL + '/products',
    requestOptions,
  );
  const products = await handleResponse(response);
  return products;
};

const getById = async id => {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  };

  const response = await fetch(
    urlConstants.REQUEST_URL + `/products/${id}`,
    requestOptions,
  );
  const products = await handleResponse(response);
  return products;
};

const add = async product => {
  const requestOptions = {
    method: 'POST',
    headers: {...authHeader(), 'Content-Type': 'application/json'},
    body: JSON.stringify(product),
  };
  const response = await fetch(
    urlConstants.REQUEST_URL + `/products`,
    requestOptions,
  );
  return handleResponse(response);
};

const packageProduct = async product => {
  const requestOptions = {
    method: 'POST',
    headers: {...authHeader(), 'Content-Type': 'application/json'},
    body: JSON.stringify(product),
  };
  const response = await fetch(
    urlConstants.REQUEST_URL + `/products/package`,
    requestOptions,
  );
  return handleResponse(response);
};

const update = async product => {
  const requestOptions = {
    method: 'PUT',
    headers: {...authHeader(), 'Content-Type': 'application/json'},
    body: JSON.stringify(product),
  };

  const response = await fetch(
    urlConstants.REQUEST_URL + `/products/${product.id}`,
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
    urlConstants.REQUEST_URL + `/products/${id}`,
    requestOptions,
  );
  return handleResponse(response);
};

export const stockUpdate = async product => {
  const requestOptions = {
    method: 'POST',
    headers: {...authHeader(), 'Content-Type': 'application/json'},
    body: JSON.stringify(product),
  };
  const response = await fetch(
    urlConstants.REQUEST_URL + `/products/stocks`,
    requestOptions,
  );
  return handleResponse(response);
};

export const productService = {
  add,
  packageProduct,
  getAll,
  getById,
  update,
  delete: _delete,
};
