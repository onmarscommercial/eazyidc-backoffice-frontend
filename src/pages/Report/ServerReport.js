import React from "react";
import { MetaTags } from "react-meta-tags"
import { Container, Row, Col } from "reactstrap"

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
          </div>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default ServerReport