import {userConstants} from 'constants/userConstants';

export function users(state = {}, action) {
  switch (action.type) {
    case userConstants.REGISTER_REQUEST:
      return {...state, registering: true};
    case userConstants.GETALL_REQUEST:
      return {...state, loading: true};
    case userConstants.GETALL_SUCCESS:
      return {...state, items: action.data};
    case userConstants.GETALL_FAILURE:
      return {...state, error: action.error};
    case userConstants.DELETE_FAILURE:
      return {...state, error: action.error};
    case userConstants.UPDATE_FAILURE:
      return {...state, error: action.error};
    default:
      return state;
  }
}
