import { test } from '../../modules/base';
const data = JSON.parse(JSON.stringify(require("../../fixtures/testData.json")));

test("Upload file action and asserting of the uploaded file", async ({ uploadDownload }) => {
    await uploadDownload.uploadFileByPath({ filePath: data.filePathJpeg });
})
