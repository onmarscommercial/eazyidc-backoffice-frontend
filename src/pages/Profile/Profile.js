import React, { useState } from "react";
import { MetaTags } from "react-meta-tags"
import { Container, Row, Col, Card, CardBody, CardHeader } from "reactstrap"
import Swal from "sweetalert2";
import AuthService from "../../services/auth"
 
const Profile = () => {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  let user = AuthService.getCurrentUser()

  // const checkPassword = (password) => {
  //   var check = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,16}$/)
  //   if (!check.test(password)) {
  //     return false
  //   } else {
  //     return true
  //   }
  // }

  const onChangePassword = e => {
    e.preventDefault();

    //if (checkPassword(password) === true) {
      AuthService.changePWD(user.profile.employeeId, password, confirmPassword).then((res) => {
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
    // } else {
    //   Swal.fire({
    //     icon: "error",
    //     html: `<div class="text-start">Your password must be 8-16 characters,
    //     and include at least one uppercase letter,
    //     at least one lowercase letter,  at least a number,
    //     and  at least one special characters.</div>`
    //   })
    //   setPassword("")
    //   setConfirmPassword("")
    // }
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Profile</title>
        </MetaTags>
        <Container fluid>
          <div className="page-title-box">
            <Row>
              <Col>
                <Card>
                  <CardHeader>
                    <h5>Profile</h5>
                  </CardHeader>
                  <CardBody>
                    <h6>{"Name: " + user.profile.firstname + ' ' + user.profile.lastname}</h6>
                    <h6>{"Role: " + user.profile.roleId}</h6>
                  </CardBody>
                </Card>

                <Card>
                  <CardHeader>
                    <h5>Change Password</h5>
                  </CardHeader>
                  <CardBody>
                    <form onSubmit={onChangePassword}>
                      <Row>
                        <Col md={2}>
                          <label className="col-form-label" htmlFor="password">Password</label>
                        </Col>
                        <Col md={3}>
                          <input type="password" id="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} />
                        </Col>
                      </Row>
                      <Row className="mt-2">
                        <Col md={2}>
                          <label className="col-form-label" htmlFor="confirmPassword">Confirm Password</label>
                        </Col>
                        <Col md={3}>
                          <input type="password" id="confirmPassword" className="form-control" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                        </Col>
                      </Row>
                      <Row className="mt-2">
                        <Col>
                          <button type="submit" className="btn btn-primary">Change Password</button>
                        </Col>
                      </Row>
                    </form>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
          
        </Container>
      </div>
    </React.Fragment>
  )
}

export default Profile