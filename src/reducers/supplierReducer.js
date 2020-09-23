import {supplierConstants} from 'constants/supplierConstants';

export function suppliers(state = {}, action) {
  switch (action.type) {
    case supplierConstants.ADD_REQUEST:
      return {...state, adding: true};
    case supplierConstants.GETALL_REQUEST:
      return {...state, loading: true};
    case supplierConstants.GETALL_SUCCESS:
      return {...state, items: action.data};
    case supplierConstants.GETALL_FAILURE:
      return {...state, error: action.error};
    case supplierConstants.DELETE_FAILURE:
      return {...state, error: action.error};
    case supplierConstants.UPDATE_FAILURE:
      return {...state, error: action.error};
    default:
      return state;
  }
}
