import {customerConstants} from 'constants/customerConstants';
import {customerService} from 'services';
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

const add = customer => {
  return async dispatch => {
    dispatch(request(customerConstants.ADD_REQUEST, customer));

    await customerService.add(customer).then(
      () => {
        dispatch(success(customerConstants.ADD_SUCCESS, customer));
        dispatch(alertActions.success('Müşteri Başarıyla Eklendi'));
      },
      error => {
        dispatch(failure(customerConstants.ADD_FAILURE, error));
        dispatch(alertActions.error(error.message || error));
      },
    );
  };
};

const getAll = () => {
  return dispatch => {
    dispatch(request(customerConstants.GETALL_REQUEST));

    customerService.getAll().then(
      customers => dispatch(success(customerConstants.GETALL_SUCCESS, customers)),
      error => dispatch(failure(customerConstants.GETALL_FAILURE, error)),
    );
  };
};

const _delete = customer => {
  return async dispatch => {
    dispatch(request(customerConstants.DELETE_REQUEST, customer));

    await customerService.delete(customer.id).then(
      () => {
        dispatch(success(customerConstants.DELETE_SUCCESS, customer));
        dispatch(alertActions.success('Müşteri başarıyla silindi'));
      },
      error => {
        dispatch(failure(customerConstants.DELETE_FAILURE, error));
        dispatch(alertActions.error(error.message || error));
      },
    );
  };
};

const update = customer => {
  return async dispatch => {
    dispatch(request(customerConstants.UPDATE_REQUEST, customer));

    await customerService.update(customer).then(
      () => {
        dispatch(success(customerConstants.UPDATE_SUCCESS, customer));
        dispatch(alertActions.success('Müşteri başarıyla güncellendi'));
      },
      error => {
        dispatch(failure(customerConstants.UPDATE_FAILURE, error));
        dispatch(alertActions.error(error.message || error));
      },
    );
  };
};

export const customerActions = {
  add,
  getAll,
  delete: _delete,
  update,
};
