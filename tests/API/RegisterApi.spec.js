import { test } from '../../modules/base';
const { BAD_REQUEST, NOT_ACCEPTABLE } = require('../../utils/statusCodes');
let userData = JSON.parse(JSON.stringify(require('../../fixtures/userData.json')));

test.describe("Positive test cases", async () => {
    let username = "ep" + utilFunctions.getRandomInt(1000);
    test("Registration successful", async ({ registrationApiUtil }) => {
        await registrationApiUtil.registerUser({ username: username });
    })

    test.afterAll('Delete registered user', async ({ loginApiUtils, deleteUserApi }) => {
        let response = await loginApiUtils.getTokenAndUserId({ username: username });
        await loginApiUtils.authorizeUser({ username: username })
        await deleteUserApi.deleteUser({ token: response.token, userId: response.userId });
    })
})

test.describe("Negative test cases", async () => {

    test("Registration failed - user already exists", async ({ registrationApiUtil }) => {
        await registrationApiUtil.registerUser({ username: userData.login.username, fail: true, errorMessage: userData.registration.usernamePresentMessage, statusCode: NOT_ACCEPTABLE });
    })

    test("Register user - username empty", async ({ registrationApiUtil }) => {
        await registrationApiUtil.registerUser({ username: "", statusCode: BAD_REQUEST, fail: true, errorMessage: userData.registration.missingCredentialsMessage })

    })

    test("Register user - username array", async ({ registrationApiUtil }) => {
        await registrationApiUtil.registerUser({ username: ['username'], fail: true, statusCode: BAD_REQUEST, errorMessage: userData.login.resultMessage });

    })

    test("Register user - username boolean", async ({ registrationApiUtil }) => {
        await registrationApiUtil.registerUser({ username: true, fail: true, statusCode: BAD_REQUEST, errorMessage: userData.login.resultMessage });

    })

    test("Register user - username integer", async ({ registrationApiUtil }) => {
        await registrationApiUtil.registerUser({ username: 123, fail: true, statusCode: BAD_REQUEST, errorMessage: userData.login.resultMessage });

    })

    test("Register user - username double", async ({ registrationApiUtil }) => {
        await registrationApiUtil.registerUser({ username: 15.15, fail: true, statusCode: BAD_REQUEST, errorMessage: userData.login.resultMessage });

    })

    test("Register user - username null", async ({ registrationApiUtil }) => {
        await registrationApiUtil.registerUser({ username: null, fail: true, statusCode: BAD_REQUEST, errorMessage: userData.registration.missingCredentialsMessage });

    })

    test("Register user - username starting with an empty space", async ({ registrationApiUtil }) => {
        await registrationApiUtil.registerUser({ username: `$ ${userData.registration.username}`, fail: true, statusCode: BAD_REQUEST, errorMessage: userData.login.resultMessage });

    })

    test("Register user - username ending with an empty space", async ({ registrationApiUtil }) => {
        await registrationApiUtil.registerUser({ username: `${userData.registration.username} $`, fail: true, statusCode: BAD_REQUEST, errorMessage: userData.login.resultMessage });

    })

    test("Register - password empty", async ({ registrationApiUtil }) => {
        await registrationApiUtil.registerUser({ password: "", statusCode: BAD_REQUEST, fail: true, errorMessage: userData.registration.missingCredentialsMessage })

    })

    test("Register - password array", async ({ registrationApiUtil }) => {
        await registrationApiUtil.registerUser({ password: ['password'], fail: true, statusCode: BAD_REQUEST, errorMessage: userData.login.resultMessage });

    })

    test("Register - password boolean", async ({ registrationApiUtil }) => {
        await registrationApiUtil.registerUser({ password: true, fail: true, statusCode: BAD_REQUEST, errorMessage: userData.login.resultMessage });

    })

    test("Register - password integer", async ({ registrationApiUtil }) => {
        await registrationApiUtil.registerUser({ password: 123, fail: true, statusCode: BAD_REQUEST, errorMessage: userData.login.resultMessage });

    })

    test("Register - password double", async ({ registrationApiUtil }) => {
        await registrationApiUtil.registerUser({ password: 15.15, fail: true, statusCode: BAD_REQUEST, errorMessage: userData.login.resultMessage });

    })

    test("Register - password null", async ({ registrationApiUtil }) => {
        await registrationApiUtil.registerUser({ password: null, fail: true, statusCode: BAD_REQUEST, errorMessage: userData.registration.missingCredentialsMessage });

    })

    test("Register - password starting with an empty space", async ({ registrationApiUtil }) => {
        await registrationApiUtil.registerUser({ password: ` ${userData.registration.password}`, fail: true, statusCode: BAD_REQUEST, errorMessage: userData.registration.passwordMessage });

    })

    test("Register - password ending with an empty space", async ({ registrationApiUtil }) => {
        await registrationApiUtil.registerUser({ password: `${userData.registration.password} `, fail: true, statusCode: BAD_REQUEST, errorMessage: userData.registration.passwordMessage });

    })
})
