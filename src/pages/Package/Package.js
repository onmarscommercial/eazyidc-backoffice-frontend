import React, { useEffect, useState } from "react";
import { MetaTags } from "react-meta-tags";
import { MDBDataTable } from "mdbreact";

import { Container, Row, Col, Button, Modal } from "reactstrap"
import UserService from '../../services/user'

const Package = () => {
  const [packageList, setPackageList] = useState([])
  const [addPackageModal, setPackageModal] = useState(false)
  const [cpuUnit, setCpuUnit] = useState("")
  const [memoryUnit, setMemoryUnit] = useState("")
  const [ssdUnit, setSsdUnit] = useState("")
  const [transferUnit, setTransferUnit] = useState("")
  const [price, setPrice] = useState("")
  const [ssdType, setSsdType] = useState("")
  const [status, setStatus] = useState("")

  useEffect(() => {
    getPackage()
  }, [])

  function togglePackageModal() {
    setPackageModal(!addPackageModal)
    removeBodyCss
  }

  function removeBodyCss() {
    document.body.classList.add("no_padding")
  }

  const getPackage = () => {
    UserService.getPackageList().then((res) => {
      if (res.data.code === 0) {
        // console.log(res.data.result.package)
        setPackageList(res.data.result.package)
      } 
    })
  }

  const handleAddPackage = e => {
    e.preventDefault();

    console.log("submit")
    togglePackageModal()
  }

  const datatable = {
    columns: [
      {
        label: "รหัสแพ็คเกจ",
        field: "packageId",
        sort: "src",
        width: 150
      },
      {
        label: "CPU Unit",
        field: "cpu_unit",
        sort: "src",
      },
      {
        label: "Memory Unit",
        field: "memory_unit",
        sort: "src",
      },
      {
        label: "SSD Unit",
        field: "ssd_unit",
        sort: "src",
      },
      {
        label: "Transfer Unit",
        field: "transfer_unit",
        sort: "src",
      },
      {
        label: "Price",
        field: "price",
        sort: "src",
      },
      {
        label: "SSD Type",
        field: "ssd_type",
        sort: "src",
      },
      {
        label: "Status",
        field: "status",
        sort: "src",
      },
    ],
    rows: packageList.map(packageLists => {
      return {
        packageId: packageLists.packageId,
        cpu_unit: packageLists.cpu_unit,
        memory_unit: packageLists.memory_unit,
        ssd_unit: packageLists.ssd_unit,
        transfer_unit: packageLists.transfer_unit,
        price: packageLists.price,
        ssd_type: packageLists.ssd_type,
        status: packageLists.status === 1 ? "Active" : "Inactive"
      }
    })
  }

  return (
    <React.Fragment>
      <div className="page-content">
      <MetaTags>
        <title>Package</title>
      </MetaTags>
      <Container fluid>
        <div className="page-title-box">
          <Row className="align-items-center">
            <Col md={8}>
              <h6 className="page-title">Package</h6>
            </Col>
            <Col md={4} >
              <div className="float-end">
                <button 
                  type="button" 
                  className="btn btn-outline-primary waves-effect waves-light"
                  data-toggle="modal"
                  data-target="#packageModal"
                  onClick={() => {togglePackageModal()}}>
                  Add Package
                </button>
                <Modal isOpen={addPackageModal} toggle={() => {togglePackageModal()}}>
                  <form onSubmit={handleAddPackage}>
                    <div className="modal-header">
                      <h5 className="modal-title mt-0" id="packageModal">Add Package</h5>
                      <button 
                        type="button" 
                        className="close" 
                        data-dismiss="modal" 
                        aria-label="Close"
                        onClick={() => {setPackageModal(false)}}>
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      <Row className="mb-3">
                        <label className="col-md-3 col-form-label">CPU Unit</label>
                        <div className="col-md-9">
                          <input type="text" className="form-control" value={cpuUnit} onChange={e => setCpuUnit(e.target.value)}/>
                        </div>
                      </Row>

                      <Row className="mb-3">
                        <label className="col-md-3 col-form-label">Memory Unit</label>
                        <div className="col-md-9">
                          <input type="text" className="form-control" value={memoryUnit} onChange={e => setMemoryUnit(e.target.value)}/>
                        </div>
                      </Row>

                      <Row className="mb-3">
                        <label className="col-md-3 col-form-label">SSD Unit</label>
                        <div className="col-md-9">
                          <input type="text" className="form-control" value={ssdUnit} onChange={e => setSsdUnit(e.target.value)}/>
                        </div>
                      </Row>

                      <Row className="mb-3">
                        <label className="col-md-3 col-form-label">Transfer Unit</label>
                        <div className="col-md-9">
                          <input type="text" className="form-control" value={transferUnit} onChange={e => setTransferUnit(e.target.value)}/>
                        </div>
                      </Row>

                      <Row className="mb-3">
                        <label className="col-md-3 col-form-label">Price</label>
                        <div className="col-md-9">
                          <input type="text" className="form-control" value={price} onChange={e => setPrice(e.target.value)}/>
                        </div>
                      </Row>

                      <Row className="mb-3">
                        <label className="col-md-3 col-form-label">SSD Type</label>
                        <div className="col-md-9">
                          <input type="text" className="form-control" value={ssdType} onChange={e => setSsdType(e.target.value)}/>
                        </div>
                      </Row>

                      <Row className="mb-3">
                        <label className="col-md-3 col-form-label">Status</label>
                        <div className="col-md-9">
                          <input type="text" className="form-control" value={status} onChange={e => setStatus(e.target.value)}/>
                        </div>
                      </Row>
                      
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary waves-effect" data-dismiss="modal" onClick={() => togglePackageModal()}>Close</button>
                      <button type="submit" className="btn btn-primary waves-effect waves-light">Save</button>
                    </div>
                  </form>
                </Modal>
              </div>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col className="col-12">
              <MDBDataTable responsive bordered data={datatable} />
            </Col>
          </Row>
        </div>
      </Container>
      </div>
    </React.Fragment>
  )
}

export default Package