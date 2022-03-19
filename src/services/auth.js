import axios from "../config/axios";
import authHeader from "./auth-header";

class AuthService {
  login(username, password) {
    return axios.post("employee/login", { username, password }).then((res) => {
      if (res.data.code === 0) {
        localStorage.setItem("profile", JSON.stringify(res.data.result))
        localStorage.setItem("status", JSON.stringify({
          code: res.data.code,
          status: res.data.status,
          message: res.data.message
        }))
        localStorage.setItem("login", JSON.stringify(res.data.result.profile.login));
      } else {
        localStorage.setItem("status", JSON.stringify({
          code: res.data.code,
          status: res.data.status,
          message: res.data.message
        }))
      }

      return res.data
    })
  }

  logout() {
    localStorage.removeItem("profile")
    localStorage.removeItem("status")
    localStorage.removeItem("login")
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("profile"))
  }

  getResultLogin() {
    return JSON.parse(localStorage.getItem("status"))
  }

  getStatusLogin() {
    return JSON.parse(localStorage.getItem("login"))
  }
}

export default new AuthService();