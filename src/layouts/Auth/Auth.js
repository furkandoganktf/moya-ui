import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Footer from 'components/Footer/Footer.js';
import routes from 'routes.js';

class AuthLayout extends React.Component {
  getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.collapse) {
        return this.getRoutes(prop.views);
      }
      if (prop.layout === '/auth') {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  getActiveRoute = routes => {
    let activeRoute = 'moya';
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse) {
        let collapseActiveRoute = this.getActiveRoute(routes[i].views);
        if (collapseActiveRoute !== activeRoute) {
          return collapseActiveRoute;
        }
      } else {
        if (
          window.location.pathname.indexOf(
            routes[i].layout + routes[i].path,
          ) !== -1
        ) {
          return routes[i].name;
        }
      }
    }
    return activeRoute;
  };
  getFullPageName = routes => {
    let pageName = this.getActiveRoute(routes);
    switch (pageName) {
      case 'Login':
        return 'login-page';
      case 'Register':
        return 'register-page';
      default:
        return 'moya';
    }
  };
  componentDidMount() {
    document.documentElement.classList.remove('nav-open');
    localStorage.removeItem('user');
  }
  render() {
    return (
      <>
        <div className="wrapper wrapper-full-page">
          <div className={'full-page ' + this.getFullPageName(routes)}>
            <Switch>{this.getRoutes(routes)}</Switch>
            <Footer fluid />
          </div>
        </div>
      </>
    );
  }
}

export default AuthLayout;
