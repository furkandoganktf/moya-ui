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
import {customerActions} from 'actions';

class CustomersPage extends React.Component {
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
    if (this.props.customers.items && !this.state.dataLoaded) {
      this.data = this.props.customers.items.customers.map((value, key) => {
        return {
          ...value,
          actions: (
            <div className="actions-right">
              {/* use this button to add a edit kind of action */}
              <Button
                onClick={() => {
                  let obj = this.data.find(o => o.id === value.id);
                  this.updateCustomerAlert(obj);
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
                  this.deleteCustomerAlert(obj);
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

  addCustomer = async data => {
    this.hideAlert();
    await this.props.addCustomer(data);
    if (this.props.alert.type === 'alert-success') {
      this.notify(this.props.alert.message, 'success');
      await this.props.getAll();
      this.setState({dataLoaded: false});
    } else {
      this.notify(this.props.alert.message, 'danger');
    }
  };

  updateCustomer = async (data, customer) => {
    this.hideAlert();
    await this.props.updateCustomer({...data, id: customer.id});
    if (this.props.alert.type === 'alert-success') {
      this.notify(this.props.alert.message, 'success');
      await this.props.getAll();
      this.setState({dataLoaded: false});
    } else {
      this.notify(this.props.alert.message, 'danger');
    }
  };

  deleteCustomer = async data => {
    this.hideAlert();
    await this.props.deleteCustomer(data);
    if (this.props.alert.type === 'alert-success') {
      this.notify(this.props.alert.message, 'success');
      await this.props.getAll();
      this.setState({dataLoaded: false});
    } else {
      this.notify(this.props.alert.message, 'danger');
    }
  };

  onError = (errors, e) => console.log('error', errors, e);

  deleteCustomerAlert = customer => {
    this.setState({
      alert: (
        <ReactBSAlert
          danger
          onCancel={this.hideAlert}
          showCancel={true}
          onConfirm={() => this.deleteCustomer(customer)}
          title={customer.name + ' isimli müşteriyi silmek istiyor musunuz?'}
          confirmBtnText="Sil!"
          cancelBtnText="İptal"
          confirmBtnBsStyle="success"
          cancelBtnBsStyle="danger"
        />
      ),
    });
  };

  updateCustomerAlert = customer => {
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
            name={'Müşteri Güncelleme'}
            submitText="Güncelle"
            forms={[
              {
                label: 'Firma Adı*',
                name: 'companyName',
                type: 'input',
                placeholder: 'Firma Adı',
                rules: {
                  required: true,
                },
                defaultValue: customer.companyName,
              },
              {
                label: 'İsim*',
                name: 'name',
                type: 'input',
                placeholder: 'İsim',
                rules: {
                  required: true,
                },
                defaultValue: customer.name,
              },
              {
                label: 'Soyisim*',
                name: 'surname',
                type: 'input',
                placeholder: 'Soyisim',
                rules: {
                  required: true,
                },
                defaultValue: customer.surname,
              },
              {
                label: 'İl*',
                name: 'province',
                type: 'input',
                placeholder: 'İl',
                rules: {
                  required: true,
                },
                defaultValue: customer.province,
              },
              {
                label: 'İlçe*',
                name: 'district',
                type: 'input',
                placeholder: 'İlçe',
                rules: {
                  required: true,
                },
                defaultValue: customer.district,
              },
              {
                label: 'Telefon*',
                name: 'phone',
                type: 'phone',
                placeholder: 'Telefon',
                rules: {
                  required: true,
                },
                defaultValue: customer.phone,
              },
              {
                label: 'Açık Adres',
                name: 'adress',
                type: 'input',
                placeholder: 'Adres',
                rules: {
                  required: false,
                },
                defaultValue: '',
              },
              {
                label: 'Notlar',
                name: 'notes',
                type: 'input',
                placeholder: 'Notlar',
                rules: {
                  required: false,
                },
                defaultValue: customer.notes,
              },
            ]}
            onCancel={this.hideAlert}
            onSubmit={data => this.updateCustomer(data, customer)}
            onError={this.onError}
          />
        </ReactBSAlert>
      ),
    });
  };

  addCustomerAlert = () => {
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
                label: 'Firma Adı*',
                name: 'companyName',
                type: 'input',
                placeholder: 'Firma Adı',
                rules: {
                  required: true,
                },
                defaultValue: '',
              },
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
                label: 'İl*',
                name: 'province',
                type: 'input',
                placeholder: 'İl',
                rules: {
                  required: true,
                },
                defaultValue: '',
              },
              {
                label: 'İlçe*',
                name: 'district',
                type: 'input',
                placeholder: 'İlçe',
                rules: {
                  required: true,
                },
                defaultValue: '',
              },
              {
                label: 'Telefon*',
                name: 'phone',
                type: 'phone',
                placeholder: 'Telefon',
                rules: {
                  required: true,
                },
                defaultValue: '',
              },
              {
                label: 'Açık Adres',
                name: 'adress',
                type: 'input',
                placeholder: 'Adres',
                rules: {
                  required: false,
                },
                defaultValue: '',
              },
              {
                label: 'Notlar',
                name: 'notes',
                type: 'input',
                placeholder: 'Notlar',
                rules: {
                  required: false,
                },
                defaultValue: '',
              },
            ]}
            onCancel={this.hideAlert}
            onSubmit={this.addCustomer}
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
                <CardTitle tag="h1" style={{textAlign: 'center',fontWeight:"bolder"}}>
                  Müşteriler
                </CardTitle>
                <Button
                  className="float-right"
                  color="success"
                  onClick={this.addCustomerAlert}
                  style={{fontSize: '1rem', fontWeight: 'bold'}}
                >
                  Yeni Müşteri Ekle
                </Button>
              </CardHeader>
              <CardBody>
                <ReactTable
                  sorted={this.sortOptions}
                  data={this.data}
                  resizable={false}
                  columns={[
                    {
                      Header: 'FİRMA ADI',
                      accessor: 'companyName',
                    },
                    {
                      Header: 'Ad',
                      accessor: 'name',
                    },
                    {
                      Header: 'Soyad',
                      accessor: 'surname',
                    },
                    {
                      Header: 'İL',
                      accessor: 'province',
                    },
                    {
                      Header: 'İLÇE',
                      accessor: 'district',
                    },
                    {
                      Header: 'Telefon',
                      accessor: 'phone',
                    },
                    {
                      Header: 'Notlar',
                      accessor: 'notes',
                      sortable: false,
                      filterable: false,
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
  const {alert, customers} = state;

  return {alert, customers};
}

const actionCreators = {
  getAll: customerActions.getAll,
  addCustomer: customerActions.add,
  updateCustomer: customerActions.update,
  deleteCustomer: customerActions.delete,
};

const connectedCustomersPage = connect(mapState, actionCreators)(CustomersPage);
export {connectedCustomersPage as CustomersPage};
