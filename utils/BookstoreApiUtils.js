const { expect, request } = require("@playwright/test");
const { UtilsFunctions } = require("./UtilsFunctions");
let utilsFunctions = new UtilsFunctions();
const urlApi = utilsFunctions.parseLocalJson("../fixtures/ApiUrl.json");
const booksData = utilsFunctions.parseLocalJson("../fixtures/bookstore.json");
const { DELETED, CREATED } = require('./statusCodes');


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
      headers: utilsFunctions.getHeaders(token),
    });
    expect.soft(addBooks.status()).toBe(statusCode);
    const responseBody = await utilsFunctions.parseResText(addBooks);
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
    const deleteAllBooks = await apiContext.delete(`${urlApi.books}?UserId=${userId}`,
      {
        headers: utilsFunctions.getHeaders(token),
      })
    expect.soft(deleteAllBooks.status()).toBe(statusCode);
    if (idEmptyIncorrect) {
      const responseBody = await utilsFunctions.parseResText(deleteAllBooks);
      return expect(responseBody.message).toBe(booksData.idIncorrectMessage);
    }
    if (tokenEmptyIncorrect) {
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
        headers: utilsFunctions.getHeaders(token),
      })
    expect(deleteBooks.status).toBe(statusCode)
  }
}
