const { test, request, expect } = require('@playwright/test');
const { faker } = require('@faker-js/faker');
//const {ApiUtils} = require("../../utils/ApiUtils");
const urlApi = JSON.parse(JSON.stringify(require('../../fixtures/ApiUrl.json')));
const userData = JSON.parse(JSON.stringify(require('../../fixtures/userData.json')));
const { UtilsFunctions } = require('../../utils/UtilsFunctions');
const utilsFunctions = new UtilsFunctions();
const { RegistrationApiUtils } = require('../../utils/RegistrationApiUtils');

let apiUtil;
let apiContext;

let userCred = {
    "password": userData.registration.passwordPass,
    "userName": userData.login.username,
}

test.beforeAll(async () => {
    apiContext = await request.newContext();
    apiUtil = new RegistrationApiUtils(apiContext);
})

test("Registration successful", async () => {
    userCred.userName = userData.registration.username + utilsFunctions.getRandomInt(1000);
    await apiUtil.validRegistration(userCred, CREATED, userCred.userName);

})

test("Registration failed - user already exists", async () => {
    userCred.password = userData.registration.passwordPass;
    userCred.userName = userData.registration.username;
    apiUtil.nonValidRegistration(userCred, NOT_ACCEPTABLE, userData.registration.usernamePresentMessage);

})

test("Registration failed - password conditions not met", async () => {
    userCred.password = userData.registration.passwordWrong;
    await apiUtil.nonValidRegistration(userCred, BAD_REQUEST, userData.registration.passwordMessage)

})

test("Registration failed - password empty", async () => {
    userCred.password = "";
    await apiUtil.nonValidRegistration(userCred, BAD_REQUEST, userData.registration.missingCredentialsMessage)

})

test("Registration failed - username empty", async () => {
    userCred.userName = "";
    await apiUtil.nonValidRegistration(userCred, BAD_REQUEST, userData.registration.missingCredentialsMessage)

})