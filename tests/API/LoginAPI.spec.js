//e p ep - user exist
const {test,request, expect} = require('@playwright/test');
const urlApi = JSON.parse(JSON.stringify(require('../../fixtures/ApiUrl.json')));
const userData = JSON.parse(JSON.stringify(require('../../fixtures/userData.json')));


let apiContext;

test.beforeAll(async() => {
   apiContext = await request.newContext();
})

test("Successful login", async () => {
   const registrationResponse =  await apiContext.post(urlApi.loginApi,
   {
       data: {
           "password" : userData.login.password,
           "userName" : userData.login.username,
       }

    } )
   expect(registrationResponse.status()).toBe(200);

})

test("Unsuccessful login", async () => {
   const registrationResponse =  await apiContext.post(urlApi.loginApi,
   {
       data: {
           "password" : userData.login.password,
           "userName" : userData.login.username+"e",
       }

    } )
   expect(registrationResponse.status()).toBe(200);
   const responseBody = JSON.parse(await registrationResponse.text());
   expect(responseBody.result).toBe(userData.login.resultMessage)

})

