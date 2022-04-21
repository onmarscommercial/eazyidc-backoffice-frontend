import React, { useEffect, useState } from "react";
import { MetaTags } from "react-meta-tags";
import { 
  Container, 
  Row, 
  Col, 
  Button, 
  Modal, 
  Badge, 
  Nav, 
  NavLink, 
  NavItem, 
  TabContent, 
  TabPane, 
  Card, 
  CardBody,
  CardHeader 
} from "reactstrap"
import UserService from "../../services/user"
import AuthService from "../../services/auth"
import Swal from "sweetalert2";
import classNames from "classnames";
import { useHistory } from "react-router-dom"

const SearchCustomer = () => {
  const [isShow, setIsShow] = useState(false)
  const [activeTab, setActiveTab] = useState("1")
  const [search, setSearch] = useState("")
  const [accountId, setAccountId] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [customerType, setCustomerType] = useState("")
  const [firstname, setFirstname] = useState("")
  const [lastname, setLastname] = useState("")
  const [companyName, setCompanyName] = useState("")
  const [taxId, setTaxId] = useState("")
  const [address, setAddress] = useState("")
  const [province, setProvince] = useState("")
  const [postcode, setPostcode] = useState("")
  const [status, setStatus] = useState("")
  const [active, setActive] = useState("")
  const [createdDate, setCreatedDate] = useState("")
  const [verifiedDate, setVerifiedDate] = useState("")
  const [editEmail, setEditEmail] = useState("")
  const [editPhone, setEditPhone] = useState("")
  const [editCustomerType, setEditCustomerType] = useState("")
  const [editFirstname, setEditFirstname] = useState("")
  const [editLastname, setEditLastname] = useState("")
  const [editCompanyName, setEditCompanyName] = useState("")
  const [editTaxId, setEditTaxId] = useState("")
  const [editAddress, setEditAddress] = useState("")
  const [editProvince, setEditProvince] = useState("")
  const [editPostcode, setEditPostcode] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  let history = useHistory()

  useEffect(() => {
    let login = AuthService.getStatusLogin()
    if (!login) {
      history.push("/login")
      window.location.reload()
    } 
  }, [])

  const toggleTab = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab)
    }
  }

  const setData = (accountId, email, phone, customerType, firstname, lastname, companyName, taxId, address, province, postcode, status, active, createdDate, verifiedDate) => {
    setAccountId(accountId)
    setEmail(email)
    setPhone(phone)
    setCustomerType(customerType)
    setFirstname(firstname)
    setLastname(lastname)
    setCompanyName(companyName)
    setTaxId(taxId)
    setAddress(address)
    setProvince(province)
    setPostcode(postcode)
    setStatus(status)
    setActive(active)
    setCreatedDate(createdDate)
    setVerifiedDate(verifiedDate)
  }

  const setEditData = (email, phone, customerType, firstname, lastname, companyName, taxId, address, province, postcode) => {
    setEditEmail(email)
    setEditPhone(phone)
    setEditCustomerType(customerType)
    setEditFirstname(firstname)
    setEditLastname(lastname)
    setEditCompanyName(companyName)
    setEditTaxId(taxId)
    setEditAddress(address)
    setEditProvince(province)
    setEditPostcode(postcode)
  }

  const changeCustomerType = e => {
    setEditCustomerType(e.target.value)
  }

  const changeSearch = e => {
    setSearch(e.target.value)
  }
  
  const searchData = e => {
    e.preventDefault()

    UserService.searchCustomer(search).then((res) => {
      if (res.data.code === 0) {
        setIsShow(true)
        setData(
          res.data.result.customer.accountId,
          res.data.result.customer.email,
          res.data.result.customer.phone,
          res.data.result.customer.customerType,
          res.data.result.customer.firstname,
          res.data.result.customer.lastname,
          res.data.result.customer.companyName,
          res.data.result.customer.taxId,
          res.data.result.customer.address,
          res.data.result.customer.province,
          res.data.result.customer.postcode,
          res.data.result.customer.status,
          res.data.result.customer.active,
          res.data.result.customer.createdDate,
          res.data.result.customer.verifiedDate
        )

        let phone = res.data.result.customer.phone;
        const phoneSplit = phone.split('-')
        const newPhone = phoneSplit[0]+phoneSplit[1]+phoneSplit[2]

        setEditData(
          res.data.result.customer.email,
          newPhone,
          res.data.result.customer.customerType,
          res.data.result.customer.firstname,
          res.data.result.customer.lastname,
          res.data.result.customer.companyName,
          res.data.result.customer.taxId,
          res.data.result.customer.address,
          res.data.result.customer.province,
          res.data.result.customer.postcode
        )
      } else {
        setIsShow(false)
        Swal.fire({
          icon: 'error',
          title: "Not found"
        })
      }
    })
  }

  const renderData = (search) => {
    UserService.searchCustomer(search).then((res) => {
      if (res.data.code === 0) {
        setIsShow(true)
        setData(
          res.data.result.customer.accountId,
          res.data.result.customer.email,
          res.data.result.customer.phone,
          res.data.result.customer.customerType,
          res.data.result.customer.firstname,
          res.data.result.customer.lastname,
          res.data.result.customer.companyName,
          res.data.result.customer.taxId,
          res.data.result.customer.address,
          res.data.result.customer.province,
          res.data.result.customer.postcode,
          res.data.result.customer.status,
          res.data.result.customer.active,
          res.data.result.customer.createdDate,
          res.data.result.customer.verifiedDate
        )

        let phone = res.data.result.customer.phone;
        const phoneSplit = phone.split('-')
        const newPhone = phoneSplit[0]+phoneSplit[1]+phoneSplit[2]

        setEditData(
          res.data.result.customer.email,
          newPhone,
          res.data.result.customer.customerType,
          res.data.result.customer.firstname,
          res.data.result.customer.lastname,
          res.data.result.customer.companyName,
          res.data.result.customer.taxId,
          res.data.result.customer.address,
          res.data.result.customer.province,
          res.data.result.customer.postcode
        )
      } else {
        setIsShow(false)
        Swal.fire({
          icon: 'error',
          title: "Not found"
        })
      }
    })
  }

  const onSave = e => {
    e.preventDefault();

    UserService.editCustomer(accountId, editEmail, editPhone, editCustomerType, editFirstname, editLastname, editCompanyName, editTaxId, editAddress, editProvince, editPostcode).then((res) => {
      if (res.data.code === 0) {
        Swal.fire({
          icon: "success",
          title: res.data.message
        })
        renderData(accountId)
      }
    })
  }

  const checkPassword = (password) => {
    var check = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,16}$/)
    if (!check.test(password)) {
      return false
    } else {
      return true
    }
  }

  const onChangePassword = e => {
    e.preventDefault();

    if (checkPassword(password) === true) {
      UserService.changePasswordCustomer(accountId, password, confirmPassword).then((res) => {
        if (res.data.code === 0) {
          Swal.fire({
            icon: "success",
            title: res.data.message
          })
          setPassword("")
          setConfirmPassword("")
        } else {
          Swal.fire({
            icon: "error",
            title: res.data.message
          })
          setPassword("")
          setConfirmPassword("")
        }
      })
    } else {
      Swal.fire({
        icon: "error",
        html: `<div class="text-start">Your password must be 8-16 characters,
        and include at least one uppercase letter,
        at least one lowercase letter,  at least a number,
        and  at least one special characters.</div>`
      })
      setPassword("")
      setConfirmPassword("")
    }
  }

  const banned = (accountId) => {
    UserService.bannedUser(accountId).then((res) => {
      if (res.data.code === 0) {
        Swal.fire({
          icon: "success",
          title: res.data.message
        })
        renderData(accountId)
      }
    })
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Search Customer</title>
        </MetaTags>
        <Container fluid>
          <div className="page-title-box">
            <Row>
              <Col>
                <Card>
                  <CardHeader>
                    <h5>Search Customer</h5>
                  </CardHeader>
                  <CardBody>
                    <form onSubmit={searchData}>
                      <Row className="align-items-center">
                        <Col md={3}>
                          <input type="text" className="form-control" placeholder="accountId/phone" value={search} onChange={changeSearch}/>
                        </Col>
                        <Col>
                          <button type="submit" className="btn">
                            <i className="fas fa-search"></i>
                          </button>
                        </Col>
                      </Row>
                    </form>
                  </CardBody>
                </Card>
              </Col>
            </Row>
            

            {isShow ? 
            (<div className="mt-4">
              <Card>
                <CardHeader>
                  <h5>Customer Information</h5>
                </CardHeader>
                <CardBody>
                  <Nav tabs>
                    <NavItem>
                      <NavLink
                        style={{ cursor: "pointer" }}
                        className={classNames({ active: activeTab === "1" })}
                        onClick={() => toggleTab("1")}
                      >
                        Profile
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        style={{ cursor: "pointer" }}
                        className={classNames({ active: activeTab === "2" })}
                        onClick={() => toggleTab("2")}
                      >
                        Edit Profile
                      </NavLink>
                    </NavItem>
                  </Nav>
                  <TabContent activeTab={activeTab} className="p-3 text-muted">
                    <TabPane tabId="1">
                      <Row className="align-items-center mt-2">
                        <Col md={2}>
                          AccountId
                        </Col>
                        <Col>
                          {accountId}
                        </Col>
                      </Row>
                      <Row className="align-items-center mt-3">
                        <Col md={2}>
                          Email
                        </Col>
                        <Col>
                          {email}
                        </Col>
                      </Row>
                      <Row className="align-items-center mt-3">
                        <Col md={2}>
                          Phone
                        </Col>
                        <Col>
                          {phone}
                        </Col>
                      </Row>
                      <Row className="align-items-center mt-3">
                        <Col md={2}>
                          Customer Type
                        </Col>
                        <Col>
                          {customerType === "O" ? "Ordinary" : "Juristic"}
                        </Col>
                      </Row>
                      <Row className="align-items-center mt-3" style={{ display: customerType === "J" ? "none" : "" }}>
                        <Col md={2}>
                          Firstname
                        </Col>
                        <Col>
                          {firstname}
                        </Col>
                      </Row>
                      <Row className="align-items-center mt-3" style={{ display: customerType === "J" ? "none" : "" }}>
                        <Col md={2}>
                          Lastname
                        </Col>
                        <Col>
                          {lastname}
                        </Col>
                      </Row>
                      <Row className="align-items-center mt-3" style={{ display: customerType === "O" ? "none" : "" }}>
                        <Col md={2}>
                          Company Name
                        </Col>
                        <Col>
                          {companyName}
                        </Col>
                      </Row>
                      <Row className="align-items-center mt-3" style={{ display: customerType === "O" ? "none" : "" }}>
                        <Col md={2}>
                          Tax ID
                        </Col>
                        <Col>
                          {taxId}
                        </Col>
                      </Row>
                      <Row className="align-items-center mt-3">
                        <Col md={2}>
                          Address
                        </Col>
                        <Col>
                          {address}
                        </Col>
                      </Row>
                      <Row className="align-items-center mt-3">
                        <Col md={2}>
                          Province
                        </Col>
                        <Col>
                          {province}
                        </Col>
                      </Row>
                      <Row className="align-items-center mt-3">
                        <Col md={2}>
                          Postcode
                        </Col>
                        <Col>
                          {postcode}
                        </Col>
                      </Row>
                      <Row className="align-items-center mt-3">
                        <Col md={2}>
                          Status
                        </Col>
                        <Col>
                          {status === "WV" ? "Waiting Verify" : status === "WA" ? "Waiting Approve" : status === "A" ? "Approve" : "Reject"}
                        </Col>
                      </Row>
                      <Row className="align-items-center mt-3">
                        <Col md={2}>
                          Active
                        </Col>
                        <Col>
                          {active === 1 ? "Active" : "Inactive"}
                        </Col>
                      </Row>
                      <Row className="align-items-center mt-3">
                        <Col md={2}>
                          Created Date
                        </Col>
                        <Col>
                          {createdDate}
                        </Col>
                      </Row>
                      <Row className="align-items-center mt-3">
                        <Col md={2}>
                          Verified Date
                        </Col>
                        <Col>
                          {verifiedDate !== "01/01/1970 07:00" ? verifiedDate : ""}
                        </Col>
                      </Row>
                      <Row className="align-items-center mt-3">
                        <Col md={2}>
                          <button type="button" className="btn btn-primary" onClick={() => banned(accountId)}>Banned</button>
                        </Col>
                      </Row>
                    </TabPane>
                    <TabPane tabId="2">
                      <form onSubmit={onSave}>
                        <Row className="align-items-center mt-2">
                          <Col md={2}>
                            Email
                          </Col>
                          <Col md={3}>
                            <input type="text" className="form-control" value={editEmail} onChange={e => setEditEmail(e.target.value)} />
                          </Col>
                        </Row>
                        <Row className="align-items-center mt-2">
                          <Col md={2}>
                            Phone
                          </Col>
                          <Col md={3}>
                            <input type="text" className="form-control" value={editPhone} onChange={e => setEditPhone(e.target.value)} />
                          </Col>
                        </Row>
                        <Row className="align-items-center mt-2">
                          <Col md={2}>
                            Customer Type
                          </Col>
                          <Col md={3}>
                            <div className="form-check form-check-inline">
                              <input type="radio" id="ordinary" name="customerType" className="form-check-input" value="O" checked={editCustomerType === 'O'} onChange={changeCustomerType} />
                              <label htmlFor="ordinary">Ordinary</label>
                            </div>
                            <div className="form-check form-check-inline">
                              <input type="radio" id="juristic" name="customerType" className="form-check-input" value="J" checked={editCustomerType === 'J'} onChange={changeCustomerType} />
                              <label htmlFor="juristic">Juristic</label>
                            </div>
                          </Col>
                        </Row>
                        <Row className="align-items-center mt-2" style={{display: editCustomerType === "J" ? "none" : ""}}>
                          <Col md={2}>
                            Firstname
                          </Col>
                          <Col md={3}>
                            <input type="text" className="form-control" value={editFirstname} onChange={e => setEditFirstname(e.target.value)} />
                          </Col>
                        </Row>
                        <Row className="align-items-center mt-2" style={{display: editCustomerType === "J" ? "none" : ""}}>
                          <Col md={2}>
                            Lastname
                          </Col>
                          <Col md={3}>
                            <input type="text" className="form-control" value={editLastname} onChange={e => setEditLastname(e.target.value)} />
                          </Col>
                        </Row>
                        <Row className="align-items-center mt-2" style={{display: editCustomerType === "O" ? "none" : ""}}>
                          <Col md={2}>
                            CompanyName
                          </Col>
                          <Col md={3}>
                            <input type="text" className="form-control" value={editCompanyName} onChange={e => setEditCompanyName(e.target.value)} />
                          </Col>
                        </Row>
                        <Row className="align-items-center mt-2" style={{display: editCustomerType === "O" ? "none" : ""}}>
                          <Col md={2}>
                            Tax ID
                          </Col>
                          <Col md={3}>
                            <input type="text" className="form-control" value={editTaxId} onChange={e => setEditTaxId(e.target.value)} />
                          </Col>
                        </Row>
                        <Row className="align-items-center mt-2">
                          <Col md={2}>
                            Address
                          </Col>
                          <Col md={3}>
                            <input type="text" className="form-control" value={editAddress} onChange={e => setEditAddress(e.target.value)} />
                          </Col>
                        </Row>
                        <Row className="align-items-center mt-2">
                          <Col md={2}>
                            Province
                          </Col>
                          <Col md={3}>
                            <input type="text" className="form-control" value={editProvince} onChange={e => setEditProvince(e.target.value)} />
                          </Col>
                        </Row>
                        <Row className="align-items-center mt-2">
                          <Col md={2}>
                            Postcode
                          </Col>
                          <Col md={3}>
                            <input type="text" className="form-control" value={editPostcode} onChange={e => setEditPostcode(e.target.value)} />
                          </Col>
                        </Row>
                        <Row className="align-items-center mt-2">
                          <Col md={2}>
                            
                          </Col>
                          <Col md={3}>
                            <button type="submit" className="btn btn-primary">Save</button>
                          </Col>
                        </Row>
                      </form>
                      {/* ===Password=== */}
                      <form onSubmit={onChangePassword}>
                        <Row className="align-items-center mt-4">
                          <Col md={2}>
                            Password
                          </Col>
                          <Col md={3}>
                            <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} />
                          </Col>
                        </Row>
                        <Row className="align-items-center mt-2">
                          <Col md={2}>
                            Confirm Password
                          </Col>
                          <Col md={3}>
                            <input type="password" className="form-control" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                          </Col>
                        </Row>
                        <Row className="align-items-center mt-2">
                          <Col md={2}>
                            
                          </Col>
                          <Col md={3}>
                            <button type="submit" className="btn btn-primary">Save Password</button>
                          </Col>
                        </Row>
                      </form>
                    </TabPane>
                  </TabContent>
                </CardBody>
              </Card>
            </div>) : (<div></div>)}
          </div>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default SearchCustomer