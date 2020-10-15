import React from 'react';
import {connect} from 'react-redux';
import ReactTable from 'react-table';
import NotificationAlert from 'react-notification-alert';
import ReactBSAlert from 'react-bootstrap-sweetalert';
import BlockUi from 'react-block-ui';
import {Loader} from 'react-loaders';
import 'react-block-ui/style.css';
import 'loaders.css/loaders.min.css';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Col,
  Row,
} from 'reactstrap';
import {getStockLogs} from 'services/userService';
import {
  productActions,
  supplierActions,
  brandActions,
  customerActions,
} from 'actions';
import Select from 'react-select';

class StockLogs extends React.Component {
  constructor(props) {
    super(props);
    this.data = [];
    this.products = [];
    this.suppliers = [];
    this.customers = [];
    this.startYear = 2020;
    this.currentYear = new Date().getFullYear();
    this.yearOptions = [
      ...Array(this.currentYear - this.startYear + 1).keys(),
    ].map(i => i + this.startYear);
    this.monthOptions = Array.from({length: 12}, (e, i) => {
      return new Date(null, i + 1, null).toLocaleDateString('tr', {
        month: 'long',
      });
    });
    this.typeOptions = [
      {value: 'box', label: 'Kutulu Ürün'},
      {value: 'material', label: 'Hammadde'},
      {value: 'package', label: 'Ambalaj'},
    ];
    this.state = {
      alert: null,
      dataLoaded: false,
      loaderType: 'ball-triangle-path',
      message: 'Loading, please wait',
      selectedYear: null,
      selectedMonth: null,
      selectedType: null,
    };
    this.notificationAlertRef = React.createRef();
  }

  componentDidMount = async () => {
    const data = await getStockLogs();
    this.data = data.logs;
    await this.props.getSuppliers();
    await this.props.getBrands();
    await this.props.getCustomers();
    await this.props.getProducts();
  };

  hideAlert = () => {
    this.setState({
      alert: null,
    });
  };

  onYearSelect = value => {
    this.setState({selectedYear: value});
  };

  onMonthSelect = value => {
    this.setState({selectedMonth: value});
  };

  onTypeSelect = value => {
    console.log(value);
    this.setState({selectedType: value});
  };

  createReport = () => {
    if (
      this.state.selectedMonth &&
      this.state.selectedYear &&
      this.state.selectedType
    ) {
      let startDate = new Date(
        this.state.selectedYear.value,
        this.state.selectedMonth.value,
      ).getTime();
      let endDate;
      if (this.state.selectedMonth.value === 11) {
        endDate = new Date(this.state.selectedYear.value + 1, 0).getTime();
      } else {
        endDate = new Date(
          this.state.selectedYear.value,
          this.state.selectedMonth.value + 1,
        ).getTime();
      }
      let reportData = this.data.filter(
        e =>
          e.timeStamp >= startDate &&
          e.timeStamp <= endDate &&
          e.productType === this.state.selectedType.label,
      );
      reportData.sort((a, b) =>
        a.timeStamp > b.timeStamp ? 1 : b.timeStamp > a.timeStamp ? -1 : 0,
      );
      reportData = reportData.map(e => {
        return [
          e.type,
          e.name,
          e.customer?.name,
          e.brandName,
          e.supplierName,
          e.oldStock,
          e.newStock,
          e.date,
        ];
      });
      reportData.splice(0, 0, [
        'Tür',
        'Ürün Adı',
        'Müşteri Adı',
        'Marka',
        'Tedarikçi',
        'Eski Stok',
        'Yeni Stok',
        'Tarih',
      ]);
      var downloadLink = document.createElement('a');
      let csvContent = reportData.map(e => e.join(',')).join('\n');
      let blob = new Blob([csvContent], {type: 'text/csv'});
      var url = URL.createObjectURL(blob);
      downloadLink.href = url;
      downloadLink.download = 'data.csv';
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      this.hideAlert();
    } else {
      this.notify('En az bir seçim yapmak zorundasınız.', 'danger');
    }
  };

  createReportForm = () => {
    const customStyles = {
      menu: (provided, state) => ({
        ...provided,
        height: '200px',
      }),
      menuList: (provided, state) => ({
        ...provided,
        height: '200px',
      }),
    };
    this.setState({
      alert: (
        <ReactBSAlert
          style={{backgroundColor: 'transparent'}}
          onCancel={this.hideAlert}
          showConfirm={false}
          cancelBtnText="İptal"
          confirmBtnBsStyle="linkedin"
          cancelBtnBsStyle="danger"
          onConfirm={() => {}}
          title=""
          confirmBtnText="Oluştur"
        >
          <Card>
            <CardHeader>
              <CardTitle tag="h1" style={{fontWeight: 'bold'}}>
                Rapor Oluştur
              </CardTitle>
            </CardHeader>
            <CardBody>
              <Select
                placeholder="Yıl"
                onChange={value => this.onYearSelect(value)}
                options={this.yearOptions.map(e => {
                  return {label: e, value: e};
                })}
              />
              <br />
              <Select
                placeholder="Ay"
                onChange={value => this.onMonthSelect(value)}
                styles={customStyles}
                options={this.monthOptions.map((e, index) => {
                  return {value: index, label: e};
                })}
                name="MonthSelection"
              />
              <br />
              <Select
                placeholder="Ürün Türü"
                onChange={value => this.onTypeSelect(value)}
                options={this.typeOptions}
              />
            </CardBody>
            <CardFooter className="text-right">
              <Button
                color="danger"
                style={{float: 'left', fontSize: '1rem', fontWeight: 'bold'}}
                onClick={this.hideAlert}
              >
                İptal
              </Button>
              <Button
                color="success"
                onClick={this.createReport}
                style={{fontSize: '1rem', fontWeight: 'bold'}}
              >
                Oluştur
              </Button>
            </CardFooter>
          </Card>
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
        let customer = this.customers.find(o => o.id === value.customer);
        let brand = this.brands.find(o => o.id === product?.brand);
        let supplier = this.suppliers.find(o => o.id === product?.supplier);
        return {
          id: value.id,
          oldStock: value.oldStock,
          newStock: value.newStock,
          customer: customer,
          brand: brand,
          brandName: brand?.name ? brand.name : value.brandName,
          supplier: supplier,
          supplierName: supplier?.name ? supplier.name : value.supplierName,
          name: product?.name ? product.name : value.productName,
          type: value?.type,
          productType: value?.productType,
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
                <CardTitle
                  tag="h1"
                  style={{textAlign: 'center', fontWeight: 'bolder'}}
                >
                  Stok Giriş/Çıkış
                </CardTitle>
                <Button
                  className="float-right"
                  color="success"
                  onClick={this.createReportForm}
                  style={{fontSize: '1rem', fontWeight: 'bold'}}
                >
                  Rapor Oluştur
                </Button>
              </CardHeader>
              <CardBody>
                <ReactTable
                  defaultSorted={[{id: 'timeStamp', desc: true}]}
                  data={this.data}
                  columns={[
                    {
                      Header: 'TÜR',
                      accessor: 'type',
                    },
                    {
                      Header: 'ÜRÜN TÜRÜ',
                      accessor: 'productType',
                    },
                    {
                      Header: 'ÜRÜN ADI',
                      accessor: 'name',
                    },
                    {
                      Header: 'TEDARİKÇİ',
                      accessor: 'supplierName',
                    },
                    {
                      Header: 'MARKA',
                      accessor: 'brandName',
                    },
                    {
                      Header: 'MÜŞTERİ',
                      accessor: 'customer.companyName',
                    },
                    {
                      Header: 'ESKİ STOK',
                      accessor: 'oldStock',
                    },
                    {
                      Header: 'YENİ STOK',
                      accessor: 'newStock',
                    },
                    {
                      Header: 'TARİH',
                      accessor: 'date',
                    },
                    {
                      Header: 'time',
                      accessor: 'timeStamp',
                      show: false,
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
