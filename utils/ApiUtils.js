const { expect } = require('@playwright/test');

const urlApi = JSON.parse(JSON.stringify(require('../fixtures/ApiUrl.json')));

const {UtilsFunctions} = require('../utils/UtilsFunctions');
let utilsFunctions

class ApiUtils
{

    constructor(apiContext)
    {
        this.apiContext =apiContext;
        this.utilsFunctions = new UtilsFunctions(); 
        
    }



    async getToken(loginPayLoad)
     {
        let response = {};
        const loginResponse =  await  this.apiContext.post("https://demoqa.com/Account/v1/GenerateToken",
        {
            data:loginPayLoad
         })
         const authResponse =  await  this.apiContext.post("https://demoqa.com/Account/v1/Login",
         {
             data:loginPayLoad
          })
        const loginResponseJson = await loginResponse.json();
        const authResJson = await authResponse.json();
        console.log("AUTH: "+authResJson);
        const token = await loginResponseJson.token;
        console.log("TOKEN: "+ token);
        response.token = await this.token;
        response.userId = await authResJson.userId;
        
        return response;
    }

    async validLogin(credentials, statusCode){
        const registrationResponse = await this.apiContext.post(urlApi.loginApi,
            {
               data: credentials
      
            })
         expect(registrationResponse.status()).toBe(statusCode);
    }

    async nonValidLogin(credentials, statusCode, emptyFields, errorMessage){
        const registrationResponse = await this.apiContext.post(urlApi.loginApi,
            {
               data: credentials
      
            })
         expect(registrationResponse.status()).toBe(statusCode);
         const responseBody = await this.utilsFunctions.parseResText(registrationResponse);
         if(emptyFields === true){
            await expect(responseBody.message).toBe(errorMessage)
         }
         else
         await expect(responseBody.result).toBe(errorMessage)
         
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
module.exports = {ApiUtils};
