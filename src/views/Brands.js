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
import {brandActions, supplierActions} from 'actions';

class BrandsPage extends React.Component {
  constructor(props) {
    super(props);
    this.data = [];
    this.suppliers = [];
    this.state = {
      dataLoaded: false,
      alert: null,
      loaderType: 'ball-triangle-path',
      message: 'Loading, please wait',
    };
    this.notificationAlertRef = React.createRef();
  }

  componentDidMount = async () => {
    await this.props.getSuppliers();
    await this.props.getAll();
  };

  componentDidUpdate() {
    if (
      this.props.suppliers.items &&
      this.props.brands.items &&
      !this.state.dataLoaded
    ) {
      this.suppliers = this.props.suppliers.items.suppliers;
      this.data = this.props.brands.items.brands.map((value, key) => {
        return {
          id: value.id,
          name: value.name,
          supplier: this.suppliers.find(o => o.id === value.supplier),
          actions: (
            <div className="actions-right">
              {/* use this button to add a edit kind of action */}
              <Button
                onClick={() => {
                  let obj = this.data.find(o => o.id === value.id);
                  this.updateBrandAlert(obj);
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
                  this.deleteBrandAlert(obj);
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

  addBrand = async data => {
    this.hideAlert();
    await this.props.addBrand({
      ...data,
      supplier: data.supplier.value,
    });
    if (this.props.alert.type === 'alert-success') {
      this.notify(this.props.alert.message, 'success');
      await this.props.getAll();
      this.setState({dataLoaded: false});
    } else {
      this.notify(this.props.alert.message, 'danger');
    }
  };

  updateBrand = async (data, brand) => {
    this.hideAlert();
    await this.props.updateBrand({
      ...data,
      supplier: data.supplier.value,
      id: brand.id,
    });
    if (this.props.alert.type === 'alert-success') {
      this.notify(this.props.alert.message, 'success');
      await this.props.getAll();
      this.setState({dataLoaded: false});
    } else {
      this.notify(this.props.alert.message, 'danger');
    }
  };

  deleteBrand = async data => {
    this.hideAlert();
    await this.props.deleteBrand(data);
    if (this.props.alert.type === 'alert-success') {
      this.notify(this.props.alert.message, 'success');
      await this.props.getAll();
      this.setState({dataLoaded: false});
    } else {
      this.notify(this.props.alert.message, 'danger');
    }
  };

  onError = (errors, e) => console.log('error', errors, e);

  deleteBrandAlert = brand => {
    this.setState({
      alert: (
        <ReactBSAlert
          danger
          onCancel={this.hideAlert}
          showCancel={true}
          onConfirm={() => this.deleteBrand(brand)}
          title={brand.name + ' isimli markayı silmek istiyor musunuz?'}
          confirmBtnText="Sil!"
          cancelBtnText="İptal"
          confirmBtnBsStyle="success"
          cancelBtnBsStyle="danger"
        />
      ),
    });
  };

  updateBrandAlert = brand => {
    const defaultValue = brand.supplier;
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
            name={'Marka Güncelleme'}
            submitText="Güncelle"
            type = "update"
            forms={[
              {
                label: 'Marka adı*',
                name: 'name',
                type: 'input',
                placeholder: 'İsim',
                rules: {
                  required: true,
                },
                defaultValue: brand.name,
              },
              {
                label: 'Tedarikçi*',
                name: 'supplier',
                type: 'select',
                placeholder: 'Tedarikçi',
                rules: {
                  required: false,
                },
                defaultValue: {
                  value: defaultValue.id,
                  label: defaultValue.name,
                },
                data: this.suppliers,
              },
            ]}
            onCancel={this.hideAlert}
            onSubmit={data => this.updateBrand(data, brand)}
            onError={this.onError}
          />
        </ReactBSAlert>
      ),
    });
  };

  addBrandAlert = () => {
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
            type = "add"
            forms={[
              {
                label: 'Marka Adı*',
                name: 'name',
                type: 'input',
                placeholder: 'İsim',
                rules: {
                  required: true,
                },
                defaultValue: '',
              },
              {
                label: 'Tedarikçi*',
                name: 'supplier',
                type: 'select',
                placeholder: 'Tedarikçi',
                rules: {
                  required: false,
                },
                defaultValue: '',
                data: this.suppliers,
              },
            ]}
            onCancel={this.hideAlert}
            onSubmit={this.addBrand}
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
                  Markalar
                </CardTitle>
                <Button
                  className="float-right"
                  color="success"
                  onClick={this.addBrandAlert}
                >
                  Yeni Marka Ekle
                </Button>
              </CardHeader>
              <CardBody>
                <ReactTable
                  sorted={this.sortOptions}
                  data={this.data}
                  resizable={false}
                  columns={[
                    {
                      Header: 'MARKA Adı',
                      accessor: 'name',
                    },
                    {
                      Header: 'TEDARİKÇİ',
                      accessor: 'supplier.name',
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
  const {alert, brands, suppliers} = state;

  return {alert, brands, suppliers};
}

const actionCreators = {
  getSuppliers: supplierActions.getAll,
  getAll: brandActions.getAll,
  addBrand: brandActions.add,
  updateBrand: brandActions.update,
  deleteBrand: brandActions.delete,
};

const connectedBrandsPage = connect(mapState, actionCreators)(BrandsPage);
export {connectedBrandsPage as BrandsPage};
