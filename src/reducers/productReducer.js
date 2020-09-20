import {productConstants} from 'constants/productConstants';

export function products(state = {}, action) {
  switch (action.type) {
    case productConstants.ADD_REQUEST:
      return {adding: true};
    case productConstants.ADD_SUCCESS:
      return {};
    case productConstants.ADD_FAILURE:
      return {};
    case productConstants.GETALL_REQUEST:
      return {
        loading: true,
      };
    case productConstants.GETALL_SUCCESS:
      return {
        items: action.data,
      };
    case productConstants.GETALL_FAILURE:
      return {
        error: action.error,
      };
    case productConstants.DELETE_FAILURE:
      return {
        error: action.error,
      };
    case productConstants.UPDATE_FAILURE:
      return {
        error: action.error,
      };
    default:
      return state;
  }
}
