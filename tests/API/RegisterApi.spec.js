const {test,request, expect} = require('@playwright/test');
const urlApi = JSON.parse(JSON.stringify(require('../../fixtures/ApiUrl.json')));
const userData = JSON.parse(JSON.stringify(require('../../fixtures/userData.json')));
const {UtilsFunctions} = require('../../utils/UtilsFunctions');
const utilsFunctions = new UtilsFunctions();

let apiContext;

test.beforeAll(async() => {
    apiContext = await request.newContext();
})

test("Registration successful", async () => {
    
    const username = userData.registration.username + utilsFunctions.getRandomInt(1000);
    const registrationResponse =  await apiContext.post(urlApi.registerApi,
    {
        data: {
            "password" : userData.registration.passwordPass,
            "userName" : username,
        }

     } )
    expect(registrationResponse.status()).toBe(201);
    const responseBody = await utilsFunctions.parseResText(registrationResponse);
    expect(responseBody.username).toBe(username)

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
    const responseBody = await utilsFunctions.parseResText(registrationResponse);
    expect(responseBody.message).toBe(userData.registration.usernamePresentMessage);

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
    const responseBody = await utilsFunctions.parseResText(registrationResponse);
    expect(responseBody.message).toBe(userData.registration.passwordMessage);

})

test("Registration failed - password empty", async () => {
    
    const registrationResponse =  await apiContext.post(urlApi.registerApi,
    {
        data: {
            "password" : "",
            "userName" : userData.registration.username,
        }

     } )
    expect(registrationResponse.status()).toBe(400);
    const responseBody = await utilsFunctions.parseResText(registrationResponse);
    expect(responseBody.message).toBe(userData.registration.missingCredentialsMessage);

})

test("Registration failed - username empty", async () => {
    
    const registrationResponse =  await apiContext.post(urlApi.registerApi,
    {
        data: {
            "password" : userData.registration.passwordPass,
            "userName" : "",
        }

     } )
    expect(registrationResponse.status()).toBe(400);
    const responseBody = await utilsFunctions.parseResText(registrationResponse);
    expect(responseBody.message).toBe(userData.registration.missingCredentialsMessage);

})