export default function authHeader() {
  let keycloak = JSON.parse(localStorage.getItem("keycloak"));

  if (keycloak && keycloak.token) {
    return { Authorization: `Bearer ${keycloak.token}` };
  } else {
    return {};
  }
}
