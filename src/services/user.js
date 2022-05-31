import axios from "../config/axios";
import authHeader from "./auth-header";

class UserService {
  getCustomerList() {
    return axios.get("employee/customer", { headers: authHeader() })
  }

  searchCustomer(searchData) {
    return axios.post("employee/search-customer", { searchData }, { headers: authHeader() })
  }

  addCustomer(customerType, firstname, lastname, companyName, taxId, email, password, phone) {
    return axios.post("employee/add-customer", { customerType, firstname, lastname, companyName, taxId, email, password, phone }, { headers: authHeader() })
  }

  editCustomer(accountId, email, phone, customerType, firstname, lastname, companyName, taxId, address, province, postcode) {
    return axios.post("employee/edit-customer", { accountId, email, phone, customerType, firstname, lastname, companyName, taxId, address, province, postcode }, { headers: authHeader() })
  }

  bannedUser(accountId) {
    return axios.post("employee/banned-user", { accountId }, { headers: authHeader() })
  }

  changePasswordCustomer(accountId, password, confirmPassword) {
    return axios.post("employee/change-pwd-customer", { accountId, password, confirmPassword }, { headers: authHeader() })
  }

  addAddressCustomer(accountId, address, province, postcode) {
    return axios.post("employee/add-address-customer", { accountId, address, province, postcode }, { headers: authHeader() })
  }

  getCountWaitApprove() {
    return axios.get("employee/count-wait-approve", { headers: authHeader() })
  }

  approve(accountId) {
    return axios.post("employee/check-verify-identity", { accountId }, { headers: authHeader() })
  }

  getPackageList() {
    return axios.get("employee/package", { headers: authHeader() })
  }

  addPackage(packageCode, cpu_unit, memory_unit, ssd_unit, transfer_unit, price, ssd_type, amount, status, createdBy) {
    return axios.post("employee/add-package", { packageCode, cpu_unit, memory_unit, ssd_unit, transfer_unit, price, ssd_type, amount, status, createdBy }, { headers: authHeader() })
  }

  getEditPackage(packageId) {
    return axios.post("employee/get-edit-package", { packageId }, { headers: authHeader() })
  }

  editPackage(packageId, cpu_unit, memory_unit, ssd_unit, transfer_unit, price, ssd_type, amount, status, updatedBy) {
    return axios.post("employee/edit-package", { packageId, cpu_unit, memory_unit, ssd_unit, transfer_unit, price, ssd_type, amount, status, updatedBy }, { headers: authHeader() })
  }

  getEmployeeList() {
    return axios.get("employee/employee", { headers: authHeader() })
  }

  addEmployee(createdBy, username, password, firstname, lastname, roleId, status) {
    return axios.post("employee/add-employee", { createdBy, username, password, firstname, lastname, roleId, status }, { headers: authHeader() })
  }

  getEditEmployee(employeeId) {
    return axios.post("employee/get-edit-employee", { employeeId }, { headers: authHeader() })
  }

  editEmployee(employeeId, username, status, updatedBy) {
    return axios.post("employee/edit-employee", { employeeId, username, status, updatedBy }, { headers: authHeader() })
  }

  download(accountId) {
    return axios.post("employee/download", { accountId }, { responseType: "blob" })
  }

  previewFile(accountId) {
    return axios.post("employee/preview-file", { accountId }, { headers: authHeader() })
  }
}

export default new UserService();