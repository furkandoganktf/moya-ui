/*eslint-disable*/
import React from 'react';
import {Container} from 'reactstrap';
import PropTypes from 'prop-types';

class Footer extends React.Component {
  render() {
    return (
      <footer
        className={'footer' + (this.props.default ? ' footer-default' : '')}
      >
        <Container fluid={this.props.fluid ? true : false}>
          <div className="copyright">
            © {new Date().getFullYear()} made with{' '}
            <i className="tim-icons icon-heart-2" /> by{' '}
            <a href="https://furkandoganktf.github.io" target="_blank">
              FD
            </a>{' '}
            for a better organization.
          </div>
        </Container>
      </footer>
    );
  }
}

Footer.propTypes = {
  default: PropTypes.bool,
  fluid: PropTypes.bool,
};

export default Footer;
