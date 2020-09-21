import {supplierConstants} from 'constants/supplierConstants';
import {supplierService} from 'services';
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

const add = supplier => {
  return async dispatch => {
    dispatch(request(supplierConstants.ADD_REQUEST, supplier));

    await supplierService.add(supplier).then(
      () => {
        dispatch(success(supplierConstants.ADD_SUCCESS, supplier));
        dispatch(alertActions.success('Tedarikçi Başarıyla Eklendi'));
      },
      error => {
        dispatch(failure(supplierConstants.ADD_FAILURE, error));
        dispatch(alertActions.error(error.message || error));
      },
    );
  };
};

const getAll = () => {
  return async dispatch => {
    dispatch(request(supplierConstants.GETALL_REQUEST));
    await supplierService.getAll().then(
      suppliers =>
        dispatch(success(supplierConstants.GETALL_SUCCESS, suppliers)),
      error => dispatch(failure(supplierConstants.GETALL_FAILURE, error)),
    );
  };
};

const _delete = supplier => {
  return async dispatch => {
    dispatch(request(supplierConstants.DELETE_REQUEST, supplier));

    await supplierService.delete(supplier.id).then(
      () => {
        dispatch(success(supplierConstants.DELETE_SUCCESS, supplier));
        dispatch(alertActions.success('Tedarikçi başarıyla silindi'));
      },
      error => {
        dispatch(failure(supplierConstants.DELETE_FAILURE, error));
        dispatch(alertActions.error(error.message || error));
      },
    );
  };
};

const update = supplier => {
  return async dispatch => {
    dispatch(request(supplierConstants.UPDATE_REQUEST, supplier));

    await supplierService.update(supplier).then(
      () => {
        dispatch(success(supplierConstants.UPDATE_SUCCESS, supplier));
        dispatch(alertActions.success('Tedarikçi başarıyla güncellendi'));
      },
      error => {
        dispatch(failure(supplierConstants.UPDATE_FAILURE, error));
        dispatch(alertActions.error(error.message || error));
      },
    );
  };
};

export const supplierActions = {
  add,
  getAll,
  delete: _delete,
  update,
};
