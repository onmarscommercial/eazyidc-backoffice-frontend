import axios from "../config/axios";
import authHeader from "./auth-header";

class AuthService {
  login() {
    return axios.post("employee/login", {})
  }

  logout() {

  }

  getCurrentUser() {

  }

  addEmployee() {

  }
}

export default new AuthService();