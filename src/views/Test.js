import React from 'react';
import ReactTable from 'react-table';
import ReactBSAlert from 'react-bootstrap-sweetalert';
import NotificationAlert from 'react-notification-alert';
import BlockUi from 'react-block-ui';
import {Loader} from 'react-loaders';
import 'react-block-ui/style.css';
import 'loaders.css/loaders.min.css';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Row,
} from 'reactstrap';

class Test extends React.Component {
  constructor(props) {
    super(props);
    this.sortOptions = [{id: 'connected', desc: true}];
    this.data = [];
    this.state = {
      dataLoaded: false,
      alert: null,
      blocking: false,
      loaderType: 'ball-triangle-path',
      message: 'Loading, please wait',
    };
    this.notificationAlertRef = React.createRef();
  }

  componentDidUpdate() {
    if (this.props.settings.networks && !this.state.dataLoaded) {
      this.data = this.props.settings.networks.networks.map((value, key) => {
        return {
          id: key,
          connected: value.connected ? (
            <Button className="btn-round btn-icon dash-button" color="info">
              <i className="fas fa-check" />
            </Button>
          ) : (
            ''
          ),
          ssid: value.SSID,
          actions: value.connected ? (
            <Button
              color="danger"
              onClick={() =>
                this.warningWithConfirmAndCancelMessage(false, value)
              }
            >
              Disconnect
            </Button>
          ) : (
            <Button
              color="success"
              onClick={() =>
                this.warningWithConfirmAndCancelMessage(true, value)
              }
            >
              Connect
            </Button>
          ),
        };
      });
      this.setState({dataLoaded: true});
    }
  }

  hideAlert = () => {
    this.setState({
      alert: null,
    });
  };

  warningWithConfirmAndCancelMessage = (isConnect, network) => {
    if (isConnect) {
      this.setState({
        alert: (
          <ReactBSAlert
            input
            style={{display: 'block'}}
            title={
              'The Wi-Fi network ' +
              network.SSID +
              ' requires a WPA2 password. '
            }
            placeholder={'Password for ' + network.SSID}
            onConfirm={() => {}}
            onCancel={this.hideAlert}
            confirmBtnBsStyle="linkedin"
            cancelBtnBsStyle="danger"
            confirmBtnText="Connect!"
            cancelBtnText="Cancel"
            showCancel
            required={false}
            btnSize=""
          />
        ),
      });
    } else {
      this.setState({
        alert: (
          <ReactBSAlert
            danger
            style={{display: 'block'}}
            title={'Do you want to disconnect from ' + network.SSID + ' ?'}
            onConfirm={() => {}}
            onCancel={this.hideAlert}
            confirmBtnBsStyle="linkedin"
            cancelBtnBsStyle="danger"
            confirmBtnText="Disconnect!"
            cancelBtnText="Cancel"
            showCancel
            btnSize=""
          />
        ),
      });
    }
  };

  notify = (e, notType) => {
    var type = notType;
    var options = {};
    options = {
      place: 'tr',
      message: (
        <div>
          <div>{e}</div>
        </div>
      ),
      type: type,
      icon: 'tim-icons icon-alert-circle-exc',
      autoDismiss: 5,
    };
    this.notificationAlertRef.current.notificationAlert(options);
  };

  toggleBlocking = () => {
    this.setState({blocking: !this.state.blocking});
  };

  render() {
    return (
      <BlockUi
        className="block-ui"
        keepInView
        blocking={this.props.settings.loading || this.state.blocking}
        message={this.state.message}
        loader={<Loader active type={this.state.loaderType} color="#02a17c" />}
      >
        <div className="rna-container">
          <NotificationAlert ref={this.notificationAlertRef} />
        </div>
        {this.state.alert}
        <Row>
          <Col xs={12} md={12}>
            <Card style={{minHeight: '98vh', marginBottom: 0}}>
              <CardHeader>
                <CardTitle tag="h4" style={{textAlign: 'center'}}>
                  Network Connection
                  <Button
                    className="btn-round btn-icon float-right dash-button"
                    style={{
                      marginRight: '5px',
                      marginLeft: '0px',
                      fontSize: '0.8em',
                    }}
                    color="info"
                    onClick={this.scan}
                  >
                    <i className="fa fa-sync" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardBody>
                <ReactTable
                  sorted={this.sortOptions}
                  data={this.data}
                  resizable={false}
                  columns={[
                    {
                      Header: '',
                      accessor: 'connected',
                      filterable: false,
                      width: 40,
                    },
                    {
                      Header: 'SSID',
                      accessor: 'ssid',
                    },
                    {
                      Header: 'Actions',
                      accessor: 'actions',
                      sortable: false,
                      filterable: false,
                    },
                  ]}
                  showPaginationTop
                  showPaginationBottom={false}
                  filterable={true}
                  defaultPageSize={7}
                  className="-striped -highlight"
                  loading={false}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </BlockUi>
    );
  }
}

export default Test;
