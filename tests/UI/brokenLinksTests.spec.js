import { test } from '../../modules/base';

test("Check broken link", async ({ brokenLinksPage }) => {
    await brokenLinksPage.checkLinks({ statusCode: 500 });
})

test("Check valid link", async ({ brokenLinksPage }) => {
    await brokenLinksPage.checkLinks({
        url: process.env.BASE_URL,
        linkValid: true,
        statusCode: 200
    })
})

test("Check broken image", async ({ brokenLinksPage }) => {
    await brokenLinksPage.checkImages({})
})

test("Check not broken image", async ({ brokenLinksPage }) => {
    await brokenLinksPage.checkImages({ broken: false })
})
