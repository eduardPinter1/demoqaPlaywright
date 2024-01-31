import { test } from '../../modules/base';

test.beforeEach(async ({ wpage }) => {
    await wpage.goto("droppable");
})

test("Simple drag drop", async ({ droppablePage }) => {
    await droppablePage.dragAndDrop({ tabOption: "simple" })
})

test("Should be accepting 'Acceptable' element block and not 'Not Acceptable'", async ({ droppablePage }) => {
    await droppablePage.dragAndDrop({ tabOption: "accept" })
})

test("Greedy - should mark and change the text on the outer element but not the inner element", async ({ droppablePage }) => {
    await droppablePage.dragAndDrop({ greedy: true, dragOut: true })
})

test("Greedy - should mark and change the text on the inner element but not the outer element", async ({ droppablePage }) => {
    await droppablePage.dragAndDrop({ greedy: true, dragOut: false })
})

test("Not greedy - should mark and change the text of the outer element but not the inner", async ({ droppablePage }) => {
    await droppablePage.dragAndDrop({ greedy: false, dragOut: true })
})

test("Not greedy - should mark both inner and outer element and change their text", async ({ droppablePage }) => {
    await droppablePage.dragAndDrop({ greedy: false, dragOut: false })
})

test("Should be reverting when dragged into the container", async ({ droppablePage }) => {
    await droppablePage.dragAndDrop({ tabOption: "revert", reverting: true })
})

test("Should not be reverting when dragged into the container", async ({ droppablePage }) => {
    await droppablePage.dragAndDrop({ tabOption: "revert", reverting: false })
})
