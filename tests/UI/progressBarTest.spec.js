import { test } from '../../modules/base';

test("Progress bar functionality test without pausing", async ({ progressBarPage }) => {
    await progressBarPage.validateProgressBarFunctionality({ pausing: false });
})

test("Progress bar functionality test with pausing", async ({ progressBarPage }) => {
    await progressBarPage.validateProgressBarFunctionality({});
})
