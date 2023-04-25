let refreshTokens = [];

function ref(arg) {
  this.refreshTokens.push(arg);
}

module.exports = { refreshTokens, ref };
