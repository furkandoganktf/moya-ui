import {userConstants} from 'constants/userConstants';

export function users(state = {}, action) {
  switch (action.type) {
    case userConstants.REGISTER_REQUEST:
      return {registering: true};
    case userConstants.REGISTER_SUCCESS:
      return {};
    case userConstants.REGISTER_FAILURE:
      return {};
    case userConstants.GETALL_REQUEST:
      return {
        loading: true,
      };
    case userConstants.GETALL_SUCCESS:
      return {
        items: action.data,
      };
    case userConstants.GETALL_FAILURE:
      return {
        error: action.error,
      };
    case userConstants.DELETE_FAILURE:
      return {
        error: action.error,
      };
    case userConstants.UPDATE_FAILURE:
      return {
        error: action.error,
      };
    default:
      return state;
  }
}
