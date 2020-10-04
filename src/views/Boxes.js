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
import {
  productActions,
  supplierActions,
  brandActions,
  customerActions,
} from 'actions';
import {stockUpdate} from 'services/productService';

class BoxedProductsPage extends React.Component {
  constructor(props) {
    super(props);
    this.data = [];
    this.suppliers = [];
    this.brands = [];
    this.customers = [];
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
    await this.props.getBrands();
    await this.props.getCustomers();
    await this.props.getAll();
  };

  componentDidUpdate() {
    if (
      this.props.customers.items &&
      this.props.brands.items &&
      this.props.suppliers.items &&
      this.props.products.items &&
      !this.state.dataLoaded
    ) {
      this.customers = this.props.customers.items.customers;
      this.suppliers = this.props.suppliers.items.suppliers;
      this.brands = this.props.brands.items.brands;
      this.data = this.props.products.items.products
        .filter(o => o.type === 'box')
        .map((value, key) => {
          return {
            id: value.id,
            name: value.name,
            supplier: this.suppliers.find(o => o.id === value.supplier),
            brand: this.brands.find(o => o.id === value.brand),
            stock: value.stock,
            materialCount: value.materialCount,
            packageCount: value.packageCount,
            content: value.content,
            threshold: value.threshold,
            actions: (
              <div className="actions-right">
                {/* use this button to add a edit kind of action */}
                <Button
                  onClick={() => {
                    let obj = this.data.find(o => o.id === value.id);
                    this.updateProductAlert(obj, 'box');
                  }}
                  color="warning"
                  size="sm"
                  className={classNames('btn-icon btn-link like', {
                    'btn-neutral': key < 5,
                  })}
                >
                  <i className="tim-icons icon-app" />
                </Button>{' '}
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
    let content = {};
    for (let index = 1; index <= data.materialCount; index++) {
      content[data['material_' + index].value] =
        data['material_' + index + '_count'];
    }
    for (let index = 1; index <= data.packageCount; index++) {
      content[data['package_' + index].value] =
        data['package_' + index + '_count'];
    }
    let boxed_product = {
      name: data.name,
      supplier: data.supplier.value,
      brand: data.brand.value,
      stock: parseInt(data.stock),
      materialCount: parseInt(data.materialCount),
      packageCount: parseInt(data.packageCount),
      threshold: data.threshold,
      content: content,
    };
    await this.props.addProduct({...boxed_product, type: 'box'});
    if (this.props.alert.type === 'alert-success') {
      this.notify(this.props.alert.message, 'success');
      await this.props.getAll();
      this.setState({dataLoaded: false});
    } else {
      this.notify(this.props.alert.message, 'danger');
    }
  };
  updateProduct = async (data, product, action) => {
    this.hideAlert();
    let stock = 0;
    if (action === 'box') {
      await this.props.packageProduct({
        id: product.id,
        amount: parseInt(data.stock),
      });
      stock = parseInt(product.stock) + parseInt(data.stock);
    } else {
      stock =
        action === 'add'
          ? parseInt(product.stock) + parseInt(data.stock)
          : action === 'substract'
          ? parseInt(product.stock) - parseInt(data.stock)
          : parseInt(data.stock);
      const supplier =
        action === 'update' ? data.supplier.value : product.supplier.id;
      const brand = action === 'update' ? data.brand.value : product.brand.id;
      const {actions, ...oldProduct} = product;
      let content = {};
      for (let index = 1; index <= data.materialCount; index++) {
        content[data['material_' + index].value] =
          data['material_' + index + '_count'];
      }
      for (let index = 1; index <= data.packageCount; index++) {
        content[data['package_' + index].value] =
          data['package_' + index + '_count'];
      }
      let boxed_product = {
        name: data.name,
        supplier: supplier,
        brand: brand,
        materialCount: parseInt(data.materialCount),
        packageCount: parseInt(data.packageCount),
        content: content,
        threshold: data.threshold,
      };
      const newProduct =
        action === 'update'
          ? {
              ...boxed_product,
              id: product.id,
              stock: stock,
              type: 'box',
            }
          : {...oldProduct, supplier: supplier, brand: brand, stock: stock};
      await this.props.updateProduct(newProduct);
    }
    if (this.props.alert.type === 'alert-success') {
      if (action === 'add' || action === 'substract' || action === 'box') {
        if (stock !== product.stock) {
          await stockUpdate({
            productId: product.id,
            productName: product.name,
            supplierName: product.supplierName,
            brandName: product.brandName,
            type: action,
            productType: 'box',
            oldStock: product.stock,
            newStock: stock,
            customer: data.customer?.value,
          });
        }
      }
      this.notify(this.props.alert.message, 'success');
      await this.props.getAll();
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
      await this.props.getAll();
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
    const defaultSupplierValue = product.supplier;
    const defaultBrandValue = product.brand;
    let materials = [];
    let packages = [];
    for (let [key, value] of Object.entries(product.content)) {
      let item = this.props.products.items.products.find(o => o.id === key);
      if (item.type === 'material') {
        materials.push({
          item: {value: item.id, label: item.name},
          stock: value,
        });
      } else if (item.type === 'package') {
        packages.push({
          item: {value: item.id, label: item.name},
          stock: value,
        });
      }
    }
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
    } else if (action === 'box') {
      formName = 'Ürün Paketleme';
      submitText = 'Paketle';
    }
    const forms =
      action === 'substract'
        ? [
            {
              label: 'Miktar*',
              name: 'stock',
              type: 'number',
              placeholder: 'Miktar',
              rules: {
                required: true,
                min: 0,
              },
              defaultValue: 0,
            },
            {
              label: 'Müşteri*',
              name: 'customer',
              type: 'select',
              placeholder: 'Müşteri',
              rules: {
                required: true,
              },
              defaultValue: '',
              data: this.customers,
            },
          ]
        : action === 'add' || action === 'box'
        ? [
            {
              label: 'Miktar*',
              name: 'stock',
              type: 'number',
              placeholder: 'Miktar',
              rules: {
                required: true,
                min: 0,
              },
              defaultValue: 0,
            },
          ]
        : [
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
              label: 'Tedarikçi*',
              name: 'supplier',
              type: 'select',
              placeholder: 'Tedarikçi',
              rules: {
                required: true,
              },
              defaultValue: defaultSupplierValue,
              data: this.suppliers,
            },
            {
              label: 'Marka*',
              name: 'brand',
              type: 'select',
              placeholder: 'Marka',
              rules: {
                required: true,
              },
              defaultValue: defaultBrandValue,
              data: this.brands,
            },
            {
              label: 'Hammadde Sayısı*',
              name: 'materialCount',
              type: 'number',
              placeholder: 'Hammadde Sayısı',
              rules: {
                required: true,
                min: 0,
              },
              defaultValue: product.materialCount,
            },
            {
              label: 'Ambalaj Sayısı*',
              name: 'packageCount',
              type: 'number',
              placeholder: 'Ambalaj Sayısı',
              rules: {
                required: true,
                min: 0,
              },
              defaultValue: product.packageCount,
            },
            {
              label: 'Stok*',
              name: 'stock',
              type: 'input',
              placeholder: 'Stok',
              rules: {
                required: true,
                min: 0,
              },
              defaultValue: product.stock,
            },
            {
              label: 'Email Sınırı*',
              name: 'threshold',
              type: 'number',
              placeholder: 'Email Sınırı',
              rules: {
                required: true,
                min: 0,
              },
              defaultValue: product.threshold,
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
            type="update"
            spec="box"
            forms={forms}
            suppliers={this.suppliers}
            materials={materials}
            packages={packages}
            products={this.props.products.items.products}
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
            spec="box"
            submitText="Ekle"
            type="add"
            suppliers={this.suppliers}
            materials={[]}
            packages={[]}
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
                label: 'Marka*',
                name: 'brand',
                type: 'select',
                placeholder: 'Marka',
                rules: {
                  required: true,
                },
                defaultValue: '',
                data: this.brands,
              },
              {
                label: 'Hammadde Sayısı*',
                name: 'materialCount',
                type: 'number',
                placeholder: 'Hammadde Sayısı',
                rules: {
                  required: true,
                  min: 0,
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
                  min: 0,
                },
                defaultValue: '',
              },
              {
                label: 'Email Sınırı*',
                name: 'threshold',
                type: 'number',
                placeholder: 'Email Sınırı',
                rules: {
                  required: true,
                  min: 0,
                },
                defaultValue: 0,
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
                      Header: 'TEDARİKÇİ',
                      accessor: 'supplier.name',
                    },
                    {
                      Header: 'Marka',
                      accessor: 'brand.name',
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
  const {alert, products, suppliers, brands, customers} = state;

  return {alert, products, suppliers, brands, customers};
}

const actionCreators = {
  getSuppliers: supplierActions.getAll,
  getBrands: brandActions.getAll,
  getCustomers: customerActions.getAll,
  getAll: productActions.getAll,
  packageProduct: productActions.packageProduct,
  addProduct: productActions.add,
  updateProduct: productActions.update,
  deleteProduct: productActions.delete,
};

const connectedProductsPage = connect(
  mapState,
  actionCreators,
)(BoxedProductsPage);
export {connectedProductsPage as BoxedProductsPage};
