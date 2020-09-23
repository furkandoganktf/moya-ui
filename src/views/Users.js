import React from 'react';
import {connect} from 'react-redux';
import ReactTable from 'react-table';
import ReactBSAlert from 'react-bootstrap-sweetalert';
import NotificationAlert from 'react-notification-alert';
import BlockUi from 'react-block-ui';
import {Loader} from 'react-loaders';
import 'react-block-ui/style.css';
import 'loaders.css/loaders.min.css';
import classNames from 'classnames';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Row,
} from 'reactstrap';
import CustomForm from 'components/CustomForm';
import {userActions} from 'actions';

class UsersPage extends React.Component {
  constructor(props) {
    super(props);
    this.data = [];
    this.state = {
      dataLoaded: false,
      alert: null,
      loaderType: 'ball-triangle-path',
      message: 'Loading, please wait',
    };
    this.notificationAlertRef = React.createRef();
  }

  componentDidMount = async () => {
    await this.props.getAll();
  };

  componentDidUpdate() {
    if (this.props.users.items && !this.state.dataLoaded) {
      this.data = this.props.users.items.users.map((value, key) => {
        return {
          id: value.id,
          name: value.name,
          surname: value.surname,
          email: value.email,
          actions: (
            <div className="actions-right">
              {/* use this button to add a edit kind of action */}
              <Button
                onClick={() => {
                  let obj = this.data.find(o => o.id === value.id);
                  this.updateUserAlert(obj);
                }}
                color="warning"
                size="sm"
                className={classNames('btn-icon btn-link like', {
                  'btn-neutral': key < 5,
                })}
              >
                <i className="tim-icons icon-pencil" />
              </Button>{' '}
              {/* use this button to remove the data row */}
              <Button
                onClick={() => {
                  let obj = this.data.find(o => o.id === value.id);
                  this.deleteUserAlert(obj);
                }}
                color="danger"
                size="sm"
                className={classNames('btn-icon btn-link like', {
                  'btn-neutral': key < 5,
                })}
              >
                <i className="tim-icons icon-simple-remove" />
              </Button>{' '}
            </div>
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

  addUser = async data => {
    this.hideAlert();
    await this.props.addUser(data);
    if (this.props.alert.type === 'alert-success') {
      this.notify(this.props.alert.message, 'success');
      await this.props.getAll();
      this.setState({dataLoaded: false});
    } else {
      this.notify(this.props.alert.message, 'danger');
    }
  };

  updateUser = async (data, user) => {
    this.hideAlert();
    await this.props.updateUser({...data, id: user.id});
    if (this.props.alert.type === 'alert-success') {
      this.notify(this.props.alert.message, 'success');
      await this.props.getAll();
      this.setState({dataLoaded: false});
    } else {
      this.notify(this.props.alert.message, 'danger');
    }
  };

  deleteUser = async data => {
    this.hideAlert();
    await this.props.deleteUser(data);
    if (this.props.alert.type === 'alert-success') {
      this.notify(this.props.alert.message, 'success');
      await this.props.getAll();
      this.setState({dataLoaded: false});
    } else {
      this.notify(this.props.alert.message, 'danger');
    }
  };

  onError = (errors, e) => console.log('error', errors, e);

  deleteUserAlert = user => {
    this.setState({
      alert: (
        <ReactBSAlert
          danger
          onCancel={this.hideAlert}
          showCancel={true}
          onConfirm={() => this.deleteUser(user)}
          title={user.name + ' isimli kullanıcıyı silmek istiyor musunuz?'}
          confirmBtnText="Sil!"
          cancelBtnText="İptal"
          confirmBtnBsStyle="success"
          cancelBtnBsStyle="danger"
        />
      ),
    });
  };

  updateUserAlert = user => {
    this.setState({
      alert: (
        <ReactBSAlert
          style={{backgroundColor: 'none'}}
          onCancel={this.hideAlert}
          showConfirm={false}
          onConfirm={() => {}}
          title=""
        >
          <CustomForm
            name={'Kullanıcı Güncelleme'}
            submitText="Güncelle"
            forms={[
              {
                label: 'İsim*',
                name: 'name',
                type: 'input',
                placeholder: 'İsim',
                rules: {
                  required: true,
                },
                defaultValue: user.name,
              },
              {
                label: 'Soyisim*',
                name: 'surname',
                type: 'input',
                placeholder: 'Soyisim',
                rules: {
                  required: true,
                },
                defaultValue: user.surname,
              },
              {
                label: 'Email*',
                name: 'email',
                type: 'email',
                placeholder: 'Email',
                rules: {
                  required: true,
                },
                defaultValue: user.email,
              },
              {
                label: 'Şifre*',
                name: 'password',
                type: 'password',
                placeholder: 'Şifre',
                rules: {
                  required: true,
                  minLength: 5,
                },
                defaultValue: '',
              },
              {
                label: 'Şifre Tekrar*',
                name: 'password-repeat',
                type: 'password',
                placeholder: 'Şifre Tekrar',
                rules: {
                  required: true,
                  minLength: 5,
                },
                defaultValue: '',
              },
            ]}
            onCancel={this.hideAlert}
            onSubmit={data => this.updateUser(data, user)}
            onError={this.onError}
          />
        </ReactBSAlert>
      ),
    });
  };

  addUserAlert = () => {
    this.setState({
      alert: (
        <ReactBSAlert
          style={{backgroundColor: 'none'}}
          onCancel={this.hideAlert}
          showConfirm={false}
          onConfirm={() => {}}
          title=""
        >
          <CustomForm
            name={'Kayıt Formu'}
            submitText="Ekle"
            forms={[
              {
                label: 'İsim*',
                name: 'name',
                type: 'input',
                placeholder: 'İsim',
                rules: {
                  required: true,
                },
                defaultValue: '',
              },
              {
                label: 'Soyisim*',
                name: 'surname',
                type: 'input',
                placeholder: 'Soyisim',
                rules: {
                  required: true,
                },
                defaultValue: '',
              },
              {
                label: 'Email*',
                name: 'email',
                type: 'email',
                placeholder: 'Email',
                rules: {
                  required: true,
                },
                defaultValue: '',
              },
              {
                label: 'Şifre*',
                name: 'password',
                type: 'password',
                placeholder: 'Şifre',
                rules: {
                  required: true,
                  minLength: 5,
                },
                defaultValue: '',
              },
              {
                label: 'Şifre Tekrar*',
                name: 'password-repeat',
                type: 'password',
                placeholder: 'Şifre Tekrar',
                rules: {
                  required: true,
                  minLength: 5,
                },
                defaultValue: '',
              },
            ]}
            onCancel={this.hideAlert}
            onSubmit={this.addUser}
            onError={this.onError}
          />
        </ReactBSAlert>
      ),
    });
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
        blocking={!this.state.dataLoaded}
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
                <CardTitle tag="h1" style={{textAlign: 'center'}}>
                  Kullanıcılar
                </CardTitle>
                <Button
                  className="float-right"
                  color="success"
                  onClick={this.addUserAlert}
                >
                  Yeni Kullanıcı Ekle
                </Button>
              </CardHeader>
              <CardBody>
                <ReactTable
                  sorted={this.sortOptions}
                  data={this.data}
                  resizable={false}
                  columns={[
                    {
                      Header: 'Ad',
                      accessor: 'name',
                    },
                    {
                      Header: 'Soyad',
                      accessor: 'surname',
                    },
                    {
                      Header: 'Email',
                      accessor: 'email',
                    },
                    {
                      Header: 'İşlemler',
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
                  nextText="İleri"
                  previousText="Geri"
                  pageText="Sayfa"
                  rowsText="Satır"
                  noDataText="Data bulunamadı!"
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </BlockUi>
    );
  }
}

function mapState(state) {
  const {alert, users} = state;

  return {alert, users};
}

const actionCreators = {
  getAll: userActions.getAll,
  addUser: userActions.register,
  updateUser: userActions.update,
  deleteUser: userActions.delete,
};

const connectedUsersPage = connect(mapState, actionCreators)(UsersPage);
export {connectedUsersPage as UsersPage};
