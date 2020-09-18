import {createStore, applyMiddleware, compose} from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from 'reducers';

let store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

// eslint-disable-next-line no-undef
if (process.env.NODE_ENV !== 'production') {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunkMiddleware)),
  );
}

export {store};
