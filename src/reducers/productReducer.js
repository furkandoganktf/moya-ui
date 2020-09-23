import {productConstants} from 'constants/productConstants';

export function products(state = {}, action) {
  switch (action.type) {
    case productConstants.ADD_REQUEST:
      return {...state, adding: true};
    case productConstants.ADD_SUCCESS:
      return {...state};
    case productConstants.ADD_FAILURE:
      return {...state};
    case productConstants.GETALL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case productConstants.GETALL_SUCCESS:
      return {
        ...state,
        items: action.data,
      };
    case productConstants.GETALL_FAILURE:
      return {
        ...state,
        error: action.error,
      };
    case productConstants.DELETE_FAILURE:
      return {
        ...state,
        error: action.error,
      };
    case productConstants.UPDATE_FAILURE:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
}
