import React from 'react';
import {connect} from 'react-redux';
import {userActions} from 'actions';

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Col,
} from 'reactstrap';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    this.props.logout();

    this.state = {
      username: '',
      password: '',
      submitted: false,
    };
  }

  componentDidMount() {
    document.body.classList.toggle('login-page');
  }

  componentWillUnmount() {
    document.body.classList.toggle('login-page');
  }

  handleChange = e => {
    const {name, value} = e.target;
    this.setState({[name]: value});
  };

  handleSubmit = e => {
    e.preventDefault();

    this.setState({submitted: true});
    const {username, password} = this.state;
    if (username && password) {
      this.props.login(username, password);
    }
  };

  render() {
    const {username, password, submitted} = this.state;
    const {alert} = this.props;
    return (
      <>
        <div className="content">
          <Container>
            <Col className="ml-auto mr-auto" lg="4" md="6">
              <Form className="form" onSubmit={e => this.handleSubmit(e)}>
                <Card className="card-login card-white">
                  <CardHeader>
                    <img
                      alt="..."
                      // eslint-disable-next-line no-undef
                      src={require('assets/img/card-primary.png')}
                    />
                    <CardTitle tag="h1">Log in</CardTitle>
                  </CardHeader>
                  <CardBody>
                    {alert.message && (
                      <div className={`alert ${alert.type}`}>
                        {String(alert.message)}
                      </div>
                    )}
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="tim-icons icon-email-85" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Kullanıcı Adı"
                        type="username"
                        name="username"
                        onChange={this.handleChange}
                      />
                    </InputGroup>
                    {submitted && !username && (
                      <label className="error" style={{color: 'red'}}>
                        Kullanıcı Adı zorunludur.
                      </label>
                    )}
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="tim-icons icon-lock-circle" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Şifre"
                        type="password"
                        name="password"
                        onChange={this.handleChange}
                      />
                    </InputGroup>
                    {submitted && !password && (
                      <label className="error" style={{color: 'red'}}>
                        Şifre zorunludur.
                      </label>
                    )}
                  </CardBody>
                  <CardFooter>
                    <Button
                      block
                      className="mb-3"
                      color="primary"
                      size="lg"
                      type="submit"
                      name="submit_button"
                    >
                      Giriş
                    </Button>
                  </CardFooter>
                </Card>
              </Form>
            </Col>
          </Container>
        </div>
      </>
    );
  }
}

function mapState(state) {
  const {alert} = state;

  return {alert};
}

const actionCreators = {
  login: userActions.login,
  logout: userActions.logout,
};

const connectedLoginPage = connect(mapState, actionCreators)(LoginPage);
export {connectedLoginPage as LoginPage};
