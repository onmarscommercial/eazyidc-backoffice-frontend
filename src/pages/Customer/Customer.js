import React from "react";
import { MetaTags } from "react-meta-tags";

import { Container, Row, Col, Button } from "reactstrap"

const Customer = () => {
  return (
    <React.Fragment>
      <div className="page-content">
      <MetaTags>
        <title>Customer</title>
      </MetaTags>
      <Container fluid>
        <div className="page-title-box">
          <Row className="align-items-center">
            <Col md={8}>
              <h6 className="page-title">Customer</h6>
            </Col>
            <Col md={4} >
              <div className="float-end">
                <Button color="primary" outline className="waves-effect">Add Customer</Button>
              </div>
            </Col>
          </Row>
          <Row>
            xxx
          </Row>
        </div>
      </Container>
      </div>
    </React.Fragment>
  )
}

export default Customer