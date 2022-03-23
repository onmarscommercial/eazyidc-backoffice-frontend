import axios from "../config/axios";
import authHeader from "./auth-header";

class UserService {
  getCustomerList() {
    return axios.get("employee/customer", { headers: authHeader() })
  }

  addCustomer(customerType, firstname, lastname, companyName, taxId, email, password, phone) {
    return axios.post("employee/add-customer", { customerType, firstname, lastname, companyName, taxId, email, password, phone }, { headers: authHeader() })
  }

  getPackageList() {
    return axios.get("employee/package", { headers: authHeader() })
  }

  addPackage(cpu_unit, memory_unit, ssd_unit, transfer_unit, price, ssd_type, status, createdBy) {
    return axios.post("employee/add-package", { cpu_unit, memory_unit, ssd_unit, transfer_unit, price, ssd_type, status, createdBy }, { headers: authHeader() })
  }

  getEmployeeList() {
    return axios.get("employee/employee", { headers: authHeader() })
  }

  addEmployee(createdBy, username, password, firstname, lastname, roleId, status) {
    return axios.post("employee/add-employee", {createdBy, username, password, firstname, lastname, roleId, status }, { headers: authHeader() })
  }

  download(accountId) {
    return axios.post("employee/download", { accountId }, { responseType: "blob" })
  }
}

export default new UserService();