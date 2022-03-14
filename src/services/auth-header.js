export default function authHeader() {
  const user = JSON.parse(localStorage.getItem('profile'));

  if (user && user.accessToken) {
    return { authorization: 'Berrer ' + user.accessToken }
  } else {
    return {}
  }
}