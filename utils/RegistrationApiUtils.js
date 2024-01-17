const { expect } = require('@playwright/test');

const urlApi = JSON.parse(JSON.stringify(require('../fixtures/ApiUrl.json')));

const {UtilsFunctions} = require('./UtilsFunctions');

class RegistrationApiUtils
{

    constructor(apiContext)
    {
        this.apiContext =apiContext;
        this.utilsFunctions = new UtilsFunctions(); 
        
    }

    async validRegistration(credentials,statusCode,username){
        const registrationResponse =  await this.apiContext.post(urlApi.registerApi,
            {
                data: credentials
        
             } )
            expect(registrationResponse.status()).toBe(statusCode);
            const responseBody = await this.utilsFunctions.parseResText(registrationResponse);
            await expect(responseBody.username).toBe(username)
    }

    async nonValidRegistration(credentials,statusCode, errorMessage){
        const registrationResponse =  await this.apiContext.post(urlApi.registerApi,
            {
                data: credentials
        
             })
            expect(registrationResponse.status()).toBe(statusCode);
            const responseBody = await this.utilsFunctions.parseResText(registrationResponse);
            await expect(responseBody.message).toBe(errorMessage);
    }


}
module.exports = {RegistrationApiUtils};
