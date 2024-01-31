import { test } from '../../modules/base';
import data from "../../fixtures/testData.json";

test("Upload file action and asserting of the uploaded file", async ({ uploadDownload }) => {
    await uploadDownload.uploadFileByPath({ filePath: data.filePathJpeg });
})
