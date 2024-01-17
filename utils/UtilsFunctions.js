class UtilsFunctions {


  async parseResText(response) {
    return JSON.parse(await response.text());

  }

  getRandomInt(max) {
    return Math.floor(Math.random() * max);

  }

}

module.exports = { UtilsFunctions }
