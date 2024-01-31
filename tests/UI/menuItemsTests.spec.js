import { test } from '../../modules/base';

test.beforeEach(async ({ wpage }) => {
    await wpage.goto("menu#");
})

test("Menu items and interactions", async ({ menuItemsPage }) => {
    await menuItemsPage.verifyPresenceOfMenuItems({})
})
