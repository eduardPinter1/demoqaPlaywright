import { test } from '../../modules/base';
const data = JSON.parse(JSON.stringify(require('../../fixtures/testData.json')));

test.beforeEach(async ({ wpage }) => {
    await wpage.goto("webtables");
})

test("Edit table happy flow", async ({ webTablesPage }) => {
    await webTablesPage.editRow({ property: "age", value: "30", equal: false });
})

test("Edit table - cancel edit", async ({ webTablesPage }) => {
    await webTablesPage.editRow({ property: "age", value: "30", closeEdit: true, equal: true });
})
