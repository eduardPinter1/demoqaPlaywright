const { expect, request } = require('@playwright/test');
const { UtilsFunctions } = require('./utilsFunctions');
const { OK } = require('./statusCodes');

let utilFunctions = new UtilsFunctions();
const urlApi = utilFunctions.parseLocalJson('../fixtures/ApiUrl.json');
const userData = utilFunctions.parseLocalJson('../fixtures/userData.json');

export class LoginApiUtils {

    async getTokenAndUserId({
        username = "ep3",
        password = "Test123!",
        parameterOne = "post",
        parameterTwo = "post"
    }) {

        let response = {};
        const apiContext = await request.newContext();
        const loginResponse = await apiContext[parameterOne](urlApi.generateTokenLogin,
            {
                data: {
                    "password": password,
                    "userName": username
                }
            })
        const loginResponseJson = await loginResponse.json();
        response.token = await loginResponseJson.token;
        const authResp = await apiContext[parameterTwo](urlApi.loginUserId, {
            data: {
                "password": password,
                "userName": userName
            }
        })
        const authRespJson = await utilFunctions.parseResText(authResp);
        response.userId = authRespJson.userId;

        return response;
    }

    async loginUser({
        username = "ep3",
        password = "Test123!",
        validLogin = true,
        statusCode = OK,
        respMessage = false,
        messageString = "",
        parameter = "post"
    }) {
        const apiContext = await request.newContext();
        const loginResp = await apiContext[parameter](urlApi.generateTokenLogin,
            {
                data: {
                    "password": password,
                    "userName": username
                }
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
        fail = false,
        parameter = "post"
    }) {
        const apiContext = await request.newContext();
        const response = await apiContext[parameter](urlApi.authorizeUser,
            {
                data: {
                    "password": password,
                    "userName": username
                }
            })
        expect.soft(response.status()).toBe(statusResp);
        let respJson = await utilFunctions.parseResText(response);
        if (!fail) {
            return expect(respJson).toBe(true);
        } else
            return expect(respJson).toBe(false);
    }
}
