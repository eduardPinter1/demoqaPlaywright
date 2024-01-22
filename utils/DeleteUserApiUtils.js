const { expect, request } = require('@playwright/test');
const { DELETED } = require('./statusCodes');
const { UtilsFunctions } = require('./UtilsFunctions');
let utilFunctions = new UtilsFunctions();

export class DeleteUserApiUtils {


    async deleteUser({
        token = "",
        userId = "",
        url = `Account/v1/User/${userId}`,
        statusCode = DELETED }) {
        const apiContext = await request.newContext();
        const deleteUserApi = await apiContext.delete(url, {
            headers: utilFunctions.getHeaders(token),
        })
        expect(await deleteUserApi.status()).toBe(statusCode);

    }
}
