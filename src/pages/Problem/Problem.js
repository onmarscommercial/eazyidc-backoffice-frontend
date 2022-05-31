import React, { useEffect, useState } from "react";
import { MetaTags } from "react-meta-tags";
import { MDBDataTable } from "mdbreact";
import { Container, Row, Col, Modal, Card, CardHeader, CardBody } from "reactstrap";
import AuthService from "../../services/auth"
import UserService from "../../services/user"
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";

const Problem = () => {
  const [problemList, setProblemList] = useState([])

  const datatable = {
    columns: [
      {
        label: "problemId",
        field: "problemId",
        sort: "src"
      }
    ],
    rows: problemList.map(problemLists => {
      return {
        problemId: problemLists.problemId,
      }
    })
  }
  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Problem Report</title>
        </MetaTags>
        <Container fluid>
          <div className="page-title-box">
            <Card>
              <CardHeader>
                <Row className="align-items-center">
                  <Col>
                    <h6 className="page-title">Problem Report</h6>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Row className="mt-4">
                  <Col className="col-12">
                    <MDBDataTable responsive bordered fixed data={datatable} />
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </div>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default Problem