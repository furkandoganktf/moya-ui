import {userConstants} from 'constants/userConstants';
import {userService} from 'services';
import {alertActions} from 'actions';
import {history} from 'helpers';

const request = (type, data) => ({
  type: type,
  data,
});
const success = (type, data) => ({
  type: type,
  data,
});
const failure = (type, error) => ({type: type, error});

const login = (username, password) => {
  return dispatch => {
    dispatch(request(userConstants.LOGIN_REQUEST, {username}));

    userService.login(username, password).then(
      user => {
        dispatch(success(userConstants.LOGIN_SUCCESS, user));
        history.push('/admin/dashboard');
      },
      error => {
        dispatch(failure(userConstants.LOGIN_FAILURE, error));
        dispatch(alertActions.error(error.message || error));
      },
    );
  };
};

const logout = () => {
  userService.logout();
  return {type: userConstants.LOGOUT};
};

const register = user => {
  return async dispatch => {
    dispatch(request(userConstants.REGISTER_REQUEST, user));

    await userService.register(user).then(
      () => {
        dispatch(success(userConstants.REGISTER_SUCCESS, user));
        dispatch(alertActions.success('Kullanıcı Başarıyla Eklendi'));
      },
      error => {
        dispatch(failure(userConstants.REGISTER_FAILURE, error));
        dispatch(alertActions.error(error.message || error));
      },
    );
  };
};

const getAll = () => {
  return dispatch => {
    dispatch(request(userConstants.GETALL_REQUEST));

    userService.getAll().then(
      users => dispatch(success(userConstants.GETALL_SUCCESS, users)),
      error => dispatch(failure(userConstants.GETALL_FAILURE, error)),
    );
  };
};

const _delete = user => {
  return async dispatch => {
    dispatch(request(userConstants.DELETE_REQUEST, user));

    await userService.delete(user.id).then(
      () => {
        dispatch(success(userConstants.DELETE_SUCCESS, user));
        dispatch(alertActions.success('Kullanıcı başarıyla silindi'));
      },
      error => {
        dispatch(failure(userConstants.DELETE_FAILURE, error));
        dispatch(alertActions.error(error.message || error));
      },
    );
  };
};

const update = user => {
  return async dispatch => {
    dispatch(request(userConstants.UPDATE_REQUEST, user));

    await userService.update(user).then(
      () => {
        dispatch(success(userConstants.UPDATE_SUCCESS, user));
        dispatch(alertActions.success('Kullanıcı başarıyla güncellendi'));
      },
      error => {
        dispatch(failure(userConstants.UPDATE_FAILURE, error));
        dispatch(alertActions.error(error.message || error));
      },
    );
  };
};

export const userActions = {
  login,
  logout,
  register,
  getAll,
  delete: _delete,
  update,
};
