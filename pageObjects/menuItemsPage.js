import { expect } from "../modules/base";

export class MenuItemsPage {
    constructor(page) {
        this.page = page;
        this.mainItemTwo = this.page.locator('#nav li a:has-text("Main Item 2")');
        this.mainItemTwoList = this.page.locator('ul[id="nav"] li > ul > li');
        this.subMenuItem = this.page.locator('ul[id="nav"] li > ul > li:has-text("SUB SUB LIST")');
    }

    async verifyPresenceOfMenuItems({
        menuItems = [0, 1, 2],
        subMenuItems = [0, 1, 2],
        subSubMenuItems = [0, 1],
    }) {
        let chained;
        for await (let menuItem of menuItems) {
            await expect(await this.page.locator('ul[id="nav"] > li').nth(menuItem)).toBeVisible();
        }

        await this.mainItemTwo.hover({ force: true });
        for (let subMenuItem of subMenuItems) {
            await expect.soft(await this.mainItemTwoList.nth(subMenuItem)).toBeVisible();
        }

        await this.subMenuItem.hover({ force: true });
        chained = await this.subMenuItem.locator("ul > li")
        for (let subSubMenuItem of subSubMenuItems) {
            await expect.soft(await chained.nth(subSubMenuItem)).toBeVisible();
        }
    }
}
