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
class MaterialsPage extends React.Component {
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
        .filter(o => o.type === 'material')
        .map((value, key) => {
          return {
            id: value.id,
            name: value.name,
            supplier: this.suppliers.find(o => o.id === value.supplier),
            stock: value.stock,
            country: value.country,
            actions: (
              <div className="actions-right">
                {/* use this button to add a edit kind of action */}
                <Button
                  onClick={() => {
                    let obj = this.data.find(o => o.id === value.id);
                    this.updateProductAlert(obj, 'add');
                  }}
                  color="warning"
                  size="sm"
                  className={classNames('btn-icon btn-link like', {
                    'btn-neutral': key < 5,
                  })}
                >
                  <i className="tim-icons icon-simple-add" />
                </Button>{' '}
                <Button
                  onClick={() => {
                    let obj = this.data.find(o => o.id === value.id);
                    this.updateProductAlert(obj, 'substract');
                  }}
                  color="warning"
                  size="sm"
                  className={classNames('btn-icon btn-link like', {
                    'btn-neutral': key < 5,
                  })}
                >
                  <i className="tim-icons icon-simple-delete" />
                </Button>{' '}
                <Button
                  onClick={() => {
                    let obj = this.data.find(o => o.id === value.id);
                    this.updateProductAlert(obj, 'update');
                  }}
                  color="warning"
                  size="sm"
                  className={classNames('btn-icon btn-link like', {
                    'btn-neutral': key < 5,
                  })}
                >
                  <i className="tim-icons icon-pencil" />
                </Button>{' '}
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
    await this.props.addProduct({
      ...data,
      supplier: data.supplier[0].value,
      type: 'material',
    });
    if (this.props.alert.type === 'alert-success') {
      this.notify(this.props.alert.message, 'success');
      this.props.getAll();
      this.setState({dataLoaded: false});
    } else {
      this.notify(this.props.alert.message, 'danger');
    }
  };

  updateProduct = async (data, product, action) => {
    this.hideAlert();
    const stock =
      action === 'add'
        ? parseInt(product.stock) + parseInt(data.stock)
        : action === 'substract'
        ? parseInt(product.stock) - parseInt(data.stock)
        : parseInt(data.stock);
    const supplier =
      action === 'update' ? data.supplier.value : product.supplier.id;
    const {actions, ...oldProduct} = product;
    const newProduct =
      action === 'update'
        ? {
            ...data,
            stock: stock,
            id: product.id,
            supplier: supplier,
            type: 'material',
          }
        : {...oldProduct, supplier: supplier, stock: stock};
    await this.props.updateProduct(newProduct);
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

  updateProductAlert = (product, action) => {
    const defaultValue = product.supplier;
    let formName, submitText;
    if (action === 'update') {
      formName = 'Ürün Güncelleme';
      submitText = 'Güncelleme';
    } else if (action === 'add') {
      formName = 'Stok Girişi';
      submitText = 'Ekle';
    } else if (action === 'substract') {
      formName = 'Stok Çıkışı';
      submitText = 'Çıkar';
    }
    const forms =
      action === 'add' || action === 'substract'
        ? [
            {
              label: 'Miktar*',
              name: 'stock',
              type: 'number',
              placeholder: 'Miktar',
              rules: {
                required: true,
              },
              defaultValue: 0,
            },
          ]
        : [
            {
              label: 'Hammadde adı*',
              name: 'name',
              type: 'input',
              placeholder: 'İsim',
              rules: {
                required: true,
              },
              defaultValue: product.name,
            },
            {
              label: 'Tedarikçi*',
              name: 'supplier',
              type: 'select',
              placeholder: 'Tedarikçi',
              rules: {
                required: true,
              },
              defaultValue: {
                value: defaultValue.id,
                label: defaultValue.name,
              },
              data: this.suppliers,
            },
            {
              label: 'Stok*',
              name: 'stock',
              type: 'number',
              placeholder: 'Stok',
              rules: {
                required: true,
              },
              defaultValue: product.stock,
            },
            {
              label: 'Menşei',
              name: 'country',
              type: 'input',
              placeholder: 'Menşei',
              rules: {
                required: false,
              },
              defaultValue: product.country,
            },
          ];
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
            name={formName}
            submitText={submitText}
            forms={forms}
            onCancel={this.hideAlert}
            onSubmit={data => this.updateProduct(data, product, action)}
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
            submitText="Ekle"
            forms={[
              {
                label: 'Hammadde Adı*',
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
                  required: true,
                },
                defaultValue: '',
                data: this.suppliers,
              },
              {
                label: 'Stok*',
                name: 'stock',
                type: 'number',
                placeholder: 'Stok',
                rules: {
                  required: true,
                },
                defaultValue: 0,
              },
              {
                label: 'Menşei',
                name: 'country',
                type: 'input',
                placeholder: 'Menşei',
                rules: {
                  required: false,
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
                  Hammaddeler
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
                      Header: 'Hammadde Adı',
                      accessor: 'name',
                    },
                    {
                      Header: 'TEDARİKÇİ',
                      accessor: 'supplier.name',
                    },
                    {
                      Header: 'Stok',
                      accessor: 'stock',
                    },
                    {
                      Header: 'MENŞEİ',
                      accessor: 'country',
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
  getAll: productActions.getAll,
  getSuppliers: supplierActions.getAll,
  addProduct: productActions.add,
  updateProduct: productActions.update,
  deleteProduct: productActions.delete,
};

const connectedProductsPage = connect(mapState, actionCreators)(MaterialsPage);
export {connectedProductsPage as MaterialsPage};
