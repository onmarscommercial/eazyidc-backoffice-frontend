import React from "react";
import { MetaTags } from "react-meta-tags"
import { Container, Row, Col, Card, CardBody, CardTitle, CardHeader } from "reactstrap"

const QuarterSalesReport = () => {
  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Quarter Sales Report</title>
        </MetaTags>
        <Container fluid>
          <div className="page-title-box">
            <Card>
              <CardHeader>
                <Row className="align-items-center">
                  <Col md={12}>
                    <h6 className="page-title">Quarter Sales Report</h6>
                  </Col>
                </Row>
              </CardHeader>
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
                      <button type="button" className="btn btn-outline-primary">
                        <i className="fas fa-search"></i> Search
                      </button>
                    </Col>
                  </Row>
                </CardTitle>
              </CardBody>
            </Card>
            
            <Row className="mt-2">
              <Col>
                
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default QuarterSalesReport