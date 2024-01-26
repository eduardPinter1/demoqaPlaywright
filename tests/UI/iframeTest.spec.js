import { test } from '../../modules/base';
const data = JSON.parse(JSON.stringify(require('../../fixtures/testData.json')));

test.beforeEach(async ({ wpage }) => {
    await wpage.goto("frames")
})

test("Verify iframes on the page and it's body content", async ({ iframePage }) => {
    await iframePage.validateFrameAndTextElement({ frames: ["frame1", "frame2"], text: data.iframeText })
})
