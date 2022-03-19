import PropTypes from 'prop-types'
import React, { useEffect } from "react"
import { connect } from "react-redux"
import { withRouter, useHistory } from "react-router-dom"

import { logoutUser } from "../../store/actions"
import AuthService from "../../services/auth"

// const Logout = props => {
//   useEffect(() => {
//     props.logoutUser(props.history)
//   })

//   return <></>
// }

// Logout.propTypes = {
//   history: PropTypes.object,
//   logoutUser: PropTypes.func
// }

// export default withRouter(connect(null, { logoutUser })(Logout))

const Logout = () => {
  let history = useHistory()

  useEffect(() => {
    AuthService.logout()
    history.push("/login")
    window.location.reload();
  })

  return <></>
}

export default Logout