import React from 'react';
import {Redirect, Route, Router, Switch} from 'react-router-dom';
import {alertActions} from 'actions';
import {AdminLayout} from 'layouts/Admin/Admin.js';
import AuthLayout from 'layouts/Auth/Auth.js';
import {PrivateRoute} from 'components';
import {connect} from 'react-redux';
import {history} from 'helpers';

class App extends React.Component {
  constructor(props) {
    super(props);
    history.listen(() => {
      this.props.clearAlerts();
    });
  }

  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route path="/auth" render={props => <AuthLayout {...props} />} />
          <PrivateRoute path="/admin/" component={AdminLayout} />
          <Redirect from="*" to="/admin/homepage" />
        </Switch>
      </Router>
    );
  }
}

const actionCreators = {
  clearAlerts: alertActions.clear,
};

const connectedApp = connect(null, actionCreators)(App);
export {connectedApp as App};
