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
import {productActions, supplierActions} from 'actions';

class BoxedProductsPage extends React.Component {
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
      this.props.products.items &&
      !this.state.dataLoaded
    ) {
      this.suppliers = this.props.suppliers.items.suppliers;
      this.data = this.props.products.items.products
        .filter(o => o.type === 'box')
        .map((value, key) => {
          return {
            id: value.id,
            name: value.name,
            country: value.stock,
            actions: (
              <div className="actions-right">
                {/* use this button to add a edit kind of action */}
                <Button
                  onClick={() => {
                    let obj = this.data.find(o => o.id === value.id);
                    this.updateProductAlert(obj);
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
                    this.deleteProductAlert(obj);
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

  addProduct = async data => {
    this.hideAlert();
    await this.props.addProduct({...data, type: 'box'});
    if (this.props.alert.type === 'alert-success') {
      this.notify(this.props.alert.message, 'success');
      this.props.getAll();
      this.setState({dataLoaded: false});
    } else {
      this.notify(this.props.alert.message, 'danger');
    }
  };

  updateProduct = async (data, product) => {
    this.hideAlert();
    await this.props.updateProduct({...data, id: product.id, type: 'box'});
    if (this.props.alert.type === 'alert-success') {
      this.notify(this.props.alert.message, 'success');
      this.props.getAll();
      this.setState({dataLoaded: false});
    } else {
      this.notify(this.props.alert.message, 'danger');
    }
  };

  deleteProduct = async data => {
    this.hideAlert();
    await this.props.deleteProduct(data);
    if (this.props.alert.type === 'alert-success') {
      this.notify(this.props.alert.message, 'success');
      this.props.getAll();
      this.setState({dataLoaded: false});
    } else {
      this.notify(this.props.alert.message, 'danger');
    }
  };

  onError = (errors, e) => console.log('error', errors, e);

  deleteProductAlert = product => {
    this.setState({
      alert: (
        <ReactBSAlert
          danger
          onCancel={this.hideAlert}
          showCancel={true}
          onConfirm={() => this.deleteProduct(product)}
          title={product.name + ' isimli ürünü silmek istiyor musunuz?'}
          confirmBtnText="Sil!"
          cancelBtnText="İptal"
          confirmBtnBsStyle="success"
          cancelBtnBsStyle="danger"
        />
      ),
    });
  };

  updateProductAlert = product => {
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
            name={'Ürün Güncelleme'}
            submitText="Güncelle"
            suppliers={this.suppliers}
            products={this.props.products.items.products}
            forms={[
              {
                label: 'Kutulu Ürün Adı*',
                name: 'name',
                type: 'input',
                placeholder: 'İsim',
                rules: {
                  required: true,
                },
                defaultValue: product.name,
              },
              {
                label: 'Stok*',
                name: 'stock',
                type: 'input',
                placeholder: 'Stok',
                rules: {
                  required: true,
                },
                defaultValue: product.country,
              },
            ]}
            onCancel={this.hideAlert}
            onSubmit={data => this.updateProduct(data, product)}
            onError={this.onError}
          />
        </ReactBSAlert>
      ),
    });
  };

  addProductAlert = () => {
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
            type="box"
            submitText="Ekle"
            suppliers={this.suppliers}
            products={this.props.products.items.products}
            forms={[
              {
                label: 'Kutulu Ürün Adı*',
                name: 'name',
                type: 'input',
                placeholder: 'İsim',
                rules: {
                  required: true,
                },
                defaultValue: '',
              },
              {
                label: 'Hammadde Sayısı*',
                name: 'materialCount',
                type: 'number',
                placeholder: 'Hammadde Sayısı',
                rules: {
                  required: true,
                },
                defaultValue: 0,
              },
              {
                label: 'Ambalaj Sayısı*',
                name: 'packageCount',
                type: 'number',
                placeholder: 'Ambalaj Sayısı',
                rules: {
                  required: true,
                },
                defaultValue: 0,
              },
              {
                label: 'Stok*',
                name: 'stock',
                type: 'input',
                placeholder: 'Stok',
                rules: {
                  required: true,
                },
                defaultValue: '',
              },
            ]}
            onCancel={this.hideAlert}
            onSubmit={this.addProduct}
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
                  Kutulu Ürünler
                </CardTitle>
                <Button
                  className="float-right"
                  color="success"
                  onClick={this.addProductAlert}
                >
                  Yeni Ürün Ekle
                </Button>
              </CardHeader>
              <CardBody>
                <ReactTable
                  sorted={this.sortOptions}
                  data={this.data}
                  resizable={false}
                  columns={[
                    {
                      Header: 'Kutulu Ürün Adı',
                      accessor: 'name',
                    },

                    {
                      Header: 'Stok',
                      accessor: 'stock',
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
  const {alert, products, suppliers} = state;

  return {alert, products, suppliers};
}

const actionCreators = {
  getSuppliers: supplierActions.getAll,
  getAll: productActions.getAll,
  addProduct: productActions.add,
  updateProduct: productActions.update,
  deleteProduct: productActions.delete,
};

const connectedProductsPage = connect(
  mapState,
  actionCreators,
)(BoxedProductsPage);
export {connectedProductsPage as BoxedProductsPage};
