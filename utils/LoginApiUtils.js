const { expect, request } = require('@playwright/test');
const { UtilsFunctions } = require('./utilsFunctions');
const { OK } = require('./statusCodes');

let utilFunctions = new UtilsFunctions();
const urlApi = utilFunctions.parseLocalJson('../fixtures/ApiUrl.json');
const userData = utilFunctions.parseLocalJson('../fixtures/userData.json');

export class LoginApiUtils {

    async getTokenAndUserId({
        payload = "validLogin"
    }) {

        let response = {};
        const apiContext = await request.newContext();
        const loginResponse = await apiContext.post(urlApi.generateTokenLogin,
            {
                data: utilFunctions.getPayLoad(payload)
            })
        const loginResponseJson = await loginResponse.json();
        response.token = await loginResponseJson.token;
        const authResp = await apiContext.post(urlApi.loginUserId, {
            data: utilFunctions.getPayLoad(payload),
        })
        const authRespJson = await utilFunctions.parseResText(authResp);
        response.userId = authRespJson.userId;

        return response;
    }

    async loginUser({
        payload = "validLogin",
        validLogin = true,
        statusCode = OK,
        respMessage = false,
        messageString = ""
    }) {
        const apiContext = await request.newContext();
        const loginResp = await apiContext.post(urlApi.generateTokenLogin,
            {
                data: utilFunctions.getPayLoad(payload)
            })
        expect.soft(loginResp.status()).toBe(statusCode);
        if (!validLogin) {
            const responseBody = await utilFunctions.parseResText(loginResp);
            if (!respMessage) {
                return await expect(responseBody.result).toBe(messageString);
            } else {
                return await expect(responseBody.message).toBe(messageString);
            }
        } else {
            await expect.soft((await utilFunctions.parseResText(loginResp)).result).toBe(userData.login.resultMessagePass)
            return await expect((await utilFunctions.parseResText(loginResp)).status).toBe(userData.login.statusPass)
        }
    }

    async authorizeUser({
        payload = "validLogin",
        statusResp = OK,
        fail = false
    }) {
        const apiContext = await request.newContext();
        const response = await apiContext.post(urlApi.authorizeUser,
            {
                data: utilFunctions.getPayLoad(payload)
            })
        expect.soft(response.status()).toBe(statusResp);
        let respJson = await utilFunctions.parseResText(response);
        if (!fail) {
            return expect(respJson).toBe(true);
        } else
            return expect(respJson).toBe(false);
    }
}
