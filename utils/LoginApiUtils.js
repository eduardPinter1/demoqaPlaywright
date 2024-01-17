const { expect } = require('@playwright/test');
const urlApi = JSON.parse(JSON.stringify(require('../fixtures/ApiUrl.json')));
const userData = JSON.parse(JSON.stringify(require('../fixtures/userData.json')));
const { UtilsFunctions } = require('./UtilsFunctions');

class LoginApiUtils {

    constructor(apiContext) {
        this.apiContext = apiContext;
        this.utilsFunctions = new UtilsFunctions();

    }

    async getTokenAndUserId(userPayLoad) {

        let response = {};
        const loginResponse = await this.apiContext.post(urlApi.generateTokenLogin,
            {
                data: userPayLoad
            })

        const loginResponseJson = await loginResponse.json();
        const token = await loginResponseJson.token;
        const authResp = await this.apiContext.post(urlApi.loginUserId, {
            data: {
                "password": "Test123!",
                "userName": "ep3"
            },
            headers: {
                'Accept': '*/*',
                'Connection': "keep-alive",
                'Content-Type': 'application/json',

            },
        })
        const authRespJson = await this.utilsFunctions.parseResText(authResp);
        response.token = token;
        response.userId = authRespJson.userId;
        return response;
    }

    async validLogin(credentials, statusCode) {
        const registrationResponse = await this.apiContext.post(urlApi.generateTokenLogin,
            {
                data: credentials

            })
        expect(registrationResponse.status()).toBe(statusCode);
    }

    async nonValidLogin(credentials, statusCode, emptyFields = true, errorMessage) {
        const registrationResponse = await this.apiContext.post(urlApi.generateTokenLogin,
            {
                data: credentials

            })
        expect(registrationResponse.status()).toBe(statusCode);
        const responseBody = await this.utilsFunctions.parseResText(registrationResponse);
        if (!emptyFields) {
            await expect(responseBody.result).toBe(errorMessage);
            return;
        }

        await expect(responseBody.message).toBe(errorMessage);
        return;

    }

}

module.exports = { LoginApiUtils };
