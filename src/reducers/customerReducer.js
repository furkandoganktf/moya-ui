import {customerConstants} from 'constants/customerConstants';

export function customers(state = {}, action) {
  switch (action.type) {
    case customerConstants.ADD_REQUEST:
      return {...state, adding: true};
    case customerConstants.GETALL_REQUEST:
      return {...state, loading: true};
    case customerConstants.GETALL_SUCCESS:
      return {...state, items: action.data};
    case customerConstants.GETALL_FAILURE:
      return {...state, error: action.error};
    case customerConstants.DELETE_FAILURE:
      return {...state, error: action.error};
    case customerConstants.UPDATE_FAILURE:
      return {...state, error: action.error};
    default:
      return state;
  }
}
