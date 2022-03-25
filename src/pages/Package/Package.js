import React, { useEffect, useState } from "react";
import { MetaTags } from "react-meta-tags";
import { MDBDataTable } from "mdbreact";
import Switch from "react-switch"
import Select from "react-select"
import { Container, Row, Col, Button, Modal } from "reactstrap"
import UserService from '../../services/user'
import AuthService from "../../services/auth"
import { useHistory } from "react-router-dom"

const Offsymbol = () => {
  return (
    <div 
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        fontSize: 12,
        color: "#fff",
        paddingRight: 2
      }}
    > 
      {" "} 
      No
    </div>
  )
}

const OnSymbol = () => {
  return (
    <div 
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        fontSize: 12,
        color: "#fff",
        paddingRight: 2
      }}
    > 
      {" "} 
      Yes
    </div>
  )
}

const ssdTypeOption = [
  { label: "SSD NVME", value: "NVME" },
  { label: "SSD ปกติ", value: "Normal" }
]

const Package = () => {
  const [packageList, setPackageList] = useState([])
  const [addPackageModal, setPackageModal] = useState(false)
  const [cpuUnit, setCpuUnit] = useState("")
  const [memoryUnit, setMemoryUnit] = useState("")
  const [ssdUnit, setSsdUnit] = useState("")
  const [transferUnit, setTransferUnit] = useState("")
  const [price, setPrice] = useState("")
  const [ssdType, setSsdType] = useState(null)
  const [status, setStatus] = useState(true)
  const [currentUser, setCurrentUser] = useState(undefined)

  let history = useHistory()

  let createdBy;

  useEffect(() => {
    let user = AuthService.getCurrentUser()
    if (user) {
      setCurrentUser(user)

      getPackage()
    } else {
      history.push("/login")
      window.location.reload()
    }
  }, [])

  function togglePackageModal() {
    setPackageModal(!addPackageModal)
    removeBodyCss
    clearModal()
  }

  function removeBodyCss() {
    document.body.classList.add("no_padding")
  }

  const clearModal = () => {
    setCpuUnit("")
    setMemoryUnit("")
    setSsdUnit("")
    setTransferUnit("")
    setPrice("")
    setSsdType(null)
    setStatus(true)
  }

  const handleChangeCpuUnit = e => {
    const formatCpuUnit = (e.target.validity.valid) ? e.target.value : cpuUnit
    setCpuUnit(formatCpuUnit)
  }

  const handleChangeMemoryUnit = e => {
    const formatMemoryUnit = (e.target.validity.valid) ? e.target.value : memoryUnit
    setMemoryUnit(formatMemoryUnit)
  }

  const handleChangeSsdUnit = e => {
    const formatSsdUnit = (e.target.validity.valid) ? e.target.value : ssdUnit
    setSsdUnit(formatSsdUnit)
  }

  const handleChangeTransferUnit = e => {
    const formatTransferUnit = (e.target.validity.valid) ? e.target.value : transferUnit
    setTransferUnit(formatTransferUnit)
  }

  const handleChangePrice = e => {
    const formatPrice = (e.target.validity.valid) ? e.target.value : price
    setPrice(formatPrice)
  }

  const getPackage = () => {
    UserService.getPackageList().then((res) => {
      if (res.data.code === 0) {
        setPackageList(res.data.result.package)
      } else {
        history.push("/login")
        window.location.reload()
      }
    })
  }

  if (currentUser) {
    createdBy = currentUser.profile.employeeId
  }

  const handleAddPackage = e => {
    e.preventDefault();

    UserService.addPackage(cpuUnit, memoryUnit, ssdUnit, transferUnit, price, ssdType.value, status === true ? 1 : 0, createdBy).then((res) => {
      if (res.data.code === 0) {
        togglePackageModal()
        getPackage()
      }
    })
  }

  const datatable = {
    columns: [
      {
        label: "Package ID",
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
                          <input type="text" pattern="[0-9]*" className="form-control" onInput={handleChangeCpuUnit} value={cpuUnit} />
                        </div>
                      </Row>

                      <Row className="mb-3">
                        <label className="col-md-3 col-form-label">Memory Unit</label>
                        <div className="col-md-9">
                          <input type="text" pattern="[0-9]*" className="form-control" onInput={handleChangeMemoryUnit} value={memoryUnit} />
                        </div>
                      </Row>

                      <Row className="mb-3">
                        <label className="col-md-3 col-form-label">SSD Unit</label>
                        <div className="col-md-9">
                          <input type="text" pattern="[0-9]*" className="form-control" onInput={handleChangeSsdUnit} value={ssdUnit} />
                        </div>
                      </Row>

                      <Row className="mb-3">
                        <label className="col-md-3 col-form-label">Transfer Unit</label>
                        <div className="col-md-9">
                          <input type="text" pattern="[0-9]*" className="form-control" onInput={handleChangeTransferUnit} value={transferUnit}/>
                        </div>
                      </Row>

                      <Row className="mb-3">
                        <label className="col-md-3 col-form-label">Price</label>
                        <div className="col-md-9">
                          <input type="text" pattern="[0-9]*" className="form-control" onInput={handleChangePrice} value={price} />
                        </div>
                      </Row>

                      <Row className="mb-3">
                        <label className="col-md-3 col-form-label">SSD Type</label>
                        <div className="col-md-9">
                          <Select 
                            value={ssdType}
                            onChange={setSsdType}
                            options={ssdTypeOption}
                            placeholder={'Please Select'}
                          />
                        </div>
                      </Row>

                      <Row className="mb-3">
                        <label className="col-md-3 col-form-label">Status</label>
                        <div className="col-md-9">
                          <Switch 
                            uncheckedIcon={<Offsymbol />}
                            checkedIcon={<OnSymbol />}
                            onColor="#02a499"
                            onChange={() => { setStatus(!status) }}
                            checked={status}
                          />
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