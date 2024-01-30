import { test } from '../../modules/base';

test.beforeEach(async ({ wpage }) => {
    await wpage.goto("dragabble");
})

test("Simple drag box", async ({ draggablePage }) => {
    await draggablePage.moveSimpleBox({});
})

test("Axis - drag X", async ({ draggablePage }) => {
    await draggablePage.moveXOrY({})
})
test("Axis - drag Y", async ({ draggablePage }) => {
    await draggablePage.moveXOrY({ isX: false })
})

test("Contained in wrapper", async ({ draggablePage }) => {
    await draggablePage.moveContained({});
})

test("Contained in element", async ({ draggablePage }) => {
    await draggablePage.moveContained({ isWrapped: false });
})

test("Check for center cursor style", async ({ draggablePage }) => {
    await draggablePage.checkCursorStyle({ style: "center" })
})

test("Check for top left cursor style", async ({ draggablePage }) => {
    await draggablePage.checkCursorStyle({ style: "topLeft" })
})

test("Check for bottom cursor style", async ({ draggablePage }) => {
    await draggablePage.checkCursorStyle({ style: "bottom" })
})
