import { test } from '../../modules/base';
const data = JSON.parse(JSON.stringify(require('../../fixtures/testData.json')));

test.beforeEach(async ({ wpage }) => {
    await wpage.goto("sortable");
})

test("Sorting list and assertion of order change", async ({ sortablePage }) => {
    await sortablePage.sortGridList({ changedOrder: false })
})

test.only("Sorting grid and assertion of order change", async ({ sortablePage }) => {
    await sortablePage.sortGridList({ changedOrder: false, items: "gridItems", index: 4 })
})
