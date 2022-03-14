import React from "react";
import { MetaTags } from "react-meta-tags";
import { MDBDataTable } from "mdbreact";

import { Container, Row, Col, Button } from "reactstrap";

const Employee = () => {
  const data = {
    columns: [
      {
        label: "Name",
        field: "name",
        sort: "src",
        width: 150
      }
    ],
    rows: [
      {
        name: "ABC"
      }
    ]
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Employee</title>
        </MetaTags>
        <Container fluid>
          <div className="page-title-box">
            <Row className="align-items-center">
              <Col md={8}>
                <h6 className="page-title">Employee</h6>
              </Col>
              <Col md={4}>
                <div className="float-end">
                  <Button color="primary" outline className="waves-effect">Add Employee</Button>
                </div>
              </Col>
            </Row>
            <Row className="mt-4">
              <Col className="col-12">
                <MDBDataTable responsive bordered data={data} />
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default Employee