import { chromium, test as baseTest } from "@playwright/test";
import { LoginApiUtils } from "../utils/loginApiUtils";
import { RegistrationApiUtils } from '../utils/registrationApiUtils'
import { DeleteUserApiUtils } from "../utils/deleteUserApiUtils";
import { BookstoreApiUtils } from '../utils/bookstoreApiUtils';
import { WebTablesPage } from "../pageObjects/webTablesPage";
import { BrokenLinksPage } from "../pageObjects/brokenLinksPage";
import { AlertsPage } from "../pageObjects/alertsPage";
import { UploadDownloadPage } from "../pageObjects/uploadDownloadPage";
import { ProgressBarPage } from "../pageObjects/progressBarPage";
import { PractiseFormPage } from "../pageObjects/practiseFormPage";
import { IframePage } from "../pageObjects/iframePage";

const testPages = baseTest.extend({
    wpage: [
        async ({ }, use, testInfo) => {
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
    },
    webTablesPage: async ({ wpage }, use) => {
        await use(new WebTablesPage(wpage));
    },
    brokenLinksPage: async ({ wpage }, use) => {
        await use(new BrokenLinksPage(wpage));
    },
    alertPage: async ({ wpage }, use) => {
        await use(new AlertsPage(wpage));
    },
    uploadDownload: async ({ wpage }, use) => {
        await use(new UploadDownloadPage(wpage));
    },
    progressBarPage: async ({ wpage }, use) => {
        await use(new ProgressBarPage(wpage));
    },
    practiseForm: async ({ wpage }, use) => {
        await use(new PractiseFormPage(wpage));
    }
    ,
    iframePage: async ({ wpage }, use) => {
        await use(new IframePage(wpage));
    }
});
export const test = testPages;
export const expect = testPages.expect;