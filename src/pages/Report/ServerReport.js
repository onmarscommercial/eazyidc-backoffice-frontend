import React from "react";
import { MetaTags } from "react-meta-tags"
import { Container, Row, Col, Card, CardBody, CardTitle } from "reactstrap"

const ServerReport = () => {
  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Server Report</title>
        </MetaTags>
        <Container fluid>
          <div className="page-title-box">
            <Row className="align-items-center">
              <Col md={8}>
                <h6 className="page-title">Server Report</h6>
              </Col>
            </Row>
            <Row className="mt-2">
              <Col>
                <Card>
                  <CardBody>
                    <CardTitle>
                      <Row>
                        <Col md={1} className="text-end">
                          <label className="col-form-label">From</label>
                        </Col>
                        <Col md={2}>
                          <input type="date" className="form-control" />
                        </Col>
                        <Col md={2}>
                          <input type="time" className="form-control" />
                        </Col>
                        <Col md={1} className="text-end">
                          <label className="col-form-label">To</label>
                        </Col>
                        <Col md={2}>
                          <input type="date" className="form-control" />
                        </Col>
                        <Col md={2}>
                          <input type="time" className="form-control" />
                        </Col>
                        <Col md={2}>
                          <button type="button" className="btn">
                            <i className="fas fa-search"></i> Search
                          </button>
                        </Col>
                      </Row>
                    </CardTitle>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default ServerReport