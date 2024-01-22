const { expect, request } = require("@playwright/test");
const urlApi = JSON.parse(JSON.stringify(require("../fixtures/ApiUrl.json")));
const booksData = JSON.parse(
  JSON.stringify(require("../fixtures/bookstore.json"))
);
const { DELETED, CREATED } = require('./statusCodes');
const { UtilsFunctions } = require("./UtilsFunctions");
let utilsFunctions = new UtilsFunctions();

export class BookstoreApiUtils {

  async getBookIsbnByIndex(index) {
    const apiContext = await request.newContext();
    const getBooks = await apiContext.get(urlApi.books, {
      headers: {
        "Content-Type": "application/json"
      },
    });
    return (await utilsFunctions.parseResText(getBooks)).books[index].isbn;

  }

  async postBooks({
    isbn = "",
    userId = "",
    token = "",
    statusCode = CREATED,
    incorrectIsbn = false,
    wrongUserId = false,
    noAuth = false
  }) {
    const apiContext = await request.newContext();
    const addBooks = await apiContext.post(urlApi.books, {
      data: {
        'collectionOfIsbns': [{ 'isbn': isbn }],
        'userId': userId,
      },
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    expect.soft(addBooks.status()).toBe(statusCode);
    const responseBody = await utilsFunctions.parseResText(addBooks);
    console.log(responseBody);
    if (incorrectIsbn) {
      return expect(await responseBody.message).toBe(booksData.wrongBookIsbn);
    }
    if (wrongUserId) {
      return expect(await responseBody.message).toBe(booksData.idIncorrectMessage);
    }
    if (noAuth) {
      return expect(await responseBody.message).toBe(booksData.notAuthMessage);
    }
  }

  async deleteAllBooks({
    userId = "",
    token = "",
    idEmptyIncorrect = false,
    statusCode = DELETED,
    tokenEmptyIncorrect = false }) {
    const apiContext = await request.newContext();
    const deleteAllBooks = await apiContext.delete(urlApi.books + `?UserId=${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }

      })
    expect.soft(deleteAllBooks.status()).toBe(statusCode);
    if (idEmptyIncorrect === true) {
      const responseBody = await utilsFunctions.parseResText(deleteAllBooks);
      return expect(responseBody.message).toBe(booksData.idIncorrectMessage);
    }
    if (tokenEmptyIncorrect === true) {
      const responseBody = await utilsFunctions.parseResText(deleteAllBooks);
      return expect(responseBody.message).toBe(booksData.notAuthMessage);
    }
    return;
  }

  async deleteBookByIsbn({
    isbn = "",
    userId = "",
    token = "",
    statusCode = DELETED
  }) {
    const apiContext = await request.newContext();
    const deleteBooks = await apiContext.delete(urlApi.book,
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
    expect(deleteBooks.status).toBe(statusCode)
  }
}
