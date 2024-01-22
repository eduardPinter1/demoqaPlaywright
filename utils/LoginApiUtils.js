const { expect, request } = require('@playwright/test');
const { UtilsFunctions } = require('./UtilsFunctions');
const { OK } = require('./statusCodes');

let utilFunctions = new UtilsFunctions();
const urlApi = utilFunctions.parseLocalJson('../fixtures/ApiUrl.json');
const userData = utilFunctions.parseLocalJson('../fixtures/userData.json');

export class LoginApiUtils {

    async getTokenAndUserId({
        username = "ep3",
        password = "Test123!"
    }) {

        let response = {};
        const apiContext = await request.newContext();
        const loginResponse = await apiContext.post(urlApi.generateTokenLogin,
            {
                data: utilFunctions.getPayLoad({ username: username, password: password })
            })
        const loginResponseJson = await loginResponse.json();
        response.token = await loginResponseJson.token;
        const authResp = await apiContext.post(urlApi.loginUserId, {
            data: utilFunctions.getPayLoad({ username: username, password: password }),
            headers: {
                'Accept': '*/*',
                'Connection': "keep-alive",
                'Content-Type': 'application/json',
            },
        })
        const authRespJson = await utilFunctions.parseResText(authResp);
        response.userId = authRespJson.userId;

        return response;
    }

    async loginUser({
        userName = "ep3",
        password = "Test123!",
        validLogin = true,
        statusCode = OK,
        respMessage = false,
        messageString = ""
    }) {
        const apiContext = await request.newContext();
        const loginResp = await apiContext.post(urlApi.generateTokenLogin,
            {
                data: utilFunctions.getPayLoad({ username: userName, password: password })
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
        username = "ep3",
        password = "Test123!",
        statusResp = OK,
        fail = false
    }) {
        const apiContext = await request.newContext();
        const response = await apiContext.post(urlApi.authorizeUser,
            {
                data: utilFunctions.getPayLoad({ username: username, password: password })
            })
        expect.soft(response.status()).toBe(statusResp);
        let respJson = await utilFunctions.parseResText(response);
        if (!fail) {
            return expect(respJson).toBe(true);
        } else
            return expect(respJson).toBe(false);
    }
}
