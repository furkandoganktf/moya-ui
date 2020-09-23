import React from 'react';
import {connect} from 'react-redux';
import ReactTable from 'react-table';
import NotificationAlert from 'react-notification-alert';
import BlockUi from 'react-block-ui';
import {Loader} from 'react-loaders';
import 'react-block-ui/style.css';
import 'loaders.css/loaders.min.css';
import {Card, CardBody, CardHeader, CardTitle, Col, Row} from 'reactstrap';
import {getStockLogs} from 'services/userService';
import {
  productActions,
  supplierActions,
  brandActions,
  customerActions,
} from 'actions';

class StockLogs extends React.Component {
  constructor(props) {
    super(props);
    this.data = [];
    this.products = [];
    this.suppliers = [];
    this.customers = [];
    this.state = {
      alert: null,
      dataLoaded: false,
      loaderType: 'ball-triangle-path',
      message: 'Loading, please wait',
    };
  }

  componentDidMount = async () => {
    const data = await getStockLogs();
    this.data = data.logs;
    await this.props.getSuppliers();
    await this.props.getBrands();
    await this.props.getCustomers();
    await this.props.getProducts();
  };

  componentDidUpdate() {
    if (
      this.props.customers.items &&
      this.props.brands.items &&
      this.props.suppliers.items &&
      this.props.products.items &&
      this.data !== [] &&
      !this.state.dataLoaded
    ) {
      this.customers = this.props.customers.items.customers;
      this.suppliers = this.props.suppliers.items.suppliers;
      this.brands = this.props.brands.items.brands;
      this.products = this.props.products.items.products;
      this.data = this.data.map(value => {
        let product = this.products.find(o => o.id === value.productId);
        return {
          id: value.id,
          oldStock: value.oldStock,
          newStock: value.newStock,
          customer: this.customers.find(o => o.id === value.customer),
          brand: this.brands.find(o => o.id === product.brand),
          supplier: this.brands.find(o => o.id === product.supplier),
          name: product.name,
          type: value.type,
          date: value.date,
          timeStamp: value.timeStamp,
        };
      });
      this.setState({
        dataLoaded: true,
      });
    }
  }
  render() {
    return (
      <BlockUi
        className="block-ui"
        keepInView
        blocking={!this.state.dataLoaded}
        renderChildren={false}
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
                  Stok Giriş/Çıkış
                </CardTitle>
              </CardHeader>
              <CardBody>
                <ReactTable
                  sorted={[{id: 'date', desc: true}]}
                  data={this.data}
                  resizable={false}
                  columns={[
                    {
                      Header: 'Tür',
                      accessor: 'type',
                    },
                    {
                      Header: 'Ürün Adı',
                      accessor: 'name',
                    },
                    {
                      Header: 'Tedarikçi',
                      accessor: 'supplier.name',
                    },
                    {
                      Header: 'Marka',
                      accessor: 'brand.name',
                    },
                    {
                      Header: 'Müşteri',
                      accessor: 'customer.name',
                    },
                    {
                      Header: 'ESKİ Stok',
                      accessor: 'oldStock',
                    },
                    {
                      Header: 'YENİ Stok',
                      accessor: 'newStock',
                    },
                    {
                      Header: 'TARİH',
                      accessor: 'date',
                    },
                    {
                      Header: ' ',
                      accessor: ' ',
                      width: 0,
                    },
                  ]}
                  showPaginationTop
                  showPaginationBottom={false}
                  filterable={true}
                  defaultPageSize={10}
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
  getProducts: productActions.getAll,
};

const connectedProductsPage = connect(mapState, actionCreators)(StockLogs);
export {connectedProductsPage as StockLogs};
