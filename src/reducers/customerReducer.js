import {customerConstants} from 'constants/customerConstants';

export function customers(state = {}, action) {
  switch (action.type) {
    case customerConstants.ADD_REQUEST:
      return {adding: true};
    case customerConstants.ADD_SUCCESS:
      return {};
    case customerConstants.ADD_FAILURE:
      return {};
    case customerConstants.GETALL_REQUEST:
      return {
        loading: true,
      };
    case customerConstants.GETALL_SUCCESS:
      return {
        items: action.data,
      };
    case customerConstants.GETALL_FAILURE:
      return {
        error: action.error,
      };
    case customerConstants.DELETE_FAILURE:
      return {
        error: action.error,
      };
    case customerConstants.UPDATE_FAILURE:
      return {
        error: action.error,
      };
    default:
      return state;
  }
}
