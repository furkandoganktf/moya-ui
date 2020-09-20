import {productConstants} from 'constants/productConstants';
import {productService} from 'services';
import {alertActions} from 'actions';

const request = (type, data) => ({
  type: type,
  data,
});
const success = (type, data) => ({
  type: type,
  data,
});
const failure = (type, error) => ({type: type, error});

const add = product => {
  return async dispatch => {
    dispatch(request(productConstants.ADD_REQUEST, product));

    await productService.add(product).then(
      () => {
        dispatch(success(productConstants.ADD_SUCCESS, product));
        dispatch(alertActions.success('Ürün Başarıyla Eklendi'));
      },
      error => {
        dispatch(failure(productConstants.ADD_FAILURE, error));
        dispatch(alertActions.error(error.message || error));
      },
    );
  };
};

const getAll = () => {
  return dispatch => {
    dispatch(request(productConstants.GETALL_REQUEST));

    productService.getAll().then(
      products => dispatch(success(productConstants.GETALL_SUCCESS, products)),
      error => dispatch(failure(productConstants.GETALL_FAILURE, error)),
    );
  };
};

const _delete = product => {
  return async dispatch => {
    dispatch(request(productConstants.DELETE_REQUEST, product));

    await productService.delete(product.id).then(
      () => {
        dispatch(success(productConstants.DELETE_SUCCESS, product));
        dispatch(alertActions.success('Ürün başarıyla silindi'));
      },
      error => {
        dispatch(failure(productConstants.DELETE_FAILURE, error));
        dispatch(alertActions.error(error.message || error));
      },
    );
  };
};

const update = product => {
  return async dispatch => {
    dispatch(request(productConstants.UPDATE_REQUEST, product));

    await productService.update(product).then(
      () => {
        dispatch(success(productConstants.UPDATE_SUCCESS, product));
        dispatch(alertActions.success('Ürün başarıyla güncellendi'));
      },
      error => {
        dispatch(failure(productConstants.UPDATE_FAILURE, error));
        dispatch(alertActions.error(error.message || error));
      },
    );
  };
};

export const productActions = {
  add,
  getAll,
  delete: _delete,
  update,
};
