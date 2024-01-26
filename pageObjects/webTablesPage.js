import { expect } from '@playwright/test';
const { UtilsFunctions } = require("../utils/UtilsFunctions");
let rowCount;
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
        this.utilsFunctions = new UtilsFunctions();
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
        rowCount = await this.getPopulatedRowsCount();
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
        let arrayOfPopulatedRow = await this.rowsPopulated.last().locator('[role="gridcell"]');
        for await (const value of data) {
            await expect(await arrayOfPopulatedRow.nth(increment)).toHaveText(value);
            increment++;
        }
    }

    async getTableRowContent({ index = 1 }) {
        let rowContent = [];
        let rowContentArray = await this.rowsPopulated.nth(index).locator('[role="gridcell"]');
        rowContent = await rowContentArray.allTextContents();
        let content = await rowContent.slice(0, -1)

        return content;
    }

    async editRow({
        property = "firstName",
        value = "John",
        closeEdit = false,
        equal = true,
    }) {
        rowCount = await this.getPopulatedRowsCount();
        let randomIndex = this.utilsFunctions.getRandomInt(rowCount)
        let randomRowContent = await this.getTableRowContent({ index: randomIndex })
        await this.editRowBtn.nth(randomIndex).click();
        await this.page.locator(`#${property}`).fill(`${value}`);
        closeEdit ? await this.closeForm.click() : await this.submitBtn.click()
        let rowContentChanged = await this.getTableRowContent({ index: randomIndex })

        equal
            ? expect(await randomRowContent).toEqual(await rowContentChanged)
            : expect(await randomRowContent).not.toEqual(await rowContentChanged);
    }
}
