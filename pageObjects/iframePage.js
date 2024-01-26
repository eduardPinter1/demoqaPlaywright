import { expect } from '@playwright/test';

export class IframePage {

    constructor(page) {
        this.page = page;
    }

    async validateFrameAndTextElement({
        frames = [],
        text = ""
    }) {
        for await (const frameId of frames) {
            await expect(await this.page.locator(`#${frameId}`)).toBeAttached();
            const frame = await this.page.frameLocator(`#${frameId}`);
            await expect(await frame.locator("#sampleHeading")).toHaveText(text);
        }
    }
}
