import {userConstants} from 'constants/userConstants';
import {userService} from 'services';
import {alertActions} from 'actions';
import {history} from 'helpers';

const login = (username, password) => {
  const request = user => ({type: userConstants.LOGIN_REQUEST, user});
  const success = user => ({type: userConstants.LOGIN_SUCCESS, user});
  const failure = error => ({type: userConstants.LOGIN_FAILURE, error});

  return dispatch => {
    dispatch(request({username}));

    userService.login(username, password).then(
      user => {
        dispatch(success(user));
        history.push('/admin/dashboard');
      },
      error => {
        dispatch(failure(error));
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
  return dispatch => {
    dispatch(request(user));

    userService.register(user).then(
      () => {
        dispatch(success());
        history.push('/auth/login');
        dispatch(alertActions.success('Registration successful'));
      },
      error => {
        dispatch(failure(error));
        dispatch(alertActions.error(error.message || error));
      },
    );
  };

  function request(user) {
    return {type: userConstants.REGISTER_REQUEST, user};
  }
  function success(user) {
    return {type: userConstants.REGISTER_SUCCESS, user};
  }
  function failure(error) {
    return {type: userConstants.REGISTER_FAILURE, error};
  }
};

const getAll = () => {
  return dispatch => {
    dispatch(request());

    userService.getAll().then(
      users => dispatch(success(users)),
      error => dispatch(failure(error)),
    );
  };

  function request() {
    return {type: userConstants.GETALL_REQUEST};
  }
  function success(users) {
    return {type: userConstants.GETALL_SUCCESS, users};
  }
  function failure(error) {
    return {type: userConstants.GETALL_FAILURE, error};
  }
};

// prefixed function name with underscore because delete is a reserved word in javascript
const _delete = id => {
  return dispatch => {
    dispatch(request(id));

    userService.delete(id).then(
      () => {
        dispatch(success(id));
      },
      error => {
        dispatch(failure(id, error));
      },
    );
  };

  function request(id) {
    return {type: userConstants.DELETE_REQUEST, id};
  }
  function success(id) {
    return {type: userConstants.DELETE_SUCCESS, id};
  }
  function failure(id, error) {
    return {type: userConstants.DELETE_FAILURE, id, error};
  }
};

export const userActions = {
  login,
  logout,
  register,
  getAll,
  delete: _delete,
};
