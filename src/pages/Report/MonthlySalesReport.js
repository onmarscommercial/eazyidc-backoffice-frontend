import React from "react";
import { MetaTags } from "react-meta-tags"
import { Container, Row, Col } from "reactstrap"

const MonthlySalesReport = () => {
  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Monthly Sales Report</title>
        </MetaTags>
        <Container fluid>
          <div className="page-title-box">
            <Row className="align-items-center">
              <Col md={8}>
                <h6 className="page-title">Monthly Sales Report</h6>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default MonthlySalesReport