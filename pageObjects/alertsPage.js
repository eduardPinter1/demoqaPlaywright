import test, { expect } from "@playwright/test";

export class AlertsPage {

    constructor(page) {
        this.page = page;
        this.alertBtn = this.page.locator('#alertButton');
        this.timedAlertBtn = this.page.locator('#timerAlertButton');
        this.confirmBoxBtn = this.page.locator("#confirmButton");
        this.confirmResult = this.page.locator("#confirmResult");
        this.promptBoxBtn = this.page.locator("#promtButton");
        this.promptResult = this.page.locator("#promptResult");
    }

    async verifyAlertPresence({
        boxType = "",
        alertMessage = "",
        dialogInput = "Testing123",
        action = "accept"
    }) {
        await this.page.goto("alerts");
        await this.page.on('dialog', async dialog => {
            expect(await dialog.type()).toBe(boxType);
            expect(await dialog.message()).toContain(alertMessage);
            if (boxType === "prompt") {
                await dialog.accept(dialogInput);
                return;
            }
            action === "accept" ? await dialog.accept() : await dialog.dismiss();
        })
        switch (boxType) {
            case "alert":
                await this.alertBtn.click();
                break;
            case "confirm":
                await this.confirmBoxBtn.click();
                if (action === "accept") {
                    await this.confirmResult.waitFor();
                    await this.page.waitForTimeout(5000);
                    await expect(await this.confirmResult).toHaveText("You selected Ok");

                    return;
                }
                await this.confirmResult.waitFor();
                await expect(await this.confirmResult).toHaveText("You selected Cancel")
                break;
            case "prompt":
                await this.promptBoxBtn.click();
                await this.promptResult.waitFor();
                await expect(await this.promptResult).toHaveText(`You entered ${dialogInput}`);
                break;
            default:
                throw new Error("Box type not supported");

        }

    }
}
