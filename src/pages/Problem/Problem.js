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
  const [detailModal, setDetailModal] = useState(false)
  const [detail, setDetail] = useState("")
  const [currentUser, setCurrentUser] = useState(undefined)

  let history = useHistory()

  useEffect(() => {
    let user = AuthService.getCurrentUser()
    if (user) {
      setCurrentUser(user)

      getProblem()
    } else {
      history.push("/login")
      window.location.reload()
      AuthService.logout()
    }
  }, [])

  function toggleDetailModal(detail) {
    setDetailModal(!detailModal)
    removeBodyCss
    setDetail(detail)
  }

  function removeBodyCss() {
    document.body.classList.add("no_padding")
  }

  const getProblem = () => {
    UserService.getProblem().then((res) => {
      if (res.data.code === 0) {
        setProblemList(res.data.result.problem)
      } else {
        history.push("/login")
        window.location.reload()
        AuthService.logout()
      }
    })
  }

  const inProgress = () => {

  }

  const done = () => {
    
  }

  const datatable = {
    columns: [
      {
        label: "Ticket No",
        field: "problemId",
        sort: "src"
      },
      {
        label: "Report Date",
        field: "report_date",
        sort: "src"
      },
      // {
      //   label: "Account Id",
      //   field: "accountId",
      //   sort: "src"
      // },
      {
        label: "Report By (Account Name)",
        field: "accountName",
        sort: "src"
      },
      {
        label: "Subject",
        field: "subject",
        sort: "src"
      },
      {
        label: "Status",
        field: "status",
        sort: "src"
      },
      {
        label: "Detail",
        field: "detail",
        sort: "src"
      },
    ],
    rows: problemList.map(problemLists => {
      return {
        problemId: problemLists.problemId,
        //accountId: problemLists.accountId,
        accountName: problemLists.accountName,
        subject: problemLists.subject,
        report_date: problemLists.report_date,
        status: problemLists.status === "P" ? 
                <span className="badge rounded-pill bg-primary">Pending</span> : 
                problemLists.status === "I" ? 
                <span className="badge rounded-pill bg-warning">In Progress</span> : 
                <span className="badge rounded-pill bg-success">Done</span>,
        detail: <button type="button" className="btn" data-toggle="modal" data-target="#detailModal" onClick={() => {toggleDetailModal(problemLists.detail)}}>
                  <i className="fas fa-search"></i>
                </button>,
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

            <Modal isOpen={detailModal} toggle={() => {toggleDetailModal()}}>
              <div className="modal-header">
                <h5 className="modal-title mt-0" id="detailModal">Detail</h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={() => {setDetailModal(false)}}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {detail}
              </div>
              <div className="modal-footer">
              <button type="button" className="btn btn-success waves-effect">Done</button>
                <button type="button" className="btn btn-warning waves-effect">In Progress</button>
                <button type="button" className="btn btn-secondary waves-effect" data-dismiss="modal" onClick={() => toggleDetailModal()}>Close</button>
              </div>
            </Modal>
          </div>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default Problem