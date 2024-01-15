const {test,request, expect} = require('@playwright/test');
const { faker } = require('@faker-js/faker');
const urlApi = JSON.parse(JSON.stringify(require('../../fixtures/ApiUrl.json')));
const userData = JSON.parse(JSON.stringify(require('../../fixtures/userData.json')));

let apiContext;

test.beforeAll(async() => {
    apiContext = await request.newContext();
})

test("Registration successful", async () => {
    
    const randomNum = faker.number.bigInt(1000);
    const username = userData.registration.username + randomNum;
    const registrationResponse =  await apiContext.post(urlApi.registerApi,
    {
        data: {
            "password" : userData.registration.passwordPass,
            "userName" : username,
        }

     } )
    expect(registrationResponse.status()).toBe(201);
    const responseBody = JSON.parse(await registrationResponse.text());
    console.log(responseBody.username);
    expect(responseBody.username).toBe(username)
    const regResponseJson = await registrationResponse.json();
    console.log(regResponseJson);

})

test("Registration failed - user already exists", async () => {
        const registrationResponse =  await apiContext.post(urlApi.registerApi,
    {
        data: {
            "password" : userData.registration.passwordPass,
            "userName" : userData.login.username,
        }

     } )
    expect(registrationResponse.status()).toBe(406);
    const responseBody = JSON.parse(await registrationResponse.text());
    console.log(responseBody.message);
    expect(responseBody.message).toBe(userData.registration.usernamePresent);
})

test("Registration failed - password conditions not met", async () => {
    
    const registrationResponse =  await apiContext.post(urlApi.registerApi,
    {
        data: {
            "password" : userData.registration.passwordWrong,
            "userName" : userData.registration.username,
        }

     } )
    expect(registrationResponse.status()).toBe(400);
    const responseBody = JSON.parse(await registrationResponse.text());
    expect(responseBody.message).toBe(userData.registration.passwordMessage);

})