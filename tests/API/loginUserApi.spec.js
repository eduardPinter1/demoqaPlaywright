import { test } from '../../modules/base';
const { BAD_REQUEST, OK } = require('../../utils/statusCodes');
const userData = JSON.parse(JSON.stringify(require('../../fixtures/userData.json')));

test.describe("Login flow test cases", async () => {

   test("Unsuccessful login - username empty", async ({ loginApiUtils }) => {
      await loginApiUtils.loginUser({ payload: "usernameEmpty", emptyFields: true, statusCode: BAD_REQUEST, validLogin: false, messageString: userData.registration.missingCredentialsMessage, respMessage: true })
   })

   test("Login - username array", async ({ loginApiUtils }) => {
      await loginApiUtils.loginUser({ payload: "usernameArray", validLogin: false, statusCode: BAD_REQUEST, messageString: userData.login.resultMessage });
   })

   test("Login - username boolean", async ({ loginApiUtils }) => {
      await loginApiUtils.loginUser({ payload: "usernameBoolean", validLogin: false, statusCode: BAD_REQUEST, messageString: userData.login.resultMessage });
   })

   test("Login - username integer", async ({ loginApiUtils }) => {
      await loginApiUtils.loginUser({ payload: "usernameInteger", validLogin: false, statusCode: BAD_REQUEST, messageString: userData.login.resultMessage });
   })

   test("Login - username float", async ({ loginApiUtils }) => {
      await loginApiUtils.loginUser({ payload: "usernameFloat", validLogin: false, statusCode: BAD_REQUEST, messageString: userData.login.resultMessage });

   })

   test("Login - username null", async ({ loginApiUtils }) => {
      await loginApiUtils.loginUser({ payload: "usernameNull", validLogin: false, statusCode: BAD_REQUEST, messageString: userData.registration.missingCredentialsMessage, respMessage: true });
   })

   test("Login - username starting with an empty space", async ({ loginApiUtils }) => {
      await loginApiUtils.loginUser({ payload: "usernameLeftSideEmpty", validLogin: false, statusCode: BAD_REQUEST, messageString: userData.login.resultMessage });
   })

   test("Login - username ending with an empty space", async ({ loginApiUtils }) => {
      await loginApiUtils.loginUser({ payload: "usernameRightSideEmpty", validLogin: false, statusCode: BAD_REQUEST, messageString: userData.login.resultMessage });
   })

   test("Unsuccessful login - password empty", async ({ loginApiUtils }) => {
      await loginApiUtils.loginUser({ payload: "passwordEmpty", emptyFields: true, statusCode: BAD_REQUEST, validLogin: false, messageString: userData.registration.missingCredentialsMessage, respMessage: true })
   })

   test("Login - password array", async ({ loginApiUtils }) => {
      await loginApiUtils.loginUser({ payload: "passwordArray", validLogin: false, statusCode: BAD_REQUEST, messageString: userData.login.resultMessage });
   })

   test("Login - password boolean", async ({ loginApiUtils }) => {
      await loginApiUtils.loginUser({ payload: "passwordBoolean", validLogin: false, statusCode: BAD_REQUEST, messageString: userData.login.resultMessage });
   })

   test("Login - password integer", async ({ loginApiUtils }) => {
      await loginApiUtils.loginUser({ payload: "passwordInteger", validLogin: false, statusCode: BAD_REQUEST, messageString: userData.login.resultMessage });
   })

   test("Login - password float", async ({ loginApiUtils }) => {
      await loginApiUtils.loginUser({ payload: "passwordFloat", validLogin: false, statusCode: BAD_REQUEST, messageString: userData.login.resultMessage });
   })

   test("Login - password null", async ({ loginApiUtils }) => {
      await loginApiUtils.loginUser({ payload: "passwordNull", validLogin: false, statusCode: BAD_REQUEST, messageString: userData.registration.missingCredentialsMessage, respMessage: true });
   })

   test("Login - password starting with an empty space", async ({ loginApiUtils }) => {
      await loginApiUtils.loginUser({ payload: "passwordLeftSideEmpty", validLogin: false, statusCode: BAD_REQUEST, messageString: userData.login.resultMessage });
   })

   test("Login - password ending with an empty space", async ({ loginApiUtils }) => {
      await loginApiUtils.loginUser({ payload: "passwordRightSideEmpty", validLogin: false, statusCode: BAD_REQUEST, messageString: userData.login.resultMessage });
   })

   test("Successful login", async ({ loginApiUtils }) => {
      await loginApiUtils.loginUser({});
   })
})






