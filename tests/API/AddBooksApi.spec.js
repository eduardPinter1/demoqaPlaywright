const { test, request } = require('@playwright/test');
const userData = JSON.parse(JSON.stringify(require('../../fixtures/userData.json')));
const { LoginApiUtils } = require("../../utils/LoginApiUtils")
const { BookstoreApiUtils } = require("../../utils/BookstoreApiUtils");
let userPayLoad = { password: userData.login.password, userName: userData.login.username };
let apiContext;
let response;
let token;
let userId;
let booksApi;
let bookIsbn;

test.describe.configure({ mode: 'serial' });

test.beforeAll(async () => {
    apiContext = await request.newContext();
    const api = new LoginApiUtils(apiContext)
    response = await api.getTokenAndUserId(userPayLoad);
    token = await response.token;
    userId = await response.userId;
    booksApi = new BookstoreApiUtils(apiContext, token);
    bookIsbn = await booksApi.getBookIsbnByIndex(0);

})

test.afterAll(async () => {
    booksApi.deleteBookByIsbn(bookIsbn, userId, token);
})

test("Post books - happy flow", async () => {
    await booksApi.postBooks(bookIsbn, userId, token, false, false, false);

})

test("Post books - incorrect book isbn", async () => {
    await booksApi.postBooks(`${bookIsbn}4`, userId, token, true, false, false);

})

test("Post books - wrong userId", async () => {
    await booksApi.postBooks(bookIsbn, `${userId}e`, token, false, true, false);
})

test("Post books - book isbn value empty", async () => {
    await booksApi.postBooks("", userId, token, true, false, false)
})

test("Post books - userId empty", async () => {
    await booksApi.postBooks(bookIsbn, "", token, false, true, false);
})

test("Post books - No authentication token", async () => {
    await booksApi.postBooks(bookIsbn, userId, "", false, false, true);
})