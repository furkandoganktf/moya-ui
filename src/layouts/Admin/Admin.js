import React from 'react';
import {Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import PerfectScrollbar from 'perfect-scrollbar';
import Sidebar from 'components/Sidebar/Sidebar';
import routes from 'routes.js';
import {Row, Col, Button, UncontrolledTooltip} from 'reactstrap';
import {userActions} from 'actions';
import classNames from 'classnames';
var ps;

class AdminLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeColor: 'blue',
      sidebarMini: true,
      opacity: 0,
      sidebarOpened: false,
    };
    this.mainPanelRef = React.createRef();
  }
  componentDidMount() {
    if (navigator.platform.indexOf('Win') > -1) {
      document.documentElement.className += ' perfect-scrollbar-on';
      document.documentElement.classList.remove('perfect-scrollbar-off');
      ps = new PerfectScrollbar(this.mainPanelRef.current);
      let tables = document.querySelectorAll('.table-responsive');
      for (let i = 0; i < tables.length; i++) {
        ps = new PerfectScrollbar(tables[i]);
      }
    }
    window.addEventListener('scroll', this.showNavbarButton);
    window.addEventListener('beforeunload', this.componentGracefulUnmount);
  }
  componentWillUnmount() {
    if (navigator.platform.indexOf('Win') > -1) {
      ps.destroy();
      document.documentElement.className += ' perfect-scrollbar-off';
      document.documentElement.classList.remove('perfect-scrollbar-on');
    }
    window.removeEventListener('scroll', this.showNavbarButton);
    this.componentGracefulUnmount();
  }

  componentGracefulUnmount = () => {
    window.removeEventListener('beforeunload', this.componentGracefulUnmount);
  };

  componentDidUpdate(e) {
    if (e.location.pathname !== e.history.location.pathname) {
      if (navigator.platform.indexOf('Win') > -1) {
        let tables = document.querySelectorAll('.table-responsive');
        for (let i = 0; i < tables.length; i++) {
          ps = new PerfectScrollbar(tables[i]);
        }
      }
      document.documentElement.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
      this.mainPanelRef.current.scrollTop = 0;
    }
  }

  showNavbarButton = () => {
    if (
      document.documentElement.scrollTop > 50 ||
      document.scrollingElement.scrollTop > 50 ||
      this.mainPanelRef.current.scrollTop > 50
    ) {
      this.setState({opacity: 1});
    } else if (
      document.documentElement.scrollTop <= 50 ||
      document.scrollingElement.scrollTop <= 50 ||
      this.mainPanelRef.current.scrollTop <= 50
    ) {
      this.setState({opacity: 0});
    }
  };
  getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.collapse) {
        return this.getRoutes(prop.views);
      }
      if (prop.layout === '/admin') {
        return (
          <Route
            path={prop.layout + prop.path}
            // component={prop.component}
            key={key}
            render={props => (
              <prop.component
                {...props}
                logout={this.props.logout}
                authInfo={this.props.authentication}
              />
            )}
          />
        );
      } else {
        return null;
      }
    });
  };

  toggleSidebar = () => {
    this.setState({
      sidebarOpened: !this.state.sidebarOpened,
    });
    document.documentElement.classList.toggle('nav-open');
  };

  closeSidebar = () => {
    this.setState({
      sidebarOpened: false,
    });
    document.documentElement.classList.remove('nav-open');
  };

  isSidebar = () => {
    return (
      <>
        <Sidebar
          {...this.props}
          routes={routes}
          activeColor={this.state.activeColor}
          // logo={{
          //   outterLink: 'https://www.neurocess.co/',
          //   text: 'Neurocess',
          //   imgSrc: neurocess,
          // }}
          closeSidebar={this.closeSidebar}
        />
        <Col sm={1} className="navbar-responsive">
          <div className="navbar-minimize-fixed" style={{opacity: 1}}>
            <Button
              className="minimize-sidebar btn btn-just-icon"
              color="link"
              id="tooltip209599"
              onClick={this.handleMiniClick}
              style={{color: 'white'}}
            >
              <i className="tim-icons icon-align-center visible-on-sidebar-regular" />
              <i className="tim-icons icon-bullet-list-67 visible-on-sidebar-mini" />
            </Button>
            <UncontrolledTooltip
              delay={0}
              target="tooltip209599"
              placement="right"
            >
              Sidebar toggle
            </UncontrolledTooltip>
          </div>
        </Col>
        <Col xl="11" lg="12" sm="12" style={{paddingLeft: 0}}>
          <div
            className="main-panel"
            ref={this.mainPanelRef}
            data={this.state.activeColor}
          >
            <div className="navbar-absolute navbar-transparent navbar navbar-expand-lg">
              <div className="navbar-wrapper">
                <div
                  className={classNames('navbar-toggle d-inline', {
                    toggled: this.state.sidebarOpened,
                  })}
                >
                  <button
                    className="navbar-toggler"
                    type="button"
                    onClick={this.handleMiniClick}
                  >
                    <span className="navbar-toggler-bar bar1" />
                    <span className="navbar-toggler-bar bar2" />
                    <span className="navbar-toggler-bar bar3" />
                  </button>
                </div>
              </div>
            </div>
            <Switch>{this.getRoutes(routes)}</Switch>
          </div>
        </Col>{' '}
      </>
    );
  };

  render() {
    return (
      <div className="wrapper">
        <Row>{this.isSidebar()}</Row>
      </div>
    );
  }
}

function mapState(state) {
  const {authentication} = state;

  return {authentication};
}

const actionCreators = {
  logout: userActions.logout,
};

const connectedLoginPage = connect(mapState, actionCreators)(AdminLayout);
export {connectedLoginPage as AdminLayout};
