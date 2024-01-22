import { test } from '../../modules/base';
const userData = JSON.parse(JSON.stringify(require('../../fixtures/userData.json')));
const { UNAUTHORIZED } = require('../../utils/statusCodes');
let response;
let token;
let userId;
let booksIsbn = [];

test.describe.configure({ mode: 'serial' });

test.beforeAll(async ({ loginApiUtils, addBooksApi }) => {
    response = await loginApiUtils.getTokenAndUserId({ username: userData.login.username, password: userData.login.password });
    loginApiUtils.authorizeUser({ username: userData.login.username, password: userData.login.password });
    token = await response.token;
    userId = await response.userId;
    booksIsbn.push(await addBooksApi.getBookIsbnByIndex(0), await addBooksApi.getBookIsbnByIndex(1));
    booksIsbn.forEach(element => {
        addBooksApi.postBooks({ isbn: element, userId: userId, token: token });
    });
})

test.afterAll(async ({ addBooksApi }) => {
    await addBooksApi.deleteAllBooks({ userId: userId, token: token });
})

test.describe("Positive test cases", async ({ }) => {

    test("Delete All Books - happy flow", async ({ addBooksApi }) => {
        await addBooksApi.deleteAllBooks({ userId: userId, token: token });

    })
})

test.describe("Negative test cases", async ({ }) => {

    test("Delete All Books - wrong userId", async ({ addBooksApi }) => {
        await addBooksApi.deleteAllBooks({ userId: `${userId}e`, token: token, idEmptyIncorrect: true, statusCode: UNAUTHORIZED });

    })

    test("Delete All Books - no userId", async ({ addBooksApi }) => {
        await addBooksApi.deleteAllBooks({ userId: "", token: token, idEmptyIncorrect: true, statusCode: UNAUTHORIZED });

    })

    test("Delete All Books - userId integer", async ({ addBooksApi }) => {
        await addBooksApi.deleteAllBooks({ userId: 123, token: token, idEmptyIncorrect: true, statusCode: UNAUTHORIZED });

    })

    test("Delete All Books - userId boolean", async ({ addBooksApi }) => {
        await addBooksApi.deleteAllBooks({ userId: true, token: token, idEmptyIncorrect: true, statusCode: UNAUTHORIZED });

    })

    test("Delete All Books - userId array", async ({ addBooksApi }) => {
        await addBooksApi.deleteAllBooks({ userId: ["userId"], token: token, idEmptyIncorrect: true, statusCode: UNAUTHORIZED });

    })

    test("Delete All Books - userId object", async ({ addBooksApi }) => {
        await addBooksApi.deleteAllBooks({ userId: { value: userId }, token: token, idEmptyIncorrect: true, statusCode: UNAUTHORIZED });

    })

    test("Delete All Books - userId null", async ({ addBooksApi }) => {
        await addBooksApi.deleteAllBooks({ userId: null, token: token, idEmptyIncorrect: true, statusCode: UNAUTHORIZED });

    })

    test("Delete All Books - wrong token", async ({ addBooksApi }) => {
        await addBooksApi.deleteAllBooks({ userId: userId, token: `${token}e`, tokenEmptyIncorrect: true, statusCode: UNAUTHORIZED });

    })

    test("Delete All Books - no token", async ({ addBooksApi }) => {
        await addBooksApi.deleteAllBooks({ userId: userId, token: "", tokenEmptyIncorrect: true, statusCode: UNAUTHORIZED });

    })

    test("Delete All Books - token integer", async ({ addBooksApi }) => {
        await addBooksApi.deleteAllBooks({ userId: userId, token: 123, tokenEmptyIncorrect: true, statusCode: UNAUTHORIZED });

    })

    test("Delete All Books - token boolean", async ({ addBooksApi }) => {
        await addBooksApi.deleteAllBooks({ userId: userId, token: true, tokenEmptyIncorrect: true, statusCode: UNAUTHORIZED });

    })

    test("Delete All Books - token array", async ({ addBooksApi }) => {
        await addBooksApi.deleteAllBooks({ userId: userId, token: [`${token}`], tokenEmptyIncorrect: true, statusCode: UNAUTHORIZED });

    })

    test("Delete All Books - token object", async ({ addBooksApi }) => {
        await addBooksApi.deleteAllBooks({ userId: userId, token: { value: token }, tokenEmptyIncorrect: true, statusCode: UNAUTHORIZED });

    })

    test("Delete All Books - token null", async ({ addBooksApi }) => {
        await addBooksApi.deleteAllBooks({ userId: userId, token: null, tokenEmptyIncorrect: true, statusCode: UNAUTHORIZED });

    })

})


