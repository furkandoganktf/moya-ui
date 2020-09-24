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
      dataLoaded: false,
      loaderType: 'ball-triangle-path',
      message: 'Loading, please wait',
    };
  }

  componentDidMount = async () => {
    const data = await getLogs();
    this.data = data.logs;
    this.setState({
      dataLoaded: true,
    });
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
                  Loglar
                </CardTitle>
              </CardHeader>
              <CardBody>
                <ReactTable
                  sorted={[{id: 'timeStamp', desc: true}]}
                  data={this.data}
                  resizable={false}
                  columns={[
                    {
                      Header: 'Kullanıcı',
                      accessor: 'username',
                    },
                    {
                      Header: 'Mesaj',
                      accessor: 'log',
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

export default Logs;
