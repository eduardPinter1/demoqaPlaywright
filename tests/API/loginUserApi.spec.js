import { test } from '../../modules/base';
const { BAD_REQUEST, OK } = require('../../utils/statusCodes');
const userData = JSON.parse(JSON.stringify(require('../../fixtures/userData.json')));

test.describe("Username variations", async () => {
   test("Unsuccessful login - username empty", async ({ loginApiUtils }) => {
      await loginApiUtils.loginUser({ username: userData.negativeDataVariations.usernameEmpty, emptyFields: true, statusCode: BAD_REQUEST, validLogin: false, messageString: userData.registration.missingCredentialsMessage, respMessage: true })
   })

   test("Login - username array", async ({ loginApiUtils }) => {
      await loginApiUtils.loginUser({ username: userData.negativeDataVariations.usernameArray, validLogin: false, statusCode: BAD_REQUEST, messageString: userData.login.resultMessage });
   })

   test("Login - username boolean", async ({ loginApiUtils }) => {
      await loginApiUtils.loginUser({ username: userData.negativeDataVariations.usernameBoolean, validLogin: false, statusCode: BAD_REQUEST, messageString: userData.login.resultMessage });
   })

   test("Login - username integer", async ({ loginApiUtils }) => {
      await loginApiUtils.loginUser({ username: userData.negativeDataVariations.usernameInteger, validLogin: false, statusCode: BAD_REQUEST, messageString: userData.login.resultMessage });
   })

   test("Login - username float", async ({ loginApiUtils }) => {
      await loginApiUtils.loginUser({ username: userData.negativeDataVariations.usernameFloat, validLogin: false, statusCode: BAD_REQUEST, messageString: userData.login.resultMessage });
   })

   test("Login - username null", async ({ loginApiUtils }) => {
      await loginApiUtils.loginUser({ username: userData.negativeDataVariations.usernameNull, validLogin: false, statusCode: BAD_REQUEST, messageString: userData.registration.missingCredentialsMessage, respMessage: true });
   })

   test("Login - username starting with an empty space", async ({ loginApiUtils }) => {
      await loginApiUtils.loginUser({ username: userData.negativeDataVariations.usernameSpcLeft, validLogin: false, statusCode: BAD_REQUEST, messageString: userData.login.resultMessage });
   })

   test("Login - username ending with an empty space", async ({ loginApiUtils }) => {
      await loginApiUtils.loginUser({ username: userData.negativeDataVariations.usernameSpcRight, validLogin: false, statusCode: BAD_REQUEST, messageString: userData.login.resultMessage });
   })
})

test.describe("Password variations", async () => {

   test("Unsuccessful login - password empty", async ({ loginApiUtils }) => {
      await loginApiUtils.loginUser({ password: userData.negativeDataVariations.passwordEmpty, emptyFields: true, statusCode: BAD_REQUEST, validLogin: false, messageString: userData.registration.missingCredentialsMessage, respMessage: true })
   })

   test("Login - password array", async ({ loginApiUtils }) => {
      await loginApiUtils.loginUser({ password: userData.negativeDataVariations.passwordArray, validLogin: false, statusCode: BAD_REQUEST, messageString: userData.login.resultMessage });
   })

   test("Login - password boolean", async ({ loginApiUtils }) => {
      await loginApiUtils.loginUser({ password: userData.negativeDataVariations.passwordBoolean, validLogin: false, statusCode: BAD_REQUEST, messageString: userData.login.resultMessage });
   })

   test("Login - password integer", async ({ loginApiUtils }) => {
      await loginApiUtils.loginUser({ password: userData.negativeDataVariations.passwordInteger, validLogin: false, statusCode: BAD_REQUEST, messageString: userData.login.resultMessage });
   })

   test("Login - password float", async ({ loginApiUtils }) => {
      await loginApiUtils.loginUser({ password: userData.negativeDataVariations.passwordFloat, validLogin: false, statusCode: BAD_REQUEST, messageString: userData.login.resultMessage });
   })

   test("Login - password null", async ({ loginApiUtils }) => {
      await loginApiUtils.loginUser({ password: userData.negativeDataVariations.passwordNull, validLogin: false, statusCode: BAD_REQUEST, messageString: userData.registration.missingCredentialsMessage, respMessage: true });
   })

   test("Login - password starting with an empty space", async ({ loginApiUtils }) => {
      await loginApiUtils.loginUser({ password: userData.negativeDataVariations.passwordLeftSideEmpty, validLogin: false, statusCode: BAD_REQUEST, messageString: userData.login.resultMessage });
   })

   test("Login - password ending with an empty space", async ({ loginApiUtils }) => {
      await loginApiUtils.loginUser({ ppassword: userData.negativeDataVariations.passwordRightSideEmpty, validLogin: false, statusCode: BAD_REQUEST, messageString: userData.login.resultMessage });
   })

   test("Successful login", async ({ loginApiUtils }) => {
      await loginApiUtils.loginUser({});
   })
})
