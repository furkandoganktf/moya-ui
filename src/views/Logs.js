import React from 'react';
import ReactTable from 'react-table';
import NotificationAlert from 'react-notification-alert';
import BlockUi from 'react-block-ui';
import {Loader} from 'react-loaders';
import 'react-block-ui/style.css';
import 'loaders.css/loaders.min.css';
import {Card, CardBody, CardHeader, CardTitle, Col, Row} from 'reactstrap';
import {getLogs} from 'services/userService';

class Logs extends React.Component {
  constructor(props) {
    super(props);
    this.data = [];
    this.state = {
      alert: null,
      blocking: true,
      loaderType: 'ball-triangle-path',
      message: 'Loading, please wait',
    };
  }

  componentDidMount = async () => {
    const data = await getLogs();
    this.data = data.logs;
    this.setState({
      blocking: false,
    });
  };

  render() {
    return (
      <BlockUi
        className="block-ui"
        keepInView
        blocking={this.state.blocking}
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
                  Loglar
                </CardTitle>
              </CardHeader>
              <CardBody>
                <ReactTable
                  sorted={this.sortOptions}
                  data={this.data}
                  resizable={false}
                  columns={[
                    {
                      Header: 'Kullanıcı',
                      accessor: 'email',
                    },
                    {
                      Header: 'Mesaj',
                      accessor: 'log',
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

export default Logs;
