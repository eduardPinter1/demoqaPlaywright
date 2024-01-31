import { expect } from "@playwright/test";

export class BrokenLinksPage {

    constructor(page) {
        this.page = page;
        this.brokenLink = this.page.locator('a:has-text("Click Here for Broken Link")');
        this.validLink = this.page.locator('a:has-text("Click Here for Valid Link")');
        this.goodImg = this.page.locator('div > img[src="/images/Toolsqa.jpg"]');
        this.brokenImg = this.page.locator('div > img[src="/images/Toolsqa_1.jpg"]');
    }

    async checkLinks({
        url = `http://the-internet.herokuapp.com/status_codes/500`,
        statusCode = 500,
        linkValid = false
    }) {
        let status;
        await this.page.goto("broken");
        await this.page.route(url, async route => {
            const response = await route.fetch();
            status = response.status();
            route.continue();
        })
        if (!linkValid) {
            await this.brokenLink.scrollIntoViewIfNeeded();
            await this.brokenLink.click();

            return await expect(status).toBe(statusCode);
        }
        await this.validLink.scrollIntoViewIfNeeded()
        await this.validLink.click();
        expect(this.page.url()).toBe(url);
    }

    async checkImages({
        broken = true
    }) {
        await this.page.goto("broken");
        if (broken) {
            return await this.handleImage({ broken: true });
        }
        await this.handleImage({ broken: false });
    }

    async handleImage({
        broken = true
    }) {
        let box;
        let urlToImg;
        if (broken) {
            box = await this.brokenImg.boundingBox();
            expect.soft(box.width, "Broken image should be having width and heigh at 16px").toBe(16);
            expect.soft(box.height, "Broken image should be having width and heigh at 16px").toBe(16);
            await this.page.goto(await this.brokenImg.getAttribute('src'))
            urlToImg = this.page.url();
        } else {
            box = await this.goodImg.boundingBox();
            expect.soft(box.width, "Loaded images should be having width and heigh more 16px").toBeGreaterThan(16);
            expect.soft(box.height, "Loaded images should be having width and heigh more 16px").toBeGreaterThan(16);
            await this.page.goto(await this.goodImg.getAttribute('src'))
            urlToImg = this.page.url();
        }
        await this.page.locator(`img[src='${urlToImg}']`).isVisible();
        expect(await this.page.locator(`img[src='${urlToImg}']`)).toBeVisible();
    }

}
