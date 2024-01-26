import { expect } from "../modules/base";

export class DatePickerPage {
    constructor(page) {
        this.page = page;
        this.selectDateInput = this.page.locator('[id="datePickerMonthYearInput"]');
        this.dateAndTimeInput = this.page.locator('[id="dateAndTimePickerInput"]');
        this.datePickerWindow = this.page.locator('.react-datepicker');
        this.monthClickDropdown = this.page.locator(".react-datepicker__month-select")
        this.yearClickDropdown = this.page.locator(".react-datepicker__year-select")
        this.monthDownArrow = this.page.locator(".react-datepicker__month-read-view--down-arrow")
        this.yearDownArrow = this.page.locator(".react-datepicker__year-read-view--down-arrow")
    }

    async selectDate({
        datePicker = "date",
        time = "",
        day = "",
        month = "",
        year = ""
    }) {
        let dateString;
        await this.page.goto("date-picker");
        switch (datePicker) {
            case "date":
                dateString = this.formatDate(`${day} ${month} ${year}`)
                await this.selectDateInput.click();
                await expect(await this.datePickerWindow).toBeAttached();
                await this.page.locator(".react-datepicker__month-select").selectOption(month);
                await this.page.locator(".react-datepicker__year-select").selectOption(year);
                await this.page.locator(`div[aria-label*="${month} ${day}"]`).click();
                await this.page.keyboard.press("Escape");
                await expect(await this.selectDateInput).toHaveAttribute("value", dateString);
                break;
            case "dateAndTime":
                let timeConverted = this.convertTime(time);
                dateString = `${month} ${day}, ${year} ${timeConverted}`
                await this.dateAndTimeInput.click();
                await expect(await this.datePickerWindow).toBeAttached();
                await this.monthDownArrow.click();
                await this.page.locator(`.react-datepicker__month-option:has-text("${month}")`).click();
                await this.yearDownArrow.click();
                await this.page.locator(`.react-datepicker__year-option:has-text("${year}")`).click();
                await this.page.locator(`div[aria-label*="${month} ${day}"]`).click();
                await this.page.locator(`li:has-text("${time}")`).click();
                await expect(await this.dateAndTimeInput).toHaveAttribute("value", dateString);
                break;
            default:
                throw new Error(`No date option in this format : ${datePicker}`)
        }
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${month}/${day}/${year}`;
    }

    convertTime(time) {
        var date = new Date();
        date.setHours(time.split(':')[0]);
        date.setMinutes(time.split(':')[1]);
        return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    }
}
