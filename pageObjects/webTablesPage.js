import { expect } from '@playwright/test';
const { UtilsFunctions } = require("../utils/UtilsFunctions");
let utilsFunctions = new UtilsFunctions();

export class WebTablesPage {

    constructor(page) {
        this.page = page;
        this.addBtn = this.page.locator("#addNewRecordButton");
        this.closeForm = this.page.locator(".close");
        this.submitBtn = this.page.locator("#submit");
        this.deleteRowBtn = this.page.locator("span[title='Delete']");
        this.editRowBtn = this.page.locator("[id*='dit-record']");
        this.rowsPopulated = this.page.locator('[role="row"]:has(.action-buttons)');
        this.registrationForm = this.page.locator(".modal-content");
    }

    async createTable({
        testData = {
            firstName: "Jack",
            lastName: "Jackson",
            userEmail: "jj@gmail.com",
            age: "23",
            salary: "1000",
            department: "ER",
        },
        fail = false
    }) {
        await this.page.goto("webtables");
        let rowCount = await this.getPopulatedRowsCount();
        await this.addBtn.click();
        await expect(this.registrationForm).toBeInViewport();
        await expect(this.registrationForm).toBeVisible();
        for (const property in testData) {
            let el = await this.page.locator(`#${property}`);
            await el.fill(`${testData[property]}`)
        }
        await this.submitBtn.click();
        if (fail) {
            await expect(await this.registrationForm).toBeVisible();
            await expect(await this.registrationForm).toBeAttached();
            await this.closeForm.click();
            return expect(await this.rowsPopulated.count()).toBe(rowCount);
        }
        await expect(await this.registrationForm).not.toBeVisible();
        await expect(await this.registrationForm).not.toBeAttached();
        expect(await this.rowsPopulated.count()).toBeGreaterThan(rowCount);
        await this.assertingOfTableRow({
            firstName: testData.firstName,
            lastName: testData.lastName,
            email: testData.userEmail,
            age: testData.age,
            salary: testData.salary,
            department: testData.department
        })
    }

    async getPopulatedRowsCount() {
        return await this.rowsPopulated.count();
    }

    async assertingOfTableRow({
        firstName = "",
        lastName = "",
        age = "",
        email = "",
        salary = "",
        department = "",
    }) {
        let data = [firstName, lastName, age, email, salary, department];
        let increment = 0;
        let array = await this.rowsPopulated.last().locator('[role="gridcell"]');
        for await (const num of data) {
            await expect(await array.nth(increment)).toHaveText(num);
            increment++;
        }
    }

    async getTableRowContent({ index = 1 }) {
        let rowContent = [];
        let array = await this.rowsPopulated.nth(index).locator('[role="gridcell"]');
        rowContent = await array.allTextContents();
        let content = await rowContent.slice(0, -1)
        return content;
    }

    async editRow({
        property = "firstName",
        value = "John",
        closeEdit = false,
        equal = true,
    }) {
        await this.page.goto("webtables");
        let rowCount = await this.getPopulatedRowsCount();
        let randomIndex = utilsFunctions.getRandomInt(rowCount)
        let rowContent = await this.getTableRowContent({ index: randomIndex })
        await this.editRowBtn.nth(randomIndex).click();
        let el = await this.page.locator(`#${property}`);
        await el.fill(`${value}`)
        if (closeEdit) {
            await this.closeForm.click();
        }
        else {
            await this.submitBtn.click();
        }
        let rowContentChanged = await this.getTableRowContent({ index: randomIndex })
        if (equal) {
            return expect(await rowContent).toEqual(await rowContentChanged);
        }
        expect(await rowContent).not.toEqual(await rowContentChanged);
    }
}
