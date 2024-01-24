import { test } from '../../modules/base';
const userData = JSON.parse(JSON.stringify(require('../../fixtures/userData.json')));
const { BAD_REQUEST, UNAUTHORIZED } = require('../../utils/statusCodes');
let token;
let userId;
let bookIsbn;

test.beforeEach(async ({ loginApiUtils, addBooksApi }) => {
    let response = await loginApiUtils.getTokenAndUserId({});
    loginApiUtils.authorizeUser({});
    token = await response.token;
    userId = await response.userId;
    bookIsbn = await addBooksApi.getBookIsbnByIndex(0);

})

test.describe("UserId variations", async () => {

    test("Post books - wrong userId", async ({ addBooksApi }) => {
        await addBooksApi.postBooks({ isbn: bookIsbn, userId: `${userId}e`, token: token, wrongUserId: true, statusCode: UNAUTHORIZED });
    })

    test("Post books - userId empty", async ({ addBooksApi }) => {
        await addBooksApi.postBooks({ isbn: bookIsbn, userId: "", token: token, wrongUserId: true, statusCode: UNAUTHORIZED });
    })

    test("Post books - userId integer", async ({ addBooksApi }) => {
        await addBooksApi.postBooks({ isbn: bookIsbn, userId: 1, token: token, wrongUserId: true, statusCode: UNAUTHORIZED });
    })

    test("Post books - userId float", async ({ addBooksApi }) => {
        await addBooksApi.postBooks({ isbn: bookIsbn, userId: 1.1, token: token, wrongUserId: true, statusCode: UNAUTHORIZED });
    })

    test("Post books - userId boolean", async ({ addBooksApi }) => {
        await addBooksApi.postBooks({ isbn: bookIsbn, userId: true, token: token, wrongUserId: true, statusCode: UNAUTHORIZED });
    })

    test("Post books - userId array", async ({ addBooksApi }) => {
        await addBooksApi.postBooks({ isbn: bookIsbn, userId: ["userId"], token: token, wrongUserId: true, statusCode: UNAUTHORIZED });
    })

    test("Post books - userId object", async ({ addBooksApi }) => {
        await addBooksApi.postBooks({ isbn: bookIsbn, userId: { value: "1" }, token: token, wrongUserId: true, statusCode: UNAUTHORIZED });
    })

    test("Post books - userId null", async ({ addBooksApi }) => {
        await addBooksApi.postBooks({ isbn: bookIsbn, userId: null, token: token, wrongUserId: true, statusCode: UNAUTHORIZED });
    })
})

test.describe("Token variations", async () => {

    test("Post books - token integer", async ({ addBooksApi }) => {
        await addBooksApi.postBooks({ isbn: bookIsbn, userId: userId, token: 1, noAuth: true, statusCode: UNAUTHORIZED });
    })

    test("Post books - token float", async ({ addBooksApi }) => {
        await addBooksApi.postBooks({ isbn: bookIsbn, userId: userId, token: 1.1, noAuth: true, statusCode: UNAUTHORIZED });
    })

    test("Post books - token boolean", async ({ addBooksApi }) => {
        await addBooksApi.postBooks({ isbn: bookIsbn, userId: userId, token: true, noAuth: true, statusCode: UNAUTHORIZED });
    })

    test("Post books - token array", async ({ addBooksApi }) => {
        await addBooksApi.postBooks({ isbn: bookIsbn, userId: userId, token: ["token"], noAuth: true, statusCode: UNAUTHORIZED });
    })

    test("Post books - token object", async ({ addBooksApi }) => {
        await addBooksApi.postBooks({ isbn: bookIsbn, userId: userId, token: { value: token }, noAuth: true, statusCode: UNAUTHORIZED });
    })

    test("Post books - token null", async ({ addBooksApi }) => {
        await addBooksApi.postBooks({ isbn: bookIsbn, userId: userId, token: null, noAuth: true, statusCode: UNAUTHORIZED });
    })

    test("Post books - No authentication token", async ({ addBooksApi }) => {
        await addBooksApi.postBooks({ isbn: bookIsbn, userId: userId, noAuth: true, statusCode: UNAUTHORIZED });
    })
})

test.describe("Isbn variations", async () => {

    test("Post books - book isbn value empty", async ({ addBooksApi }) => {
        await addBooksApi.postBooks({ isbn: "", userId: userId, token: token, incorrectIsbn: true, statusCode: BAD_REQUEST })
    })

    test("Post books - incorrect book isbn", async ({ addBooksApi }) => {
        await addBooksApi.postBooks({ isbn: `${bookIsbn}4`, userId: userId, token: token, incorrectIsbn: true, statusCode: BAD_REQUEST });
    })

    test("Post books - isbn integer", async ({ addBooksApi }) => {
        await addBooksApi.postBooks({ isbn: 1, userId: userId, token: token, incorrectIsbn: true, statusCode: BAD_REQUEST });
    })

    test("Post books - isbn float", async ({ addBooksApi }) => {
        await addBooksApi.postBooks({ isbn: 1.1, userId: userId, token: token, incorrectIsbn: true, statusCode: BAD_REQUEST });
    })

    test("Post books - isbn boolean", async ({ addBooksApi }) => {
        await addBooksApi.postBooks({ isbn: true, userId: userId, token: token, incorrectIsbn: true, statusCode: BAD_REQUEST });
    })

    test("Post books - isbn array", async ({ addBooksApi }) => {
        await addBooksApi.postBooks({ isbn: ["bookIsbn"], userId: userId, token: token, incorrectIsbn: true, statusCode: BAD_REQUEST });
    })

    test("Post books - isbn object", async ({ addBooksApi }) => {
        await addBooksApi.postBooks({ isbn: { value: "1" }, userId: userId, token: token, incorrectIsbn: true, statusCode: BAD_REQUEST });
    })

    test("Post books - isbn null", async ({ addBooksApi }) => {
        await addBooksApi.postBooks({ isbn: null, userId: userId, token: token, incorrectIsbn: true, statusCode: BAD_REQUEST });
    })
})

test.describe("Positive test case", async () => {

    test("Post books - happy flow", async ({ addBooksApi }) => {
        await addBooksApi.postBooks({ isbn: bookIsbn, userId: userId, token: token });
    })
})

test.afterAll(async ({ addBooksApi }) => {
    await addBooksApi.deleteAllBooks({ userId: userId, token: token });
})
