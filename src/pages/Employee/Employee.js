import React, { useEffect, useState } from "react";
import { MetaTags } from "react-meta-tags";
import { MDBDataTable } from "mdbreact";
import Switch from "react-switch"
import Select from "react-select"
import { Container, Row, Col, Button, Modal } from "reactstrap";
import UserService from '../../services/user'
import AuthService from "../../services/auth"
import { useHistory } from "react-router-dom";

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

const roleOption = [
  { label: "พนักงาน", value: 2 },
  { label: "หัวหน้างาน", value: 3 },
]

const Employee = () => {
  const [employeeList, setEmployeeList] = useState([])
  const [addEmployeeModal, setEmployeeModal] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [firstname, setFirstname] = useState("")
  const [lastname, setLastname] = useState("")
  const [role, setRole] = useState(null)
  const [status, setStatus] = useState(true)
  const [currentUser, setCurrentUser] = useState(undefined)

  let history = useHistory()

  let createdBy;

  useEffect(() => {
    let user = AuthService.getCurrentUser()
    if (user) {
      setCurrentUser(user)

      getEmployee()
    } else {
      history.push("/login")
      window.location.reload()
      AuthService.logout()
    }
  }, [])

  function toggleEmployeeModal() {
    setEmployeeModal(!addEmployeeModal)
    removeBodyCss
    clearModal()
  }

  function removeBodyCss() {
    document.body.classList.add("no_padding")
  }

  const clearModal = () => {
    setUsername("")
    setPassword("")
    setFirstname("")
    setLastname("")
    setRole(null)
    setStatus(true)
  }

  const getEmployee = () => {
    UserService.getEmployeeList().then((res) => {
      if (res.data.code === 0) {
        setEmployeeList(res.data.result.emp)
      } else {
        history.push("/login")
        window.location.reload()
        AuthService.logout()
      }
    })
  }

  if (currentUser) {
    createdBy = currentUser.profile.employeeId
  }

  const handleAddEmployee = e => {
    e.preventDefault();

    UserService.addEmployee(createdBy, username, password, firstname, lastname, role.value, status === true ? 1 : 0).then((res) => {
      if (res.data.code === 0) {
        toggleEmployeeModal()
        getEmployee()
      }
    })
  }

  const datatable = {
    columns: [
      {
        label: "Employee ID",
        field: "employeeId",
        sort: "src",
      },
      {
        label: "Username",
        field: "username",
        sort: "src",
      },
      {
        label: "Firstname",
        field: "firstname",
        sort: "src",
      },
      {
        label: "Lastname",
        field: "lastname",
        sort: "src",
      },
      {
        label: "Status",
        field: "status",
        sort: "src",
      },
      {
        label: "Created By",
        field: "createdBy",
        sort: "src",
      },
      {
        label: "Created At",
        field: "createdAt",
        sort: "src",
      },
    ],
    rows: employeeList.map(employeeLists => {
      return {
        employeeId: employeeLists.employeeId,
        username: employeeLists.username,
        firstname: employeeLists.firstname,
        lastname: employeeLists.lastname,
        status: employeeLists.status === 1 ? "Active" : "Inactive",
        createdBy: employeeLists.createdBy,
        createdAt: employeeLists.createdAt
      }
    })
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
                  <button 
                    type="button" 
                    className="btn btn-outline-primary waves-effect waves-light"
                    data-toggle="modal"
                    data-target="#employeeModal"
                    onClick={() => {toggleEmployeeModal()}}>Add Employee
                  </button>
                  <Modal isOpen={addEmployeeModal} toggle={() => {toggleEmployeeModal()}}>
                    <form onSubmit={handleAddEmployee}>
                      <div className="modal-header">
                        <h5 className="modal-title mt-0" id="employeeModal">Add Employee</h5>
                        <button 
                          type="button" 
                          className="close" 
                          data-dismiss="modal" 
                          aria-label="Close"
                          onClick={() => {setEmployeeModal(false)}}>
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div className="modal-body">
                        <Row className="mb-3">
                          <label className="col-md-3 col-form-label">Username</label>
                          <div className="col-md-9">
                            <input type="text" className="form-control" value={username} onChange={e => setUsername(e.target.value)}/>
                          </div>
                        </Row>

                        <Row className="mb-3">
                          <label className="col-md-3 col-form-label">Password</label>
                          <div className="col-md-9">
                            <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)}/>
                          </div>
                        </Row>

                        <Row className="mb-3">
                          <label className="col-md-3 col-form-label">Firstname</label>
                          <div className="col-md-9">
                            <input type="text" className="form-control" value={firstname} onChange={e => setFirstname(e.target.value)}/>
                          </div>
                        </Row>

                        <Row className="mb-3">
                          <label className="col-md-3 col-form-label">Lastname</label>
                          <div className="col-md-9">
                            <input type="text" className="form-control" value={lastname} onChange={e => setLastname(e.target.value)}/>
                          </div>
                        </Row>

                        <Row className="mb-3">
                          <label className="col-md-3 col-form-label">Role</label>
                          <div className="col-md-9">
                            <Select 
                              value={role} 
                              onChange={setRole} 
                              options={roleOption}
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
                        <button type="button" className="btn btn-secondary waves-effect" data-dismiss="modal" onClick={() => toggleEmployeeModal()}>Close</button>
                        <button type="submit" className="btn btn-primary waves-effect waves-light">Save</button>
                      </div>
                    </form>
                  </Modal>
                </div>
              </Col>
            </Row>
            <Row className="mt-4">
              <Col className="col-12">
                <MDBDataTable responsive bordered fixed data={datatable} />
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default Employee