import React, { useEffect, useState } from "react";
import { MetaTags } from "react-meta-tags";
import { MDBDataTable } from "mdbreact";
import { Container, Row, Col, Button, Modal, Badge, Card, CardHeader, CardBody } from "reactstrap"
import UserService from "../../services/user"
import AuthService from "../../services/auth"
import { useHistory } from "react-router-dom"
import Swal from "sweetalert2";
// import FileDownload from "js-file-download"
// import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css"
import axios from "../../config/axios"

const Customer = () => {
  const [customerList, setCustomerList] = useState([])
  const [addCustomerModal, setCustomerModal] = useState(false)
  const [addCustomerAddressModal, setCustomerAddressModal] = useState(false)
  const [customerType, setCustomerType] = useState("O")
  const [firstname, setFirstname] = useState("")
  const [lastname, setLastname] = useState("")
  const [companyName, setCompanyName] = useState("")
  const [taxId, setTaxId] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [verifyPassword, setVerifyPassword] = useState("")
  const [phone, setPhone] = useState("")
  const [currentUser, setCurrentUser] = useState(undefined)
  const [selectAccountId, setSelectAccountId] = useState("")
  const [addressAccountId, setAddressAccountId] = useState("")
  const [address, setAddress] = useState("")
  const [province, setProvince] = useState("")
  const [postcode, setPostcode] = useState("")
  // const [isPreview, setisPreview] = useState(false)
  // const [imgUrl, setImgUrl] = useState("")
  // const [isPdf, setisPdf] = useState(false)

  let history = useHistory();

  useEffect(() => {
    let user = AuthService.getCurrentUser()
    if (user) {
      setCurrentUser(user)

      getCustomer()
    } else {
      history.push("/login")
      window.location.reload()
      AuthService.logout()
    }
  }, [])

  function toggleCustomerModal() {
    setCustomerModal(!addCustomerModal)
    removeBodyCss
    clearModal()
  } 

  function toggleCustomerAddressModal(accountId) {
    setCustomerAddressModal(!addCustomerAddressModal)
    removeBodyCss
    setAddressAccountId(accountId)
    clearCustomerAddressModal()
  }

  function removeBodyCss() {
    document.body.classList.add("no_padding")
  }

  const clearModal = () => {
    setCustomerType("O")
    setFirstname("")
    setLastname("")
    setCompanyName("")
    setTaxId("")
    setEmail("")
    setPassword("")
    setVerifyPassword("")
    setPhone("")
  }

  const clearCustomerAddressModal = () => {
    setAddress("")
    setProvince("")
    setPostcode("")
  }

  const getCustomer = () => {
    UserService.getCustomerList().then((res) => {
      if (res.data.code === 0) {
        setCustomerList(res.data.result.customer)
      } else {
        history.push("/login")
        window.location.reload()
        AuthService.logout()
      }
    })
  }

  const changeCustomerType = e => {
    setCustomerType(e.target.value)
  }

  const changeTaxId = e => {
    const formatTaxId = (e.target.validity.valid) ? e.target.value : taxId
    setTaxId(formatTaxId)
  }

  // const downloadFile = accountId => {
  //   console.log(accountId)

  //   UserService.download(accountId).then((res) => {
  //     let type = res.data.type
  //     const typeSplit = type.split('/')
  //     const newName = accountId + `.${typeSplit[1]}`
  //     console.log(res.data)
  //     FileDownload(res.data, newName)
  //   })
  // }

  const previewFile = accountId => {
    UserService.previewFile(accountId).then((res) => {
      if (res.data.code === 0) {
        let url = axios.defaults.baseURL + res.data.result
        window.open(url)
        // setImgUrl(url)

        // if (url.includes(".png") || url.includes(".jpg")) {
        //   setisPreview(true)
        // } else {
        //   setisPdf(true)
        //   window.open(url)
        // }
      }
    })
  }

  const handleAddCustomer = e => {
    e.preventDefault();

    UserService.addCustomer(customerType, firstname, lastname, companyName, taxId, email, password, phone).then((res) => {
      if (res.data.code === 0) {
        Swal.fire({
          icon: "success",
          title: res.data.message
        })

        toggleCustomerModal()
        getCustomer()
      }
    })
  }

  const handleAddCustomerAddress = e => {
    e.preventDefault();

    console.log(addressAccountId);
    console.log("address:", address, "province:", province, "postcode:", postcode)

    UserService.addAddressCustomer(addressAccountId, address, province, postcode).then((res) => {
      if (res.data.code === 0) {
        Swal.fire({
          icon: "success",
          title: res.data.message
        })

        toggleCustomerAddressModal()
      }
    })
  }

  const approve = () => {
    console.log(selectAccountId)
    if (selectAccountId === "") {
      Swal.fire({
        icon: "warning",
        title: "Please select item to approve."
      })
    } else {
      Swal.fire({
        title: "Are you sure to approve this item?",
        showCancelButton: true,
        confirmButtonText: "Yes"
      }).then((result) => {
        if (result.isConfirmed) {
          UserService.approve(selectAccountId).then((res) => {
            if (res.data.code === 0) {
              Swal.fire({
                icon: "success",
                title: res.data.message
              })
              getCustomer()
            }
          })
        }
      })
      
    }
  }

  const datatable = {
    columns: [
      {
        label: "#",
        field: "check",
        sort: "src",
        width: 150
      },
      {
        label: "Account ID",
        field: "accountId",
        sort: "src",
        width: 150
      },
      {
        label: "Email",
        field: "email",
        sort: "src",
        width: 150,
      },
      {
        label: "Firstname - Lastname",
        field: "firstname",
        sort: "src",
        width: 150
      },
      {
        label: "Company Name",
        field: "companyName",
        sort: "src",
        width: 150
      },
      {
        label: "Status",
        field: "status",
        sort: "src",
        width: 150
      },
      {
        label: "File",
        field: "file",
        sort: "src",
        width: 150
      },
      // {
      //   label: "Verify",
      //   field: "verify",
      //   sort: "src",
      //   width: 150
      // },
      {
        label: "Action",
        field: "action",
        sort: "src",
        width: 150
      },
    ],
    rows: customerList.map(customerLists => {
      return {
        check: <input type="checkbox" className="form-check-input" value={selectAccountId} onChange={() => setSelectAccountId(customerLists.accountId)}/>,
        accountId: customerLists.accountId,
        email: customerLists.email,
        firstname: customerLists.firstname + " " + customerLists.lastname,
        companyName: customerLists.companyName,
        status: customerLists.status === "WV" ? 
                <Badge className="rounded-pill bg-warning p-2"><div className="fs-7">Waiting Verify Identity</div></Badge> : 
                customerLists.status === "WA" ? 
                <Badge className="rounded-pill bg-info p-2"><div className="fs-7">Waiting Approve</div></Badge> : 
                customerLists.status === "A" ? 
                <Badge className="rounded-pill bg-success p-2"><div className="fs-7">Approve</div></Badge> : 
                <Badge className="rounded-pill bg-danger p-2"><div className="fs-7">Reject</div></Badge>,
        // file: customerLists.filepath !== null ? 
        //         <button type="button" className="btn" onClick={() => downloadFile(customerLists.accountId)}>
        //           <i className="fas fa-file-download"></i> 
        //         </button> : "",
        file: customerLists.filepath !== null ? <button type="button" className="btn" onClick={() => previewFile(customerLists.accountId)} >
                  <i className="fas fa-file-image"></i>
                </button> : "",
        action: <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#customerAddressModal" onClick={() => {toggleCustomerAddressModal(customerLists.accountId)}}>
                  <i className="fas fa-plus"></i> Add Address
                </button>
      }
    })
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Customer</title>
        </MetaTags>
        <Container fluid>
          {/* {isPreview ? (
            <Lightbox 
              mainSrc={imgUrl}
              enableZoom={false}
              imageCaption=""
              onCloseRequest={() => { setisPreview(!isPreview) }}
            />
          ) : isPdf ? (<div></div>) : (<div></div>)} */}

          <div className="page-title-box">
            <Card>
              <CardHeader>
                <Row className="align-items-center">
                  <Col md={8}>
                    <h6 className="page-title">
                      Customer
                    </h6>
                  </Col>
                  <Col md={4} >
                    <div className="float-end">
                      <button 
                        type="button" 
                        className="btn btn-primary waves-effect waves-light" 
                        data-toggle="modal" 
                        data-target="#customerModal" 
                        onClick={() => {toggleCustomerModal()}}>
                        <i className="fas fa-user-plus"></i> Add Customer
                      </button>
                    </div>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Row className="mt-4">
                  <Col className="col-12">
                    <MDBDataTable responsive bordered data={datatable} className="text-center"/>
                  </Col>
                </Row>

                <Row className="mt-4">
                  <Col>
                    <button type="button" className="btn btn-primary float-end" onClick={() => approve()}>
                      <i className="fas fa-user-check"></i> Approve
                    </button>
                  </Col>
                </Row>
              </CardBody>
            </Card>
            
            <Modal size="lg" isOpen={addCustomerModal} toggle={() => {toggleCustomerModal()}}>
              <form onSubmit={handleAddCustomer}>
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
                <div className="modal-body">
                  <Row className="mb-3">
                    <label className="col-md-3">Customer Type</label>
                    <div className="col-md-5">
                      <div className="form-check form-check-inline">
                        <input type="radio" id="ordinary" name="customerType" className="form-check-input" value="O" checked={customerType === 'O'} onChange={changeCustomerType} />
                        <label htmlFor="ordinary">Ordinary</label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input type="radio" id="juristic" name="customerType" className="form-check-input" value="J" checked={customerType === 'J'} onChange={changeCustomerType} />
                        <label htmlFor="juristic">Juristic</label>
                      </div>
                    </div>
                  </Row>

                  <Row className="row mb-3" style={{display: customerType === "O" ? "none" : ""}}>
                    <label className="col-md-3 col-form-label" htmlFor="companyName">CompanyName</label>
                    <div className="col-md-9">
                      <input type="text" className="form-control" id="companyName" value={companyName} onChange={e => setCompanyName(e.target.value)} />
                    </div>
                  </Row>

                  <Row className="mb-3" style={{display: customerType === "O" ? "none" : ""}}>
                    <label className="col-md-3 col-form-label" htmlFor="taxId">Tax ID</label>
                    <div className="col-md-9">
                      <input type="text" pattern="[0-9]*" className="form-control" id="taxId" onInput={changeTaxId} value={taxId} maxLength="13" />
                    </div>
                  </Row>

                  <Row className="mb-3" style={{display: customerType === "J" ? "none" : ""}}>
                    <label className="col-md-3 col-form-label" htmlFor="firstname">Firstname</label>
                    <div className="col-md-9">
                      <input type="text" className="form-control" id="firstname" value={firstname} onChange={e => setFirstname(e.target.value)} />
                    </div>
                  </Row>

                  <Row className="mb-3" style={{display: customerType === "J" ? "none" : ""}}>
                    <label className="col-md-3 col-form-label" htmlFor="lastname">Lastname</label>
                    <div className="col-md-9">
                      <input type="text" className="form-control" id="lastname" value={lastname} onChange={e => setLastname(e.target.value)} />
                    </div>
                  </Row>

                  <Row className="mb-3">
                    <label className="col-md-3 col-form-label" htmlFor="email">Email</label>
                    <div className="col-md-9">
                      <input type="email" className="form-control" id="email" value={email} onChange={e => setEmail(e.target.value)} />
                    </div>
                  </Row>

                  <Row className="mb-3">
                    <label className="col-md-3 col-form-label" htmlFor="password">Password</label>
                    <div className="col-md-9">
                      <input type="password" className="form-control" id="password" value={password} onChange={e => setPassword(e.target.value)} />
                    </div>
                  </Row>

                  <Row className="mb-3">
                    <label className="col-md-3 col-form-label" htmlFor="verify-password">Confirm Password</label>
                    <div className="col-md-9">
                      <input type="password" className="form-control" id="verify-password" value={verifyPassword} onChange={e => setVerifyPassword(e.target.value)} />
                    </div>
                  </Row>

                  <Row className="mb-3">
                    <label className="col-md-3 col-form-label" htmlFor="tel">Phone</label>
                    <div className="col-md-9">
                      <input type="text" className="form-control" id="tel" value={phone} onChange={e => setPhone(e.target.value)} />
                    </div>
                  </Row>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary waves-effect" data-dismiss="modal" onClick={() => toggleCustomerModal()}>Close</button>
                  <button type="submit" className="btn btn-primary waves-effect waves-light">Save</button>
                </div>
              </form>
            </Modal>

            <Modal isOpen={addCustomerAddressModal} toggle={() => {toggleCustomerAddressModal()}}>
              <form onSubmit={handleAddCustomerAddress}>
                <div className="modal-header">
                  <h5 className="modal-title mt-0" id="customerAddressModal">Add Customer Address</h5>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                    onClick={() => {setCustomerAddressModal(false)}}>
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <Row>
                    <label className="col-md-3 col-form-label">Address</label>
                    <div className="col-md-9">
                      <textarea className="form-control" value={address} onChange={e => setAddress(e.target.value)} />
                    </div>
                  </Row>
                  <Row className="mt-2">
                    <label className="col-md-3 col-form-label">Province</label>
                    <div className="col-md-9">
                      <input type="text" className="form-control" value={province} onChange={e => setProvince(e.target.value)} />
                    </div>
                  </Row>
                  <Row className="mt-2">
                    <label className="col-md-3 col-form-label">Postcode</label>
                    <div className="col-md-9">
                      <input type="text" className="form-control" value={postcode} onChange={e => setPostcode(e.target.value)} />
                    </div>
                  </Row>
                </div>
                <div className="modal-footer">
                <button type="button" className="btn btn-secondary waves-effect" data-dismiss="modal" onClick={() => toggleCustomerAddressModal()}>Close</button>
                  <button type="submit" className="btn btn-primary waves-effect waves-light">Save</button>
                </div>
              </form>
            </Modal>
          </div>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default Customer