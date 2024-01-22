const { expect, request } = require('@playwright/test');
const { UtilsFunctions } = require('./UtilsFunctions');
let utilFunctions = new UtilsFunctions();

const urlApi = utilFunctions.parseLocalJson('../fixtures/ApiUrl.json');
const { CREATED } = require('./statusCodes');
export class RegistrationApiUtils {

    async registerUser({
        username = "ep" + utilFunctions.getRandomInt(1000),
        password = "Test123!",
        statusCode = CREATED,
        fail = false,
        errorMessage = ""
    }) {

        const apiContext = await request.newContext();
        const registrationResponse = await apiContext.post(urlApi.registerApi,
            {
                data: utilFunctions.getPayLoad({ username: username, password: password })
            })
        expect.soft(registrationResponse.status()).toBe(statusCode);
        if (!fail) {
            const responseBody = await utilFunctions.parseResText(registrationResponse);
            await expect(responseBody.username).toBe(username);
            return responseBody.userID;
        } else {
            const responseBody = await utilFunctions.parseResText(registrationResponse);
            return await expect(responseBody.message).toBe(errorMessage);
        }
    }
}
