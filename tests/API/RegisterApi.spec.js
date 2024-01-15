const {test,request, expect} = require('@playwright/test');
const { faker } = require('@faker-js/faker');
//const {ApiUtils} = require("../../utils/ApiUtils");
const urlApi = JSON.parse(JSON.stringify(require('../../fixtures/ApiUrl.json')));
const userData = JSON.parse(JSON.stringify(require('../../fixtures/userData.json')));

let response;
/*test.beforeAll( async()=>
{
   const apiContext = await request.newContext();
   const apiUtils = new APiUtils(apiContext);

})*/

test("Registration successful", async () => {
    const apiContext = await request.newContext();
    const registrationResponse =  await apiContext.post(urlApi.registerApi,
    {
        data: {
            "password" : userData.registration.passwordPass,
            "userName" : userData.registration.username + faker.number.bigInt(100),
        }

     } )//200,201,
    const regResponseJson = await registrationResponse.json();
    console.log(regResponseJson);

})