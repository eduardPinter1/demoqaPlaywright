import { test } from '../../modules/base';
const data = JSON.parse(JSON.stringify(require('../../fixtures/testData.json')));

test.beforeEach(async ({ wpage }) => {
    await wpage.goto("menu#");
})

test("Menu items and interactions", async ({ menuItemsPage }) => {
    await menuItemsPage.verifyPresenceOfMenuItems({})
})
