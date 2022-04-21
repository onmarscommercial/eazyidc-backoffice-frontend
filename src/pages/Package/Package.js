import React, { useEffect, useState } from "react";
import { MetaTags } from "react-meta-tags";
import { MDBDataTable } from "mdbreact";
import Switch from "react-switch"
import { Container, Row, Col, Button, Modal } from "reactstrap"
import UserService from '../../services/user'
import AuthService from "../../services/auth"
import { useHistory } from "react-router-dom"
import Swal from "sweetalert2";

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

const Package = () => {
  const [packageList, setPackageList] = useState([])
  const [addPackageModal, setPackageModal] = useState(false)
  const [packageId, setPackageId] = useState(0)
  const [packageCode, setPackageCode] = useState("")
  const [cpuUnit, setCpuUnit] = useState("")
  const [memoryUnit, setMemoryUnit] = useState("")
  const [ssdUnit, setSsdUnit] = useState("")
  const [transferUnit, setTransferUnit] = useState("")
  const [price, setPrice] = useState("")
  const [ssdType, setSsdType] = useState("NVME")
  const [amount, setAmount] = useState("")
  const [status, setStatus] = useState(true)
  const [editPackageModal, setEditPackageModal] = useState(false)
  const [editPackageCode, setEditPackageCode] = useState("")
  const [editCpuUnit, setEditCpuUnit] = useState("")
  const [editMemoryUnit, setEditMemoryUnit] = useState("")
  const [editSsdUnit, setEditSsdUnit] = useState("")
  const [editTransferUnit, setEditTransferUnit] = useState("")
  const [editPrice, setEditPrice] = useState("")
  const [editSsdType, setEditSsdType] = useState("NVME")
  const [editAmount, setEditAmount] = useState("")
  const [editStatus, setEditStatus] = useState(true)
  const [currentUser, setCurrentUser] = useState(undefined)

  let history = useHistory()

  let createdBy;
  let updatedBy;

  useEffect(() => {
    let user = AuthService.getCurrentUser()
    if (user) {
      setCurrentUser(user)

      getPackage()
    } else {
      history.push("/login")
      window.location.reload()
      AuthService.logout()
    }
  }, [])

  function togglePackageModal() {
    setPackageModal(!addPackageModal)
    removeBodyCss
    clearModal()
  }

  function toggleEditPackageModal(packageId) {
    getEditPackage(packageId)
    setEditPackageModal(!editPackageModal)
    removeBodyCss
    clearEditModal()
  }

  function removeBodyCss() {
    document.body.classList.add("no_padding")
  }

  const clearModal = () => {
    setPackageCode("")
    setCpuUnit("")
    setMemoryUnit("")
    setSsdUnit("")
    setTransferUnit("")
    setPrice("")
    setSsdType("NVME")
    setAmount("")
    setStatus(true)
  }

  const clearEditModal = () => {
    setEditPackageCode("")
    setEditCpuUnit("")
    setEditMemoryUnit("")
    setEditSsdUnit("")
    setEditTransferUnit("")
    setEditPrice("")
    setEditSsdType("NVME")
    setEditAmount("")
    setEditStatus(true)
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

  const handleChangeSsdType = e => {
    setSsdType(e.target.value)
  }

  const handleChangeAmount = e => {
    const formatAmount = (e.target.validity.valid) ? e.target.value : amount
    setAmount(formatAmount)
  }

  const handleEditChangeCpuUnit = e => {
    const formatEditCpuUnit = (e.target.validity.valid) ? e.target.value : editCpuUnit
    setEditCpuUnit(formatEditCpuUnit)
  }

  const handleEditChangeMemoryUnit = e => {
    const formatEditMemoryUnit = (e.target.validity.valid) ? e.target.value : editMemoryUnit
    setEditMemoryUnit(formatEditMemoryUnit)
  }

  const handleEditChangeSsdUnit = e => {
    const formatEditSsdUnit = (e.target.validity.valid) ? e.target.value : editSsdUnit
    setEditSsdUnit(formatEditSsdUnit)
  }

  const handleEditChangeTransferUnit = e => {
    const formatEditTransferUnit = (e.target.validity.valid) ? e.target.value : editTransferUnit
    setEditTransferUnit(formatEditTransferUnit)
  }

  const handleEditChangePrice = e => {
    const formatEditPrice = (e.target.validity.valid) ? e.target.value : editPrice
    setEditPrice(formatEditPrice)
  }

  const handleEditChangeSsdType = e => {
    setEditSsdType(e.target.value)
  }

  const handleEditChangeAmount = e => {
    const formatEditAmount = (e.target.validity.valid) ? e.target.value : editAmount
    setEditAmount(formatEditAmount)
  }

  const getPackage = () => {
    UserService.getPackageList().then((res) => {
      if (res.data.code === 0) {
        setPackageList(res.data.result.package)
      } else {
        history.push("/login")
        window.location.reload()
        AuthService.logout()
      }
    })
  }

  const getEditPackage = (packageId) => {
    UserService.getEditPackage(packageId).then((res) => {
      if (res.data.code === 0) {
        setPackageId(res.data.result.package.packageId)
        setEditPackageCode(res.data.result.package.packageCode)
        setEditCpuUnit(res.data.result.package.cpu_unit)
        setEditMemoryUnit(res.data.result.package.memory_unit)
        setEditSsdUnit(res.data.result.package.ssd_unit)
        setEditTransferUnit(res.data.result.package.transfer_unit)
        setEditPrice(res.data.result.package.price)
        setEditSsdType(res.data.result.package.ssd_type)
        setEditAmount(res.data.result.package.amount)
        setEditStatus(res.data.result.package.status)
      }
    })
  }

  if (currentUser) {
    createdBy = currentUser.profile.employeeId,
    updatedBy = currentUser.profile.employeeId
  }

  const handleAddPackage = e => {
    e.preventDefault();

    UserService.addPackage(packageCode, cpuUnit, memoryUnit, ssdUnit, transferUnit, price, ssdType, amount, status === true ? 1 : 0, createdBy).then((res) => {
      if (res.data.code === 0) {
        Swal.fire({
          icon: "success",
          title: res.data.message
        })
        togglePackageModal()
        getPackage()
      }
    })
  }

  const handleEditPackage = e => {
    e.preventDefault();

    UserService.editPackage(packageId, editCpuUnit, editMemoryUnit, editSsdUnit, editTransferUnit, editPrice, editSsdType, editAmount, editStatus === true ? 1 : 0, updatedBy).then((res) => {
      if (res.data.code === 0) {
        Swal.fire({
          icon: "success",
          title: res.data.message
        })
        toggleEditPackageModal()
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
        label: "Package Code",
        field: "packageCode",
        sort: "src",
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
        label: "Amount",
        field: "amount",
        sort: "src",
      },
      {
        label: "Status",
        field: "status",
        sort: "src",
      },
      {
        label: "Manage",
        field: "manage",
        sort: "src",
      },
    ],
    rows: packageList.map(packageLists => {
      return {
        packageId: packageLists.packageId,
        packageCode: packageLists.packageCode,
        cpu_unit: packageLists.cpu_unit,
        memory_unit: packageLists.memory_unit,
        ssd_unit: packageLists.ssd_unit,
        transfer_unit: packageLists.transfer_unit,
        price: packageLists.price,
        ssd_type: packageLists.ssd_type,
        amount: packageLists.amount,
        status: packageLists.status === 1 ? "Active" : "Inactive",
        manage: <button 
                  type="button" 
                  className="btn btn-outline-primary"
                  data-toggle="modal"
                  data-target="#editPackageModal"
                  onClick={() => {toggleEditPackageModal(packageLists.packageId)}}>
                  <i className="fas fa-edit"></i> Edit
                </button>
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
                        <label className="col-md-3 col-form-label">Package Code</label>
                        <div className="col-md-9">
                          <input type="text" className="form-control" value={packageCode} onChange={e => setPackageCode(e.target.value)}/>
                        </div>
                      </Row>

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
                        <label className="col-md-3">SSD Type</label>
                        <div className="col-md-9">
                          <div className="form-check form-check-inline">
                            <input type="radio" id="nvme" name="ssdType" className="form-check-input" value="NVME" checked={ssdType === 'NVME'} onChange={handleChangeSsdType} />
                            <label htmlFor="nvme">SSD NVME</label>
                          </div>
                          <div className="form-check form-check-inline">
                            <input type="radio" id="normal" name="ssdType" className="form-check-input" value="Normal" checked={ssdType === 'Normal'} onChange={handleChangeSsdType} />
                            <label htmlFor="normal">SSD ปกติ</label>
                          </div>
                        </div>
                      </Row>

                      <Row className="mb-3">
                        <label className="col-md-3 col-form-label">Amount</label>
                        <div className="col-md-9">
                          <input type="text" pattern="[0-9]*" className="form-control" onInput={handleChangeAmount} value={amount} />
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

                <Modal isOpen={editPackageModal} toggle={() => {toggleEditPackageModal()}} >
                  <form onSubmit={handleEditPackage}>
                    <div className="modal-header">
                      <h5 className="modal-title mt-0" id="editPackageModal">Edit Package</h5>
                      <button 
                        type="button" 
                        className="close" 
                        data-dismiss="modal" 
                        aria-label="Close"
                        onClick={() => {setEditPackageModal(false)}}>
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      <Row className="mb-3">
                        <label className="col-md-3 col-form-label">Package Code</label>
                        <div className="col-md-9">
                          <input type="text" className="form-control" value={editPackageCode} onChange={e => setEditPackageCode(e.target.value)} disabled="true" />
                        </div>
                      </Row>

                      <Row className="mb-3">
                        <label className="col-md-3 col-form-label">CPU Unit</label>
                        <div className="col-md-9">
                          <input type="text" pattern="[0-9]*" className="form-control" onInput={handleEditChangeCpuUnit} value={editCpuUnit} />
                        </div>
                      </Row>

                      <Row className="mb-3">
                        <label className="col-md-3 col-form-label">Memory Unit</label>
                        <div className="col-md-9">
                          <input type="text" pattern="[0-9]*" className="form-control" onInput={handleEditChangeMemoryUnit} value={editMemoryUnit} />
                        </div>
                      </Row>

                      <Row className="mb-3">
                        <label className="col-md-3 col-form-label">SSD Unit</label>
                        <div className="col-md-9">
                          <input type="text" pattern="[0-9]*" className="form-control" onInput={handleEditChangeSsdUnit} value={editSsdUnit} />
                        </div>
                      </Row>

                      <Row className="mb-3">
                        <label className="col-md-3 col-form-label">Transfer Unit</label>
                        <div className="col-md-9">
                          <input type="text" pattern="[0-9]*" className="form-control" onInput={handleEditChangeTransferUnit} value={editTransferUnit}/>
                        </div>
                      </Row>

                      <Row className="mb-3">
                        <label className="col-md-3 col-form-label">Price</label>
                        <div className="col-md-9">
                          <input type="text" pattern="[0-9]*" className="form-control" onInput={handleEditChangePrice} value={editPrice} />
                        </div>
                      </Row>

                      <Row className="mb-3">
                        <label className="col-md-3">SSD Type</label>
                        <div className="col-md-9">
                          <div className="form-check form-check-inline">
                            <input type="radio" id="editNvme" name="editSsdType" className="form-check-input" value="NVME" checked={editSsdType === 'NVME'} onChange={handleEditChangeSsdType} />
                            <label htmlFor="editNvme">SSD NVME</label>
                          </div>
                          <div className="form-check form-check-inline">
                            <input type="radio" id="editNormal" name="editSsdType" className="form-check-input" value="Normal" checked={editSsdType === 'Normal'} onChange={handleEditChangeSsdType} />
                            <label htmlFor="editNormal">SSD ปกติ</label>
                          </div>
                        </div>
                      </Row>

                      <Row className="mb-3">
                        <label className="col-md-3 col-form-label">Amount</label>
                        <div className="col-md-9">
                          <input type="text" pattern="[0-9]*" className="form-control" onInput={handleEditChangeAmount} value={editAmount} />
                        </div>
                      </Row>

                      <Row className="mb-3">
                        <label className="col-md-3 col-form-label">Status</label>
                        <div className="col-md-9">
                          <Switch 
                            uncheckedIcon={<Offsymbol />}
                            checkedIcon={<OnSymbol />}
                            onColor="#02a499"
                            onChange={() => { setEditStatus(!editStatus) }}
                            checked={editStatus}
                          />
                        </div>
                      </Row>
                      
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary waves-effect" data-dismiss="modal" onClick={() => toggleEditPackageModal()}>Close</button>
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