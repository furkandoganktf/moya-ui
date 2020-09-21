import {combineReducers} from 'redux';
import {authentication} from './authenticationReducer';
import {users} from './usersReducer';
import {alert} from './alertReducer';
import {customers} from './customerReducer';
import {suppliers} from './supplierReducer';
import {brands} from './brandReducer';
import {products} from './productReducer';

const rootReducer = combineReducers({
  authentication,
  users,
  alert,
  customers,
  suppliers,
  brands,
  products,
});

export default rootReducer;
