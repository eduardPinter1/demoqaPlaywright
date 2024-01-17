const { expect } = require("@playwright/test");
const urlApi = JSON.parse(JSON.stringify(require("../fixtures/ApiUrl.json")));
const booksData = JSON.parse(
  JSON.stringify(require("../fixtures/bookstore.json"))
);
const { UtilsFunctions } = require("./UtilsFunctions");

class BookstoreApiUtils {
  constructor(apiContext) {
    this.apiContext = apiContext;
    this.utilsFunctions = new UtilsFunctions();

  }

  async getBookIsbnByIndex(index) {
    const getBooks = await this.apiContext.get(urlApi.books, {
      headers: {
        "Content-Type": "application/json"
      },
    });
    const responseBody = await this.utilsFunctions.parseResText(getBooks);
    return responseBody.books[index].isbn;
  }

  async postBooks(
    isbn,
    userId,
    token,
    incorrectIsbn = false,
    wrongUserId = false,
    noAuth = false
  ) {
    const addBooks = await this.apiContext.post(urlApi.books, {
      data: {
        collectionOfIsbns: [{ isbn: isbn }],
        userId: userId,
      },
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    });
    const responseBody = await this.utilsFunctions.parseResText(addBooks);
    if (incorrectIsbn) {
      expect(await responseBody.message).toBe(booksData.wrongBookIsbn);
      return;
    }
    if (wrongUserId) {
      expect(await responseBody.message).toBe(booksData.idIncorrectMessage);
      return;
    }
    if (noAuth) {
      expect(await responseBody.message).toBe(booksData.notAuthMessage);
      return;
    }
    return;
  }

  async deleteAllBooks(userId, token, idEmptyIncorrect = false, tokenEmptyIncorrect = false) {
    const deleteAllBooks = await this.apiContext.delete(urlApi.books + `?UserId=${userId}`,
      {
        headers: {
          'Authorization': "Bearer " + token,
          'Content-Type': 'application/json'
        }

      })

    if (idEmptyIncorrect === true) {
      const responseBody = await this.utilsFunctions.parseResText(deleteAllBooks);
      expect(responseBody.message).toBe(booksData.idIncorrectMessage);
      return;
    }
    if (tokenEmptyIncorrect === true) {
      const responseBody = await this.utilsFunctions.parseResText(deleteAllBooks);
      expect(responseBody.message).toBe(booksData.notAuthMessage);
      return;
    }
    return;
  }

  async deleteBookByIsbn(isbn, userId, token) {
    const deleteBooks = await this.apiContext.delete(urlApi.book,
      {
        data: {
          isbn: isbn,
          userId: userId

        },
        headers: {
          'Authorization': "Bearer " + token,
          'Content-Type': 'application/json'
        },

      })
  }
}
module.exports = { BookstoreApiUtils };
