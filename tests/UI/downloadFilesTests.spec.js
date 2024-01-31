import { test } from '../../modules/base';

test("Download file action and asserting of the downloaded file", async ({ uploadDownload }) => {
    await uploadDownload.downloadFile({});
})
