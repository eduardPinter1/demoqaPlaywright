import { test } from '../../modules/base';
import { OK, SERVER_ERROR } from '../../utils/statusCodes';

test("Check broken link", async ({ brokenLinksPage }) => {
    await brokenLinksPage.checkLinks({ statusCode: SERVER_ERROR });
})

test("Check valid link", async ({ brokenLinksPage }) => {
    await brokenLinksPage.checkLinks({
        url: process.env.BASE_URL,
        linkValid: true,
        statusCode: OK
    })
})

test("Check broken image", async ({ brokenLinksPage }) => {
    await brokenLinksPage.checkImages({})
})

test("Check not broken image", async ({ brokenLinksPage }) => {
    await brokenLinksPage.checkImages({ broken: false })
})
