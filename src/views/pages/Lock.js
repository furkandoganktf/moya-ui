import React from "react";
import classnames from "classnames";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Col
} from "reactstrap";

class Lock extends React.Component {
  state = {};
  componentDidMount() {
    document.body.classList.toggle("lock-page");
  }
  componentWillUnmount() {
    document.body.classList.toggle("lock-page");
  }
  render() {
    return (
      <>
        <div className="content">
          <Container>
            <Col className="ml-auto mr-auto" lg="4" md="6">
              <Card className="card-lock card-white text-center">
                <CardHeader>
                  <img alt="..." src={require("assets/img/emilyz.jpg")} />
                </CardHeader>
                <CardBody>
                  <CardTitle tag="h4">Joe Gardner</CardTitle>
                  <InputGroup
                    className={classnames({
                      "input-group-focus": this.state.passFocus
                    })}
                  >
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="tim-icons icon-key-25" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Password"
                      type="text"
                      onFocus={e => this.setState({ passFocus: true })}
                      onBlur={e => this.setState({ passFocus: false })}
                    />
                  </InputGroup>
                </CardBody>
                <CardFooter>
                  <Button
                    className="btn-round"
                    color="primary"
                    href="#pablo"
                    size="lg"
                    onClick={e => e.preventDefault()}
                  >
                    Unlock
                  </Button>
                </CardFooter>
              </Card>
            </Col>
          </Container>
        </div>
      </>
    );
  }
}

export default Lock;
