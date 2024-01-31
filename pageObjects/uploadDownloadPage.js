import { expect } from "@playwright/test";
const fs = require('fs');

export class UploadDownloadPage {

    constructor(page) {
        this.page = page;
        this.downloadBtn = this.page.locator('#downloadButton');
        this.uploadFile = this.page.locator('#uploadFile');
        this.uploadedFilePath = this.page.locator("#uploadedFilePath")
    }

    async downloadFile({
        downloadPath = "download/"
    }) {
        await this.page.goto("upload-download");
        const [downloadPromise] = await Promise.all([
            this.page.waitForEvent('download'),
            await this.downloadBtn.click()

        ])
        const filePath = `${downloadPath}${await downloadPromise.suggestedFilename()}`
        await downloadPromise.saveAs(filePath)
        await expect(fs.existsSync(filePath)).toBeTruthy();
        await downloadPromise.path();

    }

    async uploadFileByPath({
        filePath = "",
        numDashes = 1
    }) {
        let fileName = filePath.split("/")
        fileName = fileName[numDashes];
        await this.page.goto("upload-download");
        await this.page.setInputFiles('#uploadFile', [
            filePath,
        ])
        await expect(this.uploadedFilePath).toHaveText(`C:\\fakepath\\${fileName}`)
    }
}
