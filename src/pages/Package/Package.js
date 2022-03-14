import React, { useEffect, useState } from "react";
import { MetaTags } from "react-meta-tags";
import { MDBDataTable } from "mdbreact";

import { Container, Row, Col, Button } from "reactstrap"
import UserService from '../../services/user'

const Package = () => {
  const [packageList, setPackageList] = useState([])

  useEffect(() => {
    getPackage()
  }, [])

  const getPackage = () => {
    UserService.getPackageList().then((res) => {
      if (res.data.code === 0) {
        // console.log(res.data.result.package)
        setPackageList(res.data.result.package)
      } 
    })
  }

  const datatable = {
    columns: [
      {
        label: "packageId",
        field: "packageId",
        sort: "src",
        width: 150
      },
      {
        label: "cpu_unit",
        field: "cpu_unit",
        sort: "src",
      },
      {
        label: "memory_unit",
        field: "memory_unit",
        sort: "src",
      },
      {
        label: "ssd_unit",
        field: "ssd_unit",
        sort: "src",
      },
      {
        label: "transfer_unit",
        field: "transfer_unit",
        sort: "src",
      },
      {
        label: "price",
        field: "price",
        sort: "src",
      },
      {
        label: "status",
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
                <Button color="primary" outline className="waves-effect">Add Package</Button>
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