import { test } from '../../modules/base';
const { BAD_REQUEST, OK } = require('../../utils/statusCodes');
const { UtilsFunctions } = require('../../utils/UtilsFunctions');
let utilFunctions = new UtilsFunctions();
const userData = JSON.parse(JSON.stringify(require('../../fixtures/userData.json')));

test.beforeAll(async ({ }) => {

})
test.describe("Positive test cases", async () => {
   test.only("Successful login", async ({ loginApiUtils }) => {
      await loginApiUtils.loginUser({});
   })
})

test.describe("Negative cases", async () => {
   test("Unsuccessful login", async ({ loginApiUtils }) => {
      await loginApiUtils.loginUser({ userName: "e", validLogin: false, statusCode: OK, messageString: userData.login.resultMessage });
   })

   test("Unsuccessful login - username empty", async ({ loginApiUtils }) => {
      await loginApiUtils.loginUser({ userName: "", emptyFields: true, statusCode: BAD_REQUEST, validLogin: false, messageString: userData.registration.missingCredentialsMessage, respMessage: true })
   })

   test("Login - username array", async ({ loginApiUtils }) => {
      await loginApiUtils.loginUser({ userName: ['username'], validLogin: false, statusCode: BAD_REQUEST, messageString: userData.login.resultMessage });
   })

   test("Login - username boolean", async ({ loginApiUtils }) => {
      await loginApiUtils.loginUser({ userName: true, validLogin: false, statusCode: BAD_REQUEST, messageString: userData.login.resultMessage });
   })

   test("Login - username integer", async ({ loginApiUtils }) => {
      await loginApiUtils.loginUser({ userName: 123, validLogin: false, statusCode: BAD_REQUEST, messageString: userData.login.resultMessage });
   })

   test("Login - username double", async ({ loginApiUtils }) => {
      await loginApiUtils.loginUser({ userName: 15.15, validLogin: false, statusCode: BAD_REQUEST, messageString: userData.login.resultMessage });

   })

   test("Login - username null", async ({ loginApiUtils }) => {
      await loginApiUtils.loginUser({ userName: null, validLogin: false, statusCode: BAD_REQUEST, messageString: userData.registration.missingCredentialsMessage, respMessage: true });
   })

   test("Login - username starting with an empty space", async ({ loginApiUtils }) => {
      await loginApiUtils.loginUser({ userName: ` ${userData.username}`, validLogin: false, statusCode: BAD_REQUEST, messageString: userData.login.resultMessage });
   })

   test("Login - username ending with an empty space", async ({ loginApiUtils }) => {
      await loginApiUtils.loginUser({ userName: `${userData.username} `, validLogin: false, statusCode: BAD_REQUEST, messageString: userData.login.resultMessage });
   })

   test("Unsuccessful login - password empty", async ({ loginApiUtils }) => {
      await loginApiUtils.loginUser({ password: "", emptyFields: true, statusCode: BAD_REQUEST, validLogin: false, messageString: userData.registration.missingCredentialsMessage, respMessage: true })
   })

   test("Login - password array", async ({ loginApiUtils }) => {
      await loginApiUtils.loginUser({ password: ['username'], validLogin: false, statusCode: BAD_REQUEST, messageString: userData.login.resultMessage });
   })

   test("Login - password boolean", async ({ loginApiUtils }) => {
      await loginApiUtils.loginUser({ password: true, validLogin: false, statusCode: BAD_REQUEST, messageString: userData.login.resultMessage });
   })

   test("Login - password integer", async ({ loginApiUtils }) => {
      await loginApiUtils.loginUser({ password: 123, validLogin: false, statusCode: BAD_REQUEST, messageString: userData.login.resultMessage });
   })

   test("Login - password double", async ({ loginApiUtils }) => {
      await loginApiUtils.loginUser({ password: 15.15, validLogin: false, statusCode: BAD_REQUEST, messageString: userData.login.resultMessage });
   })

   test("Login - password null", async ({ loginApiUtils }) => {
      await loginApiUtils.loginUser({ password: null, validLogin: false, statusCode: BAD_REQUEST, messageString: userData.registration.missingCredentialsMessage, respMessage: true });
   })

   test("Login - password starting with an empty space", async ({ loginApiUtils }) => {
      await loginApiUtils.loginUser({ password: ` ${userData.password}`, validLogin: false, statusCode: BAD_REQUEST, messageString: userData.login.resultMessage });
   })

   test("Login - password ending with an empty space", async ({ loginApiUtils }) => {
      await loginApiUtils.loginUser({ password: `${userData.password} `, validLogin: false, statusCode: BAD_REQUEST, messageString: userData.login.resultMessage });
   })
})






