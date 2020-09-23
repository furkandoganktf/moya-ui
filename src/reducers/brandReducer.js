import {brandConstants} from 'constants/brandConstants';

export function brands(state = {}, action) {
  switch (action.type) {
    case brandConstants.ADD_REQUEST:
      return {...state, adding: true};
    case brandConstants.GETALL_REQUEST:
      return {...state, loading: true};
    case brandConstants.GETALL_SUCCESS:
      return {...state, items: action.data};
    case brandConstants.GETALL_FAILURE:
      return {...state, error: action.error};
    case brandConstants.DELETE_FAILURE:
      return {...state, error: action.error};
    case brandConstants.UPDATE_FAILURE:
      return {...state, error: action.error};
    default:
      return state;
  }
}
