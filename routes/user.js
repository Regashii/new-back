let app;

function getAccess(u, p) {
  this.app = user = { username: u, password: p };
}

module.exports = { app, getAccess };
