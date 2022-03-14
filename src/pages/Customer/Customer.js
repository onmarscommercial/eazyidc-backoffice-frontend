import React, { useState } from "react";
import { MetaTags } from "react-meta-tags";
import { MDBDataTable } from "mdbreact";

import { Container, Row, Col, Button, Modal } from "reactstrap"

const Customer = () => {
  const [addCustomerModal, setCustomerModal] = useState(false)

  function toggleCustomerModal() {
    setCustomerModal(!addCustomerModal)
    removeBodyCss
  } 

  function removeBodyCss() {
    document.body.classList.add("no_padding")
  }

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
                <button 
                  type="button" 
                  className="btn btn-outline-primary waves-effect waves-light" 
                  data-toggle="modal" 
                  data-target="#customerModal" 
                  onClick={() => {toggleCustomerModal()}}>
                  Add Customer
                </button>
                <Modal isOpen={addCustomerModal} toggle={() => {toggleCustomerModal()}}>
                  <div className="modal-header">
                    <h5 className="modal-title mt-0" id="customerModal">Add Customer</h5>
                    <button 
                      type="button" 
                      className="close" 
                      data-dismiss="modal" 
                      aria-label="Close" 
                      onClick={() => {setCustomerModal(false)}}>
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                </Modal>
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

export default Customer