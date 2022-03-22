import React from "react";
import { MetaTags } from "react-meta-tags"
import { Container, Row, Col } from "reactstrap"

const YearlySalesReport = () => {
  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Yearly Sales Report</title>
        </MetaTags>
        <Container fluid>
          <div className="page-title-box">
            <Row className="align-items-center">
              <Col md={8}>
                <h6 className="page-title">Yearly Sales Report</h6>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default YearlySalesReport