import { test } from '../../modules/base';
import data from "../../fixtures/testData.json"

test.beforeEach(async ({ wpage }) => {
    await wpage.goto("dragabble");
})

test("Simple drag box", async ({ draggablePage }) => {
    await draggablePage.moveSimpleBox({});
})

test("Should be able to drag only by X axis", async ({ draggablePage }) => {
    await draggablePage.moveXOrY({})
})
test("Should be able to drag only by Y axis", async ({ draggablePage }) => {
    await draggablePage.moveXOrY({ isX: false })
})

test("Should be able to be moved only within the container", async ({ draggablePage }) => {
    await draggablePage.moveContained({});
})

test("Should be able to be moved only within the element", async ({ draggablePage }) => {
    await draggablePage.moveContained({ isWrapped: false });
})

test("Should have a center cursor style while moving the element", async ({ draggablePage }) => {
    await draggablePage.checkCursorStyle({ style: "center", cursor: data.moveCursor })
})

test("Should have top left cursor style while moving the element", async ({ draggablePage }) => {
    await draggablePage.checkCursorStyle({ style: "topLeft", cursor: data.crosshairCursor })
})

test("Should have the bottom cursor style while moving the element", async ({ draggablePage }) => {
    await draggablePage.checkCursorStyle({ style: "bottom", cursor: data.autoCursor })
})
