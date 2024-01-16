const { test, request, expect } = require('@playwright/test');
const urlApi = JSON.parse(JSON.stringify(require('../../fixtures/ApiUrl.json')));
const userData = JSON.parse(JSON.stringify(require('../../fixtures/userData.json')));

const credentialsPositive = {
   "password": userData.login.password,
   "userName": userData.login.username,
}

const credentialsNegative = {
   "password": userData.login.password,
   "userName": `${userData.login.username}e`,
}


let apiContext;

test.beforeAll(async () => {
   apiContext = await request.newContext();
})

test("Successful login", async () => {
   const registrationResponse = await apiContext.post(urlApi.loginApi,
      {
         data: { credentialsPositive }

      })
   expect(registrationResponse.status()).toBe(200);

})

test("Unsuccessful login", async () => {
   const registrationResponse = await apiContext.post(urlApi.loginApi,
      {
         data: { credentialsNegative }

      })
   expect(registrationResponse.status()).toBe(200);
   const responseBody = JSON.parse(await registrationResponse.text());
   expect(responseBody.result).toBe(userData.login.resultMessage)

})

