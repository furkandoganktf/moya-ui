import {brandConstants} from 'constants/brandConstants';
import {brandService} from 'services';
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

const add = brand => {
  return async dispatch => {
    dispatch(request(brandConstants.ADD_REQUEST, brand));

    await brandService.add(brand).then(
      () => {
        dispatch(success(brandConstants.ADD_SUCCESS, brand));
        dispatch(alertActions.success('Marka Başarıyla Eklendi'));
      },
      error => {
        dispatch(failure(brandConstants.ADD_FAILURE, error));
        dispatch(alertActions.error(error.message || error));
      },
    );
  };
};

const getAll = () => {
  return async dispatch => {
    dispatch(request(brandConstants.GETALL_REQUEST));
    await brandService.getAll().then(
      brands =>
        dispatch(success(brandConstants.GETALL_SUCCESS, brands)),
      error => dispatch(failure(brandConstants.GETALL_FAILURE, error)),
    );
  };
};

const _delete = brand => {
  return async dispatch => {
    dispatch(request(brandConstants.DELETE_REQUEST, brand));

    await brandService.delete(brand.id).then(
      () => {
        dispatch(success(brandConstants.DELETE_SUCCESS, brand));
        dispatch(alertActions.success('Marka başarıyla silindi'));
      },
      error => {
        dispatch(failure(brandConstants.DELETE_FAILURE, error));
        dispatch(alertActions.error(error.message || error));
      },
    );
  };
};

const update = brand => {
  return async dispatch => {
    dispatch(request(brandConstants.UPDATE_REQUEST, brand));

    await brandService.update(brand).then(
      () => {
        dispatch(success(brandConstants.UPDATE_SUCCESS, brand));
        dispatch(alertActions.success('Marka başarıyla güncellendi'));
      },
      error => {
        dispatch(failure(brandConstants.UPDATE_FAILURE, error));
        dispatch(alertActions.error(error.message || error));
      },
    );
  };
};

export const brandActions = {
  add,
  getAll,
  delete: _delete,
  update,
};
