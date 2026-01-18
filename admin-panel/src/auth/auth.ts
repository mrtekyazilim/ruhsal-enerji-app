const TOKEN_KEY = "admin_token"

export function setToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token)
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY)
}

export function isAuthed() {
  return !!getToken()
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY)
}
