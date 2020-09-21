import {brandConstants} from 'constants/brandConstants';

export function brands(state = {}, action) {
  switch (action.type) {
    case brandConstants.ADD_REQUEST:
      return {adding: true};
    case brandConstants.ADD_SUCCESS:
      return {};
    case brandConstants.ADD_FAILURE:
      return {};
    case brandConstants.GETALL_REQUEST:
      return {
        loading: true,
      };
    case brandConstants.GETALL_SUCCESS:
      return {
        items: action.data,
      };
    case brandConstants.GETALL_FAILURE:
      return {
        error: action.error,
      };
    case brandConstants.DELETE_FAILURE:
      return {
        error: action.error,
      };
    case brandConstants.UPDATE_FAILURE:
      return {
        error: action.error,
      };
    default:
      return state;
  }
}
