import React, { useState } from "react";
import { MetaTags } from "react-meta-tags";
import { Container, Row, Col, Card, CardBody, CardTitle } from "reactstrap";
import { Link, useHistory } from "react-router-dom";

import Salesdonut from "../AllCharts/apex/salesdonut";
import ActivePieChart from "../EazyIdcChart/chartjs/ActivePieChart";

import "chartist/dist/scss/chartist.scss";

import { withTranslation } from "react-i18next";

const EazyIdcDashboard = () => {
  const [menu, setMenu] = useState(false)

  const toggle = () => {
    setMenu(!menu)
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Dashboard | Backoffice EazyIDC</title>
        </MetaTags>
        <Container fluid>
          <div className="page-title-box">
            <Row className="align-items-center">
              <Col md={8}>
                <h6 className="page-title">Dashboard</h6>
                <ol className="breadcrumb m-0">
                  <li className="breadcrumb-item active">Welcome to Backoffice EazyIDC Dashboard</li>
                </ol>
              </Col>


            </Row>
          </div>

          <Row>
            <Col xl={3} md={6}>
              <Card className="mini-stat bg-primary text-white">
                <CardBody>
                  <div className="mb-4">
                    <div className="float-start mini-stat-img me-4">

                    </div>
                    <h5 className="font-size-16 text-uppercase mt-0 text-white-50">
                      Orders
                    </h5>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col xl={3} md={6}>
              <Card className="mini-stat bg-primary text-white">
                <CardBody>
                  <div className="mb-4">
                    <div className="float-start mini-stat-img me-4">

                    </div>
                    <h5 className="font-size-16 text-uppercase mt-0 text-white-50">
                      Orders
                    </h5>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col xl={3} md={6}>
              <Card className="mini-stat bg-primary text-white">
                <CardBody>
                  <div className="mb-4">
                    <div className="float-start mini-stat-img me-4">

                    </div>
                    <h5 className="font-size-16 text-uppercase mt-0 text-white-50">
                      Orders
                    </h5>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col xl={3} md={6}>
              <Card className="mini-stat bg-primary text-white">
                <CardBody>
                  <div className="mb-4">
                    <div className="float-start mini-stat-img me-4">

                    </div>
                    <h5 className="font-size-16 text-uppercase mt-0 text-white-50">
                      Orders
                    </h5>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col xl={3}>
              <Card>
                <CardBody>
                  <h4 className="card-title mb-4">Server Type</h4>
                  <div id="ct-donut" className="ct-chart wid pt-4">
                    <Salesdonut />
                  </div>
                  <div className="mt-4">
                    <table className="table mb-0">
                      <tbody>
                        <tr>
                          <td>
                            <span className="badge bg-primary">Windows Server</span>
                          </td>
                          <td>Windows Server</td>
                          <td className="text-end">54.5%</td>
                        </tr>
                        <tr>
                          <td>
                            <span className="badge bg-success">Ubuntu</span>
                          </td>
                          <td>Ubuntu</td>
                          <td className="text-end">28.0%</td>
                        </tr>
                        <tr>
                          <td>
                            <span className="badge bg-warning">CentOS</span>
                          </td>
                          <td>CentOS</td>
                          <td className="text-end">17.5%</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardBody>
              </Card>
            </Col>

            <Col xl={3}>
              <Card>
                <CardBody>
                  <h4 className="card-title mb-4">Server Active</h4>
                  <div id="ct-donut" className="ct-chart wid pt-4">
                    <Salesdonut />
                  </div>
                  <div className="mt-4">
                    <table className="table mb-0">
                      <tbody>
                        <tr>
                          <td>
                            <span className="badge bg-primary">Active</span>
                          </td>
                          <td>Active</td>
                          <td className="text-end">54.5%</td>
                        </tr>
                        <tr>
                          <td>
                            <span className="badge bg-success">Inactive</span>
                          </td>
                          <td>Inactive</td>
                          <td className="text-end">28.0%</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardBody>
              </Card>
            </Col>

            <Col xl={3}>
              <Card>
                <CardBody>
                  <CardTitle className="h4 mb-4">Active Server</CardTitle>
                  <Row className="justify-content-center">
                    <Col sm={4}>
                      <div className="text-center">
                        <h5 className="mb-0 font-size-20"></h5>
                        <p className="text-muted"></p>
                      </div>
                    </Col>
                    <Col sm={4}>
                      <div className="text-center">
                        <h5 className="mb-0 font-size-20"></h5>
                        <p className="text-muted"></p>
                      </div>
                    </Col>
                    <Col sm={4}>
                      <div className="text-center">
                        <h5 className="mb-0 font-size-20"></h5>
                        <p className="text-muted"></p>
                      </div>
                    </Col>
                  </Row>

                  <ActivePieChart />
                </CardBody>
              </Card>
            </Col>
          </Row>

          
        </Container>
      </div>  
    </React.Fragment>
  )
}

export default withTranslation()(EazyIdcDashboard)