class UtilsFunctions {

  async parseResText(response) {
    return JSON.parse(await response.text());
  }

  parseLocalJson(json) {
    return JSON.parse(JSON.stringify(require(`${json}`)));
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  getHeaders(token) {
    return {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    }
  }

  getPayLoad({ username = "", password = "" }) {
    return {
      "userName": username,
      "password": password
    }
  }

}

module.exports = { UtilsFunctions }
