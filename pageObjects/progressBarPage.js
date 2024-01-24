import { expect } from "@playwright/test";

export class ProgressBarPage {

    constructor(page) {
        this.page = page;
        this.startStopBtn = this.page.locator('#startStopButton');
        this.progressBar = this.page.locator('#progressBar > div[role="progressbar"]')
        this.resetBtn = this.page.locator("#resetButton")
    }

    async validateProgressBarFunctionality({
        initialValue = "0",
        endingValue = "100",
        timeoutValue = 5300,
        resetBtnTimeout = 12000,
        pausing = true
    }) {
        await this.page.goto("progress-bar");
        await expect(await this.progressBar).toHaveAttribute("aria-valuenow", initialValue)
        await this.startStopBtn.click();
        if (pausing) {
            await this.progressBar.waitFor({ timeout: timeoutValue });
            await this.startStopBtn.click();
            let currentValue = await this.progressBar.getAttribute('aria-valuenow');
            await expect(Number(await currentValue)).toBeGreaterThan(Number(initialValue));
            await this.startStopBtn.click();
        }
        await this.resetBtn.waitFor({ timeout: resetBtnTimeout });
        await expect(await this.progressBar).toHaveAttribute("aria-valuenow", endingValue)
        await this.resetBtn.click();
        await expect(await this.progressBar).toHaveAttribute("aria-valuenow", initialValue)
    }

}
