import { test } from '../../modules/base';

test.beforeEach(async ({ wpage }) => {
    await wpage.goto("droppable");
})

test("Simple drag drop", async ({ droppablePage }) => {
    await droppablePage.simpleDragDrop({})
})

test("Acceptable drag drop", async ({ droppablePage }) => {
    await droppablePage.simpleDragDrop({ tabOption: "accept" })
})

test("Propogation drag drop - greedy and drag onto outer element", async ({ droppablePage }) => {
    await droppablePage.simpleDragDrop({ tabOption: "propogation", greedy: true, dragOut: true })
})

test("Propogation drag drop - greedy and drag onto inner element", async ({ droppablePage }) => {
    await droppablePage.simpleDragDrop({ tabOption: "propogation", greedy: true, dragOut: false })
})

test("Propogation drag drop - not-greedy and drag onto outer element", async ({ droppablePage }) => {
    await droppablePage.simpleDragDrop({ tabOption: "propogation", greedy: false, dragOut: true })
})

test("Propogation drag drop - not-greedy and drag onto inner element", async ({ droppablePage }) => {
    await droppablePage.simpleDragDrop({ tabOption: "propogation", greedy: false, dragOut: false })
})

test("Revert drag drop - reverting", async ({ droppablePage }) => {
    await droppablePage.simpleDragDrop({ tabOption: "revert", reverting: true })
})

test("Revert drag drop - non-reverting", async ({ droppablePage }) => {
    await droppablePage.simpleDragDrop({ tabOption: "revert", reverting: false })
})
