import {combineReducers} from 'redux';
import {authentication} from './authenticationReducer';
import {users} from './usersReducer';
import {alert} from './alertReducer';
import {brands} from './brandReducer';
import {suppliers} from './supplierReducer';

const rootReducer = combineReducers({
  authentication,
  users,
  alert,
  brands,
  suppliers,
});

export default rootReducer;
