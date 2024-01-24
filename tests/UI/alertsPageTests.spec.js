import { test } from '../../modules/base';
const data = JSON.parse(JSON.stringify(require('../../fixtures/testData.json')));

test("Alert presence after the click", async ({ alertPage }) => {
    await alertPage.verifyAlertPresence({ boxType: data.alertBox, alertMessage: data.alertPopupMessage });
})

test("Timeout alert presence after the click", async ({ alertPage }) => {
    await alertPage.verifyAlertPresence({ boxType: data.alertBox, alertMessage: data.alertPopupMessage });
})

test("Confirm pop-up presence after the click, clicking cancel", async ({ alertPage }) => {
    await alertPage.verifyAlertPresence({ boxType: data.confirmBox, alertMessage: data.confirmPopupMessage, action: "cancel" });
})

test("Confirm pop-up presence after the click, clicking accept", async ({ alertPage }) => {
    await alertPage.verifyAlertPresence({ boxType: data.confirmBox, alertMessage: data.confirmPopupMessage });
})

test("Prompt pop-up presence after the click", async ({ alertPage }) => {
    await alertPage.verifyAlertPresence({ boxType: data.promptBox, alertMessage: data.promptPopupMessage });
})
