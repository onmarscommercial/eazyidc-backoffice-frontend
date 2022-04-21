import React, { useState } from "react";
import { MetaTags } from "react-meta-tags"
import { Container, Row, Col, Card, CardBody, CardHeader } from "reactstrap"
import AuthService from "../../services/auth"
 
const Profile = () => {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  let user = AuthService.getCurrentUser()

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
                  </CardBody>
                </Card>

                <Card>
                  <CardHeader>
                    <h5>Change Password</h5>
                  </CardHeader>
                  <CardBody>
                    <form>
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
                          <button type="button" className="btn btn-primary">Change Password</button>
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