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
let booksIsbn = [];

test.describe.configure({ mode: 'serial' });

test.beforeAll(async () => {
    apiContext = await request.newContext();
    const api = new LoginApiUtils(apiContext)
    response = await api.getTokenAndUserId(userPayLoad);
    token = await response.token;
    userId = await response.userId;
    booksApi = new BookstoreApiUtils(apiContext);
    booksIsbn.push(await booksApi.getBookIsbnByIndex(0), await booksApi.getBookIsbnByIndex(1));
    booksIsbn.forEach(element => {
        booksApi.postBooks(element, userId, token, false, false, false)
    });
})

test.afterAll(async () => {
    await booksApi.deleteAllBooks(userId, token, false, false);
})

test("Delete All Books - happy flow", async () => {
    await booksApi.deleteAllBooks(userId, token, false, false);

})

test("Delete All Books - wrong userId", async () => {
    await booksApi.deleteAllBooks(`${userId}e`, token, true, false);

})

test("Delete All Books - no userId", async () => {
    await booksApi.deleteAllBooks("", token, true, false);

})

test("Delete All Books - wrong token", async () => {
    await booksApi.deleteAllBooks(userId, `${token}e`, false, true);

})

test("Delete All Books - no token", async () => {
    await booksApi.deleteAllBooks(userId, "", false, true);

})
