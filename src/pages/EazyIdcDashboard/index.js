import React, { useState } from "react";
import { MetaTags } from "react-meta-tags";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import { Link, useHistory } from "react-router-dom";

import Salesdonut from "../AllCharts/apex/salesdonut";

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
          </Row>

          <Row>
            <Col xl={3}>
              <Card>
                <CardBody>
                  <h4 className="card-title mb-4">Package</h4>
                  <div id="ct-donut" className="ct-chart wid pt-4">
                    <Salesdonut />
                  </div>
                  <div className="mt-4">
                    <table className="table mb-0">
                      <tbody>
                        <tr>
                          <td>
                            <span className="badge bg-primary">package 1</span>
                          </td>
                          <td>package 1</td>
                          <td className="text-end">54.5%</td>
                        </tr>
                        <tr>
                          <td>
                            <span className="badge bg-success">package 1</span>
                          </td>
                          <td>package 1</td>
                          <td className="text-end">28.0%</td>
                        </tr>
                        <tr>
                          <td>
                            <span className="badge bg-warning">package 1</span>
                          </td>
                          <td>package 1</td>
                          <td className="text-end">17.5%</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
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