import axios from "../config/axios";
import authHeader from "./auth-header";

class UserService {
  getCustomerList() {
    return axios.get("employee/customer", { headers: authHeader() })
  }

  getPackageList() {
    return axios.get("employee/package", { headers: authHeader() })
  }

  getEmployeeList() {
    return axios.get("employee/employee", { headers: authHeader() })
  }

  addEmployee(createdBy, username, password, firstname, lastname, roleId, status) {
    return axios.post("employee/add-employee", {createdBy, username, password, firstname, lastname, roleId, status }, { headers: authHeader() })
  }
}

export default new UserService();