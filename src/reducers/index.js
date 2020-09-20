import {combineReducers} from 'redux';
import {authentication} from './authenticationReducer';
import {users} from './usersReducer';
import {alert} from './alertReducer';
import {customers} from './customerReducer';
import {suppliers} from './supplierReducer';

const rootReducer = combineReducers({
  authentication,
  users,
  alert,
  customers,
  suppliers,
});

export default rootReducer;
