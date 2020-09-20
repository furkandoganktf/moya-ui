import {supplierConstants} from 'constants/supplierConstants';

export function suppliers(state = {}, action) {
  switch (action.type) {
    case supplierConstants.ADD_REQUEST:
      return {adding: true};
    case supplierConstants.ADD_SUCCESS:
      return {};
    case supplierConstants.ADD_FAILURE:
      return {};
    case supplierConstants.GETALL_REQUEST:
      return {
        loading: true,
      };
    case supplierConstants.GETALL_SUCCESS:
      return {
        items: action.data,
      };
    case supplierConstants.GETALL_FAILURE:
      return {
        error: action.error,
      };
    case supplierConstants.DELETE_FAILURE:
      return {
        error: action.error,
      };
    case supplierConstants.UPDATE_FAILURE:
      return {
        error: action.error,
      };
    default:
      return state;
  }
}
