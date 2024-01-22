import { chromium, test as baseTest } from "@playwright/test";
//import { General } from "../ui/geters/general";
import { LoginApiUtils } from "../utils/LoginApiUtils";
import { RegistrationApiUtils } from '../utils/RegistrationApiUtils'
import { DeleteUserApiUtils } from "../utils/DeleteUserApiUtils";
import { BookstoreApiUtils } from '../utils/BookstoreApiUtils';
const testPages = baseTest.extend({
    wpage: [
        async ({ }, use, testInfo) => {
            // Configure LambdaTest platform for cross-browser testing
            const browser = await chromium.launch();
            const context = await browser.newContext();
            const page = await context.newPage();
            await use(page);
            await page.close();
            await context.close();
            await browser.close();
        },
        { auto: "true" },
    ],
    // login: async ({ wpage }, use) => {
    //     await use(new Login(wpage));
    // },
    // loginBL: async ({ wpage }, use) => {
    //     await use(new LoginBusinessLogic(wpage));
    // },
    // general: async ({ wpage }, use) => {
    //     await use(new General(wpage));
    // },
    loginApiUtils: async ({ wpage }, use) => {
        await use(new LoginApiUtils(wpage));
    },
    registrationApiUtil: async ({ wpage }, use) => {
        await use(new RegistrationApiUtils(wpage));
    },
    deleteUserApi: async ({ wpage }, use) => {
        await use(new DeleteUserApiUtils);
    },
    addBooksApi: async ({ wpage }, use) => {
        await use(new BookstoreApiUtils);
    }
});
export const test = testPages;
export const expect = testPages.expect;