import axios from "../config/axios";
import authHeader from "./auth-header";

class UserService {
  getCustomerList() {
    return axios.get("employee/customer", { headers: authHeader() })
  }

  getPackageList() {
    return axios.get("employee/package")
  }

  getEmployeeList() {
    return axios.get("employee/employee", { headers: authHeader() })
  }
}

export default new UserService();