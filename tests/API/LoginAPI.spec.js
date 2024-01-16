const { test, request } = require('@playwright/test');
const { BAD_REQUEST, NOT_ACCEPTABLE, OK } = require('../../utils/statusCodes');
const userData = JSON.parse(JSON.stringify(require('../../fixtures/userData.json')));
const { ApiUtils } = require('../../utils/ApiUtils');

let apiUtil;
let apiContext;

let credentials = {
   "password": userData.login.password,
   "userName": userData.login.username
}

test.beforeAll(async () => {
   apiContext = await request.newContext();
   apiUtil = new ApiUtils(apiContext);
})

test("Successful login", async () => {
   await apiUtil.validLogin(credentials, OK);

})

test("Unsuccessful login", async () => {
   credentials.userName = `${userData.login.username}e`
   await apiUtil.nonValidLogin(credentials, NOT_ACCEPTABLE, false, userData.login.resultMessage);

})

test("Unsuccessful login - password empty", async () => {
   credentials.password = "";
   await apiUtil.nonValidLogin(credentials, BAD_REQUEST, true, userData.registration.missingCredentialsMessage)

})

test("Unsuccessful login - username empty", async () => {
   credentials.userName = "";
   await apiUtil.nonValidLogin(credentials, BAD_REQUEST, true, userData.registration.missingCredentialsMessage)

})

