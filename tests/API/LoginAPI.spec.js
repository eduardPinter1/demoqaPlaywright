const { test, request, expect } = require('@playwright/test');
const urlApi = JSON.parse(JSON.stringify(require('../../fixtures/ApiUrl.json')));
const userData = JSON.parse(JSON.stringify(require('../../fixtures/userData.json')));
const {UtilsFunctions} = require('../../utils/UtilsFunctions');
const utilsFunctions = new UtilsFunctions();

const credentialsPositive = {
   "password": userData.login.password,
   "userName": userData.login.username
}

const credentialsNegative = {
   "password": userData.login.password,
   "userName": `${userData.login.username}e`
}


let apiContext;

test.beforeAll(async () => {
   apiContext = await request.newContext();
})

test("Successful login", async () => {
   const registrationResponse = await apiContext.post(urlApi.loginApi,
      {
         data: credentialsPositive

      })
   expect(registrationResponse.status()).toBe(200);

})

test("Unsuccessful login", async () => {
   const registrationResponse = await apiContext.post(urlApi.loginApi,
      {
         data: credentialsNegative

      })
   expect(registrationResponse.status()).toBe(200);
   const responseBody = await utilsFunctions.parseResText(registrationResponse);
   expect(responseBody.result).toBe(userData.login.resultMessage)

})

test("Unsuccessful login - password empty", async () => {
   const registrationResponse = await apiContext.post(urlApi.loginApi,
      {
         data: {
            "password": "",
            "userName": userData.login.username,
          }

      })
   expect(registrationResponse.status()).toBe(400);
   const responseBody = await utilsFunctions.parseResText(registrationResponse);
   expect(responseBody.message).toBe(userData.registration.missingCredentialsMessage);

})

test("Unsuccessful login - username empty", async () => {
   const registrationResponse = await apiContext.post(urlApi.loginApi,
      {
         data: {
            "password": userData.login.password,
            "userName": "",
          }

      })
   expect(registrationResponse.status()).toBe(400);
   const responseBody = await utilsFunctions.parseResText(registrationResponse);
   expect(responseBody.message).toBe(userData.registration.missingCredentialsMessage);

})

