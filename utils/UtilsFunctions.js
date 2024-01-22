const userData = JSON.parse(JSON.stringify(require('../fixtures/userData.json')));
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

  getPayLoad(presetName) {
    return userData[presetName];
  }

}

module.exports = { UtilsFunctions }
